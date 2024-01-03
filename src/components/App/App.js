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
  )

  // TODO: step 36

  return (
    <div>
      <h1>
        Ja<span className="highlight">mmm</span>ing
      </h1>
      <div className="App">
        <SearchBar />
        <div className="App-playlist">
          <SearchResults userSearchResults={userSearchResults} />
          <Playlist />
        </div>
      </div>
    </div>
  );
}

export default App;