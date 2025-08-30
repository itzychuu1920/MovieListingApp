import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Flame } from 'lucide-react';
import { MovieCard } from './MovieCard';
import { LoadingSpinner } from './LoadingSpinner';
import { omdbService } from '../services/omdbApi';
import { Movie } from '../types/movie';

interface TrendingMoviesProps {
  onMoreInfo: (imdbID: string) => void;
  favorites: string[];
  onToggleFavorite: (movie: Movie) => void;
}

export function TrendingMovies({ onMoreInfo, favorites, onToggleFavorite }: TrendingMoviesProps) {
  const [trendingMovies, setTrendingMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTrendingMovies = async () => {
      try {
        const movies = await omdbService.getTrendingMovies();
        setTrendingMovies(movies);
      } catch (error) {
        console.error('Error fetching trending movies:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTrendingMovies();
  }, []);

  return (
    <section className="py-16 bg-gray-900/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center space-x-3 mb-8"
        >
          <Flame className="w-6 h-6 text-red-500" />
          <h2 className="text-3xl font-bold text-white">Trending Movies</h2>
        </motion.div>

        {loading ? (
          <div className="flex justify-center py-20">
            <LoadingSpinner />
          </div>
        ) : (
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
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6"
          >
            {trendingMovies.map((movie, index) => (
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
        )}
      </div>
    </section>
  );
}