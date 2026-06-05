import type { Movie } from '../types/movie';
import { useMovieVideos } from '@/hooks/useMovieVideos';
import { useState } from 'react';

import { useNavigate } from 'react-router-dom';

type HeroProps = {
  movie: Movie;
};



export default function Hero({ movie }: HeroProps) {

    const navigate = useNavigate();
    const [showTrailer, setShowTrailer] = useState(false);
const { data: videos } = useMovieVideos(movie.id);

    const trailer = videos?.results?.find(
      (video: { site: string; type: string; key: string }) =>
        video.site === 'YouTube' && video.type === 'Trailer'
    );


    
  return (
    <section
      key={movie.id}
      className="hero-slide relative h-[80vh] bg-cover bg-center"
      style={{
        backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`,
      }}
    >
      {/* Overlay */}

      <div
        className="absolute
    bottom-0
    left-0
    w-full
    h-64
    bg-gradient-to-t
    from-black
    via-black/80
    to-transparent
    pointer-events-none"
      />

      {/* Content */}
      <div className="relative z-10 flex h-full items-center px-8">
        <div className="max-w-xl">
          <h1 className="text-5xl font-bold mb-4">{movie.title}</h1>

          <p className="text-gray-300 mb-8 line-clamp-4">{movie.overview}</p>

          <div className="flex gap-4">
            <button
              onClick={() => {
                if (trailer) {
                  setShowTrailer(true);
                }
              }}
              className="bg-red-600 hover:bg-red-700 px-8 py-3 rounded-full font-semibold"
            >
              Watch Trailer ▶
            </button>

            <button
              onClick={() => navigate(`/movie/${movie.id}`)}
              className="border border-white/30 hover:bg-white/10 text-white px-6 py-3 rounded-full transition"
            >
              See Detail
            </button>
          </div>
        </div>
      </div>
      {showTrailer && trailer && (
        <div
          className="fixed inset-0 z-[9999] bg-black/90 flex items-center justify-center p-6"
          onClick={() => setShowTrailer(false)}
        >
          <div
            className="relative w-full max-w-5xl aspect-video"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setShowTrailer(false)}
              className="absolute -top-12 right-0 text-white text-3xl"
            >
              ✕
            </button>

            <iframe
              className="w-full h-full rounded-xl"
              src={`https://www.youtube.com/embed/${trailer.key}?autoplay=1`}
              title="Trailer"
              allow="autoplay; encrypted-media"
              allowFullScreen
            />
          </div>
        </div>
      )}
    </section>
  );
}
