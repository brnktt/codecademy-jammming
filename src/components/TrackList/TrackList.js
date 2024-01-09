import React from "react";
import Track from "../Track/Track";
import "./TrackList.css";

function Tracklist(props) {
  return (
    <div className="Tracklist">
      {props.playlistTracks && props.playlistTracks.map((track) => {
        return (
          <Track 
            track={track}
            key={track.id}
            isRemoval={props.isRemoval}
            onAdd={props.onAdd}
            onRemove={props.onRemove}/>
          )
      })}
    </div>
  );
}

export default Tracklist;