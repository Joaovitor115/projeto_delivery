export const recipesDrinksAPI = async () => {
  const response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
  const data = await response.json();
  const MAGIC_NUMBER = 11;
  const currentRecipes = data.drinks.filter((_recipe, index) => index <= MAGIC_NUMBER);
  return currentRecipes;
};

export const recipesMealsAPI = async () => {
  const response = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=');
  const data = await response.json();
  const MAGIC_NUMBER = 11;
  const currentRecipes = data.meals.filter((_recipe, index) => index <= MAGIC_NUMBER);
  return currentRecipes;
};
