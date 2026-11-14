#!/usr/bin/env node
// scripts/release/refresh-derived.mjs
//
// ONE entry point that recalculates everything derived from the code — provider reference, the
// facts snapshot, every managed number in the docs (and their docs/i18n mirrors), the README
// diagrams, the generated agent skills, the UI/CLI locale keys and the llm.txt mirrors.
//
// Plan "derived numbers and texts resolved only at release" (2026-11-13): a feature PR never
// writes a value that depends on the state of the base. This script is the only writer, run by
// the release (/generate-release phase 0a) and by the nightly derived-refresh PR. Between two
// runs the base carries stale numbers BY DESIGN; the strict comparison lives here (`--check`)
// and in the counts gate's `release` mode, never in a PR check.
//
//   npm run release:refresh-derived [-- --check] [--profile=release|nightly] [--only=a,b]
//                                   [--with-changelog] [--json]
//
// Steps, in order (ids for --only):
//   changelog          changelog.d/ → CHANGELOG.md. OPT-IN (--with-changelog, release profile
//                      only): the release's canonical path is `npm run release:reconcile` in
//                      /generate-release phase 0a, which credits authors and anchors the version
//                      section; running both would aggregate twice. Without the flag this step
//                      is skipped and --check never looks at changelog.d/.
//   provider-reference docs/reference/PROVIDER_REFERENCE.md (gen-provider-reference.ts, run in a
//                      scratch tree; the "generated on" date alone never counts as a change)
//   facts              collect the facts, write docs/reference/derived-facts.json
//   numbers            the counts gate's planDerivedRewrites() applied to the source files, then
//                      carried to docs/i18n mirrors (scripts/release/lib/derived-mirrors.mjs)
//   readme-diagrams    every docs/diagrams/*.svg generator, rendered from the new facts
//   skills             skills/*/SKILL.md (scripts/skills/generate-agent-skills.mjs)
//   ui-keys            missing UI + CLI locale keys (scripts/i18n/sync-ui-keys.mjs)
//   llm-mirrors        docs/i18n/*/llm.txt copies of llm.txt (scripts/i18n/sync-llm-mirrors.mjs)
//
// --check writes nothing: every step computes its result against an in-memory overlay, so a
// later step sees what an earlier one would have written. --profile=nightly never touches the
// changelog nor any version claim (version prose is a release decision).
//
// After a version bump (the cycle cut) run this script again: the snapshot's `version` field
// stays at the previous version until then. No generator and no PR-time check reads that field,
// so a stale value only shows up as a `--check` difference.
//
// Exit codes: 0 done / nothing to refresh · 1 (--check) something would change, or a managed
// value needs a manual edit · 2 infrastructure (facts could not be collected, a generator
// crashed, the gate exposes no planDerivedRewrites) or a usage error.

import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { spawnSync } from "node:child_process";
import { fileURLToPath, pathToFileURL } from "node:url";
import { FACTS_SNAPSHOT_PATH, collectFacts, parseProviderTotal, serializeFacts } from "./facts.mjs";
import {
  SEMVER_RE,
  mirrorsOf,
  propagateChangesToMirror,
  refreshI18nStateEntry,
  refreshI18nTargetHash,
} from "./lib/derived-mirrors.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..", "..");

export const STEP_IDS = [
  "changelog",
  "provider-reference",
  "facts",
  "numbers",
  "readme-diagrams",
  "skills",
  "e2e-timings",
  "ui-keys",
  "llm-mirrors",
];
export const PROFILES = ["release", "nightly"];
const PROVIDER_REFERENCE = "docs/reference/PROVIDER_REFERENCE.md";
const I18N_STATE = ".i18n-state.json";
const UI_CATALOG_DIRS = { ui: "src/i18n/messages", cli: "bin/cli/locales" };
const DEFAULT_STEP_TIMEOUT_MS = 900000;

const HELP = `Usage: npm run release:refresh-derived [-- options]

  --check              report what would change; write nothing (exit 1 if anything would)
  --profile=<p>        release (default) | nightly — nightly never touches the changelog
                       nor version claims
  --only=<ids>         run only these steps (comma-separated): ${STEP_IDS.join(", ")}
  --rewritten-since=<ref>
                       UI keys whose English value changed since <ref> go back to translation
                       (default origin/main — the last shipped release; skipped if unresolvable)
  --with-changelog     also aggregate changelog.d/ into CHANGELOG.md (release profile only).
                       At release the canonical path stays \`npm run release:reconcile\`
                       (/generate-release phase 0a); do not run both.
  --json               print the result as JSON
  -h, --help           this text

Version bump / cycle cut: run \`npm run release:refresh-derived\` right AFTER the bump. Until
then docs/reference/derived-facts.json keeps the previous "version"; nothing reads that field
to render or to pass a PR check, so the only effect is that --check reports the snapshot (and
the version prose) as stale.

Exit: 0 ok · 1 --check found changes or manual items · 2 infrastructure or usage error.
Step timeout: OMNIROUTE_REFRESH_STEP_TIMEOUT_MS (default ${DEFAULT_STEP_TIMEOUT_MS}).
Facts timeout: OMNIROUTE_FACTS_TIMEOUT_MS (default 600000).`;

