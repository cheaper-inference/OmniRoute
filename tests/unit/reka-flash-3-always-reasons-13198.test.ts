import test from "node:test";
import assert from "node:assert/strict";

import { DefaultExecutor } from "../../open-sse/executors/default.ts";

// #13198: reka-flash-3 reasons on every request. #14888 keeps a budget the
// caller set; the declared max (#17971) only fills in when the caller omitted one.

test("#14888 reka-flash-3 keeps a caller-supplied max_tokens", () => {
  const executor = new DefaultExecutor("reka");
  const body = { model: "reka-flash-3", max_tokens: 256 } as Record<string, unknown>;
  executor.ensureThinkingBudget(body, "reka-flash-3");
  assert.equal(body.max_tokens, 256);
});

test("#13198 reka-flash-3 still gets its declared max when the caller omitted max_tokens", () => {
  const executor = new DefaultExecutor("reka");
  const body = { model: "reka-flash-3" } as Record<string, unknown>;
  executor.ensureThinkingBudget(body, "reka-flash-3");
  assert.equal(body.max_tokens, 8192);
});

test("#13198 non-reasoning reka models keep the caller's max_tokens", () => {
  const executor = new DefaultExecutor("reka");
  const body = { model: "reka-flash", max_tokens: 256 } as Record<string, unknown>;
  executor.ensureThinkingBudget(body, "reka-flash");
  assert.equal(body.max_tokens, 256);
});
