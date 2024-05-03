const express = require('express');
const path = require('path');
const sharp = require('sharp');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
//midleware 
app.use(express.static('public'));

// Definir la ruta principal
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

// Ruta para procesar la imagen
app.post('/upload', async (req, res) => {
  try {
    const { image } = req.body;
    // Decodificar la imagen base64
    const buffer = Buffer.from(image.replace(/^data:image\/\w+;base64,/, ''), 'base64');
    // Procesar la imagen con Sharp
    const processedImageBuffer = await sharp(buffer)
      .resize(300, 200) // Ejemplo de redimensionar la imagen
      .toBuffer();
    // Convertir la imagen procesada a base64
    const processedImage = `data:image/jpeg;base64,${processedImageBuffer.toString('base64')}`;
    // Enviar la imagen procesada de vuelta al cliente
    res.json({ processedImage });
  } catch (error) {
    console.error('Error processing image:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

