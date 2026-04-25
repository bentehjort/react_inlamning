import React, { useState, useEffect } from "react";
import { Row, Button, Container, Col } from "react-bootstrap";
function BuildTable() {
  const [bands, setBands] = useState([]);
  useEffect(() => {
    fetch("https://music.api.public.seido.se/api")
      .then((response) => response.json())
      .then((data) => setBands(data));
  }, []);
  return (
    <div>
      <h1>All bands</h1>
      {bands.map((band) => (
        <Container>
          <Row>
            <Col>Band name: {band.name}</Col>
            <Col>Genre: {band.genre} </Col>
            <Col>Active since: {band.establishedYear}</Col>
            <Col>Albums: {band.albums.length}</Col>
            <Col>
              <Button variant="primary">View Details</Button>
            </Col>
          </Row>
        </Container>
      ))}
    </div>
  );
}
