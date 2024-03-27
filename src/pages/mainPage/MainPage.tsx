import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../core/hooks/hooks';
import { fetchMovies } from '../../core/slices/FetchMovies';
import './MainPageStyles.css';
import Loader from '../../components/loader/Loader';
import SliderCarousel from '../../components/sliderCarousel/SliderCarousel';

const MainPage = () => {
  const dispatch = useAppDispatch();
  const { movies, isLoading, errorCode } = useAppSelector(
    (state) => state.movies,
  );

  useEffect(() => {
    dispatch(fetchMovies());
  }, []);

  return (
    <div className="main">
      <p className="container_description">
        Все новинки и классика кино на нашем сайте! Здесь можно найти информацию
        о любом фильме и сериале!
      </p>

      <div className="container container__prime">
        <p className="container_title">Главное на PREMIER</p>
        <SliderCarousel movies={movies} />
      </div>
      <div className="container container__serials">
        <p className="container_title">Сериалы на PREMIER</p>
      </div>
      {isLoading && <Loader />}
      {errorCode && <h3 className="error">Произошла ошибка при загрузке</h3>}
    </div>
  );
};

export default MainPage;
