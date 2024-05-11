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
    saveToLocalStorage(movie);
  }, []);

  return (
    <MemoizedSliderSwiper movies={movies} onMovieClick={handleMovieClick} />
  );
};
