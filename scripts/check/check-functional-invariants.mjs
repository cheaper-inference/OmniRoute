#!/usr/bin/env node
// scripts/check/check-functional-invariants.mjs
//
// A single detector for lost or diluted functional invariants. 12 named
// predicates, one path + one line per signal, bounded output. Distinct from
// check-test-masking.mjs (its sub-checks are not touched).
//
// Contract: verifyInvariants(diff) where diff is a list of { path, line }.
// Each predicate receives the whole list (some judge an order, a count or a
// table) and returns 0..N signals { predicate, path, line, correction }.
//
// Dynamic discovery (no hardcoded list):
//   - whitespaceTrimSet() discovers at runtime the codepoints trim() treats as whitespace;
//   - display_name_golden reads tests/fixtures/display-name-goldens.json (readdir + JSON.parse);
//     a missing or empty table is an immediate REJECTED;
//   - discoverTargets() uses git diff "$BASE" --name-only + git ls-files --others
//     (never a bare git diff).

import fs from "node:fs";
import path from "node:path";
import { execFileSync } from "node:child_process";
import { pathToFileURL } from "node:url";

const MAX_SIGNALS = 200; // output bound, not an application threshold
const truncated = (s) =>
  String(s ?? "")
    .replace(/\s+/g, " ")
    .slice(0, 200);
const entry = (e) => e && typeof e.line === "string";
const linesOf = (diff) => (Array.isArray(diff) ? diff.filter(entry) : []);
const signal = (predicate, e, correction) => ({
  predicate,
  path: e?.path ?? "(unknown)",
  line: truncated(e?.line ?? ""),
  correction,
});

/** Runtime discovery of the whitespace recognized by trim() — no hardcoded list. */
export function whitespaceTrimSet() {
  const set = new Set();
  for (let cp = 0; cp <= 0xffff; cp++) {
    const ch = String.fromCharCode(cp);
    if (ch.trim() === "") set.add(ch);
  }
  return set;
}

/** Targets = files changed since BASE + untracked files. Never a bare git diff. */
export function discoverTargets(repo = process.cwd(), base = process.env.BASE) {
  const targets = new Set();
  if (!base) return [];
  const git = (args) => {
    try {
      return execFileSync("git", ["-C", repo, ...args], {
        encoding: "utf8",
        stdio: ["ignore", "pipe", "ignore"],
      });
    } catch {
      return "";
    }
  };
  for (const line of git(["diff", base, "--name-only"]).split("\n"))
    if (line.trim()) targets.add(line.trim());
  for (const line of git(["ls-files", "--others", "--exclude-standard"]).split("\n")) {
    if (line.trim()) targets.add(line.trim());
  }
  return [...targets].sort();
}

// Only executable source is scanned. A guide documenting
// `if (/ECONNRESET/.test(err.message)) retry();` is not an executable
// statement; syntax in Markdown/JSON/docs must not produce a signal. The
// extension set matches the identity detector's source set.
const SOURCE_EXT = /\.(?:mjs|cjs|js|ts)$/i;
export function sourceTargets(files) {
  return (Array.isArray(files) ? files : []).filter(
    (f) =>
      SOURCE_EXT.test(f) &&
      !f.endsWith(".test.mjs") &&
      f !== "scripts/check/check-functional-invariants.mjs"
  );
}

// ---------------------------------------------------------------------------
// 1. counter_matches_parser — line count vs Unicode trim()
// ---------------------------------------------------------------------------
export function counter_matches_parser(diff) {
  const ws = whitespaceTrimSet();
  const escaped = new Set(
    [...ws].map((ch) => `\\u${ch.codePointAt(0).toString(16).padStart(4, "0")}`)
  );
  const lines = linesOf(diff);
  const raws = lines.filter((e) =>
    /\b(?:total|count|lineCount)\s*=\s*[^;\n]*\.split\([^)]*\)\.length\b/.test(e.line)
  );
  // Alignment belongs to the counter and its parser, not to the whole diff:
  // a trim() filter in another file cannot justify an unfiltered counter here.
  const isAligned = (e) => {
    const n = Number(e.number);
    const near = lines.filter(
      (o) =>
        o.path === e.path &&
        (!Number.isFinite(n) ||
          !Number.isFinite(Number(o.number)) ||
          (Number(o.number) >= n - 2 && Number(o.number) <= n + 6))
    );
    return near.some(
      (o) =>
        /\.filter\([^)]*\btrim\s*\(/.test(o.line) ||
        [...escaped].some((esc) => o.line.includes(esc))
    );
  };
  const invalid = raws.filter((e) => !isAligned(e));
  if (invalid.length === 0) return [];
  return invalid.map((e) =>
    signal(
      "counter_matches_parser",
      e,
      "align the counter with the parser: filter blank lines (whitespace discovered from trim() at runtime) before counting"
    )
  );
}

