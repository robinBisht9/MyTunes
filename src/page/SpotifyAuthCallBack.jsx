import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { spotifyAuthSlice as spotifySlice } from "../store/slices";
import { useNavigate } from "react-router-dom";
import { SPOTIFY_ACCESS_TOKEN } from "../constants";

const SpotifyAuthCallBack = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const getAccessTokenFromUrl = () => {
      const hash = window.location.hash.substring(1);
      const params = new URLSearchParams(hash);
      return params.get("access_token");
    };
    const accessToken = getAccessTokenFromUrl();
    localStorage.setItem(SPOTIFY_ACCESS_TOKEN, accessToken);
    dispatch(spotifySlice.actions.setToken(accessToken));
    navigate("/");
  }, [dispatch, navigate]);

  return <div>Spotify Auth CallBack</div>;
};

export default SpotifyAuthCallBack;
