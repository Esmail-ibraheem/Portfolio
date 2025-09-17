import React from 'react';
import { Badge } from './ui/badge';
import { Award } from 'lucide-react';
import { certificates } from '../mock';

const Certificates = () => {
  return (
    <section id="certificates" className="py-20 px-6 lg:px-8 bg-[#121212]/30">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="display-large mb-6">Certificates & Achievements</h2>
          <p className="body-large text-[rgba(255,255,255,0.85)] max-w-3xl mx-auto">
            Professional certifications and academic achievements from leading institutions 
            and technology companies in the field of artificial intelligence.
          </p>
        </div>

        {/* Certificates Grid */}
        <div className="flex flex-wrap justify-center gap-4 max-w-5xl mx-auto">
          {certificates.map((cert, index) => (
            <Badge 
              key={index}
              variant="outline" 
              className={`glass-effect border-white/20 hover:border-[#00FFD1]/50 text-[rgba(255,255,255,0.85)] hover:text-[#00FFD1] hover:bg-[#00FFD1]/10 transition-all duration-300 text-base py-3 px-6 rounded-none cursor-default animate-slide-up hover:scale-105`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <Award className="w-4 h-4 mr-2" />
              {cert}
            </Badge>
          ))}
        </div>

        {/* Additional Info */}
        <div className="text-center mt-12">
          <p className="body-medium text-[#4D4D4D]">
            Continuous learning and professional development in AI and machine learning
          </p>
        </div>
      </div>
    </section>
  );
};

export default Certificates;