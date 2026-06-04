import { useQuery } from '@tanstack/react-query';
import { getMovieCredits } from '@/services/movieService';

export const useMovieCredits = (id: number) => {
  return useQuery({
    queryKey: ['credits', id],
    queryFn: () => getMovieCredits(id),
  });
};
    