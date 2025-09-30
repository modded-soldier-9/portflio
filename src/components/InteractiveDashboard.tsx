'use client';

import { motion } from 'framer-motion';
import { Github, Star, GitFork, Calendar, Code, TrendingUp, Activity } from 'lucide-react';
import { useState, useEffect } from 'react';

interface GitHubRepo {
  id: number;
  name: string;
  full_name: string;
  description: string | null;
  html_url: string;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  fork: boolean;
}

interface GitHubStats {
  totalRepos: number;
  totalStars: number;
  totalForks: number;
  totalCommits: number;
  languages: { [key: string]: number };
  recentActivity: Array<{
    date: string;
    commits: number;
  }>;
  topRepos: Array<{
    name: string;
    stars: number;
    forks: number;
    language: string;
    url: string;
  }>;
}

interface InteractiveDashboardProps {
  className?: string;
}

const InteractiveDashboard = ({ className = '' }: InteractiveDashboardProps) => {
  const [stats, setStats] = useState<GitHubStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedPeriod, setSelectedPeriod] = useState<'7d' | '30d' | '90d' | '1y'>('30d');

  const GITHUB_USERNAME = 'modded-soldier-9';

  useEffect(() => {
    const fetchGitHubStats = async () => {
      try {
        setLoading(true);
        
        // Fetch user data
        const userResponse = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}`);
        await userResponse.json();
        
        // Fetch repositories
        const reposResponse = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=100`);
        const reposData = await reposResponse.json();
        
        // Calculate language distribution
        const languageStats: { [key: string]: number } = {};
        let totalStars = 0;
        let totalForks = 0;
        
        reposData.forEach((repo: GitHubRepo) => {
          if (repo.language) {
            languageStats[repo.language] = (languageStats[repo.language] || 0) + 1;
          }
          totalStars += repo.stargazers_count;
          totalForks += repo.forks_count;
        });
        
        // Get top repositories
        const topRepos = reposData
          .filter((repo: GitHubRepo) => !repo.fork)
          .sort((a: GitHubRepo, b: GitHubRepo) => b.stargazers_count - a.stargazers_count)
          .slice(0, 5)
          .map((repo: GitHubRepo) => ({
            name: repo.name,
            stars: repo.stargazers_count,
            forks: repo.forks_count,
            language: repo.language || 'Unknown',
            url: repo.html_url
          }));
        
        // Use empty activity data (no mock data)
        const recentActivity: Array<{ date: string; commits: number }> = [];
        
        setStats({
          totalRepos: reposData.filter((repo: GitHubRepo) => !repo.fork).length,
          totalStars,
          totalForks,
          totalCommits: 0, // No mock data
          languages: languageStats,
          recentActivity,
          topRepos
        });
      } catch (error) {
        console.error('Error fetching GitHub stats:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchGitHubStats();
  }, []);


  const getLanguageColor = (language: string) => {
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
    
    return colors[language] || 'from-gray-400 to-gray-600';
  };

  if (loading) {
    return (
      <div className={`text-center py-12 ${className}`}>
        <div className="flex justify-center items-center space-x-4">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-500"></div>
          <span className="text-gray-400">Loading GitHub statistics...</span>
        </div>
      </div>
    );
  }

  if (!stats) {
    return (
      <div className={`text-center py-12 ${className}`}>
        <div className="text-gray-400">Unable to load GitHub statistics</div>
      </div>
    );
  }

  return (
    <div className={`space-y-8 ${className}`}>
      {/* Header */}
      <div className="text-center">
        <h3 className="text-3xl font-bold gradient-text mb-4">GitHub Activity Dashboard</h3>
        <p className="text-gray-400 max-w-2xl mx-auto">
          Real-time insights into coding activity, project contributions, and development trends
        </p>
      </div>

      {/* Period Selector */}
      <div className="flex justify-center">
        <div className="flex bg-gray-800/50 rounded-lg p-1">
          {[
            { value: '7d', label: '7 Days' },
            { value: '30d', label: '30 Days' },
            { value: '90d', label: '90 Days' },
            { value: '1y', label: '1 Year' }
          ].map((period) => (
            <motion.button
              key={period.value}
              onClick={() => setSelectedPeriod(period.value as '7d' | '30d' | '90d' | '1y')}
              className={`px-4 py-2 rounded-md text-sm transition-all duration-300 ${
                selectedPeriod === period.value
                  ? 'bg-indigo-500 text-white'
                  : 'text-gray-400 hover:text-white'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {period.label}
            </motion.button>
          ))}
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <motion.div
          className="card text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="w-12 h-12 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center mx-auto mb-4">
            <Github className="w-6 h-6 text-white" />
          </div>
          <div className="text-3xl font-bold text-white mb-2">{stats.totalRepos}</div>
          <div className="text-gray-400">Repositories</div>
        </motion.div>

        <motion.div
          className="card text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <div className="w-12 h-12 bg-gradient-to-r from-yellow-500 to-orange-600 rounded-lg flex items-center justify-center mx-auto mb-4">
            <Star className="w-6 h-6 text-white" />
          </div>
          <div className="text-3xl font-bold text-white mb-2">{stats.totalStars}</div>
          <div className="text-gray-400">Total Stars</div>
        </motion.div>

        <motion.div
          className="card text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-600 rounded-lg flex items-center justify-center mx-auto mb-4">
            <GitFork className="w-6 h-6 text-white" />
          </div>
          <div className="text-3xl font-bold text-white mb-2">{stats.totalForks}</div>
          <div className="text-gray-400">Total Forks</div>
        </motion.div>

        <motion.div
          className="card text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-600 rounded-lg flex items-center justify-center mx-auto mb-4">
            <Activity className="w-6 h-6 text-white" />
          </div>
          <div className="text-3xl font-bold text-white mb-2">{stats.totalCommits}</div>
          <div className="text-gray-400">Total Commits</div>
        </motion.div>
      </div>

      {/* Language Distribution */}
      <motion.div
        className="card"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        <h4 className="text-xl font-bold text-white mb-6 flex items-center">
          <Code className="w-5 h-5 mr-2 text-indigo-400" />
          Language Distribution
        </h4>
        <div className="space-y-4">
          {Object.entries(stats.languages)
            .sort(([,a], [,b]) => b - a)
            .slice(0, 8)
            .map(([language, count], index) => (
              <div key={language} className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className={`w-3 h-3 rounded-full bg-gradient-to-r ${getLanguageColor(language)}`} />
                  <span className="text-white font-medium">{language}</span>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="w-32 bg-gray-700 rounded-full h-2">
                    <motion.div
                      className={`h-2 bg-gradient-to-r ${getLanguageColor(language)} rounded-full`}
                      initial={{ width: 0 }}
                      animate={{ width: `${(count / Math.max(...Object.values(stats.languages))) * 100}%` }}
                      transition={{ duration: 1, delay: index * 0.1 }}
                    />
                  </div>
                  <span className="text-gray-400 text-sm w-8 text-right">{count}</span>
                </div>
              </div>
            ))}
        </div>
      </motion.div>

      {/* Top Repositories */}
      <motion.div
        className="card"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.5 }}
      >
        <h4 className="text-xl font-bold text-white mb-6 flex items-center">
          <TrendingUp className="w-5 h-5 mr-2 text-indigo-400" />
          Top Repositories
        </h4>
        <div className="space-y-4">
          {stats.topRepos.map((repo, index) => (
            <motion.a
              key={repo.name}
              href={repo.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between p-4 bg-gray-800/50 rounded-lg hover:bg-gray-700/50 transition-all duration-300 group"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: 1.02 }}
            >
              <div className="flex items-center space-x-4">
                <div className={`w-3 h-3 rounded-full bg-gradient-to-r ${getLanguageColor(repo.language)}`} />
                <div>
                  <div className="text-white font-medium group-hover:text-indigo-400 transition-colors">
                    {repo.name}
                  </div>
                  <div className="text-gray-400 text-sm">{repo.language}</div>
                </div>
              </div>
              <div className="flex items-center space-x-4 text-sm text-gray-400">
                <div className="flex items-center space-x-1">
                  <Star className="w-4 h-4" />
                  <span>{repo.stars}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <GitFork className="w-4 h-4" />
                  <span>{repo.forks}</span>
                </div>
              </div>
            </motion.a>
          ))}
        </div>
      </motion.div>

      {/* Activity Heatmap */}
      <motion.div
        className="card"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.6 }}
      >
        <h4 className="text-xl font-bold text-white mb-6 flex items-center">
          <Calendar className="w-5 h-5 mr-2 text-indigo-400" />
          Activity Heatmap
        </h4>
        <div className="grid grid-cols-7 gap-1 max-w-md mx-auto">
          {stats.recentActivity.map((day, index) => (
            <motion.div
              key={day.date}
              className={`w-3 h-3 rounded-sm ${
                day.commits === 0 ? 'bg-gray-800' :
                day.commits < 3 ? 'bg-green-900' :
                day.commits < 6 ? 'bg-green-700' :
                day.commits < 9 ? 'bg-green-500' :
                'bg-green-300'
              }`}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: index * 0.01 }}
              title={`${day.date}: ${day.commits} commits`}
            />
          ))}
        </div>
        <div className="flex items-center justify-center mt-4 text-sm text-gray-400">
          <span className="mr-2">Less</span>
          <div className="flex space-x-1">
            <div className="w-3 h-3 bg-gray-800 rounded-sm"></div>
            <div className="w-3 h-3 bg-green-900 rounded-sm"></div>
            <div className="w-3 h-3 bg-green-700 rounded-sm"></div>
            <div className="w-3 h-3 bg-green-500 rounded-sm"></div>
            <div className="w-3 h-3 bg-green-300 rounded-sm"></div>
          </div>
          <span className="ml-2">More</span>
        </div>
      </motion.div>
    </div>
  );
};

export default InteractiveDashboard;
