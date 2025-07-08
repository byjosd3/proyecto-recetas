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
