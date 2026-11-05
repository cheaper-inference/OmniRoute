import test from "node:test";
import assert from "node:assert/strict";

const { createComboSchema, updateComboSchema, comboModelStepInputSchema } =
  await import("../../src/shared/validation/schemas/combo.ts");
const { resolveServerErrorMessage } = await import("../../src/lib/api/serverErrorMessage.ts");
const { buildComboErrorBody } = await import("../../src/lib/api/comboErrorResponse.ts");

test("createComboSchema accepts a pool with more than 50 allowed connections (e.g. 100 accounts)", () => {
  const connectionIds = Array.from({ length: 100 }, (_, i) => `conn-antigravity-${i + 1}`);
  const result = createComboSchema.safeParse({
    name: "combo-large-pool",
    models: [
      {
        model: "antigravity/claude-sonnet-4-6",
        allowedConnectionIds: connectionIds,
      },
    ],
  });

  assert.equal(result.success, true, "100 allowedConnectionIds should be valid");
});

test("updateComboSchema accepts up to 250 allowed connections for large provider pools", () => {
  const connectionIds = Array.from({ length: 250 }, (_, i) => `conn-codex-${i + 1}`);
  const result = updateComboSchema.safeParse({
    name: "combo-codex-250",
    models: [
      {
        model: "codex/gpt-6.1-sol-medium",
        allowedConnectionIds: connectionIds,
      },
    ],
  });

  assert.equal(result.success, true, "250 allowedConnectionIds should be valid");
});

test("comboModelStepInputSchema rejects when exceeding the 250 limit with a clear too_big message", () => {
  const connectionIds = Array.from({ length: 251 }, (_, i) => `conn-${i + 1}`);
  const result = comboModelStepInputSchema.safeParse({
    model: "openai/gpt-4o",
    allowedConnectionIds: connectionIds,
  });

  assert.equal(result.success, false);
  if (!result.success) {
    const issue = result.error.issues.find((iss) => iss.path.join(".") === "allowedConnectionIds");
    assert.ok(issue, "must have an issue on allowedConnectionIds");
    assert.equal(issue?.code, "too_big");
    assert.equal(issue?.maximum, 250);
  }
});

test("createComboSchema also rejects when a model step exceeds 250 connections", () => {
  const connectionIds = Array.from({ length: 251 }, (_, i) => `conn-${i + 1}`);
  const result = createComboSchema.safeParse({
    name: "combo-overflow",
    models: [
      {
        model: "openai/gpt-4o",
        allowedConnectionIds: connectionIds,
      },
    ],
  });

  assert.equal(result.success, false, "251 connections must be rejected by createComboSchema");
});

test("resolveServerErrorMessage extracts firstField and firstMessage from COMBO_002 object details", () => {
  const body = buildComboErrorBody("COMBO_002", {
    issues: {
      message: "Invalid request",
      details: [
        {
          field: "models.0.allowedConnectionIds",
          message: "Too big: expected array to have <=250 items",
        },
      ],
    },
    firstField: "models.0.allowedConnectionIds",
    firstMessage: "Too big: expected array to have <=250 items",
  });

  const msg = resolveServerErrorMessage(body, "Fallback");
  assert.equal(
    msg,
    "models.0.allowedConnectionIds: Too big: expected array to have <=250 items",
    "must extract field and specific message instead of generic 'One or more combo fields are invalid'"
  );
});

test("resolveServerErrorMessage extracts nested issues details when firstMessage is absent", () => {
  const body = {
    error: {
      code: "COMBO_002",
      message: "One or more combo fields are invalid",
      details: {
        issues: {
          details: [
            {
              field: "name",
              message: "Combo name must be at least 1 character",
            },
          ],
        },
      },
    },
  };

  const msg = resolveServerErrorMessage(body, "Fallback");
  assert.equal(msg, "name: Combo name must be at least 1 character");
});

test("combos page caller passes string error through fallback", () => {
  const err = { error: "Combo name already exists" };
  assert.equal(
    resolveServerErrorMessage(err, typeof err.error === "string" ? err.error : "Failed"),
    "Combo name already exists"
  );
});
