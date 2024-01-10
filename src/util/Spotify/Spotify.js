let accessToken = "";
const clientID = "3bced3813632475bb5dc9ab1e95a2895";
const redirectURI = "http://localhost:3000/";

function Spotify() {
  function getAccessToken() {
    if (accessToken) {
      return accessToken;
    }

    // extract access token from URL
    const urlAccessToken = window.location.href.match(/access_token=([^&]*)/);
    // extract expiry time from URL
    const urlExpiresIn = window.location.href.match(/expires_in=([^&]*)/);

    if (urlAccessToken && urlExpiresIn) {
      accessToken = urlAccessToken[1];
      const expiresIn = Number(urlExpiresIn[1]);
      window.setTimeout(() => (accessToken = ""), expiresIn * 1000);
      window.history.pushState("Access Token", null, "/");
    } else {
      const redirect = `https://accounts.spotify.com/authorize?client_id=${clientID}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectURI}`;
      window.location = redirect;
    }
  };
}

export default Spotify;