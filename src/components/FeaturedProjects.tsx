"use client";

import { getAllProjects } from "@/lib/projects";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";

export function FeaturedProjects() {
  const projects = getAllProjects().filter((p) => p.featured);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [timeLeft, setTimeLeft] = useState(4); // 4 seconds timer
  const [selectedProject, setSelectedProject] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Auto-play functionality with timer
  useEffect(() => {
    if (!isAutoPlaying) return;
    
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => 
        prevIndex === projects.length - 1 ? 0 : prevIndex + 1
      );
      setTimeLeft(4); // Reset timer
    }, 4000); // Changed to 4 seconds

    return () => clearInterval(interval);
  }, [isAutoPlaying, projects.length]);

  // Timer countdown
  useEffect(() => {
    if (!isAutoPlaying) return;
    
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          return 4; // Reset to 4 when it reaches 0
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isAutoPlaying]);

  const goToPrevious = () => {
    setIsAutoPlaying(false);
    setCurrentIndex(currentIndex === 0 ? projects.length - 1 : currentIndex - 1);
    setTimeLeft(4);
  };

  const goToNext = () => {
    setIsAutoPlaying(false);
    setCurrentIndex(currentIndex === projects.length - 1 ? 0 : currentIndex + 1);
    setTimeLeft(4);
  };

  const goToSlide = (index: number) => {
    setIsAutoPlaying(false);
    setCurrentIndex(index);
    setTimeLeft(4);
  };

  const openModal = (project: any) => {
    setSelectedProject(project);
    setIsModalOpen(true);
    setIsAutoPlaying(false);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedProject(null);
  };

  const currentProject = projects[currentIndex];

  return (
    <section id="projects" className="py-16 sm:py-24 bg-background relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5"></div>
      
      <div className="mx-auto max-w-6xl px-4 relative">
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground mb-4">
            Featured Projects
          </h2>
          <p className="text-neutral-600 dark:text-neutral-300 max-w-2xl mx-auto">
            Explore my latest work in Business Intelligence and web development
          </p>
        </motion.div>
        
        {/* Slideshow Container */}
        <div className="relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="bg-card-bg rounded-2xl overflow-hidden shadow-xl border border-border max-w-4xl mx-auto"
            >
              <div className="grid lg:grid-cols-2 gap-0">
                {/* Image Section */}
                <div className="relative aspect-[4/3] lg:aspect-[3/2] overflow-hidden">
                  <Image
                    src={currentProject.coverImage}
                    alt={currentProject.title}
                    fill
                    sizes="(min-width: 1024px) 50vw, 100vw"
                    className="object-cover"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  
                  {/* Navigation Arrows */}
                  <button
                    onClick={goToPrevious}
                    className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-all duration-200 group"
                    aria-label="Previous project"
                  >
                    <ChevronLeftIcon className="w-6 h-6 group-hover:scale-110 transition-transform" />
                  </button>
                  
                  <button
                    onClick={goToNext}
                    className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-all duration-200 group"
                    aria-label="Next project"
                  >
                    <ChevronRightIcon className="w-6 h-6 group-hover:scale-110 transition-transform" />
                  </button>

                  {/* Project Counter with Enhanced Timer */}
                  <div className="absolute top-6 right-6 flex items-center space-x-3">
                    <div className="bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 text-white text-sm font-medium">
                      {currentIndex + 1} / {projects.length}
                    </div>
                    {isAutoPlaying && (
                      <div className="bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 text-white text-sm font-medium flex items-center space-x-2">
                        <div className="relative w-6 h-6">
                          <svg className="w-6 h-6 transform -rotate-90" viewBox="0 0 24 24">
                            <circle
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="rgba(255,255,255,0.3)"
                              strokeWidth="2"
                              fill="none"
                            />
                            <circle
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="white"
                              strokeWidth="2"
                              fill="none"
                              strokeDasharray={`${2 * Math.PI * 10}`}
                              strokeDashoffset={`${2 * Math.PI * 10 * (1 - (4 - timeLeft) / 4)}`}
                              className="transition-all duration-1000 ease-linear"
                            />
                          </svg>
                          <div className="absolute inset-0 flex items-center justify-center">
                            <span className="text-xs font-bold">{timeLeft}</span>
                          </div>
                        </div>
                        <span className="text-xs">Next</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Content Section */}
                <div className="p-4 lg:p-6 flex flex-col justify-center">
                  <div className="space-y-3">
                    <div>
                      <h3 className="text-xl lg:text-2xl font-bold tracking-tight text-foreground mb-1">
                        {currentProject.title}
                      </h3>
                      {currentProject.subtitle && (
                        <p className="text-sm text-primary font-medium mb-2">
                          {currentProject.subtitle}
                        </p>
                      )}
                      <p className="text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed line-clamp-3">
                        {currentProject.summary}
                      </p>
                    </div>

                    {/* Project Details - Simplified */}
                    <div className="space-y-2">
                      <div className="flex flex-wrap gap-1">
                        {currentProject.tags.slice(0, 3).map((tag) => (
                          <span
                            key={tag}
                            className="text-xs rounded-full px-2 py-1 bg-primary/10 text-primary border border-primary/20 font-medium"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      <div className="text-xs text-neutral-600 dark:text-neutral-300">
                        <span><strong>Role:</strong> {currentProject.role}</span>
                      </div>
                    </div>

                    {/* Action Button */}
                    <div className="pt-2">
                      <button 
                        onClick={() => openModal(currentProject)}
                        className="inline-flex items-center justify-center rounded-full px-4 py-2 bg-primary text-white text-sm font-semibold hover:bg-primary/90 transition-all duration-200 shadow-lg hover:shadow-xl"
                      >
                        View More
                        <svg className="w-3 h-3 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Dots Navigation */}
          <div className="flex justify-center mt-8 space-x-3">
            {projects.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-200 ${
                  index === currentIndex
                    ? 'bg-primary scale-125'
                    : 'bg-neutral-300 dark:bg-neutral-600 hover:bg-primary/50'
                }`}
                aria-label={`Go to project ${index + 1}`}
              />
            ))}
          </div>

          {/* Enhanced Timer Progress Bar */}
          {isAutoPlaying && (
            <div className="mt-6 space-y-2">
              <div className="flex items-center justify-center space-x-2 text-sm text-neutral-600 dark:text-neutral-300">
                <span>Next project in:</span>
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
                        strokeDashoffset={`${2 * Math.PI * 8 * (1 - (4 - timeLeft) / 4)}`}
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
                  transition={{ duration: 4000, ease: "linear" }}
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
              {isAutoPlaying ? 'Pause' : 'Play'} slideshow
            </button>
          </div>
        </div>
      </div>

      {/* Project Details Modal */}
      <AnimatePresence>
        {isModalOpen && selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={closeModal}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-card-bg rounded-2xl shadow-2xl border border-border max-w-4xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="grid lg:grid-cols-2 gap-0">
                {/* Image Section */}
                <div className="relative aspect-[4/3] lg:aspect-square overflow-hidden">
                  <Image
                    src={selectedProject.coverImage}
                    alt={selectedProject.title}
                    fill
                    sizes="(min-width: 1024px) 50vw, 100vw"
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  
                  {/* Close Button */}
                  <button
                    onClick={closeModal}
                    className="absolute top-4 right-4 w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-all duration-200"
                    aria-label="Close modal"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>

                {/* Content Section */}
                <div className="p-6 lg:p-8 flex flex-col justify-center">
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-2xl lg:text-3xl font-bold tracking-tight text-foreground mb-2">
                        {selectedProject.title}
                      </h3>
                      {selectedProject.subtitle && (
                        <p className="text-lg text-primary font-medium mb-4">
                          {selectedProject.subtitle}
                        </p>
                      )}
                      <p className="text-neutral-600 dark:text-neutral-300 leading-relaxed">
                        {selectedProject.summary}
                      </p>
                    </div>

                    {/* Project Details */}
                    <div className="space-y-4">
                      <div className="flex flex-wrap gap-2">
                        {selectedProject.tags.map((tag) => (
                          <span
                            key={tag}
                            className="text-sm rounded-full px-3 py-1 bg-primary/10 text-primary border border-primary/20 font-medium"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      <div className="flex flex-wrap gap-4 text-sm text-neutral-600 dark:text-neutral-300">
                        <span><strong>Role:</strong> {selectedProject.role}</span>
                        {selectedProject.client && (
                          <span><strong>Client:</strong> {selectedProject.client}</span>
                        )}
                      </div>

                      {/* Tech Stack */}
                      <div>
                        <h4 className="text-sm font-semibold text-foreground mb-2">Technologies</h4>
                        <div className="flex flex-wrap gap-2">
                          {selectedProject.tech.map((tech) => (
                            <span
                              key={tech}
                              className="text-xs rounded-full px-3 py-1 bg-secondary/10 text-secondary border border-secondary/20 font-medium"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Metrics */}
                      {selectedProject.metrics && selectedProject.metrics.length > 0 && (
                        <div>
                          <h4 className="text-sm font-semibold text-foreground mb-2">Impact</h4>
                          <div className="grid grid-cols-2 gap-4">
                            {selectedProject.metrics.map((metric, index) => (
                              <div key={index} className="text-center p-3 bg-background rounded-lg border border-border">
                                <div className="text-lg font-bold text-primary">{metric.value}</div>
                                <div className="text-xs text-neutral-600 dark:text-neutral-300">{metric.label}</div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Problem, Approach, Solution */}
                      {selectedProject.problem && (
                        <div>
                          <h4 className="text-sm font-semibold text-foreground mb-2">Problem</h4>
                          <p className="text-sm text-neutral-600 dark:text-neutral-300">{selectedProject.problem}</p>
                        </div>
                      )}

                      {selectedProject.approach && (
                        <div>
                          <h4 className="text-sm font-semibold text-foreground mb-2">Approach</h4>
                          <p className="text-sm text-neutral-600 dark:text-neutral-300">{selectedProject.approach}</p>
                        </div>
                      )}

                      {selectedProject.solution && (
                        <div>
                          <h4 className="text-sm font-semibold text-foreground mb-2">Solution</h4>
                          <p className="text-sm text-neutral-600 dark:text-neutral-300">{selectedProject.solution}</p>
                        </div>
                      )}

                      {selectedProject.impact && (
                        <div>
                          <h4 className="text-sm font-semibold text-foreground mb-2">Impact</h4>
                          <p className="text-sm text-neutral-600 dark:text-neutral-300">{selectedProject.impact}</p>
                        </div>
                      )}
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-4 pt-4">
                      {selectedProject.links?.demo && (
                        <a 
                          href={selectedProject.links.demo}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center justify-center rounded-full px-6 py-3 bg-primary text-white font-semibold hover:bg-primary/90 transition-all duration-200 shadow-lg hover:shadow-xl"
                        >
                          Live Demo
                          <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                          </svg>
                        </a>
                      )}
                      {selectedProject.links?.repo && (
                        <a 
                          href={selectedProject.links.repo}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center justify-center rounded-full px-6 py-3 border-2 border-primary text-primary font-semibold hover:bg-primary hover:text-white transition-all duration-200"
                        >
                          View Code
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
