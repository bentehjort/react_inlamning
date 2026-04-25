import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import MusicService from "../services/MusicService";
import GenreMap from "../components/GenreMap";
import { Row, Col, Container } from "react-bootstrap";
const url = "https://music.api.public.seido.se/api";
const _service = new MusicService(url);
function BandDetails() {
  const { id } = useParams();
  const [band, setBand] = useState(null);
  useEffect(() => {
    async function fetchBand() {
      const data = await _service.readMusicGroupAsync(id, false);
      console.log("Fetched band data:", data);
      setBand(data.item);
    }
    fetchBand();
  }, [id]);
  if (!band) {
    return <p>Loading band..</p>;
  }

  return (
    <div>
      <h1>Band Details</h1>
      <h2>{band.name}</h2>
      <p>Genre: {GenreMap(band.genre)}</p>
      <p>Active since: {band.establishedYear}</p>
      <h3>Members:</h3>
      {band.artists?.map((artist) => (
        <p>
          {artist.firstName} {artist.lastName}
        </p>
      ))}
      <h3>Albums:</h3>
      {band.albums?.map((album) => (
        <p>{album.name}</p>
      ))}
    </div>
  );
}
export default BandDetails;
