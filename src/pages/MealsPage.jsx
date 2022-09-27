import { func } from 'prop-types';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import Footer from '../components/Footer';
import Header from '../components/Header';
import Recipes from '../components/Recipes';
import { fetchMealsRecipes } from '../redux/actions/action';
import FirstApi from '../services/FirstApi';
import IngredientApi from '../services/IngredientApi';
import NameApi from '../services/NameApi';
import { recipesMealsAPI } from '../services/RecipesAPI';

function MealsRecipes({ requiredFetchMealsRecipe, first, nome }) {
  useEffect(() => {
    (async () => {
      const recipes = await recipesMealsAPI();
      requiredFetchMealsRecipe(recipes);
    })();
  }, [requiredFetchMealsRecipe]);

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
});
const mapDispatchToProps = (dispatch) => ({
  requiredFetchMealsRecipe: (recipes) => dispatch(fetchMealsRecipes(recipes)),
});
MealsRecipes.propTypes = {
  requiredFetchMealsRecipe: func,
}.isrequired;
export default connect(mapStateToProps, mapDispatchToProps)(MealsRecipes);
