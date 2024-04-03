import React, { useEffect, useState } from 'react';
import './HistoryPageStyles.css';
import { MovieType } from '../../types/ReduxTypes/MovieType';

const Page = {
  Title: 'The Social Network',
  Year: '2010',
  Rated: 'PG-13',
  Released: '01 Oct 2010',
  Runtime: '120 min',
  Genre: 'Biography, Drama',
  Director: 'David Fincher',
  Writer: 'Aaron Sorkin, Ben Mezrich',
  Actors: 'Jesse Eisenberg, Andrew Garfield, Justin Timberlake',
  Plot: 'As Harvard student Mark Zuckerberg creates the social networking site that would become known as Facebook, he is sued by the twins who claimed he stole their idea and by the co-founder who was later squeezed out of the business.',
  Language: 'English, French',
  Country: 'United States',
  Awards: 'Won 3 Oscars. 173 wins & 187 nominations total',
  Poster:
    'https://m.media-amazon.com/images/M/MV5BOGUyZDUxZjEtMmIzMC00MzlmLTg4MGItZWJmMzBhZjE0Mjc1XkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_SX300.jpg',
  Ratings: [
    { Source: 'Internet Movie Database', Value: '7.8/10' },
    { Source: 'Rotten Tomatoes', Value: '96%' },
    { Source: 'Metacritic', Value: '95/100' },
  ],
  Metascore: '95',
  imdbRating: '7.8',
  imdbVotes: '754,796',
  imdbID: 'tt1285016',
  Type: 'movie',
  DVD: '05 Jun 2012',
  BoxOffice: '$96,962,694',
  Production: 'N/A',
  Website: 'N/A',
  Response: 'True',
};

export const HistoryPage = () => {
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
