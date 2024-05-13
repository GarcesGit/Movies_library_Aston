import React, { useEffect, useState } from 'react';
import './HistoryPageStyles.css';
import { MovieType } from '../../types/ReduxTypes/MovieType';
import { HISTORY_KEY } from '../../utils/constants/constants';
import { Link } from 'react-router-dom';
import { ROUTES } from '../../routes/routes';

export const HistoryPage = () => {
  const [historyMoviesArray, setHistoryMoviesArray] = useState<MovieType[]>([]);
  useEffect(() => {
    const moviesFromLS = localStorage.getItem(HISTORY_KEY);
    if (moviesFromLS) {
      const reversedMoviesFromLS = JSON.parse(moviesFromLS).reverse();
      setHistoryMoviesArray(reversedMoviesFromLS);
    }
  }, []);

  return (
    <div className="container_history">
      <h1 className="text-warning block title">Вы смотрели</h1>
      {historyMoviesArray.map((movie) => (
        <Link
          state={{ id: movie.imdbID }}
          key={movie.imdbID}
          to={`${ROUTES.FILM}?id=${movie.imdbID}`}
        >
          <div key={movie.imdbID} className="history">
            <img alt="img" src={movie.Poster} className="history_image" />
            <div className="history_title">{movie.Title}</div>
          </div>
        </Link>
      ))}
    </div>
  );
};
