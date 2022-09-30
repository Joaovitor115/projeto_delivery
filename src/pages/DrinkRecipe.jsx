import React, { useEffect, useState } from 'react';
import { object } from 'prop-types';
import RecipesDetails from '../components/RecipesDetails';
import { requestDrinkDetail } from '../services/recipesDetailsAPI';
import { recipesMealsAPI } from '../services/RecipesAPI';

const QUANTITY_MEALS = 5;

function DrinkRecipe({ history }) {
  const [recipe, setRecipe] = useState({});
  const [meals, setMeals] = useState([]);
  useEffect(() => {
    (async () => {
      const stringPathName = history.location.pathname;
      const id = stringPathName.split('/')[2];
      const data = await requestDrinkDetail(id);
      const dataMeals = await recipesMealsAPI();
      const filterMeals = await dataMeals
        .filter((_meal, index) => index <= QUANTITY_MEALS);
      setRecipe(data);
      setMeals(filterMeals);
    })();
  }, [history]);

  return (
    <div>
      <RecipesDetails sixMeals={ meals } recipe={ recipe } />
    </div>
  );
}

DrinkRecipe.propTypes = {
  history: object,
}.isrequired;

export default DrinkRecipe;
