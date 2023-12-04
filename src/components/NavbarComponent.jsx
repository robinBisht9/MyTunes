import SpotifyAuth from "./SpotifyAuth";
import YoutubeAuth from "./YoutubeAuth";

const NavbarComponent = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light mb-3 border-bottom">
      <ul className="w-100 navbar-nav d-flex justify-content-around">
        <li className="nav-item">
          <SpotifyAuth />
        </li>
        <li className="nav-item">
          <YoutubeAuth />
        </li>
      </ul>
    </nav>
  );
};

export default NavbarComponent;
