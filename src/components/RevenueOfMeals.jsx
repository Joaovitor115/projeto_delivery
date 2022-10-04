import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { object } from 'prop-types';
import MealsIngredient from './MealsIngredient';
import './cssComponents/RecipesDetail.css';
import {
  getDoneRecipesLocalStorage,
} from '../localStorageFunctions/functionsGetLocalStorage';
import {
  setDoneRecipesLocalStorage,
} from '../localStorageFunctions/functionsSetLocalStorage';

function RevenueOfMeals({ meals }) {
  const [sizeOfRevenue, setSizeOfRevenue] = useState(0);
  const [sizeOfFinishSteps, setSizeOfFinishSteps] = useState(0);
  const [isDisabled, setIsDisabled] = useState(false);
  const [doneRecipes, setDoneRecipes] = useState([]);
  const { push } = useHistory();

  const digit2 = (number) => {
    const MAGIC = 10;
    if (number < MAGIC) return `0${number}`;
    return number;
  };

  const converterDate = () => {
    const d = new Date();
    const day = `${digit2(d.getDate())}/${digit2(d.getMonth())}/${d.getFullYear()}`;
    return (day);
  };

  const handlerMeals = (mealRecipe) => {
    const newRecipe = ({
      id: mealRecipe.idMeal,
      type: 'meal',
      nationality: mealRecipe.strArea,
      category: mealRecipe.strCategory,
      alcoholicOrNot: '',
      name: mealRecipe.strMeal,
      image: mealRecipe.strMealThumb,
      doneDate: converterDate(),
      tags: mealRecipe.strTags?.split(',') ?? '',
    });
    return newRecipe;
  };

  useEffect(() => {
    const verifyIsDisabled = sizeOfRevenue === sizeOfFinishSteps;
    setIsDisabled(verifyIsDisabled);
    const allDoneRecipes = getDoneRecipesLocalStorage();
    setDoneRecipes(allDoneRecipes);
  }, [sizeOfRevenue, sizeOfFinishSteps, isDisabled]);

  const handleClick = () => {
    const newObjectMeal = { ...handlerMeals(meals[0]) };
    if (!doneRecipes) {
      setDoneRecipesLocalStorage([newObjectMeal]);
    } else {
      setDoneRecipesLocalStorage([...doneRecipes, newObjectMeal]);
    }
    push('/done-recipes');
  };

  return (
    <div>
      {meals.length > 0 && (
        <div>
          <div>
            <div className="container-details">
              <img
                src={ `${meals[0].strMealThumb}` }
                alt={ `foto de ${meals[0].strMeal}` }
                data-testid="recipe-photo"
                className="image-recipes"
              />
              <h3 data-testid="recipe-title">{meals[0].strMeal}</h3>
              <p data-testid="recipe-category">
                Categoria:
                {': '}
                {meals[0].strCategory}
              </p>
              <MealsIngredient
                meals={ meals }
                setSizeOfRevenue={ setSizeOfRevenue }
                setSizeOfFinishSteps={ setSizeOfFinishSteps }
              />
              <p data-testid="instructions">
                Instruções:
                {' '}
                {meals[0].strInstructions}
              </p>
            </div>
            <button type="button" data-testid="share-btn">
              Compartilhar
            </button>
            <button type="button" data-testid="favorite-btn">
              Favoritar
            </button>
            <button
              type="button"
              data-testid="finish-recipe-btn"
              disabled={ !isDisabled }
              onClick={ handleClick }
            >
              Finalizar a receita
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default RevenueOfMeals;

RevenueOfMeals.propTypes = {
  meals: object,
}.isRequired;
