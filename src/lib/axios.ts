// import axios from 'axios';

// // TODO: Create axios instance with base configuration
// // Hint: Use environment variables for API URL and API key
// // Reference: https://axios-http.com/docs/instance

// const api = axios.create({
//   // TODO: Configure baseURL from environment variable
//   // TODO: Add default headers (API key, content-type)
// });

// // TODO: Add request interceptor if needed
// // Hint: You can add API key to every request here

// // TODO: Add response interceptor for error handling

// export default api;

import axios from 'axios';

const api = axios.create({
  baseURL: 'https://api.themoviedb.org/3',
  params: {
    api_key: import.meta.env.VITE_TMDB_API_KEY,
  },
});

export const movieService = {
  getPopularMovies: () => api.get('/movie/popular'),
};