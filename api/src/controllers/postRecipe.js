const { Recipe, Diets } = require('../db');

const createRecipe = async (req, res) => {
  const { name, image, summary, healthScore, steps, diets } = req.body;

  try {
    // Crea la nueva receta en la base de datos
    const newRecipe = await Recipe.create({
      name,
      image,
      summary,
      healthScore,
      steps,
    });

    // Asociar la receta con los tipos de dieta proporcionados
    if (diets && diets.length > 0) {
      // Para cada dieta en el array diets utilizamos el metodo findOrCreate para buscarla en la base de datos y si no existe crearla para poder asociarla
      //Este metodo devuelve un array donde en la primera posicion esta la dieta creada o encontrada y el segundo es un booleano el cual si la dieta se encontro devuelve un TRUE pero si se creo devuelve un FALSE
      const dietObjects = await Promise.all(
        diets.map((dietName) => Diets.findOrCreate({ where: { name: dietName } }))
      );

      // Extraemos solo los objetos de dietas creados o encontrados para sacar la segunda posicion que seria el booleano 
      const dietInstances = dietObjects.map(([dietInstance]) => dietInstance);

      // Al final asociamos las dietas con la receta utilizando el método setDiets proporcionado por sequilize
      await newRecipe.setDiets(dietInstances);
    }

    // Devuelve la nueva receta creada
    res.status(201).json(newRecipe);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Error al crear la receta.' });
  }
};

module.exports = { createRecipe };
