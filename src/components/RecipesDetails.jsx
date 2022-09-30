import React, { useEffect, useState } from 'react';
import { object } from 'prop-types';
import './cssComponents/RecipesDetail.css';

function RecipesDetails({ recipe }) {
  const [dataRecipes, setDataRecipes] = useState({
    image: '',
    title: '',
    instructions: '',
    categorie: '',
    ingredients: [],
    videoUrl: '',
    alcoholic: '',
    amounts: [],
  });

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
        image: mealRecipe.strMealThumb,
        instructions: mealRecipe.strInstructions,
        title: mealRecipe.strMeal,
        categorie: mealRecipe.strCategory,
        ingredients: filterIngredientsMeals(Object.entries(mealRecipe)),
        videoUrl: mealRecipe.strYoutube.split('watch?v='),
        amounts: filterAmontMeals(Object.entries(mealRecipe)),
      });
    }
  };
  const handlerDrinks = (drinkRecipe) => {
    if (drinkRecipe) {
      setDataRecipes({
        image: drinkRecipe.strDrinkThumb,
        title: drinkRecipe.strDrink,
        instructions: drinkRecipe.strInstructions,
        categorie: drinkRecipe.strCategory,
        ingredients: filterIngredientsDrinks(drinkRecipe),
        videoUrl: drinkRecipe.strYoutube,
        alcoholic: drinkRecipe.strAlcoholic,
        amounts: filterAmountDrinks(drinkRecipe),
      });
    }
  };

  useEffect(() => {
    (async () => {
      const currencyRecipe = await recipe;
      const meals = await currencyRecipe?.meals?.[0];
      const drinks = await currencyRecipe?.drinks?.[0];
      handlerDrinks(drinks);
      handlerMeals(meals);
    })();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [recipe]);

  return (
    <div>
      {/* {console.log(dataRecipes.ingredients)} */}
      {console.log(recipe)}
      {dataRecipes.ingredients && (
        <div className="container-details">
          <img
            className="image-recipes"
            data-testid="recipe-photo"
            src={ dataRecipes.image }
            alt={ dataRecipes.title }
          />
          <h1 data-testid="recipe-title">{dataRecipes.title}</h1>
          <h3>Categoria</h3>
          <p data-testid="recipe-category">{dataRecipes.categorie}</p>
          {dataRecipes.alcoholic && (
            <p data-testid="recipe-category">{dataRecipes.alcoholic}</p>
          )}
          <h3>Ingredientes</h3>
          <div className="container-ingredients">
            { dataRecipes.ingredients.map((ingredient, index) => (
              <p
                key={ index }
                data-testid={ `${index}-ingredient-name-and-measure` }
              >
                {ingredient}
              </p>
            ))}
            {dataRecipes.amounts && dataRecipes.amounts.map((data, index) => (
              <p
                data-testid={ `${index}-ingredient-name-and-measure` }
                key={ index }
              >
                {data}
              </p>
            ))}
          </div>
          <h4>Instruções:</h4>
          <p data-testid="instructions">{dataRecipes.instructions}</p>
          {dataRecipes.videoUrl && (
            <iframe
              data-testid="video"
              width="560"
              height="315"
              src={ `${dataRecipes.videoUrl[0]}/embed/${dataRecipes.videoUrl[1]}` }
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay;
              clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          )}
        </div>
      )}
    </div>
  );
}
RecipesDetails.propTypes = {
  recipe: object,
}.isrequired;

export default RecipesDetails;
