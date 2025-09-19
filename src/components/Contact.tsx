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
            Contáctanos
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            ¿Listo para programar tu servicio de limpieza de ventanas? Ponte en contacto con nosotros hoy mismo.
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
                  Contáctanos para cotizaciones y consultas
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
                    COI, W-9, incorporación de proveedores lista.
                  </p>
                  
                  <Button asChild className="w-full">
                    <a 
                      href="https://wa.me/34603428966?text=Hola%20BULL,%20me%20gustaría%20una%20cotización%20para%20[Edificio]%20en%20Miami."
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2"
                    >
                      <MessageCircle className="h-4 w-4" />
                      Chatear por WhatsApp
                    </a>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Contact Form */}
          <Card>
            <CardHeader>
              <CardTitle>Solicita una Cotización</CardTitle>
              <CardDescription>
                Completa el formulario a continuación y te responderemos en 24 horas
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <Input
                  placeholder="Nombre completo"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  required
                />
                
                <Input
                  type="email"
                  placeholder="Correo electrónico"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  required
                />
                
                <Input
                  type="tel"
                  placeholder="Teléfono"
                  value={formData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  required
                />
                
                <Input
                  placeholder="Edificio y dirección"
                  value={formData.building}
                  onChange={(e) => handleInputChange('building', e.target.value)}
                  required
                />
                
                <Input
                  placeholder="Pisos / fecha última limpieza"
                  value={formData.stories}
                  onChange={(e) => handleInputChange('stories', e.target.value)}
                />
                
                <Select onValueChange={(value) => handleInputChange('scope', value)} required>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecciona el servicio" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="exterior">Exterior</SelectItem>
                    <SelectItem value="interior">Interior</SelectItem>
                    <SelectItem value="post-construction">Post-construcción</SelectItem>
                    <SelectItem value="hard-water-removal">Remoción agua dura</SelectItem>
                    <SelectItem value="pressure-washing">Lavado a presión</SelectItem>
                  </SelectContent>
                </Select>
                
                <Textarea
                  placeholder="Notas / horario preferido"
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
                  Solicitar Cotización
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};