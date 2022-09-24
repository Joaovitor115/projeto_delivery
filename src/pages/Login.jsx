import PropTypes from 'prop-types';
import React, { Component } from 'react';

export default class Login extends Component {
  state = {
    email: '',
    senha: '',
    isDisabled: true,
  };

  validatePassword = () => {
    const { senha, email } = this.state;
    const validateEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const numSenha = 7;
    if (senha.length >= numSenha && email.match(validateEmail)) {
      this.setState({
        isDisabled: false,
      });
    } else {
      this.setState({
        isDisabled: true,
      });
    }
  };

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    }, () => {
      this.validatePassword();
    });
  };

  submitLocale = () => {
    const { email } = this.state;
    const { history } = this.props;
    const user = {
      email,
    };
    const mealsToken = 1;
    const drinksToken = 1;
    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('mealsToken', mealsToken);
    localStorage.setItem('drinksToken', drinksToken);
    history.push('/meals');
  };

  render() {
    const { senha, email, isDisabled } = this.state;
    return (
      <div>
        {senha}
        {email}
        <input
          type="email"
          required
          data-testid="email-input"
          placeholder="Digite seu e-mail!"
          name="email"
          onChange={ this.handleChange }
          value={ email }
        />
        <input
          type="password"
          data-testid="password-input"
          placeholder="Senha!"
          name="senha"
          onChange={ this.handleChange }
          value={ senha }
        />
        <button
          type="button"
          data-testid="login-submit-btn"
          onClick={ this.submitLocale }
          disabled={ isDisabled }
        >
          Enter
        </button>
      </div>
    );
  }
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};
