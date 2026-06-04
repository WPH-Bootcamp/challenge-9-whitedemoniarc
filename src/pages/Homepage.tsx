import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import MovieCard from '@/components/MovieCard';

import { usePopularMovies } from '@/hooks/usePopularMovies';
import type { Movie } from '@/types/movie';
import { useState } from 'react';

import Footer from '@/components/Footer';

export default function HomePage() {
  const { data, isLoading, error } = usePopularMovies();
 

  const [search, setSearch] = useState('');

   const heroMovie = data?.[0];

   const filteredMovies = data?.filter((movie: Movie) =>
  movie.title.toLowerCase().includes(search.toLowerCase())
);

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  if (error) {
    return <h1>Error</h1>;
  }

  return (
    <main className="min-h-screen bg-black text-white pt-28">
      <Navbar search={search} setSearch={setSearch} />

      {heroMovie && <Hero movie={heroMovie} />}
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
