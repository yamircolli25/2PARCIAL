const express = require('express');
const router = express.Router();

var format = "jpeg";
var imageUrl = "/converted_images/converted_image." + format;
var downloadUrl = "/download?format=" + format;

var html = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Imagen Convertida</title>
</head>
<body>
    <h1>Imagen Convertida</h1>
    <img src="${imageUrl}" alt="Imagen Convertida">
    <br>
    <a href="${downloadUrl}">Descargar</a>
</body>
</html>
`;

module.exports = router;

