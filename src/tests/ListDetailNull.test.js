import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import App from '../App';
/* import DrinksPage from '../pages/DrinksPage'; */
/* import MealsPage from '../pages/MealRecipe'; */
import detailsDrink from './helpers/detailsDrink';
import meals from './helpers/meals';
import renderWithRouterAndRedux from './helpers/rendeWithRouterAndRedux';

const mockFetch = (data) => Promise.resolve({
  json: () => Promise.resolve(data),
});

const flushPromises = () => new Promise((r) => { setTimeout(r); });

describe('Testand details Drinks', () => {
  beforeEach(() => {
    const mockMultFetch = jest.fn()
      .mockReturnValueOnce(mockFetch(detailsDrink))
      .mockReturnValueOnce(mockFetch(meals));
    global.fetch = mockMultFetch;
  });
  const mockFavorites = 'favoriteRecipes';
  const listFavorites = [];
  const setLocalStorage = (id, data) => {
    window.localStorage.setItem(id, JSON.stringify(data));
  };
  setLocalStorage(mockFavorites, listFavorites);
  test('Drinks details', async () => {
    await flushPromises();
    localStorage.removeItem('favoriteRecipes');
    const { history } = renderWithRouterAndRedux(<App />);
    history.push('/drinks/15997');

    await waitFor(() => expect(global.fetch).toHaveBeenCalled());
    /* expect(localStorage.getItem(mockFavorites))
      .toEqual(JSON.stringify(listFavorites)); */
    expect(screen.getByText('GG')).toBeInTheDocument();

    const photo = screen.getByTestId('recipe-photo');
    expect(photo).toBeInTheDocument();
    const recomendation = screen.getByTestId('0-recommendation-card');
    expect(recomendation).toBeInTheDocument();
    const btnFavorite = screen.getByTestId('favorite-btn');
    expect(btnFavorite).toBeInTheDocument();
    userEvent.click(btnFavorite);
    setLocalStorage(mockFavorites, listFavorites);
    /* expect(localStorage.getItem(mockFavorites)).toEqual(JSON.stringify(listFavorites)); */

    global.fetch.mockClear();
  });
});
