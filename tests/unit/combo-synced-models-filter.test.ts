import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { randomUUID } from "node:crypto";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-synced-filter-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const coreDb = await import("../../src/lib/db/core.ts");
const providersDb = await import("../../src/lib/db/providers.ts");
const { registerQuotaFetcher } = await import("../../open-sse/services/quotaPreflight.ts");
const quotaStrategies = await import("../../open-sse/services/combo/quotaStrategies.ts");

const noopLog = { warn: () => {}, info: () => {}, debug: () => {}, error: () => {} };

function makeTarget(provider: string, modelStr: string) {
  return {
    kind: "model" as const,
    stepId: "step-1",
    executionKey: "step-1",
    modelStr,
    provider,
    providerId: provider,
    connectionId: null,
    weight: 1,
    label: null,
  };
}

test.after(() => {
  quotaStrategies.registerSyncedAvailableModelsReader?.(null);
  coreDb.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

test("BDD-4a: expandTargetsByQuotaAwareConnections excludes antigravity connections whose syncedAvailableModels omits requested model", async () => {
  registerQuotaFetcher("antigravity", async () => ({ used: 0, total: 100, percentUsed: 0 }));

  const connWithOpus = await providersDb.createProviderConnection({
    provider: "antigravity",
    authType: "oauth",
    name: "ultra-" + randomUUID(),
    accessToken: "tok-1",
    isActive: true,
  });
  const connWithoutOpus = await providersDb.createProviderConnection({
    provider: "antigravity",
    authType: "oauth",
    name: "free-" + randomUUID(),
    accessToken: "tok-2",
    isActive: true,
  });

  assert.equal(
    typeof quotaStrategies.registerSyncedAvailableModelsReader,
    "function",
    "registerSyncedAvailableModelsReader must be exported from quotaStrategies.ts"
  );

  quotaStrategies.registerSyncedAvailableModelsReader(async (providerId: string) => {
    if (providerId !== "antigravity") return {};
    return {
      [connWithOpus.id]: [{ id: "claude-opus-4-6-thinking" }, { id: "claude-sonnet-4-6" }],
      [connWithoutOpus.id]: [{ id: "claude-sonnet-4-6" }],
    };
  });

  const { expandedTargets } = await quotaStrategies.expandTargetsByQuotaAwareConnections(
    [makeTarget("antigravity", "antigravity/claude-opus-4-6-thinking[1m]")],
    "test-synced-filter",
    noopLog
  );

  const ids = expandedTargets.map((t) => t.connectionId);
  assert.ok(ids.includes(connWithOpus.id), "connection advertising model must remain");
  assert.ok(!ids.includes(connWithoutOpus.id), "connection omitting model must be excluded");
});

test("BDD-4b: agy target falls back to antigravity synced inventory when agy inventory is absent", async () => {
  registerQuotaFetcher("agy", async () => ({ used: 0, total: 100, percentUsed: 0 }));

  const agyWithModel = await providersDb.createProviderConnection({
    provider: "agy",
    authType: "oauth",
    name: "agy-with-" + randomUUID(),
    accessToken: "tok-3",
    isActive: true,
  });
  const agyWithoutModel = await providersDb.createProviderConnection({
    provider: "agy",
    authType: "oauth",
    name: "agy-without-" + randomUUID(),
    accessToken: "tok-4",
    isActive: true,
  });

  quotaStrategies.registerSyncedAvailableModelsReader(async (providerId: string) => {
    if (providerId === "antigravity") {
      return {
        [agyWithModel.id]: ["gemini-3-pro-high"],
        [agyWithoutModel.id]: ["gemini-2.5-flash"],
      };
    }
    return {};
  });

  const { expandedTargets } = await quotaStrategies.expandTargetsByQuotaAwareConnections(
    [makeTarget("agy", "agy/gemini-3-pro-high")],
    "test-agy-fallback",
    noopLog
  );

  const ids = expandedTargets.map((t) => t.connectionId);
  assert.ok(ids.includes(agyWithModel.id));
  assert.ok(!ids.includes(agyWithoutModel.id));
});

test("BDD-5a: fail-open when no active pool connection advertises the requested model", async () => {
  registerQuotaFetcher("antigravity", async () => ({ used: 0, total: 100, percentUsed: 0 }));

  const connA = await providersDb.createProviderConnection({
    provider: "antigravity",
    authType: "oauth",
    name: "stale-a-" + randomUUID(),
    accessToken: "tok-5",
    isActive: true,
  });
  const connB = await providersDb.createProviderConnection({
    provider: "antigravity",
    authType: "oauth",
    name: "stale-b-" + randomUUID(),
    accessToken: "tok-6",
    isActive: true,
  });

  quotaStrategies.registerSyncedAvailableModelsReader(async () => ({
    [connA.id]: [{ id: "claude-sonnet-4-6" }],
    [connB.id]: [{ id: "gemini-2.5-flash" }],
  }));

  const { expandedTargets } = await quotaStrategies.expandTargetsByQuotaAwareConnections(
    [makeTarget("antigravity", "antigravity/hidden-new-model")],
    "test-fail-open-none",
    noopLog
  );

  const ids = expandedTargets.map((t) => t.connectionId);
  assert.ok(ids.includes(connA.id), "fail-open must keep connA");
  assert.ok(ids.includes(connB.id), "fail-open must keep connB");
});

test("BDD-5b: fail-open when reader is unregistered or throws", async () => {
  registerQuotaFetcher("antigravity", async () => ({ used: 0, total: 100, percentUsed: 0 }));

  const conn = await providersDb.createProviderConnection({
    provider: "antigravity",
    authType: "oauth",
    name: "err-conn-" + randomUUID(),
    accessToken: "tok-7",
    isActive: true,
  });

  quotaStrategies.registerSyncedAvailableModelsReader(null);
  const resUnregistered = await quotaStrategies.expandTargetsByQuotaAwareConnections(
    [makeTarget("antigravity", "antigravity/claude-opus-4-6-thinking")],
    "test-unregistered",
    noopLog
  );
  assert.ok(resUnregistered.expandedTargets.some((t) => t.connectionId === conn.id));

  quotaStrategies.registerSyncedAvailableModelsReader(async () => {
    throw new Error("db unavailable");
  });
  const resThrows = await quotaStrategies.expandTargetsByQuotaAwareConnections(
    [makeTarget("antigravity", "antigravity/claude-opus-4-6-thinking")],
    "test-throws",
    noopLog
  );
  assert.ok(resThrows.expandedTargets.some((t) => t.connectionId === conn.id));
});

test("Minor #3: canonical antigravity target also reads agy synced inventory", async () => {
  registerQuotaFetcher("antigravity", async () => ({ used: 0, total: 100, percentUsed: 0 }));

  const connWithModel = await providersDb.createProviderConnection({
    provider: "antigravity",
    authType: "oauth",
    name: "ag-agy-with-" + randomUUID(),
    accessToken: "tok-8",
    isActive: true,
  });
  const connWithoutModel = await providersDb.createProviderConnection({
    provider: "antigravity",
    authType: "oauth",
    name: "ag-agy-without-" + randomUUID(),
    accessToken: "tok-9",
    isActive: true,
  });

  quotaStrategies.registerSyncedAvailableModelsReader(async (providerId: string) => {
    if (providerId === "agy") {
      return {
        [connWithModel.id]: [{ id: "claude-opus-4-6-thinking" }],
        [connWithoutModel.id]: [{ id: "claude-sonnet-4-6" }],
      };
    }
    return {};
  });

  const { expandedTargets } = await quotaStrategies.expandTargetsByQuotaAwareConnections(
    [makeTarget("antigravity", "antigravity/claude-opus-4-6-thinking")],
    "test-antigravity-reads-agy",
    noopLog
  );

  const ids = expandedTargets.map((t) => t.connectionId);
  assert.ok(ids.includes(connWithModel.id), "connection in agy inventory advertising model must remain");
  assert.ok(!ids.includes(connWithoutModel.id), "connection in agy inventory omitting model must be excluded");
});
