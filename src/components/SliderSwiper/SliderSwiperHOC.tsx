import React, { useState } from 'react';
import { MovieType } from '../../types/ReduxTypes/MovieType';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import './SliderSwiperStyles.css';
import { SliderSwiper } from './SliderSwiper';

interface SliderSwiperHOCProps {
  movies: MovieType[];
}

export const SliderSwiperHOC = ({ movies }: SliderSwiperHOCProps) => {
  const [modal, setModal] = useState(false);
  const [activeMovie, setactiveMovie] = useState<MovieType>({} as MovieType);

  const handleMovieClick = (movie: MovieType) => {
    setactiveMovie(movie);
    saveToLocalStorage(movie);
    setModal(true);
  };

  const saveToLocalStorage = (film: MovieType) => {
    let historyMoviesArray: MovieType[] = [];
    const moviesFromLS = localStorage.getItem('moviesHistory');
    if (!moviesFromLS) {
      historyMoviesArray.push(film);
      localStorage.setItem('moviesHistory', JSON.stringify(historyMoviesArray));
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
    localStorage.setItem('moviesHistory', JSON.stringify(historyMoviesArray));
  };

  return (
    <SliderSwiper
      activeMovie={activeMovie}
      movies={movies}
      onMovieClick={handleMovieClick}
      isModalOpen={modal}
      handleModalClose={() => setModal(false)}
    />
  );
};
