import React from "react";
import Tracklist from "../TrackList/TrackList";
import "./Playlist.css";

function Playlist(props) {
  return (
    <div className="Playlist">
      <input defaultValue={"New Playlist"} />
      <Tracklist playlistTracks={props.playlistTracks}/>
      <button className="Playlist-save">
        SAVE TO SPOTIFY
      </button>
    </div>
  );
}

export default Playlist;