import {
  TYPE_BUTTON_CLICK,
  FIRSTAPI,
  HANDCHANGE,
  INGREDIENT,
  NAME,
  NAMEINPUT,
  RECIPES_DRINKS,
  RECIPES_MEALS,
  CATEGORIES_DRINKS,
  CATEGORIES_MEALS,
} from '../actions/action';

const INICIAL_STATE = {
  name: '',
  recipesDrinks: [],
  recipesMeals: [],
  hand: '',
  buttonClick: '',
  buttonsCategorieDrinks: [],
  buttonsCategorieMeals: [],
};

const reducerFetch = (state = INICIAL_STATE, action) => {
  switch (action.type) {
  case INGREDIENT: return ({ ...state, ingredientes: action.payload });
  case NAME: return ({ ...state, name: action.payload });
  case FIRSTAPI: return ({ ...state, first: action.payload });
  case RECIPES_DRINKS: return ({ ...state, recipesDrinks: action.payload });
  case RECIPES_MEALS: return ({ ...state, recipesMeals: action.payload });
  case NAMEINPUT: return ({ ...state, name: action.payload });
  case HANDCHANGE: return ({ ...state, hand: action.payload });
  case CATEGORIES_DRINKS: return ({ ...state, buttonsCategorieDrinks: action.payload });
  case CATEGORIES_MEALS: return ({ ...state, buttonsCategorieMeals: action.payload });
  case TYPE_BUTTON_CLICK: return ({ ...state, buttonClick: action.payload });
  default: return state;
  }
};

export default reducerFetch;
