/**
 * Regex work in the compression engines stays bounded on hostile input
 * (CodeQL #1301, #1302, #1349).
 *
 * - #1301 headroom/gcf needsQuote(): the inline-array check ran in O(n^2) on runs of `[`.
 * - #1302 rtk maybePersistRtkRawOutput(): the command slug trim ran in O(n^2) on runs of `_`
 *   from a client-supplied tool_use command of unbounded length.
 * - #1349 ccr grep: a caller-supplied pattern such as `.*.*.*.*x` passed the star-height
 *   gate and blocked the event loop for minutes on a single long line.
 *
 * Each block pairs a timing assertion (the pathological input finishes fast or is refused)
 * with a behaviour assertion (ordinary input gives the same result as before).
 */
import { describe, it } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

import { needsQuote } from "../../../open-sse/services/compression/engines/headroom/gcf/scalar.ts";
import { maybePersistRtkRawOutput } from "../../../open-sse/services/compression/engines/rtk/rawOutput.ts";
import { queryBlock } from "../../../open-sse/services/compression/engines/ccr/ccrQuery.ts";

/** Ceiling for the fixed paths. They run in a few ms when idle; before the fix the same
 * inputs took 10 s (#1301), 21 s (#1302) and minutes (#1349). The headroom absorbs a loaded
 * CI runner (one fixed case reached 806 ms at load average 44) without hiding a regression. */
const FAST_MS = 1_000;
/** Upper bound for a grep stopped by its 1 s time budget (budget plus scheduling slack). */
const BUDGET_CEILING_MS = 5_000;

function timed<T>(fn: () => T): { value: T; ms: number } {
  const t0 = performance.now();
  const value = fn();
  return { value, ms: performance.now() - t0 };
}

/** Reference semantics of the SPEC 2.4 inline-array rule: some `[` whose first following
 * `]` is followed by optional whitespace and a `:`. Written as a plain linear scan. */
function hasInlineArrayHeader(s: string): boolean {
  for (let i = 0; i < s.length; i++) {
    if (s[i] !== "[") continue;
    const close = s.indexOf("]", i + 1);
    if (close === -1) return false;
    let k = close + 1;
    while (k < s.length && /\s/.test(s[k])) k++;
    if (s[k] === ":") return true;
  }
  return false;
}

