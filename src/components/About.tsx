import React from 'react';
import aboutImage from '@/assets/window-cleaning-2.jpg';

export const About = () => {
  return (
    <section className="py-20 bg-muted">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
              Who We Are
            </h2>
            
            <div className="space-y-4 text-lg text-muted-foreground">
              <p>
                Started in 2015 learning rope-access techniques alongside Spanish experts from Windows Leaders. 
                With 10+ years of experience and 600+ buildings serviced in Miami, we've built a reputation 
                for excellence and safety.
              </p>
              
              <p>
                We evolved from GM Windows Cleaning to BULL Vertical Services LLC, always committed to 
                quality and safety in everything we do. Our team brings professional expertise to every 
                high-rise project across Miami-Dade County.
              </p>
            </div>
          </div>
          
          <div className="relative">
            <img 
              src={aboutImage} 
              alt="BULL Vertical Services team at work" 
              className="rounded-lg shadow-lg w-full h-auto"
            />
          </div>
        </div>
      </div>
    </section>
  );
};