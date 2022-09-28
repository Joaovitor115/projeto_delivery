import { screen } from '@testing-library/react';
import React from 'react';
import userEvent from '@testing-library/user-event';
import DrinksPage from '../pages/DrinksPage';
import renderWithRouterAndRedux from './helpers/rendeWithRouterAndRedux';

test('meals page', async () => {
  global.fetch = jest.fn(async () => ({
    json: async () => testData,
  }));
  renderWithRouterAndRedux(<DrinksPage />);
  expect(screen.getByTestId('meals-bottom-btn')).toBeInTheDocument();
  expect(screen.getByTestId('drinks-bottom-btn')).toBeInTheDocument();
  userEvent.click(screen.getByTestId('meals-bottom-btn'));
  userEvent.click(screen.getByTestId('drinks-bottom-btn'));
  await awaiFor(() => expect(global.fetch).toBeCalledTimes(2));
  expect(screen.getAllByRole('list')).toHaveLength(1);
});