/** Deterministic PRNG (mulberry32) so the equivalence sample is reproducible. */
function prng(seed: number): () => number {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

describe("#1301 headroom/gcf needsQuote inline-array check", () => {
  it("finishes fast on 50k '[' characters", () => {
    for (const s of [
      "[".repeat(50_000),
      "a" + "[".repeat(50_000) + "]",
      "[".repeat(50_000) + "]x",
    ]) {
      const { value, ms } = timed(() => needsQuote(s));
      assert.equal(value, false);
      assert.ok(ms < FAST_MS, `needsQuote took ${ms.toFixed(1)}ms on ${s.length} chars`);
    }
  });

  it("keeps the same verdict on ordinary values", () => {
    assert.equal(needsQuote("ERR[404]: Not Found"), true);
    assert.equal(needsQuote("[Speaker 1]: Hello"), true);
    assert.equal(needsQuote("a[[b]: c"), true);
    assert.equal(needsQuote("x[a[b] :y"), true);
    assert.equal(needsQuote("arr[0] index"), false);
    assert.equal(needsQuote("a]: [b"), false);
    assert.equal(needsQuote("a[b] c: d"), false);
  });

  it("matches the reference rule on a random sample", () => {
    const rand = prng(1301);
    const alphabet = "[]: ab";
    for (let n = 0; n < 20_000; n++) {
      const len = Math.floor(rand() * 12);
      let body = "";
      for (let i = 0; i < len; i++) body += alphabet[Math.floor(rand() * alphabet.length)];
      // Leading/trailing 'a' keeps the other needsQuote rules (edge space, numeric, '#'…)
      // out of the way, so the verdict depends only on the inline-array rule.
      const s = `a${body}a`;
      assert.equal(needsQuote(s), hasInlineArrayHeader(s), JSON.stringify(s));
    }
  });
});

describe("#1302 rtk raw-output command slug", () => {
  function persist(command: string) {
    const base = process.env.DATA_DIR || os.tmpdir();
    const dataDir = fs.mkdtempSync(path.join(base, "rtk-slug-"));
    const previous = process.env.DATA_DIR;
    process.env.DATA_DIR = dataDir;
    try {
      return timed(() =>
        maybePersistRtkRawOutput("error: build failed\nline 2", { retention: "always", command })
      );
    } finally {
      if (previous === undefined) delete process.env.DATA_DIR;
      else process.env.DATA_DIR = previous;
      fs.rmSync(dataDir, { recursive: true, force: true });
    }
  }

  function slugOf(pointerPath: string): string {
    const match = /^\d+-(.*)-[0-9a-f]{24}\.log$/.exec(path.basename(pointerPath));
    assert.ok(match, pointerPath);
    return match[1];
  }

  it("finishes fast on a 50k-underscore command", () => {
    for (const command of ["_".repeat(50_000) + "x", "x" + "_".repeat(50_000) + "x"]) {
      const { value, ms } = persist(command);
      assert.ok(value, "pointer expected");
      assert.ok(ms < FAST_MS, `slug took ${ms.toFixed(1)}ms on ${command.length} chars`);
    }
  });

  it("keeps the same slug for ordinary commands", () => {
    const cases: Array<[string, string]> = [
      ["git status --short", "git_status_--short"],
      ["  npm test -- --watch=false  ", "npm_test_--_--watch_false"],
      ["__init__", "init"],
      ["cargo build --release && ./target/release/app", "cargo_build_--release_target_release_app"],
      ["a".repeat(100), "a".repeat(48)],
    ];
    for (const [command, expected] of cases) {
      const { value } = persist(command);
      assert.ok(value);
      assert.equal(slugOf(value.path), expected, command);
    }
    const { value } = persist("");
    assert.ok(value);
    assert.equal(slugOf(value.path), "tool-output");
  });
});

describe("#1349 ccr grep pattern", () => {
  it("refuses a multi-quantifier pattern on a 500+ char line quickly", () => {
    const text = "a".repeat(600);
    const { value, ms } = timed(() => queryBlock(text, { mode: "grep", pattern: ".*.*.*.*x" }));
    assert.ok("error" in value, JSON.stringify(value));
    assert.ok(ms < FAST_MS, `grep took ${ms.toFixed(1)}ms`);
  });

  it("stops a single-quantifier pattern that exceeds the time budget", () => {
    // 2 MiB of 4096-char lines: `.*x` is quadratic per line (minutes before the fix).
    const text = Array.from({ length: 512 }, () => "a".repeat(4095)).join("\n");
    const { value, ms } = timed(() => queryBlock(text, { mode: "grep", pattern: ".*x" }));
    assert.ok("error" in value, JSON.stringify(value).slice(0, 200));
    assert.match((value as { error: string }).error, /time budget/);
    assert.ok(ms < BUDGET_CEILING_MS, `grep took ${ms.toFixed(1)}ms`);
  });

  it("counts only unbounded quantifiers outside classes and escapes", () => {
    const tooMany = ["a.*b.*c", "\\d+\\.\\d+", "x{2,}y+", "a.*?b.+?c"];
    for (const pattern of tooMany) {
      const r = queryBlock("abc", { mode: "grep", pattern });
      assert.ok("error" in r, pattern);
      assert.match((r as { error: string }).error, /unbounded quantifier/, pattern);
    }
    const text = ["l1 ERROR upstream timeout", "l2 *+ literal", "l3 {2,} braces", "l4 ok"].join(
      "\n"
    );
    assert.deepEqual(queryBlock(text, { mode: "grep", pattern: "ERROR.*timeout" }), {
      content: "l1 ERROR upstream timeout",
    });
    assert.deepEqual(queryBlock(text, { mode: "grep", pattern: "[*+]+ literal" }), {
      content: "l2 *+ literal",
    });
    assert.deepEqual(queryBlock(text, { mode: "grep", pattern: "\\*\\+ lit.*" }), {
      content: "l2 *+ literal",
    });
    assert.deepEqual(queryBlock(text, { mode: "grep", pattern: "\\{2,\\} b.*s" }), {
      content: "l3 {2,} braces",
    });
    assert.deepEqual(queryBlock(text, { mode: "grep", pattern: "l[0-9]{1,2} (ok|ERROR)" }), {
      content: "l1 ERROR upstream timeout\nl4 ok",
    });
  });

  it("keeps grep results unchanged on an ordinary log block", () => {
    const lines = Array.from(
      { length: 5_000 },
      (_, i) => `2026-11-20T10:00:${String(i % 60).padStart(2, "0")}Z INFO req=${i} status=200`
    );
    lines[1234] = "2026-11-20T10:00:34Z ERROR req=1234 upstream timeout";
    lines[4321] = "2026-11-20T10:00:01Z WARN req=4321 slow upstream";
    const text = lines.join("\n");
    const expected = (re: RegExp) => lines.filter((l) => re.test(l)).join("\n");
    for (const pattern of ["ERROR", "(WARN|ERROR) req=", "req=12\\d\\d ", "^\\S+ WARN"]) {
      assert.deepEqual(
        queryBlock(text, { mode: "grep", pattern }),
        { content: expected(new RegExp(pattern)) },
        pattern
      );
    }
    assert.deepEqual(queryBlock(text, { mode: "grep", pattern: "INFO", unique: true }), {
      content: lines
        .filter((l) => l.includes("INFO"))
        .slice(0, 1000)
        .join("\n")
        .concat("\n…[truncated at 1000 matches]"),
    });
  });
});
