import { Form, Button, Row, Col } from "react-bootstrap";
import { useState } from "react";
import MusicService from "../services/MusicService";
import { useNavigate } from "react-router-dom";
function AddNewBand() {
  const [bandName, setBandName] = useState("");
  const [genre, setGenre] = useState("");
  const [establishedYear, setEstablishedYear] = useState("");
  const [errors, setErrors] = useState({});
  const url = "https://music.api.public.seido.se/api";
  const _service = new MusicService(url);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};
    if (bandName === "") {
      newErrors.bandName = "You must provide a band name";
    }
    if (genre === "" || genre === "Select genre...") {
      newErrors.genre = "You must select a genre";
    }
    if (establishedYear < 1700 || establishedYear > 2026) {
      newErrors.establishedYear =
        "You must provide a year between 1700 and 2026";
    }
    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) {
      return;
    }
    const newBandItem = {
      name: bandName,
      genre: Number(genre),
      establishedYear: Number(establishedYear),
      albums: [],
      artists: [],
    };
    try {
      const createdBand = await _service.createMusicGroupAsync(newBandItem);

      console.log("created band: ", createdBand);

      navigate(`/musicPage/${createdBand.item.musicGroupId}`);
    } catch (error) {
      console.error("Could not save band: ", error);
      alert("Something went wrong, check console for more info");
    }
  };
  return (
    <Row className="justify-content-center mt-5">
      <Col md={6} lg={4}>
        <div className="text-center mb-4">
          <h2>Add a new band</h2>
          <p>
            Fill in the details of the band you want to add. Asterics * are
            required fields.
          </p>
        </div>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="bandName">
            <Form.Label>Band name *</Form.Label>
            <Form.Control
              type="text"
              value={bandName}
              onChange={(e) => setBandName(e.target.value)}
              placeholder="Type band name..."
              isInvalid={!!errors.bandName}
            ></Form.Control>
            <Form.Control.Feedback type="invalid">
              {errors.bandName}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3" controlId="genre">
            <Form.Label>Genre *</Form.Label>
            <Form.Select
              value={genre}
              onChange={(e) => setGenre(e.target.value)}
              isInvalid={!!errors.genre}
            >
              <option>Select genre...</option>
              <option value="0">Rock</option>
              <option value="1">Blues</option>
              <option value="2">Jazz</option>
              <option value="3">Metal</option>
            </Form.Select>
            <Form.Control.Feedback type="invalid">
              {errors.genre}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3" controlId="estabishedYear">
            <Form.Label>Established year *</Form.Label>
            <Form.Control
              type="number"
              value={establishedYear}
              onChange={(e) => setEstablishedYear(e.target.value)}
              isInvalid={!!errors.establishedYear}
              placeholder="Type established year..."
            ></Form.Control>
            <Form.Control.Feedback type="invalid">
              {errors.establishedYear}
            </Form.Control.Feedback>
          </Form.Group>
          <Button variant="primary" type="submit" className="w-100">
            Add Band
          </Button>
        </Form>
      </Col>
    </Row>
  );
}
export default AddNewBand;
