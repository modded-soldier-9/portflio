import Navigation from '@/components/Navigation';
import Hero from '@/components/Hero';
import Experience from '@/components/Experience';
import Projects from '@/components/Projects';
import Mentorship from '@/components/Mentorship';
import Education from '@/components/Education';
import Certifications from '@/components/Certifications';
import Skills from '@/components/Skills';
import ContactForm from '@/components/ContactForm';
import Footer from '@/components/Footer';
import BreadcrumbNavigation from '@/components/BreadcrumbNavigation';
import BlogSection from '@/components/BlogSection';
import InteractiveDashboard from '@/components/InteractiveDashboard';

export default function Home() {
  return (
    <div className="min-h-screen">
      <Navigation />
      <BreadcrumbNavigation />
      <Hero />
      <Experience />
      <Projects />
      <Mentorship />
      <Education />
      <Certifications />
      <Skills />
      <BlogSection />
      <section id="dashboard" className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900"></div>
        <div className="container mx-auto px-6 relative z-10">
          <InteractiveDashboard />
        </div>
      </section>
      <section id="contact" className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900"></div>
        <div className="container mx-auto px-6 relative z-10">
          <ContactForm />
        </div>
      </section>
      <Footer />
    </div>
  );
}
