const respond= require('../helpers/responder');
const connection= require('../DB/connection');
const valid= require('../helpers/validators');
const { mensajes_error, mensajes_exito } = require('../helpers/mensajes');
const ObjectId= require('mongodb').ObjectId;
const Validations= valid.Validations;


class Music_controller {

    static general(req, res) {
        try {
            return respond.Responder.success(res);
        } catch (err) {
            return err;
        }
    }

    static async nombre_logic(min_year, max_year, luthier, nombre, collection) {
        if(!Validations.luthier_nombre_val(nombre)) {
            return null;
        } 
        let datos;
        if (luthier!= undefined && min_year!= undefined && max_year!= undefined) {
            if (!Validations.luthier_nombre_val(luthier)) {
                return null;
            } else if (!Validations.anio_creacion(min_year)) {
                return null;
            } else if (!Validations.anio_creacion(max_year)) {
                return null;
            }
            datos= await collection.find({ 
                    nombre : nombre, luthier : luthier, anio_creacion : { $gte : parseInt(min_year), $lte : parseInt(max_year)}
                }).toArray;
            return datos;
        } else if (luthier!= undefined && min_year!= undefined) {
            if (!Validations.luthier_nombre_val(luthier)) {
                return null;
            } else if (!Validations.anio_creacion(min_year)) {
                return null;
            } else if (!Validations.anio_creacion(max_year)) {
                return null;
            }
            datos= await collection.find({
                nombre : nombre, luthier : luthier, anio_creacion : { $gte : parseInt(min_year)}
            }).toArray();
            return datos;
        } else if (luthier!=undefined && max_year!= undefined) {
            if (!Validations.luthier_nombre_val(luthier)) {
                return null;
            } else if (!Validations.anio_creacion(min_year)) {
                return null;
            } else if (!Validations.anio_creacion(max_year)) {
                return null;
            }
            datos= await collection.find({
                nombre : nombre, luthier : luthier, anio_creacion : { $lte : parseInt(max_year)}
            }).toArray();
            return datos;
        } else if (luthier!= undefined) {
            if (!Validations.luthier_nombre_val(luthier)) {
                return null;
            }            
            datos= await collection.find({ nombre : nombre, luthier : luthier}).toArray();
            return datos;
        } else if (max_year!= undefined && min_year!= undefined) {
            if (!Validations.anio_creacion(min_year)) {
                return null;
            } else if (!Validations.anio_creacion(max_year)) {
                return null;
            }
            datos= await collection.find({ 
                    nombre : nombre, anio_creacion : { $gte : parseInt(min_year), $lte : parseInt(max_year)}
                }).toArray;
            return datos
        } else if (min_year!= undefined) {
            if (!Validations.anio_creacion(min_year)) {
                return null;
            }
            datos= await collection.find({
                nombre : nombre, anio_creacion : { $gte : parseInt(min_year)}
            }).toArray();
            return datos;
        } else if (max_year!= undefined) {
            if (!Validations.anio_creacion(max_year)) {
                return null;
            }
            datos= await collection.find({
                nombre : nombre, anio_creacion : { $lte : parseInt(max_year)}
            }).toArray();
            return datos;
        } else {
            datos= await collection.find({ nombre : nombre }).toArray();
            return datos;
        } 
    }

    static async luthier_logic(min_year, max_year, luthier, collection) {
        if (!Validations.luthier_nombre_val(luthier)) {
            return null;
        }
        let datos;
        if (min_year!= undefined && max_year!= undefined) {
            if (!Validations.anio_creacion(min_year)) {
                return null;
            }
            if (!Validations.anio_creacion(max_year)) {
                return null;
            }
            datos= await collection.find({
                luthier : luthier, anio_creacion : { $gte : parseInt(min_year), $lte : parseInt(max_year)} 
            }).toArray();
            return datos;
        } else if (min_year!= undefined) {
            if (!Validations.anio_creacion(min_year)) {
                return null;
            }
            datos= await collection.find({
                luthier : luthier, anio_creacion : { $gte : parseInt(min_year)}
            }).toArray();
            return datos;
        } else if (max_year!= undefined) {
            if (!Validations.anio_creacion(max_year)) {
                return null;
            }
            datos= await collection.find({
                luthier : luthier, anio_creacion : { $lte : parseInt(max_year) }
            }).toArray();
            return datos;
        } else {
            datos= await collection.find({ luthier : luthier }).toArray();
            return datos;
        }
    }

    static async max_year_logic(min_year, max_year, collection) {
        if (!Validations.anio_creacion(max_year)) {
            return null;
        }
        let datos;
        if (min_year!= undefined) {
            if (!Validations.anio_creacion(min_year)) {
                return null;
            }
            datos= await collection.find({ anio_creacion : { $gte : parseInt(min_year), $lte : parseInt(max_year) } }).toArray();
            return datos;
        } else {
            datos= await collection.find({ anio_creacion : { $lte : parseInt(max_year) } }).toArray();
            return datos;
        }
    }

    static async min_year_logic(min_year, collection) {
        if (!Validations.anio_creacion(min_year)) {
            return null;
        }
        let datos;
        datos= await collection.find({ anio_creacion : { $gte : parseInt(min_year) } }).toArray();
        return datos;
    }



