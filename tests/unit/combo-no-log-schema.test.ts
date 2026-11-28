import test from "node:test";
import assert from "node:assert/strict";

// The noLog flag must survive combo schema validation and combo persistence
// without changing any existing API-key or request-header behaviour.
const { createComboSchema } = await import("../../src/shared/validation/schemas/combo.ts");

test("combo schema accepts strict boolean noLog only", () => {
  const withFlag = createComboSchema.parse({
    name: "code-main",
    models: ["openai/gpt-4.1"],
    config: { noLog: true },
  });
  assert.equal(withFlag.config?.noLog, true);

  const withoutFlag = createComboSchema.parse({
    name: "code-main",
    models: ["openai/gpt-4.1"],
    config: {},
  });
  assert.equal(withoutFlag.config?.noLog, undefined);

  assert.equal(
    createComboSchema.safeParse({
      name: "bad-combo",
      models: ["openai/gpt-4.1"],
      config: { noLog: "true" },
    }).success,
    false
  );
});