/** PURE. Parses CLI flags; `error` is a usage message. */
export function parseRefreshArgs(argv) {
  const opts = {
    check: false,
    profile: "release",
    only: null,
    json: false,
    withChangelog: false,
    rewrittenSince: "origin/main",
    help: false,
    error: null,
  };
  for (const a of argv) {
    if (a === "--check") opts.check = true;
    else if (a === "--json") opts.json = true;
    else if (a === "--with-changelog") opts.withChangelog = true;
    else if (a === "-h" || a === "--help") opts.help = true;
    else if (a.startsWith("--profile=")) opts.profile = a.slice("--profile=".length);
    else if (a.startsWith("--rewritten-since="))
      opts.rewrittenSince = a.slice("--rewritten-since=".length) || null;
    else if (a.startsWith("--only="))
      opts.only = a
        .slice("--only=".length)
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean);
    else opts.error = `unknown option ${a}`;
  }
  if (!opts.error && !PROFILES.includes(opts.profile))
    opts.error = `--profile must be one of ${PROFILES.join(", ")}`;
  if (!opts.error && opts.only) {
    const bad = opts.only.filter((id) => !STEP_IDS.includes(id));
    if (bad.length) opts.error = `unknown step(s) in --only: ${bad.join(", ")}`;
  }
  if (!opts.error && opts.withChangelog && opts.profile !== "release")
    opts.error = "--with-changelog is only accepted with --profile=release";
  return opts;
}

// --- Overlay file system -------------------------------------------------------------------
// Every step reads and writes through it. In --check the writes stay in memory; otherwise they
// also reach the disk. `changedFiles` compares the final content with what was on disk first.
function createVfs(root, check) {
  const overlay = new Map();
  const original = new Map();
  const readDisk = (rel) => {
    const abs = path.join(root, rel);
    return fs.existsSync(abs) ? fs.readFileSync(abs, "utf8") : null;
  };
  return {
    root,
    check,
    read(rel) {
      return overlay.has(rel) ? overlay.get(rel) : readDisk(rel);
    },
    write(rel, content) {
      if (!original.has(rel)) original.set(rel, readDisk(rel));
      if (this.read(rel) === content) return false;
      overlay.set(rel, content);
      if (!check) {
        const abs = path.join(root, rel);
        fs.mkdirSync(path.dirname(abs), { recursive: true });
        fs.writeFileSync(abs, content);
      }
      return true;
    },
    /** Record a change some tool made on disk itself (apply mode only). */
    noteExternal(rel, before) {
      if (!original.has(rel)) original.set(rel, before);
      overlay.delete(rel);
    },
    changedFiles() {
      const out = [];
      for (const [rel, before] of original) {
        const now = overlay.has(rel) ? overlay.get(rel) : readDisk(rel);
        if (now !== before) out.push(rel);
      }
      return out.sort();
    },
  };
}

// --- Child processes -----------------------------------------------------------------------
// Every child gets a throwaway DATA_DIR: generators import app modules that open the database
// on import, and none of them may reach the operator's real ~/.omniroute/storage.sqlite.
function stepTimeout(env = process.env) {
  const n = Number(env.OMNIROUTE_REFRESH_STEP_TIMEOUT_MS);
  return Number.isFinite(n) && n > 0 ? Math.floor(n) : DEFAULT_STEP_TIMEOUT_MS;
}

function runNode(args, { cwd, env = {}, timeout = stepTimeout() }) {
  const dataDir = fs.mkdtempSync(path.join(os.tmpdir(), "refresh-derived-data-"));
  try {
    const r = spawnSync(process.execPath, args, {
      cwd,
      encoding: "utf8",
      timeout,
      killSignal: "SIGKILL",
      maxBuffer: 256 * 1024 * 1024,
      env: { ...process.env, DATA_DIR: dataDir, APP_LOG_LEVEL: "silent", ...env },
    });
    const failure = r.error
      ? `${r.error.code === "ETIMEDOUT" ? `timed out after ${timeout} ms` : r.error.message}`
      : r.signal
        ? `killed by ${r.signal} (timeout ${timeout} ms)`
        : null;
    return { status: r.status, stdout: r.stdout || "", stderr: r.stderr || "", failure };
  } finally {
    fs.rmSync(dataDir, { recursive: true, force: true });
  }
}

const tailOf = (text, n = 600) => {
  const t = String(text || "").trim();
  return t.length > n ? "…" + t.slice(-n) : t;
};

class StepFailure extends Error {}

function scratchDir(prefix) {
  return fs.mkdtempSync(path.join(os.tmpdir(), prefix));
}

// --- Steps ---------------------------------------------------------------------------------

