#!/usr/bin/env node
// scripts/check/check-db-rules.mjs
// Database conventions gate (CLAUDE.md Hard Rules #2 and #5). A check:
//  (c) Nenhum SQL cru em src/app/api/**/route.ts ou open-sse/handlers/*.ts.
//      SQL must live in src/lib/db/ (Hard Rule #5). Pre-existing offenders
//      are frozen; ANY new raw SQL in a route/handler fails.
// The old checks (a) full re-export via src/lib/localDb.ts and
// (b) localDb.ts without logic were REMOVED: the barrel src/lib/localDb.ts was
// deleted (#11795) — consumers import src/lib/db/* modules directly
// ("never barrel-import" rule, enforced by eslint no-restricted-imports).
// Stale-enforcement (6A.3): entries in EXTERNAL_DB_ALLOWED that do not suppress
// no actual violation → gate fails with removal instruction.
import fs from "node:fs";
import path from "node:path";
import { pathToFileURL } from "node:url";
import { assertNoStale } from "./lib/allowlist.mjs";

const cwd = process.cwd();
const API_DIR = path.join(cwd, "src/app/api");
const HANDLERS_DIR = path.join(cwd, "open-sse/handlers");

// (c) SQL reads against EXTERNAL databases, allowed by design (#3500).
// This route DOES NOT query the OmniRoute DB (getDbInstance) — it opens the
// SQLite de OUTRO aplicativo (Kiro) para auto-importar credenciais.
// Therefore, it CANNOT reside in src/lib/db/ (which is the domain of the OmniRoute DB):
// is a read-only operation of an external file, with its own path/scope.
// It remains on the allowlist as a DOCUMENTED exception — the gate still blocks
// ANY new raw SQL against the OmniRoute DB in routes/handlers.
// All Hard Rule real debt
// src/lib/db/ modules in the #3500 slices; this set only contains the exceptions.
// The Cursor analog (src/app/api/oauth/cursor/auto-import/route.ts) DOES NOT
// need to be entered here: the SQL against Cursor's external state.vscdb lives

// varre src/app/api/**/route.ts e open-sse/handlers/*.ts).
export const EXTERNAL_DB_ALLOWED = new Set([
  "src/app/api/oauth/kiro/auto-import/route.ts", // read-only no SQLite do Kiro (DB externo)
]);

// Alias de retrocompatibilidade (testes/consumidores que importam KNOWN_RAW_SQL).

export const KNOWN_RAW_SQL = EXTERNAL_DB_ALLOWED;

function walk(dir, acc = []) {
  if (!fs.existsSync(dir)) return acc;
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) walk(p, acc);
    else acc.push(p);
  }
  return acc;
}

// Raw SQL is always a STRING passed to db.prepare()/exec(): we match the patterns
// ONLY within string literals (not in JS code — `import … from`, `.set(`,
// `new Set(`, `delete x` etc. are false positives if we scan the entire code).
const SQL_PATTERNS = [
  /\bSELECT\b[\s\S]*?\bFROM\b/i, // SELECT … FROM (multi-line)
  /\bINSERT\s+INTO\b/i,
  /\bUPDATE\b[\s\S]*?\bSET\b/i, // UPDATE … SET (multi-line)
  /\bDELETE\s+FROM\b/i,
  /\bCREATE\s+TABLE\b/i,
];

// Remove comments (line // … and blocks /* */) — SQL in comments doesn't count.
function stripComments(source) {
  return source.replace(/\/\*[\s\S]*?\*\//g, "").replace(/\/\/[^\n]*/g, "");
}

// Extracts the content of all string literals (template, double quotes, single quotes)
// simple) of a code snippet that already has no comments. Returns the concatenation of the

export function extractStringLiterals(code) {
  const re = /`(?:\\[\s\S]|[^\\`])*`|"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'/g;
  const out = [];
  let m;
  while ((m = re.exec(code))) {
    // tira as aspas/crases delimitadoras
    out.push(m[0].slice(1, -1));
  }
  return out.join("\n\u0000\n"); // separator that no SQL standard crosses
}

// (c) Files with raw SQL inside string literals (non-comment lines),
// fora do allowlist.
export function findRawSql(files, allowlist = KNOWN_RAW_SQL) {
  const offenders = [];
  for (const file of files) {
    const rel = path.relative(cwd, file).replace(/\\/g, "/");
    if (allowlist.has(rel)) continue;
    let src;
    try {
      src = fs.readFileSync(file, "utf8");
    } catch {
      continue;
    }
    // Match each literal independently. Joining literals before scanning would
    // turn harmless code such as `update(...)` plus a later `"set"` string into
    // a false UPDATE ... SET SQL match.
    const literals = extractStringLiterals(stripComments(src)).split("\n\u0000\n");
    if (literals.some((literal) => SQL_PATTERNS.some((rx) => rx.test(literal)))) {
      offenders.push(rel);
    }
  }
  return offenders;
}

// Collects the files subject to check (c): API routes + stream handlers.
export function collectSqlScanFiles(apiDir = API_DIR, handlersDir = HANDLERS_DIR) {
  const routes = walk(apiDir).filter((p) => /(^|\/)route\.tsx?$/.test(p.replace(/\\/g, "/")));
  const handlers = fs.existsSync(handlersDir)
    ? fs
        .readdirSync(handlersDir, { withFileTypes: true })
        .filter((e) => e.isFile() && /\.tsx?$/.test(e.name))
        .map((e) => path.join(handlersDir, e.name))
    : [];
  return [...routes, ...handlers];
}

function main() {
  const failures = [];

  // (c) SQL cru fora de db/
  // Live raw-SQL offenders BEFORE allowlist filtering (needed for stale-enforcement).
  const scanFiles = collectSqlScanFiles();
  const liveRawSql = findRawSql(scanFiles, new Set());
  assertNoStale(EXTERNAL_DB_ALLOWED, liveRawSql, "check-db-rules:raw-sql");

  const rawSql = findRawSql(scanFiles);
  if (rawSql.length) {
    failures.push(
      `[#5 raw-sql] ${rawSql.length} file(s) with raw SQL outside src/lib/db/:\n` +
        rawSql.map((f) => `  ✗ ${f}`).join("\n") +
        `\n  → move the SQL to a src/lib/db/ module (never raw SQL in route/handler)` +
        ` ou congele em KNOWN_RAW_SQL com justificativa.`
    );
  }

  if (failures.length) {
    console.error(`[check-db-rules] FAILED:\n\n` + failures.join("\n\n"));
    process.exitCode = 1;
  }
  if (!process.exitCode) {
    console.log(
      `[check-db-rules] OK (${scanFiles.length} files scanned; ` +
        `${EXTERNAL_DB_ALLOWED.size} leituras de DB externo permitidas (#3500))`
    );
  }
}

if (import.meta.url === pathToFileURL(process.argv[1] || "").href) main();
