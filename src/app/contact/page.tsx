import { ContactForm } from "@/components/ContactForm";
import { WhatsAppButton } from "@/components/WhatsAppButton";

export const metadata = {
  title: "Contact | Mumo Mwangangi",
  description: "Get in touch for BI dashboards, web apps, or consulting.",
};

export default function ContactPage() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
      <div className="lg:col-span-2 space-y-6">
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">Contact</h1>
        <p className="text-neutral-600 dark:text-neutral-300">
          Send a message and I’ll reply shortly. For instant messaging, use WhatsApp.
        </p>
        <ContactForm />
      </div>
      <aside className="space-y-4">
        <div className="rounded-lg border border-black/10 dark:border-white/15 p-4">
          <h2 className="font-semibold mb-2">Direct messaging</h2>
          <WhatsAppButton phoneNumber="254110018735" />
        </div>
        <div className="rounded-lg border border-black/10 dark:border-white/15 p-4 text-sm text-neutral-600 dark:text-neutral-300">
          <p>
            Alternatively, email me at <span className="font-medium">you@example.com</span>.
          </p>
        </div>
      </aside>
    </div>
  );
}


