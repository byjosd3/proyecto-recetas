const ingredients = {
"meals":[
    {"idIngredient":"1","strIngredient":"Chicken","strDescription":"The chicken is a type of domesticated fowl, a subspecies of the red junglefowl (Gallus gallus). It is one of the most common and widespread domestic animals, with a total population of more than 19 billion as of 2011. There are more chickens in the world than any other bird or domesticated fowl. Humans keep chickens primarily as a source of food (consuming both their meat and eggs) and, less commonly, as pets. Originally raised for cockfighting or for special ceremonies, chickens were not kept for food until the Hellenistic period (4th\u20132nd centuries BC).\r\n\r\nGenetic studies have pointed to multiple maternal origins in South Asia, Southeast Asia, and East Asia, but with the clade found in the Americas, Europe, the Middle East and Africa originating in the Indian subcontinent. From ancient India, the domesticated chicken spread to Lydia in western Asia Minor, and to Greece by the 5th century BC. Fowl had been known in Egypt since the mid-15th century BC, with the \"bird that gives birth every day\" having come to Egypt from the land between Syria and Shinar, Babylonia, according to the annals of Thutmose III.","strType":null},
    {"idIngredient":"2","strIngredient":"Salmon","strDescription":"Salmon is the common name for several species of ray-finned fish in the family Salmonidae. Other fish in the same family include trout, char, grayling and whitefish. Salmon are native to tributaries of the North Atlantic (genus Salmo) and Pacific Ocean (genus Oncorhynchus). Many species of salmon have been introduced into non-native environments such as the Great Lakes of North America and Patagonia in South America. Salmon are intensively farmed in many parts of the world.\r\n\r\nTypically, salmon are anadromous: they hatch in fresh water, migrate to the ocean, then return to fresh water to reproduce. However, populations of several species are restricted to fresh water through their lives. Folklore has it that the fish return to the exact spot where they hatched to spawn. Tracking studies have shown this to be mostly true. A portion of a returning salmon run may stray and spawn in different freshwater systems; the percent of straying depends on the species of salmon. Homing behavior has been shown to depend on olfactory memory. Salmon date back to the Neogene.","strType":null},
]
}

// DOM Elements
const categorySelect = document.getElementById('category');
const ingredientSelect = document.getElementById('ingredient');
const countrySelect = document.getElementById('country');
const searchBtn = document.getElementById('search-btn');
const resultsContainer = document.getElementById('results-container');


const ingredientSelect1 = document.getElementById("ingredient");

for (let i=0; i<ingredients.meals.length; i++){
const meal = ingredients.meals[i]
  const option = document.createElement("option");
  option.setAttribute("value", meal.strIngredient);
  option.textContent = meal.strIngredient;
  ingredientSelect1.appendChild(option);
}
