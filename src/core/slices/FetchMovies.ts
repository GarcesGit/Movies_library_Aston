import { Dispatch } from 'redux';
import { FetchMoviesResponse } from '../../types/ReduxTypes/MovieType';
import { movieSlice } from './MovieSlice';
import axios from 'axios';
import { API_URL } from '../../routes/routes';

export const fetchMovies = () => async (dispatch: Dispatch) => {
  try {
    dispatch(movieSlice.actions.moviesFetching());

    const urlsToFetch = [`${API_URL}&s=day&page=1`, `${API_URL}&s=day&page=2`];

    const promises = urlsToFetch.map((url) => {
      return axios.get(url);
    });

    const response = await Promise.allSettled(promises).then((results) => {
      let data: any[] = [];

      results.forEach((result) => {
        if (result.status === 'fulfilled') {
          data = [...data, ...result.value.data.Search];
        }
      });
      return data;
    });

    dispatch(movieSlice.actions.moviesFetchingSuccess(response));
  } catch (e: any) {
    dispatch(movieSlice.actions.moviesFetchingError(e.message));
  }
};
