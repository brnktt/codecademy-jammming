import React from "react";
import Tracklist from "../TrackList/TrackList";
import "./SearchResults.css";

function SearchResults ({ userSearchResults, onAdd }) {
  return (
    <div className="SearchResults">
      <Tracklist 
        playlistTracks={userSearchResults} 
        onAdd={onAdd} 
        isRemoval={false}/>
    </div>
  );
}

export default SearchResults;