async function stepChangelog(ctx) {
  if (!ctx.withChangelog)
    return {
      status: "skipped",
      detail:
        "opt-in (--with-changelog); at release the canonical path is `npm run release:reconcile` " +
        "in /generate-release phase 0a",
    };
  const { aggregate } = await import(
    pathToFileURL(path.join(ROOT, "scripts", "release", "aggregate-changelog.mjs")).href
  );
  const r = aggregate({ root: ctx.root, dryRun: true });
  if (!r.changed) return { status: "clean", detail: "no changelog.d/ fragments" };
  const fragments = Object.values(r.collected)
    .filter(Array.isArray)
    .flat()
    .map((f) => f.file)
    .filter(Boolean);
  if (ctx.check) {
    ctx.vfs.write("CHANGELOG.md", r.after);
    ctx.extraChanged.push(...fragments);
  } else {
    const before = ctx.vfs.read("CHANGELOG.md");
    aggregate({ root: ctx.root, dryRun: false });
    ctx.vfs.noteExternal("CHANGELOG.md", before);
    ctx.extraChanged.push(...fragments);
  }
  return { status: "changed", detail: `${r.total} fragment(s) → CHANGELOG.md` };
}

// The generator writes next to its own location and stamps today's date, so it runs in a
// scratch tree (its script + package.json/tsconfig copies, src/open-sse/node_modules linked).
const DATE_LINE = /^(?:lastUpdated: .*|> \*\*Last generated:\*\* .*)$/gm;
export const normalizeProviderReference = (text) => String(text ?? "").replace(DATE_LINE, "");

async function stepProviderReference(ctx) {
  const tmp = scratchDir("refresh-provref-");
  try {
    fs.mkdirSync(path.join(tmp, "scripts", "docs"), { recursive: true });
    fs.mkdirSync(path.join(tmp, "docs", "reference"), { recursive: true });
    fs.copyFileSync(
      path.join(ctx.root, "scripts", "docs", "gen-provider-reference.ts"),
      path.join(tmp, "scripts", "docs", "gen-provider-reference.ts")
    );
    fs.writeFileSync(path.join(tmp, "package.json"), ctx.vfs.read("package.json") ?? "{}");
    fs.copyFileSync(path.join(ctx.root, "tsconfig.json"), path.join(tmp, "tsconfig.json"));
    for (const d of ["src", "open-sse", "node_modules"])
      fs.symlinkSync(path.join(ctx.root, d), path.join(tmp, d), "dir");
    const r = runNode(["--import", "tsx/esm", "scripts/docs/gen-provider-reference.ts"], {
      cwd: tmp,
    });
    if (r.failure || r.status !== 0)
      throw new StepFailure(
        `gen-provider-reference failed (${r.failure || `exit ${r.status}`}): ${tailOf(r.stderr)}`
      );
    const generated = fs.readFileSync(path.join(tmp, PROVIDER_REFERENCE), "utf8");
    const current = ctx.vfs.read(PROVIDER_REFERENCE);
    if (normalizeProviderReference(generated) === normalizeProviderReference(current))
      return { status: "clean", detail: "up to date (generation date ignored)" };
    ctx.vfs.write(PROVIDER_REFERENCE, generated);
    return {
      status: "changed",
      detail: `regenerated — Total providers: ${parseProviderTotal(generated)}`,
    };
  } finally {
    fs.rmSync(tmp, { recursive: true, force: true });
  }
}

function ensureFacts(ctx) {
  if (ctx.facts) return ctx.facts;
  if (ctx.factsError) return null;
  const r = ctx.collect({ root: ctx.root });
  if (r.error) {
    ctx.factsError = r.error;
    return null;
  }
  const facts = { ...r.facts };
  // In --check the regenerated reference only exists in the overlay.
  const total = parseProviderTotal(ctx.vfs.read(PROVIDER_REFERENCE));
  if (total) facts.providerReferenceTotal = total;
  ctx.facts = facts;
  return facts;
}

function requireFacts(ctx) {
  const facts = ensureFacts(ctx);
  if (!facts) throw new StepFailure(ctx.factsError?.detail || "facts unavailable");
  return facts;
}

async function stepFacts(ctx) {
  const facts = requireFacts(ctx);
  const changed = ctx.vfs.write(FACTS_SNAPSHOT_PATH, serializeFacts(facts));
  return {
    status: changed ? "changed" : "clean",
    detail: changed ? `${FACTS_SNAPSHOT_PATH} rewritten` : `${FACTS_SNAPSHOT_PATH} up to date`,
  };
}

async function loadPlanner(ctx) {
  if (ctx.planDerivedRewrites) return ctx.planDerivedRewrites;
  const gate = await import(
    pathToFileURL(path.join(ROOT, "scripts", "check", "check-docs-counts-sync.mjs")).href
  );
  if (typeof gate.planDerivedRewrites !== "function")
    throw new StepFailure(
      "scripts/check/check-docs-counts-sync.mjs exports no planDerivedRewrites()"
    );
  return gate.planDerivedRewrites;
}

