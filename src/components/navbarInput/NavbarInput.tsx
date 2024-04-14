import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router';
import { ROUTES } from '../../routes/routes';
import { fetchFilmsToNavbarInput } from '../../core/slices/navbarInputSlices/FetchFilmsToNavbarInput';
import { useAppDispatch, useAppSelector } from '../../core/hooks/hooks';
import { stateFilmsToNavbarInput } from '../../core/selectors/selectors';
import { Loader } from '../loader/Loader';
import { DropDown } from '../dropDown/DropDown';
import { useDebounce } from '../../core/hooks/useDebounce';
import { useOutsideClick } from '../../core/hooks/useOutsideClick';
import { filmsToNavbarInputSlice } from '../../core/slices/navbarInputSlices/FilmsToNavbarInputSlice';

export const NavbarInput = () => {
  const { filmsToNavbarInput, isLoading, errorCode } = useAppSelector(
    stateFilmsToNavbarInput,
  );
  const [navbarInputValue, setNavbarInputValue] = useState('');
  const [dropDown, setDropDown] = useState(false);

  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const debouncedNavbarInputValue = useDebounce(navbarInputValue);
  const dropDownRef = useRef(null);
  const inputRef = useRef(null);

  useOutsideClick(dropDownRef, () => setDropDown(false), inputRef);

  useEffect(() => {
    if (debouncedNavbarInputValue.length < 3) {
      return;
    }
    dispatch(fetchFilmsToNavbarInput(debouncedNavbarInputValue));
  }, [debouncedNavbarInputValue]);

  useEffect(() => {
    if (!navbarInputValue) {
      setDropDown(false);
      dispatch(filmsToNavbarInputSlice.actions.clearFilmsList());
      return;
    }
    setDropDown(true);
  }, [navbarInputValue]);

  const escapeDropDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Escape') {
      setDropDown(false);
    }
  };

  const onChangeNavbarInputValue = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setNavbarInputValue(event.target.value);
  };

  const gotoSearchForm = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      setDropDown(false);
      setNavbarInputValue('');
      navigate(ROUTES.SEARCH);
    }
  };

  return (
    <div className="navbar_input">
      <input
        className="form-control me-2"
        type="search"
        placeholder="Поиск"
        aria-label="search"
        value={navbarInputValue}
        onKeyUp={escapeDropDown}
        onChange={onChangeNavbarInputValue}
        onKeyDown={gotoSearchForm}
        ref={inputRef}
      />
      <DropDown
        visible={dropDown}
        setVisible={setDropDown}
        films={filmsToNavbarInput}
        dropDownRef={dropDownRef}
        setNavbarInputValue={setNavbarInputValue}
      />
      {isLoading && <Loader />}
      {errorCode && <h5 className="error">Фильм не найден</h5>}
    </div>
  );
};
