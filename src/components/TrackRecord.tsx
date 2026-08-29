import { Section } from "@/components/ui/Section";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { education, experience, references, site } from "@/lib/site";

/**
 * Experience, education and referees in one block.
 *
 * The referees replace the invented testimonials that were here before. Two
 * checkable names beat five glowing quotes from people who cannot be found —
 * a recruiter who searches for a fake reviewer stops trusting the whole page.
 */
export function TrackRecord() {
  return (
    <Section
      id="track-record"
      eyebrow="05 — Track record"
      title="Where the experience comes from"
      lede="Short, because it is honest. Everything below is on the CV and can be checked with the people named at the bottom."
    >
      <RevealGroup as="ol" className="border-t border-border">
        {experience.map((role) => (
          <RevealItem
            key={role.role}
            as="li"
            className="grid gap-6 border-b border-border py-10 md:grid-cols-12 md:gap-10"
          >
            <div className="md:col-span-4">
              <p className="mono-meta">{role.period}</p>
              <h3 className="mt-3 text-lg font-medium leading-snug tracking-[-0.01em] text-foreground">
                {role.role}
              </h3>
              <p className="mt-2 text-sm text-neutral">{role.org}</p>
              <p className="mono-meta mt-1">{role.location}</p>
            </div>

            <div className="md:col-span-8">
              <p className="font-display text-xl leading-snug text-foreground balance">
                {role.summary}
              </p>
              <ul className="mt-5 space-y-2.5">
                {role.points.map((point) => (
                  <li
                    key={point}
                    className="flex gap-3 text-[0.9375rem] leading-relaxed text-neutral"
                  >
                    <span
                      className="mt-2.5 h-px w-3 shrink-0 bg-border-strong"
                      aria-hidden="true"
                    />
                    <span className="pretty">{point}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-6 flex flex-wrap gap-2">
                {role.stack.map((tech) => (
                  <span key={tech} className="tag">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </RevealItem>
        ))}
      </RevealGroup>

      <div className="mt-16 grid gap-12 lg:grid-cols-2 lg:gap-16">
        <Reveal>
          <h3 className="eyebrow">Education &amp; certification</h3>
          <ul className="mt-6 border-t border-border">
            {education.map((item) => (
              <li
                key={item.award}
                className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 border-b border-border py-4"
              >
                <div className="min-w-0">
                  <p className="text-[0.9375rem] font-medium text-foreground">
                    {item.award}
                  </p>
                  <p className="mt-0.5 text-sm text-neutral">{item.org}</p>
                </div>
                <div className="text-right">
                  <p className="mono-meta">{item.period}</p>
                  <p className="mt-0.5 text-[0.8125rem] text-primary">
                    {item.detail}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal delay={0.06}>
          <h3 className="eyebrow">References</h3>
          <ul className="mt-6 border-t border-border">
            {references.map((ref) => (
              <li key={ref.name} className="border-b border-border py-4">
                <p className="text-[0.9375rem] font-medium text-foreground">
                  {ref.name}
                </p>
                <p className="mt-0.5 text-sm text-neutral">
                  {ref.title}, {ref.org}
                </p>
                <p className="mono-meta mt-1.5">{ref.relationship}</p>
              </li>
            ))}
          </ul>
          {/* Contact details for a referee belong to the referee, not to a
              public web page. Stating why is better than omitting silently. */}
          <p className="mt-5 text-[0.875rem] leading-relaxed text-neutral">
            Contact details are held back deliberately — they belong to the
            referee, not to this page. Ask me at{" "}
            <a
              href={`mailto:${site.email}`}
              className="link-underline text-foreground"
            >
              {site.email}
            </a>{" "}
            and I will make the introduction.
          </p>
        </Reveal>
      </div>
    </Section>
  );
}
