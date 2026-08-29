import Image from "next/image";
import type { Project } from "@/lib/projects";

/**
 * Cover art for a case study.
 *
 * Uses a screenshot when there is one. When there is not, it draws a motif
 * rather than showing a grey placeholder — a deliberate mark reads as a design
 * decision, an empty box reads as an unfinished site.
 */
export function ProjectCover({
  project,
  priority = false,
  className = "",
  sizes = "(min-width: 1024px) 50vw, 100vw",
}: {
  project: Project;
  priority?: boolean;
  className?: string;
  sizes?: string;
}) {
  if (project.coverImage) {
    return (
      <div className={`relative overflow-hidden bg-surface-2 ${className}`}>
        <Image
          src={project.coverImage}
          alt={`${project.title} — ${project.tagline}`}
          fill
          sizes={sizes}
          priority={priority}
          className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.2,0.6,0.2,1)] group-hover:scale-[1.03]"
        />
      </div>
    );
  }

  return (
    <div
      className={`relative overflow-hidden bg-surface-2 ${className}`}
      aria-hidden="true"
    >
      <Motif kind={project.motif} />
    </div>
  );
}

function Motif({ kind }: { kind: Project["motif"] }) {
  const common =
    "absolute inset-0 h-full w-full transition-transform duration-700 ease-[cubic-bezier(0.2,0.6,0.2,1)] group-hover:scale-[1.03]";

  if (kind === "bars") {
    return (
      <svg className={common} viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice">
        <Grid />
        {[
          [60, 120],
          [110, 180],
          [160, 90],
          [210, 210],
          [260, 150],
          [310, 240],
        ].map(([x, h], i) => (
          <rect
            key={x}
            x={x}
            y={260 - h}
            width="26"
            height={h}
            rx="3"
            fill="var(--primary)"
            opacity={0.18 + i * 0.13}
          />
        ))}
        <line x1="40" y1="260" x2="360" y2="260" stroke="var(--border-strong)" strokeWidth="1.5" />
      </svg>
    );
  }

  if (kind === "flow") {
    return (
      <svg className={common} viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice">
        <Grid />
        <path
          d="M60 220 C 130 220, 130 100, 200 100 S 270 220, 340 220"
          fill="none"
          stroke="var(--primary)"
          strokeWidth="2"
          opacity="0.5"
        />
        {[
          [60, 220],
          [200, 100],
          [340, 220],
        ].map(([cx, cy], i) => (
          <g key={cx}>
            <circle cx={cx} cy={cy} r="22" fill="var(--surface)" stroke="var(--border-strong)" strokeWidth="1.5" />
            <circle cx={cx} cy={cy} r="7" fill="var(--primary)" opacity={0.35 + i * 0.3} />
          </g>
        ))}
      </svg>
    );
  }

  if (kind === "chain") {
    return (
      <svg className={common} viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice">
        <Grid />
        {[0, 1, 2, 3].map((i) => (
          <g key={i}>
            {i > 0 && (
              <line
                x1={52 + (i - 1) * 96 + 60}
                y1="150"
                x2={52 + i * 96}
                y2="150"
                stroke="var(--primary)"
                strokeWidth="2"
                opacity="0.45"
              />
            )}
            <rect
              x={52 + i * 96}
              y="118"
              width="60"
              height="64"
              rx="8"
              fill="var(--surface)"
              stroke="var(--primary)"
              strokeWidth="1.5"
              opacity={0.4 + i * 0.2}
            />
            <rect
              x={52 + i * 96 + 14}
              y="140"
              width="32"
              height="4"
              rx="2"
              fill="var(--primary)"
              opacity="0.6"
            />
            <rect
              x={52 + i * 96 + 14}
              y="152"
              width="20"
              height="4"
              rx="2"
              fill="var(--primary)"
              opacity="0.35"
            />
          </g>
        ))}
      </svg>
    );
  }

  return (
    <svg className={common} viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice">
      <Grid />
      <rect
        x="140"
        y="52"
        width="120"
        height="200"
        rx="16"
        fill="var(--surface)"
        stroke="var(--border-strong)"
        strokeWidth="1.5"
      />
      {[0, 1, 2, 3].map((i) => (
        <rect
          key={i}
          x="158"
          y={86 + i * 40}
          width={84 - i * 12}
          height="10"
          rx="5"
          fill="var(--primary)"
          opacity={0.55 - i * 0.1}
        />
      ))}
    </svg>
  );
}

function Grid() {
  return (
    <>
      <rect width="400" height="300" fill="var(--surface-2)" />
      <g stroke="var(--border)" strokeWidth="1" opacity="0.7">
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <line key={`h${i}`} x1="0" y1={i * 50} x2="400" y2={i * 50} />
        ))}
        {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
          <line key={`v${i}`} x1={i * 50} y1="0" x2={i * 50} y2="300" />
        ))}
      </g>
    </>
  );
}
