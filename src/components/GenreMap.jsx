import { useEffect } from "react";
function GenreMap(genre) {
  const genres = ["Rock", "Blues", "Jazz", "Metal"];
  return genres[genre] || "Unknown genre";
}
export default GenreMap;
