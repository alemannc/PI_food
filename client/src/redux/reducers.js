import {GET_ALL_RECIPES , POST_FORM , GET_DIETS , GET_RECIPE_BY_ID,GET_RECIPES_BY_NAME,SET_ORDER_A_Z,SET_ORDER_Z_A,RESET_ORDER,SET_ORDER_HEALTSCORE_ASC,SET_ORDER_HEALTSCORE_DESC,FILTER_RECIPE_API,FILTER_RECIPE_BD,FILER_RECIPE_DIETS} from "./actionsType"



let initialState={
    food:[],//aqui tengo todas las recetas
    allRecipe:[],//segundo estado con todas las recetas
    diets:[],//array con las dietas
    recipe: null,//aqui la receta individual del detail
    currentPage: 1,
    
}

function rootReducer(state=initialState,action){
    switch(action.type){
        
        case GET_ALL_RECIPES:
            return{
                    ...state,
                    food:action.payload,
                    allRecipe:action.payload
                    } 
        case POST_FORM:{
            return {...state,activities:action.payload}
                        }
        case GET_DIETS:{
            return{...state,diets:action.payload}
        }
        case GET_RECIPE_BY_ID:{
            return{...state,recipe:action.payload}
        }
        case GET_RECIPES_BY_NAME:{
            return{...state,food:action.payload}
        }
        case SET_ORDER_A_Z:{
            const foodAZ=[...state.food]
            foodAZ.sort((a, b) => a.name.localeCompare(b.name));
            return{...state,food:foodAZ}
        }
        case SET_ORDER_Z_A:{
            const foodZA = [...state.food];
            foodZA.sort((a, b) => b.name.localeCompare(a.name));
            return { ...state, food: foodZA }
        }
        case RESET_ORDER:{
            return{...state,food:state.allRecipe}
        }
        case SET_ORDER_HEALTSCORE_ASC:{
            const foodHealtScoreASC = [...state.food]
            foodHealtScoreASC.sort((a, b) => a.healthScore-b.healthScore);
            return {...state,food:foodHealtScoreASC}
        }
        case SET_ORDER_HEALTSCORE_DESC:{
            const foodHealtScoreDESC = [...state.food]
            foodHealtScoreDESC.sort((a, b) => b.healthScore-a.healthScore);
            return {...state,food:foodHealtScoreDESC}
        }
        case FILTER_RECIPE_API:{
            const filteredAPI = state.allRecipe.filter((receta) => receta.id < 100);
            return {
              ...state,
              food: filteredAPI,
              currentPage: 1
            };
        }
        case FILTER_RECIPE_BD:{
            const filteredBD = state.allRecipe.filter((receta) => receta.id > 100);
            return {
              ...state,
              food: filteredBD,
              currentPage: 1
            };
        }   
        case FILER_RECIPE_DIETS:{
            const filteredDiets = state.allRecipe.filter((recipe) =>
            recipe.diets.some((diet) => diet === action.payload)
          );
          return { ...state, food: filteredDiets,currentPage: 1 };
        }
        default:
             return {...state}
    }

}

export default rootReducer;