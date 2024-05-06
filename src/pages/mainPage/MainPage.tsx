import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../core/hooks/hooks';
import { fetchMovies } from '../../core/slices/FetchMovies';
import './MainPageStyles.css';
import { Loader } from '../../components/loader/Loader';
import { fetchSerials } from '../../core/slices/FetchSerials';
import { stateMovies, stateSerials } from '../../core/selectors/selectors';
import { SliderSwiperHOC } from '../../components/SliderSwiper/SliderSwiperHOC';

export const MainPage = () => {
  const dispatch = useAppDispatch();
  const { movies, isLoading, errorCode } = useAppSelector(stateMovies);
  const { serials, isLoadingSerials, errorCodeSerials } =
    useAppSelector(stateSerials);

  useEffect(() => {
    dispatch(fetchMovies());
    dispatch(fetchSerials());
  }, []);

  return (
    <div className="main">
      <p className="container_description">
        Все новинки и классика кино на нашем сайте! Здесь можно найти информацию
        о любом фильме и сериале!
      </p>
      <div className="container container__prime">
        <p className="container_title">Главное на PREMIER</p>
        {Boolean(movies.length) && <SliderSwiperHOC movies={movies} />}
      </div>
      <div className="container container__serials ">
        <p className="container_title">Сериалы на PREMIER</p>
        {Boolean(serials.length) && <SliderSwiperHOC movies={serials} />}
      </div>
      {isLoading || (isLoadingSerials && <Loader />)}
      {errorCode ||
        (errorCodeSerials && (
          <h3 className="error">Произошла ошибка при загрузке</h3>
        ))}
    </div>
  );
};
