import { projects } from '@/data/projects';
import { siteConfig } from '@/config/site';

const Projects = () => {
  return (
    <section id="projects">
      <div className="flex items-baseline justify-between mb-6">
        <h2 className="font-display">Projects</h2>
        <a href={siteConfig.github.url} target="_blank" rel="noopener noreferrer" className="text-xs text-ink-faint hover:text-ink transition-colors">
          All on GitHub &rarr;
        </a>
      </div>

      <div className="grid sm:grid-cols-2 gap-3">
        {projects.map((project) => (
          <div
            key={project.id}
            className="group block p-4 rounded border border-rule hover:border-ink-faint transition-colors"
          >
            <div className="flex items-baseline justify-between mb-1">
              <h3 className="text-sm font-semibold group-hover:text-ink transition-colors truncate">{project.name}</h3>
              <span className="text-[10px] text-ink-faint font-mono shrink-0 ml-2">{project.type}</span>
            </div>
            <p className="text-xs text-ink-muted line-clamp-2 min-h-[2rem]">{project.description}</p>
            <div className="flex items-center gap-2 mt-2 text-[11px] text-ink-faint">
              {project.tech.map((t) => (
                <span key={t}>{t}</span>
              ))}
            </div>
            <div className="flex items-center gap-3 mt-2">
              {project.liveUrl && (
                <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="text-[11px] text-ink-faint hover:text-ink transition-colors underline">
                  Live ↗
                </a>
              )}
              {project.githubUrl && (
                <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="text-[11px] text-ink-faint hover:text-ink transition-colors underline">
                  Source ↗
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Projects;
