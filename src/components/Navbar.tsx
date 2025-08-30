import React, { useState } from 'react';
import { Search, Film } from 'lucide-react';
import { motion } from 'framer-motion';

interface NavbarProps {
  onSearch: (query: string) => void;
  isSearching: boolean;
}

export function Navbar({ onSearch, isSearching }: NavbarProps) {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      onSearch(searchQuery.trim());
    }
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="sticky top-0 z-50 bg-gray-900/95 backdrop-blur-md border-b border-gray-800"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex items-center space-x-2"
          >
            <Film className="w-8 h-8 text-red-500" />
            <h1 className="text-2xl font-bold text-white">CineScope 🎬</h1>
          </motion.div>

          {/* Search Bar */}
          <form onSubmit={handleSubmit} className="flex-1 max-w-md mx-8">
            <div className="relative">
              <input
                type="text"
                placeholder="Search for movies..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                disabled={isSearching}
                className="w-full bg-gray-800 text-white placeholder-gray-400 rounded-full py-2 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-red-500 transition-all duration-200 disabled:opacity-50"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              {isSearching && (
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                  <div className="animate-spin rounded-full h-4 w-4 border-2 border-red-500 border-t-transparent"></div>
                </div>
              )}
            </div>
          </form>

          {/* Navigation Links */}
          <div className="flex items-center space-x-6">
            <button className="text-gray-300 hover:text-white transition-colors duration-200">
              Trending
            </button>
            <button className="text-gray-300 hover:text-white transition-colors duration-200">
              Favorites
            </button>
          </div>
        </div>
      </div>
    </motion.nav>
  );
}