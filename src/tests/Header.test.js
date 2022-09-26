import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import DoneRecipes from '../pages/DoneRecipes';
import DrinksPage from '../pages/DrinksPage';
import FavoriteProfile from '../pages/FavoriteRecipes';
import MealsPage from '../pages/MealsPage';
import Profile from '../pages/Profile';
import renderWithRouter from './helpers/renderWithRouter';

describe('Testando componente Header', () => {
  test('testa a rendericação do header no componente "DoneRecipes"', () => {
    renderWithRouter(<DoneRecipes />);
    const title = screen.getByText(/done recipes/i);
    expect(title).toBeInTheDocument();
  });
  test('testa se é chamado o title e Header no DrinksPage', () => {
    renderWithRouter(<DrinksPage />);
    expect(screen.getByText(/drinks/i)).toBeInTheDocument();
    const ButtonIcon = screen.getByTestId('search-top-btn');
    expect(ButtonIcon).toBeInTheDocument();
    userEvent.click(ButtonIcon);
    expect(screen.getByTestId('search-input')).toBeInTheDocument();
  });
  test('testa se é chamado o title no MealsPage', () => {
    renderWithRouter(<MealsPage />);
    expect(screen.getByText(/meals/i)).toBeInTheDocument();
  });
  test('se title é chamado no "profile"', () => {
    renderWithRouter(<Profile />);
    expect(screen.getByText(/profile/i)).toBeInTheDocument();
  });
  test('se title é chamado no "FavoriteRecipes"', () => {
    renderWithRouter(<FavoriteProfile />);
    expect(screen.getByText(/favorite recipes/i)).toBeInTheDocument();
  });
});
