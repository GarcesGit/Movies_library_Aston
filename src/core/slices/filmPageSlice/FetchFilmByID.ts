import { Dispatch } from 'redux';
import axios from 'axios';
import { FilmPageSlice } from './FilmPageSlice';
import { MovieTypeExtended } from '../../../types/ReduxTypes/MovieType';
import { API_URL } from '../../../routes/routes';

export const fetchFilmByID = (filmID: string) => async (dispatch: Dispatch) => {
  try {
    dispatch(FilmPageSlice.actions.filmFetching());
    const response = await axios.get<MovieTypeExtended>(
      `${API_URL}&i=${filmID}`,
    );
    dispatch(FilmPageSlice.actions.filmFetchingSuccess(response.data));
  } catch (e: any) {
    dispatch(FilmPageSlice.actions.filmFetchingError(e.message));
  }
};
