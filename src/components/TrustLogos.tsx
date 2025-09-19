import React from 'react';

export const TrustLogos = () => {
  const projects = [
    {
      name: 'Residences by Armani',
      description: 'Premium luxury residential tower with complex glass facade systems'
    },
    {
      name: 'One Thousand Museum', 
      description: 'Zaha Hadid-designed architectural masterpiece requiring specialized techniques'
    },
    {
      name: 'Hard Rock Building',
      description: 'Iconic guitar-shaped structure with unique curved glass surfaces'
    },
    {
      name: 'Paramount Miami Worldcenter',
      description: 'Ultra-modern high-rise with floor-to-ceiling window systems'
    },
    {
      name: 'Elysee Miami',
      description: 'Waterfront luxury tower with extensive glass balcony systems'
    }
  ];

  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
            Trusted across Miami's landmark towers.
          </h2>
          <p className="text-lg text-muted-foreground mb-12 max-w-3xl mx-auto">
            We've successfully completed window cleaning projects at some of Miami's most prestigious and challenging buildings, 
            earning the trust of property managers and residents with our professional service and attention to detail.
          </p>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project, index) => (
              <div 
                key={index}
                className="bg-muted/50 p-6 rounded-lg hover:bg-muted transition-colors"
              >
                <h3 className="font-semibold text-foreground text-lg mb-2">{project.name}</h3>
                <p className="text-sm text-muted-foreground">{project.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};