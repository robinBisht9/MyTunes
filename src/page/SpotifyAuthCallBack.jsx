import { useEffect } from "react";
import { useDispatch } from "react-redux";

import { spotifyAuthSlice } from "../store/slices";
import { useNavigate } from "react-router-dom";

const SpotifyAuthCallBack = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const getTokenFromUrl = () => {
      const locationHash = window.location.hash;
      const params = new URLSearchParams(locationHash.substring(1));
      return [params.get("access_token"), params.get("expires_in")];
    };
    const spotifyAccessToken = getTokenFromUrl();
    const tokenValue = {
      token: spotifyAccessToken[0],
      expiry: new Date().getTime() + spotifyAccessToken[1] * 1000,
    };
    dispatch(spotifyAuthSlice.actions.setToken(tokenValue));

    navigate("/");
  }, [dispatch, navigate]);

  return <div>Spotify Auth CallBack</div>;
};

export default SpotifyAuthCallBack;
