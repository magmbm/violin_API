const responder= require('../helpers/responder');
const error_msg= require('../helpers/mensajes');
const mensajes_err= error_msg.mensajes_error;

class Validations {

    static to_title_case(str) {
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

    static luthier_nombre_val(data) {
        if (data== !isNaN) {
            return false;
        }
        for (let i= 0; i < data.length; i++) {
            if ((data.charCodeAt(i)!= 45) &&  (data.charCodeAt(i)!= 32) && (data.charCodeAt(i) < 65 || data.charCodeAt(i) > 90) &&
                (data.charCodeAt(i) < 96 || data.charCodeAt(i) > 122) &&
                (data.charCodeAt(i) < 192 || data.charCodeAt(i) > 255)
                ) {
                    console.log(i);
                    return false;
            };
        };
        return true;
    };

    static anio_creacion(year) {
        if (isNaN(year)) {
            return false;
        }
        if (year< 1546 || year>= 1900) {
            return false;
        } else {
            return true;
        };
    }

    static id_validation (id) {
        if (id.length != 24 || !isNaN(id)) {
            return false;
        } else {
            for (let i= 0; i < id.length; i++ ) {
                if ((id[i] < '0' || id[i] > '9') && 
                (id[i] < 'A' || id[i] > 'Z') &&
                (id[i] < 'a' || id[i] > 'z')) {
                    return false;
                }
            }
        }
        return true;
    }

    //Trabajar en esta función
    static email_validation(email) {
        for (let i= 0; i < email.length; i++) {
            if ((email[i] < '.' || email[i] > '9') && 
            (email[i] < '@' || email[i] > 'Z') &&
            (email[i] < 'a' || email[i] > 'z')) {
                return false;
            }
        }
        return true;
    }
}

module.exports= { Validations };