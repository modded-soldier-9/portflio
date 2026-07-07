'use client';

import { useState, useEffect } from 'react';
import { siteConfig } from '@/config/site';

interface Repo {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  updated_at: string;
  fork: boolean;
  private: boolean;
}

const langDot: Record<string, string> = {
  JavaScript: '#f1e05a', TypeScript: '#3178c6', Python: '#3572A5',
  HTML: '#e34c26', CSS: '#563d7c', Java: '#b07219', Go: '#00ADD8',
};

const Projects = () => {
  const [repos, setRepos] = useState<Repo[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`https://api.github.com/users/${siteConfig.github.username}/repos?sort=updated&per_page=9&type=public`)
      .then((r) => r.json())
      .then((data) => {
        const filtered = (data as Repo[]).filter((r) => !r.fork && !r.private);
        setRepos(filtered);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  return (
    <section id="projects" className="py-20">
      <div className="container">
        <div className="flex items-baseline justify-between mb-10">
          <h2 className="text-2xl font-bold">Projects</h2>
          <a
            href={siteConfig.github.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-fg-muted hover:text-accent transition-colors"
          >
            View all on GitHub &rarr;
          </a>
        </div>

        {loading ? (
          <p className="text-sm text-fg-faint">Loading&hellip;</p>
        ) : repos.length === 0 ? (
          <p className="text-sm text-fg-faint">No public repositories found.</p>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {repos.map((repo) => (
              <a
                key={repo.id}
                href={repo.html_url}
                target="_blank"
                rel="noopener noreferrer"
                className="group block p-5 rounded-xl border border-border hover:border-accent/40 transition-colors bg-bg-raised"
              >
                <h3 className="text-sm font-semibold mb-1 group-hover:text-accent transition-colors truncate">
                  {repo.name}
                </h3>
                <p className="text-xs text-fg-muted line-clamp-2 mb-3 min-h-[2.5rem]">
                  {repo.description || 'No description'}
                </p>
                <div className="flex items-center gap-3 text-xs text-fg-faint">
                  {repo.language && (
                    <span className="inline-flex items-center gap-1">
                      <span
                        className="w-2.5 h-2.5 rounded-full"
                        style={{ backgroundColor: langDot[repo.language] || '#8b949e' }}
                        aria-hidden="true"
                      />
                      {repo.language}
                    </span>
                  )}
                  {repo.stargazers_count > 0 && <span>&starf; {repo.stargazers_count}</span>}
                </div>
              </a>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Projects;
