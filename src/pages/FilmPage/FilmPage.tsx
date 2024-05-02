import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../core/hooks/hooks';
import { stateFilmByID } from '../../core/selectors/selectors';
import './FilmPageStyles.css';
import { useLocation } from 'react-router-dom';
import { fetchFilmByID } from '../../core/slices/filmPageSlice/FetchFilmByID';
import { Loader } from '../../components/loader/Loader';
import grey_heart from '../../assets/images/grey_heart.png';
import red_heart from '../../assets/images/red_heart.png';

export const FilmPage = () => {
  const dispatch = useAppDispatch();
  const { film, isLoading, errorCode } = useAppSelector(stateFilmByID);
  const { state } = useLocation();
  const [favorite, setFavorite] = useState(false);

  useEffect(() => {
    if (state.id) {
      dispatch(fetchFilmByID(state.id));
      return;
    }
  }, [state.id]);

  if (isLoading) {
    return <Loader />;
  }

  // переделать проверяем есть ли фильм в массиве - add/remove // см favoritesSlice
  const onFavoriteClick = () => {
    if (favorite) {
      setFavorite(false);
      return;
    }
    setFavorite(true);
  };

  return (
    <div>
      <div className="container_filmPage" key={film.imdbID}>
        <div className=" container_titles">
          <p>Title: </p>
          <p>Year: </p>
          <p>Runtime: </p>
          <p>Genre: </p>
          <p>Director: </p>
          <p>Actors: </p>
          <p>Country: </p>
          <p>Awards: </p>
          <p>imdb Rating: </p>
          <p>Box Office: </p>
          <p>Plot: </p>
        </div>
        <div className="container_info">
          <h2>{film.Title}</h2>
          <div>{film.Year}</div>
          <div>{film.Runtime}</div>
          <div>{film.Genre}</div>
          <div>{film.Director}</div>
          <div>{film.Actors}</div>
          <div>{film.Country}</div>
          <div>{film.Awards}</div>
          <div>{film.imdbRating}</div>
          <div>{film.BoxOffice}</div>
          <div>{film.Plot}</div>
        </div>
        <div className="container_poster">
          <img alt="poster" src={film.Poster} className="image" />
          <button onClick={() => onFavoriteClick()}>
            <img
              src={favorite ? red_heart : grey_heart}
              alt="favorite_image"
              className="favorite_image"
            />
          </button>
        </div>
      </div>
      {isLoading && <Loader />}
      {errorCode && <h5 className="error">Фильм не найден</h5>}
    </div>
  );
};
