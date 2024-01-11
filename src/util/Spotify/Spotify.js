let accessToken = "";
const clientID = "3bced3813632475bb5dc9ab1e95a2895";
const redirectUrl = "http://localhost:3000/";

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
};

export default Spotify;
