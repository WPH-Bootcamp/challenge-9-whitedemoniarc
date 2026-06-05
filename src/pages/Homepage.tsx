import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import MovieCard from '@/components/MovieCard';

import { usePopularMovies } from '@/hooks/usePopularMovies';
import type { Movie } from '@/types/movie';
import { useEffect, useState } from 'react';

import Footer from '@/components/Footer';

export default function HomePage() {
  const { data, isLoading, error } = usePopularMovies();
  
  const [search, setSearch] = useState('');

  const [currentHero, setCurrentHero] = useState(0);

   const heroMovie = data?.[currentHero];

   const filteredMovies = data?.filter((movie: Movie) =>
  movie.title.toLowerCase().includes(search.toLowerCase())
);



const nextHero = () => {
  if (!data?.length) return;

  setCurrentHero((prev) => (prev === data.length - 1 ? 0 : prev + 1));
};

const prevHero = () => {
  if (!data?.length) return;

  setCurrentHero((prev) => (prev === 0 ? data.length - 1 : prev - 1));
};

const [showTrailer, setShowTrailer] = useState(false);



useEffect(() => {
  if (!data?.length || showTrailer) return;

  const interval = setInterval(() => {
    setCurrentHero((prev) => (prev + 1) % 5);
  }, 5000);

  return () => clearInterval(interval);
}, [data, showTrailer]);

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  if (error) {
    return <h1>Error</h1>;
  }

  return (
    <main className="min-h-screen bg-black text-white ">
      <Navbar search={search} setSearch={setSearch} />

      <div className="relative">
        {heroMovie && (
          <Hero movie={heroMovie} showTrailer={showTrailer} setShowTrailer={setShowTrailer} />
        )}
        {/* LEFT */}
        <button
          onClick={prevHero}
          className="
          opacity-70 hover:opacity-100 transition
      absolute
      left-6
      top-1/2
      -translate-y-1/2

      w-14
      h-14

      rounded-full

      bg-black/40
      backdrop-blur-md

      border
      border-white/20

      hover:bg-black/60

      transition

      flex
      items-center
      justify-center

      text-2xl
      z-20
    "
        >
          ←
        </button>

        {/* RIGHT */}
        <button
          onClick={nextHero}
          className="
    opacity-70 hover:opacity-100 transition
      absolute
      right-6
      top-1/2
      -translate-y-1/2

      w-14
      h-14

      rounded-full

      bg-black/40
      backdrop-blur-md

      border
      border-white/20

      hover:bg-black/60

      transition

      flex
      items-center
      justify-center

      text-2xl
      z-20
    "
        >
          →
        </button>
      </div>

      <div className="flex justify-center gap-2 mb-10 pt-24">
        {data?.slice(0, 5).map((_: Movie, index: number) => (
          <button
            key={index}
            onClick={() => setCurrentHero(index)}
            className={`
        w-3
        h-3
        rounded-full
        transition-all
        ${currentHero === index ? 'bg-red-500' : 'bg-white/30'}
      `}
          />
        ))}
      </div>
      <h1 className="text-4xl font-bold mb-8">Trending Now</h1>

      <div
        className="flex
    gap-6
    overflow-x-auto
    pb-4
    scrollbar-hide"
      >
        {filteredMovies?.map((movie: Movie, index: number) => (
          <MovieCard key={movie.id} movie={movie} index={index} />
        ))}
      </div>

      {/* NEW RELEASE */}
      <section className="mt-20">
        <h2 className="text-4xl font-bold mb-8">New Release</h2>

        <div className="relative">
          <div
            className="
      grid
      grid-cols-2
      md:grid-cols-3
      lg:grid-cols-5
      gap-6
    "
          >
            {filteredMovies?.slice(5, 15).map((movie: Movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
          {/* Fade Overlay */}
          <div
            className="
        absolute
        bottom-0
        left-0
        right-0
        h-40
        bg-gradient-to-t
        from-black
        to-transparent
        pointer-events-none
      "
          />
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
            <button
              className="
      px-10
      py-3
      rounded-full
      bg-zinc-900
      border
      border-zinc-700
      hover:bg-zinc-800
      transition
    "
            >
              Load More
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
