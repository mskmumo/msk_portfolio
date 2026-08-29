"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

/** Shared easing so every reveal on the site moves the same way. */
export const EASE = [0.2, 0.6, 0.2, 1] as const;

type RevealProps = {
  children: ReactNode;
  /** Seconds. Use small, additive delays for stagger within a block. */
  delay?: number;
  /** Travel distance in px. Kept short — long slides read as a slideshow. */
  y?: number;
  className?: string;
  as?: "div" | "li" | "section" | "article" | "span" | "figure";
};

export function Reveal({
  children,
  delay = 0,
  y = 14,
  className,
  as = "div",
}: RevealProps) {
  const reduced = useReducedMotion();
  const Component = motion[as];

  if (reduced) {
    return <Component className={className}>{children}</Component>;
  }

  return (
    <Component
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.55, delay, ease: EASE }}
    >
      {children}
    </Component>
  );
}

/** Stagger container for lists — pair with `RevealItem`. */
export function RevealGroup({
  children,
  className,
  stagger = 0.07,
  as = "div",
}: {
  children: ReactNode;
  className?: string;
  stagger?: number;
  as?: "div" | "ul" | "ol";
}) {
  const reduced = useReducedMotion();
  const Component = motion[as];

  return (
    <Component
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-60px" }}
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: reduced ? 0 : stagger } },
      }}
    >
      {children}
    </Component>
  );
}

export function RevealItem({
  children,
  className,
  as = "div",
}: {
  children: ReactNode;
  className?: string;
  as?: "div" | "li" | "article";
}) {
  const reduced = useReducedMotion();
  const Component = motion[as];

  return (
    <Component
      className={className}
      variants={{
        hidden: reduced ? { opacity: 1 } : { opacity: 0, y: 16 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.5, ease: EASE },
        },
      }}
    >
      {children}
    </Component>
  );
}
