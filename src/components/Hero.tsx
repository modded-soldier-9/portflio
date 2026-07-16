import Image from 'next/image';
import { siteConfig } from '@/config/site';
import SocialLinks from './SocialLinks';

const Hero = () => {
  return (
    <section id="home" className="container">
      <div className="paper paper-ruled animate-page-in py-12 px-8 sm:px-12">
        <div className="grid sm:grid-cols-[1fr_auto] gap-8 items-start">
          <div className="stagger space-y-5">
            <p className="font-mono text-xs text-accent tracking-wide uppercase">
              {siteConfig.role}
            </p>

            <h1 className="font-display">{siteConfig.name}</h1>

            <p className="text-ink-muted leading-relaxed max-w-md">
              {siteConfig.tagline}
            </p>

            <div className="flex flex-wrap gap-3 pt-1">
              <a
                href="#contact"
                className="inline-flex items-center px-4 py-2 text-sm font-medium rounded bg-accent text-paper transition-opacity hover:opacity-80"
              >
                Get in touch
              </a>
              <a
                href="#projects"
                className="inline-flex items-center px-4 py-2 text-sm font-medium rounded border border-rule text-ink-muted hover:text-ink hover:border-ink-faint transition-colors"
              >
                See my work
              </a>
            </div>

            <SocialLinks />
          </div>

          <div className="hidden sm:block">
            <div className="w-36 h-44 rounded-sm overflow-hidden border border-rule shadow-sm rotate-1 hover:rotate-0 transition-transform duration-500">
              <Image
                src="/personal.jpg"
                alt={siteConfig.name}
                width={144}
                height={176}
                className="w-full h-full object-cover"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
