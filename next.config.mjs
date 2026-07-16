import path from "node:path";
import { fileURLToPath } from "node:url";

/** @type {import('next').NextConfig} */

// GitHub Pages *user site* config.
// Repo: https://github.com/yonaidissoto/yonaidissoto.github.io
// A repo named exactly "<username>.github.io" is served at the domain root,
// so no basePath/assetPrefix is needed (unlike a regular project-site repo).
// Deployed URL: https://yonaidissoto.github.io/

const nextConfig = {
  // Pins the workspace root to this project so a sibling lockfile outside
  // the repo (e.g. a parent folder used for unrelated local projects)
  // doesn't get mistakenly inferred as the root.
  outputFileTracingRoot: path.dirname(fileURLToPath(import.meta.url)),
  output: "export",
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
};

export default nextConfig;
