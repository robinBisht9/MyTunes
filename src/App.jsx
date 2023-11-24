import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import NavbarComponent from "./components/NavbarComponent";
import Header from "./components/Header";
import MainBody from "./components/MainBody";

function App() {
  const youtubeLogin = false;
  const spotifyLogin = false;

  return (
    <div className="container">
      <Header />
      <NavbarComponent />
      {youtubeLogin && spotifyLogin && <MainBody />}
    </div>
  );
}

export default App;
