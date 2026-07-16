import Image from 'next/image';
import { siteConfig } from '@/config/site';
import SocialLinks from './SocialLinks';

const Hero = () => {
  return (
    <section id="home">
      <div className="grid sm:grid-cols-[1fr_auto] gap-6 items-start">
        <div className="space-y-4">
          <p className="font-mono text-[11px] text-[var(--color-ink-faint)] tracking-wider uppercase">
            {siteConfig.role}
          </p>

          <h1>{siteConfig.name}</h1>

          <p className="text-[15px] text-[var(--color-ink-muted)] leading-relaxed max-w-lg">
            {siteConfig.tagline}
          </p>

          {/* Quick stats for recruiters */}
          <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-[var(--color-ink-faint)] font-mono">
            <span>8+ yrs experience</span>
            <span>15+ certifications</span>
            <span>BSc CS &amp; IT</span>
          </div>

          <div className="flex flex-wrap gap-3 pt-1">
            <a href="#contact" className="inline-flex items-center px-4 py-2 text-sm font-medium rounded-sm bg-[var(--color-ink)] text-[var(--color-paper)] transition-opacity hover:opacity-80">
              Get in touch
            </a>
            <a href={siteConfig.linkedin} target="_blank" rel="noopener noreferrer" className="inline-flex items-center px-4 py-2 text-sm font-medium rounded-sm border border-[var(--color-ink)] text-[var(--color-ink)] hover:bg-[var(--color-ink)] hover:text-[var(--color-paper)] transition-colors">
              LinkedIn
            </a>
          </div>

          <SocialLinks />
        </div>

        <div className="hidden sm:block relative mt-2">
          <div className="w-28 h-36 rounded-sm overflow-hidden border border-[var(--color-rule)] shadow-sm rotate-[1.5deg] hover:rotate-0 transition-transform duration-700">
            <Image
              src="/personal.jpg"
              alt={siteConfig.name}
              width={112}
              height={144}
              className="w-full h-full object-cover"
              priority
            />
          </div>
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-4 h-8 border-2 border-[var(--color-hole)] rounded-full" aria-hidden="true" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
