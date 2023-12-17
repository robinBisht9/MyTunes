import { ThreeDots } from "react-loader-spinner";
import { useFetch } from "../hooks/useFetch";
import { useSelector } from "react-redux";
import { BASE_URL_YOUTUBE } from "../baseUrl";
import { PlaylistCard } from "./Cards/PlaylistCard";

const YoutubePlaylistCollections = () => {
  const youtubeToken = useSelector((state) => state.youtube.token);
  const { data, loading, error } = useFetch(
    "/playlists?part=snippet,contentDetails&mine=true",
    youtubeToken,
    BASE_URL_YOUTUBE
  );

  console.log(data);
  const handleAddingToSpotify = (id) => {
    console.log(id);
  };

  return (
    <div>
      <h6 className="display-6 text-center text-decoration-underline">
        Your Youtube Playlist
      </h6>
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
            <div>Error Occured</div>
          ) : (
            <>
              <div className="d-flex justify-content-around mt-4">
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
              </div>
            </>
          )}
        </>
      )}
      <div className="mt-3 border-bottom"></div>
    </div>
  );
};

export default YoutubePlaylistCollections;