const isVersionChange = (c) =>
  SEMVER_RE.test(String(c.from)) || SEMVER_RE.test(String(c.to)) || /version/i.test(c.label || "");

/** PURE. Re-applies a subset of a plan's changes to `before` by their recorded index. */
export function applyChanges(before, changes) {
  let out = before;
  for (const c of [...changes].sort((a, b) => b.index - a.index)) {
    const from = String(c.from);
    if (out.slice(c.index, c.index + from.length) !== from) return null;
    out = out.slice(0, c.index) + String(c.to) + out.slice(c.index + from.length);
  }
  return out;
}

async function stepNumbers(ctx) {
  const facts = requireFacts(ctx);
  const plan = await loadPlanner(ctx);
  const result = plan({ facts, readFile: (rel) => ctx.vfs.read(rel) });
  const files = Array.isArray(result?.files) ? result.files : [];
  for (const m of result?.manual ?? []) ctx.manual.push({ ...m });

  const stateText = ctx.vfs.read(I18N_STATE);
  let state = null;
  try {
    state = stateText ? JSON.parse(stateText) : null;
  } catch {
    ctx.manual.push({
      path: I18N_STATE,
      label: "i18n state",
      detail: "not valid JSON — untouched",
    });
  }
  let stateChanged = false;
  const now = new Date().toISOString();
  let rewritten = 0;
  let mirrorsRewritten = 0;

  // The plan lists files in check order, so a mirror the plan rewrites itself (the README
  // mirrors' "translated database row") can come BEFORE its source. Applying it first would leave
  // the relay below with nothing to carry and the state refresh with a stale target hash.
  // Sources go first; a mirror the plan rewrites is applied together with its source and counts
  // as a touched mirror with its final content; plan-only mirrors (no source change) go last.
  const isMirrorPath = (rel) => rel.startsWith("docs/i18n/");
  const mirrorParts = (rel) => {
    const m = /^docs\/i18n\/([^/]+)\/(.+)$/.exec(rel);
    return m ? { locale: m[1], source: m[2] } : null;
  };
  const planMirrors = new Map(); // `${source}\0${locale}` → plan file
  for (const file of files) {
    const parts = isMirrorPath(file.path) ? mirrorParts(file.path) : null;
    if (parts) planMirrors.set(`${parts.source}\0${parts.locale}`, file);
  }
  const manualPaths = new Set(ctx.manual.map((m) => m.path));
  const consumedMirrors = new Set();

  // Applies one plan file (honouring the nightly profile); returns the new content, or null when
  // the file was not applied (reported as manual).
  const applyPlanFile = (file) => {
    const current = ctx.vfs.read(file.path);
    if (current !== file.before) {
      ctx.manual.push({
        path: file.path,
        label: "numbers",
        detail: "plan was computed on different content than the tree holds — not applied",
      });
      return null;
    }
    let changes = Array.isArray(file.changes) ? file.changes : [];
    let after = file.after;
    if (ctx.profile === "nightly") {
      const versionChanges = changes.filter(isVersionChange);
      if (versionChanges.length) {
        for (const c of versionChanges)
          ctx.manual.push({
            path: file.path,
            label: c.label,
            detail: `version claim ${c.from} → ${c.to} is release-only (nightly profile)`,
          });
        changes = changes.filter((c) => !isVersionChange(c));
        const replayAll = applyChanges(file.before, file.changes);
        after = replayAll === file.after ? applyChanges(file.before, changes) : null;
        if (after === null) {
          ctx.manual.push({
            path: file.path,
            label: "numbers",
            detail: "could not separate version claims from the other changes — not applied",
          });
          return null;
        }
      }
    }
    return { after, changes, partial: changes.length !== (file.changes ?? []).length };
  };

  for (const file of files.filter((f) => !isMirrorPath(f.path))) {
    const applied = applyPlanFile(file);
    if (!applied || applied.after === file.before) continue;
    const { after, changes } = applied;
    ctx.vfs.write(file.path, after);
    rewritten++;

    const touchedMirrors = [];
    for (const m of mirrorsOf(ctx.root, file.path)) {
      // The plan may have rewritten this mirror itself, with the same claim extractors as the
      // source (the README mirrors' database row): apply that first, then carry the source's
      // remaining changes, counting the plan's own rewrites as already carried.
      const planned = planMirrors.get(`${file.path}\0${m.locale}`);
      let alreadyApplied = [];
      let planPartial = false;
      if (planned) {
        consumedMirrors.add(planned.path);
        const r = applyPlanFile(planned);
        if (r) {
          if (r.after !== planned.before) ctx.vfs.write(planned.path, r.after);
          alreadyApplied = r.changes;
          planPartial = r.partial || manualPaths.has(planned.path);
        } else {
          planPartial = true;
        }
      }
      const mirrorText = ctx.vfs.read(m.rel);
      if (mirrorText == null) continue;
      const original = planned ? planned.before : mirrorText;
      const r = propagateChangesToMirror({
        sourceBefore: file.before,
        changes,
        mirrorText,
        alreadyApplied,
      });
      for (const x of r.manual) ctx.manual.push({ path: m.rel, label: x.label, detail: x.detail });
      if (r.content !== mirrorText) ctx.vfs.write(m.rel, r.content);
      if (r.content !== original) mirrorsRewritten++;
      // Certified as in sync only when EVERY change reached the mirror: a partial carry would
      // record the new source hash next to a mirror that still states an old value.
      if (r.content !== original && r.manual.length === 0 && !planPartial) {
        touchedMirrors.push({ locale: m.locale, content: r.content });
      }
    }
    if (state) {
      const outcome = refreshI18nStateEntry(state, file.path, {
        sourceBefore: file.before,
        sourceAfter: after,
        mirrors: touchedMirrors,
        now,
      });
      if (outcome === "refreshed") stateChanged = true;
    }
  }

  // Mirrors the plan rewrote whose source needed no change: the translation still corresponds to
  // the same source, so a locale that was in sync only gets its new target hash.
  for (const file of files.filter((f) => isMirrorPath(f.path) && !consumedMirrors.has(f.path))) {
    const applied = applyPlanFile(file);
    if (!applied || applied.after === file.before) continue;
    ctx.vfs.write(file.path, applied.after);
    mirrorsRewritten++;
    const parts = mirrorParts(file.path);
    if (state && parts && !applied.partial && !manualPaths.has(file.path)) {
      if (refreshI18nTargetHash(state, parts.source, parts.locale, applied.after, now)) {
        stateChanged = true;
      }
    }
  }
  if (stateChanged) ctx.vfs.write(I18N_STATE, JSON.stringify(state, null, 2) + "\n");
  if (!rewritten) return { status: "clean", detail: "every managed number matches the facts" };
  return {
    status: "changed",
    detail: `${rewritten} source file(s), ${mirrorsRewritten} docs/i18n mirror(s) rewritten`,
  };
}

