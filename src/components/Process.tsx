import { Section } from "@/components/ui/Section";
import { RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { engagementProcess } from "@/lib/site";

/**
 * Buying risk is the real objection for a client hiring an individual rather
 * than an agency. Publishing the sequence — including the free scope call and
 * the handover — answers it before the enquiry form does.
 */
export function Process() {
  return (
    <Section
      id="approach"
      eyebrow="03 — How the work runs"
      title="No reveal at the end"
      lede="Four steps, in this order, every time. You know what happens next and what you are left holding when it finishes."
    >
      <RevealGroup as="ol" className="border-t border-border">
        {engagementProcess.map((step) => (
          <RevealItem
            key={step.step}
            as="li"
            className="grid gap-4 border-b border-border py-8 md:grid-cols-12 md:gap-10 md:py-10"
          >
            <div className="md:col-span-2">
              <span className="font-display text-4xl leading-none text-primary tabular">
                {step.step}
              </span>
            </div>
            <h3 className="text-lg font-medium tracking-[-0.01em] text-foreground md:col-span-3">
              {step.title}
            </h3>
            <p className="text-[0.9375rem] leading-relaxed text-neutral md:col-span-7 pretty">
              {step.body}
            </p>
          </RevealItem>
        ))}
      </RevealGroup>
    </Section>
  );
}
