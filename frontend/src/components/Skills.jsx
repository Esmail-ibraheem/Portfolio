import React from 'react';
import { Badge } from './ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Code, Wrench, Calculator, Globe } from 'lucide-react';
import { skills } from '../mock';

const Skills = () => {
  const skillCategories = [
    {
      title: 'Programming Languages',
      icon: <Code className="w-6 h-6" />,
      items: skills.programming,
      color: '#00FFD1'
    },
    {
      title: 'Frameworks & Tools',
      icon: <Wrench className="w-6 h-6" />,
      items: skills.frameworks,
      color: '#A855F7'
    },
    {
      title: 'Mathematics',
      icon: <Calculator className="w-6 h-6" />,
      items: skills.mathematics,
      color: '#F59E0B'
    },
    {
      title: 'Languages',
      icon: <Globe className="w-6 h-6" />,
      items: skills.languages,
      color: '#EF4444'
    }
  ];

  return (
    <section id="skills" className="py-20 px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="display-large mb-6">Skills & Technologies</h2>
          <p className="body-large text-[rgba(255,255,255,0.85)] max-w-3xl mx-auto">
            Technical expertise spanning programming languages, AI frameworks, 
            mathematical foundations, and communication skills for global collaboration.
          </p>
        </div>

        {/* Skills Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {skillCategories.map((category, index) => (
            <Card 
              key={index}
              className={`glass-effect border-white/20 hover:border-[#00FFD1]/50 transition-all duration-400 hover:scale-[1.01] hover:neon-glow animate-slide-up`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-3 heading-3 text-white">
                  <div 
                    className="p-2 rounded-lg" 
                    style={{ backgroundColor: `${category.color}20` }}
                  >
                    <div style={{ color: category.color }}>
                      {category.icon}
                    </div>
                  </div>
                  {category.title}
                </CardTitle>
              </CardHeader>
              
              <CardContent className="pt-0">
                <div className="flex flex-wrap gap-2">
                  {category.items.map((skill, idx) => (
                    <Badge 
                      key={idx}
                      variant="outline" 
                      className="bg-white/5 border-white/20 text-[rgba(255,255,255,0.85)] hover:bg-[#00FFD1]/10 hover:border-[#00FFD1]/30 hover:text-[#00FFD1] transition-colors text-sm py-1 px-3 rounded-none"
                    >
                      {skill}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;