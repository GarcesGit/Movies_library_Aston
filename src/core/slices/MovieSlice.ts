import { MovieType } from '../../types/ReduxTypes/MovieType';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface MovieState {
  movies: MovieType[];
  isLoading: boolean;
  errorCode: string | null;
}

const initialState: MovieState = {
  movies: [],
  isLoading: false,
  errorCode: null,
};

export const movieSlice = createSlice({
  name: 'movies',
  initialState,
  reducers: {
    moviesFetchingSuccess(state, action: PayloadAction<MovieType[]>) {
      state.movies = action.payload;
      state.isLoading = false;
      state.errorCode = null;
    },
    moviesFetching(state) {
      state.isLoading = true;
      state.errorCode = null;
    },
    moviesFetchingError(state, action: PayloadAction<string>) {
      state.isLoading = false;
      state.errorCode = action.payload;
    },
  },
});

export default movieSlice.reducer;
