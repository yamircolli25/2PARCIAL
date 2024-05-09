const express = require('express');
const path = require('path');
const router = require('./routes/routes');
const sharp = require('sharp');
const multer = require('multer');

const app = express();

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

//midleware 
app.use(express.static('public'));
app.use(express.json());

//Ruta raiz de la ejecución
app.use('/', router);

//Inicia el servidor
const port = 3000;
app.listen(port, () =>{
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
