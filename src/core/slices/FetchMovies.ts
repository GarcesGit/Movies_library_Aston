import { Dispatch } from 'redux';
import { FetchMoviesResponse } from '../../types/ReduxTypes/MovieType';
import { movieSlice } from './MovieSlice';
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// const API_key = `apikey=${process.env.REACT_APP_API_KEY}`;
// const API_URL = `https://www.omdbapi.com/?${API_key}`
// в работе

export const fetchMovies = () => async (dispatch: Dispatch) => {
  try {
    dispatch(movieSlice.actions.moviesFetching());
    const response = await axios.get<FetchMoviesResponse>(
      'https://www.omdbapi.com/?s=day&apikey=786d4402',
      // `${API_URL}&s=day`,
    );

    dispatch(movieSlice.actions.moviesFetchingSuccess(response.data.Search));
  } catch (e: any) {
    dispatch(movieSlice.actions.moviesFetchingError(e.message));
  }
};
