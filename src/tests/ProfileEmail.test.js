import { screen } from '@testing-library/react';
/* import userEvent from '@testing-library/user-event'; */
import React from 'react';
import App from '../App';
import meals from './helpers/meals';
import renderWithRouterAndRedux from './helpers/rendeWithRouterAndRedux';

const mockFetch = () => Promise.resolve({
  json: () => Promise.resolve(meals),
});
const flushPromises = () => new Promise((r) => { setTimeout(r); });
const setLocalStorage = (id, data) => {
  window.localStorage.setItem(id, JSON.stringify(data));
};
describe('Testing Profiles', () => {
  const mockId = 'user';
  const mockJson = { email: 'reinaldoper83@gamail.com' };
  setLocalStorage(mockId, mockJson);
  /* const mockFavorites = 'favoriteRecipes';
  const listFavorites = [{
    id: '52977',
    nationality: 'Turkish',
    name: 'Corba',
    image: 'https://www.themealdb.com/images/media/meals/58oia61564916529.jpg',
  }]; */
  /* setLocalStorage(mockFavorites, listFavorites); */
  test('Favorites list buttons and direction page done recipes.', async () => {
    await flushPromises();
    expect(localStorage.getItem(mockId)).toEqual(JSON.stringify(mockJson));
    jest.spyOn(global, 'fetch').mockImplementation(mockFetch);
    const { history } = renderWithRouterAndRedux(<App />);
    history.push('/profile');
    /* await waitFor(() => expect(global.fetch).toHaveBeenCalled()); */
    const mail = screen.getByTestId('profile-email');
    expect(mail).toBeInTheDocument();
    setLocalStorage(mockId, mockJson);
    expect(localStorage.getItem(mockId)).toEqual(JSON.stringify(mockJson));
    const nomeEmail = screen.getByText('reinaldoper83@gamail.com');
    expect(nomeEmail).toBeInTheDocument();
    global.fetch.mockClear();
  });
});
