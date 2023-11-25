import SpotifyAuth from "./SpotifyAuth";

const NavbarComponent = () => {
  return (
    <nav
      className="navbar navbar-expand-lg navbar-light mb-3 border-bottom "
      data-bs-theme="dark"
    >
      <ul className="w-100 navbar-nav d-flex justify-content-around">
        <li className="nav-item">
          <SpotifyAuth />
        </li>
        <li className="nav-item">
          <a className="btn btn-outline-danger me-3" href="/login/youtube">
            <i className="bi bi-youtube"></i> Login via YouTube
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default NavbarComponent;
