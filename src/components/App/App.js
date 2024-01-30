import React, { useState } from "react";
import SearchBar from "../SearchBar/SearchBar";
import SearchResults from "../SearchResults/SearchResults";
import Playlist from "../Playlist/Playlist";
import "./App.css";
import Spotify from "../../util/Spotify/Spotify";

function App() {
  const [userSearchResults, setUserSearchResults] = useState([]);
  const [playlistName, setPlaylistName] = useState("New Playlist");
  const [playlistTracks, setPlaylistTracks] = useState([]);

  function addTrack(track) {
    const foundTrack = playlistTracks.find(
      (playlistTrack) => playlistTrack.id === track.id
    );
    let newPlaylistTracks = playlistTracks.concat(track);

    foundTrack
      ? console.log("Track already exists")
      : setPlaylistTracks(newPlaylistTracks);
  }

  function removeTrack(track) {
    let newPlaylistTracks = playlistTracks.filter(
      (playlistTrack) => playlistTrack.id !== track.id
    );

    setPlaylistTracks(newPlaylistTracks);
  }

  function updatePlaylistName(name) {
    setPlaylistName(name);
  }

  function savePlaylist() {
    const trackURIs = playlistTracks.map((playlistTrack) => playlistTrack.uri);
    const name = playlistName;
    Spotify.savePlaylist(name, trackURIs).then(() => {
      setPlaylistName("New Playlist");
      setPlaylistTracks([]);
    });
  }

  function search(searchTerm) {
    Spotify.search(searchTerm).then((result) => {
      setUserSearchResults(result);
    });
    console.log(searchTerm);

    Spotify.searchPlaylists(searchTerm).then((result) => {
      console.log(`result - ${JSON.stringify(result)}`);

      if (result) {
        // JSON
        // const element = document.createElement("a");
        // const textFile = new Blob([JSON.stringify(result)], {
        //   type: "text/json",
        // }); //pass data from localStorage API to blob
        // element.href = URL.createObjectURL(textFile);
        // element.download = `${searchTerm}.json`;
        // document.body.appendChild(element);
        // element.click();

        // CSV
        // Convert array of objects to CSV content
        const csvContent = result.map((playlist) =>
          Object.values(playlist)
            .map((value) => `"${value}"`)
            .join(",")
        );

        // Add header row
        const header = Object.keys(result[0]).join(",");
        csvContent.unshift(header);

        // Create a Blob with the CSV content
        const csvBlob = new Blob([csvContent.join("\n")], {
          type: "text/csv",
        });

        // Create a download link
        const element = document.createElement("a");
        element.href = URL.createObjectURL(csvBlob);
        element.download = `${searchTerm}.csv`;

        // Append the link to the document and trigger a click to download
        document.body.appendChild(element);
        element.click();
      }
    });
  }

  return (
    <div>
      <h1>
        Ja<span className="highlight">mmm</span>ing
      </h1>
      <div className="App">
        <SearchBar onSearch={search} />
        <div className="App-playlist">
          <SearchResults
            userSearchResults={userSearchResults}
            onAdd={addTrack}
          />
          <Playlist
            playlistName={playlistName}
            playlistTracks={playlistTracks}
            onRemove={removeTrack}
            onNameChange={updatePlaylistName}
            onSave={savePlaylist}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
