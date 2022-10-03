if (!JSON.parse(localStorage.getItem('inProgressRecipes'))) {
  localStorage.setItem('inProgressRecipes', JSON.stringify([]));
}

export const saveRecipesToLocalHistorage = (recipes) => (
  localStorage.setItem('inProgressRecipes', JSON.stringify(recipes)));

export const getRecipesToLocalHistorage = () => (
  JSON.parse(localStorage.getItem('inProgressRecipes')));

export function saveRecipes(recipes) {
  const inProgressRecipes = getRecipesToLocalHistorage();
  if (!inProgressRecipes) {
    saveRecipesToLocalHistorage([recipes]);
  } else {
    saveRecipesToLocalHistorage([...inProgressRecipes, recipes]);
  }
}
