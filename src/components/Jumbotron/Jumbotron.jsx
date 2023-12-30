import "./style.css";
export const Jumbotron = () => {
  return (
    <div className="container-fluid jumbotron-custom">
      <div className="row d-flex">
        <div className="col align-middle">
          <div className="px-2 py-2">
            <img
              src="spotify_youtube.png"
              className="img-fluid"
              alt="Spotify Youtube Image"
            />
          </div>
        </div>
        <div className="col">
          <div className="px-5 py-5 mt-5">
            <div className="px-2 py-2 align-middle">
              <span>
                {" "}
                <h2>My Tunes</h2> <h4>Transfer Playlists</h4>
              </span>
              <p>
                A web app which lets you transfer your playlist from youtube to
                spotify and vice versa
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
