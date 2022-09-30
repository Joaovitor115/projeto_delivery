import React, { useEffect, useState } from 'react';
import { object } from 'prop-types';
import RecipesDetails from '../components/RecipesDetails';
import { requestMealDetail } from '../services/recipesDetailsAPI';
import { recipesDrinksAPI } from '../services/RecipesAPI';

const QUANTITY_DRINKS = 5;
function MealRecipe({ history }) {
  const [recipe, setRecipe] = useState({});
  const [drinks, setDrinks] = useState([]);
  useEffect(() => {
    (async () => {
      const stringPathName = history.location.pathname;
      const id = stringPathName.split('/')[2];
      const data = await requestMealDetail(id);
      const dataDrinks = await recipesDrinksAPI();
      const filterdrinks = await dataDrinks
        .filter((_drink, index) => index <= QUANTITY_DRINKS);
      setRecipe(data);
      setDrinks(filterdrinks);
    })();
  }, [history]);

  return (
    <div>
      <RecipesDetails sixDrinks={ drinks } recipe={ recipe } />
    </div>
  );
}

MealRecipe.propTypes = {
  history: object,
}.isrequired;

export default MealRecipe;
