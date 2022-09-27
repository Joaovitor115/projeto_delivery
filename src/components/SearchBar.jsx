import { string } from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchFirst, fetchName, fethIngredient } from '../redux/actions/action';
import FirstApi from '../services/FirstApi';
import IngredientApi from '../services/IngredientApi';
import NameApi from '../services/NameApi';

class SearchBar extends Component {
  state = {
    first: '',
  };

  handleChange = ({ target }) => {
    const { id, name } = target;
    if (name === 'filter') this.setState({ first: id });
  };

  handClick = async () => {
    const { nome } = this.props;
    const { first } = this.state;
    const { dispatch } = this.props;
    if (first === 'Ingredient') {
      const a = await IngredientApi(nome);
      dispatch(fethIngredient(a));
    } else if (first === 'Name') {
      const a = await NameApi(nome);
      dispatch(fetchName(a));
    } else if (first === 'First letter' && nome.length > 1) {
      global.alert('Your search must have only 1 (one) character');
    } else {
      const a = await FirstApi(nome);
      dispatch(fetchFirst(a));
    }
  };

  render() {
    const { first } = this.state;
    return (
      <div>
        <div onChange={ this.handleChange } name="filter">
          <input
            type="radio"
            id="Ingredient"
            name="filter"
            value={ first }
            data-testid="ingredient-search-radio"
          />
          Ingredient
          <input
            type="radio"
            id="Name"
            name="filter"
            value={ first }
            data-testid="name-search-radio"
          />
          Name
          <input
            type="radio"
            id="First letter"
            name="filter"
            value={ first }
            data-testid="first-letter-search-radio"
          />
          First letter
        </div>
        <button
          type="button"
          data-testid="exec-search-btn"
          onClick={ this.handClick }
        >
          Entrar
        </button>
      </div>
    );
  }
}

SearchBar.propTypes = {
  titlePage: string,
}.isRequired;

export default connect()(SearchBar);
