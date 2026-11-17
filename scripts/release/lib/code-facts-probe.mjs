// scripts/release/lib/code-facts-probe.mjs
//
// The code-derived half of `npm run facts`. It imports the SAME TypeScript modules the app
// serves at runtime (free-tier catalog, CLI tool catalog, MCP tool collections, provider
// collections, mode packs, compression engines) and prints ONE line, `@@<json>`, on stdout.
//
// It is never imported by the gate or by refresh-derived: scripts/release/facts.mjs runs it in
// a child process (`node --import tsx/esm scripts/release/lib/code-facts-probe.mjs`, cwd = the
// tree being measured) with DATA_DIR pointed at a throwaway directory, so importing the MCP tool
// modules can never open the operator's real SQLite file, and a hung import is bounded by the
// parent's timeout instead of freezing the gate.
//
// Until 2026-11-13 this was an inline `-e` string inside the counts gate. It is a real module now
// so it can be linted and read; the facts it prints and their keys are unchanged.

import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { pathToFileURL } from "node:url";
import { summarizeFreeTierBudget } from "../../docs/readmeFactsFreeTier.mjs";

// The tree being measured is the working directory (the parent sets `cwd`).
const ROOT = process.cwd();

// Self-isolation, independent of the parent: every app module is imported dynamically BELOW this
// line, so pointing DATA_DIR at a fresh throwaway directory here guarantees that importing the
// MCP tool modules (which open the database and run migrations on import) can never reach the
// operator's real ~/.omniroute/storage.sqlite — even when someone runs this file by hand.
const SCRATCH = fs.mkdtempSync(path.join(os.tmpdir(), "facts-probe-"));
process.env.DATA_DIR = SCRATCH;
process.env.APP_LOG_LEVEL = process.env.APP_LOG_LEVEL || "silent";
process.on("exit", () => fs.rmSync(SCRATCH, { recursive: true, force: true }));
const load = (rel) => import(pathToFileURL(path.join(ROOT, rel)).href);
const read = (rel) => fs.readFileSync(path.join(ROOT, rel), "utf8");

// Statuses whose free access renews or needs no key at all. One-time signup credits and
// discontinued pools are excluded on purpose, and so is every eligibility-gated row: a provider
// nobody can sign up for without clearing a gate is not "free forever" for the reader.
const FOREVER = new Set([
  "recurring-monthly",
  "recurring-daily",
  "recurring-uncapped",
  "recurring-credit",
  "keyless",
]);

// Every MCP tool collection the server registers, in the order the gate always used.
const MCP_COLLECTIONS = [
  ["MCP_TOOLS", "open-sse/mcp-server/schemas/tools.ts"],
  ["memoryTools", "open-sse/mcp-server/tools/memoryTools.ts"],
  ["skillTools", "open-sse/mcp-server/tools/skillTools.ts"],
  ["agentSkillTools", "open-sse/mcp-server/tools/agentSkillTools.ts"],
  ["githubSkillTools", "open-sse/mcp-server/tools/githubSkillTools.ts"],
  ["poolTools", "open-sse/mcp-server/tools/poolTools.ts"],
  ["gamificationTools", "open-sse/mcp-server/tools/gamificationTools.ts"],
  ["pluginTools", "open-sse/mcp-server/tools/pluginTools.ts"],
  ["notionTools", "open-sse/mcp-server/tools/notionTools.ts"],
  ["obsidianTools", "open-sse/mcp-server/tools/obsidianTools.ts"],
  ["localCorpusTools", "open-sse/mcp-server/tools/localCorpusTools.ts"],
  ["compressionTools", "open-sse/mcp-server/tools/compressionTools.ts"],
];

// The SAME provider collections gen-provider-reference.ts unions, so the doc-vs-live provider
// check cannot drift from the generator's definition of "provider".
const PROVIDER_COLLECTIONS = [
  "FREE_PROVIDERS",
  "NOAUTH_PROVIDERS",
  "OAUTH_PROVIDERS",
  "WEB_COOKIE_PROVIDERS",
  "APIKEY_PROVIDERS",
  "LOCAL_PROVIDERS",
  "SEARCH_PROVIDERS",
  "AUDIO_ONLY_PROVIDERS",
  "UPSTREAM_PROXY_PROVIDERS",
  "CLOUD_AGENT_PROVIDERS",
  "SYSTEM_PROVIDERS",
];

