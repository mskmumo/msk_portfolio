"use client";

import { useState } from "react";
import { contactSchema, type ContactInput } from "@/lib/validation";

export function ContactForm() {
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(formData: FormData) {
    setStatus("submitting");
    setError(null);
    const payload: ContactInput = {
      name: String(formData.get("name") || ""),
      email: String(formData.get("email") || ""),
      phone: String(formData.get("phone") || ""),
      budget: String(formData.get("budget") || ""),
      subject: String(formData.get("subject") || ""),
      message: String(formData.get("message") || ""),
      website: String(formData.get("website") || ""),
    };

    const validated = contactSchema.safeParse(payload);
    if (!validated.success) {
      setStatus("error");
      setError("Please fix the highlighted fields.");
      return;
    }

    const res = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(validated.data),
    });
    if (res.ok) {
      setStatus("success");
    } else {
      setStatus("error");
      setError("Something went wrong. Please try again.");
    }
  }

  return (
    <form action={onSubmit} className="space-y-4 max-w-xl">
      <input type="text" name="website" className="hidden" tabIndex={-1} autoComplete="off" aria-label="Leave this field blank" placeholder="" />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="flex flex-col gap-1">
          <label htmlFor="name" className="text-sm font-medium">Name</label>
          <input id="name" name="name" required className="h-11 px-3 rounded-md border border-neutral-300 dark:border-neutral-700 bg-transparent" />
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="email" className="text-sm font-medium">Email</label>
          <input id="email" name="email" type="email" required className="h-11 px-3 rounded-md border border-neutral-300 dark:border-neutral-700 bg-transparent" />
        </div>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="flex flex-col gap-1">
          <label htmlFor="phone" className="text-sm font-medium">Phone</label>
          <input id="phone" name="phone" type="tel" required placeholder="+254 700 000 000" className="h-11 px-3 rounded-md border border-neutral-300 dark:border-neutral-700 bg-transparent" />
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="budget" className="text-sm font-medium">Budget</label>
          <input id="budget" name="budget" required placeholder="KSh 500,000 - KSh 1,000,000" className="h-11 px-3 rounded-md border border-neutral-300 dark:border-neutral-700 bg-transparent" />
        </div>
      </div>
      
      <div className="flex flex-col gap-1">
        <label htmlFor="subject" className="text-sm font-medium">Subject</label>
        <input id="subject" name="subject" required placeholder="Project Type" className="h-11 px-3 rounded-md border border-neutral-300 dark:border-neutral-700 bg-transparent" />
      </div>
      
      <div className="flex flex-col gap-1">
        <label htmlFor="message" className="text-sm font-medium">Message</label>
        <textarea id="message" name="message" required rows={6} className="px-3 py-2 rounded-md border border-neutral-300 dark:border-neutral-700 bg-transparent" />
      </div>
      <div className="flex items-center gap-3">
        <button type="submit" disabled={status === "submitting"} className="inline-flex items-center justify-center rounded-full px-5 h-11 bg-neutral-900 text-white dark:bg-white dark:text-neutral-900">
          {status === "submitting" ? "Sending…" : "Send"}
        </button>
        {status === "success" ? (
          <p className="text-emerald-600">Thanks! I’ll get back to you soon.</p>
        ) : null}
        {status === "error" && error ? (
          <p className="text-red-600">{error}</p>
        ) : null}
      </div>
    </form>
  );
}


