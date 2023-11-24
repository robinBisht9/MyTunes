import { configureStore } from "@reduxjs/toolkit";
import spotifyReducer from "./slices/spotifySlice";
import youtubeReducer from "./slices/youtubeSlice";

export const store = configureStore({
  reducer: {
    spotify: spotifyReducer,
    youtube: youtubeReducer,
  },
});
