export const CLIENT_ID = "41d0e0e9bff84790b27d66a016337964";
export const CLIENT_SECRET_ID = "447623795a8249119de35d07f390e513";
export const AUTH_URL = "https://accounts.spotify.com/authorize";
export const AUTH_TOKEN_URL = "https://accounts.spotify.com/api/token";

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
&redirect_uri=${import.meta.env.VITE_SPOTIFY_CALLBACK_URL}
&response_type=token
&scope=${scopes.join("%20")}`;
