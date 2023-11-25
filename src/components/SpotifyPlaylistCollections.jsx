import { useFetch } from "../hooks/useFetch";
import { fetchDataFromSpotifyApi } from "../utils/fetchSpotifyApi";

const SpotifyPlaylistCollections = () => {
  const { data, loading, error } = useFetch(
    "/me/playlists",
    fetchDataFromSpotifyApi
  );

  console.log(data);

  return (
    <div>
      <h6 className="display-6 text-center text-decoration-underline">
        Your Spotify Playlist
      </h6>
      {loading && !error && <div>Loading</div>}
      {error && <div>Error Occured</div>}
      {!loading && !error && (
        <div className="row">
          {data?.items?.map((item) => {
            return (
              <div
                className="card col-auto"
                style={{ width: "18rem" }}
                key={item.name}
              >
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
