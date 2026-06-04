import { useQuery } from '@tanstack/react-query';
import { movieService } from '@/services/movieService';

export const useMovieDetail = (id: number) => {
  return useQuery({
    queryKey: ['movie', id],

    queryFn: async () => {
      const response = await movieService.getMovieDetail(id);

      return response.data;
    },
  });
};
