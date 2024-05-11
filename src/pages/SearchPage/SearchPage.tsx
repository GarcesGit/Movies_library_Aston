import React, {
  SyntheticEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import { Search } from '../../types/SearchTypes/searchTypes';
import searchImg from '../../assets/images/search.png';
import { SearchInput } from './SearchInput';
import { SearchForm } from './SearchForm';
import './SearchPageStyles.css';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../core/hooks/hooks';
import { fetchSearchMovies } from '../../core/slices/searchPageSlice/fetchSearchMovies';
import { stateSearchMovies } from '../../core/selectors/selectors';
import { Loader } from '../../components/loader/Loader';
import { ROUTES } from '../../routes/routes';
import { searchPageActions } from '../../core/slices/searchPageSlice/searchPageSlice';
import noPhoto from '../../assets/images/noPhoto.jpg';

const initialState: Search = {
  title: '',
  year: '',
};

export const SearchPage = () => {
  const [SearchData, setSearchData] = useState<Search>(initialState);
  const filmNameRef = useRef<HTMLInputElement>(null);
  const dispatch = useAppDispatch();
  const { searchMovies, isLoading, errorCode } =
    useAppSelector(stateSearchMovies);
  const { clearSearchMoviesList } = searchPageActions;

  const location = useLocation();
  const navigate = useNavigate();

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
    return () => {
      dispatch(clearSearchMoviesList());
    };
  }, [location]);

  const handleSubmit = useCallback(
    (e: SyntheticEvent<EventTarget>) => {
      e.preventDefault();
      if (SearchData.title.length < 3) {
        return;
      }
      navigate(`${ROUTES.SEARCH}?s=${SearchData.title}`, {
        state: { s: SearchData.title },
        replace: true,
      });
    },
    [SearchData],
  );

  return (
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
          filmRef={filmNameRef}
        />
        <SearchInput
          label="Год релиза"
          name="year"
          type="text"
          data={SearchData}
          setData={setSearchData}
        />
      </SearchForm>
      {isLoading && <Loader />}
      {Boolean(searchMovies.length) && (
        <div className="container_searchMovies">
          {searchMovies.map((movie) => {
            return (
              <Link
                state={{ id: movie.imdbID }}
                key={movie.imdbID}
                to={`${ROUTES.FILM}?id=${movie.imdbID}`}
              >
                <img
                  key={movie.imdbID}
                  alt="poster"
                  src={movie.Poster === 'N/A' ? noPhoto : movie.Poster}
                  className="image slider_image"
                  // onClick={() => handleMovieClick(movie)}
                />
              </Link>
            );
          })}
        </div>
      )}
      {errorCode && <h2 className="error">Фильм не найден</h2>}
    </div>
  );
};
