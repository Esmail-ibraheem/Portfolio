import React, { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Label } from './ui/label';
import { Checkbox } from './ui/checkbox';
import { Mail, Phone, Github, Linkedin, Send, CheckCircle, AlertCircle } from 'lucide-react';
import { personalInfo } from '../mock';
import { submitContactForm, trackEvent } from '../services/api';
import { useToast } from '../hooks/use-toast';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
    consent: false
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});
  const { toast } = useToast();

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    // Clear field error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: null
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Clear previous errors
    setErrors({});
    
    // Basic client-side validation
    const clientErrors = {};
    if (!formData.name.trim()) clientErrors.name = ['Name is required'];
    if (!formData.email.trim()) clientErrors.email = ['Email is required'];
    if (!formData.message.trim()) clientErrors.message = ['Message is required'];
    if (!formData.consent) clientErrors.consent = ['Consent is required'];
    
    if (Object.keys(clientErrors).length > 0) {
      setErrors(clientErrors);
      toast({
        title: "Please check your input",
        description: "All fields are required.",
        variant: "destructive"
      });
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      const result = await submitContactForm(formData);
      
      if (result.success) {
        // Success
        toast({
          title: "Message sent successfully!",
          description: "Thank you for your message. I'll get back to you soon!",
        });
        
        // Track successful submission
        trackEvent('form_submit_success', {
          event_category: 'contact',
          event_label: 'portfolio_contact_form'
        });
        
        // Reset form
        setFormData({ name: '', email: '', message: '', consent: false });
      } else {
        // Handle errors
        if (result.errors) {
          setErrors(result.errors);
          toast({
            title: "Please check your input",
            description: "Some fields contain errors.",
            variant: "destructive"
          });
        } else {
          toast({
            title: "Error",
            description: result.message || "Failed to send message. Please try again.",
            variant: "destructive"
          });
        }
        
        // Track form error
        trackEvent('form_submit_error', {
          event_category: 'contact',
          error_type: result.errors ? 'validation' : 'server'
        });
      }
    } catch (error) {
      console.error('Form submission error:', error);
      toast({
        title: "Error",
        description: "Network error. Please check your connection and try again.",
        variant: "destructive"
      });
      
      trackEvent('form_submit_error', {
        event_category: 'contact',
        error_type: 'network'
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
                  className="glass-effect border-white/20 hover:border-[#00FFD1]/50 transition-all duration-300 hover:scale-[1.02] cursor-pointer focus-within:ring-2 focus-within:ring-[#00FFD1] focus-within:ring-offset-2 focus-within:ring-offset-black"
                  onClick={() => window.open(method.href, '_blank')}
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      window.open(method.href, '_blank');
                    }
                  }}
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
                {/* Honeypot field - hidden from users */}
                <input
                  type="text"
                  name="_topic"
                  style={{ display: 'none' }}
                  tabIndex={-1}
                  autoComplete="off"
                />
                
                <div className="space-y-2">
                  <Label htmlFor="name" className="body-medium text-white">
                    Name *
                  </Label>
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    value={formData.name}
                    onChange={handleInputChange}
                    className={`bg-white/5 border-white/20 text-white placeholder:text-[#4D4D4D] focus:border-[#00FFD1] focus:ring-[#00FFD1] rounded-none focus-visible:ring-2 focus-visible:ring-[#00FFD1] focus-visible:ring-offset-2 focus-visible:ring-offset-black ${
                      errors.name ? 'border-red-500' : ''
                    }`}
                    placeholder="Your full name"
                    maxLength={120}
                    required
                  />
                  {errors.name && (
                    <div className="flex items-center gap-2 text-red-400 text-sm">
                      <AlertCircle className="w-4 h-4" />
                      {errors.name[0]}
                    </div>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email" className="body-medium text-white">
                    Email *
                  </Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className={`bg-white/5 border-white/20 text-white placeholder:text-[#4D4D4D] focus:border-[#00FFD1] focus:ring-[#00FFD1] rounded-none focus-visible:ring-2 focus-visible:ring-[#00FFD1] focus-visible:ring-offset-2 focus-visible:ring-offset-black ${
                      errors.email ? 'border-red-500' : ''
                    }`}
                    placeholder="your.email@example.com"
                    required
                  />
                  {errors.email && (
                    <div className="flex items-center gap-2 text-red-400 text-sm">
                      <AlertCircle className="w-4 h-4" />
                      {errors.email[0]}
                    </div>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message" className="body-medium text-white">
                    Message *
                  </Label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    rows={5}
                    className={`bg-white/5 border-white/20 text-white placeholder:text-[#4D4D4D] focus:border-[#00FFD1] focus:ring-[#00FFD1] rounded-none resize-none focus-visible:ring-2 focus-visible:ring-[#00FFD1] focus-visible:ring-offset-2 focus-visible:ring-offset-black ${
                      errors.message ? 'border-red-500' : ''
                    }`}
                    placeholder="Your message here..."
                    maxLength={2000}
                    required
                  />
                  {errors.message && (
                    <div className="flex items-center gap-2 text-red-400 text-sm">
                      <AlertCircle className="w-4 h-4" />
                      {errors.message[0]}
                    </div>
                  )}
                </div>

                <div className="space-y-2">
                  <div className="flex items-start space-x-3">
                    <Checkbox
                      id="consent"
                      name="consent"
                      checked={formData.consent}
                      onCheckedChange={(checked) => 
                        handleInputChange({ target: { name: 'consent', type: 'checkbox', checked } })
                      }
                      className="border-white/20 data-[state=checked]:bg-[#00FFD1] data-[state=checked]:border-[#00FFD1] focus-visible:ring-2 focus-visible:ring-[#00FFD1] focus-visible:ring-offset-2 focus-visible:ring-offset-black"
                    />
                    <Label htmlFor="consent" className="body-small text-[rgba(255,255,255,0.85)] leading-relaxed cursor-pointer">
                      I consent to the processing of my personal data for the purpose of responding to my inquiry. *
                    </Label>
                  </div>
                  {errors.consent && (
                    <div className="flex items-center gap-2 text-red-400 text-sm ml-6">
                      <AlertCircle className="w-4 h-4" />
                      {errors.consent[0]}
                    </div>
                  )}
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-[#00FFD1] text-black hover:bg-[#00FFD1]/90 border-0 rounded-none px-8 py-4 text-lg font-medium min-h-[56px] transition-all duration-400 hover:scale-[1.01] disabled:opacity-50 disabled:cursor-not-allowed focus-visible:ring-2 focus-visible:ring-[#00FFD1] focus-visible:ring-offset-2 focus-visible:ring-offset-black"
                  style={{ boxShadow: isSubmitting ? 'none' : '0 0 15px rgba(0, 255, 209, 0.3)' }}
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