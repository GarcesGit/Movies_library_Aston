import React, { useContext, useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../core/hooks/hooks';
import { stateFilmByID } from '../../core/selectors/selectors';
import './FilmPageStyles.css';
import { useLocation } from 'react-router-dom';
import { fetchFilmByID } from '../../core/slices/filmPageSlice/FetchFilmByID';
import { Loader } from '../../components/loader/Loader';
import black_heart from '../../assets/images/black_heart.png';
import red_heart from '../../assets/images/red_heart.png';
import { addFavorite, removeFavorite } from '../../core/slices/favoritesSlice';
import { AuthContext } from '../../core/contexts';
import noPhoto from '../../assets/images/noPhoto.jpg';
import { MovieType } from '../../types/ReduxTypes/MovieType';
import { HISTORY_KEY } from '../../utils/constants/constants';
import telegram from '../../assets/images/telegram.png';

export const FilmPage = () => {
  const { user } = useContext(AuthContext);
  const dispatch = useAppDispatch();
  const { film, isLoading, errorCode } = useAppSelector(stateFilmByID);
  const { state } = useLocation();
  const fullUrl = window.location.href;
  const [favorite, setFavorite] = useState(false);
  const { favorites } = useAppSelector((state) => state.favorites);

  useEffect(() => {
    if (state.id) {
      dispatch(fetchFilmByID(state.id));
      return;
    }
  }, [state.id]);

  useEffect(() => {
    const isFilmInFavorites = favorites.find(
      (favoriteFilm) => favoriteFilm.imdbID === film.imdbID,
    );

    if (isFilmInFavorites) {
      setFavorite(true);
      return;
    }
    setFavorite(false);
  }, [favorites, film]);

  useEffect(() => {
    if (!film.imdbID) {
      return;
    }
    saveToLocalStorage(film);
  }, [film]);

  if (isLoading) {
    return <Loader />;
  }

  const onFavoriteClick = () => {
    if (!user) {
      return;
    }
    if (favorite) {
      dispatch(removeFavorite({ ...film, userId: user?.username }));
      return;
    }
    dispatch(addFavorite({ ...film, userId: user?.username }));
  };

  const saveToLocalStorage = (film: MovieType) => {
    let historyMoviesArray: MovieType[] = [];
    const moviesFromLS = localStorage.getItem(HISTORY_KEY);

    if (!moviesFromLS) {
      historyMoviesArray.push(film);
      localStorage.setItem(HISTORY_KEY, JSON.stringify(historyMoviesArray));
      return;
    }
    const parsedMovies: MovieType[] = JSON.parse(moviesFromLS);
    const isMovieExistsInLS = parsedMovies.find(
      (movie) => movie.imdbID === film.imdbID,
    );
    if (isMovieExistsInLS) {
      return;
    }
    historyMoviesArray = [...parsedMovies, film];
    localStorage.setItem(HISTORY_KEY, JSON.stringify(historyMoviesArray));
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
          <img
            alt="poster"
            src={film.Poster === 'N/A' ? noPhoto : film.Poster}
            className="image"
          />
          <button
            className="container_favorite_image"
            onClick={() => onFavoriteClick()}
          >
            <img
              src={favorite ? red_heart : black_heart}
              alt="favorite_image"
              className="favorite_image"
            />
          </button>
          <button className="container_favorite_image container_share_image">
            <a
              href={`https://t.me/share/url?url=${fullUrl}&text=${'Смотри какой фильм'}`}
              target="_blank"
              rel="noreferrer"
            >
              <img
                src={telegram}
                alt="telegram_image"
                className="favorite_image telegram_image"
              />
            </a>
          </button>
        </div>
      </div>
      {isLoading && <Loader />}
      {errorCode && <h5 className="error">Фильм не найден</h5>}
    </div>
  );
};
