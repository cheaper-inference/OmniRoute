import assert from "node:assert/strict";
import test from "node:test";
import { resolveSystemOneTarget } from "../../open-sse/config/systemOneRegistry.ts";
import { validateSystemOneBackendBody } from "../../open-sse/handlers/systemOneValidation.ts";
import { v1SystemOneSchema } from "../../src/shared/validation/schemas/apiV1.ts";

const body = {
  model: "typesafe/jev-latest",
  state: { ticket: "Help" },
  questions: { urgent: { type: "noul", instructions: null } },
};

test("decision routing splits the actual proxy prefix once, preserving upstream aliases", () => {
  for (const [input, provider, model] of [
    ["typesafe/jev-latest", "typesafe", "jev-latest"],
    ["openrouter/typesafe/jev-latest", "openrouter", "typesafe/jev-latest"],
    ["openrouter/inception/mercury-decide:free", "openrouter", "inception/mercury-decide:free"],
    ["openrouter/~typesafe/jev-latest", "openrouter", "~typesafe/jev-latest"],
    ["ollama-local/clef-flash", "ollama-local", "clef-flash"],
    ["jev-latest", "openrouter", "typesafe/jev-latest"],
  ]) {
    const target = resolveSystemOneTarget(input);
    assert.equal(target.provider, provider);
    assert.equal(target.model, model);
    assert.equal(target.canonicalModel, `${provider}/${model.replace(/^~/, "")}`);
  }
  assert.throws(
    () => resolveSystemOneTarget("inception/mercury-decide:free"),
    /openrouter\/inception/
  );
  assert.throws(() => resolveSystemOneTarget("openai/jev-latest"), /does not support System One/);
  assert.throws(() => resolveSystemOneTarget("typesafe/"), /model/);
});

test("common typed questions accept optional and structured instructions, not unknown types", () => {
  assert.equal(v1SystemOneSchema.safeParse(body).success, true);
  assert.equal(
    v1SystemOneSchema.safeParse({ ...body, questions: { q: { type: "noul" } } }).success,
    true
  );
  assert.equal(v1SystemOneSchema.safeParse({ ...body, state: null }).success, false);
  assert.equal(v1SystemOneSchema.safeParse({ ...body, questions: {} }).success, false);
  assert.equal(
    v1SystemOneSchema.safeParse({ ...body, questions: { q: { type: "chat" } } }).success,
    false
  );
});

test("native Score limits do not reject Ollama's 26 levels", () => {
  const raw = {
    ...body,
    questions: { q: { type: "score", instructions: "Rate", criteria: Array(26).fill("level") } },
  };
  assert.equal(v1SystemOneSchema.safeParse(raw).success, true);
  assert.equal(validateSystemOneBackendBody("typesafe", raw).ok, false);
  assert.equal(validateSystemOneBackendBody("ollama-local", raw).ok, true);
  assert.equal(
    validateSystemOneBackendBody("ollama-local", {
      ...raw,
      questions: { q: { type: "score", criteria: Array(27).fill("level") } },
    }).ok,
    false
  );
});

test("Ollama enforces raw base64 and body caps without truncation", () => {
  assert.equal(
    validateSystemOneBackendBody("ollama-local", { ...body, images: ["aGVsbG8="] }).ok,
    true
  );
  for (const image of [
    "https://evil.test/image",
    "data:image/png;base64,aGVsbG8=",
    "not base64!",
  ]) {
    assert.equal(
      validateSystemOneBackendBody("ollama-local", { ...body, images: [image] }).ok,
      false
    );
  }
  const oversized = validateSystemOneBackendBody("ollama-local", {
    ...body,
    state: "x".repeat(65536),
  });
  assert.equal(oversized.ok, false);
  if (!oversized.ok) assert.equal(oversized.status, 413);
});
