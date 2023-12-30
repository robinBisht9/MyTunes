import { useDispatch, useSelector } from "react-redux";
import { spotifyAuthUrl } from "../utils/spotifyAuthorization";
import { spotifyAuthSlice as spotifySlice } from "../store/slices";

const SpotifyAuth = () => {
  const handleLogin = () => {
    window.location.href = spotifyAuthUrl;
  };
  const dispatch = useDispatch();
  const access_token = useSelector((state) => state.spotify.token);
  const handleLogout = () => {
    dispatch(spotifySlice.actions.logout());
  };
  return (
    <div className="mx-2">
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
