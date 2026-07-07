import { experiences } from '@/data/experience';

const Experience = () => {
  return (
    <section id="experience" className="py-20">
      <div className="container">
        <h2 className="text-2xl font-bold mb-10">Experience</h2>

        <div className="space-y-8 max-w-3xl">
          {experiences.map((exp) => (
            <article key={exp.id} className="relative pl-6 border-l-2 border-border">
              <div className="absolute left-[-5px] top-1.5 w-2 h-2 rounded-full bg-accent" aria-hidden="true" />

              <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1 mb-2">
                <h3 className="text-lg font-semibold">{exp.title}</h3>
                <span className="font-mono text-xs text-fg-faint whitespace-nowrap">{exp.duration}</span>
              </div>

              <p className="text-sm text-accent font-medium mb-2">{exp.company} &middot; {exp.type}</p>
              <p className="text-sm text-fg-muted leading-relaxed mb-3">{exp.description}</p>

              <div className="flex flex-wrap gap-1.5">
                {exp.skills.map((skill) => (
                  <span key={skill} className="px-2 py-0.5 text-xs rounded bg-accent-dim text-accent border border-accent/20">
                    {skill}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;
