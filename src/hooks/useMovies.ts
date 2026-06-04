// import { useQuery } from '@tanstack/react-query';
// // import { movieService } from '@/services/movieService';

// // TODO: Create custom hooks using React Query
// // Reference: https://tanstack.com/query/latest/docs/framework/react/overview

// // Example: Hook to fetch popular movies
// export const usePopularMovies = () => {
//   // TODO: Implement useQuery hook
//   // Hint: Use movieService.getPopularMovies as queryFn
//   return useQuery({
//     queryKey: ['movies', 'popular'],
//     queryFn: () => {
//       // TODO: Call your movie service function
//       throw new Error('Not implemented');
//     },
//   });
// };

// // TODO: Add more hooks for different endpoints
// // Examples: useMovieDetails, useSearchMovies, useNowPlayingMovies

import { useQuery } from '@tanstack/react-query';
import { movieService } from '@/services/movieService';

export const usePopularMovies = () => {
  return useQuery({
    queryKey: ['popularMovies'],

    queryFn: async () => {
      const response = await movieService.getPopularMovies();
      return response.data.results;
    },
  });
};