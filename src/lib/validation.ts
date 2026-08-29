import { z } from "zod";

export const PROJECT_TYPES = [
  "Power BI / dashboards",
  "Data foundations (modelling, ETL, cleanup)",
  "Web application (Laravel / Next.js)",
  "M-Pesa / payment integration",
  "Something else",
] as const;

export const BUDGET_RANGES = [
  "Under KES 50,000",
  "KES 50,000 – 150,000",
  "KES 150,000 – 500,000",
  "KES 500,000+",
  "Not sure yet",
] as const;

/**
 * Only name, email and message are required.
 *
 * Every additional required field costs enquiries. Phone and budget qualify
 * the lead but must never be the reason someone gives up on the form.
 */
export const contactSchema = z.object({
  name: z.string().trim().min(2, "Please enter your name"),
  email: z.string().trim().email("Please enter a valid email address"),
  organisation: z.string().trim().max(120).optional().or(z.literal("")),
  phone: z.string().trim().max(40).optional().or(z.literal("")),
  /*
   * Deliberately not z.enum(...). These are informational fields for the
   * inbox, not security boundaries, and a strict enum turns any mismatch —
   * a mangled en-dash in "KES 150,000 – 500,000", a stale cached page after
   * the labels are reworded, an autofill extension — into a rejected
   * enquiry with a generic error. Losing a real lead costs far more than
   * accepting an unexpected string here.
   */
  projectType: z.string().trim().max(120).optional().or(z.literal("")),
  budget: z.string().trim().max(120).optional().or(z.literal("")),
  timeline: z.string().trim().max(120).optional().or(z.literal("")),
  referral: z.string().trim().max(160).optional().or(z.literal("")),
  message: z
    .string()
    .trim()
    .min(10, "A sentence or two about the problem is enough")
    .max(4000, "That is longer than the form accepts — email me instead"),
  /** Honeypot: bots fill it, humans never see it. */
  website: z.string().optional(),
});

export type ContactInput = z.infer<typeof contactSchema>;