async function stepReadmeDiagrams(ctx) {
  const facts = requireFacts(ctx);
  const tmp = scratchDir("refresh-diagrams-");
  try {
    const factsFile = path.join(tmp, "facts.json");
    fs.writeFileSync(factsFile, serializeFacts(facts));
    const outDir = path.join(tmp, "out");
    const r = runNode(
      [
        "--import",
        "tsx/esm",
        path.join(ROOT, "scripts", "release", "lib", "render-readme-diagrams.mjs"),
        "--out-dir",
        outDir,
      ],
      { cwd: ctx.root, env: { OMNIROUTE_DERIVED_FACTS_PATH: factsFile } }
    );
    const line = r.stdout.split("\n").find((l) => l.startsWith("@@"));
    if (r.failure || r.status !== 0 || !line)
      throw new StepFailure(
        `README diagram rendering failed (${r.failure || `exit ${r.status}`}): ${tailOf(r.stderr)}`
      );
    const outs = JSON.parse(line.slice(2));
    const changed = [];
    for (const rel of outs) {
      if (ctx.vfs.write(rel, fs.readFileSync(path.join(outDir, rel), "utf8"))) changed.push(rel);
    }
    return changed.length
      ? { status: "changed", detail: `${changed.length}/${outs.length} diagram(s) regenerated` }
      : { status: "clean", detail: `${outs.length} diagram(s) up to date` };
  } finally {
    fs.rmSync(tmp, { recursive: true, force: true });
  }
}

function parseJsonReport(stdout) {
  const start = stdout.indexOf("{");
  if (start === -1) return null;
  try {
    return JSON.parse(stdout.slice(start));
  } catch {
    return null;
  }
}

async function stepSkills(ctx) {
  const script = path.join("scripts", "skills", "generate-agent-skills.mjs");
  const dry = runNode(["--import", "tsx/esm", script, "--json"], { cwd: ctx.root });
  if (dry.failure || (dry.status !== 0 && dry.status !== 2))
    throw new StepFailure(
      `generate-agent-skills failed (${dry.failure || `exit ${dry.status}`}): ${tailOf(dry.stderr || dry.stdout)}`
    );
  const report = parseJsonReport(dry.stdout);
  const ids = Array.isArray(report?.generated) ? report.generated : [];
  if (dry.status === 0) return { status: "clean", detail: "every generated SKILL.md is current" };
  const files = ids.map((id) => `skills/${id}/SKILL.md`);
  if (!ctx.check) {
    const before = new Map(files.map((f) => [f, ctx.vfs.read(f)]));
    const r = runNode(["--import", "tsx/esm", script, "--apply"], { cwd: ctx.root });
    if (r.failure || r.status !== 0)
      throw new StepFailure(
        `generate-agent-skills --apply failed (${r.failure || `exit ${r.status}`}): ${tailOf(r.stderr)}`
      );
    for (const [f, b] of before) ctx.vfs.noteExternal(f, b);
  } else {
    ctx.extraChanged.push(...files);
  }
  return {
    status: "changed",
    detail: `${ids.length || "some"} SKILL.md file(s) ${ctx.check ? "would be " : ""}regenerated${ids.length ? `: ${ids.join(", ")}` : ""}`,
  };
}

