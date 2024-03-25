import React from 'react';
import './SliderCarouselStyles.css';
import { MovieType } from '../../types/ReduxTypes/MovieType';

interface MoviesProps {
  movies: MovieType[];
}

const SliderCarousel = ({ movies }: MoviesProps) => {
  return (
    <div className="carousel">
      {movies.map((movie, index) => (
        <div key={index}>
          <a>
            <img alt="" src={movie.Poster} className="image" />
          </a>
        </div>
      ))}
    </div>
  );
};

export default SliderCarousel;
