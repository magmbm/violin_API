const express= require('express');
const app= express();
const PORT= 8080;
const control = require('./controllers/music_controller');
const routes= require('./routes/rutas');

app.use(express.json());
app.use(routes);

app.listen(PORT, ()=> {
    console.log("Listening");
})


