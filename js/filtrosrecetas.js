document.addEventListener("DOMContentLoaded", () => {
  const categorySelect = document.getElementById("category");
  const ingredientSelect = document.getElementById("ingredient");
  const countrySelect = document.getElementById("country");
  const filterBtn = document.getElementById("filter-btn");
  const resultadosContainer = document.getElementById("resultadosContainer");
  const resultadosSection = document.querySelector(".resultados");
  const recetaAzarSection = document.getElementById("receta-azar");

  // Ocultar resultados al cargar
  resultadosSection.style.display = "none";

  // Cargar categorías
  fetch("https://www.themealdb.com/api/json/v1/1/list.php?c=list")
    .then(res => res.json())
    .then(data => {
      data.meals.forEach(cat => {
        const option = document.createElement("option");
        option.value = cat.strCategory;
        option.textContent = cat.strCategory;
        categorySelect.appendChild(option);
      });
    });

  // Cargar ingredientes
  fetch("https://www.themealdb.com/api/json/v1/1/list.php?i=list")
    .then(res => res.json())
    .then(data => {
      data.meals.slice(0, 50).forEach(ing => {
        const option = document.createElement("option");
        option.value = ing.strIngredient;
        option.textContent = ing.strIngredient;
        ingredientSelect.appendChild(option);
      });
    });

  // Cargar países (áreas)
  fetch("https://www.themealdb.com/api/json/v1/1/list.php?a=list")
    .then(res => res.json())
    .then(data => {
      data.meals.forEach(area => {
        const option = document.createElement("option");
        option.value = area.strArea;
        option.textContent = area.strArea;
        countrySelect.appendChild(option);
      });
    });

  // Función para crear tarjeta
  function crearCardReceta(receta) {
    return `
      <div class="card-receta">
        <img src="${receta.strMealThumb}" alt="${receta.strMeal}">
        <div class="contenido-card">
          <h4>${receta.strMeal}</h4>
          <p class="descripcion">${receta.strCategory || ''} - ${receta.strArea || ''}</p>
          <button class="ver-detalle">Ver receta</button>
        </div>
      </div>
    `;
  }

  // Buscar recetas por categoría (puedes hacer variantes para ingredientes y área)
  filterBtn.addEventListener("click", () => {
    const categoria = categorySelect.value;
    const ingrediente = ingredientSelect.value;
    const pais = countrySelect.value;

    resultadosContainer.innerHTML = "";
    recetaAzarSection.style.display = "none";

    let url = "";

    if (categoria) {
      url = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${categoria}`;
    } else if (ingrediente) {
      url = `https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingrediente}`;
    } else if (pais) {
      url = `https://www.themealdb.com/api/json/v1/1/filter.php?a=${pais}`;
    } else {
      resultadosContainer.innerHTML = "<p>Selecciona al menos un filtro.</p>";
      resultadosSection.style.display = "block";
      return;
    }

    fetch(url)
      .then(res => res.json())
      .then(data => {
        resultadosSection.style.display = "block";
        if (!data.meals) {
          resultadosContainer.innerHTML = "<p>No se encontraron recetas.</p>";
          return;
        }

        data.meals.forEach(meal => {
          resultadosContainer.innerHTML += crearCardReceta(meal);
        });
      })
      .catch(err => {
        console.error("Error al buscar recetas:", err);
        resultadosContainer.innerHTML = "<p>Ocurrió un error al buscar recetas.</p>";
        resultadosSection.style.display = "block";
      });
  });
});
