import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useFetch } from "../hooks/useFetch";
import { BASE_URL_SPOTIFY, BASE_URL_YOUTUBE } from "../baseUrl";
import { useSelector } from "react-redux";
import axios from "axios";

const getTimeInMinutesAndSeconds = (duration) => {
  const seconds = Math.floor((duration / 1000) % 60);
  const minutes = Math.floor((duration / 1000 / 60) % 60);

  return [
    minutes.toString().padStart(2, "0"),
    seconds.toString().padStart(2, "0"),
  ].join(":");
};

const TransferPlaylistToYoutube = () => {
  const { playlistId } = useParams();
  const navigate = useNavigate();
  const [playlistName, setPlaylistName] = useState("");
  const handlePlaylistNameChange = (event) => {
    setPlaylistName(event.target.value);
  };
  const spotifyToken = useSelector((state) => state.spotify.token);
  const youtubeToken = useSelector((state) => state.youtube.token);

  const handleTransferToYoutube = async () => {
    try {
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
        const searchResponse = await axios.get(
          `${BASE_URL_YOUTUBE}/search?part=snippet&q=${encodeURIComponent(
            `${item.track.name} ${item.track.artists[0].name}`
          )}&type=video`,
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

      console.log("Playlist Created Successfully");
    } catch (error) {
      console.log(error);
      console.log("Error Creating Playlist");
    } finally {
      navigate("/");
    }
  };

  const { data, loading, error } = useFetch(
    `/playlists/${playlistId}`,
    spotifyToken,
    BASE_URL_SPOTIFY
  );

  return (
    <div className="container">
      <div>
        <div className="d-flex mb-3 mt-4 justify-content-start">
          <img
            src={data?.images[0]?.url}
            className="playlist-image"
            alt="Playlist cover"
          />
          <h5 className="display-6 ms-5">
            <em>Playlist Name</em> : {data?.name}
          </h5>
        </div>
        <div className="card mb-4">
          <div className="card-body">
            <table className="table table-striped table-hover">
              <thead className="table-dark darken-3">
                <tr className="text-white">
                  <th>#</th>
                  <th>Title</th>
                  <th>Artist</th>
                  <th>Duration</th>
                </tr>
              </thead>
              <tbody>
                {data?.tracks?.items?.map((item, index) => {
                  return (
                    <tr key={item.track.id}>
                      <th>{index + 1}</th>
                      <td>{item.track.name}</td>
                      <td>{item.track.artists[0].name}</td>
                      <td>
                        {getTimeInMinutesAndSeconds(item.track.duration_ms)}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div>
        <label>
          Enter Playlist Name :
          <input
            type="text"
            value={playlistName}
            onChange={(e) => handlePlaylistNameChange(e)}
          />
          <button className="btn btn-danger" onClick={handleTransferToYoutube}>
            Create Playlist
          </button>
        </label>
      </div>
    </div>
  );
};

export default TransferPlaylistToYoutube;
