import Image from 'next/image';
import { siteConfig } from '@/config/site';
import SocialLinks from './SocialLinks';

const Hero = () => {
  return (
    <section id="home" className="container">
      <div className="paper paper-ruled animate-page-in relative" style={{ padding: '2.5rem 2.5rem 2rem 3.5rem' }}>
        {/* Tape strip holding the page */}
        <div className="tape" style={{ left: '2rem', right: 'auto', transform: 'rotate(1.5deg)' }} aria-hidden="true" />

        <div className="grid sm:grid-cols-[1fr_auto] gap-8 items-start">
          <div className="stagger space-y-4">
            <p className="font-mono text-[11px] text-[var(--color-accent)] tracking-wider uppercase">
              {siteConfig.role}
            </p>

            <h1 className="animate-handwrite">
              {siteConfig.name}
            </h1>

            <p className="text-[var(--color-ink-muted)] leading-relaxed max-w-md text-[15px]">
              {siteConfig.tagline}
            </p>

            <div className="flex flex-wrap gap-3 pt-2">
              <a
                href="#contact"
                className="inline-flex items-center px-4 py-2 text-sm font-medium rounded-sm bg-[var(--color-accent)] text-white transition-transform hover:scale-[1.02] active:scale-[0.98]"
              >
                Get in touch
              </a>
              <a
                href="#projects"
                className="inline-flex items-center px-4 py-2 text-sm font-medium rounded-sm border border-[var(--color-rule)] text-[var(--color-ink-muted)] hover:text-[var(--color-ink)] hover:border-[var(--color-ink-faint)] transition-colors"
              >
                See my work
              </a>
            </div>

            <SocialLinks />
          </div>

          {/* Pinned photo */}
          <div className="hidden sm:block relative">
            <div className="w-32 h-40 rounded-sm overflow-hidden border border-[var(--color-rule)] shadow-md rotate-2 hover:rotate-0 transition-transform duration-700 ease-out">
              <Image
                src="/personal.jpg"
                alt={siteConfig.name}
                width={128}
                height={160}
                className="w-full h-full object-cover"
                priority
              />
            </div>
            {/* Pin */}
            <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-[var(--color-margin)] border border-[var(--color-accent)] shadow-sm" aria-hidden="true" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
