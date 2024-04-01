import React, { useEffect } from 'react';
import { MovieType } from '../../types/ReduxTypes/MovieType';
import { Swiper, SwiperSlide, useSwiper } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import './SliderSwiperStyles.css';
import { Modal } from '../Modal/Modal';

interface SliderSwiperProps {
  movies: MovieType[];
  activeMovie: MovieType;
  onMovieClick: (movie: MovieType) => void;
  isModalOpen: boolean;
  handleModalClose: () => void;
}

export const SliderSwiper = ({
  movies,
  activeMovie,
  onMovieClick,
  isModalOpen,
  handleModalClose,
}: SliderSwiperProps) => {
  return (
    <div className="slider">
      <Swiper
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper"
        slidesPerView={'auto'}
        slidesPerGroup={1}
        spaceBetween={20}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        speed={800}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        observer={true}
        // loop={true}
      >
        {movies.map((movie) => (
          <SwiperSlide key={movie.imdbID}>
            <a>
              <img
                alt="img"
                src={movie.Poster}
                className="image"
                onClick={() => onMovieClick(movie)}
              />
            </a>
          </SwiperSlide>
        ))}
      </Swiper>
      <Modal visible={isModalOpen} setVisible={handleModalClose}>
        <div>
          <div>
            <img alt="img" src={activeMovie.Poster} className="image" />
          </div>
          <div>
            <p>Название: {activeMovie.Title}</p>
            <p>Год создания: {activeMovie.Year}</p>
          </div>
        </div>
      </Modal>
    </div>
  );
};
