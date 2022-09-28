import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import Header from '../components/Header';
import DrinksPage from '../pages/DrinksPage';
import MealsPage from '../pages/MealsPage';
/* import MealsPage from '../pages/MealRecipe'; */
/* import meals from './helpers/meals'; */
import renderWithRouterAndRedux from './helpers/rendeWithRouterAndRedux';

describe('Testando componente Header', () => {
  /* const mockFetch = () => Promise.resolve({
    json: () => Promise.resolve(meals),
  }); */
  const rice = 'rice';
  test('testa a rendericação do header no componente "drinksPage"', async () => {
    /* jest.spyOn(global, 'fetch').mockImplementation(mockFetch); */
    renderWithRouterAndRedux(<DrinksPage />, {
      initialState: {},
      initialEntries: ['/drinks'],
    });
    const title = screen.getByTestId('page-title');
    const searchTopButton = screen.getByTestId('search-top-btn');
    const profileTopBtn = screen.getByTestId('profile-top-btn');
    const searchBTN = screen.getByTestId('exec-search-btn');
    const NameBTN = screen.getByTestId('name-search-radio');
    const firsLetterBTN = screen.getByTestId('first-letter-search-radio');
    const setsearch = screen.getByTestId('set-search');
    expect(title).toBeInTheDocument();
    expect(searchTopButton).toBeInTheDocument();
    expect(searchBTN).toBeInTheDocument();
    expect(profileTopBtn).toBeInTheDocument();
    /* expect(ingredientBTN).toBeInTheDocument(); */
    expect(NameBTN).toBeInTheDocument();
    expect(firsLetterBTN).toBeInTheDocument();
    userEvent.click(setsearch);
    const input = screen.getByTestId('search-input');
    expect(input).toBeInTheDocument();
    userEvent.type(input, rice);

    expect(input).toHaveValue(rice);
  });
  test('header test', () => {
    renderWithRouterAndRedux(<Header />, {
    });
    const title = screen.getByTestId('page-title');
    const ingredientBTN = screen.getByTestId('ingredient-search-radio');
    const NameBTN = screen.getByTestId('name-search-radio');
    const firsLetterBTN = screen.getByTestId('first-letter-search-radio');
    expect(title).toBeInTheDocument();
    expect(ingredientBTN).toBeInTheDocument();
    expect(NameBTN).toBeInTheDocument();
    expect(firsLetterBTN).toBeInTheDocument();
  });
  test('meals page', async () => {
    /* jest.spyOn(global, 'fetch').mockImplementation(mockFetch); */
    renderWithRouterAndRedux(<MealsPage />);
    const butoSet = screen.getByTestId('set-search');
    expect(butoSet).toBeInTheDocument();
    expect(screen.getByTestId('profile-top-btn')).toBeInTheDocument();
    expect(screen.getByTestId('search-top-btn')).toBeInTheDocument();
    expect(screen.getByTestId('ingredient-search-radio')).toBeInTheDocument();
    userEvent.click(butoSet);

    const input = screen.getByTestId('search-input');
    expect(input).toBeInTheDocument();
    userEvent.type(input, rice);

    expect(input).toHaveValue(rice);
  });
});
