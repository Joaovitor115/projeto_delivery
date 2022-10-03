import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import {
  getRecipesToLocalHistorage,
  saveRecipesToLocalHistorage,
} from '../services/LocalHistorage';
import './RecipesInProgress.css';

function DrinksIngredient({
  drinks,
  setSizeOfRevenue,
  setSizeOfFinishSteps,
}) {
  const [listRevenue, setListRevenue] = useState([]);
  const [quantity, setQuantity] = useState([]);
  const [nameFinish, setNameFinish] = useState({
    id: '',
    recipesFinish: [],
  });
  const { idDrink } = drinks[0];

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
        id: idDrink,
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
        id: idDrink,
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
        localStorage.setItem('inProgressRecipes', JSON.stringify([{
          id: idDrink,
          recipesFinish: [],
        }]));
      }
      const getRecipesUpdated = getRecipesToLocalHistorage();
      const recipeInProgress = getRecipesUpdated
        .filter((recipe) => recipe.id === drinks[0].idDrink);
      if (!recipeInProgress[0]) {
        setNameFinish({
          id: idDrink,
          recipesFinish: [],
        });
        setSizeOfFinishSteps(0);
      } else {
        setSizeOfFinishSteps(recipeInProgress[0].recipesFinish.length);
        setNameFinish(recipeInProgress[0]);
      }
    };
    getFromLocalHistorage();
  }, [drinks, idDrink, setSizeOfFinishSteps]);

  useEffect(() => {
    const updateLocalHistorage = (arr) => {
      const recipesLocalHistorage = getRecipesToLocalHistorage();
      const elementsForLocalHistorage = recipesLocalHistorage.filter(
        (recipe) => recipe.id !== idDrink && recipe.id !== '',
      );
      saveRecipesToLocalHistorage([...elementsForLocalHistorage, arr]);
    };
    updateLocalHistorage(nameFinish);
  }, [nameFinish, drinks, idDrink]);

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
    setListRevenue(getIngredientsOfArray(getArrayOfIngredients, drinks));
    setQuantity(getIngredientsOfArray(getArrayOfQuantity, drinks));
  }, [drinks]);

  const addClassName = (revenue, list) => {
    const { recipesFinish } = list;
    if (recipesFinish.includes(revenue)) {
      return 'finish phrase-content';
    }
    return 'phrase-content';
  };

  return (
    <div className="container-revenue">
      {listRevenue.map((revenue, index) => (
        <label
          htmlFor={ `quantity${index}` }
          key={ index }
          data-testid={ `${index}-ingredient-step` }
          className={ addClassName(revenue, nameFinish) }
        >
          <input
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

export default DrinksIngredient;

DrinksIngredient.propTypes = {
  drinks: PropTypes.arrayOf(
    PropTypes.shape({
      idDrink: PropTypes.string,
    }),
  ).isRequired,
  setSizeOfRevenue: PropTypes.func.isRequired,
  setSizeOfFinishSteps: PropTypes.func.isRequired,
};
