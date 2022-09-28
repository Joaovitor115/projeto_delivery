import { func } from 'prop-types';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import Footer from '../components/Footer';
import Header from '../components/Header';
import Recipes from '../components/Recipes';
import {
  fetchDrinksRecipes,
  requiredTypeButtonClick,
} from '../redux/actions/action';
import DrinkIngredientsApi from '../services/DrinkIngredientsApi';
import DrinksFirstLetterApi from '../services/DrinksFirstLetterApi';
import DrinksNameApi from '../services/DrinksNameApi';
import { recipesDrinksAPI } from '../services/RecipesAPI';

function DrinkRecipes({
  requiredFetchDrinksRecipe,
  first,
  nome,
  redquiredTypeButton,
}) {
  useEffect(() => {
    (async () => {
      const recipes = await recipesDrinksAPI();
      requiredFetchDrinksRecipe(recipes);
    })();
  }, [requiredFetchDrinksRecipe]);

  const handClick = async () => {
    redquiredTypeButton('drinks');
    if (first === 'Ingredient') {
      const a = await DrinkIngredientsApi(nome);
      requiredFetchDrinksRecipe(a);
    } else if (first === 'Name') {
      const a = await DrinksNameApi(nome);
      requiredFetchDrinksRecipe(a);
    } else if (first === 'First letter' && nome.length > 1) {
      global.alert('Your search must have only 1 (one) character');
    } else {
      const a = await DrinksFirstLetterApi(nome);
      requiredFetchDrinksRecipe(a);
    }
  };
  return (
    <section>
      <Header titlePage="Drinks" iconProfile iconSearch />
      <button
        type="button"
        data-testid="exec-search-btn"
        onClick={ handClick }
      >
        Entrar
      </button>
      <Recipes />
      <Footer />
    </section>
  );
}
const mapStateToProps = (state) => ({
  recipesMeals: state.reducerFetch.recipesMeals,
  first: state.reducerFetch.hand,
  nome: state.reducerFetch.name,
});
const mapDispatchToProps = (dispatch) => ({
  requiredFetchDrinksRecipe: (recipes) => dispatch(fetchDrinksRecipes(recipes)),
  redquiredTypeButton: (type) => dispatch(requiredTypeButtonClick(type)),
});
DrinkRecipes.propTypes = {
  requiredFetchDrinksRecipe: func,
}.isrequired;
export default connect(mapStateToProps, mapDispatchToProps)(DrinkRecipes);
