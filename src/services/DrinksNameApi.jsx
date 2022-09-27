const DrinksNameApi = async (token) => {
  const url = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${token}`;
  const request = await fetch(url);
  const response = await request.json();
  return response.drinks;
};

export default DrinksNameApi;
