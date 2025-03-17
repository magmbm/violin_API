const mensajes_error= {
    invalid_id :
    "La ID ingresada no es valida. The entered ID is not valid",
    invalid_year :
    "El año de creación del violín debe ser entre 1546 y 1899. The year of creation of the violin must be between 1546 and 1899",
    elimination_error :
    "No se elimino ningún violín. No violin has been eliminated",
    user_input_error : "Usted ha ingresado uno o más datos con el formato incorrecto, " +
    "si desea saber más sobre el formato de ingreso apropiado puede ir a: 'http://localhost:8080/v1/formatos'\n\n" + 
    "You have entered one or more field with an incorrect format, if you wish to know more about supported formats " +
    "you can visit: 'http://localhost:8080/v1/formatos'",
    no_encontrado_error : "No pudimos encontrar ningún violín con los parametros dados. We were unable to find a violin with the given parameters",
    id_no_encontrada : "Esta ID no existe en la base de datos. This ID does not exist in the database",
    put_req : 
    "Error en la actualización del recurso. Error in the resource update",
    get_req:
    "Incapaz de obtener los datos. Unable to obtain data",
    post_req:
    "No se pudo ingresar el documento. The document couldn't be entered"

} 

const mensajes_exito= {
    put_req :
    "Se actualizo la información del violín con éxito. The violin information has been successfully updated",
    get_req:
    "Datos obtenidos. Data obtained",
    post_req:
    "Violín agregado con éxito. Violin added successfully",
    delete_req:
    "Violín eliminado de la base de datos. Violin eliminated from the database"
}

module.exports= { mensajes_error, mensajes_exito }

