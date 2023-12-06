import { useFetch } from "../hooks/useFetch";
import { fetchDataFromSpotifyApi } from "../utils/fetchSpotifyApi";
import {
  AUTH_TOKEN_URL,
  CLIENT_ID,
  CLIENT_SECRET_ID,
} from "../utils/spotifyAuthorization";
import {
  SPOTIFY_ACCESS_TOKEN,
  SPOTIFY_ACCESS_TOKEN_EXPIRE_TIME,
  SPOTIFY_REFRESH_TOKEN,
} from "../constants";
import { spotifyAuthSlice } from "../store/slices";
import { Puff, ThreeDots } from "react-loader-spinner";

const spotifyAuthConstants = {
  ACCESS_TOKEN: SPOTIFY_ACCESS_TOKEN,
  REFRESH_TOKEN: SPOTIFY_REFRESH_TOKEN,
  TOKEN_EXPIRE_TIME: SPOTIFY_ACCESS_TOKEN_EXPIRE_TIME,
  CLIENT_ID,
  CLIENT_SECRET_ID,
  TOKEN_URL: AUTH_TOKEN_URL,
};

const SpotifyPlaylistCollections = () => {
  const { data, loading, error } = useFetch(
    "/me/playlists",
    fetchDataFromSpotifyApi,
    spotifyAuthSlice,
    spotifyAuthConstants
  );

  console.log(data);

  return (
    <div>
      <h6 className="display-6 text-center text-decoration-underline">
        Your Spotify Playlist
      </h6>
      {loading && !error && (
        <ThreeDots
          height="80"
          width="80"
          radius="9"
          color="#4fa94d"
          ariaLabel="three-dots-loading"
          wrapperStyle={{}}
          wrapperClassName=""
          visible={true}
        />
      )}
      {error && <div>Error Occured</div>}
      {!loading && !error && (
        <div className="d-flex justify-content-around mt-4">
          {data?.items?.map((item) => {
            return (
              <div className="card" key={item.name} style={{ width: "20rem" }}>
                <div className="card-body">
                  <h5 className="card-title">{item.name}</h5>
                  <h6 className="card-subtitle mb-2 text-body-secondary">
                    {item.description}
                  </h6>
                  <a href="#" className="card-link">
                    Card link
                  </a>
                  <a href="#" className="card-link">
                    Another link
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      )}

      <div className="mt-3 border-bottom"></div>
    </div>
  );
};

export default SpotifyPlaylistCollections;
