import { useDispatch, useSelector } from "react-redux";
import { spotifyAuthUrl } from "../authorization/spotifyAuthorization";
import { spotifyAuthSlice as spotifySlice } from "../store/slices";
import { SPOTIFY_ACCESS_TOKEN } from "../constants";

const SpotifyAuth = () => {
  const handleLogin = () => {
    window.location.href = spotifyAuthUrl;
  };
  const dispatch = useDispatch();
  const access_token = useSelector((state) => state.spotify.token);
  const handleLogout = () => {
    localStorage.removeItem(SPOTIFY_ACCESS_TOKEN);
    dispatch(spotifySlice.actions.setToken(null));
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
