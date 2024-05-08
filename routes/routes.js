const express = require('express');
const router = express.Router();

//Llama a los archivos js
const index = require('./index');
const login = require('./login');

//Muestra la vista al usuario con el js y pug
router.use('/', index);
router.use('/login', login);

module.exports = router;