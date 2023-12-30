import { Link } from "react-router-dom";
import SpotifyAuth from "./SpotifyAuth";
import YoutubeAuth from "./YoutubeAuth";

const NavbarComponent = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light  border-bottom">
      <div className="container">
        <Link to="/" style={{ color: "inherit", textDecoration: "inherit" }}>
          <div className="d-flex me-2">
            <img
              src="/youtube-music-to-spotify.jpg"
              height="34"
              alt="MDB Logo"
              loading="lazy"
              style={{ marginTop: "-1px" }}
            />
            <h4 className="px-2">MyTunes</h4>
          </div>
        </Link>

        <div className="collapse navbar-collapse">
          <div className="d-flex ms-auto">
            <SpotifyAuth />
            <YoutubeAuth />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavbarComponent;
