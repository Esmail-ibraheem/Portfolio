import React from 'react';
import { Button } from './ui/button';
import { Github, Linkedin, Mail, ArrowUp } from 'lucide-react';
import { personalInfo } from '../mock';

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const quickLinks = [
    { label: 'Publications', id: 'publications' },
    { label: 'Projects', id: 'projects' },
    { label: 'Experience', id: 'experience' },
    { label: 'Skills', id: 'skills' },
    { label: 'Contact', id: 'contact' }
  ];

  return (
    <footer className="bg-[#121212]/50 border-t border-white/10 py-12 px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          {/* Logo and Description */}
          <div className="space-y-4">
            <div className="text-2xl font-bold text-[#00FFD1]">EG.</div>
            <p className="body-small text-[rgba(255,255,255,0.85)] max-w-xs">
              AI Research Engineer focused on neural networks, large language models, 
              and scalable ML systems.
            </p>
            <div className="flex space-x-3">
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
              <Button
                variant="ghost"
                size="sm"
                className="p-2 text-[#4D4D4D] hover:text-[#00FFD1] hover:bg-[#00FFD1]/10"
                onClick={() => window.open(`mailto:${personalInfo.email}`, '_blank')}
              >
                <Mail className="w-5 h-5" />
              </Button>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="heading-3 text-white">Quick Links</h4>
            <div className="space-y-2">
              {quickLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => scrollToSection(link.id)}
                  className="block text-[#4D4D4D] hover:text-[#00FFD1] transition-colors body-small"
                >
                  {link.label}
                </button>
              ))}
            </div>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h4 className="heading-3 text-white">Contact</h4>
            <div className="space-y-2">
              <a 
                href={`mailto:${personalInfo.email}`}
                className="block text-[#4D4D4D] hover:text-[#00FFD1] transition-colors body-small"
              >
                {personalInfo.email}
              </a>
              <a 
                href={`tel:${personalInfo.phone}`}
                className="block text-[#4D4D4D] hover:text-[#00FFD1] transition-colors body-small"
              >
                {personalInfo.phone}
              </a>
              <p className="text-[#4D4D4D] body-small">{personalInfo.location}</p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between pt-8 border-t border-white/10">
          <p className="body-small text-[#4D4D4D] mb-4 md:mb-0">
            © {new Date().getFullYear()} {personalInfo.name}. All rights reserved. · Last updated: August 2025
          </p>
          
          <Button
            variant="ghost"
            size="sm"
            onClick={scrollToTop}
            className="text-[#4D4D4D] hover:text-[#00FFD1] hover:bg-[#00FFD1]/10"
          >
            <ArrowUp className="w-4 h-4 mr-2" />
            Back to top
          </Button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;