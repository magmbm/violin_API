const respond= require('../helpers/responder');
const connection= require('../DB/connection');
const valid= require('../helpers/validators');
const  ObjectId   = require('mongodb').ObjectId;
const Validations= valid.Validations;

//Mensajes de error
const user_input_error= "Usted ha ingresado uno o más datos con el formato incorrecto, " +
"si desea saber más sobre el formato de ingreso apropiado puede ir a: 'http://localhost:8080/v1/formatos'\n\n" + 
"You have entered one or more field with an incorrect format, if you wish to know more about supported formats " +
"you can visit: 'http://localhost:8080/v1/formatos'";

const fecha_msg= "Usted ha ingresado una fecha incorrecta, dado que o Amati aún no inventaba el violín o la fecha es " +
"muy reciente para considerar el instruemento 'historico'. / " +
"You have entered an incorrect date, cause either Amati had yet to invent the violin or the date is to recent to " +
"consider the instrument as 'historic'.";


class Music_controller {

    static general(req, res) {
        try {
            return respond.Responder.success(res);
        } catch (err) {
            return err;
        }
    }

    static async get_violines(req, res, next) {
        try {
            const database= await connection.run();
            const collection= database.collection("violines");
            const min_year= req.query.min;
            const max_year= req.query.max;
            const nombre= req.query.nombre;
            let datos;
            if (nombre!= undefined) {
                datos= await collection.find({ nombre : nombre }).toArray();
                console.log("Flag-Name");
                return respond.Responder.success(res, '', datos);
            };
            //Validar que no estén vacios tampoco y no sean strings
            if (min_year!= undefined || max_year!= undefined) {
                if (await Validations.anio_creacion(min_year) && await Validations.anio_creacion(max_year)) {
                    console.log("Flag1");
                    datos= await collection.find({ anio_creacion : { $gte : parseInt(min_year), $lte : parseInt(max_year) } }).toArray();
                    return respond.Responder.success(res, '', datos);
                } else if (await Validations.anio_creacion(min_year)) {
                    console.log("Flag2");
                    datos= await collection.find({ anio_creacion : { $gte : parseInt(min_year) } }).toArray();
                    return respond.Responder.success(res, 'Violines creados despúes de ' + min_year, datos);
                } else if (await Validations.anio_creacion(max_year)) {
                    console.log("Flag3");
                    datos= await collection.find({ anio_creacion : { $lte : parseInt(max_year) } }).toArray();
                    return respond.Responder.success(res, '', datos);
                } else {
                    return respond.Responder.error(res, "Los parametros para anio de creacion no fueron bien ingresados", 400)
                }
            } 
            console.log("Flag4");
            datos= await collection.find().toArray();
            return respond.Responder.success(res, 'Funciona', datos);
        } catch (err) {
            return err;
        };
    }

    static async get_violines_by_id(req, res, next) {
        try {
            let req_id= req.params.id;
            const object_id= new ObjectId(req_id);
            const database= await connection.run();
            const collection= database.collection("violines");
            const datos= await collection.find({ _id : object_id }).toArray();
            return respond.Responder.success(res, 'Funciona', datos);
        } catch (err) {
            return respond.Responder.error(res, 'Esta ID no existe en la base de datos', 400);
        }
    };

    static async add_violines(req, res, next) {
        try {
            const database= await connection.run();
            const collection= database.collection("violines");
            if (req.body.length> 1) {
                for (let i= 0; i < req.body.length; i++) {
                    if (await !Validations.anio_creacion(req.body[i].anio_creacion)) {
                        return respond.Responder.error(res, fecha_msg, 400);
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
}




module.exports= { Music_controller }