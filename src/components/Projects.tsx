'use client';

import { motion } from 'framer-motion';
import { Github, ExternalLink, Star, GitFork, Calendar, Code } from 'lucide-react';
import { useState, useEffect, useCallback } from 'react';
import ProjectFilters from './ProjectFilters';

interface GitHubRepo {
  id: number;
  name: string;
  full_name: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  created_at: string;
  updated_at: string;
  topics: string[];
  private: boolean;
  fork: boolean;
}

const Projects = () => {
  const [repos, setRepos] = useState<GitHubRepo[]>([]);
  const [filteredRepos, setFilteredRepos] = useState<GitHubRepo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Replace with your GitHub username
  const GITHUB_USERNAME = 'modded-soldier-9'; // Your actual GitHub username

  useEffect(() => {
    const fetchRepos = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=12&type=public`,
          {
            headers: {
              'Accept': 'application/vnd.github.v3+json',
            },
          }
        );
        
        if (!response.ok) {
          throw new Error(`GitHub API error: ${response.status}`);
        }
        
        const data = await response.json();
        
        // Filter out forked repositories and sort by stars
        const filteredRepos = data
          .filter((repo: GitHubRepo) => !repo.fork && !repo.private)
          .sort((a: GitHubRepo, b: GitHubRepo) => b.stargazers_count - a.stargazers_count);
        
        setRepos(filteredRepos);
        setFilteredRepos(filteredRepos);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchRepos();
  }, []);

  const handleFilterChange = useCallback((filters: {
    search: string;
    language: string;
    sortBy: 'updated' | 'stars' | 'name';
    showOnly: 'all' | 'featured' | 'recent';
  }) => {
    let filtered = [...repos];

    // Search filter
    if (filters.search) {
      filtered = filtered.filter(repo =>
        repo.name.toLowerCase().includes(filters.search.toLowerCase()) ||
        (repo.description && repo.description.toLowerCase().includes(filters.search.toLowerCase()))
      );
    }

    // Language filter
    if (filters.language) {
      filtered = filtered.filter(repo => repo.language === filters.language);
    }

    // Sort
    filtered.sort((a, b) => {
      switch (filters.sortBy) {
        case 'stars':
          return b.stargazers_count - a.stargazers_count;
        case 'name':
          return a.name.localeCompare(b.name);
        case 'updated':
        default:
          return new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime();
      }
    });

    // Show only filter
    if (filters.showOnly === 'featured') {
      filtered = filtered.filter(repo => repo.stargazers_count > 0);
    } else if (filters.showOnly === 'recent') {
      const thirtyDaysAgo = new Date();
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
      filtered = filtered.filter(repo => new Date(repo.updated_at) > thirtyDaysAgo);
    }

    setFilteredRepos(filtered);
  }, [repos]);

  const getLanguageColor = (language: string | null) => {
    const colors: { [key: string]: string } = {
      'JavaScript': 'from-yellow-400 to-yellow-600',
      'TypeScript': 'from-blue-400 to-blue-600',
      'Python': 'from-green-400 to-green-600',
      'Java': 'from-orange-400 to-orange-600',
      'C++': 'from-blue-500 to-blue-700',
      'C#': 'from-purple-400 to-purple-600',
      'Go': 'from-cyan-400 to-cyan-600',
      'Rust': 'from-orange-500 to-orange-700',
      'PHP': 'from-indigo-400 to-indigo-600',
      'Ruby': 'from-red-400 to-red-600',
      'Swift': 'from-orange-400 to-orange-600',
      'Kotlin': 'from-purple-500 to-purple-700',
      'HTML': 'from-orange-500 to-orange-700',
      'CSS': 'from-blue-500 to-blue-700',
      'Vue': 'from-green-500 to-green-700',
      'React': 'from-cyan-500 to-cyan-700',
      'Next.js': 'from-gray-600 to-gray-800',
      'Node.js': 'from-green-600 to-green-800',
    };
    
    return colors[language || ''] || 'from-gray-400 to-gray-600';
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
    });
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
    },
  };

  if (loading) {
    return (
      <section id="projects" className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900"></div>
        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center">
            <h2 className="section-heading">Featured Projects</h2>
            <div className="flex justify-center items-center space-x-4 mt-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-500"></div>
              <span className="text-gray-400">Loading projects from GitHub...</span>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section id="projects" className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900"></div>
        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center">
            <h2 className="section-heading">Featured Projects</h2>
            <div className="mt-8 p-6 bg-red-900/20 border border-red-500/30 rounded-xl">
              <p className="text-red-400">Error loading projects: {error}</p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="projects" className="py-24 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900"></div>
      <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-indigo-500/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl"></div>

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="section-heading">Featured Projects</h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            A showcase of my latest work and contributions. Projects are automatically synced from GitHub.
          </p>
        </motion.div>

        <motion.div
          className="max-w-7xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <ProjectFilters onFilterChange={handleFilterChange} />
          
          {filteredRepos.length === 0 ? (
            <div className="text-center py-12">
              <Code className="w-16 h-16 text-gray-600 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-white mb-2">No Projects Found</h3>
              <p className="text-gray-400">No public repositories found on GitHub.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredRepos.map((repo) => (
                <motion.div
                  key={repo.id}
                  className="card group relative overflow-hidden"
                  variants={itemVariants}
                  whileHover={{ scale: 1.02, y: -5 }}
                  transition={{ duration: 0.3 }}
                >
                  {/* Project Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-white group-hover:text-indigo-400 transition-colors mb-2">
                        {repo.name}
                      </h3>
                      <p className="text-gray-400 text-sm line-clamp-2">
                        {repo.description || 'No description available'}
                      </p>
                    </div>
                    <Github className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors flex-shrink-0 ml-2" />
                  </div>

                  {/* Language Badge */}
                  {repo.language && (
                    <div className="mb-4">
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gradient-to-r ${getLanguageColor(repo.language)} text-white`}>
                        {repo.language}
                      </span>
                    </div>
                  )}

                  {/* Topics */}
                  {repo.topics && repo.topics.length > 0 && (
                    <div className="mb-4 flex flex-wrap gap-2">
                      {repo.topics.slice(0, 3).map((topic, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 bg-gray-700/50 text-gray-300 text-xs rounded-md"
                        >
                          {topic}
                        </span>
                      ))}
                      {repo.topics.length > 3 && (
                        <span className="px-2 py-1 bg-gray-700/50 text-gray-300 text-xs rounded-md">
                          +{repo.topics.length - 3}
                        </span>
                      )}
                    </div>
                  )}

                  {/* Stats */}
                  <div className="flex items-center justify-between text-sm text-gray-400 mb-6">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-1">
                        <Star className="w-4 h-4" />
                        <span>{repo.stargazers_count}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <GitFork className="w-4 h-4" />
                        <span>{repo.forks_count}</span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Calendar className="w-4 h-4" />
                      <span>{formatDate(repo.updated_at)}</span>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex space-x-3">
                    <motion.a
                      href={repo.html_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 flex items-center justify-center space-x-2 px-4 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-sm font-medium rounded-lg hover:from-indigo-700 hover:to-purple-700 transition-all duration-300"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Github className="w-4 h-4" />
                      <span>Code</span>
                    </motion.a>
                    
                    {repo.homepage && (
                      <motion.a
                        href={repo.homepage}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 flex items-center justify-center space-x-2 px-4 py-2 bg-transparent border border-indigo-500 text-indigo-400 text-sm font-medium rounded-lg hover:bg-indigo-500 hover:text-white transition-all duration-300"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <ExternalLink className="w-4 h-4" />
                        <span>Live</span>
                      </motion.a>
                    )}
                  </div>

                  {/* Hover Effect Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                </motion.div>
              ))}
            </div>
          )}

          {/* View More Button */}
          <motion.div
            className="text-center mt-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            viewport={{ once: true }}
          >
            <motion.a
              href={`https://github.com/${GITHUB_USERNAME}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-2 px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-full hover:from-indigo-700 hover:to-purple-700 transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Github className="w-5 h-5" />
              <span>View All Projects on GitHub</span>
              <ExternalLink className="w-4 h-4" />
            </motion.a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;
