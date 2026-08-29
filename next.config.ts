import path from "node:path";
import { fileURLToPath } from "node:url";
import type { NextConfig } from "next";

const projectRoot = path.dirname(fileURLToPath(import.meta.url));

const nextConfig: NextConfig = {
  /*
   * There is a stray package-lock.json in the user profile directory, which
   * made Next infer C:\Users\mskmu as the workspace root. Pinning both roots
   * to this project keeps Turbopack and output file tracing pointed at the
   * right tree — otherwise deployed builds trace the wrong files.
   */
  turbopack: { root: projectRoot },
  outputFileTracingRoot: projectRoot,

  poweredByHeader: false,

  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
        ],
      },
    ];
  },
};

export default nextConfig;
