"use client";

import { AnchorLink } from "@/components/ui/AnchorLink";
import Link from "next/link";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ThemeToggle } from "@/components/ThemeToggle";
import { EASE } from "@/components/ui/Reveal";
import { nav, site } from "@/lib/site";
import { trackEvent } from "@/lib/analytics";

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    if (open) {
      document.addEventListener("keydown", onKey);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <header
        className={`sticky top-0 z-50 w-full transition-colors duration-300 ${
          scrolled
            ? "border-b border-border bg-background/85 backdrop-blur-md"
            : "border-b border-transparent bg-transparent"
        }`}
      >
        <div className="container-page flex h-[4.5rem] items-center justify-between gap-6">
          <Link
            href="/"
            className="group flex items-baseline gap-3"
            aria-label={`${site.name} — home`}
          >
            <span className="text-[0.95rem] font-medium tracking-[-0.01em] text-foreground">
              {site.name}
            </span>
            <span className="eyebrow hidden transition-colors group-hover:text-primary sm:inline">
              BI &amp; Systems
            </span>
          </Link>

          {/* Every hash target goes through AnchorLink — next/link alone
              treats a hash href as a soft navigation that often lands without
              scrolling, which makes the nav look broken. */}
          <nav className="hidden items-center gap-1 md:flex" aria-label="Primary">
            {nav.map((item) => (
              <AnchorLink
                key={item.href}
                href={item.href}
                className="rounded-full px-3.5 py-2 text-sm text-neutral transition-colors duration-200 hover:bg-surface-2 hover:text-foreground"
              >
                {item.label}
              </AnchorLink>
            ))}
          </nav>

          <div className="flex items-center gap-2.5">
            <ThemeToggle />
            <AnchorLink
              href="/#contact"
              className="btn btn-primary hidden h-9 px-4 text-sm sm:inline-flex"
              onClick={() =>
                trackEvent("cta_click", { location: "header", label: "start_project" })
              }
            >
              Start a project
            </AnchorLink>

            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-border text-foreground transition-colors hover:border-border-strong md:hidden"
            >
              <span className="relative block h-3 w-4">
                <span
                  className={`absolute left-0 block h-px w-4 bg-current transition-all duration-300 ease-[cubic-bezier(0.2,0.6,0.2,1)] ${
                    open ? "top-1.5 rotate-45" : "top-0"
                  }`}
                />
                <span
                  className={`absolute left-0 block h-px w-4 bg-current transition-all duration-300 ease-[cubic-bezier(0.2,0.6,0.2,1)] ${
                    open ? "top-1.5 -rotate-45" : "top-3"
                  }`}
                />
              </span>
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25, ease: EASE }}
            className="fixed inset-0 top-[4.5rem] z-40 bg-background md:hidden"
          >
            <nav className="container-page flex flex-col py-8" aria-label="Mobile">
              {nav.map((item, i) => (
                <motion.div
                  key={item.href}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.04 * i, duration: 0.35, ease: EASE }}
                >
                  <AnchorLink
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="block border-b border-border py-5 font-display text-3xl text-foreground"
                  >
                    {item.label}
                  </AnchorLink>
                </motion.div>
              ))}

              <div className="mt-10 flex flex-col gap-3">
                <AnchorLink
                  href="/#contact"
                  onClick={() => setOpen(false)}
                  className="btn btn-primary w-full"
                >
                  Start a project
                </AnchorLink>
                <a
                  href={site.cvPath}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-secondary w-full"
                >
                  Download CV
                </a>
              </div>

              <p className="mono-meta mt-10">
                {site.email} · {site.phone}
              </p>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