// ---------------------------------------------------------------------------
// 2. probe_executor_parity — Bearer key: probe vs executor
// ---------------------------------------------------------------------------
function bearerValue(line) {
  const i = line.indexOf("Bearer");
  if (i < 0) return null;
  const m = line.slice(i + 6).match(/\b(anonymous|[A-Za-z_$][\w$]*)\b/);
  return m ? m[1] : null;
}

// A provider name is the scope of a probe/executor pair. Values from two
// unrelated providers must never be compared: their credentials are supposed
// to differ. When no provider is named, fall back to one implicit group.
const PROVIDER_CTX =
  /\b(openai|anthropic|kilo|gemini|google|mistral|openrouter|deepseek|groq|ollama|azure|bedrock|claude)\w*\b/i;
export function probe_executor_parity(diff) {
  const groups = new Map();
  for (const e of linesOf(diff)) {
    const value = bearerValue(e.line);
    if (!value) continue;
    const ctx = `${e.path ?? ""}\n${e.line}`.match(PROVIDER_CTX)?.[1]?.toLowerCase() ?? "_";
    if (!groups.has(ctx)) groups.set(ctx, new Set());
    groups.get(ctx).add(value);
  }
  const mismatch = [...groups].find(([, values]) => values.size > 1);
  if (!mismatch) return [];
  const first = linesOf(diff).find((e) => bearerValue(e.line));
  return [
    signal(
      "probe_executor_parity",
      first,
      `Bearer differs between probe and executor: ${[...mismatch[1]].join(" / ")} — use the same key on both sides`
    ),
  ];
}

// ---------------------------------------------------------------------------
// 3. full_denominator — displayed rank/attempt
// ---------------------------------------------------------------------------
// A denominator displays a count of attempts: `.length`, `total`, `count`,
// `size` or `Math.min(...)`. A slash inside an error message, a regex flag or
// a path literal is not a displayed rank, so require a count token before
// judging the line. This keeps the trigger precise on real source files.
const COUNT_DENOMINATOR = /\.length\b|\b(?:total|count|size)\b|\bMath\s*\.\s*min\b/;

