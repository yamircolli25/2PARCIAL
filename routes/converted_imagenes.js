const express = require('express');
const router = express.Router();

// Creación de elementos HTML
var htmlDocument = document.implementation.createHTMLDocument("Imagen Convertida");
var htmlLang = document.createAttribute("lang");
htmlLang.value = "en";
htmlDocument.documentElement.setAttributeNode(htmlLang);

var head = htmlDocument.createElement("head");
var metaCharset = htmlDocument.createElement("meta");
metaCharset.setAttribute("charset", "UTF-8");
head.appendChild(metaCharset);

var metaViewport = htmlDocument.createElement("meta");
metaViewport.setAttribute("name", "viewport");
metaViewport.setAttribute("content", "width=device-width, initial-scale=1.0");
head.appendChild(metaViewport);

var title = htmlDocument.createElement("title");
title.textContent = "Imagen Convertida";
head.appendChild(title);

var body = htmlDocument.createElement("body");

var h1 = htmlDocument.createElement("h1");
h1.textContent = "Imagen Convertida";
body.appendChild(h1);

var img = htmlDocument.createElement("img");
img.setAttribute("id", "converted-image");
img.setAttribute("src", "");
img.setAttribute("alt", "Imagen Convertida");
body.appendChild(img);

var br = htmlDocument.createElement("br");
body.appendChild(br);

var a = htmlDocument.createElement("a");
a.setAttribute("id", "download-link");
a.setAttribute("href", "");
a.textContent = "Descargar";
body.appendChild(a);

// Asignación de valores
var format = "jpeg";
var imageUrl = "/converted_images/converted_image." + format;
var downloadUrl = "/download?format=" + format;

htmlDocument.getElementById("converted-image").setAttribute("src", imageUrl);
htmlDocument.getElementById("download-link").setAttribute("href", downloadUrl);

// Imprimir el HTML generado
console.log(htmlDocument.documentElement.outerHTML);

module.exports = router;