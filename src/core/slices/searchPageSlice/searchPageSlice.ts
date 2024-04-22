import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { MovieType } from '../../../types/ReduxTypes/MovieType';

export interface SearchPageState {
  searchMovies: MovieType[];
  isLoading: boolean;
  errorCode: string | null;
}

const initialState: SearchPageState = {
  searchMovies: [],
  isLoading: false,
  errorCode: null,
};

export const searchPageSlice = createSlice({
  name: 'searchMovies',
  initialState,
  reducers: {
    moviesFetchingSuccess(state, action: PayloadAction<MovieType[]>) {
      state.searchMovies = action.payload;
      state.isLoading = false;
      state.errorCode = null;
    },
    moviesFetching(state) {
      state.isLoading = true;
      state.errorCode = null;
      state.searchMovies = [];
    },
    moviesFetchingError(state, action: PayloadAction<string>) {
      state.isLoading = false;
      state.errorCode = action.payload;
    },
    clearSearchMoviesList(state) {
      state.searchMovies = [];
      state.errorCode = null;
    },
  },
});

export const searchPageActions = searchPageSlice.actions;
export default searchPageSlice.reducer;
