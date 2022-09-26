import { string } from 'prop-types';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';
import SearchBar from './SearchBar';

function Header({ titlePage, iconProfile, iconSearch }) {
  const [name, setNome] = useState('');
  const [visibleSearch, setVisibleSearch] = useState(false);

  const setSearch = () => {
    setVisibleSearch(!visibleSearch);
  };

  /* const handChange = ({ target }) => {
    setNome((state) => ({
      ...state,
      [target.name]: target.value,
    }));
  }; */

  return (
    <section>
      {visibleSearch && <input
        data-testid="search-input"
        type="text"
        name="name"
        value={ name }
        onChange={ (e) => setNome(e.target.value) }
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
        <button type="button" onClick={ setSearch }>
          <img data-testid="search-top-btn" src={ searchIcon } alt="Search Icon" />
        </button>
      )}
      <SearchBar nome={ name } />
    </section>
  );
}

Header.propTypes = {
  titlePage: string,
}.isRequired;

export default Header;
