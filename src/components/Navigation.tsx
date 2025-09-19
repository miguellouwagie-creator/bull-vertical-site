import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Menu, X } from 'lucide-react';
import bullLogo from '@/assets/bull-logo.jpg';

export const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { href: '#services', label: 'Services' },
    { href: '#safety', label: 'Safety' },
    { href: '#process', label: 'Process' },
    { href: '#faq', label: 'FAQ' },
    { href: '#contact', label: 'Contact' },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-4">
            <div className="flex-shrink-0">
              <img 
                src={bullLogo} 
                alt="BULL Vertical Services LLC" 
                className="h-14 w-14 object-contain rounded-lg shadow-md bg-white/10 p-1"
              />
            </div>
            <div className="hidden sm:block">
              <span className="text-xl font-bold text-foreground leading-tight">
                BULL Vertical Services
              </span>
              <div className="text-sm text-muted-foreground">
                LLC
              </div>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                {item.label}
              </a>
            ))}
            <Button asChild>
              <a href="#contact">Get a Quote</a>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X /> : <Menu />}
          </Button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden py-4 space-y-2">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="block py-2 px-4 text-muted-foreground hover:text-primary transition-colors"
                onClick={() => setIsOpen(false)}
              >
                {item.label}
              </a>
            ))}
            <div className="pt-2">
              <Button asChild className="w-full">
                <a href="#contact" onClick={() => setIsOpen(false)}>
                  Get a Quote
                </a>
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};