export const INGREDIENT = 'INGREDIENT';
export const NAME = 'NAME';
export const FIRSTAPI = 'FIRSTAPI';

/* export function login(payload) {
  return {
    type: LOGIN,
    payload,
  };
} */

export const fethIngredient = (payload) => ({ type: INGREDIENT, payload });
export const fetchName = (payload) => ({ type: NAME, payload });
export const fetchFirst = (payload) => ({ type: FIRSTAPI, payload });
