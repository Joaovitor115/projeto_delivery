export function getFavoriteRecipes() {
  const items = JSON.parse(localStorage.getItem('favoriteRecipes'));
  return items;
}
export function removeFavoriteRecipes(id) {
  const items = JSON.parse(localStorage.getItem('favoriteRecipes'));
  const filtered = items.filter((item) => item.id !== id);
  localStorage.setItem('favoriteRecipes', JSON.stringify(filtered));
}
