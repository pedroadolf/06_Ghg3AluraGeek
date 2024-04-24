document.addEventListener("DOMContentLoaded", () => {
  //Elementos DOM
  const quoteElm = document.getElementById("quote");
  const autherElm = document.getElementById("author");

  // colors for the background
  var colors = ["#F1B009"];

  // Obtener citas aleatorias
  async function getQuote() {
    var generateColor = Math.floor(Math.random() * colors.length);

    // API de buscar
    const response = await fetch("https://api.quotable.io/random");
    const data = await response.json();

    if (data) {
      // Mostrar citas
      quoteElm.textContent = data.content;
      autherElm.textContent = `-${data.author}-`;
    } else {
      quoteElm.textContent = "Ocurrió un error";
      console.log(data);
    }
  }

  button.addEventListener("click", getQuote);
  getQuote();
});
