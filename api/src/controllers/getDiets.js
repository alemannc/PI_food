const axios = require('axios');
const { Diets } = require('../db');
const {API_KEY} = process.env;

const URL = 'https://api.spoonacular.com/recipes/complexSearch' + `?apiKey=${API_KEY}&addRecipeInformation=true`;


const getDietsFromDatabase = async () => {
  try {
    const diets = await Diets.findAll();
    return diets;
  } catch (error) {
    console.error('Error:', error);
    throw new Error('Error al obtener las dietas desde la base de datos.');
  }
};

const getDietsFromAPI = async () => { 
  try {
    const response = await axios.get(URL);
    const apiData = response.data.results;
    const totalDietas = [];
    //Pusheamos cada obtejo (dietas) al array totalDietas
    apiData.forEach((element) => {
      totalDietas.push(element.diets);
    });

    //Utilizamos .flat para aplanar en un unico array ya que totalDietas va ser un array de arrays al extraer la propiedad diets de cada objeto en la peticion
    // Creramos un nuevo objeto Set, esto lo que hace es eliminar automaticamente todos los elementos duplciados, es decir, es una coleccion de objetos unicos y al final usamos el spreed operator para transformarlo nuevamente en un array 
    const uniqueDiets = [...new Set(totalDietas.flat())];

    console.log(uniqueDiets);
    // Ahora puedes utilizar el nuevo array uniqueDiets para hacer el Diets.findOrCreate
    const dietPromises = uniqueDiets.map(async (dieta) => {
      // Utilizamos Diets.findOrCreate para buscar la dieta en la base de datos
      // y crearla si no existe
      await Diets.findOrCreate({
        where: { name: dieta },
      });
    });

    // Esperamos a que todas las llamadas a Diets.findOrCreate se completen
    await Promise.all(dietPromises);

    return uniqueDiets; // Devolvemos las dietas únicas para que puedan ser utilizadas en la función getDiets

  } catch (error) {
    console.error('Error:', error);
    throw new Error('Error al obtener las dietas desde la API.');
  }
};

const getDiets = async () => {
  try {
    // ejecutamos getDietsFromDatabase
    const dietsFromDatabase = await getDietsFromDatabase();
    if (dietsFromDatabase.length === 0) {
      //ejecutamos getDietsFromAPI si la longitud del array es igual a 0
      const uniqueDiets = await getDietsFromAPI();
      return await getDietsFromDatabase(); // Devolvemos las dietas obtenidas desde la base de datos después de obtenerlas desde la API y guardarlas en la base de datos
    }
    return dietsFromDatabase; // Devolvemos las dietas obtenidas desde la base de datos (si ya estaban presentes)
  } catch (error) {
    console.error('Error:', error);
    throw new Error('Error al obtener las dietas.');
  }
};

  module.exports = {
    getDiets,
    getDietsFromAPI,
    getDietsFromDatabase,
  };
