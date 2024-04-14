import React, { Dispatch, MutableRefObject, SetStateAction } from 'react';
import { MovieType } from '../../types/ReduxTypes/MovieType';
import cl from './DropDown.module.css';
import { ROUTES } from '../../routes/routes';
import { Link } from 'react-router-dom';

type DropDownProps = {
  visible: boolean;
  setVisible: (value: boolean) => void;
  films: MovieType[];
  dropDownRef: MutableRefObject<HTMLDivElement | null>;
  setNavbarInputValue: Dispatch<SetStateAction<string>>;
};

export function DropDown({
  visible,
  setVisible,
  films,
  dropDownRef,
  setNavbarInputValue,
}: DropDownProps) {
  const rootClasses = [cl.dropDown];
  if (!visible || !films.length) {
    return null;
  }

  const handleItemClick = () => {
    setVisible(false);
    setNavbarInputValue('');
  };

  return (
    <div ref={dropDownRef} className={rootClasses.join(' ')}>
      <div className={cl.dropDownContent}>
        {films.map((film) => {
          return (
            <Link
              state={{ id: film.imdbID }}
              onClick={handleItemClick}
              className={cl.dropDownItems}
              key={film.imdbID}
              to={`${ROUTES.FILM}?id=${film.imdbID}`}
            >
              {film.Title}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
