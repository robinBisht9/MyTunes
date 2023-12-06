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
      console.log(locationHash);
      return params.get("access_token");
    };
    const spotifyAccessToken = getTokenFromUrl();
    dispatch(spotifyAuthSlice.actions.setToken(spotifyAccessToken));

    navigate("/");
  }, [dispatch, navigate]);

  return <div>Spotify Auth CallBack</div>;
};

export default SpotifyAuthCallBack;
