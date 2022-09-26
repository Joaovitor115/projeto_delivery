import React, { useState } from 'react';
import { string } from 'prop-types';
import { Link } from 'react-router-dom';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';

function Header({ titlePage, iconProfile, iconSearch }) {
  const [visibleSearch, setVisibleSearch] = useState(false);

  const setSearch = () => {
    setVisibleSearch(!visibleSearch);
  };

  return (
    <section>
      {visibleSearch && <input data-testid="search-input" type="text" />}
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
    </section>
  );
}

Header.propTypes = {
  titlePage: string,
}.isRequired;

export default Header;
