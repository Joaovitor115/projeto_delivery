import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import './RecipesInProgress.css';
import {
  getRecipesToLocalHistorage,
  saveRecipesToLocalHistorage,
} from '../services/LocalHistorage';

function MealsIngredient({
  meals,
  setSizeOfRevenue,
  setSizeOfFinishSteps,
}) {
  const [listRevenue, setListRevenue] = useState([]);
  const [quantity, setQuantity] = useState([]);
  const [nameFinish, setNameFinish] = useState({
    id: '',
    recipesFinish: [],
  });
  const { idMeal } = meals[0];

  function getArrayOfIngredients(revenue) {
    const entries = [...Object.entries(revenue[0])];
    const allRevenuesList = [];
    entries.forEach((item) => {
      if (item[0].includes('strIngredien')) {
        allRevenuesList.push(item);
      }
    });
    return allRevenuesList;
  }

  function getArrayOfQuantity(revenue) {
    const entries = [...Object.entries(revenue[0])];
    const allRevenuesList = [];
    entries.forEach((item) => {
      if (item[0].includes('strMeasure')) {
        allRevenuesList.push(item);
      }
    });
    return allRevenuesList;
  }

  const getFinishStep = ({ target }) => {
    const teste = target.parentNode;
    const { value } = target;
    if (target.checked === true) {
      teste.className = 'finish phrase-content';
      setNameFinish({
        id: idMeal,
        recipesFinish: [...nameFinish.recipesFinish, value],
      });
      setSizeOfFinishSteps(nameFinish.recipesFinish.length + 1);
    }
    if (target.checked === false) {
      teste.className = 'phrase-content';
      const nameFinishFiltered = nameFinish.recipesFinish.filter(
        (item) => item !== value,
      );
      setNameFinish({
        id: idMeal,
        recipesFinish: [...nameFinishFiltered],
      });
      setSizeOfFinishSteps(nameFinishFiltered.length);
    }
  };

  useEffect(() => {
    setSizeOfRevenue(Number(listRevenue.length));
  }, [listRevenue, setSizeOfRevenue]);

  useEffect(() => {
    const getFromLocalHistorage = () => {
      const recipesLocalHistorage = getRecipesToLocalHistorage();
      if (!recipesLocalHistorage) {
        localStorage.setItem(
          'inProgressRecipes',
          JSON.stringify([
            {
              id: idMeal,
              recipesFinish: [],
            },
          ]),
        );
      }
      const getRecipesUpdated = getRecipesToLocalHistorage();
      const recipeInProgress = getRecipesUpdated.filter(
        (recipe) => recipe.id === meals[0].idMeal,
      );
      if (!recipeInProgress[0]) {
        setNameFinish({
          id: idMeal,
          recipesFinish: [],
        });
        setSizeOfFinishSteps(0);
      } else {
        setSizeOfFinishSteps(recipeInProgress[0].recipesFinish.length);
        setNameFinish(recipeInProgress[0]);
      }
    };
    getFromLocalHistorage();
  }, [
    meals,
    idMeal,
    setSizeOfFinishSteps,
  ]);

  useEffect(() => {
    const getIngredientsOfArray = (func, revenue) => {
      const revenuesList = func(revenue);
      const revenuesFiltered = [];
      revenuesList.forEach((item) => {
        if (item[1] !== '' && item[1] !== null) {
          revenuesFiltered.push(item[1]);
        }
      });
      return revenuesFiltered;
    };
    setListRevenue(getIngredientsOfArray(getArrayOfIngredients, meals));
    setQuantity(getIngredientsOfArray(getArrayOfQuantity, meals));
  }, [meals]);

  useEffect(() => {
    const updateLocalHistorage = (arr) => {
      const recipesLocalHistorage = getRecipesToLocalHistorage();
      const elementsForLocalHistorage = recipesLocalHistorage.filter(
        (recipe) => recipe.id !== idMeal && recipe.id !== '',
      );
      saveRecipesToLocalHistorage([...elementsForLocalHistorage, arr]);
    };
    updateLocalHistorage(nameFinish);
  }, [nameFinish, meals, idMeal]);

  const addClassName = (revenue, list) => {
    const { recipesFinish } = list;
    if (recipesFinish.includes(revenue)) {
      return 'finish phrase-content';
    }
    return 'phrase-content';
  };

  return (
    <div className="container-revenue">
      Instrucões:
      {listRevenue.map((revenue, index) => (
        <label
          htmlFor={ `quantity${index}` }
          key={ index }
          data-testid={ `${index}-ingredient-step` }
          className={ addClassName(revenue, nameFinish) }
        >
          <input
            data-testid={ `${index}-step` }
            type="checkbox"
            onChange={ getFinishStep }
            name={ revenue }
            value={ revenue }
            checked={ nameFinish.recipesFinish.includes(revenue) }
          />

          <p>
            {quantity[index]}
            :
            {' '}
            {revenue}
          </p>
        </label>
      ))}
    </div>
  );
}

export default MealsIngredient;

MealsIngredient.propTypes = {
  meals: PropTypes.arrayOf(
    PropTypes.shape({
      idMeal: PropTypes.string,
    }),
  ).isRequired,
  setSizeOfRevenue: PropTypes.func.isRequired,
  setSizeOfFinishSteps: PropTypes.func.isRequired,
};
