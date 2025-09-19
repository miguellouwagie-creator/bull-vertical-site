import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Star } from 'lucide-react';

interface Review {
  id: number;
  name: string;
  role: string;
  rating: number;
  comment: string;
}

export const Reviews = () => {
  const reviews: Review[] = [
    {
      id: 1,
      name: "María González",
      role: "Property Manager",
      rating: 5,
      comment: "Exceptional service. The BULL team is professional, punctual, and leaves our windows perfect. Safety is their priority and it shows in every job."
    },
    {
      id: 2,
      name: "Carlos Rodriguez",
      role: "Facilities Director", 
      rating: 5,
      comment: "We've been working with BULL for 3 years. Their rope access technique is impressive and the results speak for themselves. Highly recommended."
    },
    {
      id: 3,
      name: "Ana Martinez",
      role: "HOA President",
      rating: 5,
      comment: "BULL completely transformed our building's appearance. First-class professionals with an incredible focus on details and safety."
    },
    {
      id: 4,
      name: "Roberto Silva",
      role: "Building Manager",
      rating: 5,
      comment: "The best window cleaning service in Miami. The BULL team is reliable, efficient, and always meets deadlines. Excellent value for money."
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
            What Our Clients Say
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Over 600 buildings trust us to keep their windows spotless
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
              <div className="text-sm text-muted-foreground">Buildings</div>
            </div>
            <div className="h-12 w-px bg-border"></div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary">10+</div>
              <div className="text-sm text-muted-foreground">Years</div>
            </div>
            <div className="h-12 w-px bg-border"></div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary">5★</div>
              <div className="text-sm text-muted-foreground">Rating</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};