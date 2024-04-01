import React, { useEffect, useState } from 'react';
import './HistoryPageStyles.css';
import { MovieType } from '../../types/ReduxTypes/MovieType';

export const HistoryPage = () => {
  const localStorageEntries = localStorage.getItem('moviesHistory');

  // let localStorageEntriesArray;

  // const getStorageEntries = () => {
  //   if (localStorageEntries) {
  //     localStorageEntriesArray = JSON.parse(localStorageEntries);
  //   }
  //   return localStorageEntriesArray;
  // };
  // getStorageEntries();

  const [historyMoviesArray, setHistoryMoviesArray] = useState<MovieType[]>([]);
  useEffect(() => {
    const moviesFromLS = localStorage.getItem('moviesHistory');
    if (moviesFromLS) {
      setHistoryMoviesArray(JSON.parse(moviesFromLS));
    }
  }, []);

  return (
    <div className="container_history">
      <h4 className="history_title">Вы смотрели:</h4>
      {historyMoviesArray.map((movie) => (
        <div key={movie.imdbID} className="history">
          <a>
            <img alt="img" src={movie.Poster} className="history_image" />
            <p>{movie.Title}</p>
          </a>
        </div>
      ))}
    </div>
  );
};
