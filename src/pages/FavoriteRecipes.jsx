import React from 'react';
import heartLogo from '../images/blackHeartIcon.svg';
import shareicon from '../images/shareIcon.svg';
import { getFavoriteRecipes,
  removeFavoriteRecipes } from '../services/getFavoriteRecipes';
import CardRecipes from '../components/CardRecipe';

function FavoriteRecipes() {
  return (
    <div>
      {console.log(getFavoriteRecipes())}
      <h1>  Favorite Recipes </h1>
      {getFavoriteRecipes().map((element, index) => (
        <div key={ index }>
          <br />
          <CardRecipes
            key={ index }
            id={ element.id }
            indice={ index }
            image={ element.image }
            name={ element.name }
          />
          <div>{element.alcoholicOrNot}</div>
          <div>{element.category}</div>
          <div>{element.nationality}</div>
          <img src={ shareicon } alt="shareIcon" />
          <div>

            <input
              type="image"
              src={ heartLogo }
              alt="is it favorited?"
              onClick={ () => {
                removeFavoriteRecipes(element.id);
              } }
            />
          </div>

        </div>
      ))}
    </div>
  );
}

export default FavoriteRecipes;
