const respond= require('../helpers/responder');
const connection= require('../DB/connection');
const valid= require('../helpers/validators');
const { mensajes_error } = require('../helpers/mensajes');
const ObjectId= require('mongodb').ObjectId;
const Validations= valid.Validations;

//Mensajes de error

 

class Music_controller {

    static general(req, res) {
        try {
            return respond.Responder.success(res);
        } catch (err) {
            return err;
        }
    }

    //Chain of Responsability podría ser usado aquí
    //Validar que no estén vacios tampoco y no sean strings
    static async get_violines(req, res, next) {
        try {
            const database= await connection.run();
            const collection= database.collection("violines");
            const min_year= req.query.min;
            const max_year= req.query.max;
            const nombre= req.query.nombre;
            const luthier= req.query.luthier;
            let datos;
            if (nombre== undefined && luthier== undefined && max_year== undefined && min_year== undefined) {
                datos= await collection.find().toArray();
                return respond.Responder.success(res, 'Todos los violines', datos);
            } else if (nombre!= undefined) {
                datos= await collection.find({ nombre : nombre }).toArray();
                return respond.Responder.success(res, '', datos);
            } else if (luthier!= undefined || min_year!= undefined || max_year!= undefined) {
                if (luthier!= undefined && await !Validations.anio_creacion(min_year) && await !Validations.anio_creacion(max_year)) {
                    datos= await collection.find({ luthier : luthier}).toArray();
                    return respond.Responder.success(res, '', datos);
                } else if (luthier!= undefined && await Validations.anio_creacion(min_year) && await Validations.anio_creacion(max_year)) {
                    datos= await collection.find({ 
                        luthier : luthier, anio_creacion : { $gte : parseInt(min_year), $lte : parseInt(max_year)}
                    }).toArray();
                    return respond.Responder.success(res, '', datos);
                } else if (luthier!= undefined && await Validations.anio_creacion(min_year)) {
                    datos= await collection.find({
                        luthier : luthier, anio_creacion : { $gte : parseInt(min_year)}
                    }).toArray();
                    return respond.Responder.success(res, '', datos);
                } else if (luthier!= undefined && await Validations.anio_creacion(max_year)) {
                    datos= await collection.find({
                        luthier : luthier, anio_creacion : { $lte : parseInt(max_year)}
                    }).toArray();
                    return respond.Responder.success(res, '', datos);
                } else if (await Validations.anio_creacion(min_year) && await Validations.anio_creacion(max_year)) {
                    datos= await collection.find({ anio_creacion : { $gte : parseInt(min_year), $lte : parseInt(max_year) } }).toArray();
                    return respond.Responder.success(res, '', datos);
                } else if (await Validations.anio_creacion(min_year)) {
                    datos= await collection.find({ anio_creacion : { $gte : parseInt(min_year) } }).toArray();
                    return respond.Responder.success(res, 'Violines creados despúes de ' + min_year, datos);
                } else if (await Validations.anio_creacion(max_year)) {
                    datos= await collection.find({ anio_creacion : { $lte : parseInt(max_year) } }).toArray();
                    return respond.Responder.success(res, '', datos);
                } else {
                    return respond.Responder.error(res, "Los parametros para anio de creacion no fueron bien ingresados", 400)
                }
            } 
        } catch (err) {
            return respond.Responder.error(res, mensajes_error.no_encontrado_error, 400);
        };
    }

    static async get_violines_by_id(req, res, next) {
        try {
            let req_id= req.params.id;
            Validations.id_validation(req_id);
            console.log(req.query.nombre.length);
            console.log(req.query.nombre);
            //Check if its iterable
            const object_id= new ObjectId(req_id);
            const database= await connection.run();
            const collection= database.collection("violines");
            const datos= await collection.find({ _id : object_id }).toArray();
            return respond.Responder.success(res, 'Funciona', datos);
        } catch (err) {
            return respond.Responder.error(res, mensajes_error.id_no_encontrada, 400);
        }
    };

    static async add_violines(req, res, next) {
        try {
            const database= await connection.run();
            const collection= database.collection("violines");
            //No muestra correctamente el length
            console.log(req.body.length);
            if (req.body.length> 1) {
                for (let i= 0; i < req.body.length; i++) {
                    if (await !Validations.anio_creacion(req.body[i].anio_creacion)) {
                        return respond.Responder.error(res, mensajes_error.invalid_year, 400);
                    }
                    collection.insertOne(req.body[i]);
                }
            } else {
                collection.insertOne(req.body);
            };
            /*let luthier_formatted= to_title_case(req.body.luthier);
            let nombre_formatted= to_title_case(req.body.nombre);*/
        return respond.Responder.post_violin(res, "Violín agregado con éxito");
        } catch (err) {
            return err;
        }
    };

    static async delete_violines(req, res) {
        try {
            const database= await connection.run();
            const collection= database.collection("violines");
            let req_id= req.params.id;
            Validations.id_validation(req_id);
            const object_id= new ObjectId(req_id);
            const req_nombre= req.query.nombre;
                let query= { $and : [
                    { _id : object_id }, { nombre : req_nombre }
                ] };
                const result= await collection.deleteOne(query);
                if (result.deletedCount== 1){
                    return respond.Responder.success(res, 'Eliminado');
                } else {
                    return respond.Responder.error(res, mensajes_error.elimination_error, 400);
                }
        } catch (error) {
            console.log(error);
            return respond.Responder.error(res, mensajes_error.elimination_error, 400);
        }
    }

    static async update_violines() {
        try {
            let req_id= req.params.id;
            Validations.id_validation(req_id)
            const database= await connection.run();
            const collection= database.collection("violines");
        } catch {
            return respond.Responder.error(res, 'Error en la actualización del recurso', 400);
        }
    }

    static async pruebas(req, res) {
        try {
            let req_id= req.params.id;
            return Validations.id_validation(req_id, res);
        } catch (error) {
            console.log(error);
            return respond.Responder.error(res, "Error en la id", 400);
        }
    }

}



/* 

            if (nombre!= undefined) {
                datos= await collection.find({ nombre : nombre }).toArray();
                return respond.Responder.success(res, '', datos);
            } else if (min_year!= undefined || max_year!= undefined) {
                if (await Validations.anio_creacion(min_year) && await Validations.anio_creacion(max_year)) {
                    datos= await collection.find({ anio_creacion : { $gte : parseInt(min_year), $lte : parseInt(max_year) } }).toArray();
                    return respond.Responder.success(res, '', datos);
                } else if (await Validations.anio_creacion(min_year)) {
                    datos= await collection.find({ anio_creacion : { $gte : parseInt(min_year) } }).toArray();
                    return respond.Responder.success(res, 'Violines creados despúes de ' + min_year, datos);
                } else if (await Validations.anio_creacion(max_year)) {
                    datos= await collection.find({ anio_creacion : { $lte : parseInt(max_year) } }).toArray();
                    return respond.Responder.success(res, '', datos);
                } else {
                    return respond.Responder.error(res, "Los parametros para anio de creacion no fueron bien ingresados", 400)
                }
            } 
*/

module.exports= { Music_controller }