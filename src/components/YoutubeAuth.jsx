import { useDispatch, useSelector } from "react-redux";
import { youtubeAuthUrl } from "../utils/youtubeAuthorization";

import { youtubeAuthSlice } from "../store/slices";

const YoutubeAuth = () => {
  const handleLogin = () => {
    window.location.href = youtubeAuthUrl;
  };
  const dispatch = useDispatch();
  const access_token = useSelector((state) => state.youtube.token);
  const handleLogout = () => {
    dispatch(youtubeAuthSlice.actions.logout());
  };
  return (
    <div>
      {access_token ? (
        <button onClick={handleLogout} className="btn btn-outline-danger">
          <i className="bi bi-youtube"></i> Youtube Logout
        </button>
      ) : (
        <button onClick={handleLogin} className="btn btn-outline-danger">
          <i className="bi bi-youtube"></i> Login via Youtube
        </button>
      )}
    </div>
  );
};

export default YoutubeAuth;
