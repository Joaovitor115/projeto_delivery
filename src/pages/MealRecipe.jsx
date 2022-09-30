import React, { useEffect, useState } from 'react';
import { object } from 'prop-types';
import RecipesDetails from '../components/RecipesDetails';
import { requestMealDetail } from '../services/recipesDetailsAPI';

function MealRecipe({ history }) {
  const [recipe, setRecipe] = useState({});
  useEffect(() => {
    (async () => {
      const stringPathName = history.location.pathname;
      const id = stringPathName.split('/')[2];
      const data = await requestMealDetail(id);
      setRecipe(data);
    })();
  }, [history]);

  return (
    <div>
      <RecipesDetails recipe={ recipe } />
    </div>
  );
}

MealRecipe.propTypes = {
  history: object,
}.isrequired;

export default MealRecipe;
