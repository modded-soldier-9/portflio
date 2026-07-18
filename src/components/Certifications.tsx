import { certificationGroups } from '@/data/certifications';

const Certifications = () => {
  return (
    <section id="certifications">
      <h2 className="font-display mb-6">Certifications</h2>
      <div className="space-y-6">
        {certificationGroups.map((group) => (
          <div key={group.title}>
            <h3 className="font-mono text-xs text-ink-faint uppercase tracking-wide mb-2">
              {group.title}
            </h3>
            <ul className="space-y-2">
              {group.certifications.map((cert, i) => (
                <li key={i} className="group">
                  <a
                    href={cert.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block sm:flex sm:items-baseline sm:justify-between sm:gap-4 text-sm hover:text-ink transition-colors leading-snug"
                  >
                    <span className="group-hover:underline">{cert.name}</span>
                    <span className="block sm:inline font-mono text-[10px] text-ink-faint whitespace-nowrap mt-0.5 sm:mt-0 shrink-0">
                      {cert.issued.split(' |')[0]}
                    </span>
                  </a>
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
