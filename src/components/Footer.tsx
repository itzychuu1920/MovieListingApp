import React from 'react';
import { motion } from 'framer-motion';
import { Film, Heart } from 'lucide-react';

export function Footer() {
  return (
    <motion.footer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.5 }}
      className="bg-gray-900 border-t border-gray-800 py-8"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="flex items-center space-x-2 mb-4 md:mb-0">
            <Film className="w-6 h-6 text-red-500" />
            <span className="text-xl font-bold text-white">CineScope 🎬</span>
          </div>
          
          <div className="flex items-center space-x-2 text-gray-400">
            <span>© 2025 CineScope. Made with</span>
            <Heart className="w-4 h-4 text-red-500 fill-current" />
            <span>for movie lovers</span>
          </div>
        </div>
        
        <div className="mt-6 pt-6 border-t border-gray-800 text-center text-sm text-gray-500">
          <p>Powered by OMDb API • Built with React, TypeScript & Tailwind CSS</p>
        </div>
      </div>
    </motion.footer>
  );
}