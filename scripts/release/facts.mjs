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
import { fileURLToPath, pathToFileURL } from "node:url";

let _spawnSyncImpl = _spawnSync;
export function __setSpawnSyncForTest(fn) {
  _spawnSyncImpl = fn;
}
export function __resetSpawnSyncForTest() {
  _spawnSyncImpl = _spawnSync;
}

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..", "..");
export const FACTS_ROOT = ROOT;

const COMMON_NON_IMPL_BASENAMES = new Set([
  "index.ts",
  "index.mts",
  "types.ts",
  "base.ts",
  "constants.ts",
]);

export function countFiles(dir, suffix = ".ts", root = ROOT) {
  const abs = path.join(root, dir);
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

export function countRoutingStrategies(root = ROOT) {
  const file = path.join(root, "src", "shared", "constants", "routingStrategies.ts");
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

export function countScoringFactors(root = ROOT) {
  const file = path.join(root, "open-sse", "services", "autoCombo", "scoring.ts");
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
export function readProviderTotal(root = ROOT) {
  const abs = path.join(root, "docs", "reference", "PROVIDER_REFERENCE.md");
  if (!fs.existsSync(abs)) return 0;
  return parseProviderTotal(fs.readFileSync(abs, "utf8"));
}

// STRICT: number of SQL migration files shipped with the app.
export function countMigrations(root = ROOT) {
  const abs = path.join(root, "src", "lib", "db", "migrations");
  if (!fs.existsSync(abs)) return 0;
  return fs.readdirSync(abs).filter((f) => f.endsWith(".sql")).length;
}

// STRICT: canonical i18n locale count, read from the shared config.
export function countLocales(root = ROOT) {
  const abs = path.join(root, "config", "i18n.json");
  if (!fs.existsSync(abs)) return 0;
  try {
    const cfg = JSON.parse(fs.readFileSync(abs, "utf8"));
    return Array.isArray(cfg.locales) ? cfg.locales.length : 0;
  } catch {
    return 0;
  }
}

// Reads every code-derived fact in ONE tsx subprocess — the same functions the app serves at
// runtime, never a hardcoded copy. The probe is a real module (lib/code-facts-probe.mjs) run as
// `node --import tsx/esm`; it pins DATA_DIR to a throwaway dir itself, and the parent does too,
// so importing the MCP tool modules cannot touch the operator's real SQLite file. The
// subprocess stays (rather than importing the TypeScript in-process) so the gate never loads the
// app into its own process and a hung import is bounded by the timeout.
//
// The timeout is OMNIROUTE_FACTS_TIMEOUT_MS (default 600000 ms). It used to be a fixed 180 s,
// which a loaded host overran and the gate reported as documentation drift. A failure here is
// INFRASTRUCTURE (`error.kind`: timeout | spawn | exit | parse), never a divergence.
export const DEFAULT_FACTS_TIMEOUT_MS = 600000;
const PROBE = path.join(__dirname, "lib", "code-facts-probe.mjs");

export function resolveFactsTimeoutMs(timeoutMs, env = process.env) {
  if (timeoutMs != null) {
    const n = Number(timeoutMs);
    if (Number.isFinite(n) && n > 0) return Math.floor(n);
  }
  const fromEnv = Number(env.OMNIROUTE_FACTS_TIMEOUT_MS);
  return Number.isFinite(fromEnv) && fromEnv > 0 ? Math.floor(fromEnv) : DEFAULT_FACTS_TIMEOUT_MS;
}

const tail = (text, max = 400) => {
  const t = String(text || "").trim();
  return t.length > max ? "…" + t.slice(-max) : t;
};

function infraError(kind, detail) {
  return {
    kind,
    detail:
      `code facts could not be collected (${kind}): ${detail} — ` +
      "this is an infrastructure failure, not a documentation divergence",
  };
}

// PURE: classify one spawnSync result. Exported for tests.
export function classifyProbeResult(r, timeoutMs) {
  if (!r) return { facts: null, error: infraError("spawn", "spawnSync returned nothing") };
  if (r.error) {
    const code = r.error.code || r.error.name || "error";
    if (code === "ETIMEDOUT")
      return {
        facts: null,
        error: infraError("timeout", `probe exceeded ${timeoutMs} ms (OMNIROUTE_FACTS_TIMEOUT_MS)`),
      };
    return { facts: null, error: infraError("spawn", `${code}: ${r.error.message || ""}`.trim()) };
  }
  if (r.signal)
    return {
      facts: null,
      error: infraError(
        "timeout",
        `probe killed by ${r.signal} (timeout ${timeoutMs} ms, OMNIROUTE_FACTS_TIMEOUT_MS)`
      ),
    };
  if (r.status !== 0)
    return {
      facts: null,
      error: infraError("exit", `probe exited ${r.status}${r.stderr ? `: ${tail(r.stderr)}` : ""}`),
    };
  const line = String(r.stdout || "")
    .split("\n")
    .find((l) => l.startsWith("@@"));
  if (!line) return { facts: null, error: infraError("parse", "probe printed no @@ facts line") };
  try {
    const facts = JSON.parse(line.slice(2));
    if (!facts || typeof facts !== "object" || Array.isArray(facts))
      return { facts: null, error: infraError("parse", "facts line is not a JSON object") };
    return { facts, error: null };
  } catch (err) {
    return { facts: null, error: infraError("parse", `facts line is not JSON (${err.message})`) };
  }
}

/**
 * @param {{ timeoutMs?: number, root?: string }} [opts]
 * @returns {{ facts: object|null, error: null|{ kind: "timeout"|"spawn"|"exit"|"parse", detail: string } }}
 */
export function readCodeFactsResult({ timeoutMs, root = ROOT } = {}) {
  const timeout = resolveFactsTimeoutMs(timeoutMs);
  const tmp = fs.mkdtempSync(path.join(os.tmpdir(), "docs-counts-"));
  try {
    const r = _spawnSyncImpl(process.execPath, ["--import", "tsx/esm", PROBE], {
      cwd: root,
      encoding: "utf8",
      timeout,
      killSignal: "SIGKILL",
      maxBuffer: 64 * 1024 * 1024,
      env: { ...process.env, DATA_DIR: tmp, APP_LOG_LEVEL: "silent" },
    });
    return classifyProbeResult(r, timeout);
  } catch (err) {
    return { facts: null, error: infraError("spawn", err?.message || String(err)) };
  } finally {
    fs.rmSync(tmp, { recursive: true, force: true });
  }
}

// Compatibility: object | null. Callers must treat null as a failing check, not a skip.
export function readCodeFacts(opts) {
  return readCodeFactsResult(opts).facts;
}

// PURE: docs prose that names the product version ("OmniRoute v3.8.50 ·",
// "**Current version:** 3.8.50") must match package.json exactly.
export function readPackageVersion(root = ROOT) {
  try {
    return String(JSON.parse(fs.readFileSync(path.join(root, "package.json"), "utf8")).version);
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
export function readCoverageRatchetFloors(root = ROOT) {
  const fallback = { statements: 60, lines: 60, functions: 60, branches: 60 };
  try {
    const baseline = JSON.parse(
      fs.readFileSync(path.join(root, "config/quality/quality-baseline.json"), "utf8")
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

// --- Facts document (`npm run facts`, snapshot, refresh-derived) ------------------------------

export const FACTS_SCHEMA_VERSION = 1;

// Committed snapshot of the facts. Written ONLY by `npm run release:refresh-derived` (release and
// the nightly derived-refresh PR); the README SVG generators read it, and PR-time tests compare
// generated artifacts with it — never with the live code, which moves under every open PR.
export const FACTS_SNAPSHOT_PATH = "docs/reference/derived-facts.json";

// Fixed key order, so the serialized snapshot only changes when a value does.
const TOP_KEYS = [
  "schemaVersion",
  "version",
  "providers",
  "providerReferenceTotal",
  "migrations",
  "locales",
  "routingStrategies",
  "scoringFactors",
  "coverageFloors",
  "executors",
  "oauthProviders",
  "a2aSkills",
  "cloudAgents",
  "code",
];
const FLOOR_KEYS = ["statements", "lines", "functions", "branches"];
export const CODE_FACT_KEYS = [
  "freeSteady",
  "entries",
  "freeFirst",
  "freeGated",
  "freePools",
  "engines",
  "cliTotal",
  "cliCode",
  "cliAgent",
  "mcpTools",
  "mcpScopes",
  "providers",
  "freeForever",
  "modePacks",
  "catalogDate",
  "sortBy",
  "intelligentKeys",
  "hardStop",
  "trainsOnPrompts",
  "freeTierCount",
  "freeTierReg",
  "manifestFreeTier",
  "freeTierBudget",
];

function ordered(obj, keys) {
  const out = {};
  for (const k of keys) if (Object.prototype.hasOwnProperty.call(obj, k)) out[k] = obj[k];
  // A key this module does not know yet is kept, after the known ones, in a stable order.
  for (const k of Object.keys(obj).sort()) if (!(k in out)) out[k] = obj[k];
  return out;
}

// PURE: the facts with every object's keys in their fixed order.
export function normalizeFacts(facts) {
  const top = ordered(facts, TOP_KEYS);
  if (top.coverageFloors && typeof top.coverageFloors === "object")
    top.coverageFloors = ordered(top.coverageFloors, FLOOR_KEYS);
  if (top.code && typeof top.code === "object") top.code = ordered(top.code, CODE_FACT_KEYS);
  return top;
}

// The snapshot is staged like any JSON file, and lint-staged runs Prettier on JSON. So the
// serializer prints exactly what Prettier prints (printWidth 100): objects always expanded, an
// array of plain values on one line when that line fits, otherwise one value per line. Without
// this, every commit would reformat the file and the next refresh would undo it.
const PRINT_WIDTH = 100;

function printJson(value, indent, prefixLen, suffix) {
  if (value === null || typeof value !== "object") return JSON.stringify(value);
  const pad = " ".repeat(indent + 2);
  const close = " ".repeat(indent);
  if (Array.isArray(value)) {
    if (!value.length) return "[]";
    if (value.every((v) => v === null || typeof v !== "object")) {
      const inline = `[${value.map((v) => JSON.stringify(v)).join(", ")}]`;
      if (prefixLen + inline.length + suffix.length <= PRINT_WIDTH) return inline;
    }
    const items = value.map(
      (v, i) => pad + printJson(v, indent + 2, pad.length, i < value.length - 1 ? "," : "")
    );
    return `[\n${items.join(",\n")}\n${close}]`;
  }
  const keys = Object.keys(value);
  if (!keys.length) return "{}";
  const items = keys.map((k, i) => {
    const head = `${pad}${JSON.stringify(k)}: `;
    return head + printJson(value[k], indent + 2, head.length, i < keys.length - 1 ? "," : "");
  });
  return `{\n${items.join(",\n")}\n${close}}`;
}

// PURE: stable serialization — fixed key order, Prettier-identical layout, trailing newline.
export function serializeFacts(facts) {
  return printJson(normalizeFacts(facts), 0, 0, "") + "\n";
}

/**
 * Every derived number, from the tree at `root`. `facts` is null whenever the code facts could
 * not be collected: a partial document must never reach the snapshot or a rewrite.
 *
 * @param {{ root?: string, timeoutMs?: number }} [opts]
 * @returns {{ facts: object|null, error: null|{ kind: string, detail: string } }}
 */
export function collectFacts({ root = ROOT, timeoutMs } = {}) {
  const { facts: code, error } = readCodeFactsResult({ root, timeoutMs });
  if (error) return { facts: null, error };
  return {
    facts: normalizeFacts({
      schemaVersion: FACTS_SCHEMA_VERSION,
      version: readPackageVersion(root),
      providers: code.providers,
      providerReferenceTotal: readProviderTotal(root),
      migrations: countMigrations(root),
      locales: countLocales(root),
      routingStrategies: countRoutingStrategies(root),
      scoringFactors: countScoringFactors(root),
      coverageFloors: readCoverageRatchetFloors(root),
      executors: countFiles("open-sse/executors", ".ts", root),
      oauthProviders: countFiles("src/lib/oauth/providers", ".ts", root),
      a2aSkills: countFiles("src/lib/a2a/skills", ".ts", root),
      cloudAgents: countFiles("src/lib/cloudAgent/agents", ".ts", root),
      code,
    }),
    error: null,
  };
}

/** The committed snapshot, or null when it is missing or unreadable. */
export function loadFactsSnapshot(root = ROOT) {
  try {
    return JSON.parse(fs.readFileSync(path.join(root, FACTS_SNAPSHOT_PATH), "utf8"));
  } catch {
    return null;
  }
}

/** Writes the snapshot (stable serialization). Returns true when the file content changed. */
export function writeFactsSnapshot(facts, root = ROOT) {
  const abs = path.join(root, FACTS_SNAPSHOT_PATH);
  const next = serializeFacts(facts);
  const prev = fs.existsSync(abs) ? fs.readFileSync(abs, "utf8") : null;
  if (prev === next) return false;
  fs.mkdirSync(path.dirname(abs), { recursive: true });
  fs.writeFileSync(abs, next);
  return true;
}

// PURE: value at a dotted path ("code.mcpTools", "coverageFloors.lines"); undefined if absent.
export function getFactAt(facts, dotted) {
  let cur = facts;
  for (const part of String(dotted).split(".")) {
    if (cur == null || typeof cur !== "object" || !(part in cur)) return undefined;
    cur = cur[part];
  }
  return cur;
}

// CLI: npm run facts [-- --key=code.mcpTools] [--snapshot]
//   exit 0 ok · 1 unknown --key · 2 facts could not be read (infrastructure, not drift)
export function runFactsCli(
  argv = process.argv.slice(2),
  io = { out: console.log, err: console.error }
) {
  const snapshot = argv.includes("--snapshot");
  const keyArg = argv.find((a) => a.startsWith("--key="));
  let facts;
  if (snapshot) {
    facts = loadFactsSnapshot();
    if (!facts) {
      io.err(
        `[facts] ${FACTS_SNAPSHOT_PATH} is missing or not JSON — run npm run release:refresh-derived`
      );
      return 2;
    }
  } else {
    const r = collectFacts();
    if (r.error) {
      io.err(`[facts] ${r.error.detail}`);
      return 2;
    }
    facts = r.facts;
  }
  if (keyArg) {
    const value = getFactAt(facts, keyArg.slice("--key=".length));
    if (value === undefined) {
      io.err(`[facts] no fact at ${keyArg.slice("--key=".length)}`);
      return 1;
    }
    io.out(typeof value === "object" && value !== null ? JSON.stringify(value) : String(value));
    return 0;
  }
  io.out(serializeFacts(facts).trimEnd());
  return 0;
}

if (process.argv[1] && pathToFileURL(path.resolve(process.argv[1])).href === import.meta.url) {
  process.exitCode = runFactsCli();
}
