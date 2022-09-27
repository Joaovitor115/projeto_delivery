import {
  FIRSTAPI,
  INGREDIENT,
  NAME,
  RECIPES_DRINKS,
  RECIPES_MEALS,
} from '../actions/action';

const INICIAL_STATE = {
  ingredientes: [],
  name: [],
  first: [],
  recipesDrinks: [],
  recipesMeals: [],
};

const reducerFetch = (state = INICIAL_STATE, action) => {
  switch (action.type) {
  case INGREDIENT:
    return {
      ...state,
      ingredientes: action.payload,
    };
  case NAME:
    return {
      ...state,
      name: action.payload,
    };
  case FIRSTAPI:
    return {
      ...state,
      first: action.payload,
    };
  case RECIPES_DRINKS:
    return ({
      ...state,
      recipesDrinks: action.payload,
    });
  case RECIPES_MEALS:
    return ({
      ...state,
      recipesMeals: action.payload,
    });
  default:
    return state;
  }
};

export default reducerFetch;
