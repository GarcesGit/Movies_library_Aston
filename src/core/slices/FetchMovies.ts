import { Dispatch } from 'redux';
import { FetchMoviesResponse } from '../../types/ReduxTypes/MovieType';
import { movieSlice } from './MovieSlice';
import axios from 'axios';
import { API_URL } from '../../routes/routes';

export const fetchMovies = () => async (dispatch: Dispatch) => {
  try {
    dispatch(movieSlice.actions.moviesFetching());
    const response = await axios.get<FetchMoviesResponse>(`${API_URL}&s=day`);
    dispatch(movieSlice.actions.moviesFetchingSuccess(response.data.Search));
  } catch (e: any) {
    dispatch(movieSlice.actions.moviesFetchingError(e.message));
  }
};
