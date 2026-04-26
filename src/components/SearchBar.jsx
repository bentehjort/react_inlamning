import { useState } from "react";
import { Button, Form, InputGroup } from "react-bootstrap";
//using onSearch as a prop, as a delegate in c#
function SearchBar({ onSearch }) {
  const [inputValue, setInputValue] = useState("");
  //When the user clicks "Search" the inputValue is sent to onSearch, which sends it to
  //the function executeSearch in MusicPage.jsx. in executeSearch searchFilter will be
  //set to the users inputValue, which will execute fetchBands with userValue as ouR new searchFilter
  //and load all bands that match with our searchWord.
  const handleSearchClick = () => {
    onSearch(inputValue);
  };

  return (
    <div>
      <input
        type="text"
        value={inputValue}
        placeholder="Search for a band..."
        //onChange is notified whenever the textvalue in our input field changes and
        //the current inputvalue is saved in the input states by calling setInputValue
        onChange={(e) => setInputValue(e.target.value)}
      ></input>
      <button onClick={handleSearchClick}>Search</button>
    </div>
  );
}
export default SearchBar;
