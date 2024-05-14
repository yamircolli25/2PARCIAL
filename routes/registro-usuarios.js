const express = require('express');
const router = express.Router();
const User = require('../models/User'); // Importa el modelo User
const authMiddleWare = require('../middlewares/authMiddleware');

// Ruta para manejar el registro de usuarios
router.post('/', async (req, res) => {
    const { nombre, correo, password } = req.body;

    console.log(req.body);

    try {
        // Verificar si el usuario ya está registrado
        const usuarioExistente = await User.obtenerPorNombre(nombre);
        if (usuarioExistente) {
            return res.status(400).send('El usuario ya está registrado');
        }

        // Hash de la contraseña
        const hashedPassword = await authMiddleWare.getHash(password);

        // Registrar el usuario en la base de datos utilizando el método create del modelo User
        await User.create(nombre, correo, hashedPassword);

        // Usuario insertado correctamente
        res.redirect('/login');
    } catch (error) {
        console.error('Error al registrar usuario:', error);
        res.status(500).send('Error interno del servidor');
    }
});

module.exports = router;
