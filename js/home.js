// Used to toggle the menu on small screens when clicking on the menu button
function myFunction() {
  var x = document.getElementById("navDemo");
  if (x.className.indexOf("w3-show") == -1) {
    x.className += " w3-show";
  } else {
    x.className = x.className.replace(" w3-show", "");
  }
}

// Obtener la referencia al elemento donde se mostrará la frase del día
const fraseDelDiaElement = document.getElementById("fraseDelDia");

// Hacer una solicitud a la API para obtener la frase del día en español
fetch("https://api.quotable.io/random?language=es")
  .then((response) => response.json())
  .then((data) => {
    // Asignar la frase del día al elemento HTML
    fraseDelDiaElement.innerText = data.content;
  })
  .catch((error) => {
    console.error("Error al obtener la frase del día:", error);
  });
