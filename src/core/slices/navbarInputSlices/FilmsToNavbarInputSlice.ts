import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { MovieType } from '../../../types/ReduxTypes/MovieType';

export interface FilmsToNavbarInputState {
  filmsToNavbarInput: MovieType[];
  isLoading: boolean;
  errorCode: string | null;
}

const initialState: FilmsToNavbarInputState = {
  filmsToNavbarInput: [],
  isLoading: false,
  errorCode: null,
};

export const filmsToNavbarInputSlice = createSlice({
  name: 'filmsToNavbarInput',
  initialState,
  reducers: {
    filmsToNavbarInputFetching(state) {
      state.isLoading = false;
      state.errorCode = null;
    },
    filmsToNavbarInputFetchingSuccess(
      state,
      action: PayloadAction<MovieType[]>,
    ) {
      state.filmsToNavbarInput = action.payload;
      state.isLoading = false;
      state.errorCode = null;
    },
    filmsToNavbarInputFetchingError(state, action: PayloadAction<string>) {
      state.isLoading = false;
      state.errorCode = action.payload;
    },
    clearFilmsList(state) {
      state.filmsToNavbarInput = [];
      state.errorCode = null;
    },
  },
});

export default filmsToNavbarInputSlice.reducer;
