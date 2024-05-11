import React, { useCallback } from 'react';
import ListGroup from 'react-bootstrap/ListGroup';
import './FavoritesPageStyles.css';
import { removeFavorite } from '../../core/slices/favoritesSlice';
import { MovieType } from '../../types/ReduxTypes/MovieType';
import { useAppSelector, useAppDispatch } from '../../core/hooks/hooks';
import { useAuth } from '../../core/hooks';
import { ROUTES } from '../../routes/routes';
import { Link } from 'react-router-dom';
import red_heart from '../../assets/images/red_heart.png';
import noPhoto from '../../assets/images/noPhoto.jpg';

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
      <h1 className="text-warning block title">Избранное</h1>
      <ListGroup as="ul" className="d-flex flex-row flex-wrap gap-4">
        {Boolean(favorites.length) &&
          favorites.map((movie) => {
            return (
              <div className="container_favorite_film" key={movie.imdbID}>
                <Link
                  className="link_to_film"
                  state={{ id: movie.imdbID }}
                  to={`${ROUTES.FILM}?id=${movie.imdbID}`}
                >
                  <div className="container_poster">
                    <img
                      key={movie.imdbID}
                      alt="poster"
                      src={movie.Poster === 'N/A' ? noPhoto : movie.Poster}
                      className="image slider_image"
                    />
                  </div>
                </Link>
                <button
                  className="container_favorite_image"
                  onClick={() => handleRemoveFavorite(movie)}
                >
                  <img
                    src={red_heart}
                    alt="favorite_image"
                    className="favorite_image"
                  />
                </button>
              </div>
            );
          })}
      </ListGroup>
    </main>
  );
};
