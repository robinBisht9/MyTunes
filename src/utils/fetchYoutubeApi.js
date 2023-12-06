import axios from "axios";
import { YOUTUBE_ACCESS_TOKEN } from "../constants";

const BASE_URL = "https://www.googleapis.com/youtube/v3";

export const fetchDataFromYoutubeApi = async (url) => {
  const youtubeToken = localStorage.getItem(YOUTUBE_ACCESS_TOKEN);

  const headers = {
    Authorization: "Bearer " + youtubeToken,
  };
  try {
    const { data } = await axios.get(BASE_URL + url, {
      headers: headers,
    });

    return data;
  } catch (error) {
    throw new Error(error.response);
  }
};
