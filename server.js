const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000; // Puerto en el que se ejecutará el servidor

// Definir la ruta principal
app.get('/', (req, res) => {
  // Renderizar la vista. Por ejemplo, si tienes un archivo HTML en la carpeta 'views', puedes renderizarlo así:
  res.sendFile(path.join(__dirname, 'views', 'index.html'));
});


// Servir archivos estáticos desde la carpeta 'public'
app.use(express.static(path.join(__dirname, 'css')));

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);

});