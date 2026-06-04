import { useQuery } from '@tanstack/react-query';
import { movieService } from '@/services/movieService';

export function useSimilarMovies(id: number) {
  return useQuery({
    queryKey: ['similarMovies', id],
    queryFn: async () => {
      const response = await movieService.getSimilarMovies(id);
      return response.data.results;
    },
    enabled: !!id,
  });
}
