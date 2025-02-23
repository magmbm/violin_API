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

    static luthier_val(luthier) {

    }

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
}

module.exports= { Validations };