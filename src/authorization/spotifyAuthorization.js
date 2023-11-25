const CLIENT_ID = "41d0e0e9bff84790b27d66a016337964";
const AUTH_URL = "https://accounts.spotify.com/authorize";
const REDIRECT_URI = "http://localhost:5173/spotifyCallback";

const scopes = [
  "user-read-private",
  "user-read-email",
  "playlist-read-private",
  "playlist-read-collaborative",
  "playlist-modify-private",
  "playlist-modify-public",
];

export const spotifyAuthUrl = `${AUTH_URL}?
client_id=${CLIENT_ID}
&redirect_uri=${REDIRECT_URI}
&response_type=token
&scope=${scopes.join("%20")}`;
