//routes/login.js
const express = require('express');
const router = express.Router();

// Ruta para mostrar el formulario de login
router.get('/', (req, res) => {
  res.render('login', { title: 'Iniciar sesión'});
});

module.exports = router;