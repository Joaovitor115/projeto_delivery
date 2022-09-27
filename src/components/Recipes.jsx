import { array } from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import CardRecipes from './CardRecipe';

function Recipes({ recipesDrinks, recipesMeals }) {
  console.log(recipesDrinks.length);
  return (
    <ol className="cards">
      {recipesDrinks && recipesDrinks.map((drink, i) => {
        const { idDrink, strDrinkThumb, strDrink } = drink;
        if (recipesDrinks.length === 1) {
          return <Redirect to={ `/drinks/${idDrink}` } />;
        }
        return (
          <CardRecipes
            key={ i }
            id={ idDrink }
            indice={ i }
            image={ strDrinkThumb }
            name={ strDrink }
          />
        );
      })}

      {recipesMeals && recipesMeals.map((meals, i) => {
        const { idMeal, strMealThumb, strMeal } = meals;
        if (recipesMeals.length === 1) {
          return <Redirect to={ `/meals/${idMeal}` } />;
        }
        return (
          <CardRecipes
            key={ i }
            id={ idMeal }
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
