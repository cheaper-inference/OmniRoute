#!/usr/bin/env node
// Generates docs/reference/PROVIDER_REFERENCE.md from src/shared/constants/providers.ts.
// Run: node --import tsx scripts/docs/gen-provider-reference.ts

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { PROVIDER_COLLECTION_NAMES } from "./lib/count-facts.mjs";
import {
  FREE_PROVIDERS,
  NOAUTH_PROVIDERS,
  OAUTH_PROVIDERS,
  WEB_COOKIE_PROVIDERS,
  APIKEY_PROVIDERS,
  LOCAL_PROVIDERS,
  SEARCH_PROVIDERS,
  AUDIO_ONLY_PROVIDERS,
  UPSTREAM_PROXY_PROVIDERS,
  CLOUD_AGENT_PROVIDERS,
  SYSTEM_PROVIDERS,
  IMAGE_ONLY_PROVIDER_IDS,
  AGGREGATOR_PROVIDER_IDS,
  ENTERPRISE_CLOUD_PROVIDER_IDS,
  VIDEO_PROVIDER_IDS,
  EMBEDDING_RERANK_PROVIDER_IDS,
  SELF_HOSTED_CHAT_PROVIDER_IDS,
} from "../../src/shared/constants/providers.ts";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..", "..");
const OUT_FILE = path.join(ROOT, "docs", "reference", "PROVIDER_REFERENCE.md");

export type ProviderRecord = {
  id: string;
  alias?: string | undefined;
  name: string;
  icon?: string;
  color?: string;
  textIcon?: string;
  website?: string;
  authHint?: string;
  freeNote?: string;
  hasFree?: boolean;
  deprecated?: boolean;
  deprecationReason?: string;
  /**
   * #7286: native function calling / prompt-emulated via webTools.ts / silently dropped.
   * Loosely typed `string` (not a literal union) — the source provider-catalog object
   * literals infer widened `string` for this field and are passed in as-is.
   */
  toolCalling?: string;
  [k: string]: unknown;
};

function asRecords(map: Record<string, ProviderRecord>): ProviderRecord[] {
  return Object.values(map).map((p) => ({ ...p }));
}

function escapeCell(value: string | undefined): string {
  if (!value) return "—";
  // Escape backslash first so the subsequent escapes don't double-escape it.
  return value.replace(/\\/g, "\\\\").replace(/\|/g, "\\|").replace(/\n/g, " ");
}

function row(p: ProviderRecord, category: string, includeToolCalling: boolean): string {
  const alias = p.alias ? `\`${p.alias}\`` : "—";
  const hint = p.deprecated
    ? `⚠️ **DEPRECATED.** ${escapeCell(p.deprecationReason)}`
    : escapeCell(p.authHint || p.freeNote);
  const link = p.website ? `[link](${p.website})` : "—";
  const base = `| \`${p.id}\` | ${alias} | ${escapeCell(p.name)} | ${category} | ${link} | ${hint} |`;
  return includeToolCalling ? `${base} ${escapeCell(p.toolCalling)} |` : base;
}

/** #7286: only render the "Tool calling" column when at least one record in the section sets it. */
function hasToolCallingColumn(rows: ProviderRecord[]): boolean {
  return rows.some((p) => typeof p.toolCalling === "string");
}

function categoryTags(id: string): string[] {
  const tags: string[] = [];
  if (IMAGE_ONLY_PROVIDER_IDS.has(id)) tags.push("image");
  if (VIDEO_PROVIDER_IDS.has(id)) tags.push("video");
  if (AGGREGATOR_PROVIDER_IDS.has(id)) tags.push("aggregator");
  if (ENTERPRISE_CLOUD_PROVIDER_IDS.has(id)) tags.push("enterprise");
  if (EMBEDDING_RERANK_PROVIDER_IDS.has(id)) tags.push("embed/rerank");
  if (SELF_HOSTED_CHAT_PROVIDER_IDS.has(id)) tags.push("self-hosted");
  return tags;
}

function sortById(rows: ProviderRecord[]): ProviderRecord[] {
  return [...rows].sort((a, b) => a.id.localeCompare(b.id));
}

