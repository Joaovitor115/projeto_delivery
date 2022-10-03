import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import MealsIngredient from './MealsIngredient';
import './cssComponents/RecipesDetail.css';

function RevenueOfMeals({ meals }) {
  const [sizeOfRevenue, setSizeOfRevenue] = useState(0);
  const [sizeOfFinishSteps, setSizeOfFinishSteps] = useState(0);
  const [isDisabled, setIsDisabled] = useState(false);
  const { push } = useHistory();

  useEffect(() => {
    const verifyIsDisabled = sizeOfRevenue === sizeOfFinishSteps;
    setIsDisabled(verifyIsDisabled);
  }, [sizeOfRevenue, sizeOfFinishSteps, isDisabled]);

  const handleClick = () => {
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
  meals: PropTypes.arrayOf(
    PropTypes.shape({
      strCategory: PropTypes.string,
      strMealThumb: PropTypes.string,
      strMeal: PropTypes.string,
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
    }),
  ).isRequired,
};
