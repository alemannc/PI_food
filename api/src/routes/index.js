const { Router } = require('express');
const { getDiets, getDietsFromDatabase } = require('../controllers/getDiets');
const { getRecipeById } = require('../controllers/getRecipeById');
const {getRecipesByName} = require('../controllers/getRecipeByName');
const { createRecipe } = require('../controllers/postRecipe');
const {getAllRecipe} = require("../controllers/getAllRecipe")
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.get('/getDiets', async (req, res) => {
    try {
      await getDiets();
      const dietsFromDatabase = await getDietsFromDatabase();
      res.status(200).json(dietsFromDatabase);
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ error: 'Error al obtener las dietas.' });
    }
  });
  router.get('/recipes', getAllRecipe);
  router.get('/recipes/name',getRecipesByName);
  router.get('/recipes/:idRecipe', getRecipeById);
  router.post('/recipes/post', createRecipe);
module.exports = router;
