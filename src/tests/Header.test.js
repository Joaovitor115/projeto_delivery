import React from 'react';
import { render, screen } from '@testing-library/react';
import { Router } from 'react-router-dom';
// import userEvent from '@testing-library/user-event';
import { createMemoryHistory } from 'history';
import DoneRecipes from '../pages/DoneRecipes';

const renderWithRouter = (component) => {
  const history = createMemoryHistory();
  return ({
    ...render(<Router history={ history }>{component}</Router>), history,
  });
};

describe('Testando componente Header', () => {
  test('testa a rendericação do header', () => {
    const { history } = renderWithRouter(<DoneRecipes />);
    const { pathname } = history.location;
    expect(pathname).toBe('/done-recipes');
    const titleDoneRecipes = screen.getByTestId('page-title');
    expect(titleDoneRecipes).toBeInTheDocument();
  });
});
