const express= require('express');
const control= require('../controllers/music_controller');
const router= express.Router(); 

router.get('/v1', (req, res) => {
    res.status(200).send(
        "Bienvenido a la libreria de Violines en formato de API"
    )
});

router.get('/v1/violines', control.Music_controller.get_logic);
router.get('/v1/violines/:id', control.Music_controller.get_violines_by_id);

router.post('/v1/violines', control.Music_controller.add_violines);

router.delete('/v1/violines/:id', control.Music_controller.delete_violines);

router.put('/v1/violines/:id', control.Music_controller.update_violines);


module.exports= router;

/* 
?
*/