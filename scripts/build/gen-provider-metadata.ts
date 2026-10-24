#!/usr/bin/env node
// PERF-09: Generates open-sse/config/providers/metadata.json from the live
// provider REGISTRY. Consumers that only need flat provider metadata (wire
// format, auth type, alias, model catalog) import the JSON instead of the
// 291-module REGISTRY, which otherwise forces every provider module to
// evaluate at import time.
//
// Run: bun scripts/build/gen-provider-metadata.ts   (or node --import tsx/esm)
// Drift gate: tests/unit/provider-metadata-sync.test.ts fails when this file
// is stale relative to the registry.
//
// Deterministic output: keys sorted, no timestamps, no derived defaults —
// regenerating on an unchanged registry produces a byte-identical file.

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { REGISTRY } from "../../open-sse/config/providers/index.ts";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT_FILE = path.join(
  __dirname,
  "..",
  "..",
  "open-sse",
  "config",
  "providers",
  "metadata.json"
);

type MetaEntry = {
  alias?: string;
  authType?: string;
  format?: string;
  anonymousApiKey?: boolean;
  reasoningTransport?: string;
  models?: { id: string; name: string }[];
};

const providers: Record<string, MetaEntry> = {};
const claudeWireProviders: string[] = [];
let modelTotal = 0;

for (const [id, entry] of Object.entries(REGISTRY)) {
  if (entry.id && entry.id !== id) {
    throw new Error(
      `REGISTRY key "${id}" disagrees with entry.id "${entry.id}" — metadata keyed by id is unsafe until this is fixed`
    );
  }

  const meta: MetaEntry = {};
  if (entry.alias && entry.alias !== id) meta.alias = entry.alias;
  if (entry.authType) meta.authType = entry.authType;
  if (entry.format) meta.format = entry.format;
  if (entry.anonymousApiKey) meta.anonymousApiKey = true;
  if (entry.reasoningTransport) meta.reasoningTransport = entry.reasoningTransport;
  if (entry.models && entry.models.length > 0) {
    // Route consumer renders `m.name || m.id`; bake that resolution in here so
    // the JSON carries the final display name.
    meta.models = entry.models.map((m) => ({ id: m.id, name: m.name || m.id }));
    modelTotal += meta.models.length;
  }
  providers[id] = meta;

  if (entry.format === "claude") claudeWireProviders.push(id.toLowerCase());
}

// Sort keys so alias-collision overwrite order in consumers is deterministic
// regardless of module import order in providers/index.ts.
const sorted: Record<string, MetaEntry> = {};
for (const id of Object.keys(providers).sort()) sorted[id] = providers[id];
claudeWireProviders.sort();

const out = {
  count: Object.keys(sorted).length,
  modelTotal,
  claudeWireProviders,
  providers: sorted,
};

fs.writeFileSync(OUT_FILE, JSON.stringify(out, null, 2) + "\n");
console.log(
  `provider-metadata: wrote ${out.count} providers, ${out.modelTotal} models, ${claudeWireProviders.length} claude-wire -> ${path.relative(process.cwd(), OUT_FILE)}`
);
