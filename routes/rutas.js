const express= require('express');
const control= require('../controllers/music_controller');
const router= express.Router(); 

router.get('/v1', (req, res) => {
    res.status(200).send(
        "Bienvenido a la libreria de Violines en formato de API"
    )
});

router.get('/v1/compositores', control.Music_controller.get_composers);
router.get('/v1/violines', control.Music_controller.get_violines);
router.get('/v1/violines/:nombre', control.Music_controller.get_violines_by_name)

router.post('/v1/violines', control.Music_controller.add_violines);


module.exports= router;