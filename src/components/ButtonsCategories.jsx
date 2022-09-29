import { array } from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import {
  categorySelected,
  fetchDrinksRecipes,
  fetchMealsRecipes
} from '../redux/actions/action';
import { filterOfDrinks, filterOfMeals } from '../services/FiltersByCategory';
import { recipesDrinksAPI, recipesMealsAPI } from '../services/RecipesAPI';

function ButtonsCategories({
  categories,
  categorySelec,
  pageSelected,
  setRecipesDrinks,
  setRecipesMeals,
  categorySel,
}) {
  const searchCategory = async (categorie) => {
    categorySelec(categorie);
    if (pageSelected === 'drinks' && categorySel !== categorie) {
      const recipes = await filterOfDrinks(categorie);
      setRecipesDrinks(recipes);
    } else if (pageSelected === 'meals' && categorySel !== categorie) {
      const recipes = await filterOfMeals(categorie);
      setRecipesMeals(recipes);
    } else if (pageSelected === 'drinks' && categorySel === categorie) {
      const recipes = await recipesDrinksAPI();
      setRecipesDrinks(recipes);
    } else /* (pageSelected === 'meals' && categorySel === categorie)  */{
      const recipes = await recipesMealsAPI();
      setRecipesMeals(recipes);
    }
  };

  const searchAll = async () => {
    if (pageSelected === 'drinks') {
      const recipes = await recipesDrinksAPI();
      setRecipesDrinks(recipes);
    } else /* (pageSelected === 'meals')  */{
      const recipes = await recipesMealsAPI();
      setRecipesMeals(recipes);
    }
  };

  return (
    <div>
      {categories.map((categorie, index) => (
        <button
          onClick={ () => searchCategory(categorie.strCategory) }
          type="button"
          data-testid={ `${categorie.strCategory}-category-filter` }
          key={ index }
        >
          {categorie.strCategory}
        </button>
      ))}
      <button
        onClick={ searchAll }
        type="button"
        data-testid="All-category-filter"
      >
        All
      </button>
    </div>
  );
}

const mapDispatchToProps = (dispatch) => ({
  categorySelec: (categorie) => dispatch(categorySelected(categorie)),
  setRecipesDrinks: (recipes) => dispatch(fetchDrinksRecipes(recipes)),
  setRecipesMeals: (recipes) => dispatch(fetchMealsRecipes(recipes)),
});

const mapStateToProps = (state) => ({
  currentCaterogy: state.reducerFetch.categorySelected,
  pageSelected: state.reducerFetch.pageSelected,
  categorySel: state.reducerFetch.categorySelected,
});

ButtonsCategories.propTypes = {
  categories: array,
}.isrequired;

export default connect(mapStateToProps, mapDispatchToProps)(ButtonsCategories);
