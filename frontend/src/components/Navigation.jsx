import React, { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Github, Linkedin, Download, Menu, X } from 'lucide-react';
import { personalInfo } from '../mock';

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMobileMenuOpen(false);
    }
  };

  const navLinks = [
    { label: 'Home', id: 'home' },
    { label: 'Publications', id: 'publications' },
    { label: 'Projects', id: 'projects' },
    { label: 'Experience', id: 'experience' },
    { label: 'Skills', id: 'skills' },
    { label: 'Contact', id: 'contact' }
  ];

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${
      isScrolled 
        ? 'bg-black/80 backdrop-blur-md border-b border-white/10' 
        : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div 
            className="text-2xl font-bold cursor-pointer hover:text-[#00FFD1] transition-colors"
            onClick={() => scrollToSection('home')}
          >
            EG.
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollToSection(link.id)}
                className="text-[#4D4D4D] hover:text-white transition-colors duration-300 text-lg"
              >
                {link.label}
              </button>
            ))}
          </div>

          {/* Desktop Right Side */}
          <div className="hidden md:flex items-center space-x-4">
            <Button
              variant="outline"
              size="sm"
              className="bg-white/10 border-white/20 text-white hover:bg-white hover:text-black transition-all duration-300"
              onClick={() => window.open('/cv.pdf', '_blank')}
            >
              <Download className="w-4 h-4 mr-2" />
              Download CV
            </Button>
            
            <Button
              variant="ghost"
              size="sm"
              className="p-2 text-[#4D4D4D] hover:text-[#00FFD1] hover:bg-[#00FFD1]/10"
              onClick={() => window.open(personalInfo.github, '_blank')}
            >
              <Github className="w-5 h-5" />
            </Button>
            
            <Button
              variant="ghost"
              size="sm"
              className="p-2 text-[#4D4D4D] hover:text-[#00FFD1] hover:bg-[#00FFD1]/10"
              onClick={() => window.open(personalInfo.linkedin, '_blank')}
            >
              <Linkedin className="w-5 h-5" />
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="sm"
            className="md:hidden p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </Button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-black/95 backdrop-blur-md border-t border-white/10">
            <div className="px-4 py-6 space-y-4">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => scrollToSection(link.id)}
                  className="block w-full text-left text-[#4D4D4D] hover:text-white transition-colors py-2"
                >
                  {link.label}
                </button>
              ))}
              
              <div className="flex flex-col space-y-3 pt-4 border-t border-white/10">
                <Button
                  variant="outline"
                  size="sm"
                  className="bg-white/10 border-white/20 text-white hover:bg-white hover:text-black"
                  onClick={() => window.open('/cv.pdf', '_blank')}
                >
                  <Download className="w-4 h-4 mr-2" />
                  Download CV
                </Button>
                
                <div className="flex space-x-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="flex-1 text-[#4D4D4D] hover:text-[#00FFD1]"
                    onClick={() => window.open(personalInfo.github, '_blank')}
                  >
                    <Github className="w-5 h-5 mr-2" />
                    GitHub
                  </Button>
                  
                  <Button
                    variant="ghost"
                    size="sm"
                    className="flex-1 text-[#4D4D4D] hover:text-[#00FFD1]"
                    onClick={() => window.open(personalInfo.linkedin, '_blank')}
                  >
                    <Linkedin className="w-5 h-5 mr-2" />
                    LinkedIn
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;