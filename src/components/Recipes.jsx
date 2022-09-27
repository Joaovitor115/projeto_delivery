import { array } from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import CardRecipes from './CardRecipe';

function Recipes({ recipesDrinks, recipesMeals }) {
  const history = useHistory();

  const redirectDrinks = () => {
    const { idDrink } = recipesDrinks[0];
    history.push(`/drinks/${idDrink}`);
  };

  const redirectMeals = () => {
    const { idMeal } = recipesMeals[0];
    history.push(`/meals/${idMeal}`);
  };

  return (
    <ol className="cards">
      {recipesDrinks && recipesDrinks.length === 1
        ? redirectDrinks()
        : recipesDrinks.map((drink, i) => {
          const { idDrink: id, strDrinkThumb, strDrink } = drink;
          return (
            <CardRecipes
              key={ i }
              id={ id }
              indice={ i }
              image={ strDrinkThumb }
              name={ strDrink }
            />
          );
        })}

      {recipesMeals && recipesMeals.length === 1
        ? redirectMeals()
        : recipesMeals.map((meals, i) => {
          const { idMeals: id, strMealThumb, strMeal } = meals;
          return (
            <CardRecipes
              key={ i }
              id={ id }
              indice={ i }
              image={ strMealThumb }
              name={ strMeal }
            />
          );
        })}
    </ol>
  );
}

const mapStateToProps = (state) => ({
  recipesDrinks: state.reducerFetch.recipesDrinks,
  recipesMeals: state.reducerFetch.recipesMeals,
});

Recipes.propTypes = {
  allRecipes: array,
}.isrequered;

export default connect(mapStateToProps, null)(Recipes);
