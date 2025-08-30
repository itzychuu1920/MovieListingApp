import { useState, useEffect, useCallback } from 'react';
import { omdbService } from '../services/omdbApi';
import { Movie, MovieDetails } from '../types/movie';

export function useMovies() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [totalResults, setTotalResults] = useState(0);

  const searchMovies = useCallback(async (query: string, page: number = 1) => {
    if (!query.trim()) {
      setMovies([]);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const data = await omdbService.searchMovies(query, page);
      setMovies(page === 1 ? data.Search : prev => [...prev, ...data.Search]);
      setTotalResults(parseInt(data.totalResults, 10));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      setMovies([]);
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    movies,
    loading,
    error,
    totalResults,
    searchMovies,
    clearMovies: () => setMovies([])
  };
}

export function useMovieDetails(imdbID: string | null) {
  const [movieDetails, setMovieDetails] = useState<MovieDetails | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!imdbID) {
      setMovieDetails(null);
      return;
    }

    const fetchDetails = async () => {
      setLoading(true);
      setError(null);

      try {
        const data = await omdbService.getMovieDetails(imdbID);
        setMovieDetails(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch movie details');
      } finally {
        setLoading(false);
      }
    };

    fetchDetails();
  }, [imdbID]);

  return { movieDetails, loading, error };
}