/* export const INGREDIENT = 'INGREDIENT'; */
/* export const NAME = 'NAME'; */
/* export const FIRSTAPI = 'FIRSTAPI'; */
export const RECIPES_DRINKS = 'RECIPES_DRINKS';
export const RECIPES_MEALS = 'RECIPES_MEALS';
export const NAMEINPUT = 'NAMEINPUT';
export const HANDCHANGE = 'HANDCHANGE';
export const CATEGORIES_DRINKS = 'CATEGORIES_DRINKS';
export const CATEGORIES_MEALS = 'CATEGORIES_MEALS';
export const TYPE_BUTTON_CLICK = 'TYPE_BUTTON_CLICK';
export const CATEGORY_SELECTED = 'CATEGORY_SELECTED';
export const TYPE_PAGE_SELECT = 'TYPE_PAGE_SELECT';

export const fetchMealsRecipes = (payload) => ({ type: RECIPES_MEALS, payload });
export const fetchDrinksRecipes = (payload) => ({ type: RECIPES_DRINKS, payload });
export const handCh = (payload) => ({ type: HANDCHANGE, payload });
export const requiredTypeButtonClick = (payload) => ({
  type: TYPE_BUTTON_CLICK,
  payload,
});
export const requiretName = (payload) => ({ type: NAMEINPUT, payload });
export const requiredCategorieDrinks = (payload) => ({
  type: CATEGORIES_DRINKS,
  payload,
});
export const requiredCategorieMeals = (payload) => ({
  type: CATEGORIES_MEALS,
  payload,
});

export const categorySelected = (payload) => ({
  type: CATEGORY_SELECTED,
  payload,
});

export const typePageSelect = (payload) => ({
  type: TYPE_PAGE_SELECT,
  payload,
});
