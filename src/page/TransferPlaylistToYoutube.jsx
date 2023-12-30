import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useFetch } from "../hooks/useFetch";
import { BASE_URL_SPOTIFY, BASE_URL_YOUTUBE } from "../baseUrl";
import { useSelector } from "react-redux";
import axios from "axios";
import { getTimeInMinutesAndSeconds } from "../utils/helper";
import SongsTable from "../components/SongsTable";
import ErrorPage from "./ErrorPage";

const TransferPlaylistToYoutube = () => {
  const { playlistId } = useParams();
  const navigate = useNavigate();
  const [transfering, setTransfering] = useState(false);
  const [playlistName, setPlaylistName] = useState("");
  const handlePlaylistNameChange = (event) => {
    setPlaylistName(event.target.value);
  };
  const spotifyToken = useSelector((state) => state.spotify.token);
  const youtubeToken = useSelector((state) => state.youtube.token);

  const handleTransferToYoutube = async () => {
    try {
      setTransfering(true);
      const youtubePlaylistUrl = BASE_URL_YOUTUBE + "/playlists?part=snippet";
      const youtubePlaylistNameBody = {
        snippet: {
          title: playlistName,
        },
      };
      const youtubePlaylistNameHeader = {
        Authorization: `Bearer ${youtubeToken}`,
      };
      const createPlaylistResponse = await axios.post(
        youtubePlaylistUrl,
        youtubePlaylistNameBody,
        { headers: youtubePlaylistNameHeader }
      );

      const createdPlaylistId = createPlaylistResponse.data.id;

      for (let item of data.tracks.items) {
        const encodedComp = encodeURIComponent(
          `${item.track.name} ${item.track.artists.reduce(
            (acc, val) => acc + val.name + " ",
            ""
          )}`
        );
        const searchResponse = await axios.get(
          `${BASE_URL_YOUTUBE}/search?part=snippet&q=${encodedComp}&type=video`,
          {
            headers: youtubePlaylistNameHeader,
          }
        );
        const responseVideoId = searchResponse.data.items[0]?.id.videoId;
        if (!responseVideoId) {
          continue;
        }

        await axios.post(
          `${BASE_URL_YOUTUBE}/playlistItems?part=snippet`,
          {
            snippet: {
              playlistId: createdPlaylistId,
              resourceId: {
                kind: "youtube#video",
                videoId: responseVideoId,
              },
            },
          },
          {
            headers: youtubePlaylistNameHeader,
          }
        );
      }
    } catch (error) {
      navigate("/error");
    }
    navigate("/");
  };

  const { data, loading, error } = useFetch(
    `/playlists/${playlistId}`,
    spotifyToken,
    BASE_URL_SPOTIFY
  );

  const tracks = data?.tracks?.items?.map((item) => ({
    id: item?.track?.id,
    title: item?.track?.name,
    artist: item?.track?.artists[0]?.name,
    duration: getTimeInMinutesAndSeconds(item.track.duration_ms),
  }));

  return (
    <>
      {error.error ? (
        <ErrorPage errorMessage={error.data} />
      ) : (
        <SongsTable
          transfering={transfering}
          playlistLoading={loading}
          imageUrl={data?.images[0]?.url}
          playlistTitle={data?.name}
          tracks={tracks}
          duration={true}
          playlistName={playlistName}
          handlePlaylistNameChange={handlePlaylistNameChange}
          handleTransfer={handleTransferToYoutube}
        />
      )}
    </>
  );
};

export default TransferPlaylistToYoutube;
