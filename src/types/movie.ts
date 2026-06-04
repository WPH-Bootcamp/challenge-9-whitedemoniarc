// // TODO: Define TypeScript interfaces for Movie data
// // Hint: Check TMDB API documentation for the movie object structure
// // https://developer.themoviedb.org/reference/movie-details

// export interface Movie {
//   // TODO: Add movie properties based on TMDB API response
//   // Examples: id, title, overview, poster_path, etc.
// }

// export interface MovieResponse {
//   // TODO: Add pagination properties
//   // Examples: page, results, total_pages, total_results
// }

// // TODO: Add more types as needed (Genre, Video, etc.)

export interface Movie {
  id: number;
  title: string;
  overview: string;
  poster_path: string | null;
  backdrop_path: string | null;
  release_date: string;
  vote_average: number;
}