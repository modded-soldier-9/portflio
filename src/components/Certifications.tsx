import { certificationGroups } from '@/data/certifications';

const Certifications = () => {
  return (
    <section id="certifications">
      <h2 className="font-display mb-6">Certifications</h2>
      <div className="space-y-6 stagger">
        {certificationGroups.map((group) => (
          <div key={group.title}>
            <h3 className="font-mono text-xs text-ink-faint uppercase tracking-wide mb-2">
              {group.icon} {group.title}
            </h3>
            <ul className="space-y-1.5">
              {group.certifications.map((cert, i) => (
                <li key={i} className="flex items-baseline justify-between gap-3">
                  <a
                    href={cert.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm hover:text-accent transition-colors leading-snug"
                  >
                    {cert.name}
                  </a>
                  <span className="font-mono text-[10px] text-ink-faint whitespace-nowrap shrink-0">
                    {cert.issued.split(' |')[0]}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Certifications;
