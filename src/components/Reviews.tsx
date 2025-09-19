import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Star } from 'lucide-react';

interface Review {
  id: number;
  name: string;
  role: string;
  building: string;
  rating: number;
  comment: string;
}

export const Reviews = () => {
  const reviews: Review[] = [
    {
      id: 1,
      name: "María González",
      role: "Property Manager",
      building: "Brickell Heights",
      rating: 5,
      comment: "Servicio excepcional. El equipo de BULL es profesional, puntual y deja nuestras ventanas perfectas. La seguridad es su prioridad y se nota en cada trabajo."
    },
    {
      id: 2,
      name: "Carlos Rodriguez",
      role: "Facilities Director", 
      building: "One Thousand Museum",
      rating: 5,
      comment: "Llevamos 3 años trabajando con BULL. Su técnica de acceso por cuerdas es impresionante y los resultados hablan por sí solos. Altamente recomendado."
    },
    {
      id: 3,
      name: "Ana Martinez",
      role: "HOA President",
      building: "Paramount Miami",
      rating: 5,
      comment: "BULL transformó completamente la apariencia de nuestro edificio. Profesionales de primera clase con un enfoque increíble en los detalles y la seguridad."
    },
    {
      id: 4,
      name: "Roberto Silva",
      role: "Building Manager",
      building: "Brickell City Centre",
      rating: 5,
      comment: "El mejor servicio de limpieza de ventanas en Miami. El equipo de BULL es confiable, eficiente y siempre cumple con los plazos. Excelente relación calidad-precio."
    }
  ];

  const renderStars = (rating: number) => {
    return (
      <div className="flex space-x-1">
        {[...Array(5)].map((_, index) => (
          <Star
            key={index}
            className={`h-4 w-4 ${
              index < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
            }`}
          />
        ))}
      </div>
    );
  };

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Lo que dicen nuestros clientes
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Más de 600 edificios confían en nosotros para mantener sus ventanas impecables
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8">
          {reviews.map((review) => (
            <Card key={review.id} className="hover:shadow-lg transition-shadow duration-300">
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h4 className="font-semibold text-foreground">{review.name}</h4>
                    <p className="text-sm text-muted-foreground">{review.role}</p>
                    <p className="text-sm text-primary font-medium">{review.building}</p>
                  </div>
                  {renderStars(review.rating)}
                </div>
                
                <blockquote className="text-muted-foreground italic leading-relaxed">
                  "{review.comment}"
                </blockquote>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <div className="inline-flex items-center space-x-4 bg-muted p-6 rounded-lg">
            <div className="text-center">
              <div className="text-3xl font-bold text-primary">600+</div>
              <div className="text-sm text-muted-foreground">Edificios</div>
            </div>
            <div className="h-12 w-px bg-border"></div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary">10+</div>
              <div className="text-sm text-muted-foreground">Años</div>
            </div>
            <div className="h-12 w-px bg-border"></div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary">5★</div>
              <div className="text-sm text-muted-foreground">Calificación</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};