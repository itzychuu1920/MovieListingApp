const API_BASE_URL = 'https://www.omdbapi.com/';
const API_KEY = 'b986fcb6'; // Users will need to replace this with their actual OMDb API key

export class OMDbService {
  private static instance: OMDbService;
  
  private constructor() {}
  
  public static getInstance(): OMDbService {
    if (!OMDbService.instance) {
      OMDbService.instance = new OMDbService();
    }
    return OMDbService.instance;
  }

  async searchMovies(query: string, page: number = 1): Promise<any> {
    try {
      const response = await fetch(
        `${API_BASE_URL}?apikey=${API_KEY}&s=${encodeURIComponent(query)}&page=${page}&type=movie`
      );
      const data = await response.json();
      
      if (data.Response === 'False') {
        throw new Error(data.Error || 'No movies found');
      }
      
      return data;
    } catch (error) {
      console.error('Error searching movies:', error);
      throw error;
    }
  }

  async getMovieDetails(imdbID: string): Promise<any> {
    try {
      const response = await fetch(
        `${API_BASE_URL}?apikey=${API_KEY}&i=${imdbID}&plot=full`
      );
      const data = await response.json();
      
      if (data.Response === 'False') {
        throw new Error(data.Error || 'Movie not found');
      }
      
      return data;
    } catch (error) {
      console.error('Error fetching movie details:', error);
      throw error;
    }
  }

  async getTrendingMovies(): Promise<any[]> {
    const trendingTitles = [
      'Avengers: Endgame',
      'The Dark Knight',
      'Harry Potter and the Philosopher\'s Stone',
      'Inception',
      'Interstellar',
      'The Matrix'
    ];
    
    try {
      const promises = trendingTitles.map(title => 
        fetch(`${API_BASE_URL}?apikey=${API_KEY}&t=${encodeURIComponent(title)}`)
          .then(res => res.json())
          .then(data => data.Response === 'True' ? data : null)
      );
      
      const results = await Promise.all(promises);
      return results.filter(movie => movie !== null);
    } catch (error) {
      console.error('Error fetching trending movies:', error);
      return [];
    }
  }
}

export const omdbService = OMDbService.getInstance();