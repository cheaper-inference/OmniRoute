#!/usr/bin/env node
// scripts/check/check-identity-bounds.mjs
// Numeric bounds and identity/ownership: five reusable named predicates, each
// with an executed nominal case and limit case. Busy waiting (a setImmediate
// loop) is covered as a non-bound invariant elsewhere, so it is not treated
// here.
//
// Targets come from `git diff "$BASE" --name-only` plus `git ls-files --others`,
// never a bare `git diff` (a committed PR would otherwise yield zero targets).
// `BASE` is supplied by the verified merge-base source (step-level env in CI).
import fs from "node:fs";
import path from "node:path";
import { execFileSync } from "node:child_process";
import { pathToFileURL } from "node:url";

// INT32_MAX is a platform constant, not a magic number.
export const INT32_MAX = 2147483647;
// MAX_TOTAL (unchanged bound): the numeric fallback value.
export const FALLBACK = 3000;
const MS_PER_DAY = 86400000;

// 1. numeric_bound — a bounded parser.
//    `^\d+$` + Number.isSafeInteger > 0 + fallback + Math.min(expr, INT32_MAX).
//    Limit: "100_000" -> fallback (not 100); 1+300 zeros -> fallback (not Infinity).
export function numeric_bound(raw, { fallback = FALLBACK, ceiling = INT32_MAX } = {}) {
  const s = String(raw).trim();
  if (!/^\d+$/.test(s)) return fallback;
  const n = Number(s);
  if (!Number.isSafeInteger(n) || n <= 0) return fallback;
  return Math.min(n, ceiling);
}

// Bounded TTL: 30 days -> INT32_MAX ms, never collapsed to 1 ms.
export function ttl_bound_ms(days, { fallback = FALLBACK, ceiling = INT32_MAX } = {}) {
  const n = numeric_bound(days, { fallback, ceiling: Number.MAX_SAFE_INTEGER });
  if (n === fallback) return fallback;
  const ms = n * MS_PER_DAY;
  if (!Number.isSafeInteger(ms)) return ceiling;
  return Math.min(Math.max(ms, 1), ceiling);
}

// Canonical duration of a 30-day TTL: 2,592,000,000 ms (derived from
// MS_PER_DAY, not an application constant written by hand).
export const TTL_30D_MS = 30 * MS_PER_DAY;

// 1b. ttl_30d_not_collapsed — canonical limit of the "30-day TTL -> 1 ms" case.
//     Bounding in `ttl_bound_ms` does NOT REPLACE detection of the defect:
//     when code announces 30 days (comment or expected expression) but sets
//     `ttl = 1`, refuse with path + line + a correction command. Without a
//     30-day context, emit no signal (no false REJECTED on a legitimate TTL).
const EXPECTED_30D_RE =
  /30\s*\*\s*86400\s*\*\s*1000|30\s*\*\s*MS_PER_DAY|30\s*\*\s*24\s*\*\s*60\s*\*\s*60\s*\*\s*1000|2[_ ]?592[_ ]?000[_ ]?000|30\s*(?:j|days?|days?)\b/i;
const TTL_EFFONDRE_RE = /\bttl\w*\s*[:=]\s*1\b/i;

export function ttl_30d_not_collapsed({ code = "", line = "" } = {}) {
  const target = String(line || code);
  if (!TTL_EFFONDRE_RE.test(target)) return true; // no `ttl = 1`, nothing to report
  // Neighborhood bounded to +/-3 lines: a 30-day mention elsewhere in the file
  // must not refuse a legitimate short TTL (no false REJECTED).
  const lines = String(code).split(/\r?\n/);
  const idx = lines.findIndex((l) => l === target);
  const start = idx === -1 ? 0 : Math.max(0, idx - 3);
  const end = idx === -1 ? lines.length : idx + 4;
  const neighborhood = lines.slice(start, end).join("\n");
  if (!EXPECTED_30D_RE.test(neighborhood)) return true; // no 30-day context, green
  return false; // 30 days collapsed to 1 ms, REJECTED
}

