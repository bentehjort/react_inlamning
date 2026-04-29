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
  const [totalBands, setTotalBands] = useState("");
  //created state for seeded to be able to control when to show seeded vs unseeded bands
  //only seeded bands will be shown when viewing the bands normally,
  //unseeded bands (as user created bands) will be visible when searching
  const [seeded, setSeeded] = useState(true);
  const navigate = useNavigate();
  //executeSearch changes the value of searchFilter and currenPage and
  //because we've placed those states in the useEffects dependency array,
  //fetchBands will run when executeSearch has been executed, presenting a new list of bands
  const executeSearch = (searchWord) => {
    setSearchFilter(searchWord);
    setCurrentPage(1);
    setSeeded(false);

    if (searchWord === "") {
      setSeeded(true);
    } else {
      setSeeded(false);
    }
  };
  useEffect(() => {
    async function fetchBands() {
      const data = await _service.readMusicGroupsAsync(
        currentPage - 1,
        false,
        searchFilter,
        10,
        seeded,
      );
      setBands(data.pageItems);
      setTotalBands(data.dbItemsCount);
    }
    fetchBands();
  }, [currentPage, searchFilter, seeded]);
  return (
    //Presenting bands
    <div>
      <h1>All bands</h1>
      <SearchBar onSearch={executeSearch}></SearchBar>
      <p>Total amount of bands found: {totalBands}</p>
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
