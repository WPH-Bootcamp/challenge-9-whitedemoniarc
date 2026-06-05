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

useEffect(() => {
  if (!data?.length) return;

  const interval = setInterval(() => {
    setCurrentHero((prev) => (prev === data.length - 1 ? 0 : prev + 1));
  }, 5000);

  return () => clearInterval(interval);
}, [data]);

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  if (error) {
    return <h1>Error</h1>;
  }

  return (
    <main className="min-h-screen bg-black text-white ">
      <Navbar search={search} setSearch={setSearch} />

      {heroMovie && <Hero movie={heroMovie} />}
      <div className="flex justify-center gap-2 mb-10 pt-24">
        {data?.slice(0, 5).map((_, index) => (
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
