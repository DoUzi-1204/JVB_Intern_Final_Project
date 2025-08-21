export async function fetchMovieDetails(id, language = "en-US") {
  // Thay YOUR_API_KEY bằng api key của bạn
  const res = await fetch(
    `https://api.themoviedb.org/3/movie/${id}?api_key=YOUR_API_KEY&append_to_response=release_dates&language=${language}`
  );
  return await res.json();
}

export async function fetchTvDetails(id, language = "en-US") {
  // Thay YOUR_API_KEY bằng api key của bạn
  const res = await fetch(
    `https://api.themoviedb.org/3/tv/${id}?api_key=YOUR_API_KEY&append_to_response=content_ratings&language=${language}`
  );
  return await res.json();
}