const { Op } = require('sequelize');
const axios = require('axios');
const { Recipe,Diets } = require('../db');
const { API_KEY } = process.env;

const getRecipesByName = async (req, res) => {
  const { name } = req.query;

  try {
    const URL = 'https://api.spoonacular.com/recipes/complexSearch' + `?apiKey=${API_KEY}&addRecipeInformation=true&number=100`;

    // Realizar ambas búsquedas concurrentemente utilizando Promise.all
    const [recipesFromDatabase, apiResponse] = await Promise.all([
      Recipe.findAll({
        where: {
          name: {
            [Op.iLike]: `%${name}%`, // Buscar coincidencias sin distinguir mayúsculas y minúsculas
          },
        },
        include: Diets, // Incluir la asociación con el modelo Diet para obtener las dietas asociadas
      }),
      axios.get(URL),
    ]);

    const apiRecipes = apiResponse.data.results;

    // propiedades para el modelo que viene de la api
    const propertyMapping = {
      id: 'id',
      name: 'title',
      summary: 'summary',
      healthScore: 'healthScore',
      steps: 'analyzedInstructions', // Corregimos analyzedInstructions por steps
      image: 'image',
      diets: 'diets',
    };

    // propiedades para el modelo que viene de la base de datos
    const propertyMappingDatabase = {
      id: 'id',
      name:"name",
      summary: 'summary',
      healthScore: 'healthScore',
      steps:"steps",
      image: 'image',
      diets:"diets"
    };

    // Filtrar las recetas que coincidan con el nombre proporcionado en la API
    const filteredApiRecipes = apiRecipes.filter((recipe) =>
      recipe.title.toLowerCase().includes(name.toLowerCase())
    );

    // Combinar las recetas de la base de datos y la API
    const combinedRecipes = [...recipesFromDatabase, ...filteredApiRecipes];

    const simplifiedRecipes = combinedRecipes.map((recipe) => {
      //Creamos una constante para saber por cada receta si viene de la api o la base de datos Y utilizamos el instanceof que deveuvle true o false dependiendo de si es o no una intancia del modelo Recipe
      // Si isFromDataBase es true eso quiere decir que la recipe es una instancia de receta por lo tanto viene de la base de datos y tenemos que utilizar las propiedades de propertyMappingDatabase
      //Pero si es false, eso quiere decir que viene de la Api y tenemos que utlizar propertyMappingDatabase ya que la propiedad steps en ambos casos tienen nombres diferentes 
      const isFromDatabase = recipe instanceof Recipe;
      const simplifiedRecipe = {};
    
      const mapping = isFromDatabase ? propertyMappingDatabase : propertyMapping;
    //Utilizamos un bucle for in para recorrer el objeto y crear uno nuevo asi unificar ambas respuestas en la constante simplifiedRecipe
      for (const key in mapping) {
        if (key === 'diets') {
          if (isFromDatabase) {
            // Si es de la base de datos, utilizamos el array de objetos de la dieta
            simplifiedRecipe[key] = recipe[mapping[key]].map((diet) => diet.name);
          } else {
            // Si es de la API, verificamos si es un array de objetos o un array de nombres
            if (Array.isArray(recipe[mapping[key]])) {
              simplifiedRecipe[key] = recipe[mapping[key]];
            } else {
              simplifiedRecipe[key] = [recipe[mapping[key]]];
            }
          }
        } else {
          simplifiedRecipe[key] = recipe[mapping[key]];
        }
      }
    
      return simplifiedRecipe;
    });
    console.log(simplifiedRecipes)
  return res.status(200).json(simplifiedRecipes);
} catch (error) {
  console.error('Error:', error);
  res.status(500).json({ error: 'Error al obtener las recetas.' });
  }
}
module.exports = { getRecipesByName };
