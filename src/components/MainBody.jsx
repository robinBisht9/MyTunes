import { useDispatch, useSelector } from "react-redux";

import SpotifyPlaylistCollections from "./SpotifyPlaylistCollections";
import YoutubePlaylistCollections from "./YoutubePlaylistCollections";
import AwaitingAuthorization from "./AwaitingAuthorization/AwaitingAuthorization";
import { useEffect } from "react";
import { isTokenExpired } from "../utils/helper";
import { spotifyAuthSlice, youtubeAuthSlice } from "../store/slices";

const MainBody = () => {
  const { token: spotifyAccessToken, expiry: spotifyTokenExpiry } = useSelector(
    (state) => state.spotify
  );
  const { token: youtubeAccessToken, expiry: youtubeTokenExpiry } = useSelector(
    (state) => state.youtube
  );

  const dispatch = useDispatch();
  useEffect(() => {
    const handleSpotifyTokenExpired = () => {
      if (isTokenExpired(spotifyTokenExpiry)) {
        dispatch(spotifyAuthSlice.actions.logout());
      }
    };
    const handleYoutubeTokenExpired = () => {
      if (isTokenExpired(youtubeTokenExpiry)) {
        dispatch(youtubeAuthSlice.actions.logout());
      }
    };
    handleSpotifyTokenExpired();
    handleYoutubeTokenExpired();
  });

  return (
    <>
      {!(youtubeAccessToken || spotifyAccessToken) && <AwaitingAuthorization />}
      {spotifyAccessToken && <SpotifyPlaylistCollections />}
      {youtubeAccessToken && <YoutubePlaylistCollections />}
    </>
  );
};

export default MainBody;
