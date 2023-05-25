import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import {
  getDoneRecipesLocalStorage,
} from '../localStorageFunctions/functionsGetLocalStorage';
import CardDoneRecipes from '../components/CardDoneRecipes';

function DoneRecipes() {
  const [doneRecipes, setDoneRecipes] = useState([]);
  const [typesFilters, setTypesFilters] = useState({
    all: true,
    meals: false,
    drinks: false,
  });

  useEffect(() => {
    const Recipes = getDoneRecipesLocalStorage();
    if (doneRecipes) setDoneRecipes(Recipes);
  }, [typesFilters]);

  const test = () => {
    if (typesFilters.all) {
      return (
        <div>
          {doneRecipes && doneRecipes.map((element, index) => (
            <CardDoneRecipes
              key={ index }
              recipe={ element }
              index={ index }
            />
          ))}
        </div>
      );
    }
    if (typesFilters.meals) {
      const justFood = doneRecipes.filter((meal) => meal.type === 'meal');
      return (
        <div>
          {justFood && justFood.map((food, index) => (
            <CardDoneRecipes
              key={ index }
              recipe={ food }
              index={ index }
            />
          ))}
        </div>
      );
    }
    if (typesFilters.drinks) {
      const justdrink = doneRecipes.filter((drink) => drink.type === 'drink');
      return (
        <div>
          {justdrink && justdrink.map((drink, index) => (
            <CardDoneRecipes
              key={ index }
              recipe={ drink }
              index={ index }
            />
          ))}
        </div>
      );
    }
  };

  return (
    <div>
      <Header titlePage="Done Recipes" iconProfile />
      <button
        onClick={ () => setTypesFilters({ all: true, drinks: false, meals: false }) }
        type="button"
        data-testid="filter-by-all-btn"
        className="button"
      >
        All
      </button>
      <button
        onClick={ () => setTypesFilters({ all: false, drinks: false, meals: true }) }
        data-testid="filter-by-meal-btn"
        type="button"
        className="button"

      >
        Meals
      </button>
      <button
        onClick={ () => setTypesFilters({ all: false, drinks: true, meals: false }) }
        type="button"
        data-testid="filter-by-drink-btn"
        className="button"

      >
        Drinks
      </button>
      {doneRecipes && test() }
    </div>
  );
}

export default DoneRecipes;
