export const setMealsTokenLocalStorage = (token) => {
  localStorage.setItem('mealsToken', token);
};

export const setDrinksTokenLocalStorage = (token) => {
  localStorage.setItem('drinksToken', token);
};

export const setUserLocalStorage = (email) => {
  localStorage.setItem('user', JSON.stringify(email));
};

export const setDoneRecipesLocalStorage = (recipes) => {
  localStorage.setItem('doneRecipes', JSON.stringify(recipes));
};

export const setFavoriteRecipesLocalStorage = (recipes) => {
  localStorage.setItem('favoriteRecipes', JSON.stringify(recipes));
};

export const setInprogressRecipesLocalStorage = (recipes) => {
  localStorage.setItem('inProgressRecipes', JSON.stringify(recipes));
};
