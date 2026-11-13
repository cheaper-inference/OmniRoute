// An agent picks a skill by its description. The entry skill and the main inference and routing
// skills say when to use them ("Use when ...") so a skill chooser can match a task to them.
import test from "node:test";
import assert from "node:assert/strict";

const { CURATED_SKILLS } = await import("../../src/shared/constants/agentSkills.ts");

const WITH_USE_WHEN = [
  "omni-auth",
  "omni-inference",
  "omni-models",
  "omni-providers",
  "omni-combos-routing",
];

test("entry and core skills carry a Use when sentence", () => {
  for (const id of WITH_USE_WHEN) {
    const skill = CURATED_SKILLS.find((entry: { id: string }) => entry.id === id);
    assert.ok(skill, `${id} missing from the curated list`);
    assert.match(skill.description, /\bUse when\b/, `${id} has no "Use when" sentence`);
    assert.ok(skill.description.length <= 2000, `${id} description over 2000 characters`);
  }
});

test("the omni-auth skill is named as the place to start", () => {
  const skill = CURATED_SKILLS.find((entry: { id: string }) => entry.id === "omni-auth");
  assert.match(skill.description, /\bStart here\b/);
});
