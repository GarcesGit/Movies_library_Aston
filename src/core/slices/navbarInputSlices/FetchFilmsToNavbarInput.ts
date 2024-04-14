import { Dispatch } from 'redux';
import axios from 'axios';
import { API_URL } from '../../../routes/routes';
import { filmsToNavbarInputSlice } from './FilmsToNavbarInputSlice';
import { FetchMoviesResponse } from '../../../types/ReduxTypes/MovieType';

export const fetchFilmsToNavbarInput =
  (searchString: string) => async (dispatch: Dispatch) => {
    try {
      dispatch(filmsToNavbarInputSlice.actions.filmsToNavbarInputFetching());
      const response = await axios.get<FetchMoviesResponse>(
        `${API_URL}&s=${searchString}`,
      );
      if (response.data.Error) {
        dispatch(
          filmsToNavbarInputSlice.actions.filmsToNavbarInputFetchingError(
            response.data.Error,
          ),
        );
        return;
      }
      dispatch(
        filmsToNavbarInputSlice.actions.filmsToNavbarInputFetchingSuccess(
          response.data.Search,
        ),
      );
    } catch (e: any) {
      dispatch(
        filmsToNavbarInputSlice.actions.filmsToNavbarInputFetchingError(
          e.message,
        ),
      );
    }
  };
