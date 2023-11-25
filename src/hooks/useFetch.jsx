import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { spotifyAuthSlice } from "../store/slices";
import {
  AUTH_TOKEN_URL,
  CLIENT_ID,
  CLIENT_SECRET_ID,
} from "../utils/spotifyAuthorization";
import {
  SPOTIFY_ACCESS_TOKEN,
  SPOTIFY_ACCESS_TOKEN_EXPIRE_TIME,
  SPOTIFY_REFRESH_TOKEN,
} from "../constants";
import axios from "axios";

export const useFetch = (url, fetchFunction) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(null);
  const [error, setError] = useState(null);
  const refreshTokenOriginal = localStorage.getItem(SPOTIFY_REFRESH_TOKEN);
  const tokenTime = parseInt(
    localStorage.getItem(SPOTIFY_ACCESS_TOKEN_EXPIRE_TIME),
    10
  );
  const dispatch = useDispatch();

  useEffect(() => {
    const abortController = new AbortController();
    const isSpotifyTokenExpired = () => {
      const currTime = new Date().getTime();
      return tokenTime && currTime >= tokenTime;
    };
    const refreshSpotifyAccessToken = async () => {
      try {
        const response = await axios.post(
          AUTH_TOKEN_URL,
          new URLSearchParams({
            grant_type: "refresh_token",
            refresh_token: refreshTokenOriginal,
            client_id: CLIENT_ID,
            client_secret: CLIENT_SECRET_ID,
          }),
          {
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
            },
          }
        );
        const accessToken = response.data.access_token;
        const expiresIn = response.data.expires_in;
        const expirationTime = new Date().getTime() + expiresIn * 1000;

        dispatch(spotifyAuthSlice.actions.setToken(accessToken));

        localStorage.setItem(SPOTIFY_ACCESS_TOKEN, accessToken);
        localStorage.setItem(SPOTIFY_ACCESS_TOKEN_EXPIRE_TIME, expirationTime);
      } catch (error) {
        setError(error.response.data);
      }
    };
    const fetchData = async () => {
      setLoading(true);
      setData(null);
      setError(null);
      try {
        if (isSpotifyTokenExpired()) await refreshSpotifyAccessToken();
        const res = await fetchFunction(url);
        setLoading(false);
        setData(res);
      } catch (error) {
        setLoading(false);
        setError(error.response.data);
      }
    };

    fetchData();

    return () => abortController.abort();
  }, [dispatch, fetchFunction, refreshTokenOriginal]);
  return { data, loading, error };
};