const sourceExports = (absFile, name) => {
  if (!fs.existsSync(absFile)) return false;
  const src = fs.readFileSync(absFile, "utf8");
  return new RegExp(
    `export\\s+(?:async\\s+)?function\\s+${name}\\b|export\\s+const\\s+${name}\\b|export\\s*\\{[^}]*\\b${name}\\b`
  ).test(src);
};
const supportsFlag = (absFile, flag) =>
  fs.existsSync(absFile) && fs.readFileSync(absFile, "utf8").includes(`"${flag}"`);

function snapshotDir(root, rel) {
  const abs = path.join(root, rel);
  const out = new Map();
  if (!fs.existsSync(abs)) return out;
  for (const f of fs
    .readdirSync(abs)
    .filter((x) => x.endsWith(".json"))
    .sort())
    out.set(path.posix.join(rel, f), fs.readFileSync(path.join(abs, f), "utf8"));
  return out;
}

/** `ref` when it resolves to a commit in `root`, else null. */
function resolvableRef(root, ref) {
  if (!ref) return null;
  const r = spawnSync("git", ["rev-parse", "--verify", "--quiet", `${ref}^{commit}`], {
    cwd: root,
    stdio: "ignore",
  });
  return r.status === 0 ? ref : null;
}

const translationBackendConfigured = () =>
  Object.entries(process.env).some(([k, v]) => k.startsWith("OMNIROUTE_TRANSLATION_") && v);

// Phase 5 (generated files and baselines): the e2e shard timings are refreshed here when the
// tree ships `syncE2eTimings`; until then the step is skipped.
async function stepE2eTimings(ctx) {
  const scriptAbs = path.join(ctx.root, "scripts", "quality", "balance-e2e-shards.mjs");
  if (!sourceExports(scriptAbs, "syncE2eTimings"))
    return { status: "skipped", detail: "syncE2eTimings is not on this tree (lands with phase 5)" };
  const mod = await import(pathToFileURL(scriptAbs).href);
  const preview = (await mod.syncE2eTimings({ root: ctx.root, dryRun: true })) ?? {};
  const files = Array.isArray(preview.changedFiles) ? preview.changedFiles : [];
  if (!files.length && !preview.changed) return { status: "clean", detail: "e2e timings current" };
  if (ctx.check) {
    ctx.extraChanged.push(...files);
    return { status: "changed", detail: `${files.length || "some"} timing file(s) would change` };
  }
  const before = files.map((rel) => [rel, ctx.vfs.read(rel)]);
  await mod.syncE2eTimings({ root: ctx.root, dryRun: false });
  for (const [rel, b] of before) ctx.vfs.noteExternal(rel, b);
  return { status: "changed", detail: `${files.length || "some"} timing file(s) updated` };
}

async function stepUiKeys(ctx) {
  const scriptAbs = path.join(ctx.root, "scripts", "i18n", "sync-ui-keys.mjs");
  const details = [];
  let changed = false;
  if (sourceExports(scriptAbs, "syncUiKeys")) {
    // Session-4 API: called per catalog; any of changedFiles / added / changed signals a diff.
    const mod = await import(pathToFileURL(scriptAbs).href);
    const rewrittenSinceRef = resolvableRef(ctx.root, ctx.rewrittenSince);
    if (ctx.rewrittenSince && !rewrittenSinceRef)
      details.push(`rewritten-since ${ctx.rewrittenSince} not resolvable — skipped`);
    for (const catalog of Object.keys(UI_CATALOG_DIRS)) {
      const before = ctx.check ? null : snapshotDir(ctx.root, UI_CATALOG_DIRS[catalog]);
      // Keys the English catalog dropped are pruned from the other locales, and English values
      // rewritten since the last release go back to translation; the backend translates only
      // when it is configured (never in --check).
      const r =
        (await mod.syncUiKeys({
          root: ctx.root,
          catalog,
          dryRun: ctx.check,
          pruneExtra: true,
          ...(rewrittenSinceRef ? { rewrittenSinceRef } : {}),
          translate: !ctx.check && translationBackendConfigured(),
        })) ?? {};
      const files = Array.isArray(r.changedFiles) ? r.changedFiles : [];
      const n = files.length || Number(r.added) || (r.changed ? 1 : 0);
      if (n) changed = true;
      details.push(
        `${catalog}: ${n ? `${files.length || r.added || "some"} change(s)` : "in sync"}`
      );
      if (ctx.check) ctx.extraChanged.push(...files);
      else for (const [rel, b] of before) ctx.vfs.noteExternal(rel, b);
    }
  } else {
    const flagOk = supportsFlag(scriptAbs, "--dry-run");
    for (const catalog of Object.keys(UI_CATALOG_DIRS)) {
      if (ctx.check && !flagOk) {
        details.push(`${catalog}: not checked (sync-ui-keys.mjs has no --dry-run)`);
        continue;
      }
      const before = ctx.check ? null : snapshotDir(ctx.root, UI_CATALOG_DIRS[catalog]);
      const since = supportsFlag(scriptAbs, "--rewritten-since")
        ? resolvableRef(ctx.root, ctx.rewrittenSince)
        : null;
      const args = [
        scriptAbs,
        `--catalog=${catalog}`,
        ...(ctx.check ? ["--dry-run"] : []),
        ...(since ? [`--rewritten-since=${since}`] : []),
      ];
      const r = runNode(args, { cwd: ctx.root });
      if (r.failure || r.status !== 0)
        throw new StepFailure(
          `sync-ui-keys --catalog=${catalog} failed (${r.failure || `exit ${r.status}`}): ${tailOf(r.stderr || r.stdout)}`
        );
      const added = Number(/summary:[^\n]*\badded=(\d+)/.exec(r.stdout + r.stderr)?.[1] ?? 0);
      if (ctx.check) {
        if (added > 0) changed = true;
        details.push(`${catalog}: ${added ? `${added} missing key(s)` : "in sync"}`);
      } else {
        let n = 0;
        for (const [rel, b] of before) {
          if (ctx.vfs.read(rel) !== b) {
            ctx.vfs.noteExternal(rel, b);
            n++;
          }
        }
        if (n) changed = true;
        details.push(`${catalog}: ${n ? `${n} locale file(s) updated` : "in sync"}`);
      }
    }
  }
  return { status: changed ? "changed" : "clean", detail: details.join("; ") };
}

