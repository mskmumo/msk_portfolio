import { AnchorLink } from "@/components/ui/AnchorLink";
import { Section } from "@/components/ui/Section";
import { RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { offers } from "@/lib/site";

/**
 * Three offers, not six.
 *
 * A list of everything you can do reads as "senior at nothing". The shortlist
 * is the positioning — graphic design and content writing were removed because
 * they dilute a technical pitch, not because they are not skills.
 */
export function Services() {
  return (
    <Section
      id="services"
      tone="recessed"
      eyebrow="02 — How I can help"
      title="Three things I do properly"
      lede="Most engagements start in one of these and end up touching another — the data is rarely clean enough for the dashboard you actually wanted."
    >
      <RevealGroup className="grid gap-px overflow-hidden rounded-xl border border-border bg-border lg:grid-cols-3">
        {offers.map((offer, i) => (
          <RevealItem
            key={offer.id}
            as="article"
            className="flex flex-col bg-background p-7 sm:p-8"
          >
            <p className="mono-meta tabular">{String(i + 1).padStart(2, "0")}</p>

            <h3 className="mt-5 text-xl font-medium tracking-[-0.01em] text-foreground">
              {offer.name}
            </h3>

            <p className="mt-3 font-display text-[1.375rem] leading-snug text-primary balance">
              {offer.promise}
            </p>

            <p className="mt-5 text-[0.9375rem] leading-relaxed text-neutral pretty">
              {offer.description}
            </p>

            <div className="mt-7">
              <p className="eyebrow">What you get</p>
              <ul className="mt-4 space-y-2.5">
                {offer.deliverables.map((item) => (
                  <li
                    key={item}
                    className="flex gap-3 text-[0.9375rem] leading-snug text-neutral"
                  >
                    <svg
                      className="mt-1 h-3.5 w-3.5 shrink-0 text-primary"
                      viewBox="0 0 14 14"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      <path d="M2.5 7.5 5.5 10.5 11.5 3.5" />
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Qualifying line — tells the wrong client to self-select out,
                which is what makes the right one trust the pitch. */}
            <div className="mt-auto pt-8">
              <div className="panel-flat p-4">
                <p className="eyebrow">Good fit if</p>
                <p className="mt-2.5 text-[0.875rem] leading-relaxed text-neutral">
                  {offer.fitFor}
                </p>
              </div>
            </div>
          </RevealItem>
        ))}
      </RevealGroup>

      <div className="mt-10 flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="max-w-xl text-[0.9375rem] leading-relaxed text-neutral">
          Not sure which one you need? Describe the problem and I will tell you
          — including if it is not a project worth paying for.
        </p>
        <AnchorLink href="#contact" className="btn btn-primary shrink-0">
          Book a scope call
        </AnchorLink>
      </div>
    </Section>
  );
}
