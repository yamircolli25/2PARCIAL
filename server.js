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

// Configuración de Multer para cargar imágenes
const upload = multer({ dest: 'index/' });

// Ruta para renderizar el formulario
app.get('/', (req, res) => {
    res.render('index');
});

// Ruta para manejar la solicitud de conversión de imagen
app.post('/index', upload.single('image'), (req, res) => {
    // Verificar si se cargó una imagen
    if (!req.file) {
        return res.status(400).send('No se ha proporcionado una imagen.');
    }

    // Obtener el formato seleccionado del cuerpo de la solicitud
    const format = req.body.format;

    // Procesar la imagen con Sharp
    sharp(req.file.path)
        .toFormat(format)
        .toFile(path.join(__dirname, 'converted', `converted.${format}`), (err, info) => {
            if (err) {
                console.error(err);
                res.status(500).send('Error al procesar la imagen');
            } else {
                // Renderizar la vista de imagen convertida
                res.render('converted', { format });
            }
        });
});


// Servir imágenes convertidas
app.use('/converted', express.static(path.join(__dirname, 'converted')));

// Ruta para descargar la imagen convertida
app.get('/download', (req, res) => {
    const format = req.query.format;

    // Imprimir el formato en la consola para verificar que se está pasando correctamente
    console.log('Formato:', format);

    // Verificar si se proporciona un formato válido
    if (!format) {
        return res.status(400).send('No se ha proporcionado un formato de imagen válido.');
    }

    const file = path.join(__dirname, 'converted', `converted.${format}`);
    res.download(file);
});


//Inicia el servidor
const port = 3000;
app.listen(port, () =>{
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
