"use client";

declare global {
  interface Window {
    plausible?: (eventName: string, options?: { props?: Record<string, unknown> }) => void;
  }
}

export function trackEvent(eventName: string, props?: Record<string, unknown>) {
  if (typeof window !== "undefined" && typeof window.plausible === "function") {
    window.plausible(eventName, props ? { props } : undefined);
  }
}


