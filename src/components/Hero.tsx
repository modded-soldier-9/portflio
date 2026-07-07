'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { Shield, Cloud, Code, Server, ArrowUpRight, ArrowDown } from 'lucide-react';
import Image from 'next/image';
import TypingAnimation from './TypingAnimation';
import SocialLinks from './SocialLinks';
import { siteConfig } from '@/config/site';

const focusAreas = [
  { icon: Shield, label: 'Cybersecurity' },
  { icon: Cloud, label: 'AWS Cloud' },
  { icon: Code, label: 'Web Development' },
  { icon: Server, label: 'IT Management' },
];

const Hero = () => {
  const reduceMotion = useReducedMotion();

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center overflow-hidden pt-24 pb-16"
    >
      {/* Backdrop: subtle grid + single soft glow (no particle noise) */}
      <div className="absolute inset-0 grid-backdrop" aria-hidden="true" />
      <div
        className="absolute -top-32 left-1/2 -translate-x-1/2 w-[42rem] h-[42rem] rounded-full blur-3xl opacity-20"
        style={{ background: 'var(--gradient-primary)' }}
        aria-hidden="true"
      />

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-[1.15fr_0.85fr] gap-12 lg:gap-16 items-center">
          {/* Left */}
          <motion.div
            className="space-y-7"
            initial={reduceMotion ? false : { opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="eyebrow">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              Available for opportunities
            </span>

            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.05] text-balance">
              <span className="block text-foreground">{siteConfig.name.split(' ')[0]}</span>
              <span className="block gradient-text">{siteConfig.name.split(' ').slice(1).join(' ')}</span>
            </h1>

            <div className="text-xl sm:text-2xl text-muted-strong font-medium h-8">
              <TypingAnimation texts={siteConfig.roles} className="text-primary" />
            </div>

            <p className="text-base sm:text-lg text-muted max-w-xl leading-relaxed text-pretty">
              {siteConfig.tagline} Currently leading security at{' '}
              <span className="text-foreground font-medium">{siteConfig.company}</span>.
            </p>

            {/* Focus chips */}
            <ul className="flex flex-wrap gap-2.5">
              {focusAreas.map(({ icon: Icon, label }) => (
                <li
                  key={label}
                  className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-card border border-border text-sm text-muted-strong"
                >
                  <Icon className="w-4 h-4 text-primary" aria-hidden="true" />
                  {label}
                </li>
              ))}
            </ul>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-4 pt-1">
              <a href="#contact" className="btn-primary">
                Get in Touch
                <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
              </a>
              <a href="#projects" className="btn-secondary">
                View Projects
              </a>
            </div>

            <div className="pt-2">
              <SocialLinks />
            </div>
          </motion.div>

          {/* Right: portrait */}
          <motion.div
            className="relative flex justify-center lg:justify-end"
            initial={reduceMotion ? false : { opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            <div className="relative w-64 h-64 sm:w-80 sm:h-80 lg:w-[22rem] lg:h-[22rem]">
              <div
                className="absolute -inset-4 rounded-3xl opacity-20 blur-2xl"
                style={{ background: 'var(--gradient-primary)' }}
                aria-hidden="true"
              />
              <div className="relative w-full h-full rounded-3xl overflow-hidden border border-border bg-card">
                <Image
                  src="/personal.jpg"
                  alt={`Portrait of ${siteConfig.name}`}
                  width={400}
                  height={400}
                  className="w-full h-full object-cover"
                  priority
                />
              </div>
              {/* Credential badge */}
              <div className="absolute -bottom-4 -left-4 px-4 py-3 rounded-xl bg-background-elevated border border-border shadow-xl">
                <p className="mono text-xs text-muted">Certified by</p>
                <p className="text-sm font-semibold text-foreground">AWS · Google · Microsoft</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll cue */}
      <a
        href="#experience"
        aria-label="Scroll to experience"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-muted hover:text-primary transition-colors"
      >
        <ArrowDown className="w-5 h-5 animate-bounce" aria-hidden="true" />
      </a>
    </section>
  );
};

export default Hero;
