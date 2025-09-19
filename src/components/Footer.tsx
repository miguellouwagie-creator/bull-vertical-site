import React from 'react';

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-foreground text-white py-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="text-center md:text-left">
            <p className="text-lg font-semibold mb-2">BULL Vertical Services LLC</p>
            <p className="text-white/80">Professional rope-access window cleaning in Miami</p>
          </div>
          
          <div className="flex flex-wrap justify-center gap-6 text-sm">
            <a href="#safety" className="text-white/80 hover:text-white transition-colors">
              Safety
            </a>
            <a href="#" className="text-white/80 hover:text-white transition-colors">
              Terms
            </a>
            <a href="#" className="text-white/80 hover:text-white transition-colors">
              Privacy
            </a>
          </div>
        </div>
        
        <div className="border-t border-white/20 mt-8 pt-8 text-center">
          <p className="text-white/60">
            © {currentYear} BULL Vertical Services LLC. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};