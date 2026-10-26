import test from "node:test";
import assert from "node:assert/strict";

import { getExecutor } from "../../open-sse/executors/index.ts";

test("DefaultExecutor rewrites stream: false to stream: true for forceStream providers (#18007)", async () => {
  const executor = await getExecutor("workbuddy");
  const body = {
    model: "kimi-k3",
    stream: false,
    messages: [{ role: "user", content: "hi" }],
  };
  const transformed = (await executor.transformRequest("kimi-k3", body, true, {
    apiKey: "test-key",
    providerSpecificData: {},
  })) as Record<string, unknown>;

  assert.equal(transformed.stream, true);
  assert.deepEqual(transformed.stream_options, { include_usage: true });
});

test("DefaultExecutor sets stream: true even when disableStreamOptions is set for forceStream provider (#18007)", async () => {
  const executor = await getExecutor("workbuddy");
  const body = {
    model: "kimi-k3",
    stream: false,
    messages: [{ role: "user", content: "hi" }],
  };
  const transformed = (await executor.transformRequest("kimi-k3", body, true, {
    apiKey: "test-key",
    providerSpecificData: { disableStreamOptions: true },
  })) as Record<string, unknown>;

  assert.equal(transformed.stream, true);
  assert.equal(transformed.stream_options, undefined);
});

test("DefaultExecutor leaves stream: false untouched for non-forceStream providers (#18007)", async () => {
  const executor = await getExecutor("openai");
  const body = {
    model: "gpt-4o",
    stream: false,
    messages: [{ role: "user", content: "hi" }],
  };
  const transformed = (await executor.transformRequest("gpt-4o", body, true, {
    apiKey: "test-key",
    providerSpecificData: {},
  })) as Record<string, unknown>;

  assert.equal(transformed.stream, false);
});
