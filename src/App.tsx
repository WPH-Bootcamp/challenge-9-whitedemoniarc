//

import { Routes, Route } from 'react-router-dom';

import HomePage from './pages/Homepage';
import MovieDetailPage from './pages/MovieDetailPage';
import FavoritesPage from './pages/FavoritePage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />

      <Route path="/movie/:id" element={<MovieDetailPage />} />

      <Route path="/favorites" element={<FavoritesPage />} />
    </Routes>
  );
}

export default App;