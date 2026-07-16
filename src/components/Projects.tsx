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

async function getRepos(): Promise<Repo[]> {
  try {
    const res = await fetch(
      `https://api.github.com/users/${siteConfig.github.username}/repos?sort=updated&per_page=6&type=public`,
      { next: { revalidate: 3600 } }
    );
    if (!res.ok) return [];
    const data: Repo[] = await res.json();
    return data.filter((r) => !r.fork && !r.private);
  } catch { return []; }
}

const Projects = async () => {
  const repos = await getRepos();

  return (
    <section id="projects">
      <div className="flex items-baseline justify-between mb-6">
        <h2 className="font-display">Projects</h2>
        <a href={siteConfig.github.url} target="_blank" rel="noopener noreferrer" className="text-xs text-ink-faint hover:text-accent transition-colors">
          All on GitHub &rarr;
        </a>
      </div>

      {repos.length === 0 ? (
        <p className="text-sm text-ink-faint">No repos loaded.</p>
      ) : (
        <div className="grid sm:grid-cols-2 gap-3">
          {repos.map((repo) => (
            <a
              key={repo.id}
              href={repo.html_url}
              target="_blank"
              rel="noopener noreferrer"
              className="group block p-4 rounded border border-rule hover:border-accent/30 transition-colors"
            >
              <h3 className="text-sm font-semibold group-hover:text-accent transition-colors mb-1 truncate">{repo.name}</h3>
              <p className="text-xs text-ink-muted line-clamp-2 min-h-[2rem]">{repo.description || 'No description'}</p>
              <div className="flex items-center gap-2 mt-2 text-[11px] text-ink-faint">
                {repo.language && <span>{repo.language}</span>}
                {repo.stargazers_count > 0 && <span>★ {repo.stargazers_count}</span>}
              </div>
            </a>
          ))}
        </div>
      )}
    </section>
  );
};

export default Projects;