async function stepLlmMirrors(ctx) {
  const scriptAbs = path.join(ctx.root, "scripts", "i18n", "sync-llm-mirrors.mjs");
  if (sourceExports(scriptAbs, "syncLlmMirrors")) {
    const before = new Map(mirrorsOf(ctx.root, "llm.txt").map((m) => [m.rel, ctx.vfs.read(m.rel)]));
    const mod = await import(pathToFileURL(scriptAbs).href);
    const r = (await mod.syncLlmMirrors({ root: ctx.root, dryRun: ctx.check })) ?? {};
    const files = Array.isArray(r.changedFiles) ? r.changedFiles : [];
    const n = files.length || Number(r.updated) || 0;
    if (ctx.check) ctx.extraChanged.push(...files);
    else for (const [rel, b] of before) ctx.vfs.noteExternal(rel, b);
    return n
      ? { status: "changed", detail: `${n} llm.txt mirror(s) re-copied` }
      : { status: "clean", detail: "llm.txt mirrors in sync" };
  }
  // No API: run the current CLI in a scratch tree fed from the overlay, then take its output
  // through the overlay. Exact in both modes, and --check stays write-free.
  const tmp = scratchDir("refresh-llm-");
  try {
    fs.mkdirSync(path.join(tmp, "scripts", "i18n"), { recursive: true });
    fs.copyFileSync(scriptAbs, path.join(tmp, "scripts", "i18n", "sync-llm-mirrors.mjs"));
    fs.writeFileSync(path.join(tmp, "llm.txt"), ctx.vfs.read("llm.txt") ?? "");
    const mirrors = mirrorsOf(ctx.root, "llm.txt");
    for (const m of mirrors) {
      fs.mkdirSync(path.dirname(path.join(tmp, m.rel)), { recursive: true });
      fs.writeFileSync(path.join(tmp, m.rel), ctx.vfs.read(m.rel));
    }
    const r = runNode([path.join(tmp, "scripts", "i18n", "sync-llm-mirrors.mjs")], { cwd: tmp });
    if (r.failure || r.status !== 0)
      throw new StepFailure(
        `sync-llm-mirrors failed (${r.failure || `exit ${r.status}`}): ${tailOf(r.stderr)}`
      );
    let n = 0;
    for (const m of mirrors) {
      if (ctx.vfs.write(m.rel, fs.readFileSync(path.join(tmp, m.rel), "utf8"))) n++;
    }
    return n
      ? { status: "changed", detail: `${n}/${mirrors.length} llm.txt mirror(s) re-copied` }
      : { status: "clean", detail: `${mirrors.length} llm.txt mirror(s) in sync` };
  } finally {
    fs.rmSync(tmp, { recursive: true, force: true });
  }
}

const STEP_IMPL = {
  changelog: stepChangelog,
  "provider-reference": stepProviderReference,
  facts: stepFacts,
  numbers: stepNumbers,
  "readme-diagrams": stepReadmeDiagrams,
  skills: stepSkills,
  "e2e-timings": stepE2eTimings,
  "ui-keys": stepUiKeys,
  "llm-mirrors": stepLlmMirrors,
};

