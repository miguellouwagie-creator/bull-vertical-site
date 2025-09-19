import React from 'react';
import { Button } from '@/components/ui/button';
import heroImage from '@/assets/miami-buildings.jpg';

export const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${heroImage})`,
        }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/30" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center text-white px-4 max-w-5xl">
        <h1 className="text-5xl md:text-7xl font-bold mb-8 leading-tight">
          <span className="bg-gradient-to-r from-white via-blue-100 to-primary bg-clip-text text-transparent drop-shadow-2xl">
            Miami's Premier
          </span>
          <span className="block bg-gradient-to-r from-primary via-teal-300 to-white bg-clip-text text-transparent drop-shadow-2xl mt-2">
            Window Cleaning
          </span>
        </h1>
        
        <p className="text-xl md:text-2xl mb-10 text-white/90 font-medium max-w-3xl mx-auto">
          Rope-access specialists • 600+ buildings • OSHA-aligned safety
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button size="lg" className="text-lg px-8 py-4" asChild>
            <a href="#contact">Contáctanos</a>
          </Button>
          <Button 
            size="lg" 
            variant="outline" 
            className="text-lg px-8 py-4 text-white border-white/30 bg-white/10 hover:bg-white hover:text-primary backdrop-blur-sm" 
            asChild
          >
            <a href="#contact">Visita Técnica</a>
          </Button>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white/60 animate-bounce">
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>
    </section>
  );
};