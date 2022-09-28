import { screen } from '@testing-library/react';
import React from 'react';
import userEvent from '@testing-library/user-event';
import MealsPage from '../pages/MealRecipe';
import DrinksPage from '../pages/DrinksPage';
import renderWithRouterAndRedux from './helpers/rendeWithRouterAndRedux';
import Header from '../components/Header';

describe('Testando componente Header', () => {
  test('testa a rendericação do header no componente "drinksPage"', () => {
    renderWithRouterAndRedux(<DrinksPage />, {
      initialState: {},
      initialEntries: ['/drinks'],
    });
    const title = screen.getByTestId('page-title');
    const searchTopButton = screen.getByTestId('search-top-btn');
    const profileTopBtn = screen.getByTestId('profile-top-btn');
    const searchBTN = screen.getByTestId('exec-search-btn');
    const ingredientBTN = screen.getByTestId('ingredient-search-radio');
    const NameBTN = screen.getByTestId('name-search-radio');
    const firsLetterBTN = screen.getByTestId('first-letter-search-radio');
    const setsearch = screen.getByTestId('set-search');
    expect(title).toBeInTheDocument();
    expect(searchTopButton).toBeInTheDocument();
    expect(searchBTN).toBeInTheDocument();
    expect(profileTopBtn).toBeInTheDocument();
    expect(ingredientBTN).toBeInTheDocument();
    expect(NameBTN).toBeInTheDocument();
    expect(firsLetterBTN).toBeInTheDocument();
    userEvent.click(setsearch);
    const input = screen.getByTestId('search-input');
    expect(input).toBeInTheDocument();
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
  test('meals page', () => {
    renderWithRouterAndRedux(<MealsPage />, {
      initialState: {},
      initialEntries: ['/meals'],
    });
    expect(screen.getByTestId('Beef-category-filter')).toBeInTheDocument();
    expect(screen.getByTestId('Breakfast-category-filter')).toBeInTheDocument();
    expect(screen.getByTestId('Chicken-category-filter')).toBeInTheDocument();
    expect(screen.getByTestId('Dessert-category-filter')).toBeInTheDocument();
    expect(screen.getByTestId('Goat-category-filter')).toBeInTheDocument();
  });
});
