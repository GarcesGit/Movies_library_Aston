import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { FavoriteState, FavoriteType } from '../../types/ReduxTypes/MovieType';
import { getLocalStorageItem } from '../../utils/helpers/localStorageFns';
import { FAVORITES } from '../../utils/constants/constants';

const favoritesItems: FavoriteType[] | null = getLocalStorageItem(FAVORITES);

const initialState: FavoriteState = {
  favorites: favoritesItems ? favoritesItems : [],
};
const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    addFavorite: (state, action: PayloadAction<FavoriteType>) => {
      state.favorites = [...state.favorites, action.payload];
    },
    removeFavorite: (state, action: PayloadAction<FavoriteType>) => {
      state.favorites = state.favorites.filter((movie) => {
        if (movie.userId === action.payload.userId) {
          if (movie.imdbID === action.payload.imdbID) {
            return false;
          }
        }
        return true;
      });
    },
  },
});

export const { addFavorite, removeFavorite } = favoritesSlice.actions;
export default favoritesSlice.reducer;
