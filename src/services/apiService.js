const BASE_URL = 'https://api.themoviedb.org/3';
const API_KEY = '5898c2a7f8f53a06b245e3feed95846b';

export function getTrending() {
  return fetch(`${BASE_URL}/trending/movie/day?api_key=${API_KEY}`).then(
    response => response.json(),
  );
}

export function searchMovies(query, page = 1) {
  return fetch(
    `${BASE_URL}/search/movie?api_key=${API_KEY}&language=en-US&query=${query}&page=${page}&include_adult=false`,
  ).then(response => response.json());
}

export function getMovieDetails(id) {
  return fetch(
    `${BASE_URL}/movie/${id}?api_key=${API_KEY}&language=en-US`,
  ).then(response => response.json());
}

export function getMovieCredits(id) {
  return fetch(
    `${BASE_URL}/movie/${id}/credits?api_key=${API_KEY}&language=en-US`,
  ).then(response => response.json());
}

export function getMovieReviews(id) {
  return fetch(
    `${BASE_URL}/movie/${id}/reviews?api_key=${API_KEY}&language=en-US&page=1`,
  ).then(response => response.json());
}
