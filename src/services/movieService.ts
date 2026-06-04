// import api from '@/lib/axios';
// // import { Movie, MovieResponse } from '@/types/movie';

// // TODO: Create service functions to fetch data from TMDB API
// // Reference: https://developer.themoviedb.org/reference/intro/getting-started

// export const movieService = {
//   // TODO: Implement getPopularMovies function
//   // Endpoint: GET /movie/popular

//   // TODO: Implement getNowPlayingMovies function
//   // Endpoint: GET /movie/now_playing

//   // TODO: Implement getMovieDetails function
//   // Endpoint: GET /movie/{movie_id}

//   // TODO: Implement searchMovies function
//   // Endpoint: GET /search/movie

//   // TODO: Add more endpoints as needed
// };

import axios from 'axios';

const api = axios.create({
  baseURL: 'https://api.themoviedb.org/3',
  params: {
    api_key: import.meta.env.VITE_TMDB_API_KEY,
  },
});

export const movieService = {
  getPopularMovies: () => api.get('/movie/popular'),

  getMovieDetail: (id: number) => api.get(`/movie/${id}`),

  getSimilarMovies(id: number) {
    return api.get(`/movie/${id}/similar`);
  },

  
};


export const getMovieCredits = async (id: number) => {
  const response = await api.get(`/movie/${id}/credits`);

  return response.data;
};



export const getMovieVideos = async (movieId: number) => {
  const response = await api.get(`/movie/${movieId}/videos`);

  return response.data;
};

