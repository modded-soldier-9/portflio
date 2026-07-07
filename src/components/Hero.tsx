import Image from 'next/image';
import { siteConfig } from '@/config/site';
import SocialLinks from './SocialLinks';

const Hero = () => {
  return (
    <section id="home" className="relative min-h-[90vh] flex items-center pt-20 pb-16">
      <div className="container">
        <div className="grid lg:grid-cols-[1fr_auto] gap-12 lg:gap-20 items-center">
          <div className="space-y-6">
            <p className="font-mono text-sm text-accent tracking-wide">
              {siteConfig.role} @ {siteConfig.company}
            </p>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.1]">
              {siteConfig.name}
            </h1>

            <p className="text-lg text-fg-muted max-w-lg leading-relaxed">
              {siteConfig.tagline}
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <a
                href="#contact"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-accent text-[#05140d] text-sm font-semibold hover:opacity-90 transition-opacity"
              >
                Get in Touch
              </a>
              <a
                href="#projects"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border border-border text-sm font-medium text-fg hover:border-accent hover:text-accent transition-colors"
              >
                View Projects
              </a>
            </div>

            <SocialLinks />
          </div>

          <div className="hidden lg:block">
            <div className="w-72 h-72 rounded-2xl overflow-hidden border border-border">
              <Image
                src="/personal.jpg"
                alt={`Portrait of ${siteConfig.name}`}
                width={288}
                height={288}
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
