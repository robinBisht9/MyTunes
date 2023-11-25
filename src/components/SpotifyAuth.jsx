import { useDispatch, useSelector } from "react-redux";
import { spotifyAuthUrl } from "../utils/spotifyAuthorization";
import { spotifyAuthSlice as spotifySlice } from "../store/slices";
import {
  SPOTIFY_ACCESS_TOKEN,
  SPOTIFY_ACCESS_TOKEN_EXPIRE_TIME,
  SPOTIFY_REFRESH_TOKEN,
} from "../constants";

const SpotifyAuth = () => {
  const handleLogin = () => {
    window.location.href = spotifyAuthUrl;
  };
  const dispatch = useDispatch();
  const access_token = useSelector((state) => state.spotify.token);
  const handleLogout = () => {
    dispatch(spotifySlice.actions.logout());
    localStorage.removeItem(SPOTIFY_ACCESS_TOKEN);
    localStorage.removeItem(SPOTIFY_REFRESH_TOKEN);
    localStorage.removeItem(SPOTIFY_ACCESS_TOKEN_EXPIRE_TIME);
  };
  return (
    <div>
      {access_token ? (
        <button onClick={handleLogout} className="btn btn-outline-success">
          <i className="bi bi-spotify"></i> Spotify Logout
        </button>
      ) : (
        <button onClick={handleLogin} className="btn btn-outline-success">
          <i className="bi bi-spotify"></i> Login via Spotify
        </button>
      )}
    </div>
  );
};

export default SpotifyAuth;
