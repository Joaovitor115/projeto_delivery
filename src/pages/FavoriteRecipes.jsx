import React, { useEffect, useState } from 'react';
import { getFavoriteRecipes } from '../services/getFavoriteRecipes';
import Header from '../components/Header';
import FavoriteCard from '../components/FavoriteCards';
import '../App.css';

function FavoriteRecipes() {
  const [currentFavorites, setCurrentFavorites] = useState([]);
  const [typesFilters, setTypesFilters] = useState({
    all: true,
    meals: false,
    drinks: false,
  });

  useEffect(() => {
    const favorites = getFavoriteRecipes();
    if (favorites) setCurrentFavorites(favorites);
  }, []);

  const filterType = () => {
    if (typesFilters.all) {
      return (
        <div>
          {currentFavorites && currentFavorites.map((element, index) => (
            <FavoriteCard
              key={ index }
              recipe={ element }
              index={ index }
            />
          ))}
        </div>
      );
    }

    if (typesFilters.meals) {
      const justFood = currentFavorites.filter((food) => food.type === 'meal');
      return (
        <div>
          {justFood && justFood.map((food, index) => (
            <FavoriteCard
              key={ index }
              recipe={ food }
              index={ index }
            />
          ))}
        </div>
      );
    }

    if (typesFilters.drinks) {
      const justdrink = currentFavorites.filter((drink) => drink.type === 'drink');
      return (
        <div>
          {justdrink && justdrink.map((drink, index) => (
            <FavoriteCard
              key={ index }
              recipe={ drink }
              index={ index }
            />
          ))}
        </div>
      );
    }
  };

  return (
    <div>
      <Header titlePage="Favorite Recipes" iconProfile />
      <button
        onClick={ () => setTypesFilters({ all: true, drinks: false, meals: false }) }
        type="button"
        data-testid="filter-by-all-btn"
      >
        All
      </button>
      <button
        onClick={ () => setTypesFilters({ all: false, drinks: false, meals: true }) }
        data-testid="filter-by-meal-btn"
        type="button"
      >
        Meals
      </button>
      <button
        onClick={ () => setTypesFilters({ all: false, drinks: true, meals: false }) }
        type="button"
        data-testid="filter-by-drink-btn"
      >
        Drinks
      </button>
      <div>
        { currentFavorites && filterType() }
      </div>
    </div>
  );
}

export default FavoriteRecipes;
