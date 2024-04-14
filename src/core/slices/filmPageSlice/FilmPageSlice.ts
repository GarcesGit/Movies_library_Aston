import { MovieTypeExtended } from '../../../types/ReduxTypes/MovieType';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface FilmPageState {
  film: MovieTypeExtended;
  isLoading: boolean;
  errorCode: string | null;
}

const initialState: FilmPageState = {
  film: {} as MovieTypeExtended,
  isLoading: false,
  errorCode: null,
};

export const FilmPageSlice = createSlice({
  name: 'film',
  initialState,
  reducers: {
    filmFetchingSuccess(state, action: PayloadAction<MovieTypeExtended>) {
      state.film = action.payload;
      state.isLoading = false;
      state.errorCode = null;
    },
    filmFetching(state) {
      state.isLoading = true;
      state.errorCode = null;
      state.film = {} as MovieTypeExtended;
    },
    filmFetchingError(state, action: PayloadAction<string>) {
      state.isLoading = false;
      state.errorCode = action.payload;
    },
  },
});

export default FilmPageSlice.reducer;
