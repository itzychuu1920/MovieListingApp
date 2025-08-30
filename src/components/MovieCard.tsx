import React from 'react';
import { motion } from 'framer-motion';
import { Star, Calendar, Info, Heart } from 'lucide-react';
import { Movie } from '../types/movie';

interface MovieCardProps {
  movie: Movie;
  onMoreInfo: (imdbID: string) => void;
  isFavorite: boolean;
  onToggleFavorite: (movie: Movie) => void;
}

export function MovieCard({ movie, onMoreInfo, isFavorite, onToggleFavorite }: MovieCardProps) {
  const posterUrl = movie.Poster !== 'N/A' 
    ? movie.Poster 
    : 'https://images.pexels.com/photos/7991579/pexels-photo-7991579.jpeg?auto=compress&cs=tinysrgb&w=300&h=450&fit=crop';

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      whileHover={{ scale: 1.05, y: -10 }}
      transition={{ duration: 0.3 }}
      className="bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl hover:shadow-red-500/20 cursor-pointer group"
    >
      {/* Poster */}
      <div className="relative overflow-hidden">
        <img
          src={posterUrl}
          alt={movie.Title}
          className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-110"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = 'https://images.pexels.com/photos/7991579/pexels-photo-7991579.jpeg?auto=compress&cs=tinysrgb&w=300&h=450&fit=crop';
          }}
        />
        
        {/* Favorite Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleFavorite(movie);
          }}
          className="absolute top-2 right-2 p-2 rounded-full bg-gray-900/70 backdrop-blur-sm hover:bg-gray-900 transition-all duration-200"
        >
          <Heart
            className={`w-4 h-4 transition-colors duration-200 ${
              isFavorite ? 'text-red-500 fill-red-500' : 'text-white hover:text-red-500'
            }`}
          />
        </button>
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="text-white font-bold text-lg mb-2 line-clamp-2 leading-tight">
          {movie.Title}
        </h3>
        
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2 text-gray-400">
            <Calendar className="w-4 h-4" />
            <span className="text-sm">{movie.Year}</span>
          </div>
          
          <div className="flex items-center space-x-1 text-yellow-500">
            <Star className="w-4 h-4 fill-current" />
            <span className="text-sm text-gray-300">IMDb</span>
          </div>
        </div>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => onMoreInfo(movie.imdbID)}
          className="w-full bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-lg flex items-center justify-center space-x-2 transition-colors duration-200"
        >
          <Info className="w-4 h-4" />
          <span>More Info</span>
        </motion.button>
      </div>
    </motion.div>
  );
}