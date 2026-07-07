import { certificationGroups } from '@/data/certifications';

const Certifications = () => {
  return (
    <section id="certifications" className="py-20">
      <div className="container">
        <h2 className="text-2xl font-bold mb-10">Certifications</h2>

        <div className="space-y-8 max-w-3xl">
          {certificationGroups.map((group) => (
            <div key={group.title}>
              <h3 className="text-sm font-semibold text-fg-muted mb-3 flex items-center gap-2">
                <span aria-hidden="true">{group.icon}</span>
                {group.title}
              </h3>
              <ul className="space-y-2">
                {group.certifications.map((cert, i) => (
                  <li key={i} className="flex items-baseline justify-between gap-4 py-1.5 border-b border-border last:border-0">
                    <a
                      href={cert.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm hover:text-accent transition-colors leading-snug"
                    >
                      {cert.name}
                    </a>
                    <span className="font-mono text-xs text-fg-faint whitespace-nowrap shrink-0">
                      {cert.issued.split(' |')[0]}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Certifications;
