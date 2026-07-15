import path from "node:path";
import { fileURLToPath } from "node:url";

/** @type {import('next').NextConfig} */

// GitHub Pages project-site config.
// Repo: https://github.com/sotoyonaidis29/Yonaidissoto
// Deployed URL: https://sotoyonaidis29.github.io/Yonaidissoto
const repoName = "Yonaidissoto";
const isProd = process.env.NODE_ENV === "production";

const nextConfig = {
  // Pins the workspace root to this project so a sibling lockfile outside
  // the repo (e.g. a parent folder used for unrelated local projects)
  // doesn't get mistakenly inferred as the root.
  outputFileTracingRoot: path.dirname(fileURLToPath(import.meta.url)),
  output: "export",
  basePath: isProd ? `/${repoName}` : "",
  assetPrefix: isProd ? `/${repoName}/` : "",
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
};

export default nextConfig;
