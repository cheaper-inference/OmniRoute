/**
 * #18838: a chat-style dispatch to a native decision provider is refused with a 400 that names
 * the endpoint to call, before any upstream request.
 */
import test from "node:test";
import assert from "node:assert/strict";

import { DefaultExecutor } from "../../open-sse/executors/default.ts";

type ExecuteArgs = Parameters<DefaultExecutor["execute"]>[0];

function chatInput(providerSpecificData: Record<string, unknown> = {}): ExecuteArgs {
  return {
    model: "julia-1",
    body: { model: "julia-1", messages: [{ role: "user", content: "hi" }] },
    stream: false,
    credentials: { apiKey: "test", providerSpecificData },
  } as unknown as ExecuteArgs;
}

async function refusal(executor: DefaultExecutor, input: ExecuteArgs) {
  const originalFetch = globalThis.fetch;
  let fetched = false;
  globalThis.fetch = (async () => {
    fetched = true;
    throw new Error("upstream must not be called");
  }) as typeof fetch;
  try {
    const result = (await executor.execute(input)) as { response: Response };
    assert.equal(fetched, false);
    assert.equal(result.response.status, 400);
    return (await result.response.json()) as {
      error: { message: string; type: string; code: string };
    };
  } finally {
    globalThis.fetch = originalFetch;
  }
}

test("a registry System One provider is refused with POST /v1/systemone", async () => {
  const body = await refusal(new DefaultExecutor("supersoniclabs"), chatInput());
  assert.equal(body.error.type, "invalid_request_error");
  assert.equal(body.error.code, "native_endpoint_required");
  assert.match(body.error.message, /POST \/v1\/systemone/);
});

test("a connection whose apiType is decisions is refused with POST /v1/decisions", async () => {
  const body = await refusal(
    new DefaultExecutor("openai-compatible-decision-node"),
    chatInput({ apiType: "decisions" })
  );
  assert.equal(body.error.type, "invalid_request_error");
  assert.equal(body.error.code, "native_endpoint_required");
  assert.match(body.error.message, /POST \/v1\/decisions/);
});

test("a decisions connection wins over a System One registry format", async () => {
  const body = await refusal(
    new DefaultExecutor("supersoniclabs"),
    chatInput({ apiType: "decisions" })
  );
  assert.match(body.error.message, /POST \/v1\/decisions/);
});
