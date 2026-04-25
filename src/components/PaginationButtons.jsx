import { Button } from "react-bootstrap";
function PaginationButtons({ currentPage, setCurrentPage }) {
  function HandlePageChange(amount) {
    setCurrentPage((prevPage) => prevPage + amount);
  }
  return (
    <div>
      <button onClick={() => HandlePageChange(-1)}>{"<<Previous"}</button>
      <span>{currentPage}</span>
      <button onClick={() => HandlePageChange(1)}>{"Next>>"}</button>
    </div>
  );
}
export default PaginationButtons;
