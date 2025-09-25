"use client";

import Link from "next/link";
import { trackEvent } from "@/lib/analytics";

type WhatsAppButtonProps = {
  phoneNumber: string; // E.164 without '+' e.g., 2547XXXXXXXX
  message?: string;
  className?: string;
};

export function WhatsAppButton({ phoneNumber, message, className }: WhatsAppButtonProps) {
  const encoded = encodeURIComponent(message ?? "Hi Mumo, I found your portfolio and would like to chat.");
  const href = `https://wa.me/${phoneNumber}?text=${encoded}`;

  return (
    <Link
      href={href}
      target="_blank"
      rel="noreferrer"
      className={
        className ??
        "inline-flex items-center justify-center rounded-full px-6 h-12 bg-primary text-white hover:bg-accent transition-all duration-300 font-medium shadow-lg hover:shadow-xl hover:scale-105"
      }
      onClick={() => trackEvent("whatsapp_click", { label: "contact_sidebar" })}
    >
      WhatsApp
    </Link>
  );
}


