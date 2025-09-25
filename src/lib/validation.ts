import { z } from "zod";

export const contactSchema = z.object({
  name: z.string().min(2, "Name is too short"),
  email: z.string().email("Invalid email"),
  message: z.string().min(10, "Message is too short").max(2000, "Message is too long"),
  website: z.string().optional(), // honeypot
});

export type ContactInput = z.infer<typeof contactSchema>;


