import React, { useState } from "react";
import "./SearchBar.css";

function SearchBar (props) {
  const [searchTerm, setSearchTerm] = useState("");

  function passTerm() {
    props.onSearch(searchTerm);
  };

  function handleSearchTermChange(event) {
    setSearchTerm(event.target.value);
  };

  return (
    <div className="SearchBar">
      <input
        placeholder="Enter A Song, Album, or Artist"
        onChange={handleSearchTermChange}
        value={searchTerm}
      />
      <button className="SearchButton" onClick={passTerm}>
        SEARCH
      </button>
    </div>
  );
}

export default SearchBar;