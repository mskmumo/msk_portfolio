import { ContactForm } from "@/components/ContactForm";
import { Reveal } from "@/components/ui/Reveal";
import { site, whatsappHref } from "@/lib/site";

const channels = [
  {
    label: "Email",
    value: site.email,
    href: `mailto:${site.email}`,
    note: "Best for detail",
  },
  {
    label: "WhatsApp",
    value: site.phone,
    href: whatsappHref(),
    note: "Fastest reply",
  },
  {
    label: "LinkedIn",
    value: "in/mumo-mwangangi",
    href: site.socials.linkedin,
    note: "For roles and referrals",
  },
  {
    label: "GitHub",
    value: "github.com/mskmumo",
    href: site.socials.github,
    note: "Code and side projects",
  },
];

export function ContactCTA() {
  return (
    <section
      id="contact"
      className="scroll-mt-24 border-t border-border bg-surface-2 py-20 sm:py-28"
    >
      <div className="container-page">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <Reveal>
              <p className="eyebrow">06 — Contact</p>
              <h2 className="display-lg mt-5 text-foreground balance">
                Tell me what is not working
              </h2>
              <p className="lede mt-5 pretty">
                A dashboard nobody trusts, a process running on WhatsApp, two
                reports that disagree. Describe it in a couple of sentences and I
                will tell you whether it is a project worth paying for.
              </p>
            </Reveal>

            <Reveal delay={0.06} className="mt-10">
              <p className="eyebrow">Or reach me directly</p>
              <ul className="mt-5 border-t border-border">
                {channels.map((channel) => (
                  <li key={channel.label} className="border-b border-border">
                    <a
                      href={channel.href}
                      target={channel.href.startsWith("http") ? "_blank" : undefined}
                      rel={channel.href.startsWith("http") ? "noopener noreferrer" : undefined}
                      className="group flex items-baseline justify-between gap-4 py-4 transition-colors"
                    >
                      <span className="flex min-w-0 flex-col">
                        <span className="text-[0.9375rem] font-medium text-foreground transition-colors group-hover:text-primary">
                          {channel.value}
                        </span>
                        <span className="mono-meta mt-1">
                          {channel.label} · {channel.note}
                        </span>
                      </span>
                      <svg
                        className="h-4 w-4 shrink-0 translate-y-0.5 text-muted transition-transform duration-300 ease-[cubic-bezier(0.2,0.6,0.2,1)] group-hover:translate-x-1 group-hover:text-primary"
                        viewBox="0 0 16 16"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.4"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        aria-hidden="true"
                      >
                        <path d="M3 8h10M9 4l4 4-4 4" />
                      </svg>
                    </a>
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal delay={0.12} className="mt-10">
              <div className="panel p-5">
                <div className="flex items-center gap-2.5">
                  <span className="h-2 w-2 rounded-full bg-primary" aria-hidden="true" />
                  <p className="text-sm font-medium text-foreground">
                    Currently taking on work
                  </p>
                </div>
                <p className="mt-3 text-[0.875rem] leading-relaxed text-neutral">
                  Based in {site.location}, working with clients here and
                  remotely. Evenings are class time, so calls are best booked in
                  the working day.
                </p>
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.08} className="lg:col-span-7">
            <div className="panel p-6 sm:p-8 lg:p-10">
              <ContactForm />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
