import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import DoneRecipes from './pages/DoneRecipes';
import DrinkRecipe from './pages/DrinkRecipe';
import DrinksPage from './pages/DrinksPage';
import FavoriteRecipes from './pages/FavoriteRecipes';
import Login from './pages/Login';
import MealRecipe from './pages/MealRecipe';
import MealsPage from './pages/MealsPage';
import Profile from './pages/Profile';
import RecipesInProgress from './pages/RecipesInProgress';

function App() {
  return (
    <div className="meals">
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route exact path="/meals" component={ MealsPage } />
        <Route exact path="/drinks" component={ DrinksPage } />
        <Route exact path="/profile" component={ Profile } />
        <Route exact path="/done-recipes" component={ DoneRecipes } />
        <Route exact path="/favorite-recipes" component={ FavoriteRecipes } />
        <Route exact path="/meals/:id" component={ MealRecipe } />
        <Route exact path="/drinks/:id" component={ DrinkRecipe } />
        <Route exact path="/:type/:id/in-progress" component={ RecipesInProgress } />
      </Switch>
    </div>
  );
}

export default App;
