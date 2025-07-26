import React, { useEffect } from 'react';
import './style.css';

import Hero from './components/Hero';
import Services from './components/Services';
import AboutSection from './components/AboutSection';
import Benefits from './components/Benefits';
import CTA from './components/CTA';
import Team from './components/Team';
import TrackRecord from './components/TrackRecord';
import Footer from './components/Footer';
import Navbar from './components/Navbar';
import WorkedProjects from './components/WorkedProjects';

import AOS from 'aos';
import 'aos/dist/aos.css';

function App() {
  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
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
      <CTA />
      <Footer />
    </div>
  );
}

export default App;