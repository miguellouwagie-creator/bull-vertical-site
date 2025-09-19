import React from 'react';
import { Navigation } from '@/components/Navigation';
import { Hero } from '@/components/Hero';
import { TrustLogos } from '@/components/TrustLogos';
import { About } from '@/components/About';
import { Services } from '@/components/Services';

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <Hero />
      <TrustLogos />
      <About />
      <Services />
    </div>
  );
};

export default Index;
