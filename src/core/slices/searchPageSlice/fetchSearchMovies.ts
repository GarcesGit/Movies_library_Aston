import { Dispatch } from 'redux';
import axios from 'axios';
import { API_URL } from '../../../routes/routes';
import { FetchMoviesResponse } from '../../../types/ReduxTypes/MovieType';
import { searchPageSlice } from './searchPageSlice';

export const fetchSearchMovies =
  (searchString: string) => async (dispatch: Dispatch) => {
    try {
      dispatch(searchPageSlice.actions.moviesFetching());
      const response = await axios.get<FetchMoviesResponse>(
        `${API_URL}&s=${searchString}`,
      );
      if (response.data.Error) {
        dispatch(
          searchPageSlice.actions.moviesFetchingError(response.data.Error),
        );
        return;
      }
      dispatch(
        searchPageSlice.actions.moviesFetchingSuccess(response.data.Search),
      );
    } catch (e: any) {
      dispatch(searchPageSlice.actions.moviesFetchingError(e.message));
    }
  };
