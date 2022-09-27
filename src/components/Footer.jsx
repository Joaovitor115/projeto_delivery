import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { func } from 'prop-types';
import drinkIcon from '../images/drinkIcon.svg';
import mealIcon from '../images/mealIcon.svg';
import { recipesDrinksAPI, recipesMealsAPI } from '../services/RecipesAPI';
import { fetchMealsRecipes, fetchDrinksRecipes } from '../redux/actions/action';
import './Footer.css';

function Footer({ requiredFetchDrinksRecipe, requiredFetchMealssRecipe }) {
  const requiredDrinksRecipes = async () => {
    const recipes = await recipesDrinksAPI();
    requiredFetchDrinksRecipe(recipes);
    requiredFetchMealssRecipe([]);
  };

  const requiredMealsRecipes = async (type) => {
    const recipes = await recipesMealsAPI(type);
    requiredFetchMealssRecipe(recipes);
    requiredFetchDrinksRecipe([]);
  };

  return (
    <footer data-testid="footer">
      <Link onClick={ requiredDrinksRecipes } to="/drinks">
        <img
          data-testid="drinks-bottom-btn"
          src={ drinkIcon }
          alt="Drink Icon"
        />
      </Link>
      <Link onClick={ requiredMealsRecipes } to="/meals">
        <img
          data-testid="meals-bottom-btn"
          src={ mealIcon }
          alt="Meal Icon"
        />
      </Link>
    </footer>
  );
}

const mapDispatchToProps = (dispatch) => ({
  requiredFetchDrinksRecipe: (recipes) => dispatch(fetchDrinksRecipes(recipes)),
  requiredFetchMealssRecipe: (recipes) => dispatch(fetchMealsRecipes(recipes)),
});

Footer.propTypes = {
  requiredFetchRecipe: func,
}.isrequired;

export default connect(null, mapDispatchToProps)(Footer);
