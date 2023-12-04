import { useFetch } from "../hooks/useFetch";
import { fetchDataFromSpotifyApi } from "../utils/fetchSpotifyApi";

const YoutubePlaylistCollections = () => {
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

export default YoutubePlaylistCollections;
