import React from 'react';
import { string } from 'prop-types';

function CardRecipes({ name, image, indice }) {
  console.log(indice);
  return (
    <li data-testid={ `${indice}-recipe-card` }>
      <img
        data-testid={ `${indice}-card-img` }
        className="recipe-image"
        src={ image }
        alt={ name }
      />
      <p data-testid={ `${indice}-card-name` }>{ name }</p>
    </li>
  );
}

CardRecipes.propTypes = {
  name: string,
  image: string,
}.isrequired;

export default CardRecipes;
