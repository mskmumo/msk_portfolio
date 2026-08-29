import type { ReactNode } from "react";
import { Reveal } from "@/components/ui/Reveal";

type SectionProps = {
  id?: string;
  /** Mono label above the heading — carries the section number. */
  eyebrow?: string;
  title?: ReactNode;
  lede?: ReactNode;
  children: ReactNode;
  /** Adds the hairline rule that separates editorial blocks. */
  bordered?: boolean;
  tone?: "default" | "recessed";
  className?: string;
  /** Right-hand slot in the section header, e.g. a "view all" link. */
  action?: ReactNode;
};

export function Section({
  id,
  eyebrow,
  title,
  lede,
  children,
  bordered = true,
  tone = "default",
  className = "",
  action,
}: SectionProps) {
  return (
    <section
      id={id}
      className={[
        "scroll-mt-24 py-20 sm:py-28",
        tone === "recessed" ? "bg-surface-2" : "bg-background",
        bordered ? "border-t border-border" : "",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <div className="container-page">
        {(eyebrow || title || lede) && (
          <Reveal className="mb-12 sm:mb-16">
            <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
              <div className="max-w-2xl">
                {eyebrow && <p className="eyebrow mb-5">{eyebrow}</p>}
                {title && (
                  <h2 className="display-lg text-foreground balance">{title}</h2>
                )}
                {lede && <p className="lede mt-5 pretty">{lede}</p>}
              </div>
              {action && <div className="shrink-0">{action}</div>}
            </div>
          </Reveal>
        )}
        {children}
      </div>
    </section>
  );
}
