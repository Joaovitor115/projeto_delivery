import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import DrinksIngredient from './DrinksIngredient';
import './cssComponents/RecipesDetail.css';
import {
  getDoneRecipesLocalStorage,
} from '../localStorageFunctions/functionsGetLocalStorage';
import {
  setDoneRecipesLocalStorage,
} from '../localStorageFunctions/functionsSetLocalStorage';

function RevenueOfDrinks({ drinks }) {
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

  const handlerDrinks = (drinksRecipe) => {
    const newRecipe = ({
      id: drinksRecipe.idDrink,
      type: 'drink',
      nationality: '',
      category: drinksRecipe.strCategory,
      alcoholicOrNot: drinksRecipe.strAlcoholic,
      name: drinksRecipe.strDrink,
      image: drinksRecipe.strDrinkThumb,
      doneDate: converterDate(),
      tags: drinksRecipe.strTags?.split(',') ?? '',
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
    const newObjectDrink = { ...handlerDrinks(drinks[0]) };
    if (!doneRecipes) {
      setDoneRecipesLocalStorage([newObjectDrink]);
    } else {
      setDoneRecipesLocalStorage([...doneRecipes, newObjectDrink]);
    }
    push('/done-recipes');
  };

  return (
    <div>
      {drinks.length > 0 && (
        <div>
          <div>
            <div className="container-details">
              <img
                src={ `${drinks[0].strDrinkThumb}` }
                alt={ `foto de ${drinks[0].strCategory}` }
                data-testid="recipe-photo"
                className="image-recipes"
              />
              <h3 data-testid="recipe-title">{drinks[0].strGlass}</h3>
              <p data-testid="recipe-category">
                Tipo de drink:
                {' '}
                {drinks[0].strAlcoholic}
              </p>
              <DrinksIngredient
                drinks={ drinks }
                setSizeOfRevenue={ setSizeOfRevenue }
                setSizeOfFinishSteps={ setSizeOfFinishSteps }
              />
              <div>
                <h3 data-testid="instructions">{drinks[0].strInstructions}</h3>
              </div>
              <button
                type="button"
                data-testid="share-btn"
                className="button"
              >
                Compartilhar
              </button>
              <button
                type="button"
                data-testid="favorite-btn"
                className="button"
              >
                Favoritar
              </button>
              <button
                type="button"
                data-testid="finish-recipe-btn"
                disabled={ !isDisabled }
                onClick={ handleClick }
                className="button4"
              >
                Finalizar a receita
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default RevenueOfDrinks;

RevenueOfDrinks.propTypes = {
  drinks: PropTypes.arrayOf(
    PropTypes.shape({
      strCategory: PropTypes.string,
      strDrinkThumb: PropTypes.string,
      strAlcoholic: PropTypes.string,
      strIngredient1: PropTypes.string,
      strIngredient2: PropTypes.string,
      strIngredient3: PropTypes.string,
      strIngredient4: PropTypes.string,
      strIngredient5: PropTypes.string,
      strIngredient6: PropTypes.string,
      strIngredient7: PropTypes.string,
      strIngredient8: PropTypes.string,
      strIngredient9: PropTypes.string,
      strIngredient10: PropTypes.string,
      strMeasure1: PropTypes.string,
      strMeasure2: PropTypes.string,
      strMeasure3: PropTypes.string,
      strMeasure4: PropTypes.string,
      strMeasure5: PropTypes.string,
      strMeasure6: PropTypes.string,
      strMeasure7: PropTypes.string,
      strMeasure8: PropTypes.string,
      strMeasure9: PropTypes.string,
      strMeasure10: PropTypes.string,
      strInstructions: PropTypes.string,
      strGlass: PropTypes.string,
    }),
  ).isRequired,
};
