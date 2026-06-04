// import { create } from 'zustand';
// // import { Movie } from '@/types/movie';

// // TODO: Define your store state interface
// interface MovieStore {
//   // TODO: Add state properties
//   // Examples: favorites, watchlist, selectedMovie, etc.

//   // TODO: Add action methods
//   // Examples: addToFavorites, removeFromFavorites, etc.
// }

// // TODO: Create Zustand store
// // Reference: https://zustand.docs.pmnd.rs/getting-started/introduction

// export const useMovieStore = create<MovieStore>((set) => ({
//   // TODO: Initialize state and implement actions
// }));

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Movie } from '@/types/movie';

interface MovieStore {
  favorites: Movie[];

  addFavorite: (movie: Movie) => void;
  removeFavorite: (id: number) => void;
  isFavorite: (id: number) => boolean;
}

export const useMovieStore = create<MovieStore>()(
  persist(
    (set, get) => ({
      favorites: [],

      addFavorite: (movie) =>
        set((state) => ({
          favorites: [...state.favorites, movie],
        })),

      removeFavorite: (id) =>
        set((state) => ({
          favorites: state.favorites.filter((movie) => movie.id !== id),
        })),

      isFavorite: (id) => get().favorites.some((movie) => movie.id === id),
    }),
    {
      name: 'movie-favorites',
    }
  )
);