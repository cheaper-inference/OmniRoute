import test from "node:test";
import assert from "node:assert/strict";

// PRD-2026-06-19: per-request opt-out of memory/skills injection via the
// `x-omniroute-no-memory` header (mirrors `x-omniroute-no-cache`).
const { isNoMemoryRequested, getHeaderValueCaseInsensitive } =
  await import("../../open-sse/handlers/chatCore/headers.ts");

test("isNoMemoryRequested is true for truthy header values (plain object)", () => {
  for (const v of ["true", "1", "yes", "TRUE", "Yes", " true "]) {
    assert.equal(
      isNoMemoryRequested({ "x-omniroute-no-memory": v }),
      true,
      `expected true for ${JSON.stringify(v)}`
    );
  }
});

test("isNoMemoryRequested is case-insensitive on the header NAME", () => {
  assert.equal(isNoMemoryRequested({ "X-OmniRoute-No-Memory": "true" }), true);
});

test("isNoMemoryRequested works with a Headers instance", () => {
  const h = new Headers();
  h.set("x-omniroute-no-memory", "1");
  assert.equal(isNoMemoryRequested(h), true);
});

test("isNoMemoryRequested is false when the header is absent / empty / falsy", () => {
  assert.equal(isNoMemoryRequested(null), false);
  assert.equal(isNoMemoryRequested(undefined), false);
  assert.equal(isNoMemoryRequested({}), false);
  assert.equal(isNoMemoryRequested({ "x-omniroute-no-memory": "" }), false);
  assert.equal(isNoMemoryRequested({ "x-omniroute-no-memory": "false" }), false);
  assert.equal(isNoMemoryRequested({ "x-omniroute-no-memory": "0" }), false);
  assert.equal(isNoMemoryRequested({ "x-omniroute-no-memory": "no" }), false);
});

test("getHeaderValueCaseInsensitive still resolves the header (sanity)", () => {
  assert.equal(
    getHeaderValueCaseInsensitive({ "x-omniroute-no-memory": "true" }, "x-omniroute-no-memory"),
    "true"
  );
});

test("resolveRequestMemoryOwnerId drops the owner for the header and for classifier turns", async () => {
  const { resolveRequestMemoryOwnerId } =
    await import("../../open-sse/handlers/chatCore/memoryExtraction.ts");
  const apiKeyInfo = { id: "key-1" };
  const classifierBody = {
    system: "You are a security monitor for autonomous AI coding agents.",
    messages: [{ role: "user", content: "hello" }],
  };
  const ordinaryBody = { system: "You are helpful.", messages: [] };
  const resolve = (headers, sourceFormat, body) =>
    resolveRequestMemoryOwnerId({ apiKeyInfo, headers, sourceFormat, body });

  assert.equal(resolve({}, "claude", ordinaryBody), "key-1");
  assert.equal(resolve({ "x-omniroute-no-memory": "true" }, "claude", ordinaryBody), null);
  assert.equal(resolve({}, "claude", classifierBody), null);
  // The marker only identifies the classifier on the Claude wire format.
  assert.equal(resolve({}, "openai", classifierBody), "key-1");
});
