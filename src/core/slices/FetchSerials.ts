import { Dispatch } from 'redux';
import { FetchMoviesResponse } from '../../types/ReduxTypes/MovieType';
import { serialsSlice } from './SerialsSlice';
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { API_URL } from '../../routes/routes';
import { log } from 'console';

export const fetchSerials = () => async (dispatch: Dispatch) => {
  try {
    dispatch(serialsSlice.actions.serialsFetching());

    const response = await axios.get<FetchMoviesResponse>(
      `${API_URL}&s=sherlock`,
    );

    dispatch(serialsSlice.actions.serialsFetchingSuccess(response.data.Search));
  } catch (e: any) {
    dispatch(serialsSlice.actions.serialsFetchingError(e.message));
  }
};
