const MAGIC_NUMBER = 4;

export const buttonsCategorieMeals = async () => {
  const response = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?c=list');
  const data = await response.json();
  const currencyData = data.meals.filter((_d, index) => index <= MAGIC_NUMBER);
  return currencyData;
};

export const buttonsCategorieDrinks = async () => {
  const response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list');
  const data = await response.json();
  const currencyData = data.drinks.filter((_d, index) => index <= MAGIC_NUMBER);
  return currencyData;
};
