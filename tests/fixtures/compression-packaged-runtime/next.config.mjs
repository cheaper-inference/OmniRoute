import path from "node:path";
import { fileURLToPath } from "node:url";
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../../..");
const config = {
  output: "standalone",
  serverExternalPackages: ["keytar", "better-sqlite3", "sharp", "onnxruntime-node"],
  outputFileTracingRoot: root,
  turbopack: { root },
  typescript: { ignoreBuildErrors: true },
};

export default config;