    static async get_logic(req, res) {
        const database= await connection.run();
        const collection= database.collection("violines");
        const min_year= req.query.min;
        const max_year= req.query.max;
        const nombre= req.query.nombre;
        const luthier= req.query.luthier;
        let datos;
        if (min_year== undefined && max_year== undefined && nombre== undefined && luthier== undefined) {
            datos= await collection.find().toArray();
        } else if (nombre!= undefined) {
            datos= await Music_controller.nombre_logic(min_year, max_year, luthier, nombre, collection);
        } else if (luthier!= undefined) {
            datos= await Music_controller.luthier_logic(min_year, max_year, luthier, collection);
        } else if (max_year!= undefined) {
            datos= await Music_controller.max_year_logic(min_year, max_year, collection);
        } else if (min_year!= undefined) {
            datos= await Music_controller.min_year_logic(min_year, collection);
        }
        if (datos!= null) {
            return respond.Responder.success(res, mensajes_exito.get_req, datos);
        } else {
            console.log(9);
            return respond.Responder.error(res, mensajes_error.get_req, 400);
        };

    }

    static async get_violines_by_id(req, res, next) {
        try {
            let req_id= req.params.id;
            if (Validations.id_validation(req_id)== false) {
                return respond.Responder.error(res, mensajes_error.invalid_id, 400);
            };
            //Check if its iterable
            const object_id= ObjectId.createFromHexString(req_id);
            const database= await connection.run();
            const collection= database.collection("violines");
            const datos= await collection.find({ _id : object_id }).toArray();
            return respond.Responder.success(res, mensajes_exito.get_req, datos);
        } catch {
            return respond.Responder.error(res, mensajes_error.id_no_encontrada, 400);
        }
    };

    static async add_validations(req_body) {
        if (await !Validations.luthier_nombre_val(req_body.nombre)) {
            return false;
        } else if (await !Validations.luthier_nombre_val(req_body.luthier)) {
            return false;
        } else if (await !Validations.anio_creacion(req_body.anio_creacion)) {
            return false;
        } else {
            return true;
        }
    }

    static async add_violines(req, res, next) {
        try {

            const database= await connection.run();
            const collection= database.collection("violines");
            //Check for length
            if (req.body.length> 1) {
                for (let i= 0; i < req.body.length; i++) {
                    if (await Music_controller.add_validations(req.body[i])) {
                        return respond.Responder.error(res, mensajes_error.user_input_error, 400);
                    }
                    collection.insertOne(req.body[i]);
                }
            } else {
                if (await Music_controller.add_validations(req.body)) {
                    return respond.Responder.error(res, mensajes_error.user_input_error, 400);
                }
                collection.insertOne(req.body);
            };
            return respond.Responder.post_violin(res, mensajes_exito.post_req, null);
        } catch {
            return respond.Responder.post_violin(res, mensajes_error.post_req, 400);
        }
    };

    static async delete_violines(req, res) {
        try {
            const database= await connection.run();
            const collection= database.collection("violines");
            let req_id= req.params.id;
            const req_nombre= req.query.nombre;
            if(!Validations.id_validation(req_id) || !Validations.luthier_nombre_val(req_nombre)) {
                return respond.Responder.error(res, mensajes_error.user_input_error, 400);
            };
            const object_id= ObjectId.createFromHexString(req_id);
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

    static async update_violines(req, res) {
        try {
            let temp_id= req.params.id;
            if (!Validations.id_validation(temp_id)){
                return respond.Responder.error(res, mensajes_error.invalid_id, 400);
            };
            const req_id= ObjectId.createFromHexString(temp_id);
            let new_nombre= req.body.nombre;
            let new_luthier= req.body.luthier;
            let new_anio= req.body.anio_creacion;
            if (!Validations.luthier_nombre_val(new_luthier) || !Validations.luthier_nombre_val(new_nombre)) {
                return respond.Responder.error(res, mensajes_error.user_input_error, 400);
            };
            if (!Validations.anio_creacion(new_anio)) {
                return respond.Responder.error(res, mensajes_error.invalid_year, 400);
            };
            const database= await connection.run();
            const collection= database.collection("violines");
            if (new_nombre!= undefined && new_luthier!= undefined && new_anio!= undefined) {
                await collection.updateOne(
                    { _id : req_id },
                    {
                        "$set": { nombre : new_nombre, luthier : new_luthier, anio_creacion : new_anio }
                    }
                    );
                return respond.Responder.success(res, "Éxito", null);
            } else if (new_nombre!= undefined && new_luthier!= undefined) {
                collection.updateOne(
                { _id : req_id },
                {
                    "$set": { nombre : new_nombre, luthier : new_luthier }
                }
                );
                return respond.Responder.success(res, mensajes_exito.put_req, null);
            } else if (new_nombre!= undefined && new_anio!= undefined) {
                collection.updateOne(
                { _id : req_id },
                {
                    "$set": { nombre : new_nombre, anio_creacion : new_anio }
                }
                );
                return respond.Responder.success(res, mensajes_exito.put_req, null);
            } else if (new_anio!= undefined && new_luthier!= undefined) {
                collection.updateOne(
                { _id : req_id },
                {
                    "$set": { luthier : new_luthier, anio_creacion : new_anio }
                }
                );
                return respond.Responder.success(res, mensajes_exito.put_req, null);
            } else if (new_luthier!= undefined) {
                collection.updateOne(
                { _id : req_id },
                {
                    "$set": { luthier : new_luthier}
                }
                );
                return respond.Responder.success(res, mensajes_exito.put_req, null);
            } else if (new_nombre!= undefined) {
                collection.updateOne(
                { _id : req_id },
                {
                    "$set": { nombre : new_nombre}
                }
                );

                return respond.Responder.success(res, mensajes_exito.put_req, null);
            } else if (new_anio!= undefined) {
                collection.updateOne(
                { _id : req_id },
                {
                    "$set": { anio_creacion : new_anio }
                }
                );
                return respond.Responder.success(res, mensajes_exito.put_req, null);
            }
        } catch {
            return respond.Responder.error(res, mensajes_error.put_req, 400);
        }
    }


    static pruebas(req, res) {
        try {

        } catch {

        }
    }
}





module.exports= { Music_controller }