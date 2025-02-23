class Responder {
    static success(res, msg, data) {
        return res.status(200).json({
            msg,
            data
        });
    }

    static post_violin(res, msg) {
        return res.status(201).send(msg);
    }

    static error(res, msg= "No pudimos completar con su petición, intente más tarde", stat_code) {
        return res.status(stat_code).json({
            msg: msg
        })
    };
}

module.exports= { Responder };