import React, { useCallback, useState } from 'react';
import { MovieType } from '../../types/ReduxTypes/MovieType';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import './SliderSwiperStyles.css';
import { MemoizedSliderSwiper } from './SliderSwiper';
import { HISTORY_KEY } from '../../utils/constants';

type SliderSwiperHOCProps = {
  movies: MovieType[];
};

export const SliderSwiperHOC = ({ movies }: SliderSwiperHOCProps) => {
  const [modal, setModal] = useState(false);
  const [activeMovie, setActiveMovie] = useState<MovieType>({} as MovieType);

  const handleModalClose = () => setModal(false);

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

  const handleMovieClick = useCallback((movie: MovieType) => {
    setActiveMovie(movie);
    saveToLocalStorage(movie);
    setModal(true);
  }, []);

  return (
    <MemoizedSliderSwiper
      activeMovie={activeMovie}
      movies={movies}
      onMovieClick={handleMovieClick}
      isModalOpen={modal}
      handleModalClose={handleModalClose}
    />
  );
};
