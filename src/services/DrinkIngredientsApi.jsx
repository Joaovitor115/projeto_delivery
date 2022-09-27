const DrinkIngredientsApi = async (token) => {
  const url = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${token}`;
  const request = await fetch(url);
  const response = await request.json();
  return response.drinks;
};

export default DrinkIngredientsApi;
