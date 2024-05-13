function descargarImagen() {
    // Obtiene la URL de la imagen
    var urlImagen = document.getElementById('myImage').src;
  
    // Crea un elemento <a> temporal
    var link = document.createElement('a');
    link.href = urlImagen;
    link.download = 'mi_imagen.jpg'; // Nombre de archivo para la descarga
  
    // Simula el clic en el enlace para iniciar la descarga
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
  