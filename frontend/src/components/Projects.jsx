import React from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Github, ExternalLink } from 'lucide-react';
import { projects } from '../mock';

const Projects = () => {
  return (
    <section id="projects" className="py-20 px-6 lg:px-8 bg-[#121212]/30">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="display-large mb-6">Projects</h2>
          <p className="body-large text-[rgba(255,255,255,0.85)] max-w-3xl mx-auto">
            Open-source AI projects ranging from neural network frameworks to 
            complete research platforms for experimenting with cutting-edge models.
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <Card 
              key={project.id} 
              className={`glass-effect border-white/20 hover:border-[#00FFD1]/50 transition-all duration-400 hover:scale-[1.02] hover:neon-glow animate-slide-up h-full flex flex-col`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardHeader className="pb-4">
                <CardTitle className="heading-3 text-white mb-3">
                  {project.name}
                </CardTitle>
                <p className="body-small text-[rgba(255,255,255,0.85)] leading-relaxed">
                  {project.description}
                </p>
              </CardHeader>
              
              <CardContent className="pt-0 flex-1 flex flex-col justify-between">
                <div>
                  {/* Technologies */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.technologies.map((tech, idx) => (
                      <Badge 
                        key={idx}
                        variant="outline" 
                        className="bg-[#00FFD1]/10 border-[#00FFD1]/30 text-[#00FFD1] text-xs rounded-none"
                      >
                        {tech}
                      </Badge>
                    ))}
                  </div>

                  {/* Highlights */}
                  <ul className="space-y-2 mb-6">
                    {project.highlights.map((highlight, idx) => (
                      <li key={idx} className="body-small text-[rgba(255,255,255,0.85)] flex items-start">
                        <span className="text-[#00FFD1] mr-2 mt-1.5 block w-1 h-1 rounded-full bg-[#00FFD1] flex-shrink-0"></span>
                        {highlight}
                      </li>
                    ))}
                  </ul>
                </div>
                
                {/* Actions */}
                <div className="flex gap-3">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-[#00FFD1] hover:text-white hover:bg-[#00FFD1]/10 p-0 h-auto font-medium flex-1 justify-start"
                    onClick={() => window.open(project.github, '_blank')}
                  >
                    <Github className="w-4 h-4 mr-2" />
                    GitHub
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-[#4D4D4D] hover:text-[#00FFD1] hover:bg-[#00FFD1]/10 p-0 h-auto font-medium"
                    onClick={() => window.open(project.github, '_blank')}
                  >
                    Case study
                    <ExternalLink className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-12">
          <p className="body-medium text-[#4D4D4D] mb-6">
            Explore more projects and contributions on GitHub
          </p>
          <Button
            variant="outline"
            className="bg-white/10 border-white/20 text-white hover:bg-white hover:text-black rounded-none"
            onClick={() => window.open('https://github.com/Esmail-ibraheem', '_blank')}
          >
            <Github className="w-4 h-4 mr-2" />
            View All Projects
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Projects;