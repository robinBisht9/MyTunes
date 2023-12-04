import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";

export const useFetch = (url, fetchFunction, authSlice, authConstants) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(null);
  const [error, setError] = useState(null);

  const refreshToken = localStorage.getItem(authConstants.REFRESH_TOKEN);
  const tokenExpireTime = parseInt(
    localStorage.getItem(authConstants.TOKEN_EXPIRE_TIME),
    10
  );

  const dispatch = useDispatch();

  useEffect(() => {
    const abortController = new AbortController();

    const isTokenExpired = () => {
      const currentTime = new Date().getTime();
      return tokenExpireTime && currentTime >= tokenExpireTime;
    };

    const refreshTokenFunction = async () => {
      try {
        const response = await axios.post(
          authConstants.TOKEN_URL,
          new URLSearchParams({
            grant_type: "refresh_token",
            refresh_token: refreshToken,
            client_id: authConstants.CLIENT_ID,
            client_secret: authConstants.CLIENT_SECRET,
          }),
          {
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
            },
          }
        );

        const newAccessToken = response.data.access_token;
        const expiresIn = response.data.expires_in;
        const newExpireTime = new Date().getTime() + expiresIn * 1000;

        localStorage.setItem(authConstants.ACCESS_TOKEN, newAccessToken);
        localStorage.setItem(authConstants.TOKEN_EXPIRE_TIME, newExpireTime);
        dispatch(authSlice.actions.setToken(newAccessToken));
      } catch (error) {
        console.log("Error is useFetch refresh token");
        setError(error.response.data);
      }
    };

    const fetchData = async () => {
      setLoading(true);
      setData(null);
      setError(null);

      try {
        if (isTokenExpired()) {
          await refreshTokenFunction();
        }

        const res = await fetchFunction(url);

        setError(null);
        setData(res);
      } catch (error) {
        console.log("Error in useFetch fetchData");

        setError(error.response.data);
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    return () => abortController.abort();
  }, [dispatch, fetchFunction, refreshToken]);

  return { data, loading, error };
};
