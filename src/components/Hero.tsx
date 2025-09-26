"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { trackEvent } from "@/lib/analytics";

export function Hero() {
  return (
    <section className="py-12 sm:py-16 md:py-20 lg:py-24 relative overflow-hidden bg-background min-h-[90vh] flex items-center">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5"></div>
      
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 relative w-full">
        <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 items-center">
          {/* Left side - Content */}
          <div className="space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ type: "spring", stiffness: 120, damping: 14 }}
              className="space-y-6"
            >
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight">
                Hello, I&apos;m{" "}
                <span className="text-primary">Mumo Mwangangi</span>
              </h1>
              <p className="text-base sm:text-lg md:text-xl text-neutral-600 dark:text-neutral-300 max-w-2xl leading-relaxed">
                I&apos;m a Software Developer and Data Analyst based in Kenya. I bridge the gap between code and insights, 
                building intelligent applications while transforming complex data into strategic business solutions that drive measurable impact.
              </p>
              
              <div className="bg-card-bg border border-border rounded-xl p-6 space-y-4">
                <h3 className="text-lg font-semibold text-foreground">What Sets Me Apart:</h3>
                <ul className="space-y-3 text-neutral-600 dark:text-neutral-300">
                  <li className="flex items-start space-x-3">
                    <span className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></span>
                    <span>Unique blend of software engineering rigor and analytical thinking</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <span className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></span>
                    <span>Strong communication skills for translating technical concepts to stakeholders</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <span className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></span>
                    <span>Passion for continuous learning and adopting emerging technologies</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <span className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></span>
                    <span>Creative problem-solving with a focus on delivering measurable business value</span>
                  </li>
                </ul>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, type: "spring", stiffness: 120, damping: 14 }}
              className="flex flex-col sm:flex-row gap-3 sm:gap-4"
            >
              <Link 
                href="#contact" 
                className="inline-flex items-center justify-center rounded-full px-6 sm:px-8 py-3 sm:py-4 bg-primary text-white font-semibold hover:bg-primary/90 transition-all duration-200 shadow-lg hover:shadow-xl text-sm sm:text-base" 
                onClick={() => trackEvent("cta_click", { location: "hero", label: "say_hello" })}
              >
                Say Hello!
              </Link>
              <Link 
                href="#projects" 
                className="inline-flex items-center justify-center rounded-full px-6 sm:px-8 py-3 sm:py-4 border-2 border-primary text-primary font-semibold hover:bg-primary hover:text-white transition-all duration-200 text-sm sm:text-base" 
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
              className="grid grid-cols-3 gap-3 sm:gap-6 pt-6 sm:pt-8"
            >
              <div className="text-center">
                <div className="text-xl sm:text-2xl md:text-3xl font-bold text-primary">5+</div>
                <div className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400">Years Experience</div>
              </div>
              <div className="text-center">
                <div className="text-xl sm:text-2xl md:text-3xl font-bold text-primary">50+</div>
                <div className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400">Projects Completed</div>
              </div>
              <div className="text-center">
                <div className="text-xl sm:text-2xl md:text-3xl font-bold text-primary">25+</div>
                <div className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400">Happy Clients</div>
              </div>
            </motion.div>
          </div>

          {/* Right side - Image */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, type: "spring", stiffness: 120, damping: 14 }}
            className="relative order-first lg:order-last"
          >
            <div className="relative w-full max-w-sm sm:max-w-md mx-auto">
              <div className="aspect-square rounded-2xl sm:rounded-3xl overflow-hidden shadow-xl sm:shadow-2xl bg-gradient-to-br from-primary/20 to-secondary/20 p-1.5 sm:p-2">
                <div className="w-full h-full rounded-xl sm:rounded-2xl overflow-hidden bg-card-bg">
                  <Image
                    src="/pic_3.jpg"
                    alt="Mumo Mwangangi - Business Intelligence Engineer"
                    width={400}
                    height={400}
                    className="w-full h-full object-cover"
                    priority
                    sizes="(max-width: 640px) 280px, (max-width: 1024px) 320px, 400px"
                  />
                </div>
              </div>
              
              {/* Floating elements */}
              <div className="absolute -top-2 sm:-top-4 -right-2 sm:-right-4 w-6 sm:w-8 h-6 sm:h-8 bg-primary rounded-full animate-pulse"></div>
              <div className="absolute -bottom-2 sm:-bottom-4 -left-2 sm:-left-4 w-4 sm:w-6 h-4 sm:h-6 bg-secondary rounded-full animate-pulse delay-1000"></div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}


