import path from "node:path";
import os from "node:os";
import fs from "node:fs";

import { readPrivateConfigFile } from "../privateConfigFile";

let yaml: typeof import("js-yaml") | null = null;
async function loadYaml() {
  if (!yaml) {
    yaml = await import("js-yaml");
  }
  return yaml;
}

const CONFIG_PATH = path.join(os.homedir(), ".continue", "config.yaml");

export async function generateContinueConfig(options: {
  baseUrl: string;
  apiKey: string;
  model?: string;
  configPath?: string;
}): Promise<string> {
  const y = await loadYaml();
  let base = options.baseUrl;
  let end = base.length;
  while (end > 0 && base[end - 1] === "/") end--;
  base = end < base.length ? base.slice(0, end) : base;
  if (base.endsWith("/v1")) base = base.slice(0, -3);

  // Keep the user's other keys and models; replace only the OmniRoute entry.
  let config: Record<string, unknown> = {};
  if (options.configPath && fs.existsSync(options.configPath)) {
    let loaded: unknown;
    try {
      loaded = y.load(readPrivateConfigFile(options.configPath));
    } catch {
      loaded = undefined;
    }
    if (loaded === null || loaded === undefined) loaded = {};
    if (typeof loaded !== "object" || Array.isArray(loaded)) {
      throw new Error(
        `Existing ${options.configPath} is not a valid YAML mapping; refusing to overwrite it.`
      );
    }
    config = loaded as Record<string, unknown>;
  }
  const entry = { title: "OmniRoute", apiKey: options.apiKey, apiBase: `${base}/v1` };
  const models = Array.isArray(config.models) ? (config.models as Array<{ title?: unknown }>) : [];
  const at = models.findIndex((m) => m?.title === "OmniRoute");
  config.models =
    at >= 0 ? models.map((m, i) => (i === at ? { ...m, ...entry } : m)) : [...models, entry];

  return y.dump(config, { lineWidth: -1 });
}
