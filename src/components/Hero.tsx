import React from 'react';
import { Button } from '@/components/ui/button';
import heroImage from '@/assets/window-cleaning-3.jpg';

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
        <div className="absolute inset-0 bg-black/50" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center text-white px-4 max-w-4xl">
        <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
          Rope-access window cleaning for Miami's skyline — fast, safe, flawless.
        </h1>
        
        <p className="text-xl md:text-2xl mb-8 text-white/90">
          10+ years · 600+ buildings · OSHA-aligned rope access.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button size="lg" asChild>
            <a href="#contact">Get a Quote</a>
          </Button>
          <Button size="lg" variant="outline" className="text-white border-white hover:bg-white hover:text-primary" asChild>
            <a href="#contact">Request a Site Walk</a>
          </Button>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white/80 animate-bounce">
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>
    </section>
  );
};