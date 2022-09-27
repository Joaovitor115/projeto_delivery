import { func } from 'prop-types';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import Footer from '../components/Footer';
import Header from '../components/Header';
import Recipes from '../components/Recipes';
import { fetchMealsRecipes, requiredCategorieMeals } from '../redux/actions/action';
import FirstApi from '../services/FirstApi';
import IngredientApi from '../services/IngredientApi';
import NameApi from '../services/NameApi';
import { recipesMealsAPI } from '../services/RecipesAPI';
import { buttonsCategorieMeals } from '../services/categoriesButtonAPI';
import ButtonsCategories from '../components/ButtonsCategories';

function MealsRecipes({
  requiredFetchMealsRecipe,
  first,
  nome,
  requiredFetchMealsCategories,
  mealsCategories,
}) {
  useEffect(() => {
    (async () => {
      const categories = await buttonsCategorieMeals();
      requiredFetchMealsCategories(categories);
      const recipes = await recipesMealsAPI();
      requiredFetchMealsRecipe(recipes);
    })();
  }, [requiredFetchMealsRecipe, requiredFetchMealsCategories]);

  const handClick = async () => {
    if (first === 'Ingredient') {
      const a = await IngredientApi(nome);
      requiredFetchMealsRecipe(a);
    } else if (first === 'Name') {
      const a = await NameApi(nome);
      requiredFetchMealsRecipe(a);
    } else if (first === 'First letter' && nome.length > 1) {
      global.alert('Your search must have only 1 (one) character');
    } else {
      const a = await FirstApi(nome);
      requiredFetchMealsRecipe(a);
    }
  };
  return (
    <div>
      <Header titlePage="Meals" iconProfile iconSearch />
      <ButtonsCategories categories={ mealsCategories } />
      <button
        type="button"
        data-testid="exec-search-btn"
        onClick={ handClick }
      >
        Search
      </button>
      <Recipes />
      <Footer />
    </div>
  );
}
const mapStateToProps = (state) => ({
  recipesMeals: state.reducerFetch.recipesMeals,
  first: state.reducerFetch.hand,
  nome: state.reducerFetch.name,
  mealsCategories: state.reducerFetch.buttonsCategorieMeals,
});
const mapDispatchToProps = (dispatch) => ({
  requiredFetchMealsRecipe: (recipes) => dispatch(fetchMealsRecipes(recipes)),
  requiredFetchMealsCategories: (cate) => dispatch(requiredCategorieMeals(cate)),
});
MealsRecipes.propTypes = {
  requiredFetchMealsRecipe: func,
}.isrequired;
export default connect(mapStateToProps, mapDispatchToProps)(MealsRecipes);
