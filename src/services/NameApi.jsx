const NameApi = async (token) => {
  const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${token}`;
  const request = await fetch(url);
  const response = await request.json();
  const NUMBER_MAGIC = 11;
  if (response.meals === null) return [];
  const currencyMeals = response.meals.filter((_m, i) => i <= NUMBER_MAGIC);
  return currencyMeals;
};

export default NameApi;
