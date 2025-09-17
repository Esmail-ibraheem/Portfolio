import React, { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { ArrowRight, ChevronDown } from 'lucide-react';
import { personalInfo, heroStats } from '../mock';

const Hero = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      // Account for sticky header height
      const headerOffset = 100;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Background orbital nodes */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-[#00FFD1] rounded-full animate-float opacity-60"></div>
        <div className="absolute top-1/3 right-1/3 w-1 h-1 bg-[#00FFD1] rounded-full animate-float opacity-40" style={{ animationDelay: '2s' }}></div>
        <div className="absolute bottom-1/4 left-1/3 w-3 h-3 bg-[#00FFD1] rounded-full animate-float opacity-30" style={{ animationDelay: '4s' }}></div>
        <div className="absolute bottom-1/3 right-1/4 w-1.5 h-1.5 bg-[#00FFD1] rounded-full animate-float opacity-50" style={{ animationDelay: '1s' }}></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 pt-20">
        <div className={`text-center transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          
          {/* Kicker */}
          <div className="mb-6 flex flex-wrap justify-center gap-2">
            <Badge variant="outline" className="bg-white/5 border-[#00FFD1]/30 text-[#00FFD1] hover:bg-[#00FFD1]/10 transition-colors">
              Open-source AI
            </Badge>
            <Badge variant="outline" className="bg-white/5 border-[#00FFD1]/30 text-[#00FFD1] hover:bg-[#00FFD1]/10 transition-colors">
              LLMs
            </Badge>
            <Badge variant="outline" className="bg-white/5 border-[#00FFD1]/30 text-[#00FFD1] hover:bg-[#00FFD1]/10 transition-colors">
              RAG
            </Badge>
            <Badge variant="outline" className="bg-white/5 border-[#00FFD1]/30 text-[#00FFD1] hover:bg-[#00FFD1]/10 transition-colors">
              CUDA
            </Badge>
          </div>

          {/* Main heading */}
          <h1 className="display-huge mb-6 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
            {personalInfo.name}
          </h1>

          {/* Subtitle */}
          <h2 className="display-medium mb-8 text-[#FFFFFF] max-w-4xl mx-auto">
            {personalInfo.title}
          </h2>

          {/* Description */}
          <p className="body-large text-[rgba(255,255,255,0.85)] max-w-3xl mx-auto mb-12">
            {personalInfo.tagline}
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            <Button
              size="lg"
              className="bg-[#00FFD1] text-black hover:bg-[#00FFD1]/90 border-0 rounded-none px-8 py-4 text-lg font-medium min-h-[56px] transition-all duration-400 hover:scale-[1.01] focus-visible:ring-2 focus-visible:ring-[#00FFD1] focus-visible:ring-offset-2 focus-visible:ring-offset-black"
              style={{ boxShadow: '0 0 10px rgba(0, 255, 209, 0.3)' }}
              onClick={() => scrollToSection('projects')}
            >
              View Projects
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
            
            <Button
              variant="outline"
              size="lg"
              className="bg-white/10 border-white/20 text-white hover:bg-white hover:text-black rounded-none px-8 py-4 text-lg font-medium min-h-[56px] transition-all duration-400 focus-visible:ring-2 focus-visible:ring-[#00FFD1] focus-visible:ring-offset-2 focus-visible:ring-offset-black"
              onClick={() => scrollToSection('contact')}
            >
              Contact Me
            </Button>
          </div>

          {/* Stats - Mobile optimized */}
          <div className="flex flex-col md:flex-row items-center justify-center gap-6 mb-16">
            {heroStats.map((stat, index) => (
              <div 
                key={index} 
                className="glass-effect rounded-lg px-6 py-4 text-center transition-all duration-300 hover:scale-105 focus-within:ring-2 focus-within:ring-[#00FFD1] focus-within:ring-offset-2 focus-within:ring-offset-black"
                style={{ boxShadow: '0 0 8px rgba(0, 255, 209, 0.2)' }}
                tabIndex={0}
              >
                <div className="heading-2 text-[#00FFD1] mb-1">{stat.value}</div>
                <div className="body-small text-white font-medium mb-1">{stat.label}</div>
                <div className="body-small text-[#4D4D4D]">{stat.subtext}</div>
              </div>
            ))}
          </div>

          {/* Scroll indicator - Ensure it stays above fold on mobile */}
          <div className="animate-bounce">
            <button
              onClick={() => scrollToSection('publications')}
              className="text-[#4D4D4D] hover:text-[#00FFD1] transition-colors focus-visible:outline-2 focus-visible:outline-[#00FFD1] focus-visible:outline-offset-2 rounded p-2"
            >
              <ChevronDown className="w-8 h-8" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;