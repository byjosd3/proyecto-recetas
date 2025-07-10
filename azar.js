document.addEventListener("DOMContentLoaded", () => {
  const randomBtn = document.getElementById("randomBtn");
  const recetaNombre = document.getElementById("recetaNombre");
  const recetaImagen = document.getElementById("recetaImagen");
  const recetaInstrucciones = document.getElementById("recetaInstrucciones");
  const listaIngredientes = document.getElementById("listaIngredientes");
  const recetaSeccion = document.getElementById("receta-azar");

  randomBtn.addEventListener("click", async () => {
    // Limpieza inicial
    recetaNombre.textContent = "Cargando...";
    recetaImagen.src = "";
    recetaInstrucciones.textContent = "";
    listaIngredientes.innerHTML = "";
    recetaSeccion.style.display = "block";

    try {
      const res = await fetch("https://www.themealdb.com/api/json/v1/1/random.php");
      const data = await res.json();
      const receta = data.meals[0];

      // Nombre y preparación
      recetaNombre.textContent = receta.strMeal;
      recetaImagen.src = receta.strMealThumb;
      recetaImagen.alt = receta.strMeal;
      recetaInstrucciones.textContent = receta.strInstructions;

      // Ingredientes
      for (let i = 1; i <= 20; i++) {
        const ing = receta[`strIngredient${i}`];
        const medida = receta[`strMeasure${i}`];
        if (ing && ing.trim()) {
          const li = document.createElement("li");
          li.textContent = `${medida} ${ing}`;
          listaIngredientes.appendChild(li);
        }
      }
    } catch (err) {
      recetaNombre.textContent = "Ocurrió un error al cargar la receta.";
      console.error(err);
    }
  });
});


// JS BASE – VISIBILIDAD DINÁMICA

// 🔍 Elementos del DOM
const seccionResultados = document.querySelector(".resultados");
const seccionAzar = document.getElementById("receta-azar");
// Si en el futuro usas una sección aparte para detalle
// const seccionDetalle = document.getElementById("detalle-receta");

const btnAzar = document.getElementById("randomBtn");
const btnBuscar = document.getElementById("searchBtn");
const contenedorResultados = document.getElementById("resultadosContainer");

// 🥄 Oculta todas las secciones de resultados
function ocultarSecciones() {
  seccionResultados.style.display = "none";
  seccionAzar.style.display = "none";
  // Si usas otra: seccionDetalle.style.display = "none";
}

// 🎲 Mostrar receta al azar
btnAzar.addEventListener("click", () => {
  ocultarSecciones();
  seccionAzar.style.display = "block";
  // Aquí llamas a la función que genera la receta aleatoria
  // ejemplo: cargarRecetaAlAzar();
});

// 🔎 Mostrar resultados por filtro
btnBuscar.addEventListener("click", () => {
  ocultarSecciones();
  seccionResultados.style.display = "block";
  // Aquí llamas a la función que carga las cards dinámicamente
  // ejemplo: cargarResultadosPorFiltros();
});

// 👆 Mostrar detalle al hacer clic en una card
contenedorResultados.addEventListener("click", (e) => {
  const card = e.target.closest(".card-receta");
  if (card) {
    ocultarSecciones();
    seccionAzar.style.display = "block"; // Puedes reutilizar esta estructura
    // Aquí podrías extraer la info de la receta desde la card y rellenar los datos
    // ejemplo: mostrarDetalleReceta(card.dataset.id);
  }
});
