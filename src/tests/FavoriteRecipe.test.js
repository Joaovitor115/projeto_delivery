import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
/* import userEvent from '@testing-library/user-event'; */
import React from 'react';
import App from '../App';
/* import DrinksPage from '../pages/DrinksPage'; */
/* import MealsPage from '../pages/MealRecipe'; */
import Corba from './helpers/Corba';
import renderWithRouterAndRedux from './helpers/rendeWithRouterAndRedux';

const mockFetch = (data) => Promise.resolve({
  json: () => Promise.resolve(data),
});

const flushPromises = () => new Promise((r) => { setTimeout(r); });
const startRecipeBtnId = '0-horizontal-favorite-btn';

describe('Testand Favorite Meals', () => {
  beforeEach(() => {
    const mockMultFetch = jest.fn()
      .mockReturnValueOnce(mockFetch(Corba));
    global.fetch = mockMultFetch;
  });
  const mockFavorites = 'favoriteRecipes';
  const listFavorites = [{
    id: '52977',
    nationality: 'Turkish',
    name: 'Corba',
    image: 'https://www.themealdb.com/images/media/meals/58oia61564916529.jpg',
  }];
  const setLocalStorage = (id, data) => {
    window.localStorage.setItem(id, JSON.stringify(data));
  };
  /* const startRecipeBtnId = 'start-recipe-btn'; */
  setLocalStorage(mockFavorites, listFavorites);
  test('Favorite recipe Meals', async () => {
    await flushPromises();
    expect(localStorage.getItem(mockFavorites)).toEqual(JSON.stringify(listFavorites));
    const { history } = renderWithRouterAndRedux(<App />);
    history.push('/favorite-recipes');

    /* await waitFor(() => expect(global.fetch).toHaveBeenCalled()); */
    expect(screen.getByText('Corba')).toBeInTheDocument();

    const share = screen.getByTestId('0-horizontal-share-btn');
    expect(share).toBeInTheDocument();

    window.document.execCommand = jest.fn().mockImplementation(() => ' ');
    userEvent.click(share);
    const linkCopied = screen.getByText('Link copied!');
    expect(linkCopied).toBeInTheDocument();
    const startRecipeBtn = screen.getByTestId(startRecipeBtnId);
    userEvent.click(startRecipeBtn);
    localStorage.removeItem(mockFavorites);
    global.fetch.mockClear();
  });
});
