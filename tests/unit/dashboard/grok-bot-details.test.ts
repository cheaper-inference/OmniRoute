import test from "node:test";
import assert from "node:assert/strict";

const { grokBotSkills, grokBotRoutines } =
  await import("../../../src/app/(dashboard)/dashboard/grok-bot/details.ts");

test("skills keep a record that has no body", () => {
  assert.deepEqual(
    grokBotSkills({ skills: [{ id: "s", name: "search", description: "find" }] }),
    [{ id: "s", name: "search", description: "find" }]
  );
});

test("skills keep only complete records and drop the body", () => {
  const skills = grokBotSkills({
    skills: [
      { id: "s1", name: "search", description: "find", body: "secret steps", source: "user" },
      { id: "s2", name: "partial" },
    ],
  });

  assert.deepEqual(skills, [{ id: "s1", name: "search", description: "find" }]);
});

test("routines keep an id and a readable name from the record", () => {
  const routines = grokBotRoutines({
    automations: [
      { automationId: "r1", recordJson: JSON.stringify({ name: "daily" }) },
      { automationId: "r2", recordJson: "not json" },
    ],
  });

  assert.deepEqual(routines, [
    { id: "r1", name: "daily" },
    { id: "r2", name: "" },
  ]);
});
