import { describe, it } from "node:test";
import assert from "node:assert/strict";

// #13700 — the concurrency fields copied onto selected credentials (auth.ts
// materializeConnection + the optional no-auth key path) come from one helper.
const { buildConnectionConcurrencyFields } =
  await import("../../src/sse/services/connectionConcurrencyFields.ts");
const { toProviderConnection } = await import("../../src/lib/db/providers/lazyConnectionView.ts");

describe("buildConnectionConcurrencyFields", () => {
  it("clears a stale fresh-session threshold when credentials rotate", () => {
    const previous = buildConnectionConcurrencyFields(
      toProviderConnection({
        id: "old",
        provider: "openai",
        rateLimitOverrides: { newSessionMaxConcurrent: 2 },
      })
    );
    assert.equal(previous.newSessionMaxConcurrent, 2);
    Object.assign(
      previous,
      buildConnectionConcurrencyFields(toProviderConnection({ id: "next", provider: "openai" }))
    );
    assert.equal(previous.newSessionMaxConcurrent, null);
  });
  it("propagates account caps and the normalized per-model map", () => {
    const view = toProviderConnection({
      id: "c1",
      provider: "glm",
      maxConcurrent: 4,
      rateLimitOverrides: { maxConcurrent: 2, modelConcurrency: { "glm-5": 1, "glm-4.7": 3 } },
    });
    assert.deepEqual(buildConnectionConcurrencyFields(view), {
      maxConcurrent: 4,
      rateLimitMaxConcurrent: 2,
      modelConcurrency: { "glm-5": 1, "glm-4.7": 3 },
      newSessionMaxConcurrent: null,
    });
  });

  it("fails open to null for a missing or malformed per-model map", () => {
    const missing = toProviderConnection({ id: "c2", provider: "glm" });
    assert.deepEqual(buildConnectionConcurrencyFields(missing), {
      maxConcurrent: null,
      rateLimitMaxConcurrent: null,
      modelConcurrency: null,
      newSessionMaxConcurrent: null,
    });
    const malformed = toProviderConnection({
      id: "c3",
      provider: "glm",
      rateLimitOverrides: { modelConcurrency: { "glm-5": 0, "": 2, other: "x" } },
    });
    assert.equal(buildConnectionConcurrencyFields(malformed).modelConcurrency, null);
  });
});
