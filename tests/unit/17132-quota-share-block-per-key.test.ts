/**
 * tests/unit/17132-quota-share-block-per-key.test.ts
 *
 * Issue #17132 — "Absolute quota cap" (Quota Share) crashing the proxy 100%
 *
 * The Quota Share pre-hook's `block` path returned a BARE 429 Response.
 * `handleSingleModelChat` consumes handleChatCore's return as a result object
 * (`{ success, status, response, … }`), so a bare Response made
 * `result.response.headers` throw a TypeError and the request died as a 500/502
 * BEFORE the clean 429 could reach the client.
 *
 * A quota-share block is a decision about THIS API KEY only — the shared
 * connection keeps serving the other keys of the pool. So the block must:
 *   1. arrive as a structured error result (`success:false`, `errorCode:
 *      "quota_share_blocked"`, `.response` carrying the 429 body/reason); and
 *   2. classify as request-scoped upstream failure, so no connection cooldown
 *      (`markAccountUnavailable`), no provider breaker trip and no #1731 /
 *      #1731v2 combo skip-marking fires for the healthy shared connection.
 *
 * TDD: assertions here FAIL before the fix (bare Response → no `.success` /
 * `.errorCode` / `.response`, and the block is classified as provider quota
 * exhaustion). See Hard Rule #18.
 */

import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

// ── DB harness (same pattern as quota-combo-balancing.test.ts) ──────────────
// Stable per-file temp dir so DATA_DIR is set ONCE before any module load.
const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-17132-quota-share-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const poolsDb = await import("../../src/lib/db/quotaPools.ts");
const modelCapsDb = await import("../../src/lib/db/quotaModelCaps.ts");
const { getQuotaStore } = await import("../../src/lib/quota/QuotaStore.ts");
const { enforceQuotaShare } = await import("../../src/lib/quota/enforce.ts");
const { runQuotaSharePreHook } =
  await import("../../open-sse/handlers/chatCore/quotaSharePreHook.ts");
const { isRequestScopedUpstreamFailure, shouldSkipConnDisable } =
  await import("../../open-sse/services/combo/comboPredicates.ts");
const { applyComboTargetExhaustion } =
  await import("../../open-sse/services/combo/targetExhaustion.ts");
const { checkFallbackError } = await import("../../open-sse/services/accountFallback.ts");

// Trigger migration once at module load so the schema is ready.
core.getDbInstance();

const CONNECTION_ID = "conn-1732-shared";
const API_KEY_ID = "key-1732-capped";
const PROVIDER = "claude";
const MODEL = "claude-sonnet-4-5-20250929";
const MODEL_CAP = 5;

/** Shape the pre-hook's block result is required to have (issue #17132). */
type PreHookBlockResult = {
  success: boolean;
  status: number;
  error?: string;
  errorCode?: string;
  response: Response;
};

async function seedModelCapBlock(): Promise<void> {
  const pool = poolsDb.createPool({
    connectionId: CONNECTION_ID,
    name: "17132-quota-share-pool",
    allocations: [{ apiKeyId: API_KEY_ID, weight: 100, policy: "hard" }],
  });
  modelCapsDb.setModelCap({
    poolId: pool.id,
    apiKeyId: API_KEY_ID,
    model: MODEL,
    capValue: MODEL_CAP,
    capUnit: "requests",
  });
  // Seed per-(key,model) consumption at the cap via the production store.
  const store = await getQuotaStore();
  await store.consume(
    API_KEY_ID,
    { poolId: `${pool.id}:model:${MODEL}`, unit: "requests", window: "hourly" },
    MODEL_CAP
  );
}

test("quota-share gate blocks the capped key (seed sanity)", async () => {
  await seedModelCapBlock();
  const decision = await enforceQuotaShare({
    apiKeyId: API_KEY_ID,
    connectionId: CONNECTION_ID,
    provider: PROVIDER,
    model: MODEL,
    estimatedCost: {},
  });
  assert.equal(decision.kind, "block");
});

test("pre-hook block returns a structured 429 result, not a bare Response", async () => {
  const result = (await runQuotaSharePreHook({
    apiKeyInfo: { id: API_KEY_ID },
    credentials: { connectionId: CONNECTION_ID },
    provider: PROVIDER,
    model: MODEL,
    isCombo: false,
    comboStepId: null,
    comboExecutionKey: null,
    finalizePendingRequest: () => {},
    log: null,
  })) as unknown as PreHookBlockResult | null;

  assert.ok(result, "pre-hook must return a result when the gate blocks");
  // The crash contract: handleSingleModelChat reads result.response.headers.
  assert.ok(
    result.response instanceof Response,
    "result must carry .response — a bare Response makes result.response undefined and crashes the handler"
  );
  assert.equal(result.success, false);
  assert.equal(result.status, 429);
  assert.equal(result.errorCode, "quota_share_blocked");
  assert.match(result.response.headers.get("content-type") ?? "", /application\/json/);
  const bodyText = await result.response.text();
  assert.match(bodyText, /Model cap reached for your API key/);
});

test("quota_share_blocked is classified as request-scoped (per-key), not a connection fault", () => {
  const structuredError = { code: "quota_share_blocked" };
  assert.equal(
    isRequestScopedUpstreamFailure(structuredError),
    true,
    "combo must treat the block as request-scoped (no #1731/#1731v2 skip-marking)"
  );
  assert.equal(
    shouldSkipConnDisable(
      { status: 429, errorCode: "quota_share_blocked" },
      false,
      false,
      PROVIDER
    ),
    true,
    "the shared connection must not be cooled down for one key hitting its cap"
  );
});

test("combo exhaustion marking skips provider/connection for a quota-share block", () => {
  // Real reason text from enforce.ts's fair-share "cap-absolute" mapping.
  const reason = "Absolute quota cap reached for your API key on claude";
  const structuredError = { code: "quota_share_blocked" };
  const fallbackResult = checkFallbackError(
    429,
    reason,
    0,
    MODEL,
    PROVIDER,
    new Headers(),
    null,
    structuredError,
    null,
    null
  );
  const sets = {
    exhaustedProviders: new Set<string>(),
    exhaustedConnections: new Set<string>(),
    transientRateLimitedProviders: new Set<string>(),
  };
  const target = {
    kind: "model" as const,
    stepId: "step-1",
    executionKey: "step-1",
    modelStr: `${PROVIDER}/${MODEL}`,
    provider: PROVIDER,
    providerId: PROVIDER,
    connectionId: CONNECTION_ID,
    weight: 1,
    label: null,
  };
  // Same computation executeTargetAttempt performs via isScopedFailure.
  const requestScopedFailure = isRequestScopedUpstreamFailure(structuredError);
  applyComboTargetExhaustion(target, {
    result: { status: 429 },
    fallbackResult,
    errorText: reason,
    rawModel: MODEL,
    isTokenLimitBreach: false,
    allAccountsRateLimited: false,
    requestScopedFailure,
    sets,
    log: { info() {}, warn() {}, debug() {} },
    tag: "COMBO",
    exhaustedLogLevel: "info",
    structuredError,
  });
  assert.equal(
    sets.exhaustedProviders.has(PROVIDER),
    false,
    "one key's absolute cap must not mark the whole provider exhausted (#1731)"
  );
  assert.equal(
    sets.exhaustedConnections.has(CONNECTION_ID),
    false,
    "one key's absolute cap must not skip the shared connection (#1731v2)"
  );
});
