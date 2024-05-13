import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import movieSlice from '../core/slices/MovieSlice';
import SerialsSlice from '../core/slices/SerialsSlice';
import FilmsToNavbarInputSlice from '../core/slices/navbarInputSlices/FilmsToNavbarInputSlice';
import FilmPageSlice from '../core/slices/filmPageSlice/FilmPageSlice';
import favoritesSlice from '../core/slices/favoritesSlice';
import { favoritesListenerMiddleware } from '../core/middlewares/favoritesMiddleware';
import searchPageSlice from '../core/slices/searchPageSlice/searchPageSlice';

export const store = configureStore({
  reducer: {
    movies: movieSlice,
    serials: SerialsSlice,
    filmsToNavbarInput: FilmsToNavbarInputSlice,
    film: FilmPageSlice,
    favorites: favoritesSlice,
    searchMovies: searchPageSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(favoritesListenerMiddleware.middleware),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
