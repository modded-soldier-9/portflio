import Image from 'next/image';
import { siteConfig } from '@/config/site';
import SocialLinks from './SocialLinks';

const Hero = () => {
  return (
    <section id="home" className="stagger">
      <div className="grid sm:grid-cols-[1fr_auto] gap-6 items-start">
        <div className="space-y-4">
          <p className="font-mono text-[11px] text-[var(--color-accent)] tracking-wider uppercase">
            {siteConfig.role} &middot; {siteConfig.location}
          </p>

          <h1>{siteConfig.name}</h1>

          <p className="text-[15px] text-[var(--color-ink-muted)] leading-relaxed max-w-md">
            {siteConfig.tagline}
          </p>

          <div className="flex flex-wrap gap-3 pt-1">
            <a
              href="#contact"
              className="inline-flex items-center px-4 py-2 text-sm font-medium rounded-sm bg-[var(--color-accent)] text-white transition-transform hover:scale-[1.02] active:scale-[0.98]"
            >
              Get in touch
            </a>
            <a
              href="#projects"
              className="inline-flex items-center px-4 py-2 text-sm font-medium rounded-sm border border-[var(--color-rule-strong)] text-[var(--color-ink-muted)] hover:text-[var(--color-ink)] hover:border-[var(--color-ink-faint)] transition-colors"
            >
              See my work
            </a>
          </div>

          <SocialLinks />
        </div>

        {/* Photo clipped to page like it was stapled */}
        <div className="hidden sm:block relative mt-2">
          <div className="w-28 h-36 rounded-sm overflow-hidden border border-[var(--color-rule)] shadow-sm rotate-[1.5deg] hover:rotate-0 transition-transform duration-700">
            <Image
              src="/personal.jpg"
              alt={siteConfig.name}
              width={112}
              height={144}
              className="w-full h-full object-cover grayscale-[20%]"
              priority
            />
          </div>
          {/* Paperclip */}
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-4 h-8 border-2 border-[var(--color-hole)] rounded-full" aria-hidden="true" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
