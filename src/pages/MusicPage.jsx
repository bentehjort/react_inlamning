import React, { useState, useEffect } from "react";
import { Row, Button, Container, Col } from "react-bootstrap";
import MusicService from "../services/MusicService";
import PaginationButtons from "../components/PaginationButtons";
import { data, useNavigate } from "react-router-dom";
import GenreMap from "../components/GenreMap";
import SearchBar from "../components/SearchBar";
const url = "https://music.api.public.seido.se/api";
const _service = new MusicService(url);
function MusicPage() {
  const [bands, setBands] = useState([]);
  const [searchFilter, setSearchFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();
  //executeSearch changes the value of searchFilter and currenPage and
  //because we've placed those states in the useEffects dependency array,
  //fetchBands will run when executeSearch has been executed, presenting a new list of bands
  const executeSearch = (searchWord) => {
    setSearchFilter(searchWord);
    setCurrentPage(1);
  };
  useEffect(() => {
    async function fetchBands() {
      const data = await _service.readMusicGroupsAsync(
        currentPage - 1,
        false,
        searchFilter,
        10,
        false,
      );
      setBands(data.pageItems);
    }
    fetchBands();
  }, [currentPage, searchFilter]);
  return (
    <div>
      <h1>All bands</h1>
      <SearchBar onSearch={executeSearch}></SearchBar>
      <Container>
        <Row className="border-bottom border-dark pb-2 mb-3 fw-bold">
          <Col>Band name</Col>
          <Col>Genre</Col>
          <Col>Active since</Col>
          <Col>Albums</Col>
          <Col></Col>
        </Row>
        {bands.map(
          (band) =>
            console.log(band) || (
              <Row
                key={band.musicGroupId}
                className="border-bottom py-2 align-items-center"
              >
                <Col>{band.name}</Col>
                <Col>{GenreMap(band.genre)} </Col>
                <Col>{band.establishedYear}</Col>
                <Col>{band.albums?.length || 0}</Col>
                <Col>
                  <Button
                    id="detailsBtn"
                    variant="primary"
                    onClick={() => navigate(`/musicPage/${band.musicGroupId}`)}
                  >
                    View Details
                  </Button>
                </Col>
              </Row>
            ),
        )}
      </Container>
      <PaginationButtons
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    </div>
  );
}
export default MusicPage;