function buildSection(title: string, rows: ProviderRecord[], category: string): string {
  if (rows.length === 0) return "";
  const lines: string[] = [];
  lines.push(`## ${title} (${rows.length})\n`);
  const includeToolCalling = hasToolCallingColumn(rows);
  lines.push(
    includeToolCalling
      ? "| ID | Alias | Name | Tags | Website | Notes | Tool calling |"
      : "| ID | Alias | Name | Tags | Website | Notes |"
  );
  lines.push(
    includeToolCalling
      ? "|----|-------|------|------|---------|-------|--------------|"
      : "|----|-------|------|------|---------|-------|"
  );
  for (const p of sortById(rows)) {
    const tags = [category, ...categoryTags(p.id)].join(", ");
    lines.push(row(p, tags, includeToolCalling));
  }
  lines.push("");
  return lines.join("\n");
}

function buildHeader(total: number, version: string, date: string): string {
  return [
    "---",
    'title: "Provider Reference"',
    `version: ${version}`,
    `lastUpdated: ${date}`,
    "---",
    "",
    "# Provider Reference",
    "",
    `> **Auto-generated** from \`src/shared/constants/providers.ts\` — do not edit by hand.`,
    `> Regenerate with: \`npm run gen:provider-reference\``,
    `> **Last generated:** ${date}`,
    "",
    `Total providers: **${total}**. See category breakdown below.`,
    "",
    "## Categories",
    "",
    "- **Free** — free tier with API key (configured via dashboard)",
    "- **No-auth** — public endpoints that require no key or sign-in at all",
    "- **OAuth** — sign-in flow handled by OmniRoute, no API key needed",
    "- **Web cookie** — wraps the provider's web app via cookie auth",
    "- **API key** — paid provider configured via API key (free credits may apply)",
    "- **Local** — runs on the user's machine (Ollama, LM Studio, vLLM, etc.)",
    "- **Search** — web search providers",
    "- **Audio** — audio-only providers (TTS/STT)",
    "- **Upstream proxy** — providers that proxy to other providers",
    "- **Cloud agent** — long-running coding agents (Codex Cloud, Devin, Jules)",
    "- **System** — OmniRoute-internal providers (loopback, etc.)",
    "",
    "Additional tags: `image`, `video`, `aggregator`, `enterprise`, `embed/rerank`, `self-hosted`.",
    "",
    "`Tool calling` (where shown): `native` — real function-calling API; `emulated` — the " +
      "`tools` array is prompt-emulated via `webTools.ts` (regex-parsed `<tool>{...}</tool>` " +
      "blocks); `none` — `tools` is currently silently dropped. See #7286.",
    "",
    "Use the dashboard at `/dashboard/providers` to enable, configure, and test each provider.",
    "",
    "---",
    "",
  ].join("\n");
}

export function countExecutorImpls(): number {
  const dir = path.join(ROOT, "open-sse", "executors");
  const nonImpl = new Set(["index.ts", "index.mts", "types.ts", "base.ts", "constants.ts"]);
  return fs
    .readdirSync(dir)
    .filter(
      (f) => f.endsWith(".ts") && !f.endsWith(".test.ts") && !f.startsWith("__") && !nonImpl.has(f)
    ).length;
}

export const PROVIDER_CATALOG = {
  FREE_PROVIDERS,
  NOAUTH_PROVIDERS,
  OAUTH_PROVIDERS,
  WEB_COOKIE_PROVIDERS,
  APIKEY_PROVIDERS,
  LOCAL_PROVIDERS,
  SEARCH_PROVIDERS,
  AUDIO_ONLY_PROVIDERS,
  UPSTREAM_PROXY_PROVIDERS,
  CLOUD_AGENT_PROVIDERS,
  SYSTEM_PROVIDERS,
};

type ReferenceOptions = {
  catalog?: Record<string, Record<string, ProviderRecord>>;
  version: string;
  generatedDate: string;
  executorCount: number;
};

