import { useEffect } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import { spotifyAuthSlice as spotifySlice } from "../store/slices";
import { useNavigate } from "react-router-dom";
import {
  SPOTIFY_ACCESS_TOKEN,
  SPOTIFY_ACCESS_TOKEN_EXPIRE_TIME,
  SPOTIFY_REFRESH_TOKEN,
} from "../constants";

import {
  AUTH_TOKEN_URL,
  CLIENT_ID,
  CLIENT_SECRET_ID,
  REDIRECT_URI,
} from "../utils/spotifyAuthorization";

const SpotifyAuthCallBack = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const getCodeFromUrl = () => {
      const locationSearch = window.location.search;
      const params = new URLSearchParams(locationSearch);
      return params.get("code");
    };
    const exchangeAuthorizationCode = async (authCode) => {
      try {
        const params = new URLSearchParams();
        params.append("grant_type", "authorization_code");
        params.append("code", authCode);
        params.append("redirect_uri", REDIRECT_URI);
        params.append("client_id", CLIENT_ID);
        params.append("client_secret", CLIENT_SECRET_ID);

        const response = await axios.post(AUTH_TOKEN_URL, params, {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        });

        const refreshToken = response.data.refresh_token;
        const accessToken = response.data.access_token;
        const expiresIn = response.data.expires_in;
        const expirationTime = new Date().getTime() + expiresIn * 1000;

        dispatch(spotifySlice.actions.setToken(accessToken));

        localStorage.setItem(SPOTIFY_ACCESS_TOKEN, accessToken);
        localStorage.setItem(SPOTIFY_REFRESH_TOKEN, refreshToken);
        localStorage.setItem(SPOTIFY_ACCESS_TOKEN_EXPIRE_TIME, expirationTime);

        console.log(refreshToken);
      } catch (error) {
        console.log(error.response.data);
        navigate("/");
      }
    };
    const accessCode = getCodeFromUrl();
    if (accessCode) exchangeAuthorizationCode(accessCode);
    navigate("/");
  }, [dispatch, navigate]);

  return <div>Spotify Auth CallBack</div>;
};

export default SpotifyAuthCallBack;
