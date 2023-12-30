import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./page/HomePage";
import SpotifyAuthCallBack from "./page/SpotifyAuthCallBack";
import YoutubeAuthCallBack from "./page/YoutubeAuthCallBack";
import TransferPlaylistToYoutube from "./page/TransferPlaylistToYoutube";
import TransferPlaylistToSpotify from "./page/TransferPlaylistToSpotify";
import NavbarComponent from "./components/NavbarComponent";
import Footer from "./components/Footer";
import ErrorPage from "./page/ErrorPage";
function App() {
  return (
    <>
      <div className="main">
        <BrowserRouter>
          <NavbarComponent />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/spotifyCallback" element={<SpotifyAuthCallBack />} />
            <Route path="/youtubeCallback" element={<YoutubeAuthCallBack />} />
            <Route path="/error" element={<ErrorPage />} />
            <Route
              path="/add-to-youtube/:playlistId"
              element={<TransferPlaylistToYoutube />}
            />
            <Route
              path="/add-to-spotify/:playlistId"
              element={<TransferPlaylistToSpotify />}
            />
          </Routes>
        </BrowserRouter>
      </div>
      <Footer />
    </>
  );
}

export default App;
