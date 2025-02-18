const respond= require('../helpers/responder');
const connection= require('../DB/connection');

function to_title_case(str) {
    let capitalize= true;
    let temp= "";
    let temp_char;
    for (let i= 0; i< str.length; i++) {
        if (capitalize== true) {
            temp_char= str.charAt(i).toUpperCase();
            temp+= temp_char; 
            capitalize= false;
        } else if (str.charAt(i)== " ") {
            capitalize= true; 
            temp+= " ";
        } else {
            temp+= str.charAt(i);
        }
        console.log(i);
    }
    return temp
};


class Music_controller {

    static general(req, res) {
        try {
            return respond.Responder.success(res);
        } catch (err) {
            return err;
        }
    }

    static get_composers(req, res, next) {
        try {
            return respond.Responder.success(res, 'Funciona', compositores);
        } catch (err) {
            return err;
        }
    }

    static async get_violines(req, res, next) {
        try {
            const database= await connection.run();
            const collection= database.collection("violines");
            const datos= await collection.find().toArray();
            return respond.Responder.success(res, 'Funciona', datos);
        } catch (err) {
            return err;
        };
    }

    static async get_violines_by_name(req, res, next) {
        try {
            let req_name= req.params.nombre;
            console.log(req_name);
            const database= await connection.run();
            const collection= database.collection("violines");
            const datos= await collection.find({ nombre : req_name }).toArray();
            return respond.Responder.success(res, 'Funciona', datos);
        } catch (err) {
            return respond.Responder.error(res);
        }
    };

    static async add_violines(req, res, next) {
        try {
            const database= await connection.run();
            const collection= database.collection("violines");
            if (req.body.length> 1) {
                for (let i= 0; i < req.body.length; i++) {
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