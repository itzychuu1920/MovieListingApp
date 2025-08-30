import React, { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { MovieGrid } from './components/MovieGrid';
import { MovieModal } from './components/MovieModal';
import { TrendingMovies } from './components/TrendingMovies';
import { Footer } from './components/Footer';
import { useMovies } from './hooks/useMovies';
import { useLocalStorage } from './hooks/useLocalStorage';
import { Movie } from './types/movie';

function App() {
  const { movies, loading, error, totalResults, searchMovies, clearMovies } = useMovies();
  const [selectedMovieId, setSelectedMovieId] = useState<string | null>(null);
  const [currentQuery, setCurrentQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [favorites, setFavorites] = useLocalStorage<string[]>('cinescope-favorites', []);

  const handleSearch = useCallback((query: string) => {
    setCurrentQuery(query);
    setCurrentPage(1);
    searchMovies(query, 1);
  }, [searchMovies]);

  const handleLoadMore = useCallback(() => {
    if (currentQuery && !loading) {
      const nextPage = currentPage + 1;
      setCurrentPage(nextPage);
      searchMovies(currentQuery, nextPage);
    }
  }, [currentQuery, currentPage, loading, searchMovies]);

  const handleToggleFavorite = useCallback((movie: Movie) => {
    setFavorites(prev => {
      if (prev.includes(movie.imdbID)) {
        return prev.filter(id => id !== movie.imdbID);
      } else {
        return [...prev, movie.imdbID];
      }
    });
  }, [setFavorites]);

  const hasMore = currentQuery && movies.length < totalResults;

  // Check if API key is configured
  const showApiKeyWarning = true; // This would be false if API key is properly configured

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Navbar onSearch={handleSearch} isSearching={loading} />
      
      {showApiKeyWarning && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-yellow-500/20 border border-yellow-500/30 text-yellow-200 p-4 text-center"
        >
          <p>
            <strong>⚠️ API Setup Required:</strong> To use CineScope, you need to get a free API key from{' '}
            <a 
              href="http://www.omdbapi.com/apikey.aspx" 
              target="_blank" 
              rel="noopener noreferrer"
              className="underline hover:text-yellow-100"
            >
              OMDb API
            </a>
            {' '}and replace "YOUR_API_KEY" in src/services/omdbApi.ts
          </p>
        </motion.div>
      )}

      <main>
        <HeroSection />
        
        {/* Search Results */}
        {(movies.length > 0 || loading || error) && (
          <section className="py-8 bg-gray-900">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              {currentQuery && (
                <motion.h2
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="text-2xl font-bold text-white mb-6"
                >
                  Search Results for "{currentQuery}"
                </motion.h2>
              )}
              
              <MovieGrid
                movies={movies}
                loading={loading}
                error={error}
                onMoreInfo={setSelectedMovieId}
                favorites={favorites}
                onToggleFavorite={handleToggleFavorite}
                onLoadMore={hasMore ? handleLoadMore : undefined}
                hasMore={hasMore}
              />
            </div>
          </section>
        )}

        {/* Trending Movies */}
        {movies.length === 0 && !loading && (
          <TrendingMovies
            onMoreInfo={setSelectedMovieId}
            favorites={favorites}
            onToggleFavorite={handleToggleFavorite}
          />
        )}
      </main>

      <Footer />

      {/* Movie Modal */}
      <MovieModal
        isOpen={!!selectedMovieId}
        onClose={() => setSelectedMovieId(null)}
        imdbID={selectedMovieId}
      />
    </div>
  );
}

export default App;