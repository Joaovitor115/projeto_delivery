import { func } from 'prop-types';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import Footer from '../components/Footer';
import Header from '../components/Header';
import Recipes from '../components/Recipes';
import { fetchDrinksRecipes } from '../redux/actions/action';
import { recipesDrinksAPI } from '../services/RecipesAPI';

function DrinkRecipes({ requiredFetchDrinksRecipe }) {
  useEffect(() => {
    (async () => {
      const recipes = await recipesDrinksAPI();
      requiredFetchDrinksRecipe(recipes);
    })();
  }, [requiredFetchDrinksRecipe]);

  const handClick = async () => {
    /* const { nome } = this.props;
    const { first } = this.state;
    const { dispatch } = this.props; */
    if (first === 'Ingredient') {
      const a = await IngredientApi(nome);
      dispatch(fethIngredient(a));
    } else if (first === 'Name') {
      const a = await NameApi(nome);
      dispatch(fetchName(a));
    } else if (first === 'First letter' && nome.length > 1) {
      global.alert('Your search must have only 1 (one) character');
    } else {
      const a = await FirstApi(nome);
      dispatch(fetchFirst(a));
    }
  };
  return (
    <section>
      <Header titlePage="Drinks" iconProfile iconSearch />
      <button
        type="button"
        data-testid="exec-search-btn"
        onClick={ handClick }
      >
        Entrar
      </button>
      <Recipes />
      <Footer />
    </section>
  );
}
const mapStateToProps = (state) => ({
  recipesDrinks: state.reducerFetch.recipesDrinks,
});
const mapDispatchToProps = (dispatch) => ({
  requiredFetchDrinksRecipe: (recipes) => dispatch(fetchDrinksRecipes(recipes)),
});
DrinkRecipes.propTypes = {
  requiredFetchDrinksRecipe: func,
}.isrequired;
export default connect(mapStateToProps, mapDispatchToProps)(DrinkRecipes);
