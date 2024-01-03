import React from "react";
import Tracklist from "../TrackList/TrackList";
import "./SearchResults.css";

function SearchResults ({ userSearchResults }) {
  return (
    <div className="SearchResults">
      <Tracklist userSearchResults={userSearchResults}/>
    </div>
  );
}

export default SearchResults;