const express = require('express');
const router = express.Router();

//Llama a los archivos js
const index = require('./index');
const login = require('./login');
const registro = require('./registro');

//Muestra la vista al usuario con el js y pug
router.use('/', index);
router.use('/login', login);
router.use('./registro'.registro);

module.exports = router;