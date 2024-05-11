import React, { memo } from 'react';
import { MovieType } from '../../types/ReduxTypes/MovieType';
import { Swiper, SwiperSlide, useSwiper } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import './SliderSwiperStyles.css';
import noPhoto from '../../assets/images/noPhoto.jpg';
import { ROUTES } from '../../routes/routes';
import { Link } from 'react-router-dom';

type SliderSwiperProps = {
  movies: MovieType[];
  onMovieClick: (movie: MovieType) => void;
};

const SliderSwiper = ({ movies, onMovieClick }: SliderSwiperProps) => {
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
        navigation
        observer
        loop
      >
        {movies.map((movie) => (
          <SwiperSlide key={movie.imdbID}>
            <Link
              state={{ id: movie.imdbID }}
              key={movie.imdbID}
              to={`${ROUTES.FILM}?id=${movie.imdbID}`}
            >
              <img
                alt="poster"
                src={movie.Poster === 'N/A' ? noPhoto : movie.Poster}
                className="image slider_image"
                onClick={() => onMovieClick(movie)}
              />
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export const MemoizedSliderSwiper = memo(SliderSwiper);
