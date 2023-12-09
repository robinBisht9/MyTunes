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

  return (
    <div>
      <h6 className="display-6 text-center text-decoration-underline">
        Your Youtube Playlist
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
                key={item.id}
                name={item.snippet.title}
                count={item.contentDetails.itemCount}
                image={item.snippet.thumbnails.maxres.url}
              />
            );
          })}
        </div>
      )}

      <div className="mt-3 border-bottom"></div>
    </div>
  );
};

export default YoutubePlaylistCollections;
