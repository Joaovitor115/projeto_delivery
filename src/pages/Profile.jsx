import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';

export default class Profile extends Component {
  state = {

  };

  render() {
    function get() {
      const item = JSON.parse(localStorage.getItem('user'));
      return item.email;
    }
    function clean() {
      localStorage.clear();
    }
    const { history } = this.props;
    return (
      <div>
        <Header titlePage="Profile" iconProfile />
        <Footer />
        <div data-testid="profile-email">
          {get()}
        </div>
        <button
          data-testid="profile-done-btn"
          type="button"
          onClick={ () => {
            history.push('/done-recipes');
          } }
        >
          Done Recipes
        </button>
        <button
          data-testid="profile-favorite-btn"
          type="button"
          onClick={ () => {
            history.push('/favorite-recipes');
          } }
        >
          Favorite Recipes
        </button>
        <button
          data-testid="profile-logout-btn"
          type="button"
          onClick={ () => {
            clean();
            history.push('/');
          } }
        >
          Logout
        </button>
      </div>
    );
  }
}
Profile.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};
