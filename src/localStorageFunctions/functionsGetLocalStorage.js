export const getMealsTokenLocalStorage = () => {
  localStorage.getItem('mealsToken');
};

export const getDrinksTokenLocalStorage = () => localStorage.getItem('drinksToken');

export const getUserLocalStorage = () => JSON.parse(localStorage.getItem('user'));

export const getDoneRecipesLocalStorage = () => JSON
  .parse(localStorage.getItem('doneRecipes'));

export const getFavoriteRecipesLocalStorage = () => JSON
  .parse(localStorage.getItem('favoriteRecipes'));

export const getInprogressRecipesLocalStorage = (recipes) => JSON
  .parse(localStorage.getItem('inProgressRecipes', JSON.stringify(recipes)));
