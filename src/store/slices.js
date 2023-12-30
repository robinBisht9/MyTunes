import { createSlice } from "@reduxjs/toolkit";

const createAuthSlice = (serviceName) => {
  const initialState = {
    token: null,
    user: null,
    expiry: null,
  };

  const authSlice = createSlice({
    name: `${serviceName}Auth`,
    initialState,
    reducers: {
      setToken: (state, action) => {
        state.token = action.payload.token;
        state.expiry = action.payload.expiry;
      },
      setUser: (state, action) => {
        state.user = action.payload;
      },
      logout: (state) => {
        state.token = null;
        state.expiry = null;
      },
    },
  });

  return authSlice;
};

export const spotifyAuthSlice = createAuthSlice("Spotify");
export const youtubeAuthSlice = createAuthSlice("YouTube");
