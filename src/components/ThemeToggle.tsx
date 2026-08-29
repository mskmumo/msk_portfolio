"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export function ThemeToggle() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const isDark = mounted ? (resolvedTheme ?? theme) === "dark" : true;

  return (
    <button
      type="button"
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-border text-neutral transition-colors duration-200 hover:border-border-strong hover:text-foreground"
    >
      {/* Both icons are always mounted; only the transform differs, so the
          swap animates without a layout shift. */}
      <span className="relative block h-[18px] w-[18px]">
        <svg
          className={`absolute inset-0 h-[18px] w-[18px] transition-all duration-300 ease-[cubic-bezier(0.2,0.6,0.2,1)] ${
            isDark ? "scale-50 rotate-90 opacity-0" : "scale-100 rotate-0 opacity-100"
          }`}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          aria-hidden="true"
        >
          <circle cx="12" cy="12" r="4.2" />
          <path d="M12 2.6v2.2M12 19.2v2.2M2.6 12h2.2M19.2 12h2.2M5.4 5.4l1.6 1.6M17 17l1.6 1.6M18.6 5.4L17 7M7 17l-1.6 1.6" />
        </svg>
        <svg
          className={`absolute inset-0 h-[18px] w-[18px] transition-all duration-300 ease-[cubic-bezier(0.2,0.6,0.2,1)] ${
            isDark ? "scale-100 rotate-0 opacity-100" : "scale-50 -rotate-90 opacity-0"
          }`}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M20.4 14.2A8.6 8.6 0 019.8 3.6a8.6 8.6 0 1010.6 10.6z" />
        </svg>
      </span>
    </button>
  );
}
