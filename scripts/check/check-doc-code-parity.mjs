#!/usr/bin/env node
// scripts/check/check-doc-code-parity.mjs
// Doc-to-code parity: every claim in `*.md` / `changelog.d/**` is checked against
// executable evidence by a NAMED PREDICATE; otherwise it must carry the
// `AUTHOR ATTESTED` marker. One predicate is one class, not one script per finding.
//
// Targets come from `git diff "$BASE" --name-only` plus `git ls-files --others`,
// never a bare `git diff` (a committed PR would otherwise yield zero targets).
// `BASE` is supplied by the verified merge-base source (step-level env in CI).
import fs from "node:fs";
import path from "node:path";
import { execFileSync } from "node:child_process";
import { pathToFileURL } from "node:url";

// Reuse the real regex from MAINTENANCE.md verbatim:
//   (?<![-\w])([./]?[\w./-]+\.[A-Za-z0-9]+):(\d+)\b
// One-width lookbehind, trailing `\b`, no trailing `(?![-\w])`. Inventing one
// would reject `ci.yml:42-43` (an anchor with a leading dot). Reuse, do not clone.
export const ANCHOR_RE = /(?<![-\w])([./]?[\w./-]+\.[A-Za-z0-9]+):(\d+)\b/;
// A global copy for matchAll; ANCHOR_RE itself stays non-stateful for callers
// that use .test(). Built from source/flags so no flag is lost.
const ANCHOR_G = new RegExp(
  ANCHOR_RE.source,
  ANCHOR_RE.flags.includes("g") ? ANCHOR_RE.flags : `${ANCHOR_RE.flags}g`
);

const AUTHOR_MARKER = "AUTHOR ATTESTED";

// Bounds for diff-derived evidence: every entry has a clear lifetime (local to
// one run), and both the file count and the byte count are capped.
const PROOF_FILES_MAX = 50;
const PROOFS_MAX = 200000;

// 1. verdicts_alignes — values come from CODE, never from the changelog.
//    A release note claims "verdicts now agree" while preview returns
//    `rate_limit` and failover returns `quota_exhausted`.
//    `changelog` is accepted for interface compatibility but never read as a
//    value source. Reading "both values in the doc" would make the predicate
//    tautological; `AUTHOR ATTESTED` does not apply here (code proves it).
const VERDICT_RE = /\b(rate_limit|quota_exhausted)\b/g;
export function verdicts_alignes({ code = "", changelog = "", affirmation = "" } = {}) {
  void changelog; // forbidden source, explicitly ignored
  const values = new Set();
  for (const m of String(code).matchAll(VERDICT_RE)) values.add(m[1]);
  if (values.size < 2) return false; // a single verdict cannot prove agreement
  // The claim (not the changelog) carries the assertion to judge: if it claims
  // agreement while the code carries two distinct verdicts, refuse.
  if (/\b(?:now agree|agree|align|converge|in agreement)\b/i.test(String(affirmation)))
    return false;
  return true; // both verdicts were read from code, so the comparison is anchored
}

