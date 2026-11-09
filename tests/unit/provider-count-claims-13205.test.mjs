import assert from "node:assert/strict";
import test from "node:test";
import {
  __resetSpawnSyncForTest,
  __setSpawnSyncForTest,
  buildChecks,
  tallyDrift,
} from "../../scripts/check/check-docs-counts-sync.mjs";

// Isolate provider prose validation from the unrelated runtime-facts subprocess.
__setSpawnSyncForTest(() => ({ status: 1, stdout: "" }));
const checks = buildChecks();
const check = checks.find((entry) => entry.label === "Provider count");
__resetSpawnSyncForTest();
assert.ok(check);
const expected = check.actual;
const evaluate = (content) => tallyDrift([{ ...check, files: ["README.md"] }], () => content);

for (const stale of [
  "355 providers",
  "**352-provider catalog**",
  "327 AI Providers",
  "329 registered providers",
  "**358** LLM providers",
]) {
  test(`rejects mixed current and stale aggregate claims: ${stale}`, () => {
    assert.equal(evaluate(`${expected} providers. Also: ${stale}.`).strict, 1);
  });
}

test("checks all reported documentation and skill surfaces", () => {
  for (const file of [
    "docs/architecture/ARCHITECTURE.md",
    "docs/architecture/CODEBASE_DOCUMENTATION.md",
    "docs/architecture/REPOSITORY_MAP.md",
    "docs/frameworks/A2A-SERVER.md",
    "docs/frameworks/ACP.md",
    "docs/frameworks/AGENTBRIDGE.md",
    "docs/frameworks/OPEN_SSE_ARCHITECTURE.md",
    "docs/getting-started/FREE-TIERS-GUIDE.md",
    "docs/comparison/OMNIROUTE_VS_ALTERNATIVES.md",
    "docs/guides/FREE_PROVIDER_RANKINGS.md",
    "src/shared/constants/agentSkills.ts",
    "skills/README.md",
    "skills/omni-auth/SKILL.md",
    "skills/omni-providers/SKILL.md",
  ]) {
    assert.ok(
      checks.some((entry) => entry.docKey === "providers" && entry.files.includes(file)),
      `provider-count gate must cover ${file}`
    );
  }
});

test("accepts current aggregate claims with distinct free-tier denominators", () => {
  const text = `${expected} AI providers; 154 catalog-marked free providers, 34 provider pools, 444 per-model rows, 100+ providers in an example.`;
  assert.equal(evaluate(text).strict, 0);
});

test("a matching unrelated number cannot hide a missing provider claim", () => {
  assert.equal(evaluate(`There are ${expected} test cases.`).strict, 1);
});

test("preserves the distinct chat-model registry denominator", () => {
  const text = `${expected} registered providers. The chat model registry covers **237 providers / 3,009 provider-model pairs**.`;
  assert.equal(evaluate(text).strict, 0);
});

test("preserves explicitly versioned historical catalog snapshots", () => {
  const text = `${expected} providers. A sample of the 351 registered providers in\n> OmniRoute v3.8.0.`;
  assert.equal(evaluate(text).strict, 0);
});
