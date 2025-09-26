import { z } from "zod";

export const contactSchema = z.object({
  name: z.string().min(2, "Name is too short"),
  email: z.string().email("Invalid email"),
  phone: z.string().min(10, "Phone number is required"),
  budget: z.string().min(1, "Budget is required"),
  subject: z.string().min(2, "Subject is required"),
  message: z.string().min(10, "Message is too short").max(2000, "Message is too long"),
  website: z.string().optional(), // honeypot
});

export type ContactInput = z.infer<typeof contactSchema>;


