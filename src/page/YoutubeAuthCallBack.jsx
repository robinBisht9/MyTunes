import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { youtubeAuthSlice } from "../store/slices";
import { useNavigate } from "react-router-dom";

const YoutubeAuthCallBack = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const getTokenFromUrl = () => {
      const locationHash = window.location.hash;
      const params = new URLSearchParams(locationHash.substring(1));
      return [params.get("access_token"), params.get("expires_in")];
    };

    const youtubeAccessToken = getTokenFromUrl();
    const tokenValue = {
      token: youtubeAccessToken[0],
      expiry: new Date().getTime() + youtubeAccessToken[1] * 1000,
    };
    dispatch(youtubeAuthSlice.actions.setToken(tokenValue));

    navigate("/");
  }, [dispatch, navigate]);

  return <div>Youtube Auth CallBack</div>;
};

export default YoutubeAuthCallBack;
