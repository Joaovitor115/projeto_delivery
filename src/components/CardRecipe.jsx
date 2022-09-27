import { string } from 'prop-types';
import React from 'react';

function CardRecipes({ name, image, indice }) {
  console.log(indice);
  return (
    <div>
      <li data-testid={ `${indice}-recipe-card` }>
        <img
          data-testid={ `${indice}-card-img` }
          className="recipe-image"
          src={ image }
          alt={ name }
        />
        <p data-testid={ `${indice}-card-name` }>{ name }</p>
      </li>
    </div>
  );
}

CardRecipes.propTypes = {
  name: string,
  image: string,
}.isrequired;

export default CardRecipes;
