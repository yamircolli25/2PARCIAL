const express = require('express');
const session = require('express-session');
const path = require('path');
const router = require('./routes/routes');
const sharp = require('sharp');
const multer = require('multer');
const pool = require('./MYSQL/conexion'); // Importa el pool de conexiones desde db.js


require('dotenv').config(); // Cargar las variables de entorno


const app = express();

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

//midleware 
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Configurar el middleware de sesión
app.use(session({
    secret: 'mi_secreto', // Deberías cambiar esto por una cadena de caracteres aleatoria
    resave: false,
    saveUninitialized: true
  }));

//Ruta raiz de la ejecución
app.use('/', router);

// Configuración de Multer para cargar imágenes
const upload = multer({ dest: 'index/' });

// Ruta para renderizar el formulario
app.get('/', (req, res) => {
    res.render('index');
});

// Definir una variable global para el límite de conversiones
const MAX_CONVERSIONS = 3;

// Ruta para manejar la solicitud de conversión de imagen
app.post('/upload', upload.single('image'), (req, res) => {
    // Verificar si se cargó una imagen
    if (!req.file) {
        return res.status(400).send('No se ha proporcionado una imagen.');
    }

    // Obtener el formato seleccionado del cuerpo de la solicitud
    const format = req.body.format;

    // Verificar el contador de conversiones en la sesión
    req.session.conversionCount = req.session.conversionCount || 0;
    if (req.session.conversionCount >= MAX_CONVERSIONS) {
        // Redireccionar a la vista del login si se alcanza el límite
        return res.redirect('/login');
    }

    // Incrementar el contador de conversiones
    req.session.conversionCount++;

    // Procesar la imagen con Sharp
    sharp(req.file.path)
        .toFormat(format)
        .toBuffer((err, buffer, info) => {
            if (err) {
                console.error(err);
                res.status(500).send('Error al procesar la imagen');
            } else {
                // Definir los encabezados para la descarga
                res.set({
                    'Content-Type': `image/${format}`,
                    'Content-Disposition': `attachment; filename="converted.${format}"`
                });
                // Enviar el buffer de la imagen como respuesta
                res.send(buffer);
            }
        });
});




// Ruta para manejar la solicitud de registro de usuario
app.post('/registrar-usuario', (req, res) => {
    const { usuario, correo, password } = req.body;
  
    // Insertar usuario en la base de datos usando el pool de conexiones
    pool.getConnection((err, connection) => {
      if (err) {
        console.error('Error al obtener conexión de la base de datos:', err);
        res.status(500).send('Error interno del servidor');
      } else {
        const query = 'INSERT INTO users (usuario, correo, contrasenia_hash) VALUES (?, ?, ?)';
        connection.query(query, [usuario, correo, password], (err, result) => {
          connection.release(); // Liberar la conexión de vuelta al pool
  
          if (err) {
            console.error('Error al insertar usuario en la base de datos:', err);
            res.status(500).send('Error interno del servidor');
          } else {
            console.log('Usuario registrado exitosamente');
            res.redirect('/login'); // Redirigir a la página principal u otra página de confirmación
          }
        });
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