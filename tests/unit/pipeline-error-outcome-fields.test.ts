import test from "node:test";
import assert from "node:assert/strict";

import { runProviderExecutionPipeline } from "../../open-sse/handlers/chatCore/providerExecutionPipeline.ts";

// The non-streaming leg classifies an upstream error from the pipeline's error outcome.
// The streaming leg classifies from parseUpstreamError. Both must read the same message and
// the same retry hint from the same upstream response.
type PipelineInput = Parameters<typeof runProviderExecutionPipeline>[0];

function input(provider: string, response: () => Response): PipelineInput {
  let credentials: Record<string, unknown> = { connectionId: "c1" };
  return {
    policy: { allowAccountRotation: false, allowModelFallback: false },
    target: {
      provider,
      requestedModel: "m",
      sourceFormat: "openai",
      targetFormat: "openai",
      stream: false,
    },
    connection: {
      initialConnectionId: "c1",
      getCurrentConnectionId: () => "c1",
      getCredentials: () => credentials,
      replaceCredentials: (next: Record<string, unknown>) => {
        credentials = next;
      },
      onCredentialsRefreshed: () => {},
      assertManagedLeaseFence: () => {},
    },
    wire: {
      body: { model: "m" },
      currentModel: "m",
      triedModels: new Set(["m"]),
      setBodyAndModel: () => {},
    },
    state: {
      updatePendingStage() {},
      recordRateLimitHeaders() {},
      recordRateLimitBody() {},
      async writeTerminalStatus() {},
      persistConnectionPatch() {},
      setConnectionRateLimitedUntil() {},
      lockModel() {},
      async recordAntigravityQuotaState() {},
      markAccountSemaphoreBlocked() {},
      isolateProbeFailures: () => false,
    },
    sendProviderAttempt: async () => ({
      response: response(),
      url: "https://upstream.test",
      headers: {},
      transformedBody: {},
    }),
  } as unknown as PipelineInput;
}

const json = (status: number, body: unknown, headers: Record<string, string> = {}) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { "content-type": "application/json", ...headers },
  });

async function errorResult(provider: string, response: () => Response) {
  const outcome = await runProviderExecutionPipeline(input(provider, response));
  assert.equal(outcome.kind, "error");
  return (outcome as Extract<typeof outcome, { kind: "error" }>).result;
}

test("a 429 with a Retry-After header carries retryAfterMs", async () => {
  const result = await errorResult("openai", () =>
    json(429, { error: { message: "slow down" } }, { "retry-after": "120" })
  );
  assert.equal(result.retryAfterMs, 120_000);
});

test("a 429 with a Retry-After HTTP date carries the remaining time", async () => {
  const result = await errorResult("openai", () =>
    json(
      429,
      { error: { message: "slow down" } },
      { "retry-after": new Date(Date.now() + 90_000).toUTCString() }
    )
  );
  assert.ok(result.retryAfterMs && result.retryAfterMs > 80_000 && result.retryAfterMs <= 90_000);
});

test("a 429 with a google.rpc RetryInfo detail and no header carries that delay", async () => {
  const result = await errorResult("gemini", () =>
    json(429, {
      error: {
        code: 429,
        message: "Quota exceeded",
        details: [{ "@type": "type.googleapis.com/google.rpc.RetryInfo", retryDelay: "26s" }],
      },
    })
  );
  assert.equal(result.retryAfterMs, 26_000);
});

test("an array-wrapped Gemini error keeps the provider message", async () => {
  const result = await errorResult("gemini", () =>
    json(429, [{ error: { code: 429, message: "You exceeded your current quota" } }])
  );
  assert.equal(result.rawMessage, "You exceeded your current quota");
});

test("flat message, detail and string error bodies keep the provider message", async () => {
  for (const [body, expected] of [
    [{ message: "flat message" }, "flat message"],
    [{ detail: "detail text" }, "detail text"],
    [{ error: "string error" }, "string error"],
  ] as const) {
    const result = await errorResult("openai", () => json(500, body));
    assert.equal(result.rawMessage, expected);
  }
});

test("a non-JSON body still surfaces as the message", async () => {
  const result = await errorResult(
    "openai",
    () => new Response("plain text failure", { status: 502 })
  );
  assert.equal(result.rawMessage, "plain text failure");
});

test("a restated agentrouter 429 keeps its synthetic Retry-After and an upstream one wins", async () => {
  const restated = await errorResult("agentrouter", () =>
    json(403, { error: { message: "用户额度不足", type: "forbidden" } })
  );
  assert.equal(restated.status, 429);
  assert.equal(restated.retryAfterMs, 60_000);
  const withHeader = await errorResult("agentrouter", () =>
    json(403, { error: { message: "用户额度不足" } }, { "retry-after": "7" })
  );
  assert.equal(withHeader.retryAfterMs, 7_000);
});

test("the non-streaming leg keeps the pipeline retry hint on the client error", async () => {
  const { runNonStreamingProviderLeg } =
    await import("../../open-sse/handlers/chatCore/nonStreamingProviderLeg.ts");
  // The raw upstream response has no Retry-After header; the hint exists only on the outcome
  // (a body delay or a restated 429), so only the leg's use of result.retryAfterMs can keep it.
  const raw = json(429, { error: { message: "quota" } });
  const leg = await runNonStreamingProviderLeg({
    phase: "initial",
    sourceBody: { messages: [{ role: "user", content: "hi" }] },
    allowAccountRotation: false,
    allowModelFallback: false,
    provider: "gemini",
    model: "m",
    connectionId: "c1",
    setRequestWireState: () => {},
    runProviderExecution: async () => ({
      kind: "error",
      model: "m",
      connectionId: "c1",
      providerUsage: null,
      result: {
        success: false,
        status: 429,
        response: raw,
        error: "quota",
        retryAfterMs: 26_000,
      },
    }),
  } as unknown as Parameters<typeof runNonStreamingProviderLeg>[0]);
  assert.equal(leg.kind, "error");
  if (leg.kind !== "error") return;
  assert.equal(leg.result.retryAfterMs, 26_000);
  assert.equal(leg.result.response.headers.get("retry-after"), "26");
});
