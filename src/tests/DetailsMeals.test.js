import { screen, waitFor } from '@testing-library/react';
/* import userEvent from '@testing-library/user-event'; */
import React from 'react';
import App from '../App';
/* import DrinksPage from '../pages/DrinksPage'; */
/* import MealsPage from '../pages/MealRecipe'; */
import detailsMeals from './helpers/detailsMeals';
import drinks from './helpers/drinks';
import renderWithRouterAndRedux from './helpers/rendeWithRouterAndRedux';

const mockFetch = (data) => Promise.resolve({
  json: () => Promise.resolve(data),
});

const flushPromises = () => new Promise((r) => { setTimeout(r); });

describe('Testand details Meals', () => {
  beforeEach(() => {
    const mockMultFetch = jest.fn()
      .mockReturnValueOnce(mockFetch(detailsMeals))
      .mockReturnValueOnce(mockFetch(drinks));
    global.fetch = mockMultFetch;
  });
  test('Meals details', async () => {
    await flushPromises();
    const { history } = renderWithRouterAndRedux(<App />);
    history.push('/meals/52977');

    await waitFor(() => expect(global.fetch).toHaveBeenCalled());
    expect(screen.getByText('Corba')).toBeInTheDocument();

    const photo = screen.getByTestId('recipe-photo');
    expect(photo).toBeInTheDocument();
    const recomendation = screen.getByTestId('0-recommendation-card');
    expect(recomendation).toBeInTheDocument();
    global.fetch.mockClear();
  });
});
