import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import App from '../App';
import rendeWithRouterAndRedux from './helpers/rendeWithRouterAndRedux';

describe('Testando a página inicial "Login"', () => {
  it('Test rendering and inicial values', () => {
    rendeWithRouterAndRedux(<App />);
    const emailInnput = screen.getByTestId('email-input');
    expect(emailInnput).toBeInTheDocument();
    const passwordInnput = screen.getByTestId('password-input');
    expect(passwordInnput).toBeInTheDocument();
    const textEntrar = screen.getByText('Enter');
    expect(textEntrar).toBeInTheDocument();

    userEvent.type(emailInnput, 'email@gmail.com');
    userEvent.type(passwordInnput, '1234567');

    userEvent.click(textEntrar);
  });
});
