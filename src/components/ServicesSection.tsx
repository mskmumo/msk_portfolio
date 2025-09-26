"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { 
  ChartBarIcon, 
  CodeBracketIcon, 
  CpuChipIcon, 
  PresentationChartBarIcon,
  CircleStackIcon,
  PaintBrushIcon
} from "@heroicons/react/24/outline";

export function ServicesSection() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [clickedIndex, setClickedIndex] = useState<number | null>(null);

  const services = [
    {
      title: "Business Intelligence & Analytics",
      description: "Transform raw data into strategic insights with interactive Power BI dashboards, advanced DAX modeling, and automated KPI tracking that drive informed decision-making.",
      icon: ChartBarIcon,
      features: ["Power BI Dashboards", "Data Modeling & DAX", "KPI Automation", "HR Analytics", "Stakeholder Reporting"],
      gradient: "from-blue-500/20 to-cyan-500/20",
      borderGradient: "from-blue-500 to-cyan-500"
    },
    {
      title: "Full-Stack Web Development",
      description: "Build robust, scalable web applications using modern frameworks like Laravel, React, and Next.js with seamless API integration and responsive design.",
      icon: CodeBracketIcon,
      features: ["Laravel & PHP Development", "React/Next.js Applications", "API Development", "Database Design", "Mobile-First Design"],
      gradient: "from-emerald-500/20 to-teal-500/20",
      borderGradient: "from-emerald-500 to-teal-500"
    },
    {
      title: "Database Architecture & Integration",
      description: "Design and optimize database systems with PostgreSQL, MySQL, and implement ETL processes for seamless data integration and quality assurance.",
      icon: CircleStackIcon,
      features: ["Database Design & ERD", "PostgreSQL & MySQL", "ETL & Data Integration", "Data Warehousing", "Performance Optimization"],
      gradient: "from-purple-500/20 to-indigo-500/20",
      borderGradient: "from-purple-500 to-indigo-500"
    },
    {
      title: "Data Analytics & Insights",
      description: "Conduct comprehensive data analysis, exploratory data analysis (EDA), and deliver actionable insights through advanced visualization and statistical methods.",
      icon: PresentationChartBarIcon,
      features: ["Exploratory Data Analysis", "Statistical Analysis", "Data Visualization", "Predictive Modeling", "Business Intelligence"],
      gradient: "from-orange-500/20 to-red-500/20",
      borderGradient: "from-orange-500 to-red-500"
    },
    {
      title: "System Integration & APIs",
      description: "Develop secure, scalable APIs and integrate complex systems including payment gateways, blockchain solutions, and third-party services.",
      icon: CpuChipIcon,
      features: ["RESTful API Development", "M-Pesa Integration", "Blockchain Solutions", "System Architecture", "Security Implementation"],
      gradient: "from-pink-500/20 to-rose-500/20",
      borderGradient: "from-pink-500 to-rose-500"
    },
    {
      title: "Creative Design & Content",
      description: "Create compelling visual designs, technical documentation, and engaging content that effectively communicates complex technical concepts to diverse audiences.",
      icon: PaintBrushIcon,
      features: ["Graphic Design", "Technical Documentation", "Content Creation", "Data Storytelling", "Visual Communication"],
      gradient: "from-violet-500/20 to-purple-500/20",
      borderGradient: "from-violet-500 to-purple-500"
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const cardVariants = {
    hidden: { 
      opacity: 0, 
      y: 50,
      scale: 0.9
    },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: {
        type: "spring" as const,
        stiffness: 100,
        damping: 15
      }
    }
  };

  return (
    <section className="py-12 sm:py-16 md:py-20 lg:py-24 bg-background relative overflow-hidden">
      {/* Enhanced Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5"></div>
      <div className="absolute top-0 left-1/4 w-64 sm:w-96 h-64 sm:h-96 bg-primary/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-1/4 w-64 sm:w-96 h-64 sm:h-96 bg-secondary/10 rounded-full blur-3xl"></div>
      
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-foreground mb-4 sm:mb-6">
            Professional Services
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-neutral-600 dark:text-neutral-300 max-w-3xl mx-auto leading-relaxed">
            Comprehensive solutions combining software engineering excellence with data-driven insights 
            to transform your business challenges into strategic advantages.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
        >
          {services.map((service, index) => {
            const IconComponent = service.icon;
            return (
              <motion.div
                key={service.title}
                variants={cardVariants}
                onHoverStart={() => setHoveredIndex(index)}
                onHoverEnd={() => setHoveredIndex(null)}
                onClick={() => setClickedIndex(clickedIndex === index ? null : index)}
                className="group relative cursor-pointer"
              >
                <div className={`
                  relative rounded-xl sm:rounded-2xl border border-border p-4 sm:p-6 lg:p-8 bg-card-bg backdrop-blur-sm 
                  shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden
                  ${hoveredIndex === index || clickedIndex === index ? 'scale-105 border-primary/50' : ''}
                `}>
                  {/* Animated background gradient */}
                  <div className={`
                    absolute inset-0 bg-gradient-to-br ${service.gradient} transition-opacity duration-500
                    ${hoveredIndex === index || clickedIndex === index ? 'opacity-100' : 'opacity-0'}
                  `}></div>
                  
                  {/* Animated border gradient */}
                  <div className={`
                    absolute inset-0 rounded-2xl transition-opacity duration-500 bg-gradient-to-r ${service.borderGradient} p-[1px]
                    ${hoveredIndex === index || clickedIndex === index ? 'opacity-100' : 'opacity-0'}
                  `}>
                    <div className="w-full h-full rounded-2xl bg-card-bg"></div>
                  </div>

                  <div className="relative z-10">
                    {/* Icon with animation */}
                    <motion.div
                      animate={hoveredIndex === index || clickedIndex === index ? { rotate: 360, scale: 1.1 } : { rotate: 0, scale: 1 }}
                      transition={{ duration: 0.5 }}
                      className={`
                        w-12 sm:w-14 lg:w-16 h-12 sm:h-14 lg:h-16 rounded-lg sm:rounded-xl bg-gradient-to-br ${service.borderGradient} 
                        flex items-center justify-center mb-4 sm:mb-6 shadow-lg
                      `}
                    >
                      <IconComponent className="w-6 sm:w-7 lg:w-8 h-6 sm:h-7 lg:h-8 text-white" />
                    </motion.div>

                    {/* Title */}
                    <h3 className="font-bold text-lg sm:text-xl text-foreground mb-3 sm:mb-4 group-hover:text-primary transition-colors duration-300">
                      {service.title}
                    </h3>

                    {/* Description */}
                    <p className="text-sm sm:text-base text-neutral-600 dark:text-neutral-300 mb-4 sm:mb-6 leading-relaxed">
                      {service.description}
                    </p>

                    {/* Features list with sliding animation */}
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={hoveredIndex === index || clickedIndex === index ? { height: "auto", opacity: 1 } : { height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="border-t border-border pt-4">
                        <h4 className="text-sm font-semibold text-foreground mb-3">Key Features:</h4>
                        <ul className="space-y-2">
                          {service.features.map((feature, featureIndex) => (
                            <motion.li
                              key={feature}
                              initial={{ x: -20, opacity: 0 }}
                              animate={hoveredIndex === index || clickedIndex === index ? { x: 0, opacity: 1 } : { x: -20, opacity: 0 }}
                              transition={{ delay: featureIndex * 0.1, duration: 0.3 }}
                              className="flex items-center space-x-2 text-sm text-neutral-600 dark:text-neutral-300"
                            >
                              <span className={`w-1.5 h-1.5 rounded-full bg-gradient-to-r ${service.borderGradient}`}></span>
                              <span>{feature}</span>
                            </motion.li>
                          ))}
                        </ul>
                      </div>
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Call to action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="text-center mt-16"
        >
          <p className="text-lg text-neutral-600 dark:text-neutral-300 mb-8">
            Ready to transform your business with data-driven solutions?
          </p>
          <motion.a
            href="#contact"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-primary to-secondary text-white font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
          >
            Let&apos;s Discuss Your Project
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}