export const CORRECTION_TTL_30D =
  `correction: ttl = 30 * 86400 * 1000 (${TTL_30D_MS} ms) or the validated bound; ` +
  `replay 'node --test tests/unit/check-identity-bounds-predicates.test.mjs'`;

// 2. identity_item — identity from a GENERATED frame matrix, never a hardcoded
//    ID. The last choice0 frame wins; removing a choice-0 frame is forbidden.
export function identity_item({ code = "", frames = [], candidate } = {}) {
  const c = String(code);
  if (/\bidentity\s*=\s*["'][A-Za-z0-9_-]+["']/.test(c)) return false; // hardcoded ID
  if (/\b(?:delete|splice|remove)\b[^\n]{0,80}\b(?:choice0|choice0)\b/i.test(c)) return false;
  if (!/\b(?:matrix|generate|frames?\s*\.\s*(?:map|from)|for\s*\()/i.test(c)) {
    return false; // matrix not generated
  }
  // A CLI scan has no runtime frames: absence of evidence is not a source
  // violation. The source-level checks above still apply. When a candidate is
  // supplied, keep the existing null-expected behavior (unusable evidence is
  // reported) before comparing it with the last generated frame.
  if (candidate === undefined) return true;
  const expected = [...frames].reverse().find((f) => f && f.choice0)?.choice0 ?? null;
  if (expected === null) return false;
  return candidate === expected;
}

// 3. owner_cleanup — registry.get(X) === thisSetup before delete(X).
//    A single install without `existing` is green.
//    REJECTED: an old instance modifies its successor's entry;
//           existing.stop() must not dominate refreshAndPublish().
export function owner_cleanup({ code = "", events = [] } = {}) {
  const c = String(code);
  const ownerGuard =
    /\bregistry\s*\.\s*get\s*\([^)]*\)\s*===\s*thisSetup\b/.test(c) ||
    /\bfor\s*\([^)]*\bthisSetup\b/.test(c);
  const installationUnique =
    !/\bexisting\b/.test(c) && /\b(?:refreshAndPublish|install|register)\b/.test(c);
  if (!ownerGuard && !installationUnique) return false;
  if (/\bexisting\s*\.\s*stop\s*\(/.test(c) && /\brefreshAndPublish\b/.test(c)) {
    const iStop = c.search(/\bexisting\s*\.\s*stop\s*\(/);
    const iRefresh = c.search(/\brefreshAndPublish\b/);
    if (iStop < iRefresh) return false;
  }
  for (const e of events) {
    if (e.owner !== e.cleanupBy) return false;
  }
  return true;
}

// 4. result_key — getAllAccessTokens(rows) filters a truthy connectionId;
//    onPersist returns Promise<boolean> with `if (!(await ...)) throw`.
//    REJECTED: `?? ''`; a bare callback.
export function result_key({ code = "", onPersist = "" } = {}) {
  const c = String(code);
  const p = String(onPersist || c);
  if (/\?\?\s*["']{2}/.test(c)) return false; // empty fallback forbidden
  if (/\bgetAllAccessTokens\s*\(/.test(c)) {
    const filter =
      /\.filter\s*\([^\n]{0,160}\bconnectionId\b/.test(c) ||
      /\bif\s*\([^)]*\bconnectionId\b/.test(c) ||
      /\bconnectionId\s*&&/.test(c);
    if (!filter) return false;
  }
  // Persistence-result checks apply only when a persistence operation is in
  // scope. A pure token-key filter has no callback to validate, and a CLI scan
  // carries no separate callback evidence: requiring one there rejects valid
  // filtering code.
  const hasPersistence =
    (onPersist && String(onPersist).trim().length > 0) || /\bonPersist\b|\bpersist\s*\(/.test(c);
  if (!hasPersistence) return true;
  const promiseBool = /Promise\s*<\s*boolean\s*>/.test(p) || /\basync\s*\(/.test(p);
  const guard = /if\s*\(\s*!\s*\(\s*await\b/.test(p) && /\bthrow\b/.test(p);
  return promiseBool && guard; // bare callback -> no guard -> REJECTED
}

// 5. checkpoint_resume — a resumed batch over the limit is green, count kept.
//    REJECTED: admission gate applied to a resumed batch; count overwritten.
export function checkpoint_resume({ code = "", batches = [] } = {}) {
  const c = String(code);
  if (/\bcount\s*=\s*\d+\s*[;,)]/.test(c) && !/\bcount\s*(?:\+=|\+\s*1)/.test(c)) {
    return false; // count overwritten
  }
  const hasResumedBatch = batches.some((l) => l && l.resumed);
  // An "admission" mention alone is not a violation: this predicate only judges
  // an admission gate applied to a RESUMED batch. Without a resume/checkpoint
  // signal in scope, emit no finding instead of a false REJECTED on unrelated
  // lines such as an admission-policy constant in a touched file.
  if (!/resume|checkpoint|resumed/i.test(c) && !hasResumedBatch) return true;
  for (const batch of batches) {
    if (!batch || !batch.resumed) continue;
    if (batch.admission) return false; // admission on resumed batch
    if (batch.countOverwritten) return false; // count overwritten
  }
  if (hasResumedBatch) return true;
  // The CLI has no batch evidence: derive the decision from the source control
  // flow. A `resume` keyword alone does not prove the invariant; the source
  // must actually refuse an over-limit resumed batch (or admit it without an
  // admission gate).
  const sizeGuard =
    /\bresumed\b[^\n]{0,160}\b(?:size|count)\s*>\s*(?:limit|max|MAX)\b[\s\S]{0,120}\breturn\s+false\b/i.test(
      c
    ) || /\breturn\s+false\b[^\n]{0,160}\bresumed\b[^\n]{0,120}\b(?:size|count)\s*>/i.test(c);
  const countKept =
    /\bresumed\b[^\n]{0,120}\bcount\s*(?:\+=|\+\s*1)\b/.test(c) ||
    /\bcount\s*(?:\+=|\+\s*1)\b[^\n]{0,120}\bresumed\b/.test(c);
  return sizeGuard || countKept;
}

export const PREDICATES = Object.freeze({
  numeric_bound,
  ttl_30d_not_collapsed,
  identity_item,
  owner_cleanup,
  result_key,
  checkpoint_resume,
});

const TRIGGERS = [
  // Priority: a collapsed 30-day TTL must be refused before plain bounding.
  [
    "ttl_30d_not_collapsed",
    /\bttl\w*\s*[:=]\s*1\b|30\s*\*\s*86400\s*\*\s*1000|30\s*\*\s*MS_PER_DAY|2[_ ]?592[_ ]?000[_ ]?000|\b30\s*(?:j|days?|days?)\b/i,
  ],
  ["numeric_bound", /\b(?:maxTokens?|ttl|bound|ceiling|limit)\s*[:=]/i],
  ["identity_item", /\b(?:frames?|choice0|choice0|identity|identity)\b/i],
  ["owner_cleanup", /\b(?:registry|cleanup|existing|refreshAndPublish|thisSetup)\b/],
  ["result_key", /\b(?:getAllAccessTokens|onPersist|connectionId)\b/],
  ["checkpoint_resume", /\b(?:resume|checkpoint|resumed|admission)\b/i],
];

// A predicate judges executable source, not prose. Comment-only lines carry
// trigger words ("Limit:", "existing", "cleanup") that would otherwise become
// false REJECTED. A line with code before a trailing comment stays evaluated.
const COMMENT_LINE = /^\s*(?:\/\/|\/\*|\*+|#)/;

export function identity_bounds({ targets = [], proofs = {} } = {}) {
  const rejections = [];
  let evaluated = 0;
  for (const { file, text } of targets) {
    if (!/\.(?:mjs|cjs|js|ts)$/i.test(file)) continue;
    for (const line of String(text).split(/\r?\n/)) {
      if (COMMENT_LINE.test(line)) continue;
      const entry = TRIGGERS.find(([, re]) => re.test(line));
      if (!entry) continue;
      const [name] = entry;
      evaluated += 1;
      let ok = false;
      try {
        if (name === "numeric_bound") {
          // Keep the extractor consistent with the numeric_bound trigger,
          // which also matches `limit`. Without it `const limit = 42;` yields
          // an empty raw value and is rejected as an invalid fallback.
          const m = line.match(
            /(?:ttl|maxTokens?|bound|ceiling|limit)\s*[:=]\s*["']?(\d[\d_]*)["']?/i
          );
          const raw = m ? m[1] : "";
          const bounded = numeric_bound(raw);
          // Parse validity is separate from the fallback value: a digit-only
          // zero (or an integer outside the safe range) must never be accepted
          // as a successful validation because the fallback was returned.
          const parsed = Number(raw);
          ok =
            bounded !== FALLBACK && Number.isSafeInteger(parsed) && parsed > 0 && /^\d+$/.test(raw);
        } else {
          ok =
            PREDICATES[name]({
              code: proofs.code ?? text,
              line,
              onPersist: proofs.onPersist ?? "",
              frames: proofs.frames ?? [],
              candidate: proofs.candidate,
              events: proofs.events ?? [],
              batches: proofs.batches ?? [],
            }) === true;
        }
      } catch {
        ok = false; // a throwing predicate is a REJECTED, never an always-true `||`
      }
      if (!ok) {
        const entry = { file, line, predicate: name };
        if (name === "ttl_30d_not_collapsed") entry.correction = CORRECTION_TTL_30D;
        rejections.push(entry);
      }
    }
  }
  return {
    ok: rejections.length === 0,
    rejections,
    count: { evaluated, rejections: rejections.length },
  };
}

// Bounded target discovery (never a bare `git diff`).
export function discoverTargets(worktree, base) {
  if (!base) throw new Error("BASE is missing — provide the verified merge base");
  // Deleted paths are not readable targets: `git diff --name-only` lists them,
  // and main() reads every target with readFileSync. ACMR keeps added, copied,
  // modified and renamed files, drops deletions.
  const changed = execFileSync(
    "git",
    ["-C", worktree, "diff", "--diff-filter=ACMR", base, "--name-only"],
    { encoding: "utf8" }
  );
  const others = execFileSync(
    "git",
    ["-C", worktree, "ls-files", "--others", "--exclude-standard"],
    { encoding: "utf8" }
  );
  const all = [...changed.trim().split("\n"), ...others.trim().split("\n")].filter(Boolean);
  return [...new Set(all)].filter((f) => /\.(?:mjs|cjs|js|ts)$/i.test(f));
}

function main() {
  const worktree = process.env.WORKTREE || process.cwd();
  const base = process.env.BASE || "";
  if (!base) {
    console.error("REJECTED: BASE is missing — set BASE from the verified merge-base source");
    process.exit(2);
  }
  // The detector carries its own trigger words as data: exclude it from the
  // scan, otherwise it evaluates itself (reference noise).
  const targets = discoverTargets(worktree, base)
    .filter((f) => !f.endsWith("check-identity-bounds.mjs") && !f.includes("tests/unit/"))
    .slice(0, 1000)
    .map((file) => ({ file, text: fs.readFileSync(path.join(worktree, file), "utf8") }));
  const result = identity_bounds({ targets });
  console.log(
    `identity-bounds: ${result.count.evaluated} evaluated, ${result.count.rejections} REJECTED`
  );
  for (const r of result.rejections.slice(0, 50)) {
    console.log(`REJECTED ${r.predicate} ${r.file} : ${r.line.trim().slice(0, 160)}`);
    if (r.correction) console.log(`  ${r.correction}`);
  }
  if (!result.ok) process.exit(1);
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) main();
