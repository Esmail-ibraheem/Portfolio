import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Calendar, MapPin } from 'lucide-react';
import { experience } from '../mock';

const Experience = () => {
  return (
    <section id="experience" className="py-20 px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="display-large mb-6">Experience</h2>
          <p className="body-large text-[rgba(255,255,255,0.85)] max-w-3xl mx-auto">
            Professional journey in AI research and development, building scalable ML systems 
            and contributing to cutting-edge AI applications across different domains.
          </p>
        </div>

        {/* Timeline */}
        <div className="relative max-w-4xl mx-auto">
          {/* Timeline line */}
          <div className="absolute left-8 top-0 bottom-0 w-px bg-gradient-to-b from-[#00FFD1] via-[#00FFD1]/50 to-transparent"></div>

          {/* Experience items */}
          <div className="space-y-12">
            {experience.map((exp, index) => (
              <div key={exp.id} className="relative flex items-start gap-8">
                {/* Timeline dot */}
                <div className="relative z-10 flex-shrink-0">
                  <div className="w-4 h-4 bg-[#00FFD1] rounded-full border-4 border-black animate-pulse"></div>
                </div>

                {/* Content */}
                <Card 
                  className={`glass-effect border-white/20 hover:border-[#00FFD1]/50 transition-all duration-400 hover:scale-[1.01] hover:neon-glow flex-1 animate-slide-up`}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <CardHeader className="pb-4">
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                      <div>
                        <CardTitle className="heading-3 text-white mb-2">
                          {exp.title}
                        </CardTitle>
                        <div className="flex items-center gap-4 mb-3">
                          <span className="heading-3 text-[#00FFD1]">{exp.company}</span>
                          <div className="flex items-center gap-1 text-[#4D4D4D]">
                            <MapPin className="w-4 h-4" />
                            <span className="body-small">{exp.location}</span>
                          </div>
                        </div>
                      </div>
                      <Badge 
                        variant="outline" 
                        className="bg-[#00FFD1]/10 border-[#00FFD1]/30 text-[#00FFD1] rounded-none self-start lg:self-center"
                      >
                        <Calendar className="w-3 h-3 mr-1" />
                        {exp.period}
                      </Badge>
                    </div>
                  </CardHeader>
                  
                  <CardContent className="pt-0">
                    <p className="body-medium text-[rgba(255,255,255,0.85)] mb-6 leading-relaxed">
                      {exp.description}
                    </p>
                    
                    <div>
                      <h4 className="body-medium font-semibold text-white mb-3">Key Achievements:</h4>
                      <ul className="space-y-2">
                        {exp.achievements.map((achievement, idx) => (
                          <li key={idx} className="body-small text-[rgba(255,255,255,0.85)] flex items-start">
                            <span className="text-[#00FFD1] mr-2 mt-1.5 block w-1 h-1 rounded-full bg-[#00FFD1] flex-shrink-0"></span>
                            {achievement}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;