import { useSelector } from "react-redux";
import { useFetch } from "../hooks/useFetch";
import { ThreeDots } from "react-loader-spinner";
import { BASE_URL_SPOTIFY } from "../baseUrl";
import { PlaylistCard } from "./Cards/PlaylistCard";
import { useNavigate } from "react-router-dom";
import Carousel from "react-multi-carousel";
import { responsive } from "../utils/helper";
import ErrorPage from "../page/ErrorPage";

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
    <div className="mt-4 border-bottom-playlist">
      <h3 className=" text-center bg-body-tertiary py-3">
        Your Spotify Playlist
      </h3>

      {loading ? (
        <div className="d-flex mt-4 justify-content-center">
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
        </div>
      ) : (
        <>
          {error.error ? (
            <ErrorPage errorMessage={error.data} />
          ) : (
            <Carousel
              responsive={responsive}
              containerClass="carousel-container"
            >
              {data?.items?.map((item) => {
                return (
                  <PlaylistCard
                    name={item.name}
                    count={item.tracks.total}
                    addTo="Youtube"
                    handleTransfer={handleAddingToYoutube}
                    image={item.images[0]?.url}
                    id={item.id}
                    key={item.name}
                  />
                );
              })}
            </Carousel>
          )}
        </>
      )}
      <div className="mt-3 border-bottom"></div>
    </div>
  );
};

export default SpotifyPlaylistCollections;
