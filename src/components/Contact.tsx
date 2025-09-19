import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Mail, Phone, MessageCircle, MapPin } from 'lucide-react';

export const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    building: '',
    stories: '',
    scope: '',
    notes: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Form submission logic would go here
    console.log('Form submitted:', formData);
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <section id="contact" className="py-20 bg-muted">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Contact Us
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Ready to schedule your window cleaning service? Get in touch with us today.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Phone className="h-5 w-5 text-primary" />
                  Contact Information
                </CardTitle>
                <CardDescription>
                  Contact us for quotes and inquiries
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3">
                  <Mail className="h-4 w-4 text-primary" />
                  <a 
                    href="mailto:Support@bullverticalservices.com"
                    className="text-foreground hover:text-primary transition-colors"
                  >
                    Support@bullverticalservices.com
                  </a>
                </div>
                
                <div className="flex items-center gap-3">
                  <Phone className="h-4 w-4 text-primary" />
                  <a 
                    href="tel:+17866130866"
                    className="text-foreground hover:text-primary transition-colors"
                  >
                    +1 (786) 613-0866
                  </a>
                </div>
                
                <div className="flex items-center gap-3">
                  <MapPin className="h-4 w-4 text-primary" />
                  <span className="text-foreground">Miami-Dade County</span>
                </div>
                
                <div className="pt-4 border-t border-border">
                  <p className="text-sm text-muted-foreground mb-4">
                    COI, W-9, vendor onboarding ready.
                  </p>
                  
                  <Button asChild className="w-full">
                    <a 
                      href="https://wa.me/34603428966?text=Hello%20BULL,%20I%20would%20like%20a%20quote%20for%20[Building]%20in%20Miami."
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2"
                    >
                      <MessageCircle className="h-4 w-4" />
                      Chat on WhatsApp
                    </a>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Contact Form */}
          <Card>
            <CardHeader>
              <CardTitle>Request a Quote</CardTitle>
              <CardDescription>
                Complete the form below and we'll get back to you within 24 hours
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <Input
                  placeholder="Full name"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  required
                />
                
                <Input
                  type="email"
                  placeholder="Email address"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  required
                />
                
                <Input
                  type="tel"
                  placeholder="Phone number"
                  value={formData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  required
                />
                
                <Input
                  placeholder="Building and address"
                  value={formData.building}
                  onChange={(e) => handleInputChange('building', e.target.value)}
                  required
                />
                
                <Input
                  placeholder="Floors / last cleaning date"
                  value={formData.stories}
                  onChange={(e) => handleInputChange('stories', e.target.value)}
                />
                
                <Select onValueChange={(value) => handleInputChange('scope', value)} required>
                  <SelectTrigger>
                    <SelectValue placeholder="Select service" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="exterior">Exterior</SelectItem>
                    <SelectItem value="interior">Interior</SelectItem>
                    <SelectItem value="post-construction">Post-construction</SelectItem>
                    <SelectItem value="hard-water-removal">Hard water removal</SelectItem>
                    <SelectItem value="pressure-washing">Pressure washing</SelectItem>
                  </SelectContent>
                </Select>
                
                <Textarea
                  placeholder="Notes / preferred schedule"
                  value={formData.notes}
                  onChange={(e) => handleInputChange('notes', e.target.value)}
                  rows={4}
                />
                
                {/* Honeypot anti-spam field */}
                <input
                  type="text"
                  name="company_website"
                  style={{ display: 'none' }}
                  tabIndex={-1}
                  autoComplete="off"
                />
                
                <Button type="submit" className="w-full">
                  Request Quote
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};