import test from "node:test";
import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";

// The complexity ratchet (eslint.complexity.config.mjs: complexity>15,
// max-lines-per-function>80) compares per touched file against the base.
// src/domain/quotaCache.ts measured 5 violations at the PR base; the Codex
// freshness work pushed it to 7 and failed Fast Quality Gates on PR #18742.
// New logic must live in helpers so this file stays at the base count.
const BASE_VIOLATIONS = 5;

test("quotaCache.ts stays within its base complexity violation count", () => {
  let out = "";
  try {
    out = execFileSync(
      "node_modules/.bin/eslint",
      [
        "--no-config-lookup",
        "--config",
        "eslint.complexity.config.mjs",
        "--format",
        "json",
        "src/domain/quotaCache.ts",
      ],
      { encoding: "utf8" }
    );
  } catch (error) {
    out = (error as { stdout?: string }).stdout ?? "";
  }
  const report = JSON.parse(out) as Array<{ messages: unknown[] }>;
  const violations = report.reduce((sum, file) => sum + file.messages.length, 0);
  assert.ok(
    violations <= BASE_VIOLATIONS,
    `quotaCache.ts has ${violations} complexity violations, base allows ${BASE_VIOLATIONS}`
  );
});
