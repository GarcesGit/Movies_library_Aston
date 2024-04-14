import React, { useEffect, useState } from 'react';
import './HistoryPageStyles.css';
import { MovieType } from '../../types/ReduxTypes/MovieType';
import { HISTORY_KEY } from '../../utils/constants';

export const HistoryPage = () => {
  const [historyMoviesArray, setHistoryMoviesArray] = useState<MovieType[]>([]);
  useEffect(() => {
    const moviesFromLS = localStorage.getItem(HISTORY_KEY);
    if (moviesFromLS) {
      setHistoryMoviesArray(JSON.parse(moviesFromLS));
    }
  }, []);

  return (
    <div className="container_history">
      <h4 className="history_title">Вы смотрели:</h4>
      {historyMoviesArray.map((movie) => (
        <div key={movie.imdbID} className="history">
          <img alt="img" src={movie.Poster} className="history_image" />
          <p>{movie.Title}</p>
        </div>
      ))}
    </div>
  );
};
