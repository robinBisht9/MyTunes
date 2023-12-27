import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-icons/font/bootstrap-icons.css";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./page/HomePage";
import SpotifyAuthCallBack from "./page/SpotifyAuthCallBack";
import YoutubeAuthCallBack from "./page/YoutubeAuthCallBack";
import TransferPlaylistToYoutube from "./page/TransferPlaylistToYoutube";
import Header from "./components/Header";
import TransferPlaylistToSpotify from "./page/TransferPlaylistToSpotify";
function App() {
  return (
    <>
      <Header />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/spotifyCallback" element={<SpotifyAuthCallBack />} />
          <Route path="/youtubeCallback" element={<YoutubeAuthCallBack />} />
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
    </>
  );
}

export default App;
