'use client';

import { motion } from 'framer-motion';
import { Github, ExternalLink, Star, GitFork, Calendar, Code } from 'lucide-react';
import { useState, useEffect, useCallback } from 'react';
import ProjectFilters from './ProjectFilters';
import { siteConfig } from '@/config/site';

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

const languageColors: Record<string, string> = {
  JavaScript: '#f1e05a',
  TypeScript: '#3178c6',
  Python: '#3572A5',
  Java: '#b07219',
  'C++': '#f34b7d',
  Go: '#00ADD8',
  Rust: '#dea584',
  PHP: '#4F5D95',
  Ruby: '#701516',
  HTML: '#e34c26',
  CSS: '#563d7c',
};

const Projects = () => {
  const [repos, setRepos] = useState<GitHubRepo[]>([]);
  const [filteredRepos, setFilteredRepos] = useState<GitHubRepo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRepos = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `https://api.github.com/users/${siteConfig.github.username}/repos?sort=updated&per_page=12&type=public`,
          { headers: { Accept: 'application/vnd.github.v3+json' } }
        );

        if (!response.ok) throw new Error(`GitHub API error: ${response.status}`);

        const data = await response.json();
        const filtered = data
          .filter((repo: GitHubRepo) => !repo.fork && !repo.private)
          .sort((a: GitHubRepo, b: GitHubRepo) => b.stargazers_count - a.stargazers_count);

        setRepos(filtered);
        setFilteredRepos(filtered);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchRepos();
  }, []);

  const handleFilterChange = useCallback(
    (filters: { search: string; language: string; sortBy: 'updated' | 'stars' | 'name'; showOnly: 'all' | 'featured' | 'recent' }) => {
      let filtered = [...repos];

      if (filters.search) {
        const q = filters.search.toLowerCase();
        filtered = filtered.filter(
          (r) => r.name.toLowerCase().includes(q) || r.description?.toLowerCase().includes(q)
        );
      }
      if (filters.language) filtered = filtered.filter((r) => r.language === filters.language);

      filtered.sort((a, b) => {
        if (filters.sortBy === 'stars') return b.stargazers_count - a.stargazers_count;
        if (filters.sortBy === 'name') return a.name.localeCompare(b.name);
        return new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime();
      });

      if (filters.showOnly === 'featured') filtered = filtered.filter((r) => r.stargazers_count > 0);
      else if (filters.showOnly === 'recent') {
        const cutoff = Date.now() - 30 * 24 * 60 * 60 * 1000;
        filtered = filtered.filter((r) => new Date(r.updated_at).getTime() > cutoff);
      }

      setFilteredRepos(filtered);
    },
    [repos]
  );

  const formatDate = (d: string) =>
    new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short' }).format(new Date(d));

  // Loading state
  if (loading) {
    return (
      <section id="projects" className="py-24">
        <div className="container mx-auto px-6">
          <div className="text-center">
            <span className="eyebrow justify-center">Open Source</span>
            <h2 className="section-heading mt-4">Featured Projects</h2>
            <div className="flex justify-center items-center gap-3 mt-8">
              <span className="w-5 h-5 border-2 border-primary border-t-transparent rounded-full animate-spin" aria-hidden="true" />
              <span className="text-muted">Loading projects from GitHub&hellip;</span>
            </div>
          </div>
        </div>
      </section>
    );
  }

  // Error state
  if (error) {
    return (
      <section id="projects" className="py-24">
        <div className="container mx-auto px-6">
          <div className="text-center">
            <span className="eyebrow justify-center">Open Source</span>
            <h2 className="section-heading mt-4">Featured Projects</h2>
            <div className="mt-8 p-5 bg-red-500/10 border border-red-500/25 rounded-xl text-red-400 text-sm">
              Error loading projects: {error}
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="projects" className="py-24 relative overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <span className="eyebrow justify-center">Open Source</span>
          <h2 className="section-heading mt-4">Featured Projects</h2>
          <p className="section-subtitle mt-4 max-w-2xl mx-auto">
            A showcase of my latest work and contributions. Projects are automatically synced from
            GitHub.
          </p>
        </motion.div>

        <div className="max-w-6xl mx-auto">
          <ProjectFilters onFilterChange={handleFilterChange} />

          {filteredRepos.length === 0 ? (
            <div className="text-center py-16">
              <Code className="w-12 h-12 text-muted mx-auto mb-4" aria-hidden="true" />
              <h3 className="text-xl font-bold text-foreground mb-2">No Projects Found</h3>
              <p className="text-muted">Try adjusting your filters.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
              {filteredRepos.map((repo, i) => (
                <motion.article
                  key={repo.id}
                  className="card group relative overflow-hidden flex flex-col"
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: i * 0.05 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -4 }}
                >
                  {/* Header */}
                  <div className="flex items-start justify-between gap-2 mb-3">
                    <h3 className="text-base font-bold text-foreground group-hover:text-primary transition-colors line-clamp-1">
                      {repo.name}
                    </h3>
                    <Github className="w-4 h-4 text-muted flex-shrink-0 mt-0.5" aria-hidden="true" />
                  </div>

                  <p className="text-sm text-muted line-clamp-2 mb-4 flex-1">
                    {repo.description || 'No description available'}
                  </p>

                  {/* Language + topics */}
                  <div className="flex flex-wrap items-center gap-2 mb-4">
                    {repo.language && (
                      <span className="inline-flex items-center gap-1.5 text-xs text-muted-strong">
                        <span
                          className="w-3 h-3 rounded-full"
                          style={{ backgroundColor: languageColors[repo.language] || 'var(--muted)' }}
                          aria-hidden="true"
                        />
                        {repo.language}
                      </span>
                    )}
                    {repo.topics?.slice(0, 2).map((topic) => (
                      <span key={topic} className="px-2 py-0.5 rounded-md bg-primary/10 text-primary text-xs">
                        {topic}
                      </span>
                    ))}
                  </div>

                  {/* Stats */}
                  <div className="flex items-center gap-4 text-xs text-muted mb-5">
                    <span className="inline-flex items-center gap-1">
                      <Star className="w-3.5 h-3.5" aria-hidden="true" />
                      {repo.stargazers_count}
                    </span>
                    <span className="inline-flex items-center gap-1">
                      <GitFork className="w-3.5 h-3.5" aria-hidden="true" />
                      {repo.forks_count}
                    </span>
                    <span className="inline-flex items-center gap-1 ml-auto">
                      <Calendar className="w-3.5 h-3.5" aria-hidden="true" />
                      {formatDate(repo.updated_at)}
                    </span>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-3 mt-auto">
                    <a
                      href={repo.html_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-primary text-sm flex-1 py-2"
                      aria-label={`View ${repo.name} source on GitHub`}
                    >
                      <Github className="w-4 h-4" aria-hidden="true" />
                      Code
                    </a>
                    {repo.homepage && (
                      <a
                        href={repo.homepage}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-secondary text-sm flex-1 py-2"
                        aria-label={`View ${repo.name} live demo`}
                      >
                        <ExternalLink className="w-4 h-4" aria-hidden="true" />
                        Live
                      </a>
                    )}
                  </div>
                </motion.article>
              ))}
            </div>
          )}

          {/* View all on GitHub */}
          <motion.div
            className="text-center mt-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <a
              href={siteConfig.github.url}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary"
            >
              <Github className="w-5 h-5" aria-hidden="true" />
              View All Projects on GitHub
              <ExternalLink className="w-4 h-4" aria-hidden="true" />
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Projects;
