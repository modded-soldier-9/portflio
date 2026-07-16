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

export default function Home() {
  return (
    <>
      <Navigation />
      <main id="main" className="pt-20 pb-16">
        <Hero />
        <div className="container space-y-10 mt-12 stack">
          <section className="paper paper-fold animate-page-in">
            <Experience />
          </section>
          <section className="paper animate-page-in">
            <Projects />
          </section>
          <div className="grid sm:grid-cols-2 gap-6">
            <section className="paper animate-page-in-right">
              <Skills />
            </section>
            <section className="paper paper-fold animate-page-in-right" style={{ animationDelay: '0.1s' }}>
              <Education />
            </section>
          </div>
          <section className="paper paper-ruled animate-page-in">
            <Certifications />
          </section>
          <section className="paper animate-page-in">
            <Mentorship />
          </section>
          <section className="paper animate-page-in" style={{ position: 'relative' }}>
            <div className="tape" aria-hidden="true" />
            <ContactForm />
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
