import { Link } from 'react-router-dom';

import type { Movie } from '@/types/movie';
import { useMovieStore } from '@/store/movieStore';

type Props = {
  movie: Movie;
  index?: number;
};

export default function MovieCard({ movie, index }: Props) {
  const { addFavorite, removeFavorite, isFavorite } = useMovieStore();

  const favorite = isFavorite(movie.id);

  return (
    <div
      className=" relative
      rounded-xl
      overflow-hidden
      transition
      duration-300
      hover:scale-105
    min-w-55
    max-w-55
    flex-shrink:0"
    >
      {index !== undefined && (
        <div
          className="
      absolute
      top-3
      left-3
      z-10

      w-10
      h-10

      rounded-full
      bg-zinc-800/90

      flex
      items-center
      justify-center

      font-bold
    "
        >
          {index + 1}
        </div>
      )}
      <button
        onClick={(e) => {
          e.preventDefault();

          if (favorite) {
            removeFavorite(movie.id);
          } else {
            addFavorite(movie);
          }
        }}
        className="absolute top-2 right-2 z-10 bg-black/70 p-2 rounded-full"
      >
        {favorite ? '❤️' : '🤍'}
      </button>

      <Link to={`/movie/${movie.id}`}>
        <img
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
          className="
    w-full
    h-[320px]
    object-cover
    rounded-2xl
  "
        />

        <h3 className="mt-2 font-semibold">{movie.title}</h3>

        <p className="text-yellow-400">⭐ {movie.vote_average.toFixed(1)}</p>
      </Link>
    </div>
  );    
}

//   return (
//     <Link to={`/movie/${movie.id}`}>
//       <div className="rounded-xl overflow-hidden">
//         <img
//           src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
//           alt={movie.title}
//           className="w-full rounded-xl"
//         />

//         <h3 className="mt-2 font-semibold">{movie.title}</h3>

//         <p className="text-yellow-400">⭐ {movie.vote_average.toFixed(1)}</p>
//       </div>
//     </Link>
//   );
