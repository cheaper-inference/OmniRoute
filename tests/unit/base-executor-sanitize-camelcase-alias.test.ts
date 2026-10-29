import { test, after, beforeEach } from "node:test";
import assert from "node:assert/strict";

const { sanitizeReasoningEffortForProvider, readBodyReasoningEffort, writeBodyReasoningEffort } =
  await import("../../open-sse/executors/base/reasoningEffort.ts");
const { recordLearnedReasoningEffort, __test_resetLearnedReasoningEffortCaps } =
  await import("../../open-sse/services/learnedReasoningEffortCaps.ts");

beforeEach(() => {
  __test_resetLearnedReasoningEffortCaps();
});

after(() => {
  __test_resetLearnedReasoningEffortCaps();
});

test("paired effort spellings pass through without the camel-case spelling", () => {
  const body = { reasoning_effort: "xhigh", reasoningEffort: "xhigh", messages: [] };
  const out = sanitizeReasoningEffortForProvider(body, "openai", "gpt-4o") as Record<
    string,
    unknown
  >;
  assert.equal(out.reasoning_effort, "xhigh");
  assert.equal(Object.prototype.hasOwnProperty.call(out, "reasoningEffort"), false);
});

test("camel-case-only effort is carried on the canonical field", () => {
  const body = { reasoningEffort: "high", messages: [] };
  const out = sanitizeReasoningEffortForProvider(body, "openai", "gpt-4o") as Record<
    string,
    unknown
  >;
  assert.equal(out.reasoning_effort, "high");
  assert.equal(Object.prototype.hasOwnProperty.call(out, "reasoningEffort"), false);
});

test("learned tier upgrade keeps a single canonical effort field", () => {
  try {
    recordLearnedReasoningEffort("effortprobe", "effortprobe-high-only", ["xhigh"]);
    const body = { reasoning_effort: "high", reasoningEffort: "high", messages: [] };
    const out = sanitizeReasoningEffortForProvider(
      body,
      "effortprobe",
      "effortprobe-high-only"
    ) as Record<string, unknown>;
    assert.equal(out.reasoning_effort, "xhigh");
    assert.equal(Object.prototype.hasOwnProperty.call(out, "reasoningEffort"), false);
  } finally {
    __test_resetLearnedReasoningEffortCaps();
  }
});

test("top tier alias pair resolves to a single canonical ceiling value", () => {
  const body = { reasoning_effort: "max", reasoningEffort: "max", messages: [] };
  const out = sanitizeReasoningEffortForProvider(body, "openai", "muse-spark-1.2") as Record<
    string,
    unknown
  >;
  assert.equal(out.reasoning_effort, "xhigh");
  assert.equal(Object.prototype.hasOwnProperty.call(out, "reasoningEffort"), false);
});

test("canonical spelling wins when both spellings disagree", () => {
  const body = { reasoning_effort: "low", reasoningEffort: "high", messages: [] };
  const out = sanitizeReasoningEffortForProvider(body, "openai", "gpt-4o") as Record<
    string,
    unknown
  >;
  assert.equal(out.reasoning_effort, "low");
  assert.equal(Object.prototype.hasOwnProperty.call(out, "reasoningEffort"), false);
});

test("non-string camel-case effort is dropped without promotion", () => {
  for (const camel of [42, null]) {
    const body = { reasoning_effort: "high", reasoningEffort: camel, messages: [] };
    const out = sanitizeReasoningEffortForProvider(body, "openai", "gpt-4o") as Record<
      string,
      unknown
    >;
    assert.equal(out.reasoning_effort, "high");
    assert.equal(Object.prototype.hasOwnProperty.call(out, "reasoningEffort"), false);
  }
});

test("body writer drops the camel-case spelling when writing the effort", () => {
  const out = writeBodyReasoningEffort({ reasoningEffort: "high", messages: [] }, "high") as Record<
    string,
    unknown
  >;
  assert.equal(out.reasoning_effort, "high");
  assert.equal(Object.prototype.hasOwnProperty.call(out, "reasoningEffort"), false);
});

test("body reader sees the camel-case spelling as an effort carrier", () => {
  assert.equal(readBodyReasoningEffort({ reasoningEffort: "high", messages: [] }), "high");
});

test("undefined alias leaves the written body without any effort field", () => {
  const out = writeBodyReasoningEffort({ reasoningEffort: undefined }, "high") as Record<
    string,
    unknown
  >;
  assert.equal(Object.prototype.hasOwnProperty.call(out, "reasoningEffort"), false);
  assert.equal(Object.prototype.hasOwnProperty.call(out, "reasoning_effort"), false);
});
