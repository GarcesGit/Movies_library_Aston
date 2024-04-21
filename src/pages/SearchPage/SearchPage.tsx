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
  useSearchParams,
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
  const [searchParams, setSearchParams] = useSearchParams();
  const filmNameRef = useRef<HTMLInputElement>(null);
  const dispatch = useAppDispatch();
  const { searchMovies, isLoading, errorCode } =
    useAppSelector(stateSearchMovies);

  const location = useLocation();
  //если searchmovis есть отображать фильмы если нет то форма поиска
  //обработка ошибки поискового запроса

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
    // navigate(`${ROUTES.SEARCH}?s=${SearchData.title}`, {
    //   state: { s: SearchData.title },
    // });
    setSearchParams(SearchData.title);
  }, []);

  if (isLoading) {
    return <Loader />;
  }

  console.log(searchParams);

  return (
    <>
      <div className="container_searchPage">
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
        <div className="container_searchMovies">
          {searchMovies.map((movie) => (
            <img
              key={movie.imdbID}
              alt="poster"
              src={movie.Poster}
              className="image slider_image"
              // onClick={() => onMovieClick(movie)}
            />
          ))}
        </div>
      </div>
    </>
  );
};
