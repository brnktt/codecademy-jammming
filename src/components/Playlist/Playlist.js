import React from "react";
import Tracklist from "../TrackList/TrackList";
import "./Playlist.css";

function Playlist(props) {
  function handleNameChange(event) {
    props.onNameChange(event.target.value);
  };

  return (
    <div className="Playlist">
      <input 
        defaultValue={"New Playlist"}
        onChange={handleNameChange}
        value={props.playlistName}/>
      <Tracklist 
        playlistTracks={props.playlistTracks}
        onRemove={props.onRemove}
        isRemoval={true}/>
      <button className="Playlist-save">
        SAVE TO SPOTIFY
      </button>
    </div>
  );
}

export default Playlist;