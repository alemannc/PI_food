const axios = require('axios');
const { Recipe, Diets } = require('../db');
const { API_KEY } = process.env;

const getRecipeById = async (req, res) => {
  const idRecipe = req.params.idRecipe;
  const URL = 'https://api.spoonacular.com/recipes/complexSearch' +
  `?apiKey=${API_KEY}&addRecipeInformation=true&number=20`;

  console.log('ID buscado:', idRecipe);
  try {
    // Primero, intentamos obtener la receta desde la base de datos
    const recipeFromDatabase = await Recipe.findByPk(idRecipe, {
      include: { model: Diets, attributes: ['name'] },
    });

    // Si la receta se encuentra en la base de datos, la devolvemos
    if (recipeFromDatabase) {
      const normalizedRecipe = {
        id: recipeFromDatabase.id,
        name: recipeFromDatabase.name,
        image: recipeFromDatabase.image,
        summary: recipeFromDatabase.summary,
        healthScore: recipeFromDatabase.healthScore,
        steps: recipeFromDatabase.steps,
        diets: recipeFromDatabase.diets.map((diet) => diet.name),
      };
      return res.status(200).json(normalizedRecipe);
    }

    // Si no se encuentra en la base de datos, hacemos la solicitud a la API para obtener todas las recetas
    const response = await axios.get(URL);
    const apiRecipes = response.data.results;
    // Como el id me viene con unos : extras, utilizamos el remplace para sacar los dos puntos y reemplazarlo por un string vacio
    const formattedIdRecipe = idRecipe.replace(':', '');
    // Filtramos la receta específica por su ID. Utilizamos el toString ya que siempre de la url sera un string y para compararlo con el find nos aseguramos de que tambien sea un string
    const filteredRecipe = apiRecipes.find((ele) => ele.id.toString() === formattedIdRecipe);
    // Normalizamos las propiedades del objeto de la receta
    const normalizedRecipe = {
      id: filteredRecipe.id,
      name: filteredRecipe.title,
      image: filteredRecipe.image,
      summary: filteredRecipe.summary,
      healthScore: filteredRecipe.healthScore,
      steps: filteredRecipe.analyzedInstructions[0]?.steps.map((step) => step.step).join("\n"),//Ya que la propiedad steps es un array de objetos(El objeto es analyzedInstructions), accedemos a cada indice del array y luego los une en un solo string con saltos de linea 
      diets: filteredRecipe.diets,
    };

    // Devolvemos la receta filtrada
    return res.status(200).json(normalizedRecipe);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Error al obtener el detalle de la receta.' });
  }
};

module.exports = { getRecipeById };
