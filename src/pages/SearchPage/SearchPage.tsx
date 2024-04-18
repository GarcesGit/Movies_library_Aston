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
import {
  useLocation,
  useNavigate,
  useNavigation,
  useParams,
} from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../core/hooks/hooks';
import { fetchSearchMovies } from '../../core/slices/searchPageSlice/fetchSearchMovies';
import { stateSearchMovies } from '../../core/selectors/selectors';
import { Loader } from '../../components/loader/Loader';
import { ROUTES } from '../../routes/routes';

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
  const dispatch = useAppDispatch();
  const { searchMovies, isLoading, errorCode } =
    useAppSelector(stateSearchMovies);

  const location = useLocation();
  const navigate = useNavigate();
  //вместо useNavigate useSearchParams как useState
  //set SearchParam и вызывать setSearchParam? предать searchdatetitle
  //см доки
  //если searchmovis есть отображать фильмы если нет то форма поиска
  //обработка ошибки поискового запроса

  console.log(location);

  const getSearchString = (string: string) => {
    const queryArray = string.split('&');
    if (queryArray.length === 1) {
      return queryArray[0].slice(3, string.length);
    }
    const searchString = queryArray.find((query) => query.includes('s='));
    if (!searchString) {
      return '';
    }
    return searchString.replace('?', '').replace('s=', '');
  };

  useEffect(() => {
    if (location.state) {
      dispatch(fetchSearchMovies(location.state.s));
      return;
    }
    if (location.search) {
      dispatch(fetchSearchMovies(getSearchString(location.search)));
      return;
    }
  }, [location]);

  useEffect(() => {
    if (filmNameRef.current) {
      filmNameRef.current.focus();
    }
  }, []);

  const handleSubmit = useCallback((e: SyntheticEvent<EventTarget>) => {
    e.preventDefault();
    if (SearchData.title.length < 3) {
      return;
    }
    navigate(`${ROUTES.SEARCH}?s=${SearchData.title}`, {
      state: { s: SearchData.title },
    });
  }, []);

  console.log(searchMovies);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <>
      <div>{JSON.stringify(searchMovies[0])}</div>
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
    </>
  );
};
