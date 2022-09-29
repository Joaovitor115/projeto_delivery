import { string } from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { handCh } from '../redux/actions/action';

class SearchBar extends Component {
  state = {
    first: '',
  };

  handleChange = ({ target }) => {
    const { id } = target;
    this.setState({
      first: id,
    }, () => {
      const { first } = this.state;
      const { dispatch } = this.props;
      dispatch(handCh(first));
    });
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
      </div>
    );
  }
}

SearchBar.propTypes = {
  titlePage: string,
}.isRequired;

export default connect()(SearchBar);
