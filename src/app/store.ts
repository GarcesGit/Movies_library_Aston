import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import movieSlice from '../core/slices/MovieSlice';

export const store = configureStore({
  reducer: {
    movies: movieSlice,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
