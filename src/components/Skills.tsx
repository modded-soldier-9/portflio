const groups = [
  { title: 'Security', skills: ['Threat Detection', 'Vulnerability Assessment', 'Penetration Testing', 'Network Security', 'API Security', 'Security Auditing'] },
  { title: 'Cloud & Ops', skills: ['AWS', 'Cloud Architecture', 'Linux', 'System Administration', 'Disaster Recovery'] },
  { title: 'Development', skills: ['Python', 'JavaScript', 'TypeScript', 'Next.js', 'React', 'SQL', 'API Development', 'HTML/CSS'] },
];

const Skills = () => {
  return (
    <section id="skills">
      <h2 className="font-display mb-6">Skills</h2>
      <div className="space-y-5">
        {groups.map((g) => (
          <div key={g.title}>
            <h3 className="font-mono text-[11px] text-ink-faint uppercase tracking-wide mb-2">{g.title}</h3>
            <div className="flex flex-wrap gap-1.5">
              {g.skills.map((s) => (
                <span key={s} className="px-2.5 py-1 text-xs rounded border border-rule text-ink-muted">
                  {s}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Skills;
