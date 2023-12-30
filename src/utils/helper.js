export const getTimeInMinutesAndSeconds = (duration) => {
  const seconds = Math.floor((duration / 1000) % 60);
  const minutes = Math.floor((duration / 1000 / 60) % 60);

  return [
    minutes.toString().padStart(2, "0"),
    seconds.toString().padStart(2, "0"),
  ].join(":");
};

export const extractArtistName = (artistString) => {
  const parts = artistString.split("- Topic");
  return parts[0].trim();
};

export function normalizeString(str) {
  return str
    .toLowerCase()
    .replace(/[^\w\s]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

export function getSongName(title) {
  const cleanedTitle = title.replace(/^-(.+)-| - Topic$/, "$1");
  return cleanedTitle.replace(/\[.+\]/g, "");
}

export const isTokenExpired = (tokenExpiredTime) => {
  return tokenExpiredTime
    ? new Date().getTime() >= parseInt(tokenExpiredTime, 10)
    : true;
};

export const responsive = {
  superLargeDesktop: {
    breakpoint: { max: 4000, min: 3000 },
    items: 4,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 3,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
  },
};
