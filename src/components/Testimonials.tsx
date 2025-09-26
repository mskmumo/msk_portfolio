"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "Product Manager",
    company: "Tech Solutions Inc.",
    image: "/api/placeholder/64/64",
    content: "Mumo is an exceptional developer who consistently delivers high-quality work. His attention to detail and ability to solve complex problems makes him invaluable to any team.",
    rating: 5
  },
  {
    name: "David Chen",
    role: "CTO",
    company: "StartUp Hub",
    image: "/api/placeholder/64/64",
    content: "Working with Mumo was a game-changer for our project. He brought innovative solutions and his expertise in React and Next.js helped us launch ahead of schedule.",
    rating: 5
  },

];


export function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [timeLeft, setTimeLeft] = useState(5); // 5 seconds timer

  // Auto-rotate testimonials with timer
  useEffect(() => {
    if (!isAutoPlaying || testimonials.length === 0) return;
    
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
      setTimeLeft(5); // Reset timer
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  // Timer countdown
  useEffect(() => {
    if (!isAutoPlaying) return;
    
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          return 5; // Reset to 5 when it reaches 0
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isAutoPlaying]);

  const handleDotClick = (index: number) => {
    setCurrentIndex(index);
    setIsAutoPlaying(false);
    setTimeLeft(5);
    // Resume auto-play after 10 seconds
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <span
        key={i}
        className={`text-lg ${
          i < rating ? 'text-primary' : 'text-neutral-300 dark:text-neutral-600'
        }`}
      >
        ★
      </span>
    ));
  };

  // Guard against empty testimonials or invalid index
  if (testimonials.length === 0) {
    return null;
  }

  const currentTestimonial = testimonials[currentIndex];
  if (!currentTestimonial) {
    return null;
  }

  return (
    <section id="testimonials" className="py-16 sm:py-24 bg-background relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5"></div>
      
      <div className="mx-auto max-w-6xl px-4 relative">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground mb-4">
            What Clients Say
          </h2>
          <p className="text-neutral-600 dark:text-neutral-300 max-w-2xl mx-auto">
            Testimonials from clients and colleagues who have experienced my work firsthand.
          </p>
        </motion.div>

        {/* Featured Testimonial with Timer */}
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <div className="bg-card-bg rounded-2xl p-8 sm:p-12 border border-border backdrop-blur-sm shadow-xl max-w-4xl mx-auto relative">
            {/* Timer Display */}
            {isAutoPlaying && (
              <div className="absolute top-6 right-6 flex items-center space-x-2">
                <div className="bg-primary/10 backdrop-blur-sm rounded-full px-3 py-1 text-primary text-sm font-medium flex items-center space-x-1">
                  <div className="relative w-4 h-4">
                    <svg className="w-4 h-4 transform -rotate-90" viewBox="0 0 16 16">
                      <circle
                        cx="8"
                        cy="8"
                        r="6"
                        stroke="currentColor"
                        strokeWidth="2"
                        fill="none"
                        opacity="0.3"
                      />
                      <circle
                        cx="8"
                        cy="8"
                        r="6"
                        stroke="currentColor"
                        strokeWidth="2"
                        fill="none"
                        strokeDasharray={`${2 * Math.PI * 6}`}
                        strokeDashoffset={`${2 * Math.PI * 6 * (1 - (5 - timeLeft) / 5)}`}
                        className="transition-all duration-1000 ease-linear"
                      />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-xs font-bold">{timeLeft}</span>
                    </div>
                  </div>
                  <span className="text-xs">Next</span>
                </div>
              </div>
            )}

            <div className="text-center mb-6">
              <div className="flex justify-center mb-4">
                {renderStars(currentTestimonial.rating)}
              </div>
              <blockquote className="text-lg sm:text-xl text-foreground leading-relaxed italic">
                &ldquo;{currentTestimonial.content}&rdquo;
              </blockquote>
            </div>
            
            <div className="flex items-center justify-center">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white font-bold text-xl mr-4">
                {currentTestimonial.name.split(' ').map(n => n[0]).join('')}
              </div>
              <div className="text-left">
                <div className="font-semibold text-primary">
                  {currentTestimonial.name}
                </div>
                <div className="text-sm text-neutral-600 dark:text-neutral-300">
                  {currentTestimonial.role} at {currentTestimonial.company}
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Navigation Dots */}
        <div className="flex justify-center space-x-3 mb-8">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => handleDotClick(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentIndex
                  ? 'bg-primary scale-125'
                  : 'bg-neutral-300 dark:bg-neutral-600 hover:bg-primary/50'
              }`}
              aria-label={`Go to testimonial ${index + 1}`}
            />
          ))}
        </div>

        {/* Progress Bar Timer */}
        {isAutoPlaying && (
          <div className="mt-6 space-y-2">
            <div className="flex items-center justify-center space-x-2 text-sm text-neutral-600 dark:text-neutral-300">
              <span>Next testimonial in:</span>
              <div className="flex items-center space-x-1">
                <div className="relative w-5 h-5">
                  <svg className="w-5 h-5 transform -rotate-90" viewBox="0 0 20 20">
                    <circle
                      cx="10"
                      cy="10"
                      r="8"
                      stroke="currentColor"
                      strokeWidth="2"
                      fill="none"
                      opacity="0.3"
                    />
                    <circle
                      cx="10"
                      cy="10"
                      r="8"
                      stroke="currentColor"
                      strokeWidth="2"
                      fill="none"
                      strokeDasharray={`${2 * Math.PI * 8}`}
                      strokeDashoffset={`${2 * Math.PI * 8 * (1 - (5 - timeLeft) / 5)}`}
                      className="transition-all duration-1000 ease-linear text-primary"
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-xs font-bold text-primary">{timeLeft}</span>
                  </div>
                </div>
                <span className="text-primary font-semibold">{timeLeft}s</span>
              </div>
            </div>
            <div className="w-full bg-neutral-200 dark:bg-neutral-700 rounded-full h-2">
              <motion.div
                className="bg-gradient-to-r from-primary to-secondary h-2 rounded-full"
                initial={{ width: "100%" }}
                animate={{ width: "0%" }}
                transition={{ duration: 5000, ease: "linear" }}
                key={currentIndex} // Reset animation on slide change
              />
            </div>
          </div>
        )}

        {/* Auto-play Toggle */}
        <div className="flex justify-center mt-4">
          <button
            onClick={() => setIsAutoPlaying(!isAutoPlaying)}
            className="text-sm text-neutral-600 dark:text-neutral-300 hover:text-primary transition-colors duration-200"
          >
            {isAutoPlaying ? 'Pause' : 'Play'} testimonials
          </button>
        </div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center mt-12"
        >
          <p className="text-neutral-600 dark:text-neutral-300 mb-4">
            Ready to work together and create something amazing?
          </p>
          <motion.a
            href="/contact"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center justify-center px-6 py-3 bg-primary text-white rounded-full font-medium hover:bg-primary/90 transition-colors duration-300 shadow-lg hover:shadow-xl"
          >
            Let&apos;s Get Started
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}
