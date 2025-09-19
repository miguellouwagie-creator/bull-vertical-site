import React from 'react';
import { Navigation } from '@/components/Navigation';
import { Hero } from '@/components/Hero';
import { TrustLogos } from '@/components/TrustLogos';
import { About } from '@/components/About';
import { Services } from '@/components/Services';
import { Reviews } from '@/components/Reviews';
import { Contact } from '@/components/Contact';
import { Footer } from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <Hero />
      <TrustLogos />
      <About />
      <Services />
      <Reviews />
      <Contact />
      <Footer />
    </div>
  );
};

export default Index;
