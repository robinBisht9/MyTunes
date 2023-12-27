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
