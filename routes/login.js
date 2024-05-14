const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcrypt');

// Ruta para manejar la solicitud GET del formulario de inicio de sesión
router.get('/', (req, res) => {
  res.render('login', { title: 'INICIAR SESIÓN' });
});

// Ruta para manejar la solicitud POST de inicio de sesión
router.post('/', async (req, res) => {
  const { usuario, password } = req.body;

  try {
    // Buscar el usuario en la base de datos por su nombre de usuario
    const user = await User.getUserByUsername(usuario);

    console.log(req.body);

    // Verificar si el usuario existe
    if (!user) {
      return res.render('login', { title: 'INICIAR SESIÓN', error: 'Usuario o contraseña incorrectos' });
    }

    // Verificar si la contraseña es correcta
    const passwordMatch = await bcrypt.compare(password, user.contrasenia_hash);
    if (passwordMatch) {
      // Autenticación exitosa
      // Establecer una sesión de usuario
      req.session.user = user;
        console.log('Datos del usuario:', user);
        console.log('Contraseña proporcionada:', password);
        console.log('Hash almacenado:', user.contrasenia_hash);
        console.log('Contraseña proporcionada:', password);
        console.log('Hash almacenado:', user.contrasenia_hash);



      // Redirigir al usuario a la página de inicio o a donde sea necesario
      return res.redirect('/upload');
    } else {
      // Autenticación fallida
      return res.render('login', { title: 'INICIAR SESIÓN', error: 'Usuario o contraseña incorrectos' });
    }
  } catch (error) {
    console.error('Error al iniciar sesión:', error);
    res.status(500).send('Error al iniciar sesión');
  }
});

// Exportar el router
module.exports = router;
