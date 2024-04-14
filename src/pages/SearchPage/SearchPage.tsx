import React, {
  SyntheticEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import { Search, Film } from '../../types/SearchTypes/searchTypes';
import searchImg from '../../assets/images/search.png';
import { SearchInput } from './SearchInput';
import { SearchForm } from './SearchForm';
import './SearchPageStyles.css';

// в работе

const initialState: Search = {
  title: '',
  year: '',
};

const errors: Film = {
  titleError: 'Фильм не найден',
  yearError: 'Фильм не найден',
};

export const SearchPage = () => {
  const [SearchData, setSearchData] = useState<Search>(initialState);
  const filmNameRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (filmNameRef.current) {
      filmNameRef.current.focus();
    }
  }, []);

  const handleSubmit = useCallback((e: SyntheticEvent<EventTarget>) => {
    e.preventDefault();
  }, []);

  return (
    <SearchForm
      title="Поиск"
      imageSrc={searchImg}
      btnName="Поиск"
      onSubmit={handleSubmit}
    >
      <SearchInput
        label="Название фильма"
        name="title"
        type="text"
        data={SearchData}
        setData={setSearchData}
        errors={errors}
        filmRef={filmNameRef}
      />
      <SearchInput
        label="Год релиза"
        name="year"
        type="text"
        data={SearchData}
        setData={setSearchData}
        errors={errors}
      />
    </SearchForm>
  );
};
