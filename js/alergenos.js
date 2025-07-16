//*
// filtrosrecetas.js

// Palabras clave para cada grupo de alérgenos
const glutenWords = [
  "flour", "breadcrumbs", "bread", "barley", "rye", "wheat", "pasta", "macaroni", "noodles", "buns", "bun"
];
const seafoodWords = [
  "shrimp", "prawn", "crab", "lobster", "clam", "mussel", "oyster", "squid", "octopus", "anchovy"
];
const dairyWords = [
  "milk", "cheese", "butter", "cream", "yogurt"
];

// Función para comprobar si un ingrediente contiene alguna palabra clave
function contienePalabraClave(ingrediente, palabrasClave) {
  return palabrasClave.some(palabra => ingrediente.toLowerCase().includes(palabra));
}

document.addEventListener("DOMContentLoaded", () => {
  const categorySelect = document.getElementById("category");
  const ingredientSelect = document.getElementById("ingredient");
  const countrySelect = document.getElementById("country");
  const resultadosContainer = document.getElementById("resultadosContainer");
  const resultadosSection = document.querySelector(".resultados");
  const recetaAzarSection = document.getElementById("receta-azar");
  const filterBtn = document.getElementById("filter-btn");

  // Filtros de alérgenos
  const filtroGlutenCheck = document.getElementById("filter-gluten");
  const filtroMariscosCheck = document.getElementById("filter-seafood");
  const filtroLacteosCheck = document.getElementById("filter-dairy");

  // Función para crear tarjeta de receta
  function crearCardReceta(receta) {
    return `
      <div class="card-receta">
        <img src="${receta.strMealThumb}" alt="${receta.strMeal}">
        <div class="contenido-card">
          <h4>${receta.strMeal}</h4>
          <p class="descripcion">${receta.strCategory || ''} - ${receta.strArea || ''}</p>
          <button class="ver-detalle" data-id="${receta.idMeal}">View Recipe</button>
        </div>
      </div>
    `;
  }

  // Buscar recetas al hacer clic
  filterBtn.addEventListener("click", async () => {
    const categoria = categorySelect.value;
    const ingrediente = ingredientSelect.value;
    const pais = countrySelect.value;

    const filtroGluten = filtroGlutenCheck.checked;
    const filtroMariscos = filtroMariscosCheck.checked;
    const filtroLacteos = filtroLacteosCheck.checked;

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
      resultadosContainer.innerHTML = "<p>¡Selecciona al menos un filtro!</p>";
      resultadosSection.style.display = "block";
      return;
    }

    try {
      const res = await fetch(url);
      const data = await res.json();
      resultadosSection.style.display = "block";

      if (!data.meals) {
        resultadosContainer.innerHTML = "<p>No recipes found.</p>";
        return;
      }

      for (const meal of data.meals) {
        const detalleRes = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${meal.idMeal}`);
        const detalleData = await detalleRes.json();
        const receta = detalleData.meals[0];

        let contieneAlergeno = false;

        for (let i = 1; i <= 20; i++) {
          const ingrediente = receta[`strIngredient${i}`];
          if (!ingrediente) continue;
          console.log(ingrediente,contienePalabraClave(ingrediente, glutenWords))

          if (
            (filtroGluten && contienePalabraClave(ingrediente, glutenWords)) ||
            (filtroMariscos && contienePalabraClave(ingrediente, seafoodWords)) ||
            (filtroLacteos && contienePalabraClave(ingrediente, dairyWords))
          ) {
            contieneAlergeno = true;
            break;
          }
        }

        if (!contieneAlergeno) {
            console.log("cREANDO",meal.strMeal)
          resultadosContainer.innerHTML += crearCardReceta(meal);
        }else{
            
            console.log("no cREANDO",meal.strMeal)
        }
      }

    } catch (err) {
      console.error("Error al buscar recetas:", err);
      resultadosContainer.innerHTML = "<p>Error fetching recipes.</p>";
      resultadosSection.style.display = "block";
    }
  });
});