import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';

interface Service {
  id: string;
  title: string;
  description: string;
  benefits: string[];
}

export const Services = () => {
  const [selectedServices, setSelectedServices] = useState<string[]>([]);

  const services: Service[] = [
    {
      id: 'window-cleaning',
      title: 'Window Cleaning',
      description: 'Professional exterior and interior window cleaning via rope access',
      benefits: [
        'Streak-free crystal clear results',
        'Access to all building levels safely',
        'Minimal disruption to building operations'
      ]
    },
    {
      id: 'stain-removal',
      title: 'Hard-Water Stain Removal',
      description: 'Glass restoration and hard-water stain removal services',
      benefits: [
        'Restore glass to original clarity',
        'Specialized cleaning compounds',
        'Long-lasting protection treatments'
      ]
    },
    {
      id: 'sealant-cleaning',
      title: 'Sealant & Frame Cleaning',
      description: 'Complete window frame and sealant maintenance',
      benefits: [
        'Extend window system lifespan',
        'Prevent water infiltration',
        'Maintain building appearance'
      ]
    },
    {
      id: 'post-construction',
      title: 'Post-Construction Cleaning',
      description: 'Deep interior and exterior cleaning for new construction',
      benefits: [
        'Remove construction residue completely',
        'Prepare building for occupancy',
        'White-glove interior detailing'
      ]
    },
    {
      id: 'maintenance-programs',
      title: 'Maintenance Programs',
      description: 'Regular quarterly and bi-annual cleaning schedules',
      benefits: [
        'Customized cleaning schedules',
        'Priority booking and pricing',
        'Consistent building appearance'
      ]
    },
    {
      id: 'pressure-washing',
      title: 'Pressure Washing',
      description: 'High-rise facade and pavement pressure washing services',
      benefits: [
        'Remove dirt, mold, and stains',
        'Eco-friendly cleaning solutions',
        'Professional wastewater handling'
      ]
    }
  ];

  const toggleService = (serviceId: string) => {
    setSelectedServices(prev => 
      prev.includes(serviceId) 
        ? prev.filter(id => id !== serviceId)
        : [...prev, serviceId]
    );
  };

  return (
    <section id="services" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Our Services
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Complete rope-access solutions for Miami's high-rise buildings
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {services.map((service) => (
            <Card key={service.id} className="relative group hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-xl mb-2">{service.title}</CardTitle>
                    <CardDescription>{service.description}</CardDescription>
                  </div>
                  <Checkbox
                    checked={selectedServices.includes(service.id)}
                    onCheckedChange={() => toggleService(service.id)}
                    className="ml-2 mt-1"
                  />
                </div>
              </CardHeader>
              
              <CardContent>
                <ul className="space-y-2">
                  {service.benefits.map((benefit, index) => (
                    <li key={index} className="flex items-start text-sm text-muted-foreground">
                      <span className="text-primary mr-2">•</span>
                      {benefit}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>

        {selectedServices.length > 0 && (
          <div className="text-center">
            <div className="inline-flex items-center gap-4 bg-muted p-4 rounded-lg">
              <span className="text-sm font-medium">Selected services:</span>
              <div className="flex flex-wrap gap-2">
                {selectedServices.map(serviceId => {
                  const service = services.find(s => s.id === serviceId);
                  return (
                    <Badge key={serviceId} variant="secondary">
                      {service?.title}
                    </Badge>
                  );
                })}
              </div>
              <Button asChild>
                <a href="#contact">Get Quote for Selected Services</a>
              </Button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};