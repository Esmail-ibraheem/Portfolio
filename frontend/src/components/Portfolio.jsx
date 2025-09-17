import React, { useState, useEffect } from 'react';
import Navigation from './Navigation';
import Hero from './Hero';
import Publications from './Publications';
import Projects from './Projects';
import Experience from './Experience';
import Education from './Education';
import Skills from './Skills';
import Certificates from './Certificates';
import Contact from './Contact';
import Footer from './Footer';
import ParticleBackground from './ParticleBackground';

const Portfolio = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <div className={`min-h-screen bg-black relative ${isLoaded ? 'animate-fade-in' : ''}`}>
      <ParticleBackground />
      <Navigation />
      
      <main className="relative z-10">
        <Hero />
        <Publications />
        <Projects />
        <Experience />
        <Education />
        <Skills />
        <Certificates />
        <Contact />
      </main>
      
      <Footer />
    </div>
  );
};

export default Portfolio;