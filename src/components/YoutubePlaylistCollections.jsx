import { ThreeDots } from "react-loader-spinner";
import { useFetch } from "../hooks/useFetch";
import { useSelector } from "react-redux";
import { BASE_URL_YOUTUBE } from "../baseUrl";
import { PlaylistCard } from "./Cards/PlaylistCard";
import { useNavigate } from "react-router-dom";
import Carousel from "react-multi-carousel";
import { responsive } from "../utils/helper";
import ErrorPage from "../page/ErrorPage";

const YoutubePlaylistCollections = () => {
  const youtubeToken = useSelector((state) => state.youtube.token);
  const navigate = useNavigate();
  const { data, loading, error } = useFetch(
    "/playlists?part=snippet,contentDetails&mine=true",
    youtubeToken,
    BASE_URL_YOUTUBE
  );

  console.log(data);
  const handleAddingToSpotify = (id) => {
    navigate(`/add-to-spotify/${id}`);
  };

  return (
    <div className="mt-4 border-bottom-playlist ">
      <h3 className=" text-center bg-body-tertiary py-3">
        Your Youtube Playlist
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
                    key={item.id}
                    name={item.snippet.title}
                    count={item.contentDetails.itemCount}
                    image={item.snippet.thumbnails?.default?.url}
                    addTo="Spotify"
                    handleTransfer={handleAddingToSpotify}
                    id={item.id}
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

export default YoutubePlaylistCollections;
