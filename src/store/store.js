import { configureStore } from "@reduxjs/toolkit";
import { spotifyAuthSlice, youtubeAuthSlice } from "./slices";

export const store = configureStore({
  reducer: {
    spotify: spotifyAuthSlice.reducer,
    youtube: youtubeAuthSlice.reducer,
  },
});
