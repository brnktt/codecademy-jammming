import React from "react";
import Track from "../Track/Track";
import "./TrackList.css";

function Tracklist({ userSearchResults }) {
  return (
    <div className="TrackList">
      {userSearchResults && userSearchResults.map((track) => {
        return (
          <Track track={track} key={track.id} isRemoval={false}/>
          )
      })}
    </div>
  );
}

export default Tracklist;