/**
 * @param {{
 *   root?: string, check?: boolean, profile?: "release"|"nightly", only?: string[]|null,
 *   withChangelog?: boolean,
 *   rewrittenSince?: string|null,        // ref for the UI keys' rewritten-English pass
 *   facts?: object,                      // inject instead of collecting (tests)
 *   collectFacts?: Function,             // replace the collector (tests)
 *   planDerivedRewrites?: Function,      // inject instead of the gate's export (tests)
 *   steps?: Record<string, Function>,    // replace a step implementation (tests)
 *   log?: (line: string) => void,
 * }} [opts]
 * @returns {Promise<{ changedFiles: string[], manual: Array<{path:string,label:string,detail:string}>,
 *   steps: Array<{ id: string, status: "changed"|"clean"|"skipped"|"failed", detail: string }>,
 *   infraError: null|string }>}
 */
export async function refreshDerived(opts = {}) {
  const profile = opts.profile ?? "release";
  if (!PROFILES.includes(profile)) throw new Error(`unknown profile ${profile}`);
  if (opts.withChangelog && profile !== "release")
    throw new Error("--with-changelog is only accepted with --profile=release");
  const root = opts.root ?? ROOT;
  const check = Boolean(opts.check);
  const ctx = {
    root,
    check,
    profile,
    withChangelog: Boolean(opts.withChangelog),
    rewrittenSince: opts.rewrittenSince === undefined ? "origin/main" : opts.rewrittenSince,
    vfs: createVfs(root, check),
    manual: [],
    extraChanged: [],
    facts: opts.facts ? { ...opts.facts } : null,
    factsError: null,
    collect: opts.collectFacts ?? collectFacts,
    planDerivedRewrites: opts.planDerivedRewrites ?? null,
  };
  const log = opts.log ?? (() => {});
  const only = opts.only ? new Set(opts.only) : null;
  const steps = [];
  let infraError = null;
  for (const id of STEP_IDS) {
    if (only && !only.has(id)) {
      steps.push({ id, status: "skipped", detail: "not selected (--only)" });
      continue;
    }
    if (id === "changelog" && profile === "nightly") {
      steps.push({ id, status: "skipped", detail: "nightly profile never touches the changelog" });
      continue;
    }
    const impl = opts.steps?.[id] ?? STEP_IMPL[id];
    log(`[refresh-derived] ${id} …`);
    try {
      const r = await impl(ctx);
      steps.push({ id, status: r.status, detail: r.detail });
    } catch (err) {
      const detail = err instanceof StepFailure ? err.message : err?.stack || String(err);
      steps.push({ id, status: "failed", detail });
      infraError ??= `${id}: ${detail}`;
    }
    log(`[refresh-derived] ${id}: ${steps.at(-1).status} — ${steps.at(-1).detail}`);
  }
  const changedFiles = [...new Set([...ctx.vfs.changedFiles(), ...ctx.extraChanged])].sort();
  return { changedFiles, manual: ctx.manual, steps, infraError };
}

/** PURE. Exit code for a refreshDerived() result. */
export function refreshExitCode(result, { check }) {
  if (result.infraError || result.steps.some((s) => s.status === "failed")) return 2;
  if (!check) return 0;
  const sourceManual = result.manual.some((m) => !String(m.path || "").startsWith("docs/i18n/"));
  const anyChanged = result.steps.some((s) => s.status === "changed");
  return result.changedFiles.length || anyChanged || sourceManual ? 1 : 0;
}

async function main() {
  const opts = parseRefreshArgs(process.argv.slice(2));
  if (opts.help) {
    console.log(HELP);
    return 0;
  }
  if (opts.error) {
    console.error(`[refresh-derived] ${opts.error}\n\n${HELP}`);
    return 2;
  }
  const result = await refreshDerived({
    check: opts.check,
    profile: opts.profile,
    only: opts.only,
    withChangelog: opts.withChangelog,
    rewrittenSince: opts.rewrittenSince,
    log: (line) => console.error(line),
  });
  const exitCode = refreshExitCode(result, { check: opts.check });
  if (opts.json) {
    console.log(JSON.stringify({ ...result, exitCode }, null, 2));
    return exitCode;
  }
  const verb = opts.check ? "would change" : "changed";
  console.log(
    `Derived refresh — profile=${opts.profile}${opts.check ? " (check, nothing written)" : ""}`
  );
  for (const s of result.steps) console.log(`  ${s.status.padEnd(7)} ${s.id} — ${s.detail}`);
  console.log(`\n${result.changedFiles.length} file(s) ${verb}:`);
  for (const f of result.changedFiles) console.log(`  ${f}`);
  if (result.manual.length) {
    console.log(`\n${result.manual.length} item(s) need a manual edit:`);
    for (const m of result.manual) console.log(`  ${m.path} — ${m.label}: ${m.detail}`);
  }
  if (result.infraError)
    console.error(
      `\n✗ infrastructure failure (not a documentation divergence): ${result.infraError}`
    );
  return exitCode;
}

if (process.argv[1] && pathToFileURL(path.resolve(process.argv[1])).href === import.meta.url) {
  main().then(
    (code) => {
      process.exitCode = code;
    },
    (err) => {
      console.error(err?.stack || String(err));
      process.exitCode = 2;
    }
  );
}
