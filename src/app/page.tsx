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
      <main id="main" className="pt-20 pb-16 space-y-12">
        <Hero />
        <div className="container space-y-12">
          <Paper><Experience /></Paper>
          <Paper><Projects /></Paper>
          <Paper><Skills /></Paper>
          <Paper><Certifications /></Paper>
          <Paper><Education /></Paper>
          <Paper><Mentorship /></Paper>
          <Paper><ContactForm /></Paper>
        </div>
      </main>
      <Footer />
    </>
  );
}

function Paper({ children }: { children: React.ReactNode }) {
  return (
    <div className="paper animate-page-in">
      {children}
    </div>
  );
}
