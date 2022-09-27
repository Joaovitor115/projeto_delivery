const DrinksFirstLetterApi = async (token) => {
  const url = `https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${token}`;
  const request = await fetch(url);
  const response = await request.json();
  return response.drinks;
};

export default DrinksFirstLetterApi;
