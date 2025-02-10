const express= require('express');
const app= express();
const PORT= 8080;
const control = require('./controllers/music_controller');
const routes= require('./routes/rutas');

app.use(express.json());
app.use(routes);
/*app.get('/compositores', (req, res) => {
    res.send(
      control.Music_controller.get_composers(req, res, null)
    )
});

app.get('/violines', (req, res) => {
  res.send(
    control.Music_controller.get_violines(req, res, null)
  )
});*/

app.listen(PORT, ()=> {
    console.log("Listening");
})



/*const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})*/
