const FirstApi = async (token) => {
  const url = `https://www.themealdb.com/api/json/v1/1/search.php?f=${token}`;
  const request = await fetch(url);
  const response = await request.json();
  return response.meals;
};

export default FirstApi;
