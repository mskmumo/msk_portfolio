"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { contactSchema, type ContactInput } from "@/lib/validation";

export function ContactForm() {
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(formData: FormData) {
    setStatus("submitting");
    setError(null);
    const payload: ContactInput = {
      name: String(formData.get("name") || ""),
      email: String(formData.get("email") || ""),
      phone: String(formData.get("phone") || ""),
      budget: String(formData.get("budget") || ""),
      subject: String(formData.get("subject") || ""),
      message: String(formData.get("message") || ""),
      website: String(formData.get("website") || ""),
    };

    const validated = contactSchema.safeParse(payload);
    if (!validated.success) {
      setStatus("error");
      setError("Please fix the highlighted fields.");
      return;
    }

    const res = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(validated.data),
    });
    if (res.ok) {
      setStatus("success");
    } else {
      setStatus("error");
      setError("Something went wrong. Please try again.");
    }
  }

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className="max-w-2xl mx-auto"
    >
      <div className="bg-card-bg backdrop-blur-sm border border-border rounded-2xl p-6 sm:p-8 shadow-xl">
        <motion.div variants={itemVariants} className="text-center mb-8">
          <h3 className="text-2xl sm:text-3xl font-bold text-foreground mb-2">Get In Touch</h3>
          <p className="text-neutral-600 dark:text-neutral-300">
            Ready to start your project? Fill out the form below and I'll get back to you within 24 hours.
          </p>
        </motion.div>

        <form action={onSubmit} className="space-y-6">
          {/* Honeypot */}
          <input type="text" name="website" className="hidden" tabIndex={-1} autoComplete="off" aria-label="Leave this field blank" placeholder="" />
          
          {/* Name and Email Row */}
          <motion.div variants={itemVariants} className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            <div className="group">
              <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2 group-focus-within:text-primary transition-colors">
                Name *
              </label>
              <div className="relative">
                <input 
                  id="name" 
                  name="name" 
                  required 
                  className="w-full h-12 px-4 rounded-xl border-2 border-border bg-transparent focus:border-primary focus:outline-none transition-all duration-300 text-foreground placeholder:text-neutral-400 hover:border-primary/50" 
                  placeholder="Your full name"
                />
                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-primary/10 to-secondary/10 opacity-0 group-focus-within:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
              </div>
            </div>
            
            <div className="group">
              <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2 group-focus-within:text-primary transition-colors">
                Email *
              </label>
              <div className="relative">
                <input 
                  id="email" 
                  name="email" 
                  type="email" 
                  required 
                  className="w-full h-12 px-4 rounded-xl border-2 border-border bg-transparent focus:border-primary focus:outline-none transition-all duration-300 text-foreground placeholder:text-neutral-400 hover:border-primary/50" 
                  placeholder="your.email@example.com"
                />
                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-primary/10 to-secondary/10 opacity-0 group-focus-within:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
              </div>
            </div>
          </motion.div>
          
          {/* Phone and Budget Row */}
          <motion.div variants={itemVariants} className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            <div className="group">
              <label htmlFor="phone" className="block text-sm font-medium text-foreground mb-2 group-focus-within:text-primary transition-colors">
                Phone Number *
              </label>
              <div className="relative">
                <input 
                  id="phone" 
                  name="phone" 
                  type="tel" 
                  required 
                  placeholder="+254 700 000 000" 
                  className="w-full h-12 px-4 rounded-xl border-2 border-border bg-transparent focus:border-primary focus:outline-none transition-all duration-300 text-foreground placeholder:text-neutral-400 hover:border-primary/50" 
                />
                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-primary/10 to-secondary/10 opacity-0 group-focus-within:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
              </div>
            </div>
            
            <div className="group">
              <label htmlFor="budget" className="block text-sm font-medium text-foreground mb-2 group-focus-within:text-primary transition-colors">
                Budget (KSh) *
              </label>
              <div className="relative">
                <input 
                  id="budget" 
                  name="budget" 
                  required 
                  placeholder="KSh 500,000 - KSh 1,000,000" 
                  className="w-full h-12 px-4 rounded-xl border-2 border-border bg-transparent focus:border-primary focus:outline-none transition-all duration-300 text-foreground placeholder:text-neutral-400 hover:border-primary/50" 
                />
                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-primary/10 to-secondary/10 opacity-0 group-focus-within:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
              </div>
            </div>
          </motion.div>
          
          {/* Subject */}
          <motion.div variants={itemVariants} className="group">
            <label htmlFor="subject" className="block text-sm font-medium text-foreground mb-2 group-focus-within:text-primary transition-colors">
              Project Subject *
            </label>
            <div className="relative">
              <input 
                id="subject" 
                name="subject" 
                required 
                placeholder="Web Development, Data Analytics, BI Dashboard, etc." 
                className="w-full h-12 px-4 rounded-xl border-2 border-border bg-transparent focus:border-primary focus:outline-none transition-all duration-300 text-foreground placeholder:text-neutral-400 hover:border-primary/50" 
              />
              <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-primary/10 to-secondary/10 opacity-0 group-focus-within:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
            </div>
          </motion.div>
          
          {/* Message */}
          <motion.div variants={itemVariants} className="group">
            <label htmlFor="message" className="block text-sm font-medium text-foreground mb-2 group-focus-within:text-primary transition-colors">
              Project Details *
            </label>
            <div className="relative">
              <textarea 
                id="message" 
                name="message" 
                required 
                rows={6} 
                placeholder="Tell me about your project requirements, goals, timeline, and any specific features you need..."
                className="w-full px-4 py-3 rounded-xl border-2 border-border bg-transparent focus:border-primary focus:outline-none transition-all duration-300 text-foreground placeholder:text-neutral-400 hover:border-primary/50 resize-none" 
              />
              <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-primary/10 to-secondary/10 opacity-0 group-focus-within:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
            </div>
          </motion.div>
          
          {/* Submit Button and Status */}
          <motion.div variants={itemVariants} className="pt-4">
            <div className="flex flex-col sm:flex-row items-center gap-4">
              <motion.button 
                type="submit" 
                disabled={status === "submitting"}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-primary to-secondary text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed min-w-[140px]"
              >
                <AnimatePresence mode="wait">
                  {status === "submitting" ? (
                    <motion.div
                      key="loading"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="flex items-center space-x-2"
                    >
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Sending...</span>
                    </motion.div>
                  ) : (
                    <motion.span
                      key="send"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      Send Message
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.button>
              
              <AnimatePresence>
                {status === "success" && (
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="flex items-center space-x-2 text-emerald-600"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="font-medium">Message sent! I'll get back to you soon.</span>
                  </motion.div>
                )}
                
                {status === "error" && error && (
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="flex items-center space-x-2 text-red-600"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="font-medium">{error}</span>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </form>
      </div>
    </motion.div>
  );
}


