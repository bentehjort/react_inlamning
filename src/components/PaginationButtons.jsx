import { Button } from "react-bootstrap";
function PaginationButtons({ currentPage, setCurrentPage }) {
  function HandlePageChange(amount) {
    //prevents user from going to page 0 or negative pages
    if (currentPage + amount < 1) {
      return;
    }
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
