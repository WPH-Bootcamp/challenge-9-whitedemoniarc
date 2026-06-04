// import Navbar from '@/components/Navbar';

// export default function FavoritesPage() {
//   return
//     <main className="bg-black min-h-screen text-white">
//       <Navbar />
//       <div className="min-h-screen bg-black text-white">
//         <h1 className="text-4xl font-bold mb-8">Favorite Movies</h1>
//       </div>
//       ;
//     </main>;
// }

import Navbar from '@/components/Navbar';
import MovieCard from '@/components/MovieCard';
import { useMovieStore } from '@/store/movieStore';

import { useState } from 'react';


export default function FavoritesPage() {
  const favorites = useMovieStore((state) => state.favorites);

  const [search, setSearch] = useState('');

  const filteredFavorites = favorites.filter((movie) =>
    movie.title.toLowerCase().includes(search.toLowerCase())
  );

if (favorites.length === 0) {
  return (
    <main className="min-h-screen bg-black text-white">
      <Navbar search={search} setSearch={setSearch} />

      <div className="flex flex-col items-center justify-center h-[60vh]">
        <h2 className="text-2xl font-bold">No Favorite Movies Yet</h2>

        <p className="text-zinc-400 mt-2">Add movies by clicking ❤️</p>
      </div>
    </main>
  );
}

  return (
    <main className="bg-black min-h-screen text-white p-6">
      <Navbar search={search} setSearch={setSearch} />

      <h1 className="text-4xl font-bold mb-8">Favorite Movies</h1>

      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {filteredFavorites.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </main>
  );
}