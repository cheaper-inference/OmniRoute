#!/usr/bin/env node
// scripts/release/facts.mjs
//
// Code facts behind every derived number in the docs: provider, migration, locale, routing
// strategy and scoring-factor counts, the package version, the blocking coverage floors, and
// the code-derived facts (MCP tools and scopes, free-tier catalog totals, CLI tools, mode
// packs, …) read from the live TypeScript modules.
//
// Plan "derived numbers and texts resolved only at release" (2026-11-13): these readers used
// to live inside scripts/check/check-docs-counts-sync.mjs. They are a module of their own so
// the counts gate, `npm run facts` and `npm run release:refresh-derived` share one definition
// of every number. The gate re-exports them, so existing imports keep working.

import fs from "node:fs";
import { spawnSync as _spawnSync } from "node:child_process";
import os from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";

let _spawnSyncImpl = _spawnSync;
export function __setSpawnSyncForTest(fn) {
  _spawnSyncImpl = fn;
}
export function __resetSpawnSyncForTest() {
  _spawnSyncImpl = _spawnSync;
}

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..", "..");

const COMMON_NON_IMPL_BASENAMES = new Set([
  "index.ts",
  "index.mts",
  "types.ts",
  "base.ts",
  "constants.ts",
]);

export function countFiles(dir, suffix = ".ts") {
  const abs = path.join(ROOT, dir);
  if (!fs.existsSync(abs)) return 0;
  return fs
    .readdirSync(abs)
    .filter(
      (f) =>
        f.endsWith(suffix) &&
        !f.endsWith(".test.ts") &&
        !f.startsWith("__") &&
        !COMMON_NON_IMPL_BASENAMES.has(f)
    ).length;
}

export function countRoutingStrategies() {
  const file = path.join(ROOT, "src", "shared", "constants", "routingStrategies.ts");
  if (!fs.existsSync(file)) return 0;
  const txt = fs.readFileSync(file, "utf8");
  const m = txt.match(/ROUTING_STRATEGY_VALUES\s*=\s*\[([^\]]*)\]/);
  if (!m) return 0;
  return (m[1].match(/"[^"]+"/g) || []).length;
}

