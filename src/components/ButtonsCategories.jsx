import React from 'react';
import { array } from 'prop-types';

function ButtonsCategories({ categories }) {
  console.log(categories);
  return (
    <div>
      {categories.map((categorie, index) => (
        <button
          type="button"
          data-testid={ `${categorie.strCategory}-category-filter` }
          key={ index }
        >
          {categorie.strCategory}
        </button>
      ))}
    </div>
  );
}

ButtonsCategories.propTypes = {
  categories: array,
}.isrequired;

export default ButtonsCategories;
