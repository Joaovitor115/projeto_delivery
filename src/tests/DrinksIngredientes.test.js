import { fireEvent, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
/* import userEvent from '@testing-library/user-event'; */
import React from 'react';
import App from '../App';
/* import DrinksPage from '../pages/DrinksPage'; */
/* import MealsPage from '../pages/MealRecipe'; */
import GG from './helpers/GG';
/* import drinks from './helpers/drinks'; */
import renderWithRouterAndRedux from './helpers/rendeWithRouterAndRedux';

const mockFetch = (data) => Promise.resolve({
  json: () => Promise.resolve(data),
});

const flushPromises = () => new Promise((r) => { setTimeout(r); });

describe('Meals ingredients', () => {
  beforeEach(() => {
    const mockMultFetch = jest.fn()
      .mockReturnValueOnce(mockFetch(GG));
    global.fetch = mockMultFetch;
  });
  const phase = 'phrase-content';
  const finisClass = 'finish phrase-content';
  test('Ingredients', async () => {
    await flushPromises();

    const { history } = renderWithRouterAndRedux(<App />);
    history.push('drinks/15997/in-progress');

    await waitFor(() => expect(global.fetch).toHaveBeenCalled());
    expect(screen.getByTestId('recipe-title')).toBeInTheDocument();

    const recipe = screen.getByTestId('recipe-category');
    expect(recipe).toBeInTheDocument();
    const step1 = screen.getByTestId('0-step');
    const label = screen.getByTestId('0-ingredient-step');

    expect(label).toHaveClass(phase, { exact: true });
    expect(step1).toBeInTheDocument();
    const step2 = screen.getByTestId('1-step');
    const label1 = screen.getByTestId('1-ingredient-step');

    expect(label1).toHaveClass(phase, { exact: true });
    expect(step2).toBeInTheDocument();
    const step3 = screen.getByTestId('2-step');
    const label2 = screen.getByTestId('2-ingredient-step');

    expect(label2).toHaveClass(phase, { exact: true });
    expect(step3).toBeInTheDocument();
    fireEvent.click(step1);

    expect(label).toHaveClass(finisClass, { exact: true });
    fireEvent.click(step2);

    expect(label1).toHaveClass(finisClass, { exact: true });
    fireEvent.click(step3);
    const finish = screen.getByText('Finalizar a receita');
    expect(finish).toBeVisible();
    userEvent.click(finish);
    expect(history.location.pathname).toEqual('/done-recipes');
    global.fetch.mockClear();
  });
});
