import { education } from '@/data/education';

const Education = () => {
  return (
    <section id="education">
      <h2 className="font-display mb-6">Education</h2>
      <div className="space-y-4 stagger">
        {education.map((edu) => (
          <div key={edu.institution}>
            <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-0.5">
              <h3 className="text-base font-semibold">{edu.institution}</h3>
              {edu.duration && (
                <span className="font-mono text-[11px] text-ink-faint">{edu.duration}</span>
              )}
            </div>
            <p className="text-sm text-ink-muted mt-0.5">{edu.degree}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Education;
