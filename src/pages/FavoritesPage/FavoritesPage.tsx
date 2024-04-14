import React, { useCallback } from 'react';
import ListGroup from 'react-bootstrap/ListGroup';
import { removeFavorite } from '../../core/slices/favoritesSlice';
import { MovieType } from '../../types/ReduxTypes/MovieType';
import { useAppSelector, useAppDispatch } from '../../core/hooks/hooks';
import { useAuth } from '../../core/hooks';
import { FavoriteCard } from '../../components/FavoriteCard';

export const FavoritesPage = () => {
  const { favorites } = useAppSelector((state) => state.favorites);
  const dispatch = useAppDispatch();
  const { user } = useAuth();

  const handleRemoveFavorite = useCallback(
    (movie: MovieType) => () => {
      if (user) {
        dispatch(removeFavorite({ ...movie, userId: user?.username }));
      }
    },
    [dispatch, favorites, user],
  );

  return (
    <main className="m-3 vh-100">
      <h1 className="text-warning block">Избранное</h1>
      <ListGroup as="ul" className="d-flex flex-row flex-wrap gap-4">
        {favorites.map((movie) => {
          if (movie.userId === user?.username) {
            return (
              <ListGroup.Item as="li" key={movie.imdbID} className="col-3 mb-3">
                <FavoriteCard
                  handleRemove={handleRemoveFavorite}
                  movie={movie}
                />
              </ListGroup.Item>
            );
          }
        })}
      </ListGroup>
    </main>
  );
};
