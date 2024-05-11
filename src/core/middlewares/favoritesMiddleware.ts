import { createListenerMiddleware, isAnyOf } from '@reduxjs/toolkit';
import { addFavorite, removeFavorite } from '../slices/favoritesSlice';
import { setLocalStorageItem } from '../../utils/helpers/localStorageFns';
import { FavoriteState } from '../../types/ReduxTypes/MovieType';
import { FAVORITES } from '../../utils/constants/constants';
import { RootState } from '../../app/store';

export const favoritesListenerMiddleware = createListenerMiddleware();
favoritesListenerMiddleware.startListening({
  matcher: isAnyOf(addFavorite, removeFavorite),
  effect: (action, listenerApi) => {
    const state: RootState = listenerApi.getState() as RootState;

    setLocalStorageItem(FAVORITES, state.favorites.favorites);
  },
});