export function full_denominator(diff) {
  const out = [];
  for (const e of linesOf(diff)) {
    const l = e.line;
    if (!COUNT_DENOMINATOR.test(l)) continue;
    if (!/\$\{[^}]*\}\s*\/\s*\$?\{|\b(?:attempt|rank|i|index)\w*\s*\/\s*[^`\n]{1,80}/.test(l))
      continue;
    const partial =
      /\.filter\s*\(|\.slice\s*\(|Math\.min\s*\(|\bcap\b|\bcapped\b/.test(l) ||
      !/\.length\b|\btotal\b|\bcompte\b/.test(l);
    if (partial) {
      out.push(
        signal(
          "full_denominator",
          e,
          "partial denominator: do not filter or cap attempts before showing the total (3 attempts -> 1/3)"
        )
      );
    }
  }
  return out;
}

// ---------------------------------------------------------------------------
// 4. property_boundary_regex — retry regex over an error message
// ---------------------------------------------------------------------------
export function property_boundary_regex(diff) {
  const out = [];
  const regexOnMessage =
    /\.test\s*\([^)]*\bmessage\b[^)]*\)|\bmessage\b\s*\.\s*match\s*\(|\bmessage\b[^\n]{0,60}\.test\s*\(/;
  for (const e of linesOf(diff)) {
    const l = e.line;
    if (!/\bretry\b|\bretrier\b|new attempt/i.test(l)) continue;
    if (regexOnMessage.test(l)) {
      out.push(
        signal(
          "property_boundary_regex",
          e,
          "decide retry on err.code (ECONNRESET), not a message regex: " +
            "a property error (reading 'network') must not trigger a retry"
        )
      );
    }
  }
  return out;
}

/** Group lines by path, preserving order (for order predicates). */
function groupByPath(diff) {
  const groups = new Map();
  for (const e of linesOf(diff)) {
    if (!groups.has(e.path)) groups.set(e.path, []);
    groups.get(e.path).push(e);
  }
  return groups;
}

// ---------------------------------------------------------------------------
// 5. emit_after_sink — logging around setHostSink
// ---------------------------------------------------------------------------
export function emit_after_sink(diff) {
  const out = [];
  const LOG = /\b(?:ctx\s*\.\s*client\s*\.\s*app\s*\.\s*log|app\s*\.\s*log)\s*\(/;
  for (const [path, ls] of groupByPath(diff)) {
    const sink = ls.findIndex((e) => /\bsetHostSink\s*\(/.test(e.line));
    const log = ls.findIndex((e) => LOG.test(e.line));
    if (log < 0) continue;
    if (sink >= 0 && log > sink) continue; // nominal: log emitted after the sink
    out.push(
      signal(
        "emit_after_sink",
        ls[log],
        `path ${path}: warning emitted before setHostSink (or setup without ctx.client.app.log) — emit after the sink`
      )
    );
  }
  return out;
}

// ---------------------------------------------------------------------------
// 6. active_wait — setImmediate/nextTick inside a loop
// ---------------------------------------------------------------------------
// Busy-wait forms inside a loop:
//   - await new Promise(r => setImmediate(r))   (historical form)
//   - setImmediate(fn) direct                   (found in review)
//   - process.nextTick(fn)                      (found in review)
const ACTIVE_WAIT_RE = [
  /\bawait\s+new\s+Promise\s*\([^)]*\bsetImmediate\s*\(/,
  /\bsetImmediate\s*\(/,
  /\bprocess\s*\.\s*nextTick\s*\(/,
];

export function active_wait(diff) {
  const out = [];
  for (const [, ls] of groupByPath(diff)) {
    // An explicit queue (waiters.push(resolve)) makes the wait active: the
    // worker does not spin idle. Scoped to the file, not just the await line.
    const hasWaiters = ls.some((e) => /waiters\s*\.\s*push/.test(e.line));
    let inLoop = false;
    let loopDepth = 0;
    let depth = 0;
    for (const e of ls) {
      if (/\b(?:while|for)\s*\(/.test(e.line)) {
        inLoop = true;
        loopDepth = depth + ((e.line.match(/\{/g) || []).length > 0 ? 1 : 0);
      }
      if (inLoop && !hasWaiters && ACTIVE_WAIT_RE.some((re) => re.test(e.line))) {
        out.push(
          signal(
            "active_wait",
            e,
            "busy-wait: setImmediate (direct or inside await new Promise) or process.nextTick " +
              "in a worker loop — use a waiters.push(resolve) queue"
          )
        );
      }
      depth += (e.line.match(/\{/g) || []).length - (e.line.match(/\}/g) || []).length;
      // Only the loop's own closing brace deactivates it: an inner block may
      // close while the loop is still active.
      if (inLoop && depth < loopDepth) inLoop = false;
    }
  }
  return out;
}

// ---------------------------------------------------------------------------
// 7. display_name_golden — table read at runtime
// ---------------------------------------------------------------------------
export function display_name_golden(diff, opts = {}) {
  const dir = opts.goldensDir || path.join(process.cwd(), "tests", "fixtures");
  const fileName = "display-name-goldens.json";
  let cases = [];
  try {
    if (fs.readdirSync(dir).includes(fileName)) {
      const table = JSON.parse(fs.readFileSync(path.join(dir, fileName), "utf8"));
      cases = Array.isArray(table?.cases) ? table.cases : Array.isArray(table) ? table : [];
    }
  } catch {
    cases = [];
  }
  if (cases.length === 0) {
    return [
      {
        predicate: "display_name_golden",
        path: fileName,
        line: "(table missing or empty)",
        correction:
          "create/fill tests/fixtures/display-name-goldens.json — missing or empty table = immediate REJECTED",
      },
    ];
  }
  const triggers = linesOf(diff).filter((e) =>
    /\bbuildModelDisplayName\b|\bpublishCombos\b/.test(e.line)
  );
  if (triggers.length === 0) return [];
  const guard = linesOf(diff).some(
    (e) => /\bstartsWith\s*\(/.test(e.line) && /\bprefix|prefix|prefix\b/i.test(e.line)
  );
  const naive = linesOf(diff).some(
    (e) =>
      /\breplace\s*\(\s*\/\^/.test(e.line) || /\.split\s*\(\s*["']\s*-\s*["']\s*\)/.test(e.line)
  );
  if (guard && !naive) return [];
  const nameRead =
    cases.find((c) => /\s-\s/.test(c?.name || ""))?.name ??
    cases[0]?.name ??
    "(name read from the table)";
  return [
    signal(
      "display_name_golden",
      triggers[0],
      `strip not guarded by startsWith(prefix) — ${cases.length} goldens read (e.g. "${truncated(nameRead)}"); ` +
        "keep the full name, strip only the real prefix"
    ),
  ];
}

// ---------------------------------------------------------------------------
// 8. source_guard_before_predicate — combosSource + isUserComboRow
// ---------------------------------------------------------------------------
export function source_guard_before_predicate(diff) {
  const ls = linesOf(diff).map((e, i) => ({ ...e, i }));
  const predicate = ls.findIndex((e) => /\bisUserComboRow\s*\(/.test(e.line));
  if (predicate < 0) return [];
  const guard = ls.findIndex(
    (e) =>
      /\bcombosSource\b[^\n]{0,80}[!=]==?\s*["']models["']/.test(e.line) ||
      /["']models["']\s*[!=]==?\s*\w*combosSource/.test(e.line)
  );
  if (guard < 0 || guard < predicate) return [];
  return [
    signal(
      "source_guard_before_predicate",
      ls[predicate],
      "combosSource guard placed after isUserComboRow — test the default source before the predicate " +
        "(combosSource:'models' + ID kg/auto-fallback)"
    ),
  ];
}

// ---------------------------------------------------------------------------
// 9. kept_prefix_normalization — replace on a tarball name
// ---------------------------------------------------------------------------
export function kept_prefix_normalization(diff) {
  const ls = linesOf(diff).map((e, i) => ({ ...e, i }));
  const out = [];
  for (const e of ls) {
    if (!/\.replace\s*\(\s*(?:["'`]package\/|\/\^?package\/)/.test(e.line)) continue;
    const guard = ls.some((g) => g.i < e.i && /startsWith\s*\(\s*["'`]package\//.test(g.line));
    if (!guard) {
      out.push(
        signal(
          "kept_prefix_normalization",
          e,
          "replace('package/') without a prior startsWith('package/') — reject input without the prefix"
        )
      );
    }
  }
  return out;
}

// ---------------------------------------------------------------------------
// 10. activity_clock_refreshed — lastActivityAt
// ---------------------------------------------------------------------------
export function activity_clock_refreshed(diff) {
  const lines = linesOf(diff);
  const writes = lines.filter((e) => /\blastActivityAt\s*=/.test(e.line));
  if (writes.length === 0) return [];
  // Keep the enclosing lines of each write: start/release/finally are often
  // named on the surrounding lines, not on the assignment itself.
  const contextLines = new Set();
  for (const w of writes) {
    const n = Number(w.number);
    for (const e of lines) {
      if (e.path !== w.path) continue;
      const en = Number(e.number);
      if (!Number.isFinite(n) || !Number.isFinite(en) || Math.abs(en - n) <= 8) contextLines.add(e);
    }
  }
  const context = [...contextLines].map((e) => e.line).join("\n");
  const start = /start|\bstart\b|\binit\b|constructor/i.test(context);
  const release = /\brelease\b/i.test(context);
  const end = /\bfinally\b|noteStreamableInflight\s*\(\s*-1\s*\)/.test(context);
  if (start && release && end) return [];
  return [
    signal(
      "activity_clock_refreshed",
      writes[0],
      `${writes.length} write(s) to lastActivityAt — expected 3: start, release, finally(noteStreamableInflight(-1))`
    ),
  ];
}

// ---------------------------------------------------------------------------
// 11. published_payload_assertion — assert on provider vs published payload m1
// ---------------------------------------------------------------------------
export function published_payload_assertion(diff) {
  const out = [];
  // Judge one file at a time: a publication signal in a different file must
  // not turn an unrelated assertion (for example a manifest validation test)
  // into a false REJECTED.
  for (const entries of groupByPath(diff).values()) {
    const txt = entries.map((e) => e.line).join("\n");
    if (!/\bprovider\b/i.test(txt)) continue;
    // A provider HTTP-status test is not a publication test: require evidence
    // that the test actually exercises a published payload before demanding a
    // payload assertion.
    const publishes = /\b(?:publish\w*|m1|combos?|published)\b|payload|response\.json\s*\(/i.test(
      txt
    );
    if (!publishes) continue;
    const asserts = entries.filter((e) =>
      /\bassert\s*\(|\bassert\s*\.\s*\w+\s*\(|\bexpect\s*\(/.test(e.line)
    );
    if (asserts.length === 0) continue;
    const payload = /\bassert[^\n]{0,120}\b(?:model|payload|m1)\b|["'`]m1["']/.test(txt);
    const providerOnly = asserts.some(
      (e) => /provider/i.test(e.line) && !/\bmodel\b|["']m1["']/.test(e.line)
    );
    if (payload && !providerOnly) continue;
    out.push(
      signal(
        "published_payload_assertion",
        asserts.find((e) => /provider/i.test(e.line)) ?? asserts[0],
        "assert only checks the provider name — add an assert on the published payload (model 'm1')"
      )
    );
  }
  return out;
}

// ---------------------------------------------------------------------------
// 12. test_hygiene
// ---------------------------------------------------------------------------
const CALLBACK_START = /\b(?:test|it|describe)\s*\(|\bfunction\s+\w*\s*\(|=>\s*\{/;
const ASSERT_LINE = /\bassert\s*\(|\bassert\s*\.\s*\w+\s*\(|\bexpect\s*\(/;

// Assign each changed line to the innermost callable region it belongs to.
// A `return;` in one callback cannot skip an assertion in another one, so
// returns and assertions are only compared inside the same region.
function callbackRegions(ls) {
  const stack = [];
  return ls.map((e, i) => {
    const line = e.line;
    const opens = CALLBACK_START.test(line);
    const ob = (line.match(/\{/g) || []).length;
    const cb = (line.match(/\}/g) || []).length;
    let id;
    if (opens) {
      id = i; // a callback opening on this line owns its own region
      if (cb < ob) stack.push(i); // still open: nested lines join it
    } else {
      id = stack.length ? stack[stack.length - 1] : -1;
    }
    if (cb > ob) {
      for (let k = 0; k < cb - ob && stack.length; k++) stack.pop();
    }
    return id;
  });
}

export function test_hygiene(diff) {
  const out = [];
  for (const [path, ls] of groupByPath(diff)) {
    const txt = ls.map((e) => e.line).join("\n");
    const regions = callbackRegions(ls);
    let truncated;
    for (let i = 0; i < ls.length && !truncated; i++) {
      if (!/\breturn\s*;/.test(ls[i].line)) continue;
      const j = ls.findIndex(
        (e, k) => k > i && ASSERT_LINE.test(e.line) && regions[k] === regions[i]
      );
      if (j >= 0) truncated = i;
    }
    if (truncated !== undefined) {
      out.push(
        signal("test_hygiene", ls[truncated], `${path}: return; before assert — truncated test`)
      );
    }
    const mock = txt.match(/\bconst\s+(\w*[Mm]ock\w*)\s*=/);
    if (mock && /\b(?:sut|SUT|build|run|create)\w*\s*\(/.test(txt)) {
      const name = mock[1];
      const passedSecond = txt.includes(`, ${name})`) || txt.includes(`,${name})`);
      if (!passedSecond && txt.includes(`(${name})`)) {
        const e = ls.find((x) => x.line.includes(`(${name})`));
        out.push(
          signal("test_hygiene", e, `${path}: mock ${name} not passed as 2nd argument to the SUT`)
        );
      }
    }
    if (
      /expect\s*\([^)]*\.some\s*\([^)]*\)\)\s*\.\s*toBe\s*\(\s*false\s*\)/.test(txt) &&
      !/\.some\s*\([^)]*\b(?:id|name|model|provider)\b/.test(txt)
    ) {
      const e = ls.find((x) => /\.some\s*\(/.test(x.line));
      out.push(
        signal(
          "test_hygiene",
          e,
          `${path}: expect(x.some(...)).toBe(false) without a verifiable link`
        )
      );
    }
    const tick = ls.findIndex((e) => /\btick\s*\(/.test(e.line));
    const timeout = ls.findIndex((e) =>
      /setTimeout\s*\(\s*(?:async\s*)?\(?[^;]*\bassert\b/.test(e.line)
    );
    if (tick >= 0 && timeout > tick && !/Promise\s*\.\s*race\s*\(/.test(txt)) {
      out.push(
        signal(
          "test_hygiene",
          ls[timeout],
          `${path}: setTimeout(assert, 200) after tick() without a Promise.race guard`
        )
      );
    }
  }
  return out;
}

export const PREDICATES = Object.freeze({
  counter_matches_parser,
  probe_executor_parity,
  full_denominator,
  property_boundary_regex,
  emit_after_sink,
  active_wait,
  display_name_golden,
  source_guard_before_predicate,
  kept_prefix_normalization,
  activity_clock_refreshed,
  published_payload_assertion,
  test_hygiene,
});
export const PREDICATE_NAMES = Object.keys(PREDICATES);

/** Orchestrator: one signal = a named predicate + a path + a line. Bounded output. */
export function verifyInvariants(diff, opts = {}) {
  const inputs = linesOf(diff);
  const raws = [];
  for (const [name, predicate] of Object.entries(PREDICATES)) {
    try {
      raws.push(...(predicate(inputs, opts) || []));
    } catch (err) {
      raws.push({
        predicate: name,
        path: "(error)",
        line: truncated(err?.message ?? err),
        correction: "replay the predicate",
      });
    }
  }
  const seen = new Set();
  const bounds = [];
  for (const s of raws) {
    const key = `${s.predicate}|${s.path}|${s.line}`;
    if (seen.has(key)) continue;
    seen.add(key);
    bounds.push(s);
    if (bounds.length >= MAX_SIGNALS) break;
  }
  return bounds;
}

// ---------------------------------------------------------------------------
// CLI — dynamic discovery, BASE guard, bounded output.
// ---------------------------------------------------------------------------
const IS_CLI =
  process.argv[1] && pathToFileURL(path.resolve(process.argv[1])).href === import.meta.url;
if (IS_CLI) {
  const base = process.env.BASE || process.env.BINOME_BASE;
  if (!base) {
    console.error(
      "REJECTED: BASE is missing — set BASE from the verified merge-base source before invoking the detector"
    );
    process.exit(2);
  }
  let resolu = true;
  try {
    execFileSync("git", ["rev-parse", "--verify", "-q", `${base}^{commit}`], { stdio: "ignore" });
  } catch {
    resolu = false;
  }
  if (!resolu) {
    console.error(`REJECTED: ${base} does not resolve — check the base ref / upstream`);
    process.exit(2);
  }
  const targets = sourceTargets(discoverTargets(process.cwd(), base));
  const diff = [];
  for (const f of targets) {
    if (!fs.existsSync(f)) continue;
    const src = fs.readFileSync(f, "utf8");
    const lines = src.split("\n");
    for (let i = 0; i < lines.length; i++) diff.push({ path: f, line: lines[i], number: i + 1 });
  }
  const signals = verifyInvariants(diff);
  let rejections = 0;
  for (const s of signals.slice(0, MAX_SIGNALS)) {
    rejections++;
    console.log(`REJECTED ${s.predicate} ${s.path} : ${s.line}`);
    console.log(`  correction : ${s.correction}`);
  }
  console.log(`functional-invariants: ${diff.length} line(s) evaluated, ${rejections} REJECTED`);
  process.exit(rejections > 0 ? 1 : 0);
}
