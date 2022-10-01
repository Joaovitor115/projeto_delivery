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
  test('Drinks details', async () => {
    await flushPromises();
    const { history } = renderWithRouterAndRedux(<App />);
    history.push('/drinks/15997');

    await waitFor(() => expect(global.fetch).toHaveBeenCalled());
    expect(screen.getByText('GG')).toBeInTheDocument();

    const photo = screen.getByTestId('recipe-photo');
    expect(photo).toBeInTheDocument();
    const recomendation = screen.getByTestId('0-recommendation-card');
    expect(recomendation).toBeInTheDocument();
    const start = screen.getByTestId('start-recipe-btn');
    expect(start).toBeInTheDocument();
    userEvent.click(start);
    expect(history.location.pathname).toEqual('/drinks/15997/in-progress');

    global.fetch.mockClear();
  });
});
