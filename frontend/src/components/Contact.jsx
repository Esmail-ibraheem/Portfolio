import React, { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Label } from './ui/label';
import { Mail, Phone, Github, Linkedin, Send, CheckCircle } from 'lucide-react';
import { personalInfo, submitContactForm } from '../mock';
import { useToast } from '../hooks/use-toast';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      toast({
        title: "Missing Information",
        description: "Please fill in all fields before submitting.",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);
    try {
      await submitContactForm(formData);
      toast({
        title: "Success!",
        description: "Your message has been sent successfully. I'll get back to you soon!",
      });
      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to send message. Please try again or contact me directly.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactMethods = [
    {
      icon: <Mail className="w-5 h-5" />,
      label: 'Email',
      value: personalInfo.email,
      href: `mailto:${personalInfo.email}`
    },
    {
      icon: <Phone className="w-5 h-5" />,
      label: 'Phone',
      value: personalInfo.phone,
      href: `tel:${personalInfo.phone}`
    },
    {
      icon: <Github className="w-5 h-5" />,
      label: 'GitHub',
      value: 'Esmail-ibraheem',
      href: personalInfo.github
    },
    {
      icon: <Linkedin className="w-5 h-5" />,
      label: 'LinkedIn',
      value: 'esmail-a-gumaan',
      href: personalInfo.linkedin
    }
  ];

  return (
    <section id="contact" className="py-20 px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="display-large mb-6">Let's Connect</h2>
          <p className="body-large text-[rgba(255,255,255,0.85)] max-w-3xl mx-auto">
            Interested in collaboration, research opportunities, or discussing AI projects? 
            I'm always open to connecting with fellow researchers and industry professionals.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Contact Information */}
          <div className="space-y-8">
            <div>
              <h3 className="heading-2 text-white mb-6">Get in Touch</h3>
              <p className="body-medium text-[rgba(255,255,255,0.85)] mb-8">
                Whether you're interested in discussing research collaboration, exploring job opportunities, 
                or simply want to connect, I'd love to hear from you.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              {contactMethods.map((method, index) => (
                <Card 
                  key={index}
                  className="glass-effect border-white/20 hover:border-[#00FFD1]/50 transition-all duration-300 hover:scale-[1.02] cursor-pointer"
                  onClick={() => window.open(method.href, '_blank')}
                >
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-[#00FFD1]/10 rounded-lg">
                        <div className="text-[#00FFD1]">
                          {method.icon}
                        </div>
                      </div>
                      <div>
                        <div className="body-small text-[#4D4D4D] mb-1">{method.label}</div>
                        <div className="body-small text-white font-medium">{method.value}</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Contact Form */}
          <Card className="glass-effect border-white/20 hover:border-[#00FFD1]/50 transition-all duration-400">
            <CardHeader>
              <CardTitle className="heading-2 text-white">Send a Message</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="name" className="body-medium text-white">Name</Label>
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="bg-white/5 border-white/20 text-white placeholder:text-[#4D4D4D] focus:border-[#00FFD1] focus:ring-[#00FFD1] rounded-none"
                    placeholder="Your full name"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email" className="body-medium text-white">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="bg-white/5 border-white/20 text-white placeholder:text-[#4D4D4D] focus:border-[#00FFD1] focus:ring-[#00FFD1] rounded-none"
                    placeholder="your.email@example.com"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message" className="body-medium text-white">Message</Label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    rows={5}
                    className="bg-white/5 border-white/20 text-white placeholder:text-[#4D4D4D] focus:border-[#00FFD1] focus:ring-[#00FFD1] rounded-none resize-none"
                    placeholder="Your message here..."
                    required
                  />
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-[#00FFD1] text-black hover:bg-[#00FFD1]/80 border-0 rounded-none px-8 py-4 text-lg font-medium min-h-[56px] transition-all duration-400 hover:scale-[1.02] neon-glow disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full animate-spin mr-2"></div>
                      Sending...
                    </>
                  ) : (
                    <>
                      Send Message
                      <Send className="w-5 h-5 ml-2" />
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default Contact;