import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import heartLogo from '../images/blackHeartIcon.svg';
import shareicon from '../images/shareIcon.svg';
import { getFavoriteRecipes,
  removeFavoriteRecipes } from '../services/getFavoriteRecipes';
import Header from '../components/Header';
import '../App.css';

const copy = require('clipboard-copy');

function FavoriteRecipes() {
  const [confirmCopy, setConfirmCopy] = useState(false);
  const clickedCopy = (type, id) => {
    setConfirmCopy(true);
    copy(`http://localhost:3000/${type}s/${id}`);
  };
  return (
    <div>
      <Header titlePage="Favorite Recipes" iconProfile />
      <button
        type="button"
        data-testid="filter-by-all-btn"
      >
        All
      </button>
      <button
        data-testid="filter-by-meal-btn"
        type="button"
      >
        Meals
      </button>
      <button
        type="button"
        data-testid="filter-by-drink-btn"
      >
        Drinks
      </button>
      {getFavoriteRecipes() && getFavoriteRecipes().map((element, index) => (
        <div key={ index }>
          <br />
          <Link to={ `${element.type}s/${element.id}` }>
            <div
              data-testid={ `${index}-horizontal-name` }
            >
              {element.name}
            </div>
            <img
              src={ element.image }
              data-testid={ `${index}-horizontal-image` }
              alt=""
              className="recipe-image"
            />
          </Link>
          <div />
          {
            element.type === 'drink'
              ? (
                <div data-testid={ `${index}-horizontal-top-text` }>
                  {element.alcoholicOrNot}
                </div>) : null
          }

          <div
            data-testid={ `${index}-horizontal-top-text` }
          >
            {`${element.nationality} - ${element.category}`}
          </div>
          <input
            src={ shareicon }
            type="image"
            alt="shareIcon"
            id="recipe-image"
            data-testid={ `${index}-horizontal-share-btn` }
            onClick={ () => {
              clickedCopy(element.type, element.id);
            } }
          />
          {confirmCopy && <p>Link copied!</p>}
          <div>

            <input
              type="image"
              src={ heartLogo }
              alt="is it favorited?"
              data-testid={ `${index}-horizontal-favorite-btn` }
              onClick={ () => {
                removeFavoriteRecipes(element.id);
                window.location.reload();
              } }
            />
          </div>

        </div>
      ))}
    </div>
  );
}

export default FavoriteRecipes;
