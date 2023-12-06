import { useEffect } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import {
  spotifyAuthSlice as spotifySlice,
  youtubeAuthSlice,
} from "../store/slices";
import { useNavigate } from "react-router-dom";
import {
  YOUTUBE_ACCESS_TOKEN,
  YOUTUBE_REFRESH_TOKEN,
  YOUTUBE_ACCESS_TOKEN_EXPIRE_TIME,
} from "../constants";

import {
  REDIRECT_URI_YOUTUBE,
  CLIENT_ID_YOUTUBE,
  CLIENT_SECRET_ID_YOUTUBE,
  AUTH_URL_YOUTUBE,
} from "../utils/youtubeAuthorization";

const YoutubeAuthCallBack = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const getTokenFromUrl = () => {
      const locationHash = window.location.hash;
      const params = new URLSearchParams(locationHash.substring(1));
      return params.get("access_token");
    };
    const youtubeAccessToken = getTokenFromUrl();
    dispatch(youtubeAuthSlice.actions.setToken(youtubeAccessToken));
    localStorage.setItem(YOUTUBE_ACCESS_TOKEN, youtubeAccessToken);

    navigate("/");
  }, [dispatch, navigate]);

  return <div>Youtube Auth CallBack</div>;
};

export default YoutubeAuthCallBack;
