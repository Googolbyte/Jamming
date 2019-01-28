var accessToken;
var expiresIn;
const clientID = "4e981f52e1c24b3a9d441bbfb1820cb6";
const redirectURI = "http://localhost:3000/"
const spotifyURL = `https://accounts.spotify.com/authorize?`
+ `client_id=${clientID}&response_type=token&`
+ `scope=playlist-modify-public&redirect_uri=${redirectURI}`;

const Spotify = {

  getAccessToken() {
//    console.log(window.location.href); JUST FIGURING STUFF OUT :D
//    console.log(window.location.href.match(/access_token=([^&]*)/));
//    console.log(window.location.hash.match(/access_token=([^&]*)/));
//    Guess i'm going to use [1] :)

    if (accessToken) {
      return accessToken;
    } else if (window.location.href.match(/access_token=([^&]*)/)) {
      accessToken = window.location.href.match(/access_token=([^&]*)/)[1];
      expiresIn = window.location.href.match(/expires_in=([^&]*)/)[1];
      window.setTimeout(() => accessToken = '', expiresIn * 1000);
      window.history.pushState('Access Token', null , '/');
      return accessToken;
    } else {
      window.location.replace(spotifyURL);
    }
  },



  search(term) {
    accessToken = this.getAccessToken();
    const searchUrl = `https://api.spotify.com/v1/search?type=track&q=${term}`;
    return fetch(searchUrl, {headers: {"Authorization": `Bearer ${accessToken}`}
    }).then(response => {
      return response.json();
    }).then(jsonResponse => {
      if (jsonResponse.tracks) {
        return jsonResponse.tracks.items.map(track => ({
            id:track.id,
            name:track.name,
            artist:track.artists[0].name,
            album:track.album.name,
            uri:track.uri,
            previewUrl:track.preview_url,
        }));
      } else return [];
    })
  },

  savePlaylist(playlistName, trackURIs) {
    accessToken = this.getAccessToken();
    let headers = {"Authorization":`Bearer ${accessToken}`};
    let userID;
    let playlistID;
    if (playlistName && trackURIs) {
      return fetch('https://api.spotify.com/v1/me', {headers: headers}).then(response => {
        return response.json()
      }).then(jsonResponse => {
        userID = jsonResponse.id;
      }).then(() => {
        return fetch(`https://api.spotify.com/v1/users/${userID}/playlists`,{
          method:'POST',
          headers:{
            "Authorization":'Bearer '+accessToken,
            "Content-Type": 'application/json'
          },
          body:JSON.stringify({name:playlistName})
        })
      }).then(response => {
        return response.json();
      }).then(jsonResponse => {
        playlistID = jsonResponse.id;
      }).then(() => {
        return fetch(`https://api.spotify.com/v1/users/${userID}/playlists/${playlistID}/tracks`,{
          method:'POST',
          headers:{
            "Authorization":`Bearer ${accessToken}`,
            "Content-Type": 'application/json'
          },
          body:JSON.stringify({'uris':trackURIs})
        })
      }).then(response => {
        return response.json();
      }).then(jsonResponse => {
        playlistID = jsonResponse.id;
    })} else {return;}
  }

};

export default Spotify;
