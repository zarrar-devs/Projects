export const formatDate = (date) => {
  if (!date) return null;

  const dateObj = new Date(date);
  const formattedDate = dateObj
    .toLocaleDateString("en-GB", {
      day: "numeric",
      month: "short",
      year: "numeric",
    })
    .replace(/ /g, "-");

  return formattedDate;
};
