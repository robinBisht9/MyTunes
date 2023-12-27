import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useFetch } from "../hooks/useFetch";
import { BASE_URL_SPOTIFY, BASE_URL_YOUTUBE } from "../baseUrl";
import { useSelector } from "react-redux";
import { extractArtistName, normalizeString } from "../utils/helper";
import axios from "axios";
import SongsTable from "../components/SongsTable";

const TransferPlaylistToSpotify = () => {
  const { playlistId } = useParams();
  const navigate = useNavigate();
  const [transfering, setTransfering] = useState(false);
  const [playlistName, setPlaylistName] = useState("");

  const handlePlaylistNameChange = (event) => {
    setPlaylistName(event.target.value);
  };
  const spotifyToken = useSelector((state) => state.spotify.token);
  const youtubeToken = useSelector((state) => state.youtube.token);

  const {
    data: playlistData,
    loading: playlistLoading,
    error: playlistError,
  } = useFetch(
    `/playlists?part=snippet%2CcontentDetails&id=${playlistId}`,
    youtubeToken,
    BASE_URL_YOUTUBE
  );

  const {
    data: videoItems,
    loading: itemsLoading,
    error: itemsError,
  } = useFetch(
    `/playlistItems?part=snippet%2CcontentDetails&playlistId=${playlistId}&maxResults=50`,
    youtubeToken,
    BASE_URL_YOUTUBE
  );

  const tracks = videoItems?.items.map((item) => ({
    id: item?.id,
    title: item?.snippet?.title,
    artist: item?.snippet?.videoOwnerChannelTitle,
  }));

  const handleTransferToSpotify = async () => {
    try {
      setTransfering(true);
      const spotifyPlaylistUrl = BASE_URL_SPOTIFY + "/me/playlists";
      const spotifyPlaylistNameBody = {
        name: playlistName,
        public: false,
      };
      const spotifyPlaylistNameHeader = {
        Authorization: `Bearer ${spotifyToken}`,
      };
      const createPlaylistResponse = await axios.post(
        spotifyPlaylistUrl,
        spotifyPlaylistNameBody,
        { headers: spotifyPlaylistNameHeader }
      );
      const createdPlaylistId = createPlaylistResponse.data.id;

      for (let item of videoItems.items) {
        const searchResponse = await axios.get(`${BASE_URL_SPOTIFY}/search`, {
          headers: spotifyPlaylistNameHeader,
          params: {
            q: `${normalizeString(item.snippet.title)} ${normalizeString(
              item.snippet.videoOwnerChannelTitle
            )}`,
            type: "track",
          },
        });

        const responseVideoId = searchResponse?.data?.tracks?.items[0]?.uri;

        if (!responseVideoId) {
          continue;
        }
        await axios.post(
          `${BASE_URL_SPOTIFY}/playlists/${createdPlaylistId}/tracks`,
          { uris: [searchResponse?.data?.tracks?.items[0]?.uri] },
          {
            headers: {
              Authorization: `Bearer ${spotifyToken}`,
              "Content-Type": "application/json",
            },
          }
        );
      }
    } catch (error) {
      console.log(error);
    } finally {
      navigate("/");
    }
  };

  return (
    <SongsTable
      transfering={transfering}
      playlistLoading={playlistLoading}
      imageUrl={playlistData?.items[0]?.snippet?.thumbnails?.default?.url}
      playlistTitle={playlistData?.items[0]?.snippet?.title}
      tracks={tracks}
      duration={false}
      playlistName={playlistName}
      handlePlaylistNameChange={handlePlaylistNameChange}
      handleTransfer={handleTransferToSpotify}
    />
  );
};

export default TransferPlaylistToSpotify;
