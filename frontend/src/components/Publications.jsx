import React from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { ExternalLink, FileText } from 'lucide-react';
import { publications } from '../mock';

const Publications = () => {
  return (
    <section id="publications" className="py-20 px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="display-large mb-6">Publications</h2>
          <p className="body-large text-[rgba(255,255,255,0.85)] max-w-3xl mx-auto">
            Research contributions in Large Language Models, Retrieval-Augmented Generation, 
            and distributed training systems published in leading venues.
          </p>
        </div>

        {/* Publications Grid */}
        <div className="grid gap-8 max-w-4xl mx-auto">
          {publications.map((pub, index) => (
            <Card 
              key={pub.id} 
              className={`glass-effect border-white/20 hover:border-[#00FFD1]/50 transition-all duration-400 hover:scale-[1.02] focus-within:ring-2 focus-within:ring-[#00FFD1] focus-within:ring-offset-2 focus-within:ring-offset-black animate-slide-up`}
              style={{ 
                animationDelay: `${index * 0.1}s`,
                boxShadow: '0 0 10px rgba(0, 255, 209, 0.2)'
              }}
            >
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <CardTitle className="heading-3 text-white mb-2 leading-tight">
                      {pub.title}
                    </CardTitle>
                    <div className="flex items-center gap-3 mb-2">
                      <Badge 
                        variant={pub.venue.includes('arXiv') ? 'default' : 'secondary'}
                        className={`${
                          pub.venue.includes('arXiv') 
                            ? 'bg-[#00FFD1]/20 text-[#00FFD1] border-[#00FFD1]/30' 
                            : 'bg-purple-500/20 text-purple-400 border-purple-500/30'
                        } rounded-none`}
                      >
                        <FileText className="w-3 h-3 mr-1" />
                        {pub.venue.includes('arXiv') ? 'arXiv' : 'ResearchGate'}
                      </Badge>
                      <span className="body-small text-[#4D4D4D]">{pub.date}</span>
                    </div>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="pt-0">
                <ul className="space-y-1.5 mb-6">
                  {pub.highlights.map((highlight, idx) => (
                    <li key={idx} className="body-small text-[rgba(255,255,255,0.85)] flex items-start">
                      <span className="text-[#00FFD1] mr-2 mt-1.5 block w-1 h-1 rounded-full bg-[#00FFD1] flex-shrink-0"></span>
                      {highlight}
                    </li>
                  ))}
                </ul>
                
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-[#00FFD1] hover:text-white hover:bg-[#00FFD1]/10 p-0 h-auto font-medium focus-visible:ring-2 focus-visible:ring-[#00FFD1] focus-visible:ring-offset-2 focus-visible:ring-offset-black"
                  onClick={() => window.open(pub.link, '_blank')}
                >
                  Read paper
                  <ExternalLink className="w-4 h-4 ml-2" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-12">
          <p className="body-medium text-[#4D4D4D] mb-6">
            More publications and preprints available on arXiv and ResearchGate
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button
              variant="outline"
              className="bg-white/10 border-white/20 text-white hover:bg-white hover:text-black rounded-none focus-visible:ring-2 focus-visible:ring-[#00FFD1] focus-visible:ring-offset-2 focus-visible:ring-offset-black"
              onClick={() => window.open('https://arxiv.org/search/?query=Esmail+Gumaan&searchtype=author', '_blank')}
            >
              View on arXiv
              <ExternalLink className="w-4 h-4 ml-2" />
            </Button>
            <Button
              variant="outline"
              className="bg-white/10 border-white/20 text-white hover:bg-white hover:text-black rounded-none focus-visible:ring-2 focus-visible:ring-[#00FFD1] focus-visible:ring-offset-2 focus-visible:ring-offset-black"
              onClick={() => window.open('https://www.researchgate.net/profile/Esmail-Gumaan', '_blank')}
            >
              View on ResearchGate
              <ExternalLink className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Publications;