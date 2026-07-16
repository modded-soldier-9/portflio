import Navigation from '@/components/Navigation';
import Hero from '@/components/Hero';
import Experience from '@/components/Experience';
import Projects from '@/components/Projects';
import Skills from '@/components/Skills';
import Certifications from '@/components/Certifications';
import Education from '@/components/Education';
import Mentorship from '@/components/Mentorship';
import ContactForm from '@/components/ContactForm';
import Footer from '@/components/Footer';
import Annotator from '@/components/PenCanvas';

const LAST_UPDATED = '16 July 2025';

export default function Home() {
  return (
    <div className="relative min-h-screen">
      <Annotator />
      <Navigation />
      <main id="main" className="sheet">
        <div className="sheet-inner">
          {/* Last updated — fits inside padding */}
          <div className="font-mono text-[10px] text-[var(--color-ink-faint)] tracking-wide text-right mb-6">
            Last updated: {LAST_UPDATED}
          </div>

          <Hero />
          <hr className="divider" />
          <Experience />
          <hr className="divider" />
          <Projects />
          <hr className="divider" />
          <div className="grid md:grid-cols-2 gap-8">
            <Skills />
            <Education />
          </div>
          <hr className="divider" />
          <Certifications />
          <hr className="divider" />
          <Mentorship />
          <hr className="divider" />
          <ContactForm />
        </div>
      </main>
      <Footer />
    </div>
  );
}
