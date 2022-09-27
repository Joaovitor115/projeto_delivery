const FirstApi = async (token) => {
  const url = `https://www.themealdb.com/api/json/v1/1/search.php?f=${token}`;
  const request = await fetch(url);
  const response = await request.json();
  const NUMBER_MAGIC = 11;
  const currencyMeals = response.meals.filter((_m, i) => i <= NUMBER_MAGIC);
  return currencyMeals;
};

export default FirstApi;
