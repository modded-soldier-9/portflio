const skillGroups = [
  {
    title: 'Cybersecurity',
    skills: ['Threat Detection', 'Security Protocols', 'Vulnerability Assessment', 'Network Security', 'Risk Management', 'Security Audits', 'API Security'],
  },
  {
    title: 'Cloud & Infrastructure',
    skills: ['AWS', 'Cloud Architecture', 'System Administration', 'IT Management', 'Disaster Recovery', 'Infrastructure'],
  },
  {
    title: 'Development',
    skills: ['Python', 'JavaScript', 'TypeScript', 'HTML/CSS', 'SQL', 'Linux', 'API Development', 'Next.js'],
  },
];

const Skills = () => {
  return (
    <section id="skills" className="py-20">
      <div className="container">
        <h2 className="text-2xl font-bold mb-10">Skills</h2>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-4xl">
          {skillGroups.map((group) => (
            <div key={group.title}>
              <h3 className="text-sm font-semibold text-accent mb-3">{group.title}</h3>
              <div className="flex flex-wrap gap-2">
                {group.skills.map((skill) => (
                  <span
                    key={skill}
                    className="px-2.5 py-1 text-xs rounded-md bg-bg-raised border border-border text-fg-muted"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
