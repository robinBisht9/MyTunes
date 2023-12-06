import { useSelector } from "react-redux";

import SpotifyPlaylistCollections from "./SpotifyPlaylistCollections";
import YoutubePlaylistCollections from "./YoutubePlaylistCollections";

const MainBody = () => {
  const spotifyAccessToken = useSelector((state) => state.spotify.token);
  const youtubeAccessToken = useSelector((state) => state.youtube.token);

  return (
    <>
      {!(youtubeAccessToken || spotifyAccessToken) && (
        <div>Awaiting Authorization</div>
      )}
      {spotifyAccessToken && <SpotifyPlaylistCollections />}
      {youtubeAccessToken && <YoutubePlaylistCollections />}
    </>
  );
};

export default MainBody;
