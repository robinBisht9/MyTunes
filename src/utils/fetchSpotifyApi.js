import axios from "axios";
import { SPOTIFY_ACCESS_TOKEN } from "../constants";

const BASE_URL = "https://api.spotify.com/v1";

export const fetchDataFromSpotifyApi = async (url) => {
  const spotifyToken = localStorage.getItem(SPOTIFY_ACCESS_TOKEN);

  const headers = {
    Authorization: "Bearer " + spotifyToken,
  };
  try {
    const { data } = await axios.get(BASE_URL + url, {
      headers: headers,
    });

    return data;
  } catch (error) {
    console.log(error);
    return error;
  }
};
