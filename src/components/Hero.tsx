"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { trackEvent } from "@/lib/analytics";

export function Hero() {
  return (
    <section className="py-16 sm:py-24">
      <div className="mx-auto max-w-6xl px-4">
        <div className="space-y-6">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 120, damping: 14 }}
            className="text-4xl sm:text-6xl font-extrabold tracking-tight"
          >
            Mumo Mwangangi
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, type: "spring", stiffness: 120, damping: 14 }}
            className="text-lg sm:text-xl text-neutral-600 dark:text-neutral-300 max-w-2xl"
          >
            Business Intelligence and software engineer crafting interactive dashboards, data-driven web apps, and animated, accessible experiences.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 120, damping: 14 }}
            className="flex gap-4"
          >
            <Link href="/work" className="inline-flex items-center justify-center rounded-full px-5 h-11 bg-neutral-900 text-white dark:bg-white dark:text-neutral-900" onClick={() => trackEvent("cta_click", { location: "hero", label: "view_work" })}>
              View Work
            </Link>
            <Link href="/contact" className="inline-flex items-center justify-center rounded-full px-5 h-11 border border-neutral-300 dark:border-neutral-700" onClick={() => trackEvent("cta_click", { location: "hero", label: "contact" })}>
              Contact
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}


