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
