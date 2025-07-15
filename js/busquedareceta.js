const searchInput = document.getElementById("searchInput");
const searchBtn = document.getElementById("searchBtn");
const resultadosContainer = document.getElementById("resultadosContainer");
const recetaAzar = document.getElementById("receta-azar");

searchBtn.addEventListener("click", () => {
  const query = searchInput.value.trim();
  if (query === "") return;

  // Ocultar sección receta al azar
  recetaAzar.style.display = "none";

  // Mostrar contenedor resultados
  resultadosContainer.innerHTML = ""; // limpiar resultados previos
  document.querySelector(".resultados").style.display = "block";

  fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`)
    .then(res => res.json())
    .then(data => {
      if (data.meals) {
        data.meals.forEach(meal => {
          const card = document.createElement("div");
          card.className = "card-receta";
          card.innerHTML = `
            <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
            <div class="contenido-card">
              <h4>${meal.strMeal}</h4>
              <p class="descripcion">${meal.strCategory || "Sin categoría"}</p>
              <button class="ver-detalle" data-id="${meal.idMeal}">Ver receta</button>
            </div>
          `;
          resultadosContainer.appendChild(card);
        });
      } else {
        resultadosContainer.innerHTML = `
          <div class="empty-state">
            <i class="fas fa-search"></i>
            <p>No se encontraron recetas con ese nombre.</p>
          </div>
        `;
      }
    })
    .catch(err => {
      resultadosContainer.innerHTML = `
        <div class="empty-state">
          <p>Ocurrió un error al buscar la receta. Intenta de nuevo.</p>
        </div>
      `;
      console.error(err);
    });
});
