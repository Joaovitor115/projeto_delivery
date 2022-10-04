import React, { useState } from 'react';
import { object } from 'prop-types';
import { Link } from 'react-router-dom';
import iconShare from '../images/shareIcon.svg';

const copy = require('clipboard-copy');

function CardDoneRecipes({ recipe, index }) {
  const [confirmCopy, setConfirmCopy] = useState(false);

  const clickedCopy = (type, id) => {
    setConfirmCopy(true);
    copy(`http://localhost:3000/${type}s/${id}`);
  };

  if (recipe) {
    return (
      <div>
        <button
          src={ iconShare }
          onClick={ () => clickedCopy(recipe.type, recipe.id) }
          type="button"
          data-testid={ `${index}-horizontal-share-btn` }
        >
          <img src={ iconShare } alt="icone-compartilhar" />
        </button>
        {confirmCopy && <p>Link copied!</p>}
        <br />
        <Link to={ `${recipe.type}s/${recipe.id}` }>

          <img
            data-testid={ `${index}-horizontal-image` }
            src={ recipe.image }
            alt={ recipe.name }
            className="recipe-image"
          />
          <h2 data-testid={ `${index}-horizontal-name` }>{ recipe.name }</h2>
          <h4>Category</h4>
          <p data-testid={ `${index}-horizontal-top-text` }>
            {recipe.type === 'meal'
              ? `${recipe.nationality} - ${recipe.category}`
              : `${recipe.alcoholicOrNot} - ${recipe.category}`}
          </p>
          <h4>date it was performed</h4>
          <p data-testid={ `${index}-horizontal-done-date` }>{ recipe.doneDate }</p>
          {recipe.tags && (
            <p
              data-testid={ `${index}-${recipe.tags[0]}-horizontal-tag` }
            >
              {recipe.tags[0]}
            </p>
          )}
          {recipe.tags && (
            <p
              data-testid={ `${index}-${recipe.tags[1]}-horizontal-tag` }
            >
              {recipe.tags[1]}
            </p>
          )}
        </Link>
      </div>
    );
  }
}

CardDoneRecipes.propTypes = {
  recipe: object,
}.isrequired;

export default CardDoneRecipes;
