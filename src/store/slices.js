import { createSlice } from "@reduxjs/toolkit";

const createAuthSlice = (serviceName) => {
  const initialState = {
    token: null,
    user: null,
  };

  const authSlice = createSlice({
    name: `${serviceName}Auth`,
    initialState,
    reducers: {
      setToken: (state, action) => {
        state.token = action.payload;
      },
      setUser: (state, action) => {
        state.user = action.payload;
      },
    },
  });

  return authSlice;
};

export const spotifyAuthSlice = createAuthSlice("Spotify");
export const youtubeAuthSlice = createAuthSlice("YouTube");
