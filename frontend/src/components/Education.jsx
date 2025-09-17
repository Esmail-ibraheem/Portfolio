import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { GraduationCap, Calendar, Award } from 'lucide-react';
import { education } from '../mock';

const Education = () => {
  return (
    <section id="education" className="py-20 px-6 lg:px-8 bg-[#121212]/30">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="display-large mb-6">Education</h2>
          <p className="body-large text-[rgba(255,255,255,0.85)] max-w-3xl mx-auto">
            Academic foundation in Computer Science with specialization in 
            Artificial Intelligence and advanced programming methodologies.
          </p>
        </div>

        {/* Education Card */}
        <div className="max-w-4xl mx-auto">
          <Card className="glass-effect border-white/20 hover:border-[#00FFD1]/50 transition-all duration-400 hover:scale-[1.01] hover:neon-glow animate-slide-up">
            <CardHeader className="pb-6">
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-[#00FFD1]/10 rounded-lg">
                    <GraduationCap className="w-8 h-8 text-[#00FFD1]" />
                  </div>
                  <div>
                    <CardTitle className="heading-2 text-white mb-2">
                      {education.degree}
                    </CardTitle>
                    <h3 className="heading-3 text-[#00FFD1] mb-2">
                      {education.university}
                    </h3>
                  </div>
                </div>
                
                <div className="text-right">
                  <Badge 
                    variant="outline" 
                    className="bg-[#00FFD1]/10 border-[#00FFD1]/30 text-[#00FFD1] rounded-none mb-2"
                  >
                    <Calendar className="w-3 h-3 mr-1" />
                    {education.period}
                  </Badge>
                  <div className="flex items-center gap-1 text-[#4D4D4D]">
                    <Award className="w-4 h-4" />
                    <span className="body-small">GPA: {education.gpa}</span>
                  </div>
                </div>
              </div>
            </CardHeader>
            
            <CardContent className="pt-0">
              <div>
                <h4 className="body-medium font-semibold text-white mb-4">Key Coursework:</h4>
                <div className="flex flex-wrap gap-3">
                  {education.courses.map((course, idx) => (
                    <Badge 
                      key={idx}
                      variant="outline" 
                      className="bg-white/5 border-white/20 text-[rgba(255,255,255,0.85)] hover:bg-[#00FFD1]/10 hover:border-[#00FFD1]/30 hover:text-[#00FFD1] transition-colors rounded-none"
                    >
                      {course}
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default Education;