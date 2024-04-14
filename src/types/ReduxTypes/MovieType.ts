export interface FetchMoviesResponse {
  Response: string;
  Search: [];
  totalResults: string;
  Error?: string;
}

export interface MovieType {
  Title: string;
  Year: string;
  imdbID: string;
  Type: string;
  Poster: string;
}

export interface MovieTypeExtended extends MovieType {
  Runtime: string;
  Genre: string;
  Director: string;
  Actors: string;
  Plot: string;
  Country: string;
  Awards: string;
  imdbRating: string;
  BoxOffice: string;
}

export type FavoriteType = MovieType & {
  userId: string;
};

export type FavoriteState = {
  favorites: FavoriteType[];
};
