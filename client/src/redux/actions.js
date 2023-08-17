import axios from "axios"
import {GET_ALL_RECIPES,POST_FORM,GET_DIETS,GET_RECIPE_BY_ID,GET_RECIPES_BY_NAME,SET_ORDER_A_Z,SET_ORDER_Z_A,RESET_ORDER,SET_ORDER_HEALTSCORE_ASC,SET_ORDER_HEALTSCORE_DESC,FILTER_RECIPE_API,FILTER_RECIPE_BD,FILER_RECIPE_DIETS} from "./actionsType"


export const getAllRecipes= () => async (dispatch) => {
    try {
      let response = await axios.get('http://localhost:3001/recipes')
      return dispatch({ type:GET_ALL_RECIPES, payload: response.data })
    } catch (error) {
      alert(error)
    }
  }


  export const getRecipeById = (id) => async (dispatch) => {
    try {
      let response = await axios.get(`http://localhost:3001/recipes/${id}`);
      const { name, image, summary, healthScore, steps, diets } = response.data;
  
      return dispatch({
        type: GET_RECIPE_BY_ID,
        payload: {
          name,
          image,
          summary,
          healthScore,
          steps,
          diets,
        },
      });
    } catch (error) {
      alert(error);
    }
  };
  
  export const getRecipeByName= (name)=>async(dispatch)=>{
    try {
      const response = await axios.get(`http://localhost:3001/recipes/name?name=${name}`);
      const recipeByName = response.data; // Asegúrate de que la API devuelva los datos adecuados
  
      dispatch({
        type: GET_RECIPES_BY_NAME,
        payload: recipeByName,
      });
    } catch (error) {
      console.error('Error searching recipes:', error);
    }

  }

  export const postRecipe = (data) => {
    return async function (dispatch) {
      try {
        let response = await axios.post('http://localhost:3001/recipes/post', data);
        dispatch({
          type: POST_FORM,
          payload: response.data,
        });
      } catch (error) {
        console.error('Error:', error);
        // Manejar el error si es necesario
      }
    };
  };
  
  // export const getDiets=()=>{
  //   return async function(dispatch){
  //     try {
  //           let response = await axios.get("http://localhost:3001/getDiets")
  //           console.log(response)
  //           return dispatch({ type:GET_DIETS, payload: response.data })
  //         } catch (error) {
  //           alert(error)
  //         }
  //   }
  // } 

  export const getDiets= ()=>async(dispatch)=>{
    try {
      let response = await axios.get("http://localhost:3001/getDiets")
      return dispatch({ type:GET_DIETS, payload: response.data })
    } catch (error) {
      alert(error)
    }
  }

  export const setOrderAZ = () => {
    return {
      type: SET_ORDER_A_Z,
  
    };
  };
  export const setOrderZA = () => {
    return {
      type: SET_ORDER_Z_A,
  
    };
  };
  export const resetOrder = () => {
    return {
      type: RESET_ORDER,
  
    };
  };
  export const healthScoreASC = () => {
    return {
      type: SET_ORDER_HEALTSCORE_ASC,
  
    };
  };
  export const healthScoreDESC = () => {
    return {
      type: SET_ORDER_HEALTSCORE_DESC,
  
    };
  };
  export const filterFromDB =()=>{
    return{
      type: FILTER_RECIPE_BD
    };
  }
  export const filterFromAPI =()=>{
    return{
      type: FILTER_RECIPE_API,
    };
  }
  
  export const setFilter =(payload)=>{
    return{
      type: FILER_RECIPE_DIETS,
      payload:payload
    };
  }

