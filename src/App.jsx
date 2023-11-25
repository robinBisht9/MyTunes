import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-icons/font/bootstrap-icons.css";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./page/HomePage";
import SpotifyAuthCallBack from "./page/SpotifyAuthCallBack";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/spotifyCallback" element={<SpotifyAuthCallBack />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
