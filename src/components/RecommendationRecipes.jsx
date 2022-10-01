import { string } from 'prop-types';
import { connect } from 'react-redux';
import React from 'react';
import { Link } from 'react-router-dom';

function RecommendationRecipes({ name, image, indice, id, pageSelected }) {
  return (
    <div
      className="card-recommendation"
      id={ `slide-${indice}` }
      data-testid={ `${indice}-recommendation-card` }
    >
      <Link to={ `/${pageSelected}/${id}` } className="link">
        <img
          data-testid={ `${indice}-card-img` }
          className="recommendation-img"
          src={ image }
          alt={ name }
        />
        <p data-testid={ `${indice}-recommendation-title` }>{ name }</p>
      </Link>
    </div>
  );
}

const mapStateToProps = (state) => ({
  pageSelected: state.reducerFetch.pageSelected,
});

RecommendationRecipes.propTypes = {
  name: string,
  image: string,
}.isrequired;

export default connect(mapStateToProps, null)(RecommendationRecipes);
