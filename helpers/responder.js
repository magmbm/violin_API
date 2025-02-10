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

    static error(res) {
        return res.json({
            msg: "No pudimos completar con su petición, intente más tarde"
        })
    };
}

module.exports= { Responder };