"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { trackEvent } from "@/lib/analytics";

export function Hero() {
  return (
    <section className="py-16 sm:py-24 relative overflow-hidden bg-background">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5"></div>
      
      <div className="mx-auto max-w-6xl px-4 relative">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left side - Content */}
          <div className="space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ type: "spring", stiffness: 120, damping: 14 }}
              className="space-y-6"
            >
              <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight">
                Hello, I&apos;m{" "}
                <span className="text-primary">Mumo Mwangangi</span>
              </h1>
              <p className="text-lg sm:text-xl text-neutral-600 dark:text-neutral-300 max-w-2xl leading-relaxed">
                I&apos;m a Business Intelligence and Software Engineer based in Kenya. I strive to build 
                immersive and beautiful web applications through carefully crafted code and user-centric design.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, type: "spring", stiffness: 120, damping: 14 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Link 
                href="#contact" 
                className="inline-flex items-center justify-center rounded-full px-8 py-4 bg-primary text-white font-semibold hover:bg-primary/90 transition-all duration-200 shadow-lg hover:shadow-xl" 
                onClick={() => trackEvent("cta_click", { location: "hero", label: "say_hello" })}
              >
                Say Hello!
              </Link>
              <Link 
                href="#projects" 
                className="inline-flex items-center justify-center rounded-full px-8 py-4 border-2 border-primary text-primary font-semibold hover:bg-primary hover:text-white transition-all duration-200" 
                onClick={() => trackEvent("cta_click", { location: "hero", label: "view_projects" })}
              >
                View Projects
              </Link>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 120, damping: 14 }}
              className="grid grid-cols-3 gap-6 pt-8"
            >
              <div className="text-center">
                <div className="text-2xl sm:text-3xl font-bold text-primary">5+</div>
                <div className="text-sm text-neutral-600 dark:text-neutral-400">Years Experience</div>
              </div>
              <div className="text-center">
                <div className="text-2xl sm:text-3xl font-bold text-primary">50+</div>
                <div className="text-sm text-neutral-600 dark:text-neutral-400">Projects Completed</div>
              </div>
              <div className="text-center">
                <div className="text-2xl sm:text-3xl font-bold text-primary">25+</div>
                <div className="text-sm text-neutral-600 dark:text-neutral-400">Happy Clients</div>
              </div>
            </motion.div>
          </div>

          {/* Right side - Image */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, type: "spring", stiffness: 120, damping: 14 }}
            className="relative"
          >
            <div className="relative w-full max-w-md mx-auto">
              <div className="aspect-square rounded-3xl overflow-hidden shadow-2xl bg-gradient-to-br from-primary/20 to-secondary/20 p-2">
                <div className="w-full h-full rounded-2xl overflow-hidden bg-card-bg">
                  <Image
                    src="/pic_3.jpg"
                    alt="Mumo Mwangangi - Business Intelligence Engineer"
                    width={400}
                    height={400}
                    className="w-full h-full object-cover"
                    priority
                  />
                </div>
              </div>
              
              {/* Floating elements */}
              <div className="absolute -top-4 -right-4 w-8 h-8 bg-primary rounded-full animate-pulse"></div>
              <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-secondary rounded-full animate-pulse delay-1000"></div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}


