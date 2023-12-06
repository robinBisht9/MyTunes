import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { spotifyAuthSlice, youtubeAuthSlice } from "./slices";
import storage from "redux-persist/lib/storage";
import persistReducer from "redux-persist/es/persistReducer";
import persistStore from "redux-persist/es/persistStore";

const persistConfigYoutube = {
  key: "youtube",
  storage,
};

const persistConfigSpotify = {
  key: "spotify",
  storage,
};

const persistedReducerYoutube = persistReducer(
  persistConfigYoutube,
  youtubeAuthSlice.reducer
);
const persistedReducerSpotify = persistReducer(
  persistConfigSpotify,
  spotifyAuthSlice.reducer
);

const rootReducer = combineReducers({
  youtube: persistedReducerYoutube,
  spotify: persistedReducerSpotify,
});

export const store = configureStore({
  reducer: rootReducer,
});

export const persistor = persistStore(store);
