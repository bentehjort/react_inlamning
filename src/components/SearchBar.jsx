function SearchBar({ searchFilter, setSearchFilter }) {
  function SearchBand(inputValue) {
    setSearchFilter((SearchFilter) => inputValue);
  }
  return (
    <div>
      <input
        type="text"
        id="search-input"
        placeholder="Search for a band"
      ></input>
      <button onClick={() => SearchBand()}>Search</button>
    </div>
  );
}
export default SearchBar;
