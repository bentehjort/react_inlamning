import { Routes, Route, Link } from "react-router-dom";
import { Container, Nav, Navbar } from "react-bootstrap";
import AboutPage from "./pages/AboutPage";
import MusicPage from "./pages/MusicPage";
import BandDetails from "./pages/BandDetails";
import AddNewBand from "./pages/AddNewBand";
import "./App.css";

function App() {
  return (
    <div className="App">
      <Navbar bg="dark" variant="dark" expand="lg">
        <Container>
          <Navbar.Brand>My music app</Navbar.Brand>
          <Nav className="menu">
            <Nav.Link as={Link} to="/about">
              About
            </Nav.Link>
            <Nav.Link as={Link} to="/musicPage">
              Music Page
            </Nav.Link>
            <Nav.Link as={Link} to="/addNewBand">
              Add new band
            </Nav.Link>
          </Nav>
        </Container>
      </Navbar>
      <Routes>
        <Route path="/" element={<AboutPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/musicPage" element={<MusicPage />} />
        <Route path="/musicPage/:id" element={<BandDetails />} />
        <Route path="/addNewBand" element={<AddNewBand />} />
      </Routes>
    </div>
  );
}

export default App;
