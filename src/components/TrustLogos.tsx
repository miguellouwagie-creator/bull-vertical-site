import React from 'react';

export const TrustLogos = () => {
  const projects = [
    'Residences by Armani',
    'One Thousand Museum',
    'Hard Rock Building',
    'Paramount Miami Worldcenter',
    'Elysee Miami'
  ];

  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-8">
            Trusted across Miami's landmark towers.
          </h2>
          
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12">
            {projects.map((project, index) => (
              <div 
                key={index}
                className="text-muted-foreground font-medium text-lg md:text-xl hover:text-primary transition-colors"
              >
                {project}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};