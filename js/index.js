// Función para mostrar receta por ID
function mostrarRecetaPorId(idMeal) {
  fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idMeal}`)
    .then(res => res.json())
    .then(data => {
      const receta = data.meals[0];
      const recetaNombre = document.getElementById("recetaNombre");
      const recetaImagen = document.getElementById("recetaImagen");
      const recetaInstrucciones = document.getElementById("recetaInstrucciones");
      const listaIngredientes = document.getElementById("listaIngredientes");

      recetaNombre.textContent = receta.strMeal;
      recetaImagen.src = receta.strMealThumb;
      recetaImagen.alt = receta.strMeal;
      recetaInstrucciones.textContent = receta.strInstructions;
      listaIngredientes.innerHTML = "";

      for (let i = 1; i <= 20; i++) {
        const ing = receta[`strIngredient${i}`];
        const medida = receta[`strMeasure${i}`];
        if (ing && ing.trim()) {
          const li = document.createElement("li");
          li.textContent = `${medida} ${ing}`;
          listaIngredientes.appendChild(li);
        }
      }

      // Mostrar la sección
      document.querySelector(".resultados").style.display = "none";
      document.getElementById("receta-azar").style.display = "block";
    })
    .catch(err => console.error("Error al cargar receta por ID", err));
}

// Delegar evento de clic a los botones de detalle
document.getElementById("resultadosContainer").addEventListener("click", (e) => {
  const btn = e.target.closest(".ver-detalle");
  if (btn && btn.dataset.id) {
    mostrarRecetaPorId(btn.dataset.id);
  }
});
