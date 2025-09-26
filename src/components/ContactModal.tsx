"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { XMarkIcon, MapPinIcon, EnvelopeIcon, PhoneIcon } from "@heroicons/react/24/outline";

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ContactModal({ isOpen, onClose }: ContactModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    location: "",
    budget: "",
    subject: "",
    message: ""
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        // Reset form
        setFormData({
          name: "",
          email: "",
          location: "",
          budget: "",
          subject: "",
          message: ""
        });
        // Close modal
        onClose();
        // You could add a success notification here
        alert("Thank you for your message! I'll get back to you soon.");
      } else {
        throw new Error('Failed to send message');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      alert("Sorry, there was an error sending your message. Please try again.");
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-card-bg rounded-2xl shadow-2xl border border-border max-w-6xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex justify-between items-center p-6 border-b border-border">
              <h2 className="text-2xl font-bold text-foreground">Let&apos;s discuss your Project</h2>
              <button
                onClick={onClose}
                className="w-8 h-8 rounded-full bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-colors"
                aria-label="Close modal"
              >
                <XMarkIcon className="w-5 h-5 text-neutral-600 dark:text-neutral-300" />
              </button>
            </div>

            <div className="grid lg:grid-cols-2 gap-0">
              {/* Left Column - Contact Information */}
              <div className="p-8 bg-gradient-to-br from-primary/5 to-secondary/5">
                <div className="mb-8">
                  <h3 className="text-xl font-semibold text-foreground mb-4">Let&apos;s discuss your Project</h3>
                  <p className="text-neutral-600 dark:text-neutral-300">
                    There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration.
                  </p>
                </div>

                {/* Contact Details */}
                <div className="space-y-4 mb-8">
                  <div className="flex items-center space-x-4 p-4 bg-card-bg rounded-xl border border-border">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                      <MapPinIcon className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-neutral-600 dark:text-neutral-300">Address</p>
                      <p className="font-medium text-foreground">Nairobi, Kenya</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4 p-4 bg-card-bg rounded-xl border border-border">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                      <EnvelopeIcon className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-neutral-600 dark:text-neutral-300">My Email</p>
                      <p className="font-medium text-foreground">mumo@example.com</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4 p-4 bg-card-bg rounded-xl border border-border">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                      <PhoneIcon className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-neutral-600 dark:text-neutral-300">Call Me Now</p>
                      <p className="font-medium text-foreground">+254 110 018 735</p>
                    </div>
                  </div>
                </div>

                {/* Social Media Links */}
                <div className="flex space-x-4">
                  {[
                    { name: "LinkedIn", href: "https://linkedin.com/in/mumo-mwangangi", icon: "💼" },
                    { name: "GitHub", href: "https://github.com/mumorealg", icon: "💻" },
                    { name: "Twitter", href: "https://twitter.com/mumorealg", icon: "🐦" },
                    { name: "Email", href: "mailto:mumo@example.com", icon: "📧" },
                  ].map((social) => (
                    <a
                      key={social.name}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-12 h-12 rounded-full bg-primary/10 hover:bg-primary/20 flex items-center justify-center text-xl transition-all duration-200 hover:scale-110"
                    >
                      {social.icon}
                    </a>
                  ))}
                </div>
              </div>

              {/* Right Column - Contact Form */}
              <div className="p-8">
                <div className="mb-6">
                  <p className="text-neutral-600 dark:text-neutral-300">
                    There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration.
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Name Field */}
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
                      Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border-b-2 border-neutral-200 dark:border-neutral-700 bg-transparent focus:border-primary focus:outline-none transition-colors"
                      placeholder="Your Name"
                    />
                  </div>

                  {/* Email Field */}
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border-b-2 border-neutral-200 dark:border-neutral-700 bg-transparent focus:border-primary focus:outline-none transition-colors"
                      placeholder="your.email@example.com"
                    />
                  </div>

                  {/* Location Field */}
                  <div>
                    <label htmlFor="location" className="block text-sm font-medium text-foreground mb-2">
                      Location
                    </label>
                    <input
                      type="text"
                      id="location"
                      name="location"
                      value={formData.location}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border-b-2 border-neutral-200 dark:border-neutral-700 bg-transparent focus:border-primary focus:outline-none transition-colors"
                      placeholder="Your Location"
                    />
                  </div>

                  {/* Budget and Subject Fields */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="budget" className="block text-sm font-medium text-foreground mb-2">
                        Budget *
                      </label>
                      <input
                        type="text"
                        id="budget"
                        name="budget"
                        value={formData.budget}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border-b-2 border-neutral-200 dark:border-neutral-700 bg-transparent focus:border-primary focus:outline-none transition-colors"
                        placeholder="$5,000 - $10,000"
                      />
                    </div>
                    <div>
                      <label htmlFor="subject" className="block text-sm font-medium text-foreground mb-2">
                        Subject *
                      </label>
                      <input
                        type="text"
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border-b-2 border-neutral-200 dark:border-neutral-700 bg-transparent focus:border-primary focus:outline-none transition-colors"
                        placeholder="Project Type"
                      />
                    </div>
                  </div>

                  {/* Message Field */}
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-foreground mb-2">
                      Message *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      rows={4}
                      className="w-full px-4 py-3 border-b-2 border-neutral-200 dark:border-neutral-700 bg-transparent focus:border-primary focus:outline-none transition-colors resize-none"
                      placeholder="Tell me about your project..."
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    className="w-full bg-primary text-white py-4 px-6 rounded-xl font-semibold hover:bg-primary/90 transition-all duration-200 shadow-lg hover:shadow-xl flex items-center justify-center space-x-2"
                  >
                    <span>Submit</span>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </form>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
