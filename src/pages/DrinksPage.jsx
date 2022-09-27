import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { func } from 'prop-types';
import { recipesDrinksAPI } from '../services/RecipesAPI';
import { fetchDrinksRecipes } from '../redux/actions/action';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Recipes from '../components/Recipes';

function DrinkRecipes({ requiredFetchDrinksRecipe }) {
  useEffect(() => {
    (async () => {
      const recipes = await recipesDrinksAPI();
      const MAGIC_NUMBER = 11;
      const currentRecipes = recipes.filter((_recipe, index) => index <= MAGIC_NUMBER);
      requiredFetchDrinksRecipe(currentRecipes);
    })();
  }, [requiredFetchDrinksRecipe]);

  return (
    <section>
      <Header titlePage="Drinks" iconProfile iconSearch />
      <Recipes />
      <Footer />
    </section>
  );
}

const mapStateToProps = (state) => ({
  recipesDrinks: state.reducerFetch.recipesDrinks,
});

const mapDispatchToProps = (dispatch) => ({
  requiredFetchDrinksRecipe: (recipes) => dispatch(fetchDrinksRecipes(recipes)),
});

DrinkRecipes.propTypes = {
  requiredFetchDrinksRecipe: func,
}.isrequired;

export default connect(mapStateToProps, mapDispatchToProps)(DrinkRecipes);
