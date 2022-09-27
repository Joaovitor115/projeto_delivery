import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { func } from 'prop-types';
import { recipesMealsAPI } from '../services/RecipesAPI';
import { fetchMealsRecipes } from '../redux/actions/action';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Recipes from '../components/Recipes';

function MealsRecipes({ requiredFetchMealsRecipe }) {
  useEffect(() => {
    (async () => {
      const recipes = await recipesMealsAPI();
      const MAGIC_NUMBER = 11;
      const currentRecipes = recipes.filter((_recipe, index) => index <= MAGIC_NUMBER);
      requiredFetchMealsRecipe(currentRecipes);
    })();
  }, [requiredFetchMealsRecipe]);
  return (
    <div>
      <Header titlePage="Meals" iconProfile iconSearch />
      <Recipes />
      <Footer />
    </div>
  );
}

const mapStateToProps = (state) => ({
  recipesMeals: state.reducerFetch.recipesMeals,
});

const mapDispatchToProps = (dispatch) => ({
  requiredFetchMealsRecipe: (recipes) => dispatch(fetchMealsRecipes(recipes)),
});

MealsRecipes.propTypes = {
  requiredFetchMealsRecipe: func,
}.isrequired;

export default connect(mapStateToProps, mapDispatchToProps)(MealsRecipes);
