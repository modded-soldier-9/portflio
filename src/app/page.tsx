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
import PenCanvas from '@/components/PenCanvas';

export default function Home() {
  return (
    <div className="relative">
      <PenCanvas />
      <Navigation />
      <main id="main" className="sheet">
        {/* The whole page is one sheet of paper */}
        <div className="sheet-inner">
          <Hero />
          <hr className="divider" />
          <Experience />
          <hr className="divider" />
          <Projects />
          <hr className="divider" />
          <div className="grid sm:grid-cols-2 gap-8">
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
