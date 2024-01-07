import React, { useState } from "react";
import SearchBar from "../SearchBar/SearchBar";
import SearchResults from "../SearchResults/SearchResults";
import Playlist from "../Playlist/Playlist";
import "./App.css";

function App () {
  const [userSearchResults, setUserSearchResults] = useState(
    [
      {
        id: 0,
        name: "F.E.E.L.",
        artist: "Lucky Luke",
        album: "F.E.E.L.",
      },
      {
        id: 1,
        name: "Hey Ya!",
        artist: "LEOWI & Lucky Luke",
        album: "Hey Ya!",
      },
      {
        id: 2,
        name: "Smells Like Teen Spirit",
        artist: "Coopex, Nito-Onna & CPX",
        album: "Smells Like Teen Spirit",
      }
    ]
  );
  const [playlistName, setPlaylistName] = useState("First playlist");
  const [playlistTracks, setPlaylistTracks] = useState(
    [
      {
        id: 1,
        name: "Hey Ya!",
        artist: "LEOWI & Lucky Luke",
        album: "Hey Ya!",
      }
    ]
  );

  // TODO: step 

  // Add hard-coded values for playlistName and playlistTracks to state in App.js.

  return (
    <div>
      <h1>
        Ja<span className="highlight">mmm</span>ing
      </h1>
      <div className="App">
        <SearchBar />
        <div className="App-playlist">
          <SearchResults userSearchResults={userSearchResults} />
          <Playlist playlistName={playlistName} playlistTracks={playlistTracks}/>
        </div>
      </div>
    </div>
  );
}

export default App;