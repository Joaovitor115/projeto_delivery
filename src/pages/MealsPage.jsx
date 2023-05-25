import { func } from 'prop-types';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import Footer from '../components/Footer';
import Header from '../components/Header';
import Recipes from '../components/Recipes';
import {
  fetchMealsRecipes,
  requiredCategorieMeals,
  requiredTypeButtonClick,
  typePageSelect,
} from '../redux/actions/action';
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
  redquiredTypeButton,
  typePageS,
}) {
  useEffect(() => {
    (async () => {
      const categories = await buttonsCategorieMeals();
      typePageS('meals');
      requiredFetchMealsCategories(categories);
      const recipes = await recipesMealsAPI();
      requiredFetchMealsRecipe(recipes);
    })();
  }, [requiredFetchMealsRecipe, requiredFetchMealsCategories, typePageS]);

  const handClick = async () => {
    redquiredTypeButton('meals');
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
      <Header search titlePage="Meals" iconProfile iconSearch />
      <ButtonsCategories categories={ mealsCategories } />
      <button
        type="button"
        data-testid="exec-search-btn"
        className="button4"
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
  redquiredTypeButton: (type) => dispatch(requiredTypeButtonClick(type)),
  typePageS: (page) => dispatch(typePageSelect(page)),
});
MealsRecipes.propTypes = {
  requiredFetchMealsRecipe: func,
}.isrequired;

export default connect(mapStateToProps, mapDispatchToProps)(MealsRecipes);
