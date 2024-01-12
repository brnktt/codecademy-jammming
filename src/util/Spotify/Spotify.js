let accessToken = "";
const clientID = "3bced3813632475bb5dc9ab1e95a2895";
// const redirectUrl = "http://localhost:3000/";
const redirectUrl = "https://brnktt.github.io/codecademy-jammming/";

const Spotify = {
  getAccessToken() {
    if (accessToken) return accessToken;

    // extract access token from URL
    const urlAccessToken = window.location.href.match(/access_token=([^&]*)/);
    // extract expiry time from URL
    const urlExpiresIn = window.location.href.match(/expires_in=([^&]*)/);

    if (urlAccessToken && urlExpiresIn) {
      accessToken = urlAccessToken[1];
      const expiresIn = Number(urlExpiresIn[1]);

      window.setTimeout(() => (accessToken = ""), expiresIn * 1000);
      window.history.pushState("Access Token", null, "/");
      return accessToken;
    }

    const redirect = `https://accounts.spotify.com/authorize?client_id=${clientID}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectUrl}`;
    window.location = redirect;
  },

  async search(term) {
    const accessToken = Spotify.getAccessToken();
    const response = await fetch(
      `https://api.spotify.com/v1/search?q=${term}&type=track`,
      {
        method: "GET",
        headers: { Authorization: `Bearer ${accessToken}` },
      }
    );
    const jsonResponse = await response.json();
    if (!jsonResponse.tracks) {
      return [];
    }
    return jsonResponse.tracks.items.map((track) => ({
      id: track.id,
      name: track.name,
      artist: track.artists[0].name,
      album: track.album.name,
      uri: track.uri,
    }));
  },

  savePlaylist(name, trackURIs) {
    if (!name || !trackURIs) return;

    const accessToken = Spotify.getAccessToken();
    const header = { Authorization: `Bearer ${accessToken}` };
    let userId;

    return fetch(`https://api.spotify.com/v1/me`, {
      headers: header,
    })
      .then((response) => response.json())
      .then((jsonResponse) => {
        userId = jsonResponse.id;
        let playlistId;
        return fetch(`https://api.spotify.com/v1/users/${userId}/playlists`, {
          headers: header,
          method: "POST",
          body: JSON.stringify({ name: name }),
        })
          .then((response) => response.json())
          .then((jsonResponse) => {
            playlistId = jsonResponse.id;
            return fetch(
              `https://api.spotify.com/v1/playlists/${playlistId}/tracks`,
              {
                headers: header,
                method: "POST",
                body: JSON.stringify({ uris: trackURIs }),
              }
            );
          });
      });
  },
};

export default Spotify;
