const { default: axios } = require('axios');
const { Recipe, Diets } = require('../db');
const { API_KEY } = process.env;

const getAllRecipe = async (req,res) => {
  try {
    const URL =
      'https://api.spoonacular.com/recipes/complexSearch' +
      `?apiKey=${API_KEY}&addRecipeInformation=true&number=100`;

    // propiedades para el modelo que viene de la api
    const propertyMapping = {
      id: 'id',
      name: 'title',
      image: 'image',
      diets: 'diets',
      healthScore:"healthScore"
    };

    // Obtener todas las recetas con sus dietas asociadas utilizando la asociación definida en el modelo
    const recipesWithDiets = await Recipe.findAll({
      include: Diets, // Incluye la tabla Diets asociada a través de la tabla recipe_diets
    });

    // Mapear y seleccionar las propiedades necesarias para la respuesta
    const apiResponse = await axios.get(URL);
    const apiRecipes = apiResponse.data.results.map((apiRecipe) => {
      const mappedRecipe = {};
      for (const key in propertyMapping) {
        mappedRecipe[key] = apiRecipe[propertyMapping[key]];
      }
      return mappedRecipe;
    });

    const databaseRecipes = recipesWithDiets.map((recipe) => {
      return {
        id: recipe.id,
        name: recipe.name,
        image: recipe.image,
        diets: recipe.diets.map((diet) => diet.name),
        healthScore:recipe.healthScore
      };
    });

    // Combinar ambos arreglos
    const allRecipes = [...apiRecipes, ...databaseRecipes];


    return res.status(200).json(allRecipes);
  } catch (error) {
    console.error('Error:', error);
    throw new Error('Error al obtener todas las recetas.');
  }
};

module.exports = { getAllRecipe };
