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

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1 }
};

export function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Auto-rotate testimonials
  useEffect(() => {
    if (!isAutoPlaying) return;
    
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const handleDotClick = (index: number) => {
    setCurrentIndex(index);
    setIsAutoPlaying(false);
    // Resume auto-play after 10 seconds
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <span
        key={i}
        className={`text-lg ${
          i < rating ? 'text-accent' : 'text-soft-gray/40'
        }`}
      >
        ★
      </span>
    ));
  };

  return (
    <section id="testimonials" className="py-16 sm:py-24 bg-gradient-to-br from-gray-900/20 to-background">
      <div className="mx-auto max-w-6xl px-4">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-primary mb-4">
            What Clients Say
          </h2>
          <p className="text-muted max-w-2xl mx-auto">
            Testimonials from clients and colleagues who have experienced my work firsthand.
          </p>
        </motion.div>

        {/* Featured Testimonial */}
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <div className="bg-off-white/90 dark:bg-deep-blue/80 rounded-2xl p-8 sm:p-12 border border-soft-blue/20 backdrop-blur-sm shadow-xl max-w-4xl mx-auto">
            <div className="text-center mb-6">
              <div className="flex justify-center mb-4">
                {renderStars(testimonials[currentIndex].rating)}
              </div>
              <blockquote className="text-lg sm:text-xl text-foreground leading-relaxed italic">
                "{testimonials[currentIndex].content}"
              </blockquote>
            </div>
            
            <div className="flex items-center justify-center">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-secondary to-accent flex items-center justify-center text-white font-bold text-xl mr-4">
                {testimonials[currentIndex].name.split(' ').map(n => n[0]).join('')}
              </div>
              <div className="text-left">
                <div className="font-semibold text-primary">
                  {testimonials[currentIndex].name}
                </div>
                <div className="text-sm text-muted">
                  {testimonials[currentIndex].role} at {testimonials[currentIndex].company}
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Navigation Dots */}
        <div className="flex justify-center space-x-2 mb-12">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => handleDotClick(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentIndex
                  ? 'bg-accent scale-125'
                  : 'bg-soft-gray/40 hover:bg-soft-gray/60'
              }`}
              aria-label={`Go to testimonial ${index + 1}`}
            />
          ))}
        </div>

        {/* All Testimonials Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ y: -4 }}
              className={`bg-off-white/90 dark:bg-deep-blue/80 rounded-xl p-6 border border-soft-blue/20 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300 ${
                index === currentIndex ? 'ring-2 ring-accent' : ''
              }`}
            >
              <div className="flex justify-center mb-3">
                {renderStars(testimonial.rating)}
              </div>
              
              <blockquote className="text-sm text-foreground leading-relaxed mb-4 line-clamp-4">
                "{testimonial.content}"
              </blockquote>
              
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-secondary to-accent flex items-center justify-center text-white font-bold text-sm mr-3">
                  {testimonial.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div>
                  <div className="font-semibold text-primary text-sm">
                    {testimonial.name}
                  </div>
                  <div className="text-xs text-muted">
                    {testimonial.role}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center mt-12"
        >
          <p className="text-muted mb-4">
            Ready to work together and create something amazing?
          </p>
          <motion.a
            href="/contact"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center justify-center px-6 py-3 bg-primary text-off-white rounded-full font-medium hover:bg-secondary transition-colors duration-300 shadow-lg hover:shadow-xl"
          >
            Let's Get Started
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}
