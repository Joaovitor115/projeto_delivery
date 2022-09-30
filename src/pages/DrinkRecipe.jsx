import React, { useEffect, useState } from 'react';
import { object } from 'prop-types';
import RecipesDetails from '../components/RecipesDetails';
import { requestDrinkDetail } from '../services/recipesDetailsAPI';

function DrinkRecipe({ history }) {
  const [recipe, setRecipe] = useState({});
  useEffect(() => {
    (async () => {
      const stringPathName = history.location.pathname;
      const id = stringPathName.split('/')[2];
      const data = await requestDrinkDetail(id);
      setRecipe(data);
    })();
  }, [history]);

  return (
    <div>
      <RecipesDetails recipe={ recipe } />
    </div>
  );
}

DrinkRecipe.propTypes = {
  history: object,
}.isrequired;

export default DrinkRecipe;
