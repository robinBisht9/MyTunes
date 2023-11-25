import NavbarComponent from "../components/NavbarComponent";
import Header from "../components/Header";
import MainBody from "../components/MainBody";

const HomePage = () => {
  return (
    <div className="container">
      <Header />
      <NavbarComponent />
      <MainBody />
    </div>
  );
};

export default HomePage;