export function renderProviderReference({
  catalog = PROVIDER_CATALOG,
  version,
  generatedDate,
  executorCount,
}: ReferenceOptions) {
  if (
    !version ||
    !/^\d{4}-\d{2}-\d{2}$/.test(generatedDate) ||
    !Number.isSafeInteger(executorCount) ||
    executorCount < 0
  )
    throw new Error("COUNT_REFERENCE_INPUT_INVALID");
  const free = asRecords(catalog.FREE_PROVIDERS);
  const noauth = asRecords(catalog.NOAUTH_PROVIDERS);
  const oauth = asRecords(catalog.OAUTH_PROVIDERS);
  const webCookie = asRecords(catalog.WEB_COOKIE_PROVIDERS);
  const apiKey = asRecords(catalog.APIKEY_PROVIDERS);
  const local = asRecords(catalog.LOCAL_PROVIDERS);
  const search = asRecords(catalog.SEARCH_PROVIDERS);
  const audio = asRecords(catalog.AUDIO_ONLY_PROVIDERS);
  const upstreamProxy = asRecords(catalog.UPSTREAM_PROXY_PROVIDERS);
  const cloudAgent = asRecords(catalog.CLOUD_AGENT_PROVIDERS);
  const system = asRecords(catalog.SYSTEM_PROVIDERS);

  const allIds = new Set<string>(
    PROVIDER_COLLECTION_NAMES.flatMap((name) => {
      if (!catalog[name]) throw new Error("COUNT_REFERENCE_COLLECTION_MISSING");
      return Object.values(catalog[name]).map((provider) => provider.id);
    })
  );

  const sections = [
    buildSection("Free Tier (OAuth-first or no-key)", free, "Free"),
    buildSection("No-auth Providers (no key required)", noauth, "No-auth"),
    buildSection("OAuth Providers", oauth, "OAuth"),
    buildSection("Web Cookie Providers", webCookie, "Web cookie"),
    buildSection("API Key Providers (paid / paid-with-free-credits)", apiKey, "API key"),
    buildSection("Local Providers", local, "Local"),
    buildSection("Search Providers", search, "Search"),
    buildSection("Audio-only Providers", audio, "Audio"),
    buildSection("Upstream Proxy Providers", upstreamProxy, "Upstream proxy"),
    buildSection("Cloud Agent Providers", cloudAgent, "Cloud agent"),
    buildSection("System Providers", system, "System"),
  ];

  const footer = [
    "## Sources of truth",
    "",
    "- Catalog: [`src/shared/constants/providers.ts`](../../src/shared/constants/providers.ts)",
    "- Registry (per-model details): [`open-sse/config/providerRegistry.ts`](../../open-sse/config/providerRegistry.ts)",
    `- Executors: [\`open-sse/executors/\`](../../open-sse/executors/) (${executorCount} implementations)`,
    "- Translators: [`open-sse/translator/`](../../open-sse/translator/)",
    "",
    "## See Also",
    "",
    "- [FREE_TIERS.md](./FREE_TIERS.md) — curated free-tier guide",
    "- [USER_GUIDE.md](../guides/USER_GUIDE.md) — provider setup walkthrough",
    "- [ARCHITECTURE.md](../architecture/ARCHITECTURE.md) — overall architecture",
    "",
  ].join("\n");

  return buildHeader(allIds.size, version, generatedDate) + sections.join("\n") + "\n" + footer;
}

export async function planProviderReference(
  options: Omit<ReferenceOptions, "generatedDate"> & {
    existing: string;
    today: string;
    format?: (text: string) => string | Promise<string>;
  }
) {
  const oldDate = options.existing.match(/^> \*\*Last generated:\*\* (\d{4}-\d{2}-\d{2})$/m)?.[1];
  if (!oldDate) throw new Error("COUNT_REFERENCE_DATE_MISSING");
  const format = options.format ?? ((text: string) => text);
  const stable = await format(renderProviderReference({ ...options, generatedDate: oldDate }));
  // Formatting-only drift must not rewrite a translated source or advance its date.
  if (stable === options.existing || stable === (await format(options.existing)))
    return options.existing;
  return format(renderProviderReference({ ...options, generatedDate: options.today }));
}

async function main() {
  const existing = fs.readFileSync(OUT_FILE, "utf8");
  const version = String(
    JSON.parse(fs.readFileSync(path.join(ROOT, "package.json"), "utf8")).version ?? ""
  );
  const prettier = await import("prettier");
  const options = await prettier.resolveConfig(OUT_FILE);
  const content = await planProviderReference({
    existing,
    version,
    executorCount: countExecutorImpls(),
    today: new Date().toISOString().slice(0, 10),
    format: (text) => prettier.format(text, { ...options, filepath: OUT_FILE }),
  });
  if (content !== existing) fs.writeFileSync(OUT_FILE, content);
  console.log(content === existing ? "Provider reference is current" : `Wrote ${OUT_FILE}`);
}

if (process.argv[1] && import.meta.url === pathToFileURL(path.resolve(process.argv[1])).href) {
  main().catch(() => {
    console.error("Provider reference generation failed");
    process.exitCode = 1;
  });
}
