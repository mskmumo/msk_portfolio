"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  BUDGET_RANGES,
  PROJECT_TYPES,
  contactSchema,
  type ContactInput,
} from "@/lib/validation";
import { EASE } from "@/components/ui/Reveal";
import { trackEvent } from "@/lib/analytics";

type Status = "idle" | "submitting" | "success" | "error";
type FieldErrors = Partial<Record<keyof ContactInput, string>>;

const fieldClass =
  "w-full rounded-lg border border-border bg-surface px-3.5 py-2.5 text-[0.9375rem] text-foreground placeholder:text-muted transition-colors duration-200 focus:border-primary focus:outline-none focus-visible:outline-none";

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [formError, setFormError] = useState<string | null>(null);
  const [errors, setErrors] = useState<FieldErrors>({});

  async function onSubmit(formData: FormData) {
    setStatus("submitting");
    setFormError(null);
    setErrors({});

    const get = (key: string) => String(formData.get(key) ?? "").trim();

    const payload = {
      name: get("name"),
      email: get("email"),
      organisation: get("organisation"),
      phone: get("phone"),
      projectType: get("projectType"),
      budget: get("budget"),
      timeline: get("timeline"),
      referral: get("referral"),
      message: get("message"),
      website: get("website"),
    };

    const validated = contactSchema.safeParse(payload);
    if (!validated.success) {
      // Surface the message on the field itself rather than a generic
      // "fix the highlighted fields" with nothing actually highlighted.
      const next: FieldErrors = {};
      for (const issue of validated.error.issues) {
        const key = issue.path[0] as keyof ContactInput;
        if (key && !next[key]) next[key] = issue.message;
      }
      setErrors(next);
      setStatus("error");
      setFormError("Please check the fields marked below.");
      return;
    }

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(validated.data),
      });

      const body = await res.json().catch(() => null);

      if (res.ok) {
        setStatus("success");
        trackEvent("contact_submit", { projectType: payload.projectType });
        return;
      }

      setStatus("error");
      setFormError(
        body?.error ??
          "That did not send. Email mskmumo@gmail.com or WhatsApp me instead — both reach me directly.",
      );
    } catch {
      // A network failure must not leave the form looking like it worked.
      setStatus("error");
      setFormError(
        "Could not reach the server. Check your connection, or email mskmumo@gmail.com directly.",
      );
    }
  }

  if (status === "success") {
    return (
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: EASE }}
        className="flex min-h-[22rem] flex-col items-start justify-center"
      >
        <span className="flex h-11 w-11 items-center justify-center rounded-full bg-highlight text-primary">
          <svg
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M4.5 10.5 8 14l7.5-8" />
          </svg>
        </span>
        <h3 className="display-md mt-6 text-foreground">That is with me.</h3>
        <p className="prose-body mt-3">
          I read every enquiry myself and reply within two working days. If it is
          urgent, WhatsApp is faster than email.
        </p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="btn btn-secondary mt-7"
        >
          Send another
        </button>
      </motion.div>
    );
  }

  return (
    <form action={onSubmit} className="space-y-5" noValidate>
      {/* Honeypot — off-screen rather than display:none, which some bots skip. */}
      <div className="absolute left-[-9999px] top-auto h-px w-px overflow-hidden" aria-hidden="true">
        <label htmlFor="website">Leave this field blank</label>
        <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Name" name="name" error={errors.name} required>
          <input
            id="name"
            name="name"
            autoComplete="name"
            placeholder="Your name"
            className={fieldClass}
            aria-invalid={Boolean(errors.name)}
          />
        </Field>

        <Field label="Email" name="email" error={errors.email} required>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            placeholder="you@company.co.ke"
            className={fieldClass}
            aria-invalid={Boolean(errors.email)}
          />
        </Field>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Organisation" name="organisation" hint="Optional">
          <input
            id="organisation"
            name="organisation"
            autoComplete="organization"
            placeholder="Where you work"
            className={fieldClass}
          />
        </Field>

        <Field label="Phone or WhatsApp" name="phone" hint="Optional">
          <input
            id="phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            placeholder="+254 …"
            className={fieldClass}
          />
        </Field>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="What do you need?" name="projectType" hint="Optional">
          <select id="projectType" name="projectType" className={fieldClass} defaultValue="">
            <option value="">Select one</option>
            {PROJECT_TYPES.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </Field>

        <Field label="Budget range" name="budget" hint="Optional">
          <select id="budget" name="budget" className={fieldClass} defaultValue="">
            <option value="">Select one</option>
            {BUDGET_RANGES.map((range) => (
              <option key={range} value={range}>
                {range}
              </option>
            ))}
          </select>
        </Field>
      </div>

      <Field label="Timeline" name="timeline" hint="Optional">
        <input
          id="timeline"
          name="timeline"
          placeholder="When does this need to be done?"
          className={fieldClass}
        />
      </Field>

      <Field
        label="The problem"
        name="message"
        error={errors.message}
        hint="What is not working today, and who needs it fixed?"
        required
      >
        <textarea
          id="message"
          name="message"
          rows={5}
          placeholder="A sentence or two is plenty to start."
          className={`${fieldClass} resize-y`}
          aria-invalid={Boolean(errors.message)}
        />
      </Field>

      <Field label="How did you find me?" name="referral" hint="Optional">
        <input
          id="referral"
          name="referral"
          placeholder="LinkedIn, referral, search…"
          className={fieldClass}
        />
      </Field>

      <div className="pt-1">
        <button
          type="submit"
          disabled={status === "submitting"}
          className="btn btn-primary w-full sm:w-auto"
        >
          {status === "submitting" ? "Sending…" : "Send enquiry"}
        </button>

        <p className="mono-meta mt-4">
          I reply within two working days. No list, no follow-up sequence.
        </p>

        <AnimatePresence>
          {status === "error" && formError && (
            <motion.p
              role="alert"
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25, ease: EASE }}
              className="mt-4 rounded-lg border border-border bg-surface-2 px-4 py-3 text-sm text-foreground"
            >
              {formError}
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    </form>
  );
}

function Field({
  label,
  name,
  hint,
  error,
  required,
  children,
}: {
  label: string;
  name: string;
  hint?: string;
  error?: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div>
      <div className="mb-2 flex items-baseline justify-between gap-3">
        <label htmlFor={name} className="text-sm font-medium text-foreground">
          {label}
          {required && (
            <span className="text-primary" aria-hidden="true">
              {" "}
              *
            </span>
          )}
        </label>
        {hint && !error && <span className="mono-meta">{hint}</span>}
      </div>
      {children}
      {error && (
        <p className="mt-2 text-[0.8125rem] text-primary" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}
