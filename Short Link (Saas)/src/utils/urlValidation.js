export const isValidUrl = (url) => {
  if (!url || !url.trim()) return false;

  const verifiedUrl = url.trim();
  const formattedUrl =
    verifiedUrl.startsWith("http://") || verifiedUrl.startsWith("https://")
      ? verifiedUrl
      : `https://${verifiedUrl}`;

  try {
    const parsedUrl = new URL(formattedUrl);

    const parts = parsedUrl.hostname.split(".");

    if (parts.some((part) => part.length === 0)) {
      return false;
    }

    if (parsedUrl.protocol !== "http:" && parsedUrl.protocol !== "https:") {
      return false;
    }

    if (!parsedUrl.hostname.includes(".")) return false;

    return true;
  } catch {
    return false;
  }
};
