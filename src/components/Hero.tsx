"use client";

import { AnchorLink } from "@/components/ui/AnchorLink";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { EASE } from "@/components/ui/Reveal";
import { proofPoints, site } from "@/lib/site";
import { trackEvent } from "@/lib/analytics";

export function Hero() {
  const reduced = useReducedMotion();

  const rise = (delay: number) =>
    reduced
      ? {}
      : {
          initial: { opacity: 0, y: 18 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.7, delay, ease: EASE },
        };

  return (
    <section className="relative overflow-hidden pt-14 sm:pt-20 lg:pt-24">
      <div className="container-page relative">
        <div className="grid items-start gap-12 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-7">
            <motion.div {...rise(0)} className="flex items-center gap-2.5">
              <span className="relative flex h-2 w-2" aria-hidden="true">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-60" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
              </span>
              <span className="eyebrow">
                Available for projects · {site.location}
              </span>
            </motion.div>

            <motion.h1
              {...rise(0.06)}
              className="display-xl mt-7 text-foreground balance"
            >
              I build the systems businesses run on
              <span className="text-muted"> — </span>
              and the analytics that{" "}
              <em className="italic text-primary">explain</em> them.
            </motion.h1>

            <motion.p {...rise(0.14)} className="lede mt-7 pretty">
              {site.pitch}
            </motion.p>

            <motion.div
              {...rise(0.2)}
              className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center"
            >
              {/* Same-page anchors use a native <a>, not next/link: the App
                  Router treats a hash href as a soft navigation and often
                  lands without scrolling, so the button appears dead. */}
              <AnchorLink
                href="#contact"
                className="btn btn-primary"
                onClick={() =>
                  trackEvent("cta_click", { location: "hero", label: "start_project" })
                }
              >
                Start a project
              </AnchorLink>
              <AnchorLink
                href="#work"
                className="btn btn-secondary"
                onClick={() =>
                  trackEvent("cta_click", { location: "hero", label: "selected_work" })
                }
              >
                See selected work
              </AnchorLink>
              <a
                href={site.cvPath}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-ghost sm:ml-1"
                onClick={() =>
                  trackEvent("cta_click", { location: "hero", label: "download_cv" })
                }
              >
                Download CV
                <svg
                  className="h-4 w-4"
                  viewBox="0 0 16 16"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M8 2.5v8M4.5 7.5 8 11l3.5-3.5M2.5 13.5h11" />
                </svg>
              </a>
            </motion.div>
          </div>

          {/* Portrait, treated as an editorial plate rather than an avatar. */}
          <motion.div
            {...rise(0.26)}
            className="lg:col-span-5 lg:pt-2"
          >
            <figure className="relative mx-auto max-w-sm lg:max-w-none">
              <div className="relative aspect-[4/5] overflow-hidden rounded-lg border border-border bg-surface-2">
                <Image
                  src="/pic_3.jpg"
                  alt={`${site.name}, ${site.role}, in Nairobi`}
                  fill
                  priority
                  sizes="(min-width: 1024px) 420px, (min-width: 640px) 384px, 90vw"
                  className="object-cover"
                />
              </div>
              <figcaption className="mt-4 flex items-start justify-between gap-4 border-t border-border pt-4">
                <div>
                  <p className="text-sm font-medium text-foreground">{site.name}</p>
                  <p className="mono-meta mt-1">{site.role}</p>
                </div>
                <p className="mono-meta shrink-0 text-right">
                  Nairobi
                  <br />
                  KE
                </p>
              </figcaption>
            </figure>
          </motion.div>
        </div>

        {/* Credibility strip. Every number traces to a line in the CV, and the
            source is printed underneath so it is checkable. */}
        <motion.dl
          {...rise(0.34)}
          className="mt-16 grid grid-cols-2 gap-px overflow-hidden rounded-lg border border-border bg-border sm:mt-20 lg:grid-cols-4"
        >
          {proofPoints.map((point) => (
            // col-reverse puts the value on top visually while keeping the
            // term before its description in the DOM, so a screen reader gets
            // "manual reporting removed: 40%" rather than the label twice.
            <div
              key={point.label}
              className="flex flex-col-reverse gap-3 bg-background p-5 sm:p-6"
            >
              <dt>
                <span className="block text-sm font-medium text-foreground">
                  {point.label}
                </span>
                <span className="mono-meta mt-1.5 block">{point.note}</span>
              </dt>
              <dd className="font-display text-3xl leading-none text-foreground tabular sm:text-4xl">
                {point.value}
              </dd>
            </div>
          ))}
        </motion.dl>
      </div>
    </section>
  );
}