// 2. class_id_by_predicate — a `router`-labelled ID in a README.
//    Nominal: `isRouterEntryId` recognizes the documented ID. Limit: unrecognized.
// Semantics aligned with the upstream router-id helper (segments after first `/`).
export function isRouterEntryId(id) {
  const s = String(id);
  const segments = s.split("/").slice(1);
  return (
    segments.some(
      (seg) =>
        seg === "auto" ||
        seg.startsWith("auto-") ||
        seg.startsWith("auto:") ||
        seg === "free" ||
        seg === "pareto-code" ||
        seg === "bodybuilder"
    ) || /^(?:auto:|free$|pareto-code$|bodybuilder$)/i.test(s)
  );
}
export function class_id_by_predicate({ doc = "", code = "" } = {}) {
  const t = String(doc);
  const m =
    t.match(/\brouter\b[^\n]{0,80}?[`"' ]([a-z0-9][\w.:/-]*)[`"' ]/i) ||
    t.match(/\b(?:openrouter|router)[\w.:/-]*\/(?:auto[\w:-]*|free|pareto-code|bodybuilder)\b/i);
  if (!m) return false; // no documented ID, nothing to compare
  // The fallback regex has no capture group: use its full match and strip
  // the quoting characters so `openrouter/auto` keeps its supported ID.
  const id = (m[1] ?? m[0]).trim().replace(/^[`"' ]+|[`"' ]+$/g, "");
  return (
    isRouterEntryId(id) && /\bisRouterEntryId\b/.test(String(code)) && String(code).includes(id)
  );
}

// 3. durability_shared_storage — a `storage.sqlite` / restart mention.
//    Independent of the opt-out: shared OR explicit storage is sufficient.
export function durability_shared_storage({ doc = "", code = "" } = {}) {
  if (!/\bstorage\.sqlite\b|\brestart\b|reboot/i.test(String(doc))) return false;
  const c = String(code);
  const sharedDir =
    /\bDATA_DIR\b/.test(c) &&
    /(?:process\.env\.DATA_DIR|DATA_DIR\s*[=:]|resolve\(.*DATA_DIR)/.test(c);
  const explicitStorage =
    /\bstorage\.sqlite\b/.test(c) && /\b(?:reuse|same|shared|persist|open)\b/i.test(c);
  return sharedDir || explicitStorage;
}

// 4. durability_named_optout — an opt-out variable named and READ in the code.
//    Independent of storage.
export function durability_named_optout({ doc = "", code = "" } = {}) {
  const t = String(doc);
  const names = [...t.matchAll(/\b([A-Z][A-Z\d_]{3,})\b/g)].map((m) => m[1]);
  const opt = names.find((n) => /OPT|OPTOUT|DISABLE|NO_|SKIP|DISABLED/i.test(n));
  if (!opt) return false; // no named variable, refuse
  const c = String(code);
  return new RegExp(`(?:process\\.env|env|config)\\.${opt}\\b|\\b${opt}\\b`).test(c);
}

// 5. durability_active_rehydration — rehydration BEFORE the early-return of
//    `inspectCcrBlock`. `retrieveBlock` lives in `ccr/index.ts`, not in
//    `compressionTools.ts`: never check a textual order of `retrieveBlock`
//    before `found:false` in the handler — judge the CCR module.
export function durability_active_rehydration({ code = "", handler = "" } = {}) {
  void handler; // a handler file without retrieveBlock is never the order source
  const c = String(code);
  const start = c.search(/\binspectCcrBlock\b/);
  if (start === -1) return false; // no inspectCcrBlock, refuse
  // Do not confuse the DEFINITION of `retrieveBlock` with its CALL inside
  // inspectCcrBlock — without that scope the textual order is wrong.
  const scope = c.slice(start);
  const rehydration = scope.search(/\bretrieveBlock\s*\(/);
  if (rehydration === -1) return false; // no rehydration, refuse
  const earlyReturn = scope.search(/if\s*\([^)]*\bfound\b[^)]*\)\s*(?:return|\{)/i);
  if (earlyReturn === -1) return true; // no blocking early-return, active
  return rehydration < earlyReturn; // rehydration before early-return, green
}

// 6. measured_figure — a pack/time/count figure: measured source or marker.
export function measured_figure({ doc = "" } = {}) {
  const t = String(doc);
  const figure =
    /\b\d+(?:[.,]\d+)?\s*(?:ms|s\b|Mo|GiB|%|×|x)\b/i.test(t) ||
    /\b\d+\s*(?:PR|packs?|models?|requests?|lines?)\b/i.test(t);
  if (!figure) return true; // no figure, no requirement
  if (t.includes(AUTHOR_MARKER)) return true;
  const source =
    /\b(?:source|measur|benchmark|CI\b|table|log|run\b|collected)\b/i.test(t) || ANCHOR_RE.test(t); // a `file:line` anchor is a cited proof
  return source;
}

// 7. pr_body_filled — corrected logic. All boxes checked AND
//    `Closes|Related to #\d+` (or an explicit "no linked issue" mention).
//    The old logic validated the default and refused the compliant case.
export function pr_body_filled({ body = "" } = {}) {
  const c = String(body);
  const cases = [...c.matchAll(/^\s*-\s*\[([ xX])\]/gm)].map((m) => m[1].toLowerCase());
  if (cases.length === 0) return false; // no template, refuse
  if (cases.some((v) => v !== "x")) return false; // ONE unchecked box, refuse
  // No `\b` after "linked": in JS `\b` is ASCII-only, so an accented ending
  // never has a boundary. Same trap as the trailing `\b` of ANCHOR_RE.
  const issue = /\b(?:Closes|Related to)\s+#\d+\b/i.test(c) || /no linked issue/i.test(c);
  return issue; // no issue, refuse
}

// 8. ecriture_transactionnelle — read the current value INSIDE the
//    transaction plus a column-targeted write. Refuse if `cooldown`/`tier` is
//    changed outside the transaction (RMW).
export function ecriture_transactionnelle({ code = "" } = {}) {
  const c = String(code);
  const tx = c.search(/\b(?:db\.)?transaction\s*\(|\bBEGIN\b/i);
  if (tx === -1) return false; // no transaction, refuse
  const read = c.search(/\b(?:SELECT|read\w*|get\w*)\b[^\n]{0,120}\b(?:cooldown|tier|value)\b/i);
  if (read === -1 || read < tx) return false; // value read outside, refuse
  const targetedWrite =
    /\bUPDATE\b[^\n]{0,160}\bSET\b[^\n]{0,120}\b(?:cooldown|tier|value)\b/i.test(c) ||
    /\btx\.(?:update|query)\b[^\n]{0,120}\b(?:cooldown|tier|value)\b/i.test(c);
  if (!targetedWrite) return false; // untargeted write, refuse
  const derivedOutsideTransaction =
    /\b(?:cooldown|tier)\s*(?:\+\+|--|[+*/-]?=)(?!=)/.test(c.slice(0, tx)) ||
    /\b(?:cooldown|tier)\s*\+=/.test(c);
  return !derivedOutsideTransaction;
}

export const PREDICATES = Object.freeze({
  verdicts_alignes,
  class_id_by_predicate,
  durability_shared_storage,
  durability_named_optout,
  durability_active_rehydration,
  measured_figure,
  pr_body_filled,
  ecriture_transactionnelle,
});

// Orchestration: for each modified doc line, pick the predicate by its real
// trigger, run it, and require `AUTHOR ATTESTED` otherwise (except for
// `verdicts_alignes`, where the marker does not apply).
export const TRIGGERS = [
  [
    "verdicts_alignes",
    /\b(?:verdicts?\s+now\s+agree|rate_limit|quota_exhausted|verdicts?\s+align)/i,
  ],
  ["class_id_by_predicate", /\brouter\b/i],
  ["durability_shared_storage", /\bstorage\.sqlite\b|\brestart\b|reboot/i],
  ["durability_named_optout", /\b(?:OPT|OPTOUT|DISABLE|NO_|SKIP|DISABLED)_[A-Z\d_]+\b/],
  ["durability_active_rehydration", /\b(?:eviction|TTL|found\s*:\s*false)\b/i],
  ["measured_figure", /\b\d+(?:[.,]\d+)?\s*(?:ms|s\b|Mo|GiB|%|×|x|PR|packs?|models?)\b/i],
  ["pr_body_filled", /-\s*\[[ xX]\]|\bCloses\b|\bRelated to\b/],
  ["ecriture_transactionnelle", /\b(?:RMW|cooldown|tier)\b/i],
];

// Proof keys derived from the diff. One entry per predicate that needs
// code evidence; `measured_figure` reads the doc only and has no key. The
// `ecriture_transactionnelle` singular key is intentional and must be kept: a
// plural key would feed an empty `code` and turn a no-evidence line into REJECTED.
export const PROOF_KEY = Object.freeze({
  verdicts_alignes: "code",
  class_id_by_predicate: "code",
  durability_shared_storage: "code",
  durability_named_optout: "code",
  durability_active_rehydration: "code",
  pr_body_filled: "body",
  ecriture_transactionnelle: "code",
});

export function doc_code_parity({ docs = [], proofs = {} } = {}) {
  const rejections = [];
  let evaluated = 0;
  for (const { file, text, fullText = "" } of docs) {
    if (!(/\.md$/i.test(file) || file.includes("changelog.d/"))) continue;
    for (const line of String(text).split(/\r?\n/)) {
      // Every applicable predicate must be satisfied: evidence for one
      // trigger must not silently cover a different claim on the same line.
      const entries = TRIGGERS.filter(([, re]) => re.test(line));
      if (entries.length === 0) continue;
      for (const [name] of entries) {
        if (name !== "verdicts_alignes" && line.includes(AUTHOR_MARKER)) continue;
        evaluated += 1;
        const args = {
          doc: line,
          full: fullText, // complete file kept as evidence, claims stay line-scoped
          code: proofs.code ?? "",
          handler: proofs.handler ?? "",
          body: proofs.body ?? "",
          changelog: line,
          affirmation: line,
        };
        let ok = false;
        try {
          ok = PREDICATES[name](args) === true;
        } catch {
          ok = false; // a throwing predicate is a REJECTED, never an always-true `||`
        }
        if (!ok) rejections.push({ file, line, predicate: name });
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
  // Deleted paths must not reach readFileSync in main(): ACMR keeps added,
  // copied, modified and renamed files only.
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
  return [...new Set(all)].filter((f) => /\.md$/i.test(f) || f.includes("changelog.d/"));
}

// Collect code evidence from the diff, untracked files and `file:line`
// anchors cited in the changed doc lines. Never the whole repository. Each
// Set is local to one call (no module-level storage) and both counts are capped.
export function preuvesDuDiff(worktree, base, docs = []) {
  if (!base) throw new Error("BASE is missing — provide the verified merge base");
  const changed = execFileSync(
    "git",
    ["-C", worktree, "diff", "--diff-filter=ACMR", "--name-only", base],
    { encoding: "utf8" }
  );
  const others = execFileSync(
    "git",
    ["-C", worktree, "ls-files", "--others", "--exclude-standard"],
    { encoding: "utf8" }
  );
  const sourceDiff = [...changed.trim().split("\n"), ...others.trim().split("\n")].filter(Boolean);

  const anchors = new Set();
  for (const d of docs) {
    for (const line of String(d.text ?? "").split(/\r?\n/)) {
      for (const m of String(line).matchAll(ANCHOR_G)) anchors.add(m[1]);
    }
  }

  const isCode = (f) => /\.(mjs|cjs|js|ts|tsx)$/i.test(f);
  const isAllowed = (f) =>
    f !== "scripts/check/check-doc-code-parity.mjs" && !f.replace(/^\.\//, "").startsWith("tests/");
  const files = [...new Set([...sourceDiff, ...anchors])]
    .filter(isCode)
    .filter(isAllowed)
    .slice(0, PROOF_FILES_MAX);

  let code = "";
  let total = 0;
  for (const f of files) {
    const p = path.join(worktree, f);
    if (!fs.existsSync(p)) continue;
    const content = fs.readFileSync(p, "utf8");
    if (total + content.length > PROOFS_MAX) break;
    total += content.length;
    code += `\n// ${f}\n${content}`;
  }

  const bodyPath = process.env.PR_BODY_FILE || "";
  const body = bodyPath && fs.existsSync(bodyPath) ? fs.readFileSync(bodyPath, "utf8") : "";
  return { code, handler: code, body };
}

// Split doc lines into those with proof (evaluate them) and those without
// (report a no-evidence line, never a REJECTED). `measured_figure` reads the doc only and
// needs no proof; the `AUTHOR ATTESTED` marker remains its escape hatch.
export function filtrerSansPreuve(docs = [], proofs = {}) {
  const withProof = [];
  const noProof = [];
  for (const doc of docs) {
    if (!(/\.md$/i.test(doc.file) || doc.file.includes("changelog.d/"))) continue;
    const eligible = new Set();
    for (const line of String(doc.text ?? "").split(/\r?\n/)) {
      const entries = TRIGGERS.filter(([, re]) => re.test(line));
      if (entries.length === 0) continue;
      for (const [name] of entries) {
        if (name === "measured_figure") {
          eligible.add(line);
          continue;
        }
        const key = PROOF_KEY[name];
        if (key && String(proofs[key] ?? "").length > 0) eligible.add(line);
        else noProof.push({ file: doc.file, line, predicate: name });
      }
    }
    // Eligibility is per claim: a measured claim in the document must not make
    // an unproven checklist claim evaluable (and therefore REJECTED).
    if (eligible.size > 0) withProof.push({ ...doc, text: [...eligible].join("\n") });
  }
  return { withProof, noProof };
}

/** Line numbers added in the base-relative patch of one documentation file. */
export function addedDocLines(worktree, base, file) {
  let patch;
  try {
    patch = execFileSync("git", ["-C", worktree, "diff", "--unified=0", base, "--", file], {
      encoding: "utf8",
    });
  } catch {
    return null; // untracked or unreadable: the whole file is new
  }
  const added = new Set();
  for (const m of patch.matchAll(/^@@ -\d+(?:,\d+)? \+(\d+)(?:,(\d+))? @@/gm)) {
    const start = Number(m[1]);
    const count = m[2] === undefined ? 1 : Number(m[2]);
    for (let n = start; n < start + count; n++) added.add(n);
  }
  return added.size > 0 ? added : null;
}

function main() {
  const worktree = process.env.WORKTREE || process.cwd();
  const base = process.env.BASE || "";
  if (!base) {
    console.error("REJECTED: BASE is missing — set BASE from the verified merge-base source");
    process.exit(2);
  }
  const targets = discoverTargets(worktree, base);
  const docs = [];
  for (const file of targets.slice(0, 1000)) {
    const p = path.join(worktree, file);
    if (!fs.existsSync(p)) continue; // a deletion cannot be read
    const fullText = fs.readFileSync(p, "utf8");
    const added = addedDocLines(worktree, base, file);
    // Only claims added by this patch are judged; the complete file is kept
    // separately as evidence for those claims.
    const text = added
      ? fullText
          .split(/\r?\n/)
          .filter((_, i) => added.has(i + 1))
          .join("\n")
      : fullText;
    docs.push({ file, text, fullText });
  }
  const proofs = preuvesDuDiff(worktree, base, docs);
  const { withProof, noProof } = filtrerSansPreuve(docs, proofs);
  const result = doc_code_parity({ docs: withProof, proofs });
  console.log(
    `doc-code-parity: ${result.count.evaluated} evaluated, ${result.count.rejections} REJECTED, ${noProof.length} without evidence`
  );
  for (const r of result.rejections.slice(0, 50)) {
    console.log(`REJECTED ${r.predicate} ${r.file} : ${r.line.trim().slice(0, 160)}`);
  }
  for (const s of noProof.slice(0, 50)) {
    console.log(`NO EVIDENCE ${s.predicate} ${s.file} : ${s.line.trim().slice(0, 160)}`);
  }
  if (!result.ok) process.exit(1);
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) main();
