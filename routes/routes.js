const express = require('express');
const router = express.Router();

//Llama a los archivos js
const index = require('./index');

//Muestra la vista al usuario con el js y pug
router.use('/', index);

module.exports = router;