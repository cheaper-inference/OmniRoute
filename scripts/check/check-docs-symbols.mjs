#!/usr/bin/env node
// scripts/check/check-docs-symbols.mjs
// Anti-hallucination gate (docs → code): every reference to a route `/api/...` within
// docs/**/*.md must resolve to an actual `route.ts` in src/app/api/. It takes an
// INVENTED/obsolete endpoint that the AI writes in docs/PRs describing a route that doesn't exist —
// the recurring pattern of docs PRs (e.g., oyi77) that fabricate endpoints/APIs.
//
// Complements the other anti-hallucination gates:
// - check-fetch-targets.mjs : fetch("/api/...") in UI → route.ts (code → code)
// - check-openapi-routes.mjs : path da openapi.yaml → route.ts (spec → code)
// - this gate : /api/... in prose/markdown → route.ts (docs → code)
//
// LOW-NOISE by design: scope ONLY to `/api/...` route paths (stronger signal).
// Everything that is known noise (OpenAI-compat proxy surface, refs to source files,
// Third-party upstream APIs, placeholders) goes to IGNORE with justification, NOT to
// the allowlist. The allowlist freezes only pre-existing REAL drift of docs.
// Stale-enforcement (6A.3): entry in KNOWN_STALE_DOC_REFS that does not suppress any real miss
// real → gate fails with removal instruction (prevents silent regression leak).
import fs from "node:fs";
import path from "node:path";
import { pathToFileURL } from "node:url";
import { reportStaleEntries } from "./lib/allowlist.mjs";
import { collectApiRouteFiles } from "./lib/apiRoutes.mjs";

const ROOT = process.cwd();
const DOCS = path.join(ROOT, "docs");

// Patterns that are NOT internal OmniRoute routes (structural noise, not drift).
// Add here (with justification) instead of the allowlist when a category generates
// false positives — the allowlist is only for REAL stale endpoints.
const IGNORE = [
  /^\/api\/v1\//, // OpenAI-compat surface (proxy), not internal route
  /^\/api\/v1beta\//, // surface Gemini-compat (proxy)
  /^\/api\/v0\//, // APIs upstream de terceiros citadas em docs de pesquisa
  /^\/api\/v2\//, // idem (deployments etc.)
  /^\/api\/(organizations|map-image|graphql|gql)\b/, // APIs de provedores externos documentadas
  /your-/i, // placeholder de exemplo
  /example/i, // placeholder de exemplo
  /\.{3}/, // placeholder "..."
  /\{\}/, // empty param placeholder
  /_(POST|GET|PUT|DELETE|PATCH)$/, // network trace-style refs (gql_POST)
];

// References to SOURCE FILES, not to URLs (e.g. src/app/api/.../route.ts mentioned in text).
// The gate only validates route URLs, not file paths.
function isFileRef(p) {
  return /\.(ts|tsx|js|mjs|jsx)$/.test(p) || /\/route$/.test(p);
}

// Refs to `/api/...` that DO NOT resolve to an actual route, frozen for triage
// (turnstile: blocks ANY new reference made up in docs). These are REAL findings of
// drift/hallucination in pre-existing docs — each one needs to: create the route, correct
// the path in the doc, or remove the mention. DO NOT add new ones here without justification — these
// is the gate point. Tracking issues must be opened for each cluster.
export const KNOWN_STALE_DOC_REFS = new Set([
  // docs/reference/API_REFERENCE.md — guardrails/shadow doc-fiction RESOLVED in #3496:
  // GET /api/guardrails + POST /api/guardrails/test are now REAL routes (wrapping the
  // existing guardrailRegistry); the fictional enable/disable/logs rows and the entire
  // shadow table were removed from the doc (shadow A-B comparison is combo-config +
  // /api/combos/metrics). No allowlist entries needed for these anymore.
  // (DISCOVERY_TOOL_DESIGN.md saiu de docs/research/ para o repo isolado _tasks/research/
  // — gitignored, fora do escopo deste gate. As 4 entradas /api/discovery/* viraram
  // obsolete and were removed to satisfy the stale-enforcement of the allowlist.)
]);

