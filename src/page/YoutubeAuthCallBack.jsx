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
      return params.get("access_token");
    };
    const youtubeAccessToken = getTokenFromUrl();
    dispatch(youtubeAuthSlice.actions.setToken(youtubeAccessToken));

    navigate("/");
  }, [dispatch, navigate]);

  return <div>Youtube Auth CallBack</div>;
};

export default YoutubeAuthCallBack;
