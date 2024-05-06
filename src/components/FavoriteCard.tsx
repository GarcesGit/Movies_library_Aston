import React from 'react';
import { Button, Card } from 'react-bootstrap';
import { MovieType } from '../types/ReduxTypes/MovieType';

export const FavoriteCard = (props: {
  handleRemove: (movie: MovieType) => () => void;
  movie: MovieType;
}) => {
  const { Title, Year, imdbID, Type, Poster } = props.movie;

  return (
    <Card className="h-100">
      <Card.Img variant="top" src={Poster} alt={Title} />
      <Card.Body>
        <Card.Title>{Title}</Card.Title>
        <Card.Text>Год: {Year}</Card.Text>
        <Card.Text>Тип: {Type}</Card.Text>
      </Card.Body>
      <Button
        onClick={props.handleRemove(props.movie)}
        variant="outline-danger"
      >
        Удалить из избранного
      </Button>
    </Card>
  );
};
