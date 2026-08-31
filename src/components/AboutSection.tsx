import { AnchorLink } from "@/components/ui/AnchorLink";
import Image from "next/image";
import { Section } from "@/components/ui/Section";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { capabilities, languages, site } from "@/lib/site";

export function AboutSection() {
  return (
    <Section
      id="about"
      tone="recessed"
      eyebrow="04 — About"
      title="I sit on both sides of the line"
    >
      <div className="grid gap-12 lg:grid-cols-12 lg:gap-14">
        <Reveal className="lg:col-span-5">
          <figure>
            <div className="relative aspect-[4/5] overflow-hidden rounded-lg border border-border bg-background">
              <Image
                src="/pic_1.jpg"
                alt={`${site.name} working in Nairobi`}
                fill
                sizes="(min-width: 1024px) 420px, 90vw"
                className="object-cover"
              />
            </div>
            <figcaption className="mono-meta mt-4 border-t border-border pt-4">
              Nairobi, Kenya · Building since 2023
            </figcaption>
          </figure>

          <dl className="mt-8 space-y-3">
            <div className="flex items-baseline justify-between gap-4 border-b border-border pb-3">
              <dt className="eyebrow">Currently</dt>
              <dd className="text-right text-sm text-foreground">
                Data Analytics Intern, Strathmore University
              </dd>
            </div>
            <div className="flex items-baseline justify-between gap-4 border-b border-border pb-3">
              <dt className="eyebrow">Studying</dt>
              <dd className="text-right text-sm text-foreground">
                BSc Business IT, third year
              </dd>
            </div>
            <div className="flex items-baseline justify-between gap-4">
              <dt className="eyebrow">Languages</dt>
              <dd className="text-right text-sm text-foreground">
                {languages.map((l) => l.name).join(" · ")}
              </dd>
            </div>
          </dl>
        </Reveal>

        <div className="lg:col-span-7">
          <Reveal>
            <div className="space-y-5 text-[1.0625rem] leading-relaxed text-neutral">
              <p className="pretty">
                Most people in this work sit on one side of a line. Analysts get
                handed a database somebody else designed and make the best of
                it. Developers ship the system and hand the reporting problem to
                someone else. I do both — which mostly means I know where the
                numbers go wrong before they ever reach a chart.
              </p>
              <p className="pretty">
                I build for clients: a national procurement and supply company,
                an ICPAK-registered accounting firm, and DrugList — my own
                platform connecting patients, chemists, hospitals, suppliers and
                insurers across Kenyan healthcare. All three are live and linked
                from the work above, so you can check them rather than take my
                word for it.
              </p>
              <p className="pretty">
                I am also a working data analyst. Since January 2025 I have been
                with Strathmore University&apos;s Office of Faculty Affairs,
                where I own the BI layer for the Staff Establishment System —
                the Power BI dashboard HR uses to see staffing across every
                faculty. It is the work I am proudest of, largely because people
                who are not me open it on purpose. Alongside that I am in my
                third year of a BSc in Business Information Technology, on the
                evening programme.
              </p>
              <p className="pretty">
                Next.js and TypeScript on the front, Laravel or PHP behind it,
                SQL underneath, and M-Pesa wherever money changes hands. Evening
                classes, daytime work and client builds in between — the
                schedule is exactly why I am strict about scope.
              </p>
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <AnchorLink href="#contact" className="btn btn-primary">
                Work with me
              </AnchorLink>
              <a
                href={site.cvPath}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-secondary"
              >
                Download CV
              </a>
            </div>
          </Reveal>

          <Reveal delay={0.06} className="mt-14">
            <p className="eyebrow">What I work with</p>
            {/* Grouped capabilities rather than self-scored percentage bars.
                Nobody believes "React 95%", and a technical reviewer reads it
                as a junior signal. */}
            <RevealGroup className="mt-6 grid gap-x-10 gap-y-8 sm:grid-cols-2">
              {capabilities.map((group) => (
                <RevealItem key={group.group}>
                  <h3 className="border-b border-border pb-3 text-sm font-medium text-foreground">
                    {group.group}
                  </h3>
                  <ul className="mt-4 flex flex-wrap gap-2">
                    {group.items.map((item) => (
                      <li key={item} className="tag">
                        {item}
                      </li>
                    ))}
                  </ul>
                </RevealItem>
              ))}
            </RevealGroup>
          </Reveal>
        </div>
      </div>
    </Section>
  );
}
