import { experiences } from '@/data/experience';

const Experience = () => {
  return (
    <section id="experience">
      <h2 className="font-display mb-6">Experience</h2>
      <div className="space-y-6 stagger">
        {experiences.map((exp) => (
          <article key={exp.id} className="relative pl-5 border-l border-rule">
            <span className="absolute left-[-3.5px] top-2 w-[6px] h-[6px] rounded-full bg-accent" aria-hidden="true" />
            <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-0.5 mb-1">
              <h3 className="text-base font-semibold">{exp.title}</h3>
              <span className="font-mono text-[11px] text-ink-faint">{exp.duration}</span>
            </div>
            <p className="text-sm text-accent mb-1.5">{exp.company}</p>
            <p className="text-sm text-ink-muted leading-relaxed">{exp.description}</p>
            {exp.skills.length > 0 && (
              <div className="flex flex-wrap gap-1.5 mt-2">
                {exp.skills.map((s) => (
                  <span key={s} className="px-2 py-0.5 text-[11px] rounded bg-accent-dim text-accent border border-accent/15">
                    {s}
                  </span>
                ))}
              </div>
            )}
          </article>
        ))}
      </div>
    </section>
  );
};

export default Experience;
