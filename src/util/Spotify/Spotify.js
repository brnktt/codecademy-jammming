let accessToken = "";
const clientID = "3bced3813632475bb5dc9ab1e95a2895";
const redirectUrl = "http://localhost:3000/";
// const redirectUrl = "https://brnktt.github.io/codecademy-jammming/";
// const redirectUrl = "http://localhost:3001/codecademy-jammming/";

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

  async searchPlaylists(term) {
    const accessToken = Spotify.getAccessToken();
    const response = await fetch(
      `https://api.spotify.com/v1/search?q=${term}&type=playlist&limit=50`,
      {
        method: "GET",
        headers: { Authorization: `Bearer ${accessToken}` },
      }
    );
    const jsonResponse = await response.json();
    if (!jsonResponse.playlists) {
      return [];
    }
    const Ids = jsonResponse.playlists.items.map((playlist) => playlist.id);
    const playlists = await Promise.all(
      Ids.map((id) => Spotify.searchPlaylistInfo(id))
    );

    let filteredPlaylists = playlists.filter(
      (playlist) => playlist.ownerName !== "Spotify"
    );
    filteredPlaylists.sort((a, b) => b.FollowersTotal - a.FollowersTotal);

    return filteredPlaylists;
  },

  async searchPlaylistInfo(Id) {
    const accessToken = Spotify.getAccessToken();
    const response = await fetch(`https://api.spotify.com/v1/playlists/${Id}`, {
      method: "GET",
      headers: { Authorization: `Bearer ${accessToken}` },
    });

    const playlistInfo = await response.json();

    //console.log(playlistInfo);

    if (typeof playlistInfo !== "object") {
      return {};
    }

    const compareDates = (a, b) => {
      const dateA = new Date(a.added_at.split("T")[0]);
      const dateB = new Date(b.added_at.split("T")[0]);

      // Compare in descending order
      return dateB - dateA;
    };

    return {
      playlistName: playlistInfo.name,
      playlistLink: playlistInfo.external_urls.spotify,
      ownerName: playlistInfo.owner.display_name,
      ownerLink: playlistInfo.owner.external_urls.spotify,
      FollowersTotal: playlistInfo.followers.total,
      TracksTotal: playlistInfo.tracks.total,
      LastModified: playlistInfo.tracks.items
        .sort(compareDates)[0]
        .added_at.split("T")[0],
    };
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
