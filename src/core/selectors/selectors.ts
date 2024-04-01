import { RootState } from '../../app/store';
import { MovieState } from '../slices/MovieSlice';
import { SerialsState } from '../slices/SerialsSlice';

export const stateMovies = (state: RootState): MovieState => state.movies;
export const stateSerials = (state: RootState): SerialsState => state.serials;
