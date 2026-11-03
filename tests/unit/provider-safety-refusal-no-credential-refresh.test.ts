/**
 * A provider safety refusal says nothing about the credential. Refreshing the OAuth token
 * on it re-sent the refused conversation to the provider with a new token.
 */
import test from "node:test";
import assert from "node:assert/strict";

import { runProviderExecutionPipeline } from "../../open-sse/handlers/chatCore/providerExecutionPipeline.ts";

const SAFETY_MESSAGE =
  "This request was blocked by our safety systems. Reason: Potentially unintended activity.";

function errorResponse(status: number, code: string, type = "invalid_request_error"): Response {
  return Response.json({ error: { message: SAFETY_MESSAGE, code, type } }, { status });
}

async function runPipeline(responses: Response[]) {
  let executeCount = 0;
  let refreshCount = 0;
  let persistCount = 0;
  let credentials: Record<string, unknown> = {
    connectionId: "synthetic-connection",
    accessToken: "synthetic-access",
    refreshToken: "synthetic-refresh",
  };
  const result = await runProviderExecutionPipeline({
    policy: { allowModelFallback: false, allowAccountRotation: false },
    target: {
      provider: "codex",
      requestedModel: "gpt-5-codex",
      sourceFormat: "openai",
      targetFormat: "openai-responses",
      stream: true,
    },
    connection: {
      initialConnectionId: "synthetic-connection",
      getCurrentConnectionId: () => "synthetic-connection",
      getCredentials: () => credentials,
      replaceCredentials(next) {
        credentials = next;
      },
      async onCredentialsRefreshed() {
        persistCount += 1;
      },
      async refreshCredentials() {
        refreshCount += 1;
        return { accessToken: "synthetic-refreshed" };
      },
      assertManagedLeaseFence() {},
    },
    wire: {
      body: { model: "gpt-5-codex" },
      currentModel: "gpt-5-codex",
      triedModels: new Set(["gpt-5-codex"]),
      setBodyAndModel() {},
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
    sendProviderAttempt: async () => {
      const response = responses[Math.min(executeCount, responses.length - 1)].clone();
      executeCount += 1;
      return {
        response,
        url: "https://offline.invalid/responses",
        headers: {},
        transformedBody: { model: "gpt-5-codex" },
      };
    },
  });
  return { result, executeCount, refreshCount, persistCount };
}

for (const fixture of [
  { name: "named 403", response: errorResponse(403, "misalignment_policy_violation") },
  { name: "legacy exact 403", response: errorResponse(403, "bad_request") },
]) {
  test(`${fixture.name} safety refusal is never treated as a stale credential (routing flag off)`, async () => {
    const previous = process.env.PROVIDER_SAFETY_STOPS_TERMINAL;
    delete process.env.PROVIDER_SAFETY_STOPS_TERMINAL;
    try {
      const routed = await runPipeline([fixture.response]);
      assert.equal(routed.executeCount, 1, "the refused request is not sent again");
      assert.equal(routed.refreshCount, 0, "no credential refresh");
      assert.equal(routed.persistCount, 0);
    } finally {
      if (previous === undefined) delete process.env.PROVIDER_SAFETY_STOPS_TERMINAL;
      else process.env.PROVIDER_SAFETY_STOPS_TERMINAL = previous;
    }
  });
}

test("guard: a plain 403 still gets one credential refresh", async () => {
  const plain = Response.json({ error: { message: "token expired" } }, { status: 403 });
  const routed = await runPipeline([plain]);
  assert.equal(routed.refreshCount, 1);
});
