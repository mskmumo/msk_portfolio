"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { AnchorHTMLAttributes, MouseEvent, ReactNode } from "react";

type AnchorLinkProps = Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href"> & {
  href: string;
  children: ReactNode;
};

/**
 * Link that reliably reaches an in-page anchor.
 *
 * `next/link` treats a hash href as a soft navigation, and in the App Router
 * that navigation regularly completes without scrolling — the button looks
 * dead. A plain `<a>` scrolls correctly but forces a full page load for any
 * href starting with `/`.
 *
 * So: keep `next/link` for the navigation, and when the target is on the page
 * already, take over and scroll it into view directly.
 */
export function AnchorLink({ href, children, onClick, ...rest }: AnchorLinkProps) {
  const pathname = usePathname();
  const hashIndex = href.indexOf("#");

  if (hashIndex === -1) {
    return (
      <Link href={href} onClick={onClick} {...rest}>
        {children}
      </Link>
    );
  }

  const path = href.slice(0, hashIndex) || "/";
  const id = href.slice(hashIndex + 1);
  const isSamePage = path === pathname;

  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    onClick?.(event);
    if (!isSamePage || event.defaultPrevented) return;

    const target = document.getElementById(id);
    if (!target) return;

    event.preventDefault();
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    // scroll-padding-top on <html> keeps the sticky header off the heading.
    target.scrollIntoView({ behavior: reduced ? "auto" : "smooth", block: "start" });
    window.history.replaceState(null, "", `#${id}`);
  };

  return (
    <Link href={href} onClick={handleClick} {...rest}>
      {children}
    </Link>
  );
}
