import { useSelector } from "react-redux";
import Introduction from "./Introduction";

const MainBody = () => {
  const spotifyAccessToken = useSelector((state) => state.spotify.token);

  return (
    <>
      {spotifyAccessToken && <Introduction />}
      {!spotifyAccessToken && <div>Awaiting authorization</div>}
    </>
  );
};

export default MainBody;
