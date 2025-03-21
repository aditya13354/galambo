const isValidYouTubeUrl = (url) => {
  return /^(https?:\/\/)?(www\.)?(m\.)?(youtube\.com|youtu\.be)\/.+$/.test(url);
};
export const isValid = (url) => {
  return isValidYouTubeUrl(url);
};
