import assert from "node:assert/strict";
import test from "node:test";

import type { ComboLike } from "../../open-sse/services/combo/types.ts";
import { handleComboChat } from "../../open-sse/services/combo.ts";
import { createCombo, getComboByName, updateCombo } from "../../src/lib/db/combos.ts";
import { resetDbInstance } from "../../src/lib/db/core.ts";
import { createProviderConnection } from "../../src/lib/db/providers.ts";
import { createComboSchema, updateComboSchema } from "../../src/shared/validation/schemas/combo.ts";

const defaultInstructions =
  "Which of these configured models is the most appropriate for this request?";
const log = { info() {}, warn() {}, debug() {}, error() {} };

test.after(resetDbInstance);

test("combo saves trim Jev instructions, allow clearing them, and reject invalid values", async () => {
  const input = {
    name: "jev-config-roundtrip",
    strategy: "jev",
    models: ["openai/gpt-4.1", "anthropic/claude-3"],
    config: { jevInstructions: "  Prefer the faster model.\n" },
  };
  const created = await createCombo(createComboSchema.parse(input));
  assert.ok(typeof created.id === "string");
  assert.deepEqual((await getComboByName(input.name))?.config, {
    jevInstructions: "Prefer the faster model.",
  });

  await updateCombo(created.id, updateComboSchema.parse({ config: { jevInstructions: " \n\t " } }));
  assert.deepEqual((await getComboByName(input.name))?.config, { jevInstructions: "" });

  for (const jevInstructions of [null, 42, { text: "invalid" }, "a".repeat(4001)]) {
    const config = { jevInstructions };
    assert.equal(createComboSchema.safeParse({ ...input, config }).success, false);
    assert.equal(updateComboSchema.safeParse({ config }).success, false);
  }
});

test("Jev sends each combo's own instructions, with candidates restricted to its configured targets", async (t) => {
  const originalFlag = process.env.COMBO_JEV_STRATEGY_ENABLED;
  process.env.COMBO_JEV_STRATEGY_ENABLED = "true";
  t.after(() => {
    if (originalFlag === undefined) delete process.env.COMBO_JEV_STRATEGY_ENABLED;
    else process.env.COMBO_JEV_STRATEGY_ENABLED = originalFlag;
  });
  await createProviderConnection({
    provider: "typesafe",
    authType: "apikey",
    apiKey: "ts-test-key",
    name: "jev-instructions-typesafe",
    isActive: true,
    testStatus: "active",
  });

  const questions: Array<{ instructions: string; criteria: Record<string, string> }> = [];
  t.mock.method(globalThis, "fetch", async (input: RequestInfo | URL, init?: RequestInit) => {
    assert.equal(new URL(String(input)).pathname, "/v1/systemone");
    const request = JSON.parse(String(init?.body));
    assert.equal(request.state, "Rename a local variable");
    const question = request.questions.route;
    questions.push({ instructions: question.instructions, criteria: question.criteria });
    const choice = Object.values(question.criteria).includes("Jev child")
      ? "jev-option-2"
      : "outside/the-combo";
    return Response.json({
      answers: {
        route: {
          type: "choice",
          choice,
          confidence: 0.95,
          probabilities: { "jev-option-1": 0.05, "jev-option-2": 0.95 },
        },
      },
    });
  });

  const child: ComboLike = {
    name: "jev-instructions-child",
    strategy: "jev",
    models: ["openai/gpt-4.1", "anthropic/claude-3"],
    config: {
      disableSessionStickiness: true,
      jevInstructions: "  Prefer openai/gpt-4.1 for quick edits.\n",
    },
  };
  const parent: ComboLike = {
    name: "jev-instructions-parent",
    strategy: "jev",
    models: ["openai/gpt-4o", { kind: "combo-ref", comboName: child.name, label: "Jev child" }],
    config: {
      disableSessionStickiness: true,
      jevInstructions: "Use the Jev child for edits.\nPrefer gpt-4o for other tasks.",
    },
  };

  const dispatched: string[] = [];
  async function run(combo: ComboLike) {
    const response = await handleComboChat({
      combo,
      allCombos: [parent, child],
      body: { messages: [{ role: "user", content: "Rename a local variable" }] },
      settings: { comboDefaults: { jevInstructions: "Do not inherit global instructions." } },
      log,
      isModelAvailable: async () => true,
      handleSingleModel: async (_body, model) => {
        dispatched.push(model);
        return Response.json({ choices: [{ message: { content: "ok" } }] });
      },
    });
    assert.equal(response.status, 200);
  }

  await run(parent);
  await run(child);
  const defaultCases = [undefined, "", " \n\t ", 42, "a".repeat(4001)];
  for (const jevInstructions of defaultCases) {
    await run({
      ...child,
      name: "jev-instructions-default",
      config: { ...child.config, jevInstructions },
    });
  }

  const childCriteria = { "jev-option-1": "openai/gpt-4.1", "jev-option-2": "anthropic/claude-3" };
  assert.deepEqual(questions, [
    {
      instructions: "Use the Jev child for edits.\nPrefer gpt-4o for other tasks.",
      criteria: { "jev-option-1": "openai/gpt-4o", "jev-option-2": "Jev child" },
    },
    { instructions: "Prefer openai/gpt-4.1 for quick edits.", criteria: childCriteria },
    { instructions: "Prefer openai/gpt-4.1 for quick edits.", criteria: childCriteria },
    ...defaultCases.map(() => ({ instructions: defaultInstructions, criteria: childCriteria })),
  ]);
  assert.deepEqual(
    dispatched,
    Array.from({ length: 2 + defaultCases.length }, () => "openai/gpt-4.1")
  );
});
