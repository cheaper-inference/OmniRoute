import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import path from "node:path";
import test from "node:test";

import { CURATED_SKILLS } from "../../src/shared/constants/agentSkills.ts";
import {
  agentInstructionFiles,
  buildChecks,
  makeInstructionCountFreeValidator,
} from "../../scripts/check/check-docs-counts-sync.mjs";
import { loadFactsSnapshot } from "../../scripts/release/facts.mjs";

const ROOT = path.resolve(import.meta.dirname, "../..");

// Skill descriptions and the generated skills are agent-instruction surfaces (plan 2026-11-13,
// phase 2): they used to state the provider total ("393-provider catalog"), every provider PR
// rewrote it, and between releases it was stale by design. They now carry no count at all —
// agents read counts with `npm run facts`. What this test guarded (a skill must never state a
// WRONG provider count) still holds, more strictly: it states none, and the counts gate's
// "No derived counts (agent-instruction file …)" invariant fails any PR that adds one back.

type Verdict = { ok: boolean; detail: string };
type Check = {
  label: string;
  scope: string;
  strict: boolean;
  files: string[];
  validate?: (content: string) => Verdict;
};

const countFree = makeInstructionCountFreeValidator as (file: string) => (c: string) => Verdict;
const instructionFiles = agentInstructionFiles as () => string[];

// Any number in front of "provider(s)" — wider than the gate's 3-4 digit aggregate pattern, so a
// shortened or approximate count ("390+ providers", "1,000 providers") is caught here too.
// Lower-case on purpose: "`503 Provider circuit open`" is an HTTP status line, not a count.
function providerCounts(text: string): string[] {
  return [...text.matchAll(/\b\d[\d,.]*\+?(?:-|\s+)(?:LLM\s+|AI\s+)?providers?\b/g)]
    .map((m) => m[0])
    .filter((claim) => !/^1\s/.test(claim)); // "1 provider" is a unit, not a total
}

test("the provider-count probe still sees the phrasings a count took", () => {
  // Guards the probe itself, or the two tests below would pass vacuously.
  for (const text of [
    "OmniRoute's 393-provider catalog",
    "One key, 393 providers,",
    "across 390+ providers",
    "1,000 LLM providers",
  ]) {
    assert.equal(providerCounts(text).length, 1, text);
  }
  assert.deepEqual(providerCounts("- `503 Provider circuit open` → retry"), []);
});

test("no curated agent-skill description states a provider count", () => {
  assert.ok(CURATED_SKILLS.length >= 20, "the curated skill list must not be empty");
  const offenders = CURATED_SKILLS.flatMap((skill) =>
    providerCounts(skill.description ?? "").map((c) => `${skill.id}: "${c}"`)
  );
  assert.deepEqual(offenders, [], `descriptions must stay count-free: ${offenders.join(", ")}`);
});

test("the generated skill files state no provider count", () => {
  // Generated from CURATED_SKILLS, but the count also appeared in body text and in the curated
  // custom blocks the description test above cannot see.
  const generated = ["skills/omni-providers/SKILL.md", "skills/omni-auth/SKILL.md"];
  const offenders = generated.flatMap((rel) =>
    providerCounts(readFileSync(path.join(ROOT, rel), "utf8")).map((c) => `${rel}: "${c}"`)
  );
  assert.deepEqual(offenders, [], `generated skills must stay count-free: ${offenders.join(", ")}`);
});

test("the counts gate guards agentSkills.ts and every skill as an instruction surface", () => {
  const files = instructionFiles();
  for (const rel of [
    "src/shared/constants/agentSkills.ts",
    "skills/README.md",
    "skills/omni-providers/SKILL.md",
    "skills/omni-auth/SKILL.md",
    "skills/omni-mcp/SKILL.md",
    "skills/omni-combos-routing/SKILL.md",
  ]) {
    assert.ok(files.includes(rel), `${rel} is not guarded as an agent-instruction file`);
  }
  const snapshot = loadFactsSnapshot();
  assert.ok(snapshot, "docs/reference/derived-facts.json is missing");
  const checks = (buildChecks({ facts: snapshot }) as Check[]).filter((c) =>
    c.label.startsWith("No derived counts (agent-instruction file ")
  );
  const guarded = new Set(checks.flatMap((c) => c.files));
  assert.ok(guarded.has("src/shared/constants/agentSkills.ts"));
  for (const c of checks) {
    assert.equal(c.scope, "invariant", `${c.label} must run in both modes`);
    assert.equal(c.strict, true, `${c.label} must be STRICT`);
  }
});

test("the instruction-surface invariant rejects a provider count in a skill description", () => {
  const validate = countFree("src/shared/constants/agentSkills.ts");
  const ok = `description: "Manage provider connections across OmniRoute's provider catalog."`;
  assert.equal(validate(ok).ok, true, validate(ok).detail);
  for (const stale of [
    `description: "Manage provider connections across OmniRoute's 393-provider catalog."`,
    `description: "One key, 394 providers, auto-fallback."`,
    `description: "Connect to the OmniRoute MCP server (110 tools) across 33 scopes."`,
    `description: "Create and manage routing combos with 21 strategies."`,
  ]) {
    const verdict = validate(stale);
    assert.equal(verdict.ok, false, `must reject: ${stale}`);
    assert.match(verdict.detail, /npm run facts/);
  }
});

test("the committed skill sources pass the instruction-surface invariant", () => {
  for (const rel of [
    "src/shared/constants/agentSkills.ts",
    "skills/omni-providers/SKILL.md",
    "skills/omni-auth/SKILL.md",
  ]) {
    const verdict = countFree(rel)(readFileSync(path.join(ROOT, rel), "utf8"));
    assert.equal(verdict.ok, true, `${rel}: ${verdict.detail}`);
  }
});
