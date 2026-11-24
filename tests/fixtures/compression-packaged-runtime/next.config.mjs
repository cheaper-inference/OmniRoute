import { resolve } from "node:path";

const root = resolve(import.meta.dirname, "../../..");

const config = {
  output: "standalone",
  outputFileTracingRoot: root,
  serverExternalPackages: ["better-sqlite3", "sqlite-vec"],
  turbopack: { root },
  typescript: { ignoreBuildErrors: true },
  experimental: { cpus: 2, turbopackFileSystemCacheForBuild: false },
};

export default config;
