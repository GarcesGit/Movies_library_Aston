export enum ROUTES {
  MAIN = '/',
  SIGNIN = '/signin',
  SIGNUP = '/signup',
  FAVORITES = '/favorites',
  HISTORY = '/history',
  SEARCH = '/search',
  FILM = '/film',
}
export const API_URL = `https://www.omdbapi.com/?apikey=${process.env.REACT_APP_API_KEY}`;
