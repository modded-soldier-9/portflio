'use client';

import { useState, useEffect } from 'react';
import { siteConfig } from '@/config/site';

interface Repo {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  language: string | null;
  stargazers_count: number;
  fork: boolean;
  private: boolean;
}

const Projects = () => {
  const [repos, setRepos] = useState<Repo[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`https://api.github.com/users/${siteConfig.github.username}/repos?sort=updated&per_page=6&type=public`)
      .then((r) => r.json())
      .then((data) => setRepos((data as Repo[]).filter((r) => !r.fork && !r.private)))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  return (
    <section id="projects">
      <div className="flex items-baseline justify-between mb-6">
        <h2 className="font-display">Projects</h2>
        <a href={siteConfig.github.url} target="_blank" rel="noopener noreferrer" className="text-xs text-ink-faint hover:text-accent transition-colors">
          GitHub &rarr;
        </a>
      </div>

      {loading ? (
        <p className="text-sm text-ink-faint">Loading&hellip;</p>
      ) : (
        <div className="grid sm:grid-cols-2 gap-3 stagger">
          {repos.map((repo) => (
            <a
              key={repo.id}
              href={repo.html_url}
              target="_blank"
              rel="noopener noreferrer"
              className="group block p-4 rounded border border-rule hover:border-accent/30 transition-colors bg-paper-3/50"
            >
              <h3 className="text-sm font-semibold group-hover:text-accent transition-colors mb-1 truncate">{repo.name}</h3>
              <p className="text-xs text-ink-muted line-clamp-2 min-h-[2rem]">{repo.description || 'No description'}</p>
              <div className="flex items-center gap-2 mt-2 text-[11px] text-ink-faint">
                {repo.language && <span>{repo.language}</span>}
                {repo.stargazers_count > 0 && <span>&starf; {repo.stargazers_count}</span>}
              </div>
            </a>
          ))}
        </div>
      )}
    </section>
  );
};

export default Projects;
