import { useEffect } from "react";
//function to translate the API's numbered genres into text
function GenreMap(genre) {
  const genres = ["Rock", "Blues", "Jazz", "Metal"];
  return genres[genre] || "Unknown genre";
}
export default GenreMap;
