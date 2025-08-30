import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Star, Calendar, Clock, Users, Award, Globe } from 'lucide-react';
import { useMovieDetails } from '../hooks/useMovies';

interface MovieModalProps {
  isOpen: boolean;
  onClose: () => void;
  imdbID: string | null;
}

export function MovieModal({ isOpen, onClose, imdbID }: MovieModalProps) {
  const { movieDetails, loading, error } = useMovieDetails(imdbID);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const posterUrl = movieDetails?.Poster !== 'N/A' 
    ? movieDetails?.Poster 
    : 'https://images.pexels.com/photos/7991579/pexels-photo-7991579.jpeg?auto=compress&cs=tinysrgb&w=400&h=600&fit=crop';

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handleBackdropClick}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="relative bg-gray-900/95 backdrop-blur-md rounded-2xl p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto border border-gray-700"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 rounded-full bg-gray-800 hover:bg-gray-700 transition-colors duration-200 z-10"
            >
              <X className="w-5 h-5 text-white" />
            </button>

            {loading && (
              <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-4 border-red-500 border-t-transparent"></div>
              </div>
            )}

            {error && (
              <div className="text-center py-20">
                <h3 className="text-xl font-semibold text-white mb-2">Error loading movie details</h3>
                <p className="text-gray-400">{error}</p>
              </div>
            )}

            {movieDetails && (
              <div className="grid md:grid-cols-3 gap-8">
                {/* Poster */}
                <div className="md:col-span-1">
                  <img
                    src={posterUrl}
                    alt={movieDetails.Title}
                    className="w-full rounded-xl shadow-lg"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = 'https://images.pexels.com/photos/7991579/pexels-photo-7991579.jpeg?auto=compress&cs=tinysrgb&w=400&h=600&fit=crop';
                    }}
                  />
                </div>

                {/* Details */}
                <div className="md:col-span-2 space-y-6">
                  <div>
                    <h2 className="text-3xl font-bold text-white mb-2">{movieDetails.Title}</h2>
                    
                    {/* Rating and Year */}
                    <div className="flex items-center space-x-4 mb-4">
                      {movieDetails.imdbRating !== 'N/A' && (
                        <div className="flex items-center space-x-1 bg-yellow-500/20 px-3 py-1 rounded-full">
                          <Star className="w-4 h-4 text-yellow-500 fill-current" />
                          <span className="text-yellow-500 font-semibold">{movieDetails.imdbRating}</span>
                        </div>
                      )}
                      <div className="flex items-center space-x-1 text-gray-300">
                        <Calendar className="w-4 h-4" />
                        <span>{movieDetails.Year}</span>
                      </div>
                      {movieDetails.Runtime !== 'N/A' && (
                        <div className="flex items-center space-x-1 text-gray-300">
                          <Clock className="w-4 h-4" />
                          <span>{movieDetails.Runtime}</span>
                        </div>
                      )}
                    </div>

                    {/* Genre */}
                    {movieDetails.Genre !== 'N/A' && (
                      <div className="flex flex-wrap gap-2 mb-4">
                        {movieDetails.Genre.split(', ').map((genre, index) => (
                          <span
                            key={index}
                            className="bg-red-500/20 text-red-400 px-3 py-1 rounded-full text-sm"
                          >
                            {genre}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Plot */}
                  {movieDetails.Plot !== 'N/A' && (
                    <div>
                      <h3 className="text-lg font-semibold text-white mb-2">Plot</h3>
                      <p className="text-gray-300 leading-relaxed">{movieDetails.Plot}</p>
                    </div>
                  )}

                  {/* Cast and Crew */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {movieDetails.Director !== 'N/A' && (
                      <div>
                        <h4 className="font-semibold text-white mb-1">Director</h4>
                        <p className="text-gray-300 text-sm">{movieDetails.Director}</p>
                      </div>
                    )}
                    
                    {movieDetails.Actors !== 'N/A' && (
                      <div>
                        <h4 className="font-semibold text-white mb-1 flex items-center space-x-1">
                          <Users className="w-4 h-4" />
                          <span>Cast</span>
                        </h4>
                        <p className="text-gray-300 text-sm">{movieDetails.Actors}</p>
                      </div>
                    )}
                    
                    {movieDetails.Released !== 'N/A' && (
                      <div>
                        <h4 className="font-semibold text-white mb-1">Released</h4>
                        <p className="text-gray-300 text-sm">{movieDetails.Released}</p>
                      </div>
                    )}
                    
                    {movieDetails.Language !== 'N/A' && (
                      <div>
                        <h4 className="font-semibold text-white mb-1 flex items-center space-x-1">
                          <Globe className="w-4 h-4" />
                          <span>Language</span>
                        </h4>
                        <p className="text-gray-300 text-sm">{movieDetails.Language}</p>
                      </div>
                    )}
                  </div>

                  {/* Awards */}
                  {movieDetails.Awards !== 'N/A' && movieDetails.Awards !== '' && (
                    <div>
                      <h4 className="font-semibold text-white mb-2 flex items-center space-x-1">
                        <Award className="w-4 h-4" />
                        <span>Awards</span>
                      </h4>
                      <p className="text-gray-300 text-sm">{movieDetails.Awards}</p>
                    </div>
                  )}
                </div>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}