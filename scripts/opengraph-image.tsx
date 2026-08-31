import { ImageResponse } from "next/og";
import { proofPoints, site } from "@/lib/site";

export const alt = `${site.name} — ${site.role}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/**
 * The share card. Previously there was none, so every link posted to LinkedIn
 * or WhatsApp rendered as a bare URL — the cheapest marketing surface on the
 * site was blank.
 */
const [headline, tail] = site.positioning.split(/\s+—\s+/);

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#fbfaf7",
          padding: "64px 72px",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <div
            style={{
              width: 10,
              height: 10,
              borderRadius: 999,
              background: "#0b5d42",
            }}
          />
          <div
            style={{
              fontSize: 20,
              letterSpacing: 3,
              textTransform: "uppercase",
              color: "#7c827c",
            }}
          >
            {`${site.name} · ${site.location}`}
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          {/* Satori requires an explicit display on any node with more than
              one child, so the two-tone headline is two single-text lines
              rather than one line with a nested span. */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              fontSize: 54,
              lineHeight: 1.08,
              letterSpacing: -1.8,
              maxWidth: 1060,
            }}
          >
            {/* Split from site.positioning rather than retyped — the previous
                hardcoded copy silently went stale when the pitch changed. */}
            <div style={{ color: "#101211" }}>{headline}</div>
            <div style={{ color: "#0b5d42" }}>{`— ${tail}`}</div>
          </div>
          <div
            style={{
              marginTop: 26,
              fontSize: 27,
              color: "#4e544f",
              maxWidth: 880,
            }}
          >
            React · Next.js · Laravel · FastAPI · Power BI
          </div>
        </div>

        <div
          style={{
            display: "flex",
            gap: 56,
            borderTop: "1px solid #e4e1d8",
            paddingTop: 26,
          }}
        >
          {proofPoints.slice(0, 3).map((point) => (
            <div
              key={point.label}
              style={{ display: "flex", flexDirection: "column" }}
            >
              <div style={{ fontSize: 38, color: "#101211" }}>{point.value}</div>
              <div style={{ marginTop: 6, fontSize: 19, color: "#7c827c" }}>
                {point.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    ),
    size,
  );
}
