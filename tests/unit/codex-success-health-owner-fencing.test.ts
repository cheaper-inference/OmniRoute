import test from "node:test";
import assert from "node:assert/strict";
import { createChatPipelineHarness } from "../integration/_chatPipelineHarness.ts";

const harness = await createChatPipelineHarness("codex-success-health-owner");
const providers = await import("../../src/lib/db/providers.ts");
const quotaState = await import("../../src/domain/quotaCacheState.ts");
const originalFetch = globalThis.fetch;
const recovery = await import("../../src/sse/services/codexQuotaRecoveryRecheck.ts");
const fences = await import("../../src/lib/db/codexConnectionFences.ts");
const { SELF_HOP_HEADER, ownListenerSelfHopToken } =
  await import("../../open-sse/utils/selfHop.ts");
function deferred<T>() {
  let resolve!: (value: T) => void;
  const promise = new Promise<T>((done) => {
    resolve = done;
  });
  return { promise, resolve };
}
test.beforeEach(async () => {
  await harness.resetStorage();
  quotaState.getQuotaCacheState().healthyUntil.clear();
  await harness.settingsDb.updateSettings({
    requestRetry: 0,
    maxRetryIntervalSec: 0,
    hideAutoCombos: true,
    blockedProviders: ["aihorde"],
  });
});
test.afterEach(async () => {
  globalThis.fetch = originalFetch;
  quotaState.getQuotaCacheState().healthyUntil.clear();
  await harness.resetStorage();
});
test.after(async () => {
  globalThis.fetch = originalFetch;
  await harness.cleanup();
});
for (const change of ["none", "owner", "failure", "forced"] as const) {
  test(`full chat success ${change === "none" ? "still grants a current-owner healthy override" : `cannot grant a healthy override after newer ${change} state`}`, async () => {
    const connection = await providers.createProviderConnection({
      provider: "codex",
      authType: "oauth",
      testStatus: "active",
      isActive: true,
      accessToken: "synthetic-original",
      email: "original@example.invalid",
      providerSpecificData: { workspaceId: "original", autoFetchModels: false },
    });
    let rechecks = 0;
    const blocker = {
      connectionId: connection.id,
      windowNames: ["weekly"],
      observedAts: [Date.now() - 30_000],
    };
    const deps = {
      ownerEpoch: () => fences.readCodexQuotaOwner(connection.id)!.epoch,
      eligible: async () => true,
      refresh: async () => {
        rechecks++;
      },
    };
    await recovery.recheckCodexQuotaRecovery([blocker], deps);
    const started = deferred<void>();
    const release = deferred<Response>();
    globalThis.fetch = async () => {
      started.resolve();
      return release.promise;
    };
    const operation = harness.handleChat(
      harness.buildRequest({
        url: "http://localhost/v1/responses",
        headers: {
          "x-omniroute-connection-id": connection.id,
          ...(change === "forced"
            ? {
                "X-Internal-Test": "combo-health-check",
                [SELF_HOP_HEADER]: ownListenerSelfHopToken(),
              }
            : {}),
        },
        body: { model: "codex/gpt-5.6-sol", input: "offline health owner race", stream: false },
      })
    );
    await Promise.race([
      started.promise,
      operation.then(() => {
        throw new Error("mock generation never dispatched");
      }),
    ]);
    if (change === "owner")
      await providers.updateProviderConnection(connection.id, {
        accessToken: "synthetic-replacement",
        email: "replacement@example.invalid",
        providerSpecificData: { workspaceId: "replacement", autoFetchModels: false },
      });
    if (change === "failure")
      await providers.updateProviderConnection(connection.id, {
        testStatus: "banned",
        lastError: "new terminal failure",
        lastErrorType: "account_banned",
      });
    release.resolve(
      Response.json({
        id: "resp_health",
        object: "response",
        status: "completed",
        model: "gpt-5.6-sol",
        output: [
          {
            id: "msg_health",
            type: "message",
            role: "assistant",
            content: [{ type: "output_text", text: "ok", annotations: [] }],
          },
        ],
        usage: { input_tokens: 4, output_tokens: 2, total_tokens: 6 },
      })
    );
    const response = await operation;
    assert.equal(response.status, 200);
    await response.text();
    await harness.callLogsDb.waitForCallLogSaves(10_000);
    assert.equal(
      quotaState.isQuotaHealthy(connection.id),
      change === "none" || change === "forced"
    );
    if (change === "none" || change === "forced") {
      await recovery.recheckCodexQuotaRecovery([blocker], deps);
      assert.equal(
        rechecks,
        change === "forced" ? 2 : 1,
        "only forced live 200 may reopen recovery once"
      );
    }
  });
}