function walk(dir, filter, acc = []) {
  if (!fs.existsSync(dir)) return acc;
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) walk(p, filter, acc);
    else if (filter(e.name)) acc.push(p);
  }
  return acc;
}

/** @deprecated prefer collectApiRouteFiles from lib/apiRoutes.mjs — re-export for tests. */
export function collectRouteFiles(root = ROOT) {
  return collectApiRouteFiles(root);
}

/** Normalizes a dynamic segment ({param} / [param] / [...param] / :param) to wildcard. */
function normSeg(seg) {
  if (/^\[\[?\.{3}.+\]\]?$/.test(seg)) return ""; // catch-all [...x] / [[...x]]
  if (/^\{[^}]+\}$/.test(seg) || /^\[[^\]]+\]$/.test(seg) || /^:[^/]+$/.test(seg)) return " ";
  return seg;
}

// /api/providers/{id}/models → src/app/api/providers/[id]/models/route.ts
// Match by segment count OR by prefix (a doc can only mention the prefix of
// a deeper route, e.g. /api/auth describing the /api/auth/login family). Any
// dynamic segment ([..]/{..}/:..) matches a real dynamic segment.
export function resolveApiDocPathToRoute(apiPath, routeFiles) {
  const segs = apiPath
    .replace(/^\//, "")
    .replace(/[?#].*$/, "")
    .split("/")
    .map(normSeg);
  for (const rf of routeFiles) {
    const rsegs = rf
      .replace(/^src\/app\//, "")
      .replace(/\/route\.tsx?$/, "")
      .split("/");
    const rnorm = rsegs.map((rs) => {
      if (/^\[\[?\.{3}.+\]\]?$/.test(rs)) return ""; // catch-all
      if (/^\[[^\]]+\]$/.test(rs)) return " "; // [param]
      return rs;
    });
    const catchAll = rnorm.includes("");
    const effLen = catchAll ? rnorm.indexOf("") : rnorm.length;
    if (!catchAll && segs.length > rnorm.length) continue; // doc mais profunda que a rota
    if (catchAll && segs.length < effLen) continue;
    const cmpLen = Math.min(segs.length, effLen || rnorm.length);
    let match = true;
    for (let i = 0; i < cmpLen; i++) {
      const rs = rnorm[i];
      if (rs === "") break; // catch-all absorve o resto
      if (!(rs === segs[i] || rs === " " || segs[i] === " ")) {
        match = false;
        break;
      }
    }
    if (match) return true;
  }
  return false;
}

/** Cleans up the captured path: removes punctuation/emphasis from prose, closes dangling brackets. */
function cleanCapturedPath(raw) {
  let p = raw.replace(/[.,:;_)>]+$/, "");
  const ob = (p.match(/\[/g) || []).length;
  const cb = (p.match(/\]/g) || []).length;
  const oc = (p.match(/\{/g) || []).length;
  const cc = (p.match(/\}/g) || []).length;
  if (ob !== cb || oc !== cc) {
    // segmento final truncado pelo regex (bracket aberto sem fechar na prosa) → descarta
    p = p.replace(/\/[^/]*[[{][^/]*$/, "");
  }
  return p.replace(/\/$/, ""); // remove barra final (forma de prefixo)
}

// /api/... only counts as a URL when it is NOT the tail of a source file path
// (src/lib/api/, @/app/api/, app/api/). Group 2 is the path.
const API_PATH_RE = /(^|[^A-Za-z0-9_/])(\/api\/[A-Za-z0-9_\-/{}\[\].:]+)/g;

/** Extracts the distinct /api/... paths from a Markdown file (URL form, not file). */
export function extractDocApiPaths(src) {
  const out = new Set();
  let m;
  API_PATH_RE.lastIndex = 0;
  while ((m = API_PATH_RE.exec(src))) {
    const p = cleanCapturedPath(m[2]);
    if (p && p !== "/api") out.add(p);
  }
  return [...out];
}

/**
 * Pure/testable core.
 * @param {{file: string, paths: string[]}[]} docPathsByFile
 * @param {Set<string>} routeFiles  set of "src/app/api/.../route.ts"
 * @param {Set<string>} allowlist   paths stale congelados
 * @returns {string[]}  misses in the format "file → /api/path"
 */
export function findStaleDocApiRefs(docPathsByFile, routeFiles, allowlist) {
  const misses = [];
  for (const { file, paths } of docPathsByFile) {
    for (const p of paths) {
      if (IGNORE.some((rx) => rx.test(p))) continue;
      if (isFileRef(p)) continue;
      if (allowlist.has(p)) continue;
      if (!resolveApiDocPathToRoute(p, routeFiles)) {
        misses.push(`${file} → ${p}`);
      }
    }
  }
  return misses;
}

/**
 * @param {{ root?: string, routeFiles?: Set<string> }} [opts]
 * @returns {{ ok: boolean, exitCode: number, message: string }}
 */
export function runDocsSymbolsCheck(opts = {}) {
  const root = opts.root || ROOT;
  const docsDir = path.join(root, "docs");
  const routeFiles = opts.routeFiles || collectApiRouteFiles(root);
  // docs/i18n/** are auto-generated mirrors of the canonical docs — validate only the canonical
  // avoids 40× duplicate noise (and mirrors inherit any fix from the canonical).
  // docs/superpowers/** are internal implementation plans (historical snapshots
  // of intent — they may mention planned/abandoned routes), not claims about the
  // current code; outside the scope of the gate (drift appeared in cycle v3.8.18).
  const docFiles = walk(docsDir, (n) => /\.md$/.test(n)).filter((f) => {
    const rel = path.relative(root, f).replace(/\\/g, "/");
    return !rel.startsWith("docs/i18n/") && !rel.startsWith("docs/superpowers/");
  });
  const docPathsByFile = docFiles.map((f) => ({
    file: path.relative(root, f).replace(/\\/g, "/"),
    paths: extractDocApiPaths(fs.readFileSync(f, "utf8")),
  }));

  const allMisses = findStaleDocApiRefs(docPathsByFile, routeFiles, new Set());
  const liveMissPaths = allMisses.map((m) => m.split(" → ")[1]);
  const stale = reportStaleEntries(KNOWN_STALE_DOC_REFS, liveMissPaths, "check-docs-symbols");
  const misses = findStaleDocApiRefs(docPathsByFile, routeFiles, KNOWN_STALE_DOC_REFS);

  const parts = [];
  if (stale.length) {
    parts.push(
      `[check-docs-symbols] ${stale.length} obsolete entry(ies) in the allowlist ` +
        `— the violation has been fixed; REMOVE the entry to lock in the fix:\n` +
        stale.map((e) => `  ✗ ${e}`).join("\n")
    );
  }
  if (misses.length) {
    parts.push(
      `[check-docs-symbols] ${misses.length} ref(s) /api em docs sem rota real:\n` +
        misses.map((m) => "  ✗ " + m).join("\n") +
        `\n  → create the route.ts, correct the path in the doc, or (if it's upstream/placeholder)` +
        ` add a pattern to IGNORE with justification. DO NOT add to the allowlist without` +
        ` confirm that it is real pre-existing drift. `
    );
  }
  if (parts.length) {
    return { ok: false, exitCode: 1, message: parts.join("\n") };
  }
  return {
    ok: true,
    exitCode: 0,
    message:
      `[check-docs-symbols] OK — ${docFiles.length} canonical docs, `
      `${routeFiles.size} rotas conhecidas, ${KNOWN_STALE_DOC_REFS.size} stale congeladas`,
  };
}

function main() {
  const result = runDocsSymbolsCheck();
  if (result.ok) console.log(result.message);
  else console.error(result.message);
  process.exit(result.exitCode);
}

if (import.meta.url === pathToFileURL(process.argv[1] || "").href) main();
