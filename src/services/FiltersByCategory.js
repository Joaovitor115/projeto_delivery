export const filterOfMeals = async (category) => {
  const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`);
  const data = await response.json();
  const MAGIC_NUMBER = 11;
  if (data.meals === null) return [];
  return data.meals.filter((_d, i) => i <= MAGIC_NUMBER);
};

export const filterOfDrinks = async (category) => {
  const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${category}`);
  const data = await response.json();
  const MAGIC_NUMBER = 11;
  if (data.drinks === null) return [];
  const currencyData = data.drinks.filter((_d, i) => i <= MAGIC_NUMBER);
  return currencyData;
};
