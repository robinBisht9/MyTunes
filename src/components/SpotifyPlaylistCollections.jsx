import { useSelector } from "react-redux";
import { useFetch } from "../hooks/useFetch";
import { ThreeDots } from "react-loader-spinner";
import { BASE_URL_SPOTIFY } from "../baseUrl";
import { PlaylistCard } from "./Cards/PlaylistCard";
import { useNavigate } from "react-router-dom";

const SpotifyPlaylistCollections = () => {
  const spotifyToken = useSelector((state) => state.spotify.token);
  const navigate = useNavigate();
  const { data, loading, error } = useFetch(
    "/me/playlists",
    spotifyToken,
    BASE_URL_SPOTIFY
  );

  const handleAddingToYoutube = (id) => {
    navigate(`/add-to-youtube/${id}`);
  };

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
              <PlaylistCard
                name={item.name}
                count={item.tracks.total}
                addTo="Youtube"
                handleTransfer={handleAddingToYoutube}
                image={item.images[0].url}
                id={item.id}
                key={item.name}
              />
            );
          })}
        </div>
      )}

      <div className="mt-3 border-bottom"></div>
    </div>
  );
};

export default SpotifyPlaylistCollections;
