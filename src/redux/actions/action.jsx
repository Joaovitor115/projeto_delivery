export const INGREDIENT = 'INGREDIENT';
export const NAME = 'NAME';
export const FIRSTAPI = 'FIRSTAPI';
export const RECIPES_DRINKS = 'RECIPES_DRINKS';
export const RECIPES_MEALS = 'RECIPES_MEALS';

/* export function login(payload) {
  return {
    type: LOGIN,
    payload,
  };
} */
export const fetchMealsRecipes = (payload) => ({ type: RECIPES_MEALS, payload });
export const fetchDrinksRecipes = (payload) => ({ type: RECIPES_DRINKS, payload });
export const fethIngredient = (payload) => ({ type: INGREDIENT, payload });
export const fetchName = (payload) => ({ type: NAME, payload });
export const fetchFirst = (payload) => ({ type: FIRSTAPI, payload });
