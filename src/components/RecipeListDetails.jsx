import React, { useEffect, useState } from 'react';
import { func } from 'prop-types';
import { useHistory } from 'react-router-dom';
import {
  getFavoriteRecipesLocalStorage,
} from '../localStorageFunctions/functionsGetLocalStorage';
import {
  setFavoriteRecipesLocalStorage,
} from '../localStorageFunctions/functionsSetLocalStorage';
import iconeOff from '../images/whiteHeartIcon.svg';
import iconeOn from '../images/blackHeartIcon.svg';
import iconShare from '../images/shareIcon.svg';

const copy = require('clipboard-copy');

function RecipeListDetails({
  setRecommendationDrinks,
  setRecommendationMeals,
  dataRecipes,
  recommendationDrinks,
  recommendationMeals,
}) {
  const history = useHistory();
  const [confirmCopy, setConfirmCopy] = useState(false);
  const [favorites, setFvorites] = useState([]);
  const [favoritClicked, setFavoritClicked] = useState(false);

  useEffect(() => {
    const requiredFavorites = () => {
      const favorit = getFavoriteRecipesLocalStorage();
      setFvorites(favorit);
      const verificationFavorit = favorites ? favorites
        .find((fav) => fav.id === dataRecipes.id) : false;
      setFavoritClicked(verificationFavorit);
    };
    requiredFavorites();
  }, [dataRecipes]);

  const setFavotires = () => {
    setFavoritClicked(!favoritClicked);
    const {
      id, type, nationality, categorie, alcoholic: alcoholicOrNot, title: name, image,
    } = dataRecipes;
    const typ = type === 'meals' ? 'meal' : 'drink';
    if (!favorites) {
      const data = [
        {
          id,
          type: typ,
          nationality,
          category: categorie,
          alcoholicOrNot,
          name,
          image,
        },
      ];
      setFavoriteRecipesLocalStorage(data);
    } else if (favorites) {
      if (favoritClicked) {
        const removeFav = favorites.filter((fav) => fav.id !== dataRecipes.id);
        setFavoriteRecipesLocalStorage(removeFav);
      } else {
        const data = [...favorites,
          {
            id, type: typ, nationality, category: categorie, alcoholicOrNot, name, image,
          },
        ];
        setFavoriteRecipesLocalStorage(data);
      }
    }
  };

  const clickedCopy = () => {
    setConfirmCopy(true);
    copy(`http://localhost:3000${history.location.pathname}`);
  };

  return (
    <div className="container-details">
      <label htmlFor="favorit">
        <input
          className="check-image"
          type="checkbox"
          name="favorit"
          id="favorit"
          onClick={ setFavotires }
          checked={ favoritClicked }
        />
        <img
          data-testid="favorite-btn"
          src={ favoritClicked ? iconeOn : iconeOff }
          alt="icone-favorit"
        />
      </label>

      <button
        onClick={ clickedCopy }
        data-testid="share-btn"
        type="button"
      >
        <img src={ iconShare } alt="icone-compartilhar" />
      </button>
      {confirmCopy && <p>Link copied!</p>}
      <img
        className="image-recipes"
        data-testid="recipe-photo"
        src={ dataRecipes.image }
        alt={ dataRecipes.title }
      />
      <h1 data-testid="recipe-title">{dataRecipes.title}</h1>
      <h3>Categoria</h3>
      <p data-testid="recipe-category">{dataRecipes.categorie}</p>
      {dataRecipes.alcoholic && (
        <p data-testid="recipe-category">{dataRecipes.alcoholic}</p>
      )}
      <h3>Ingredientes</h3>
      <div className="container-ingredients">
        <div>
          { dataRecipes.ingredients.map((ingredient, index) => (
            <p
              key={ index }
              data-testid={ `${index}-ingredient-name-and-measure` }
            >
              {ingredient}
            </p>
          ))}
        </div>
        <div>
          {dataRecipes.amounts && dataRecipes.amounts.map((data, index) => (
            <p
              data-testid={ `${index}-ingredient-name-and-measure` }
              key={ index }
            >
              {data}
            </p>
          ))}
        </div>
      </div>
      <div className="instruction">
        <h4>Instruções:</h4>
        <p data-testid="instructions">{dataRecipes.instructions}</p>
      </div>
      {dataRecipes.videoUrl && (
        <iframe
          data-testid="video"
          width="400"
          height="250"
          src={ `${dataRecipes.videoUrl[0]}/embed/${dataRecipes.videoUrl[1]}` }
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay;
              clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      )}
      <div className="container-recommendation">
        { recommendationDrinks && setRecommendationDrinks() }
        { recommendationMeals && setRecommendationMeals() }
      </div>
    </div>
  );
}

RecipeListDetails.propTypes = {
  setRecommendationDrinks: func,
}.isrequired;

export default RecipeListDetails;
