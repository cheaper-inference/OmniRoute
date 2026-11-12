import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import type { ProviderExecutionPipelineInput } from "../../open-sse/handlers/chatCore/providerExecutionPipeline.ts";

const dataDir = fs.mkdtempSync(path.join(os.tmpdir(), "codex-capacity-owner-"));
process.env.DATA_DIR = dataDir;
const core = await import("../../src/lib/db/core.ts");
const providers = await import("../../src/lib/db/providers.ts");
const fences = await import("../../src/lib/db/codexConnectionFences.ts");
const { runProviderExecutionPipeline } =
  await import("../../open-sse/handlers/chatCore/providerExecutionPipeline.ts");
const owner = (name: string) => ({
  email: `${name}@example.invalid`,
  accessToken: `synthetic-access-${name}`,
  providerSpecificData: { workspaceId: `synthetic-workspace-${name}` },
});

function seed(name: string) {
  return providers.createProviderConnection({
    provider: "codex",
    authType: "oauth",
    testStatus: "active",
    isActive: true,
    ...owner(name),
  });
}

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(dataDir, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

for (const race of ["current", "replacement", "ABA"] as const) {
  for (const exhausted of [false, true]) {
    test(`capacity handling retains owner fencing: ${race}, exhausted quota=${exhausted}`, async () => {
      const first = await seed("a");
      const next = await seed("next");
      const fence = fences.captureCodexConnectionFence(first, first.id);
      assert.ok(fence);
      let credentials: Record<string, unknown> = { ...first, connectionId: first.id };
      let currentId = first.id;
      let sends = 0;
      let selections = 0;
      let headersLearned = 0;
      let bodiesLearned = 0;
      let scopesPersisted = 0;
      let affinitiesCleared = 0;
      let rotationsAudited = 0;
      let before = first;
      const assertDispatchScope = () => {
        assert.equal(fences.getCodexOperationFence(first.id)?.ownerEpoch, fence.ownerEpoch);
      };
      const input: ProviderExecutionPipelineInput = {
        policy: { allowAccountRotation: true, allowModelFallback: false },
        target: {
          provider: "codex",
          requestedModel: "gpt-5.5",
          sourceFormat: "openai-responses",
          targetFormat: "openai-responses",
          stream: false,
        },
        connection: {
          initialConnectionId: first.id,
          getCurrentConnectionId: () => currentId,
          getCredentials: () => credentials,
          replaceCredentials(value) {
            credentials = value;
            currentId = String(value.connectionId);
          },
          onCredentialsRefreshed() {
            assert.fail("capacity must not refresh credentials");
          },
          assertManagedLeaseFence() {},
          getProviderCredentials: async () => {
            selections++;
            return { ...next, connectionId: next.id };
          },
        },
        wire: {
          body: { model: "gpt-5.5", input: "synthetic capacity response" },
          currentModel: "gpt-5.5",
          triedModels: new Set(["gpt-5.5"]),
          setBodyAndModel() {
            assert.fail("capacity must not rewrite the requested model");
          },
        },
        state: {
          updatePendingStage() {},
          recordRateLimitHeaders() {
            assertDispatchScope();
            headersLearned++;
          },
          recordRateLimitBody() {
            assertDispatchScope();
            bodiesLearned++;
          },
          writeTerminalStatus: async () => {},
          persistConnectionPatch() {},
          setConnectionRateLimitedUntil() {},
          lockModel() {},
          recordAntigravityQuotaState: async () => {},
          markAccountSemaphoreBlocked() {},
          isolateProbeFailures: () => false,
          onCodexScopeRateLimited: async () => {
            assertDispatchScope();
            scopesPersisted++;
          },
          onClearSessionAffinity: async () => {
            assertDispatchScope();
            affinitiesCleared++;
          },
          onAuditAccountRotation: async () => {
            assertDispatchScope();
            rotationsAudited++;
          },
        },
        sendProviderAttempt: async () => {
          sends++;
          if (sends > 1) {
            return {
              response: Response.json({ id: "resp_rotated", status: "completed" }),
              url: "https://upstream.invalid/codex/responses",
              headers: {},
              transformedBody: input.wire.body,
            };
          }
          const response = Response.json(
            { error: { message: "Codex is at capacity, please try again later" } },
            {
              status: 429,
              headers: {
                "Retry-After": "5",
                ...(exhausted ? { "x-codex-5h-usage": "100", "x-codex-5h-limit": "100" } : {}),
              },
            }
          );
          fences.bindCodexResponseFence(response, fence);
          if (race !== "current") {
            await providers.updateProviderConnection(first.id, owner("b"));
            if (race === "ABA") await providers.updateProviderConnection(first.id, owner("a"));
          }
          before = await providers.getProviderConnectionById(first.id);
          return {
            response,
            url: "https://upstream.invalid/codex/responses",
            headers: {},
            transformedBody: input.wire.body,
          };
        },
      };
      const outcome = await runProviderExecutionPipeline(input);
      if (race === "current") {
        assert.equal(outcome.kind, "response");
        assert.equal(outcome.connectionId, next.id);
        assert.equal(sends, 2);
        assert.equal(selections, 1);
        assert.equal(headersLearned, 1);
        assert.equal(bodiesLearned, exhausted ? 1 : 0);
        assert.equal(scopesPersisted, exhausted ? 1 : 0);
        assert.equal(affinitiesCleared, 1);
        assert.equal(rotationsAudited, 1);
      } else {
        assert.equal(outcome.kind, "error");
        assert.equal(outcome.kind === "error" ? outcome.result.status : null, 429);
        assert.equal(sends, 1);
        assert.equal(selections, 0);
        assert.equal(headersLearned, 0);
        assert.equal(bodiesLearned, 0);
        assert.equal(scopesPersisted, 0);
        assert.equal(affinitiesCleared, 0);
        assert.equal(rotationsAudited, 0);
      }
      assert.deepEqual(await providers.getProviderConnectionById(first.id), before);
    });
  }
}