async function main() {
  const { computeFreeModelTotals, FREE_MODEL_BUDGETS } = await load(
    "open-sse/config/freeModelCatalog.ts"
  );
  const { FREE_TIER_PROVIDER_SET } = await load("open-sse/config/freeTierProviders.ts");
  const { generateProviderPluginManifest } = await load(
    "open-sse/config/providerPluginManifestRegistry.ts"
  );
  const { REGISTRY } = await load("open-sse/config/providers/index.ts");
  const { MODE_PACKS } = await load("open-sse/services/autoCombo/modePacks.ts");
  const { ENGINE_IDS } = await load("open-sse/services/compression/engineCatalog.ts");
  const { CLI_TOOLS } = await load("src/shared/constants/cliTools.ts");
  const { countUniqueMcpTools } = await load("open-sse/mcp-server/toolCount.ts");
  const cols = {};
  for (const [name, rel] of MCP_COLLECTIONS) cols[name] = (await load(rel))[name];
  const PROV = await load("src/shared/constants/providers.ts");

  const rankingsText = read("src/lib/freeProviderRankings.ts");
  const catalogText = read("open-sse/config/freeModelCatalog.data.ts");
  const intelligentText = read("src/lib/combos/intelligentRouting.ts");
  const catalogDate = catalogText.match(/FREE_CATALOG_CURATED_AT\s*=\s*"([^"]+)"/)?.[1] ?? null;
  const sortBy = rankingsText.match(/sortBy\?\s*:\s*"elo"\s*\|\s*"reliability"/)
    ? "reliability"
    : null;
  const intelligentKeys =
    intelligentText
      .match(/DEFAULT_INTELLIGENT_WEIGHTS[^=]*=\s*\{([\s\S]*?)\n\};/)?.[1]
      ?.split("\n")
      .filter((l) => l.includes(":")).length ?? 0;

  const providerIds = new Set();
  for (const name of PROVIDER_COLLECTIONS) {
    for (const p of Object.values(PROV[name] || {})) if (p && p.id) providerIds.add(p.id);
  }

  const scopes = new Set();
  for (const col of Object.values(cols)) {
    for (const t of Object.values(col)) for (const s of t?.scopes || []) scopes.add(s);
  }

  const totals = computeFreeModelTotals();
  const cli = Object.values(CLI_TOOLS);
  const byCategory = (c) => cli.filter((x) => x.category === c).length;

  const freeForever = new Set();
  for (const m of totals.perModel) {
    if (FOREVER.has(m.freeType) && !m.eligibilityGate) freeForever.add(m.provider);
  }

  const facts = {
    freeSteady: totals.steadyRecurringTokens,
    entries: totals.perModel.length,
    freeFirst: totals.firstMonthRealisticTokens,
    freeGated: totals.gatedRecurringTokens,
    freePools: totals.poolCount,
    engines: ENGINE_IDS.length,
    cliTotal: cli.length,
    cliCode: byCategory("code"),
    cliAgent: byCategory("agent"),
    mcpTools: countUniqueMcpTools(cols),
    mcpScopes: scopes.size,
    providers: providerIds.size,
    freeForever: freeForever.size,
    modePacks: Object.keys(MODE_PACKS),
    catalogDate,
    sortBy,
    intelligentKeys,
    hardStop: FREE_MODEL_BUDGETS.filter((e) => e.hardStopGuaranteed === true).length,
    trainsOnPrompts: FREE_MODEL_BUDGETS.filter((e) => e.trainsOnPrompts === true).length,
    freeTierCount: FREE_TIER_PROVIDER_SET.size,
    freeTierReg:
      FREE_TIER_PROVIDER_SET.size -
      [...FREE_TIER_PROVIDER_SET].filter((x) => !(x in REGISTRY)).length,
    manifestFreeTier: generateProviderPluginManifest().providers.filter((p) =>
      p.capabilities.includes("free-tier")
    ).length,
    // The rows the README free-tier budget card draws (scripts/docs/gen-readme-free-tier-budget.mjs
    // reads them from the snapshot instead of loading the catalog itself).
    freeTierBudget: summarizeFreeTierBudget(totals, (id) => PROV.AI_PROVIDERS?.[id]?.name),
  };
  process.stdout.write("@@" + JSON.stringify(facts) + "\n");
}

main().then(
  // Importing the MCP modules can leave timers/handles open; the facts are printed, so leave.
  () => process.exit(0),
  (err) => {
    process.stderr.write(`code-facts-probe: ${err?.stack || err}\n`);
    process.exit(1);
  }
);
