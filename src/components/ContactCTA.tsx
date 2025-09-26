"use client";

import { useState } from "react";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { ContactModal } from "@/components/ContactModal";

export function ContactCTA() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <section id="contact" className="py-12 sm:py-16 md:py-20 bg-background relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5"></div>
        
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 relative">
          <div className="rounded-xl sm:rounded-2xl border border-border bg-card-bg backdrop-blur-sm p-6 sm:p-8 lg:p-12 text-center shadow-xl">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-foreground mb-4">
              Let&apos;s build something great
            </h2>
            <p className="mt-4 text-base sm:text-lg text-neutral-600 dark:text-neutral-300 max-w-2xl mx-auto">
              Need a KPI dashboard or an animated, accessible web app? I can help from concept to deployment.
            </p>
            <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
              <button 
                onClick={() => setIsModalOpen(true)}
                className="inline-flex items-center justify-center rounded-full px-8 h-12 bg-primary text-white hover:bg-primary/90 transition-all duration-300 font-medium shadow-lg hover:shadow-xl hover:scale-105"
              >
                Contact
              </button>
              <WhatsAppButton 
                phoneNumber="254110018735" 
                className="inline-flex items-center justify-center rounded-full px-8 h-12 bg-transparent text-primary hover:text-primary/80 border-2 border-primary hover:border-primary/80 transition-all duration-300 font-medium hover:scale-105" 
              />
            </div>
          </div>
        </div>
      </section>

      <ContactModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
    </>
  );
}


