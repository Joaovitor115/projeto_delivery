import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { object } from 'prop-types';
import { useHistory } from 'react-router-dom';
import { typePageSelect } from '../redux/actions/action';
import RecommendationRecipes from './RecommendationRecipes';
import RecipeListDetails from './RecipeListDetails';
import { getDoneRecipesLocalStorage, getInprogressRecipesLocalStorage }
  from '../localStorageFunctions/functionsGetLocalStorage';

function RecipesDetails({ recipe, sixDrinks, sixMeals, setPageSelect }) {
  const history = useHistory();
  const [dataRecipes, setDataRecipes] = useState({
    type: '',
    id: '',
    image: '',
    title: '',
    instructions: '',
    categorie: '',
    ingredients: [],
    videoUrl: '',
    alcoholic: '',
    amounts: [],
  });
  const [recommendationDrinks, setDrinks] = useState([]);
  const [recommendationMeals, setMeals] = useState([]);
  const [doneRecipes, setDoneRecipes] = useState([]);
  const [inProgress, setInProgress] = useState({ drinks: {}, meals: {} });

  const verificationDone = () => {
    if (doneRecipes) {
      const verification = doneRecipes.find((recip) => recip.id === dataRecipes.id
        && recip.name === dataRecipes.title);
      return verification;
    }
    return undefined;
  };

  const verificationProgress = () => {
    if (dataRecipes.type === 'meals') {
      const test = inProgress?.meals?.[dataRecipes.id];
      return test;
    }
    if (dataRecipes.type === 'drinks') {
      const test = inProgress?.drinks?.[dataRecipes.id];
      return test;
    }
  };

  const setRecommendationDrinks = () => {
    setPageSelect('drinks');
    const list = recommendationDrinks.map((drink, i) => {
      const { idDrink: id, strDrinkThumb, strDrink } = drink;
      return (
        <RecommendationRecipes
          key={ i }
          id={ id }
          indice={ i }
          image={ strDrinkThumb }
          name={ strDrink }
        />
      );
    });
    return list;
  };

  const setRecommendationMeals = () => {
    setPageSelect('meals');
    const list = recommendationMeals.map((meal, i) => {
      const { idMeal: id, strMealThumb, strMeal } = meal;
      return (
        <RecommendationRecipes
          key={ i }
          id={ id }
          indice={ i }
          image={ strMealThumb }
          name={ strMeal }
        />
      );
    });
    return list;
  };

  const filterIngredientsMeals = (array) => {
    const ingredientsArray = [];
    array.forEach((item, index) => {
      const numberMagic = 8;
      if (index > numberMagic
        && item[0] === `strIngredient${index - numberMagic}`
        && item[1] !== '') {
        ingredientsArray.push(item[1]);
      }
    });
    return ingredientsArray;
  };

  const filterIngredientsDrinks = (obj) => {
    const {
      strIngredient1, strIngredient2, strIngredient3, strIngredient4,
      strIngredient5, strIngredient6, strIngredient7, strIngredient8, strIngredient9,
      strIngredient10, strIngredient11, strIngredient12, strIngredient13, strIngredient14,
      strIngredient15,
    } = obj;
    const arrayIngredients = [
      strIngredient1, strIngredient2, strIngredient3, strIngredient4,
      strIngredient5, strIngredient6, strIngredient7, strIngredient8,
      strIngredient9, strIngredient10, strIngredient11, strIngredient12,
      strIngredient13, strIngredient14, strIngredient15,
    ];
    const filterIngredients = arrayIngredients.filter((drink) => drink !== '')
      .filter((item) => item !== null).filter((i) => i !== ' ');
    return filterIngredients;
  };

  const filterAmountDrinks = (obj) => {
    const {
      strMeasure1, strMeasure2, strMeasure3, strMeasure4, strMeasure5, strMeasure6,
      strMeasure7, strMeasure8, strMeasure9, strMeasure10, strMeasure11, strMeasure12,
      strMeasure13, strMeasure14, strMeasure15,
    } = obj;
    const arrayIngredients = [
      strMeasure1, strMeasure2, strMeasure3, strMeasure4, strMeasure5, strMeasure6,
      strMeasure7, strMeasure8, strMeasure9, strMeasure10, strMeasure11, strMeasure12,
      strMeasure13, strMeasure14, strMeasure15,
    ];
    const filterIngredients = arrayIngredients.filter((drink) => drink !== '')
      .filter((item) => item !== null).filter((i) => i !== ' ');

    return filterIngredients;
  };

  const filterAmontMeals = (array) => {
    const amontMeals = [];
    const numberMagic = 28;
    array.forEach((meal, index) => {
      if (index > numberMagic && meal[0] === `strMeasure${index - numberMagic}`) {
        amontMeals.push(meal[1]);
      }
    });
    const currenctAmount = amontMeals
      .filter((item) => item !== ' ').filter((i) => i !== null);
    return currenctAmount;
  };

  const handlerMeals = (mealRecipe) => {
    if (mealRecipe) {
      setDataRecipes({
        nationality: mealRecipe.strArea,
        type: 'meals',
        id: mealRecipe.idMeal,
        image: mealRecipe.strMealThumb,
        instructions: mealRecipe.strInstructions,
        title: mealRecipe.strMeal,
        categorie: mealRecipe.strCategory,
        ingredients: filterIngredientsMeals(Object.entries(mealRecipe)),
        videoUrl: mealRecipe.strYoutube.split('watch?v='),
        alcoholic: '',
        amounts: filterAmontMeals(Object.entries(mealRecipe)),
        linkRecipe: mealRecipe.strSource,
        tags: mealRecipe.strTags?.split(',') ?? '',
      });
    }
  };
  const handlerDrinks = (drinkRecipe) => {
    if (drinkRecipe) {
      setDataRecipes({
        nationality: '',
        type: 'drinks',
        id: drinkRecipe.idDrink,
        image: drinkRecipe.strDrinkThumb,
        title: drinkRecipe.strDrink,
        instructions: drinkRecipe.strInstructions,
        categorie: drinkRecipe.strCategory,
        ingredients: filterIngredientsDrinks(drinkRecipe),
        videoUrl: drinkRecipe.strYoutube,
        alcoholic: drinkRecipe.strAlcoholic,
        amounts: filterAmountDrinks(drinkRecipe),
        linkRecipe: drinkRecipe.strSource,
        tags: '',
      });
    }
  };

  useEffect(() => {
    (async () => {
      const currencyRecipe = await recipe;
      const meals = await currencyRecipe?.meals?.[0];
      const drinks = await currencyRecipe?.drinks?.[0];
      const recommendationD = await sixDrinks;
      const recommendationM = await sixMeals;
      handlerDrinks(drinks);
      handlerMeals(meals);
      setMeals(recommendationM);
      setDrinks(recommendationD);
      setDoneRecipes(getDoneRecipesLocalStorage());
      setInProgress(getInprogressRecipesLocalStorage());
    })();
  }, [recipe, sixDrinks, sixMeals]);

  return (
    <div>
      {dataRecipes.ingredients && (
        <div>
          <RecipeListDetails
            setRecommendationDrinks={ setRecommendationDrinks }
            setRecommendationMeals={ setRecommendationMeals }
            dataRecipes={ dataRecipes }
            recommendationDrinks={ recommendationDrinks }
            recommendationMeals={ recommendationMeals }
            doneRecipes={ doneRecipes }
          />
          { !verificationDone() && (
            <button
              className="button-start-recipe"
              type="button"
              data-testid="start-recipe-btn"
              onClick={ () => history
                .push(`/${dataRecipes.type}/${dataRecipes.id}/in-progress`) }
            >
              {!verificationProgress() ? 'Start Recipe' : 'Continue Recipe' }
            </button>
          )}
        </div>
      )}
    </div>
  );
}

const mapDispatchToProps = (dispatch) => ({
  setPageSelect: (page) => dispatch(typePageSelect(page)),
});

RecipesDetails.propTypes = {
  recipe: object,
}.isrequired;

export default connect(null, mapDispatchToProps)(RecipesDetails);
