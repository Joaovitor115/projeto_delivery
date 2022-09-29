import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import DrinksPage from '../pages/DrinksPage';
import MealsPage from '../pages/MealsPage';
import beefMeals from './helpers/beefMeals';
import breakfastMeals from './helpers/breakfastMeals';
import buttonsCategorieDrinks from './helpers/butonCategorieDrinks';
import butonCategorieMeals from './helpers/butonCategorieMeals';
/* import buttonsCategorieDrinksRecipes from './helpers/butonCategorieDrinksRecipes'; */
import ordinaryDrinks from './helpers/ordinaryDrinks';
import renderWithRouterAndRedux from './helpers/rendeWithRouterAndRedux';

describe('Testando componente ButtonsCategories', () => {
  const mockFetch = () => Promise.resolve({
    json: () => Promise.resolve(butonCategorieMeals),
  });
  const mockBeef = () => Promise.resolve({
    json: () => Promise.resolve(beefMeals),
  });
  const mockBreak = () => Promise.resolve({
    json: () => Promise.resolve(breakfastMeals),
  });
  const mockDrink = () => Promise.resolve({
    json: () => Promise.resolve(buttonsCategorieDrinks),
  });
  const mockOrd = () => Promise.resolve({
    json: () => Promise.resolve(ordinaryDrinks),
  });
  /* recipes drinks */
  /* const mockDrinkRecipes = () => Promise.resolve({
    json: () => Promise.resolve(buttonsCategorieDrinksRecipes),
  });
  const mockRecipe = () => Promise.resolve({
    json: () => Promise.resolve(ordinaryDrinks),
  }); */
  test('ButtonsCategories page Meals', async () => {
    jest.spyOn(global, 'fetch').mockImplementation(mockFetch);
    renderWithRouterAndRedux(<MealsPage />);
    await waitFor(() => expect(global.fetch).toHaveBeenCalled());
    const butoBeef = screen.getByTestId('Beef-category-filter');
    expect(butoBeef).toBeInTheDocument();
    const butoBreek = screen.getByTestId('Breakfast-category-filter');
    expect(butoBreek).toBeInTheDocument();
    const butoChik = screen.getByTestId('Chicken-category-filter');
    expect(butoChik).toBeInTheDocument();
    const butoDessert = screen.getByTestId('Dessert-category-filter');
    expect(butoDessert).toBeInTheDocument();
    const butoGoat = screen.getByTestId('Goat-category-filter');
    expect(butoGoat).toBeInTheDocument();
    const butoAll = screen.getByTestId('All-category-filter');
    expect(butoAll).toBeInTheDocument();
    userEvent.click(butoBeef);

    jest.spyOn(global, 'fetch').mockImplementation(mockBeef);
    await waitFor(() => expect(global.fetch).toHaveBeenCalled());
    const card = screen.getByTestId('0-recipe-card');
    expect(card).toBeInTheDocument();

    userEvent.click(butoBeef);
    await waitFor(() => expect(global.fetch).toHaveBeenCalled());
    expect(card).toBeInTheDocument();

    userEvent.click(butoBreek);
    jest.spyOn(global, 'fetch').mockImplementation(mockBreak);
    expect(card).toBeInTheDocument();

    userEvent.click(butoAll);
    await waitFor(() => expect(global.fetch).toHaveBeenCalled());
    expect(card).toBeInTheDocument();
    global.fetch.mockClear();
  });
  test('ButtonsCategories page Drinks', async () => {
    jest.spyOn(global, 'fetch').mockImplementation(mockDrink);
    renderWithRouterAndRedux(<DrinksPage />);
    await waitFor(() => expect(global.fetch).toHaveBeenCalled());
    const butoBeef = screen.getByTestId('Ordinary Drink-category-filter');
    expect(butoBeef).toBeInTheDocument();
    const butoBreek = screen.getByTestId('Cocktail-category-filter');
    expect(butoBreek).toBeInTheDocument();
    const butoChik = screen.getByTestId('Shake-category-filter');
    expect(butoChik).toBeInTheDocument();
    const butoDessert = screen.getByTestId('Other/Unknown-category-filter');
    expect(butoDessert).toBeInTheDocument();
    const butoGoat = screen.getByTestId('Cocoa-category-filter');
    expect(butoGoat).toBeInTheDocument();
    const butoAll = screen.getByTestId('All-category-filter');
    expect(butoAll).toBeInTheDocument();
    userEvent.click(butoBeef);

    jest.spyOn(global, 'fetch').mockImplementation(mockOrd);
    await waitFor(() => expect(global.fetch).toHaveBeenCalled());
    const card = screen.getByTestId('0-recipe-card');
    expect(card).toBeInTheDocument();

    userEvent.click(butoBeef);
    await waitFor(() => expect(global.fetch).toHaveBeenCalled());
    expect(card).toBeInTheDocument();

    userEvent.click(butoAll);
    await waitFor(() => expect(global.fetch).toHaveBeenCalled());
    expect(card).toBeInTheDocument();

    global.fetch.mockClear();
  });
});
