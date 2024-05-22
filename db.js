//../db.js
const mysql2 = require('mysql2/promise');
const dotenv = require('dotenv');

//Configura DotEnv
dotenv.config();

// Crear conexión a la base de datos MySQL
const pool = mysql2.createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
    port: process.env.MYSQL_PORT,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});


// Función para insertar un nuevo usuario en la base de datos MySQL
async function registrarUsuario(nombre, email, password, telefono) {
    try {
        const connection = await pool.getConnection();
        const [results] = await connection.query(
            'INSERT INTO usuarios (nombre, email, password) VALUES (?, ?, ?)',
            [nombre, email, password]
        );
        connection.release();
        console.log('Usuario insertado correctamente');
    } catch (error) {
        console.error('Error al insertar usuario:', error.message);
        throw error;
    }
}


// Función para obtener un usuario por su nombre de usuario
async function obtenerUsuarioPorNombre(nombre) {
    try {
        const connection = await pool.getConnection();
        const [results] = await connection.query(
            'SELECT * FROM usuarios WHERE nombre = ?',
            [nombre]
        );
        connection.release();
        return results[0] || null;
    } catch (error) {
        console.error('Error al obtener usuario por nombre:', error.message);
        throw error;
    }
}


// Función para obtener un usuario por su ID
async function getUserById(id) {
    try {
        const connection = await pool.getConnection();
        const [results] = await connection.query(
            'SELECT * FROM usuarios WHERE id = ?',
            [id]
        );
        connection.release();
        return results[0] || null;
    } catch (error) {
        console.error('Error al obtener usuario por ID:', error.message);
        throw error;
    }
}
module.exports = {
    registrarUsuario,
    obtenerUsuarioPorNombre,
    getUserById,
    obtenerTodos,
    obtenerPorId
};