import { func } from 'prop-types';
import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';
import { requiretName } from '../redux/actions/action';
import SearchBar from './SearchBar';
import '../App.css';

function Header({ search, titlePage, iconProfile, iconSearch, name, requiret }) {
  const [visibleSearch, setVisibleSearch] = useState(false);
  console.log(search, iconProfile);
  const setSearch = () => {
    setVisibleSearch(!visibleSearch);
  };

  const handChange = ({ target }) => {
    requiret(target.value);
  };

  return (
    <section>
      {visibleSearch && <input
        data-testid="search-input"
        type="text"
        value={ name }
        onChange={ handChange }
      />}
      <h1 data-testid="page-title">{ titlePage }</h1>
      {iconProfile && (
        <Link to="/profile">
          <img
            data-testid="profile-top-btn"
            src={ profileIcon }
            alt="Profile Icon"
          />
        </Link>
      )}
      {iconSearch && (
        <button data-testid="set-search" type="button" onClick={ setSearch }>
          <img data-testid="search-top-btn" src={ searchIcon } alt="Search Icon" />
        </button>
      )}
      {search && <SearchBar />}
    </section>
  );
}

const mapStateToProps = (state) => ({
  name: state.reducerFetch.name,
});
const mapDispatchToProps = (dispatch) => ({
  requiret: (name) => dispatch(requiretName(name)),
});
Header.propTypes = {
  requiredFetchMealsRecipe: func,
}.isrequired;
export default connect(mapStateToProps, mapDispatchToProps)(Header);
