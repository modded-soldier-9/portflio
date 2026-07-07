'use client';

import { motion } from 'framer-motion';
import { Search, Filter, X, Code, Star, Calendar } from 'lucide-react';
import { useState, useEffect } from 'react';

interface ProjectFiltersProps {
  onFilterChange: (filters: {
    search: string;
    language: string;
    sortBy: 'updated' | 'stars' | 'name';
    showOnly: 'all' | 'featured' | 'recent';
  }) => void;
}

const ProjectFilters = ({ onFilterChange }: ProjectFiltersProps) => {
  const [search, setSearch] = useState('');
  const [language, setLanguage] = useState('');
  const [sortBy, setSortBy] = useState<'updated' | 'stars' | 'name'>('updated');
  const [showOnly, setShowOnly] = useState<'all' | 'featured' | 'recent'>('all');
  const [isExpanded, setIsExpanded] = useState(false);

  const languages = [
    'All Languages',
    'JavaScript',
    'TypeScript',
    'Python',
    'Java',
    'C++',
    'C#',
    'Go',
    'Rust',
    'PHP',
    'Ruby',
    'Swift',
    'Kotlin',
    'HTML',
    'CSS',
    'Vue',
    'React',
    'Next.js',
    'Node.js'
  ];

  useEffect(() => {
    onFilterChange({ search, language, sortBy, showOnly });
  }, [search, language, sortBy, showOnly, onFilterChange]);

  const clearFilters = () => {
    setSearch('');
    setLanguage('');
    setSortBy('updated');
    setShowOnly('all');
  };

  const hasActiveFilters = search || language || sortBy !== 'updated' || showOnly !== 'all';

  return (
    <motion.div
      className="mb-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      {/* Filter Toggle */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-4">
          <h3 className="text-xl font-bold text-foreground">Filter Projects</h3>
          {hasActiveFilters && (
            <motion.button
              onClick={clearFilters}
              className="flex items-center space-x-2 px-3 py-1 bg-red-500/20 text-red-400 text-sm rounded-lg hover:bg-red-500/30 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <X className="w-4 h-4" />
              <span>Clear</span>
            </motion.button>
          )}
        </div>
        
        <motion.button
          onClick={() => setIsExpanded(!isExpanded)}
          aria-expanded={isExpanded}
          className="flex items-center space-x-2 px-4 py-2 bg-card border border-border text-foreground rounded-lg hover:border-primary transition-colors"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Filter className="w-4 h-4" aria-hidden="true" />
          <span>Filters</span>
        </motion.button>
      </div>

      {/* Search Bar */}
      <div className="relative mb-4">
        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted" aria-hidden="true" />
        <label htmlFor="project-search" className="sr-only">Search projects</label>
        <input
          type="text"
          id="project-search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search projects by name or description…"
          className="w-full pl-12 pr-4 py-3 bg-card border border-border rounded-lg text-foreground placeholder-muted focus:outline-none focus:ring-2 focus:ring-primary/50 transition-colors"
        />
      </div>

      {/* Expanded Filters */}
      <motion.div
        className="overflow-hidden"
        initial={false}
        animate={{ height: isExpanded ? 'auto' : 0 }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-card rounded-lg border border-border">
          {/* Language Filter */}
          <div>
            <label htmlFor="filter-language" className="block text-sm font-medium text-muted-strong mb-2">
              Language
            </label>
            <select
              id="filter-language"
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="w-full px-3 py-2 bg-background-elevated border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-colors"
            >
              {languages.map((lang) => (
                <option key={lang} value={lang === 'All Languages' ? '' : lang}>
                  {lang}
                </option>
              ))}
            </select>
          </div>

          {/* Sort By */}
          <div>
            <label htmlFor="filter-sort" className="block text-sm font-medium text-muted-strong mb-2">
              Sort By
            </label>
            <select
              id="filter-sort"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as 'updated' | 'stars' | 'name')}
              className="w-full px-3 py-2 bg-background-elevated border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-colors"
            >
              <option value="updated">Last Updated</option>
              <option value="stars">Most Stars</option>
              <option value="name">Name A-Z</option>
            </select>
          </div>

          {/* Show Only */}
          <div>
            <label htmlFor="filter-show" className="block text-sm font-medium text-muted-strong mb-2">
              Show
            </label>
            <select
              id="filter-show"
              value={showOnly}
              onChange={(e) => setShowOnly(e.target.value as 'all' | 'featured' | 'recent')}
              className="w-full px-3 py-2 bg-background-elevated border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-colors"
            >
              <option value="all">All Projects</option>
              <option value="featured">Featured Only</option>
              <option value="recent">Recent Only</option>
            </select>
          </div>
        </div>
      </motion.div>

      {/* Active Filters Display */}
      {hasActiveFilters && (
        <motion.div
          className="flex flex-wrap gap-2 mt-4"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {search && (
            <span className="flex items-center space-x-2 px-3 py-1 bg-indigo-500/20 text-indigo-400 text-sm rounded-full border border-indigo-500/30">
              <Search className="w-3 h-3" />
              <span>&quot;{search}&quot;</span>
              <button
                onClick={() => setSearch('')}
                className="hover:text-indigo-300 transition-colors"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          )}
          
          {language && (
            <span className="flex items-center space-x-2 px-3 py-1 bg-green-500/20 text-green-400 text-sm rounded-full border border-green-500/30">
              <Code className="w-3 h-3" />
              <span>{language}</span>
              <button
                onClick={() => setLanguage('')}
                className="hover:text-green-300 transition-colors"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          )}
          
          {sortBy !== 'updated' && (
            <span className="flex items-center space-x-2 px-3 py-1 bg-purple-500/20 text-purple-400 text-sm rounded-full border border-purple-500/30">
              <Star className="w-3 h-3" />
              <span>Sort: {sortBy === 'stars' ? 'Most Stars' : 'Name A-Z'}</span>
              <button
                onClick={() => setSortBy('updated')}
                className="hover:text-purple-300 transition-colors"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          )}
          
          {showOnly !== 'all' && (
            <span className="flex items-center space-x-2 px-3 py-1 bg-orange-500/20 text-orange-400 text-sm rounded-full border border-orange-500/30">
              <Calendar className="w-3 h-3" />
              <span>Show: {showOnly === 'featured' ? 'Featured' : 'Recent'}</span>
              <button
                onClick={() => setShowOnly('all')}
                className="hover:text-orange-300 transition-colors"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          )}
        </motion.div>
      )}
    </motion.div>
  );
};

export default ProjectFilters;
