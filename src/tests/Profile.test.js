import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import renderWithRouterAndRedux from './helpers/rendeWithRouterAndRedux';
import App from '../App';
import meals from './helpers/meals';

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
  const mockFavorites = 'favoriteRecipes';
  const listFavorites = [{
    id: '52977',
    nationality: 'Turkish',
    name: 'Corba',
    image: 'https://www.themealdb.com/images/media/meals/58oia61564916529.jpg',
  }];
  setLocalStorage(mockFavorites, listFavorites);
  expect(localStorage.getItem(mockId)).toEqual(JSON.stringify(mockJson));
  const buton = 'profile-done-btn';
  const buton1 = 'profile-favorite-btn';
  const buton2 = 'profile-logout-btn';
  const buton3 = 'profile-top-btn';
  test('Favorites list buttons and direction page done recipes.', async () => {
    await flushPromises();
    jest.spyOn(global, 'fetch').mockImplementation(mockFetch);
    const { history } = renderWithRouterAndRedux(<App />);
    history.push('/meals');
    await waitFor(() => expect(global.fetch).toHaveBeenCalled());
    const card = screen.getByTestId(buton3);
    expect(card).toBeInTheDocument();
    userEvent.click(card);
    expect(history.location.pathname).toEqual('/profile');
    await waitFor(() => expect(global.fetch).toHaveBeenCalled());
    const btn1 = screen.getByTestId(buton);
    expect(btn1).toBeInTheDocument();
    const btn2 = screen.getByTestId(buton1);
    expect(btn2).toBeInTheDocument();
    const btn3 = screen.getByTestId(buton2);
    expect(btn3).toBeInTheDocument();
    const mail = screen.getByTestId('profile-email');
    expect(mail).toBeInTheDocument();
    setLocalStorage(mockId, mockJson);
    expect(localStorage.getItem(mockId)).toEqual(JSON.stringify(mockJson));
    const nomeEmail = screen.getByText('reinaldoper83@gamail.com');
    expect(nomeEmail).toBeInTheDocument();
    userEvent.click(btn1);
    await waitFor(() => expect(global.fetch).toHaveBeenCalled());
    expect(history.location.pathname).toEqual('/done-recipes');
    global.fetch.mockClear();
  });
  test('Favorites list and redirect page de favorities.', async () => {
    await flushPromises();
    expect(localStorage.getItem(mockFavorites)).toEqual(JSON.stringify(listFavorites));
    jest.spyOn(global, 'fetch').mockImplementation(mockFetch);
    const { history } = renderWithRouterAndRedux(<App />);
    history.push('/meals');
    await waitFor(() => expect(global.fetch).toHaveBeenCalled());
    const card = screen.getByTestId('profile-top-btn');
    expect(card).toBeInTheDocument();
    userEvent.click(card);
    expect(history.location.pathname).toEqual('/profile');
    await waitFor(() => expect(global.fetch).toHaveBeenCalled());
    const btnDone1 = screen.getByTestId(buton);
    expect(btnDone1).toBeInTheDocument();
    const btnProfile1 = screen.getByTestId(buton1);
    expect(btnProfile1).toBeInTheDocument();
    const btnLogout1 = screen.getByTestId(buton2);
    expect(btnLogout1).toBeInTheDocument();
    userEvent.click(btnProfile1);
    expect(history.location.pathname).toEqual('/favorite-recipes');
    const imgFavorite = screen.getByTestId('page-title');
    expect(imgFavorite).toBeInTheDocument();
    const corba = screen.getByText('Corba');
    expect(corba).toBeInTheDocument();
    global.fetch.mockClear();
  });
  test('Favorites list and redirect page de logout.', async () => {
    await flushPromises();
    jest.spyOn(global, 'fetch').mockImplementation(mockFetch);
    const { history } = renderWithRouterAndRedux(<App />);
    history.push('/meals');
    await waitFor(() => expect(global.fetch).toHaveBeenCalled());
    const card = screen.getByTestId(buton3);
    expect(card).toBeInTheDocument();
    userEvent.click(card);
    expect(history.location.pathname).toEqual('/profile');
    await waitFor(() => expect(global.fetch).toHaveBeenCalled());
    const btnDone = screen.getByTestId('profile-done-btn');
    expect(btnDone).toBeInTheDocument();
    const btnProfile = screen.getByTestId('profile-favorite-btn');
    expect(btnProfile).toBeInTheDocument();
    const btnLogout = screen.getByTestId('profile-logout-btn');
    expect(btnLogout).toBeInTheDocument();
    userEvent.click(btnLogout);
    await waitFor(() => expect(global.fetch).toHaveBeenCalled());
    window.localStorage.clear();
    expect(history.location.pathname).toEqual('/');
    global.fetch.mockClear();
  });
});
