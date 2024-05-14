const mysql = require('mysql2/promise');

// Crear el pool de conexiones a la base de datos
const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '24deAgosto',
  database: 'convertidor',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Definir el modelo User
const User = {
  // Método para crear un nuevo usuario
  async create(usuario, correo, contrasenia_hash) {
    let connection;
    try {
      // Obtener una conexión del pool
      connection = await pool.getConnection();

      // Ejecutar la consulta SQL para insertar un nuevo usuario en la base de datos
      const [result] = await connection.execute(
        'INSERT INTO users (usuario, correo, contrasenia_hash) VALUES (?, ?, ?)',
        [usuario, correo, contrasenia_hash]
      );
      return result.insertId; // Devolver el ID del nuevo usuario creado
    } catch (error) {
      console.error('Error al insertar usuario en la base de datos:', error);
      throw error;
    } finally {
      if (connection) {
        connection.release(); // Liberar la conexión de vuelta al pool
      }
    }
  },

  // Método asincrónico para obtener un usuario por su nombre de usuario
  async getUserByUsername(usuario) {
    let connection;
    try {
      // Obtener una conexión del pool
      connection = await pool.getConnection();

      // Ejecutar la consulta SQL para obtener un usuario por su nombre de usuario
      const [rows] = await connection.execute(
        'SELECT * FROM users WHERE usuario = ?',
        [usuario]
      );
      return rows[0]; // Devolver el primer usuario encontrado
    } catch (error) {
      console.error('Error al obtener usuario por nombre de usuario:', error);
      throw error;
    } finally {
      if (connection) {
        connection.release(); // Liberar la conexión de vuelta al pool
      }
    }
  },

  // Otros métodos para consultar, actualizar o eliminar usuarios si es necesario
};

// Exportar el modelo User
module.exports = User;
