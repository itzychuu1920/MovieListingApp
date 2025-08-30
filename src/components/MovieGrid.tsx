import React from 'react';
import { motion } from 'framer-motion';
import { MovieCard } from './MovieCard';
import { LoadingSpinner } from './LoadingSpinner';
import { Movie } from '../types/movie';

interface MovieGridProps {
  movies: Movie[];
  loading: boolean;
  error: string | null;
  onMoreInfo: (imdbID: string) => void;
  favorites: string[];
  onToggleFavorite: (movie: Movie) => void;
  onLoadMore?: () => void;
  hasMore?: boolean;
}

export function MovieGrid({ 
  movies, 
  loading, 
  error, 
  onMoreInfo, 
  favorites, 
  onToggleFavorite,
  onLoadMore,
  hasMore
}: MovieGridProps) {
  if (error) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex flex-col items-center justify-center py-20"
      >
        <div className="text-center">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-red-500/20 flex items-center justify-center">
            <span className="text-2xl">🎭</span>
          </div>
          <h3 className="text-xl font-semibold text-white mb-2">No movies found</h3>
          <p className="text-gray-400">{error}</p>
        </div>
      </motion.div>
    );
  }

  if (movies.length === 0 && !loading) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex flex-col items-center justify-center py-20"
      >
        <div className="text-center">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gray-800 flex items-center justify-center">
            <span className="text-2xl">🎬</span>
          </div>
          <h3 className="text-xl font-semibold text-white mb-2">Start your movie journey</h3>
          <p className="text-gray-400">Search for movies to discover amazing content</p>
        </div>
      </motion.div>
    );
  }

  return (
    <div className="py-8">
      <motion.div
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: {
              staggerChildren: 0.1
            }
          }
        }}
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6"
      >
        {movies.map((movie) => (
          <motion.div
            key={movie.imdbID}
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 }
            }}
          >
            <MovieCard
              movie={movie}
              onMoreInfo={onMoreInfo}
              isFavorite={favorites.includes(movie.imdbID)}
              onToggleFavorite={onToggleFavorite}
            />
          </motion.div>
        ))}
      </motion.div>

      {/* Loading State */}
      {loading && (
        <div className="flex justify-center py-8">
          <LoadingSpinner />
        </div>
      )}

      {/* Load More Button */}
      {!loading && hasMore && onLoadMore && (
        <div className="flex justify-center pt-8">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onLoadMore}
            className="bg-gray-800 hover:bg-gray-700 text-white font-semibold py-3 px-6 rounded-full transition-colors duration-200"
          >
            Load More Movies
          </motion.button>
        </div>
      )}
    </div>
  );
}