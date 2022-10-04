import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';

export default class Profile extends Component {
  state = { email: '' };

  componentDidMount() {
    const email = JSON.parse(localStorage.getItem('user'));
    this.setState({ email });
  }

  clearAndRedirect = () => {
    const { history } = this.props;
    localStorage.clear();
    history.push('/');
  };

  render() {
    const { email } = this.state;
    const { history } = this.props;

    return (
      <div>
        <Header titlePage="Profile" iconProfile />
        <Footer />
        <div data-testid="profile-email">
          <p>{ email && email.email }</p>
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
          onClick={ this.clearAndRedirect }
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
