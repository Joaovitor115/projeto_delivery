import { FIRSTAPI, INGREDIENT, NAME } from '../actions/action';

const INICIAL_STATE = {
  ingredientes: [],
  name: [],
  first: [],
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
  default:
    return state;
  }
};

export default reducerFetch;
