const express = require('express');
const router = express.Router();

//Llama la vista del usuario
router.get('/',(req, res) =>{
    res.render('index', {title: 'Convertidor de Imagenes'});
    
});


module.exports = router;