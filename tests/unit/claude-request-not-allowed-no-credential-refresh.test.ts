/**
 * Anthropic's OAuth 403 "Request not allowed" refuses THIS request, not the token
 * (classified REQUEST_REJECTED). Refreshing the rotating OAuth token on it and sending the
 * refused request again costs a refresh and one more hit on the enforcement the refusal
 * streak tries to avoid.
 */
import test from "node:test";
import assert from "node:assert/strict";

import { runProviderExecutionPipeline } from "../../open-sse/handlers/chatCore/providerExecutionPipeline.ts";

function pipelineInput(opts: {
  provider: string;
  send: () => Promise<unknown>;
  refresh: () => Promise<Record<string, unknown>>;
}) {
  let credentials: Record<string, unknown> = { connectionId: "c1", accessToken: "old" };
  return {
    policy: { allowAccountRotation: false, allowModelFallback: false },
    target: {
      provider: opts.provider,
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
      refreshCredentials: opts.refresh,
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
    sendProviderAttempt: opts.send,
  } as unknown as Parameters<typeof runProviderExecutionPipeline>[0];
}

const forbidden = (message: string) => ({
  response: new Response(
    JSON.stringify({ type: "error", error: { type: "permission_error", message } }),
    { status: 403, headers: { "content-type": "application/json" } }
  ),
  url: "https://upstream.invalid",
  headers: {},
  transformedBody: {},
});

async function run(provider: string, message: string) {
  let sends = 0;
  let refreshes = 0;
  await runProviderExecutionPipeline(
    pipelineInput({
      provider,
      send: async () => {
        sends++;
        return forbidden(message);
      },
      refresh: async () => {
        refreshes++;
        return { accessToken: "new" };
      },
    })
  );
  return { sends, refreshes };
}

test("claude 403 'Request not allowed' is not sent again after a token refresh", async () => {
  const { sends, refreshes } = await run("claude", "Request not allowed");
  assert.equal(refreshes, 0, "no credential refresh");
  assert.equal(sends, 1, "the refused request is sent once");
});

test("guard: another claude 403 still gets one credential refresh", async () => {
  const { sends, refreshes } = await run("claude", "OAuth token has expired");
  assert.equal(refreshes, 1);
  assert.equal(sends, 2);
});

test("guard: 'Request not allowed' from a provider other than claude still refreshes", async () => {
  const { refreshes } = await run("anthropic-compatible-x", "Request not allowed");
  assert.equal(refreshes, 1);
});
