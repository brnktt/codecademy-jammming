import React from "react";
import Track from "../Track/Track";
import "./TrackList.css";

function Tracklist({ userSearchResults, onAdd, isRemoval }) {
  return (
    <div className="TrackList">
      {userSearchResults && userSearchResults.map((track) => {
        return (
          <Track track={track} key={track.id} isRemoval={isRemoval} onAdd={onAdd}/>
          )
      })}
    </div>
  );
}

export default Tracklist;