// PURE: count the factors the Auto-Combo scorer actually declares.
// The engine is described as "N-factor" in prose, in code comments and in the
// strategy descriptions; N is `DEFAULT_WEIGHTS`, and nothing else. Two of those
// factors sit at weight 0 by default — they are still computed and consumed
// (`cacheAffinity > 0` gates prompt-cache dedup), so they count as declared.
export function parseScoringFactors(sourceText) {
  if (!sourceText) return 0;
  const m = sourceText.match(/DEFAULT_WEIGHTS[^=]*=\s*\{([\s\S]*?)\n\};/);
  if (!m) return 0;
  const body = m[1].replace(/\/\*[\s\S]*?\*\//g, "").replace(/\/\/[^\n]*/g, "");
  return (body.match(/^\s*([A-Za-z_$][\w$]*)\s*:/gm) || []).length;
}

export function countScoringFactors() {
  const file = path.join(ROOT, "open-sse", "services", "autoCombo", "scoring.ts");
  if (!fs.existsSync(file)) return 0;
  return parseScoringFactors(fs.readFileSync(file, "utf8"));
}

// PURE: parse the canonical provider total out of the auto-generated catalog text.
export function parseProviderTotal(referenceText) {
  if (!referenceText) return 0;
  const m = referenceText.match(/Total providers:\s*\*\*(\d+)\*\*/);
  return m ? Number(m[1]) : 0;
}

// STRICT: canonical provider total, read from the auto-generated catalog.
export function readProviderTotal() {
  const abs = path.join(ROOT, "docs", "reference", "PROVIDER_REFERENCE.md");
  if (!fs.existsSync(abs)) return 0;
  return parseProviderTotal(fs.readFileSync(abs, "utf8"));
}

// STRICT: number of SQL migration files shipped with the app.
export function countMigrations() {
  const abs = path.join(ROOT, "src", "lib", "db", "migrations");
  if (!fs.existsSync(abs)) return 0;
  return fs.readdirSync(abs).filter((f) => f.endsWith(".sql")).length;
}

// STRICT: canonical i18n locale count, read from the shared config.
export function countLocales() {
  const abs = path.join(ROOT, "config", "i18n.json");
  if (!fs.existsSync(abs)) return 0;
  try {
    const cfg = JSON.parse(fs.readFileSync(abs, "utf8"));
    return Array.isArray(cfg.locales) ? cfg.locales.length : 0;
  } catch {
    return 0;
  }
}

// Reads every code-derived fact in ONE tsx subprocess — the same functions the app
// serves at runtime, never a hardcoded copy. DATA_DIR is redirected to a throwaway dir
// so importing the MCP tool modules cannot touch the operator's real SQLite file.
// Returns null when tsx is unavailable — caller must treat it as a failing check, not a skip.
export function readCodeFacts() {
  const script = [
    'import {computeFreeModelTotals,FREE_MODEL_BUDGETS} from "./open-sse/config/freeModelCatalog.ts";',
    'import {FREE_TIER_PROVIDER_SET} from "./open-sse/config/freeTierProviders.ts";',
    'import {generateProviderPluginManifest} from "./open-sse/config/providerPluginManifestRegistry.ts";',
    'import {REGISTRY} from "./open-sse/config/providers/index.ts";',
    'import fs2 from "node:fs";',
    'import path2 from "node:path";',
    'const __rtxt=fs2.readFileSync(path2.join(process.cwd(),"src/lib/freeProviderRankings.ts"),"utf8");',
    'const __dtxt=fs2.readFileSync(path2.join(process.cwd(),"open-sse/config/freeModelCatalog.data.ts"),"utf8");',
    'const __itxt=fs2.readFileSync(path2.join(process.cwd(),"src/lib/combos/intelligentRouting.ts"),"utf8");',
    'const __cat=__dtxt.match(/FREE_CATALOG_CURATED_AT\\s*=\\s*"([^"]+)"/)?.[1]??null;',
    'const __sb=(__rtxt.match(/sortBy\\?\\s*:\\s*"elo"\\s*\\|\\s*"reliability"/)?"reliability":null);',
    'const __ik=__itxt.match(/DEFAULT_INTELLIGENT_WEIGHTS[^=]*=\\s*\\{([\\s\\S]*?)\\n\\};/)?.[1]?.split("\\n").filter(l=>l.includes(":")).length??0;',
    'import {MODE_PACKS} from "./open-sse/services/autoCombo/modePacks.ts";',
    'import {ENGINE_IDS} from "./open-sse/services/compression/engineCatalog.ts";',
    'import {CLI_TOOLS} from "./src/shared/constants/cliTools.ts";',
    'import {countUniqueMcpTools} from "./open-sse/mcp-server/toolCount.ts";',
    'import {MCP_TOOLS} from "./open-sse/mcp-server/schemas/tools.ts";',
    'import {memoryTools} from "./open-sse/mcp-server/tools/memoryTools.ts";',
    'import {skillTools} from "./open-sse/mcp-server/tools/skillTools.ts";',
    'import {agentSkillTools} from "./open-sse/mcp-server/tools/agentSkillTools.ts";',
    'import {githubSkillTools} from "./open-sse/mcp-server/tools/githubSkillTools.ts";',
    'import {poolTools} from "./open-sse/mcp-server/tools/poolTools.ts";',
    'import {gamificationTools} from "./open-sse/mcp-server/tools/gamificationTools.ts";',
    'import {pluginTools} from "./open-sse/mcp-server/tools/pluginTools.ts";',
    'import {notionTools} from "./open-sse/mcp-server/tools/notionTools.ts";',
    'import {obsidianTools} from "./open-sse/mcp-server/tools/obsidianTools.ts";',
    'import {localCorpusTools} from "./open-sse/mcp-server/tools/localCorpusTools.ts";',
    'import {compressionTools} from "./open-sse/mcp-server/tools/compressionTools.ts";',
    // Live provider total — the SAME collections gen-provider-reference.ts unions, so the
    // doc-vs-live check below cannot drift from the generator's definition of "provider".
    'import * as PROV from "./src/shared/constants/providers.ts";',
    "const provCols=[PROV.FREE_PROVIDERS,PROV.NOAUTH_PROVIDERS,PROV.OAUTH_PROVIDERS,",
    "PROV.WEB_COOKIE_PROVIDERS,PROV.APIKEY_PROVIDERS,PROV.LOCAL_PROVIDERS,PROV.SEARCH_PROVIDERS,",
    "PROV.AUDIO_ONLY_PROVIDERS,PROV.UPSTREAM_PROXY_PROVIDERS,PROV.CLOUD_AGENT_PROVIDERS,",
    "PROV.SYSTEM_PROVIDERS];",
    "const pids=new Set();",
    "for(const c of provCols)for(const p of Object.values(c||{}))if(p&&p.id)pids.add(p.id);",
    "const cols={MCP_TOOLS,memoryTools,skillTools,agentSkillTools,githubSkillTools,poolTools,",
    "gamificationTools,pluginTools,notionTools,obsidianTools,localCorpusTools,compressionTools};",
    "const sc=new Set();",
    "for(const col of Object.values(cols))for(const t of Object.values(col))",
    "for(const x of (t?.scopes||[]))sc.add(x);",
    "const t=computeFreeModelTotals();const cli=Object.values(CLI_TOOLS);",
    "const by=(c)=>cli.filter(x=>x.category===c).length;",
    // "Free forever" = every provider whose free access renews or needs no key at all.
    // one-time-initial (signup credits) and discontinued pools are excluded on purpose,
    // and so is every eligibility-gated row: a provider nobody can sign up for without
    // clearing a gate is not "free forever" for the reader of the headline.
    "const FOREVER=new Set(['recurring-monthly','recurring-daily','recurring-uncapped',",
    "'recurring-credit','keyless']);",
    "const ff=new Set();for(const m of t.perModel)",
    "if(FOREVER.has(m.freeType)&&!m.eligibilityGate)ff.add(m.provider);",
    'console.log("@@"+JSON.stringify({freeSteady:t.steadyRecurringTokens,entries:t.perModel.length,',
    "freeFirst:t.firstMonthRealisticTokens,freeGated:t.gatedRecurringTokens,",
    "freePools:t.poolCount,engines:ENGINE_IDS.length,",
    "cliTotal:cli.length,cliCode:by('code'),cliAgent:by('agent'),",
    "mcpTools:countUniqueMcpTools(cols),mcpScopes:sc.size,providers:pids.size,freeForever:ff.size,",
    "modePacks:Object.keys(MODE_PACKS),catalogDate:__cat,sortBy:__sb,intelligentKeys:__ik,",
    "hardStop:FREE_MODEL_BUDGETS.filter(e=>e.hardStopGuaranteed===true).length,",
    "trainsOnPrompts:FREE_MODEL_BUDGETS.filter(e=>e.trainsOnPrompts===true).length,",
    "freeTierCount:FREE_TIER_PROVIDER_SET.size,",
    "freeTierReg:FREE_TIER_PROVIDER_SET.size-[...FREE_TIER_PROVIDER_SET].filter(x=>!(x in REGISTRY)).length,",
    'manifestFreeTier:generateProviderPluginManifest().providers.filter(p=>p.capabilities.includes("free-tier")).length}));',
  ].join("");
  const tmp = fs.mkdtempSync(path.join(os.tmpdir(), "docs-counts-"));
  try {
    const r = _spawnSyncImpl(process.execPath, ["--import", "tsx/esm", "-e", script], {
      cwd: ROOT,
      encoding: "utf8",
      timeout: 180000,
      env: { ...process.env, DATA_DIR: tmp, APP_LOG_LEVEL: "silent" },
    });
    if (r.status !== 0 || !r.stdout) return null;
    const line = r.stdout.split("\n").find((l) => l.startsWith("@@"));
    return line ? JSON.parse(line.slice(2)) : null;
  } catch {
    return null;
  } finally {
    fs.rmSync(tmp, { recursive: true, force: true });
  }
}

// PURE: docs prose that names the product version ("OmniRoute v3.8.50 ·",
// "**Current version:** 3.8.50") must match package.json exactly.
export function readPackageVersion() {
  try {
    return String(JSON.parse(fs.readFileSync(path.join(ROOT, "package.json"), "utf8")).version);
  } catch {
    return null;
  }
}

/**
 * The BLOCKING coverage floors from config/quality/quality-baseline.json.
 *
 * Read from the baseline rather than hardcoded so G-08's validator and the gate
 * that actually blocks can never drift apart: a rebaseline moves both at once.
 *
 * @returns {{statements:number,lines:number,functions:number,branches:number}}
 */
export function readCoverageRatchetFloors() {
  const fallback = { statements: 60, lines: 60, functions: 60, branches: 60 };
  try {
    const baseline = JSON.parse(
      fs.readFileSync(path.join(ROOT, "config/quality/quality-baseline.json"), "utf8")
    );
    const metrics = baseline?.metrics ?? {};
    const pick = (key) => metrics[key]?.value;
    return {
      statements: pick("coverage.statements") ?? fallback.statements,
      lines: pick("coverage.lines") ?? fallback.lines,
      functions: pick("coverage.functions") ?? fallback.functions,
      branches: pick("coverage.branches") ?? fallback.branches,
    };
  } catch {
    return fallback;
  }
}
