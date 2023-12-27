import { CirclesWithBar } from "react-loader-spinner";
import { extractArtistName, getSongName } from "../utils/helper";
const SongsTable = ({
  transfering,
  playlistLoading,
  imageUrl,
  playlistTitle,
  tracks,
  duration,
  playlistName,
  handlePlaylistNameChange,
  handleTransfer,
}) => {
  return (
    <div className="container">
      {transfering || playlistLoading ? (
        <div className="d-flex justify-content-center mt-4">
          <CirclesWithBar
            height="100"
            width="100"
            color="#4fa94d"
            wrapperStyle={{}}
            wrapperClass=""
            visible={true}
            outerCircleColor=""
            innerCircleColor=""
            barColor=""
            ariaLabel="circles-with-bar-loading"
          />
        </div>
      ) : (
        <>
          <div>
            <div className="d-flex mb-3 mt-4 justify-content-start">
              <img
                src={imageUrl}
                className="playlist-image"
                alt="Playlist cover"
              />
              <h5 className="display-6 ms-5">
                <em>Playlist Name</em> : {playlistTitle}
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
                      {duration && <th>Duration</th>}
                    </tr>
                  </thead>
                  <tbody>
                    {tracks &&
                      tracks.map((item, index) => {
                        return (
                          <tr key={item.id}>
                            <th>{index + 1}</th>
                            <td>{getSongName(item.title)}</td>
                            <td>{extractArtistName(item.artist)}</td>
                            {duration && <td>{item.duration}</td>}
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
              <button
                className="btn btn-danger"
                onClick={() => handleTransfer()}
              >
                Create Playlist
              </button>
            </label>
          </div>
        </>
      )}
    </div>
  );
};

export default SongsTable;
