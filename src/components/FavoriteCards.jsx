import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { object } from 'prop-types';
import heartLogo from '../images/blackHeartIcon.svg';
import shareicon from '../images/shareIcon.svg';
import { removeFavoriteRecipes } from '../services/getFavoriteRecipes';

const copy = require('clipboard-copy');

function FavoriteCard({ recipe, index }) {
  const [confirmCopy, setConfirmCopy] = useState(false);

  const clickedCopy = (type, id) => {
    setConfirmCopy(true);
    copy(`http://localhost:3000/${type}s/${id}`);
  };
  return (
    <div key={ index }>
      <br />
      <Link to={ `${recipe.type}s/${recipe.id}` }>
        <div
          data-testid={ `${index}-horizontal-name` }
        >
          {recipe.name}
        </div>
        <img
          src={ recipe.image }
          data-testid={ `${index}-horizontal-image` }
          alt=""
          className="recipe-image"
        />
      </Link>
      <div />
      {
        recipe.type === 'drink'
          ? (
            <div data-testid={ `${index}-horizontal-top-text` }>
              {recipe.alcoholicOrNot}
            </div>) : null
      }

      <div
        data-testid={ `${index}-horizontal-top-text` }
      >
        {`${recipe.nationality} - ${recipe.category}`}
      </div>
      <input
        src={ shareicon }
        type="image"
        alt="shareIcon"
        id="recipe-image"
        data-testid={ `${index}-horizontal-share-btn` }
        onClick={ () => {
          clickedCopy(recipe.type, recipe.id);
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
            removeFavoriteRecipes(recipe.id);
            window.location.reload();
          } }
        />
      </div>

    </div>
  );
}

FavoriteCard.propTypes = {
  recipe: object,
}.isrequired;

export default FavoriteCard;
