import React from "react";
import { Navigation } from "@/components/Navigation";
import { Hero } from "@/components/Hero";
import { TrustLogos } from "@/components/TrustLogos";
import { About } from "@/components/About";
// ⬇️ QUITAMOS el antiguo:
// import { Services } from "@/components/Services";
import ServicesSection from "@/sections/ServicesSection"; // ⬅️ nuevo
import { WorkGallery } from "@/sections/WorkGallery";
import { Reviews } from "@/components/Reviews";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";
import { FAQSection } from "@/sections/FAQSection";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <Hero />
      <TrustLogos />
      <About />
      <ServicesSection /> {/* ⬅️ sustituye al antiguo <Services /> */}
      <WorkGallery />
      <Reviews />
      <FAQSection />
      <Contact />
      <Footer />
    </div>
  );
};

export default Index;
