import { education } from '@/data/education';

const Education = () => {
  return (
    <section id="education" className="py-20">
      <div className="container">
        <h2 className="text-2xl font-bold mb-10">Education</h2>

        <div className="space-y-6 max-w-3xl">
          {education.map((edu) => (
            <div key={edu.institution}>
              <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1">
                <h3 className="text-base font-semibold">{edu.institution}</h3>
                {edu.duration && (
                  <span className="font-mono text-xs text-fg-faint">{edu.duration}</span>
                )}
              </div>
              <p className="text-sm text-fg-muted mt-1">{edu.degree}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Education;
