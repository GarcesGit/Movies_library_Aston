import { Dispatch } from 'redux';
import { FetchMoviesResponse } from '../../types/ReduxTypes/MovieType';
import { serialsSlice } from './SerialsSlice';
import axios from 'axios';
import { API_URL } from '../../routes/routes';

export const fetchSerials = () => async (dispatch: Dispatch) => {
  try {
    dispatch(serialsSlice.actions.serialsFetching());
    const response = await axios.get<FetchMoviesResponse>(
      `${API_URL}&s=who&type=series`,
    );
    dispatch(serialsSlice.actions.serialsFetchingSuccess(response.data.Search));
  } catch (e: any) {
    dispatch(serialsSlice.actions.serialsFetchingError(e.message));
  }
};
