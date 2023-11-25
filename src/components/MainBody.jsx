import { useSelector } from "react-redux";

import SpotifyPlaylistCollections from "./SpotifyPlaylistCollections";

const MainBody = () => {
  const spotifyAccessToken = useSelector((state) => state.spotify.token);

  return (
    <>
      {spotifyAccessToken ? (
        <SpotifyPlaylistCollections />
      ) : (
        <div>Awaiting authorization</div>
      )}
    </>
  );
};

export default MainBody;
