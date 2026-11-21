// A start timeout above 2^31-1 ms overflows setTimeout: Node fires it after ~1 ms.
// The configured value (for example FETCH_TIMEOUT_MS=3000000000) must be clamped, not wrapped.
import test from "node:test";
import assert from "node:assert/strict";

import { executeWithUpstreamStartTimeout } from "../../open-sse/handlers/chatCore/upstreamTimeouts.ts";

test("start timeout above 2^31-1 ms does not fire at once", async () => {
  const result = await executeWithUpstreamStartTimeout({
    executor: { getTimeoutMs: () => 3_000_000_000 },
    provider: "openai",
    model: "gpt-4o",
    signal: new AbortController().signal,
    execute: async () => {
      await new Promise((resolve) => setTimeout(resolve, 150));
      return "late response";
    },
  });
  assert.equal(result, "late response");
});

test("a start timeout inside the timer range still fires", async () => {
  await assert.rejects(
    executeWithUpstreamStartTimeout({
      executor: { getTimeoutMs: () => 40 },
      provider: "openai",
      model: "gpt-4o",
      signal: new AbortController().signal,
      execute: (signal) =>
        new Promise((_resolve, reject) => {
          signal.addEventListener("abort", () => reject(signal.reason), { once: true });
        }),
    }),
    /did not return response headers after 40ms/
  );
});
