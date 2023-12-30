export const CLIENT_ID_YOUTUBE =
  "868538738178-9hddplk2kpc8of8lqbrhgeeg8nrs7nf6.apps.googleusercontent.com";
export const CLIENT_SECRET_ID_YOUTUBE = "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";

export const AUTH_URL_YOUTUBE = "https://accounts.google.com/o/oauth2/v2/auth";

const scopes =
  "https://www.googleapis.com/auth/youtube https://www.googleapis.com/auth/youtubepartner";

export const youtubeAuthUrl = `${AUTH_URL_YOUTUBE}?
client_id=${CLIENT_ID_YOUTUBE}&
redirect_uri=${import.meta.env.VITE_YOUTUBE_CALLBACK_URL}&
scope=${encodeURIComponent(scopes)}&
response_type=token&
include_granted_scopes=true&
state='state_parameter_passthrough_value'`;
