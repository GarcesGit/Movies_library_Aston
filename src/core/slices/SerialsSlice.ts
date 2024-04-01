import { MovieType } from '../../types/ReduxTypes/MovieType';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface SerialsState {
  serials: MovieType[];
  isLoadingSerials: boolean;
  errorCodeSerials: string | null;
}

const initialState: SerialsState = {
  serials: [],
  isLoadingSerials: false,
  errorCodeSerials: null,
};

export const serialsSlice = createSlice({
  name: 'serials',
  initialState,
  reducers: {
    serialsFetchingSuccess(state, action: PayloadAction<MovieType[]>) {
      state.serials = action.payload;
      state.isLoadingSerials = false;
      state.errorCodeSerials = null;
    },
    serialsFetching(state) {
      state.isLoadingSerials = true;
      state.errorCodeSerials = null;
    },
    serialsFetchingError(state, action: PayloadAction<string>) {
      state.isLoadingSerials = false;
      state.errorCodeSerials = action.payload;
    },
  },
});

export default serialsSlice.reducer;
