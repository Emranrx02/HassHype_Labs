import React, { useEffect } from 'react';
import './style.css';

// Components
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import AboutSection from './components/AboutSection';
import Services from './components/Services';
import Benefits from './components/Benefits';
import Team from './components/Team';
import TrackRecord from './components/TrackRecord';
import WorkedProjects from './components/WorkedProjects';
import ClientReview from './components/ClientReview';
import CTA from './components/CTA';
import Footer from './components/Footer';

// AOS
import AOS from 'aos';
import 'aos/dist/aos.css';

function App() {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true, // Animates only once per element
    });
  }, []);

  return (
    <div className="app">
      <Navbar />
      <Hero />
      <AboutSection />
      <Services />
      <Benefits />
      <Team />
      <TrackRecord />
      <WorkedProjects />
      <ClientReview />
      <CTA />
      <Footer />
    </div>
  );
}

export default App;