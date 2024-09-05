import Card from 'react-bootstrap/Card';
import React from "react";

const Caard=({movie})=>{
  return (
    <Card style={{ width: '18rem' }}>
      <Card.Img variant="top" src={movie.Poster} />
      <Card.Body>
        <Card.Title>{movie.Title}</Card.Title>
        <Card.Text>
          {movie.Type}
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

export default Caard;