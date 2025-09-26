"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ThemeToggle } from "@/components/ThemeToggle";
import { ContactModal } from "@/components/ContactModal";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);

  // Close menu when clicking outside or on escape
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsMenuOpen(false);
    };
    
    if (isMenuOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden'; // Prevent background scroll
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isMenuOpen]);

  const navLinks = [
    { href: "#about", label: "About" },
    { href: "#skills", label: "Skills" },
    { href: "#projects", label: "Projects" },
    { href: "#experience", label: "Experience" },
    { href: "#education", label: "Education" },
    { href: "#testimonials", label: "Testimonials" },
    { href: "#contact", label: "Contact" }
  ];

  const handleLinkClick = () => {
    setIsMenuOpen(false);
  };

  const handleContactClick = () => {
    setIsContactModalOpen(true);
    setIsMenuOpen(false);
  };

  return (
    <>
    <header className="sticky top-0 z-40 w-full backdrop-blur-sm bg-card-bg/80 dark:bg-background/80 border-b border-border">
      <div className="mx-auto max-w-6xl px-4 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center space-x-3 group">
          <div className="relative">
            <Image
              src="/logo.svg"
              alt="Mumo Mwangangi Logo"
              width={40}
              height={40}
              className="transition-transform duration-300 group-hover:scale-110"
            />
          </div>
          <span className="font-bold tracking-tight text-xl text-foreground group-hover:text-primary transition-colors duration-300">
            Mumo Mwangangi
          </span>
        </Link>
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
          {navLinks.slice(0, -1).map((link) => (
            <Link 
              key={link.href}
              href={link.href} 
              className="text-foreground hover:text-primary transition-colors duration-300 relative group"
            >
              {link.label}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
            </Link>
          ))}
          <ThemeToggle />
              <button 
                onClick={handleContactClick}
                className="inline-flex items-center justify-center rounded-full px-6 py-2 bg-primary text-white font-semibold hover:bg-primary/90 transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                Contact
              </button>
        </nav>
        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center gap-4">
          <ThemeToggle />
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="text-foreground hover:text-primary transition-colors duration-300 p-2"
            aria-label="Toggle menu"
          >
            <motion.div
              animate={isMenuOpen ? "open" : "closed"}
              className="w-6 h-6 flex flex-col justify-center items-center"
            >
              <motion.span
                variants={{
                  closed: { rotate: 0, y: 0 },
                  open: { rotate: 45, y: 6 }
                }}
                className="w-6 h-0.5 bg-current block transform transition-all duration-300"
              />
              <motion.span
                variants={{
                  closed: { opacity: 1 },
                  open: { opacity: 0 }
                }}
                className="w-6 h-0.5 bg-current block mt-1.5 transition-all duration-300"
              />
              <motion.span
                variants={{
                  closed: { rotate: 0, y: 0 },
                  open: { rotate: -45, y: -6 }
                }}
                className="w-6 h-0.5 bg-current block mt-1.5 transform transition-all duration-300"
              />
            </motion.div>
          </button>
        </div>
      </div>
    </header>

    {/* Mobile Menu Overlay */}
    <AnimatePresence>
      {isMenuOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsMenuOpen(false)}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 md:hidden"
          />
          
          {/* Menu Panel */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 h-full w-80 max-w-[85vw] bg-card-bg dark:bg-card-bg shadow-2xl z-50 md:hidden"
          >
            <div className="flex flex-col h-full">
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-border">
                <span className="font-bold text-lg text-foreground">Menu</span>
                <button
                  onClick={() => setIsMenuOpen(false)}
                  className="p-2 text-foreground hover:text-primary transition-colors duration-300"
                  aria-label="Close menu"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              {/* Navigation Links */}
              <nav className="flex-1 px-6 py-8">
                <div className="space-y-6">
                  {navLinks.map((link, index) => (
                    <motion.div
                      key={link.href}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      {link.href === "#contact" ? (
                        <button
                          onClick={handleContactClick}
                          className="block text-lg font-medium text-foreground hover:text-primary transition-colors duration-300 py-2 w-full text-left"
                        >
                          {link.label}
                        </button>
                      ) : (
                        <Link
                          href={link.href}
                          onClick={handleLinkClick}
                          className="block text-lg font-medium text-foreground hover:text-primary transition-colors duration-300 py-2"
                        >
                          {link.label}
                        </Link>
                      )}
                    </motion.div>
                  ))}
                </div>
              </nav>
              
              {/* Footer */}
              <div className="p-6 border-t border-border">
                <p className="text-sm text-neutral text-center">
                  © 2024 Mumo Mwangangi
                </p>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>

    <ContactModal 
      isOpen={isContactModalOpen} 
      onClose={() => setIsContactModalOpen(false)} 
    />
    </>
  );
}


