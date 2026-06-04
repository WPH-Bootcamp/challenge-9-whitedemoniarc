// export default function MovieDetailPage() {
//   return <div className="min-h-screen bg-black text-white">Movie Detail</div>;
// }

import { useParams } from 'react-router-dom';
import { useMovieDetail } from '@/hooks/useMovieDetails';

import { useNavigate } from 'react-router-dom';

import { useMovieStore } from '@/store/movieStore';

import MovieCard from '@/components/MovieCard';
import { useSimilarMovies } from '@/hooks/useSimilarMovies';

import type { Movie } from '@/types/movie';

import { useMovieVideos } from '@/hooks/useMovieVideos';

import { useState } from 'react';

import Navbar from '@/components/Navbar';

import { useMovieCredits } from '@/hooks/useMovieCredits';

export default function MovieDetailPage() {
  const { id } = useParams();

  const addFavorite = useMovieStore((state) => state.addFavorite);

  const removeFavorite = useMovieStore((state) => state.removeFavorite);

  const favorites = useMovieStore((state) => state.favorites);

  const [showTrailer, setShowTrailer] = useState(false);

  const { data, isLoading, error } = useMovieDetail(Number(id));

  const { data: videos } = useMovieVideos(Number(id));

  const favorite = favorites.some((movie) => movie.id === data?.id);

  const { data: similarMovies } = useSimilarMovies(Number(id));

 

  const navigate = useNavigate();

  const trailer =
    videos?.results?.find(
      (video: { site: string; type: string; key: string }) =>
        video.site === 'YouTube' && video.type === 'Trailer'
    ) || videos?.results?.find((video: { site: string; key: string }) => video.site === 'YouTube');

  const { data: credits } = useMovieCredits(Number(id));

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        Loading...
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        Error loading movie
      </div>
    );
  }

  return (
    <main className="bg-black text-white min-w-screen max-w-5xl mx-auto pt-32">
      <Navbar />
      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="
            absolute
top-25
left-10
bg-black/60
px-4
py-2
rounded-xl
            hover:bg-black
          "
      >
        ← Back
      </button>

      {/* Background */}
      <div
        className="relative max-w-4xl z--10"
        style={{
          backgroundImage: `url(https://image.tmdb.org/t/p/original${data.backdrop_path})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-black/80" />

        {/* Content */}
        <div className="relative z-10 max-w-4xl mx-auto px-6 py-24">
          <div className="flex flex-col lg:flex-row gap-10">
            {/* Poster */}
            <div className="shrink-0">
              <img
                src={`https://image.tmdb.org/t/p/w500${data.poster_path}`}
                alt={data.title}
                className="
                w-72
                rounded-2xl
                shadow-2xl
              "
              />
            </div>

            {/* Detail */}
            <div className="flex-1">
              <h1 className="text-5xl font-bold mb-4">{data.title}</h1>

              <p className="text-gray-300 mb-8">📅 {data.release_date}</p>

              {/* Buttons */}
              <div className="flex gap-4 mb-8">
                <button
                  onClick={() => setShowTrailer(true)}
                  className="
    bg-red-700
    hover:bg-red-600
    px-8
    py-3
    rounded-full
    font-semibold
  "
                >
                  Watch Trailer ▶
                </button>

                <button
                  onClick={() => {
                    console.log('CLICKED');
                    if (!data) return;

                    if (favorite) {
                      removeFavorite(data.id);
                    } else {
                      addFavorite(data);
                    }
                  }}
                  className="
    w-14
    h-14
    rounded-full
    bg-zinc-900/80
    border
    border-zinc-700
    flex
    items-center
    justify-center
    text-2xl
  "
                >
                  {favorite ? '❤️' : '🤍'}
                </button>
              </div>

              {/* Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
                {/* Rating */}
                <div
                  className="
                  bg-black/50
                  border
                  border-zinc-800
                  rounded-2xl
                  p-6
                  text-center
                "
                >
                  <div className="text-yellow-400 text-3xl">⭐</div>

                  <p className="text-gray-400 mt-2">Rating</p>

                  <p className="text-2xl font-bold">{data.vote_average.toFixed(1)}/10</p>
                </div>

                {/* Genre */}
                <div
                  className="
                  bg-black/50
                  border
                  border-zinc-800
                  rounded-2xl
                  p-6
                  text-center
                "
                >
                  <div className="text-3xl">🎬</div>

                  <p className="text-gray-400 mt-2">Genre</p>

                  <p className="font-bold">{data.genres?.[0]?.name}</p>
                </div>

                {/* Age */}
                <div
                  className="
                  bg-black/50
                  border
                  border-zinc-800
                  rounded-2xl
                  p-6
                  text-center
                "
                >
                  <div className="text-3xl">🔞</div>

                  <p className="text-gray-400 mt-2">Age Limit</p>

                  <p className="font-bold">13+</p>
                </div>
              </div>

              {/* Overview */}
              <section className="mb-16">
                <h2 className="text-4xl font-bold mb-6">Overview</h2>

                <p className="text-gray-300 leading-8 max-w-3xl">{data.overview}</p>
              </section>

              {/* Cast & Crew Placeholder */}
              <div className="grid md:grid-cols-2 gap-6">
                {credits?.cast
                  ?.slice(0, 6)
                  .map(
                    (person: {
                      id: number;
                      name: string;
                      character: string;
                      profile_path: string | null;
                    }) => (
                      <div key={person.id} className="flex items-center gap-4">
                        <img
                          src={
                            person.profile_path
                              ? `https://image.tmdb.org/t/p/w185${person.profile_path}`
                              : 'https://placehold.co/80x80'
                          }
                          alt={person.name}
                          className="w-16 h-16 rounded-xl object-cover"
                        />

                        <div>
                          <h4 className="font-semibold">{person.name}</h4>

                          <p className="text-zinc-400 text-sm">{person.character}</p>
                        </div>
                      </div>
                    )
                  )}
              </div>

              {/* Similar Movies */}
              <section className="max-w-4xl">
                <h2 className="text-4xl font-bold mb-8">Similar Movies</h2>

                <div
                  className="
                  flex
                  gap-4
                  overflow-x-auto
                  pb-4
                  scrollbar-hide
                "
                >
                  {similarMovies?.slice(0, 10).map((movie: Movie) => (
                    <div key={movie.id} className="min-w-[220px]">
                      <MovieCard movie={movie} />
                    </div>
                  ))}
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer
        className="
        border-t
        border-zinc-800
        py-8
      "
      >
        <div
          className="
          max-w-6xl
          mx-auto
          px-6
          flex
          justify-between
          items-center
        "
        >
          <h2 className="text-2xl font-bold">🎬 Movie</h2>

          <p className="text-gray-500">Copyright ©2025 Movie Explorer</p>
        </div>

        {showTrailer && trailer && (
          <div
            className="
      fixed
      inset-0
      bg-black/90
      z-[999]
      flex
      items-center
      justify-center
      p-4
    "
          >
            <div className="relative w-full max-w-5xl">
              <button
                onClick={() => setShowTrailer(false)}
                className="
          absolute
          -top-12
          right-0
          text-white
          text-3xl
        "
              >
                ✕
              </button>

              <div className="aspect-video">
                <iframe
                  className="w-full h-full rounded-xl"
                  src={`https://www.youtube.com/embed/${trailer.key}?autoplay=1`}
                  title="Trailer"
                  allow="autoplay; encrypted-media"
                  allowFullScreen
                />
              </div>
            </div>
          </div>
        )}
      </footer>
    </main>
  );
}
