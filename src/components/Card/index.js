import React, { useEffect } from "react";
import { string, shape, object } from "prop-types";
import { Card, Button, ListGroup } from "react-bootstrap";
import moment from 'moment';

const CardComponent = ({ data }) => {
  const { id, image, name, species, status, gender, created, origin } = data;

  return (
    <Card>
      <Card.Img variant="top" src={image} />
      <Card.Body>
        <Card.Title>{name}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">{species}</Card.Subtitle>
        {/* <Card.Text>
          Some quick example text to build on the card title and make up the
          bulk of the card's content.
        </Card.Text>
        <Button variant="primary">Go somewhere</Button> */}
      </Card.Body>
      <ListGroup variant="flush">
      <ListGroup.Item>ID: {id}</ListGroup.Item>
        <ListGroup.Item>Status: {status}</ListGroup.Item>
        <ListGroup.Item>Gender: {gender}</ListGroup.Item>
      </ListGroup>
      <Card.Footer>
      <small className="text-muted">{`Created: ${moment(created).format('LL')}`}</small>
    </Card.Footer>
    </Card>
  );
};

CardComponent.propTypes = {
  data: shape({}).isRequired
};

CardComponent.defaultProps = {
  // userData: {}
};

export default CardComponent;
