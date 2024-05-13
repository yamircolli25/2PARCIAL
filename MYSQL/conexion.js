const mysql = require('mysql2');
require('dotenv').config(); // Cargar las variables de entorno

// Configuración de MySQL usando variables de entorno
const pool = mysql.createPool({
  connectionLimit: 10,
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE
});

module.exports = pool;