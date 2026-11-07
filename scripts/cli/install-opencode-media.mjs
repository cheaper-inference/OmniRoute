#!/usr/bin/env node
import { readFile, mkdir, writeFile, rename } from "node:fs/promises";
import { homedir } from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { build } from "esbuild";

const configPath =
  process.env.OMNIROUTE_MEDIA_CONFIG ||
  path.join(
    process.env.XDG_CONFIG_HOME || path.join(homedir(), ".config"),
    "opencode",
    "opencode.json"
  );
const directory = path.join(path.dirname(configPath), "omniroute-media");
const bundle = path.join(directory, "server.mjs");
await mkdir(directory, { recursive: true, mode: 0o700 });
await build({
  entryPoints: [fileURLToPath(new URL("./omniroute-media-mcp.mjs", import.meta.url))],
  outfile: bundle,
  bundle: true,
  platform: "node",
  format: "esm",
  target: "node22",
  banner: {
    js: 'import { createRequire as __omniCreateRequire } from "node:module"; const require = __omniCreateRequire(import.meta.url);',
  },
  logLevel: "silent",
});
const original = await readFile(configPath, "utf8");
const config = JSON.parse(original);
if (!config.providers?.omniroute?.settings?.baseURL)
  throw new Error("Configure the OmniRoute provider in OpenCode first.");
config.mcp ||= {};
config.mcp.servers ||= {};
const existing = config.mcp.servers.omniroute_media;
if (existing && !existing.command?.includes(bundle))
  throw new Error("An unrelated MCP server already uses the name omniroute_media.");
const reference = config.providers.omniroute.settings.apiKey;
config.mcp.servers.omniroute_media = {
  type: "local",
  command: [process.execPath, bundle],
  codemode: false,
  timeout: { startup: 15000, catalog: 15000, execution: 180000 },
  environment: {
    OMNIROUTE_MEDIA_CONFIG: configPath,
    ...(typeof reference === "string" && /^\{env:[A-Za-z_][A-Za-z0-9_]{0,127}\}$/.test(reference)
      ? { OMNIROUTE_MEDIA_API_KEY: reference }
      : {}),
  },
};
const backup = `${configPath}.backup-media-${Date.now()}`;
await writeFile(backup, original, { mode: 0o600, flag: "wx" });
const temporary = `${configPath}.media-next`;
await writeFile(temporary, JSON.stringify(config, null, 2) + "\n", { mode: 0o600 });
await rename(temporary, configPath);
console.log(`Installed omniroute_media in ${configPath}. Run opencode reload.`);
