import Link from "next/link";
import { WhatsAppButton } from "@/components/WhatsAppButton";

export function ContactCTA() {
  return (
    <section id="contact" className="py-20 bg-background">
      <div className="mx-auto max-w-6xl px-4 rounded-2xl border border-gray-200 dark:border-gray-700 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm p-8 sm:p-12 text-center shadow-xl">
        <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground mb-4">
          Let's build something great
        </h2>
        <p className="mt-4 text-neutral max-w-2xl mx-auto text-lg">
          Need a KPI dashboard or an animated, accessible web app? I can help from concept to deployment.
        </p>
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link 
            href="/contact" 
            className="inline-flex items-center justify-center rounded-full px-8 h-12 bg-primary text-white hover:bg-accent transition-all duration-300 font-medium shadow-lg hover:shadow-xl hover:scale-105"
          >
            Contact
          </Link>
          <WhatsAppButton 
            phoneNumber="2547XXXXXXXX" 
            className="inline-flex items-center justify-center rounded-full px-8 h-12 bg-transparent text-primary hover:text-accent border-2 border-primary hover:border-accent transition-all duration-300 font-medium hover:scale-105" 
          />
        </div>
      </div>
    </section>
  );
}


