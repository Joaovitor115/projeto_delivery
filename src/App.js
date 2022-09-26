import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.css';
import Login from './pages/Login';
import MealsPage from './pages/MealsPage';
import DrinksPage from './pages/DrinksPage';
import DrinkRecipe from './pages/DrinkRecipe';
import MealRecipe from './pages/MealRecipe';
import Profile from './pages/Profile';
import MealsInProgress from './pages/MealsInProgress';
import DrinksInProgress from './pages/DrinksInProgress';
import DoneRecipes from './pages/DoneRecipes';
import FavoriteRecipes from './pages/FavoriteRecipes';

function App() {
  return (
    <div className="meals">
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={ Login } />
          <Route exact path="/meals" component={ MealsPage } />
          <Route exact path="/drinks" component={ DrinksPage } />
          <Route exact path="/profile" component={ Profile } />
          <Route exact path="/done-recipes" component={ DoneRecipes } />
          <Route exact path="/favorite-recipes" component={ FavoriteRecipes } />
          <Route exact path="/meals/:id" component={ MealRecipe } />
          <Route exact path="/drinks/:id" component={ DrinkRecipe } />
          <Route exact path="/meals/:id/in-progress" component={ MealsInProgress } />
          <Route exact path="/drinks/:id/in-progress" component={ DrinksInProgress } />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
