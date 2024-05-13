// En tu archivo script.js

// Seleccionar los elementos necesarios del DOM
const dropArea = document.querySelector(".drag-area");
const button = dropArea.querySelector("button");
const input = dropArea.querySelector("input");
const formatSelect = document.getElementById("format");

// Evento click en el botón "Browse File"
button.onclick = () => {
  input.click(); // Si el usuario hace clic en el botón, también se hace clic en el input
};

// Evento change cuando se selecciona un archivo
input.addEventListener("change", function () {
  // Obtenemos el archivo seleccionado
  const file = this.files[0];
  // Creamos un objeto FormData para enviar la imagen al servidor
  const formData = new FormData();
  formData.append("image", file);

  // Realizamos una solicitud POST al servidor
  fetch("/convert", {
    method: "POST",
    body: formData,
  })
    .then((response) => response.blob()) // Convertir la respuesta a un Blob
    .then((blob) => {
      // Crear una URL para el Blob
      const imageUrl = URL.createObjectURL(blob);
      // Mostrar la imagen procesada en la página
      const img = document.createElement("img");
      img.src = imageUrl;
      dropArea.appendChild(img);
    })
    .catch((error) => console.error("Error:", error));
});

// Evento submit del formulario
dropArea.addEventListener("submit", function (event) {
  event.preventDefault(); // Evitar el envío del formulario por defecto
  // Obtener el formato seleccionado
  const format = formatSelect.value;
  // Añadir el formato al FormData
  const formData = new FormData();
  formData.append("format", format);
  // Enviar el FormData al servidor
  fetch("/convert", {
    method: "POST",
    body: formData,
  })
    .then((response) => response.blob()) // Convertir la respuesta a un Blob
    .then((blob) => {
      // Crear una URL para el Blob
      const imageUrl = URL.createObjectURL(blob);
      // Mostrar la imagen procesada en la página
      const img = document.createElement("img");
      img.src = imageUrl;
      dropArea.appendChild(img);
    })
    .catch((error) => console.error("Error:", error));
});





