import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import path from "node:path";
import test from "node:test";

import { CURATED_SKILLS } from "../../src/shared/constants/agentSkills.ts";
import { buildChecks, tallyDrift } from "../../scripts/check/check-docs-counts-sync.mjs";
import { loadFactsSnapshot } from "../../scripts/release/facts.mjs";

const ROOT = path.resolve(import.meta.dirname, "../..");

// The provider count in skill descriptions is a DERIVED number: feature PRs no longer write it,
// `npm run release:refresh-derived` rewrites it from the live provider modules and records the
// same value in docs/reference/derived-facts.json. Between releases the live modules move ahead
// of the text by design, so the tree is judged against the snapshot (written in the same refresh
// as the text), never against the live modules. Whether the refresh itself writes the live value
// is proven by "the release refresh closes the cycle" in check-docs-counts-sync.test.ts.
type Facts = { providers: number } & Record<string, unknown>;
type Check = {
  label: string;
  actual: unknown;
  docKey: string;
  strict: boolean;
  files: string[];
  validate?: (content: string) => { ok: boolean; detail: string };
};

const snapshot = loadFactsSnapshot() as Facts | null;
assert.ok(
  snapshot,
  "docs/reference/derived-facts.json is missing — run npm run release:refresh-derived"
);
const SNAPSHOT_PROVIDERS = snapshot.providers;

function providerClaims(text: string): string[] {
  const claims: string[] = [];
  for (const match of text.matchAll(/\b(\d+)-(?:provider|providers)\b/gi)) claims.push(match[0]);
  for (const match of text.matchAll(/\b(\d+)\s+providers\b/gi)) claims.push(match[0]);
  return claims;
}

function offendersIn(label: string, text: string, expected: number): string[] {
  return providerClaims(text)
    .filter((claim) => Number(claim.match(/\d+/)?.[0]) !== expected)
    .map((claim) => `${label}: "${claim}"`);
}

test("the snapshot carries a plausible provider count", () => {
  // Guards the asserts below: a zero or missing count would make them pass vacuously.
  assert.ok(
    Number.isInteger(SNAPSHOT_PROVIDERS) && SNAPSHOT_PROVIDERS >= 300,
    `snapshot providers must be an integer >= 300, got ${SNAPSHOT_PROVIDERS}`
  );
});

test("every agent-skill description states the snapshot provider count", () => {
  const offenders = CURATED_SKILLS.flatMap((skill) =>
    offendersIn(skill.id, skill.description ?? "", SNAPSHOT_PROVIDERS)
  );
  assert.deepEqual(
    offenders,
    [],
    `description must say ${SNAPSHOT_PROVIDERS} providers (derived-facts.json), found: ${offenders.join(", ")}`
  );
});

test("the generated skill files state the snapshot provider count", () => {
  // These are generated from CURATED_SKILLS, but the count also appears in body text
  // the generator templates out, which the description test above cannot see.
  const generated = ["skills/omni-providers/SKILL.md", "skills/omni-auth/SKILL.md"];
  const offenders = generated.flatMap((rel) =>
    offendersIn(rel, readFileSync(path.join(ROOT, rel), "utf8"), SNAPSHOT_PROVIDERS)
  );
  assert.deepEqual(
    offenders,
    [],
    `generated skills must say ${SNAPSHOT_PROVIDERS} providers (derived-facts.json), found: ${offenders.join(", ")}`
  );
});

// Release mode with injected facts: the gate that guards agentSkills.ts and the generated skills
// (the "secondary docs and skills" provider check) rejects a count that disagrees with the facts
// and accepts the right one. This is what keeps the strict comparison alive once the live count
// moves: the release refresh runs this gate against the live facts.
const SKILL_FILES = [
  "src/shared/constants/agentSkills.ts",
  "skills/omni-providers/SKILL.md",
  "skills/omni-auth/SKILL.md",
];

function skillsCheck(facts: Facts): Check {
  const checks = buildChecks({ facts }) as Check[];
  const check = checks.find(
    (c) => c.docKey === "providers" && SKILL_FILES.every((f) => c.files.includes(f))
  );
  assert.ok(check, "the counts gate no longer covers agentSkills.ts and the generated skills");
  assert.equal(check.strict, true, "the skills provider-count check must be STRICT");
  return check;
}

function tallyFor(check: Check, file: string, content: string) {
  return tallyDrift([{ ...check, files: [file] }], (f: string) => (f === file ? content : null));
}

test("release mode rejects a skill description whose count disagrees with the facts", () => {
  const live = {
    ...snapshot,
    providers: SNAPSHOT_PROVIDERS + 7,
    providerReferenceTotal: SNAPSHOT_PROVIDERS + 7,
  };
  const check = skillsCheck(live);
  const stale = `description: "Route across ${SNAPSHOT_PROVIDERS} providers"`;
  const fresh = `description: "Route across ${SNAPSHOT_PROVIDERS + 7} providers"`;
  assert.equal(
    tallyFor(check, SKILL_FILES[0], stale).strict,
    1,
    "stale count must be STRICT drift"
  );
  assert.equal(tallyFor(check, SKILL_FILES[0], fresh).strict, 0, "the facts' count must pass");
});

test("the committed skill sources pass the gate under the snapshot facts", () => {
  const check = skillsCheck(snapshot);
  for (const rel of SKILL_FILES) {
    const r = tallyFor(check, rel, readFileSync(path.join(ROOT, rel), "utf8"));
    assert.equal(r.strict, 0, `${rel} drifts from derived-facts.json:\n${r.lines.join("\n")}`);
  }
});
