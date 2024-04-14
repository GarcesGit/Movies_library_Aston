import { createListenerMiddleware, isAnyOf } from '@reduxjs/toolkit';
import { addFavorite, removeFavorite } from '../slices/favoritesSlice';
import { setLocalStorageItem } from '../../utils/helpers/localStorageFns';
import { FavoriteState } from '../../types/ReduxTypes/MovieType';
import { FAVORITES } from '../../utils/constants/constants';

export const favoritesListenerMiddleware = createListenerMiddleware();
favoritesListenerMiddleware.startListening({
  matcher: isAnyOf(addFavorite, removeFavorite),
  effect: (action, listenerApi) => {
    const favorites = listenerApi.getState() as {
      favorites: FavoriteState;
    };
    setLocalStorageItem(FAVORITES, favorites.favorites);
  },
});
