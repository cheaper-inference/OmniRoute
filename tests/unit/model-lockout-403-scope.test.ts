/**
 * 403 lockout scope: an upstream 403 is only evidence about the account's
 * quota when its body proves it (a quota-exhaustion signal in errorText).
 * A 403 without that proof — restricted key, forbidden route, unauthorized
 * model — must lock the exact provider/connection/model tuple, not the quota
 * family, so sibling models of the same account keep routing. A 403 with a
 * quota proof keeps the family scope.
 *
 * The reason triage (quota_exhausted vs auth_error) has its own unit test;
 * these pin the SCOPE the combo lockout record writes, which the reason does
 * not drive.
 *
 * Harness mirrors tests/unit/model-lockout-5xx-exact-scope.test.ts (temp
 * DATA_DIR, real handleComboChat with a mocked handleSingleModel).
 */
import { test, beforeEach } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import type { ComboLogger } from "../../open-sse/services/combo/types.ts";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omr-lockout-403-scope-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.API_KEY_SECRET = "test-lockout-403-scope-secret"; // pragma: allowlist secret

const core = await import("../../src/lib/db/core.ts");
const { handleComboChat } = await import("../../open-sse/services/combo.ts");
const {
  classifyLockoutReason,
  classifyLockoutScope,
  recordModelLockoutFailure,
  isModelLocked,
  getModelLockoutInfo,
  getAllModelLockouts,
  clearAllModelLockouts,
} = await import("../../open-sse/services/accountFallback.ts");
const { parseModelLockKey } =
  await import("../../open-sse/services/accountFallback/exactModelLock.ts");

const CONN = "conn-codex-403";
const LUNA = "gpt-5.6-luna";
const SOL = "gpt-5.6-sol"; // same quota family as LUNA (codex scope `codex`)

beforeEach(() => clearAllModelLockouts());

test.after(() => {
  clearAllModelLockouts();
  try {
    core.resetDbInstance();
    fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  } catch {}
});

test("classifyLockoutScope: only an unproven 403 takes the exact scope", () => {
  assert.equal(classifyLockoutScope(403, ""), "exact");
  assert.equal(classifyLockoutScope(403, undefined), "exact");
  assert.equal(classifyLockoutScope(403, "Invalid API key provided"), "exact");
  assert.equal(classifyLockoutScope(403, "You have exceeded your daily quota"), undefined);
  assert.equal(classifyLockoutScope(429, ""), undefined);
  assert.equal(classifyLockoutScope(502, ""), undefined);
});

// The combo sites pass exactly these options; replay the wiring through
// recordModelLockoutFailure to pin the scope each 403 writes.
const BASE_COOLDOWN_MS = 120_000;
const MAX_COOLDOWN_MS = 1_800_000;

test("recordModelLockoutFailure combo wiring: unproven 403 locks the exact tuple only", () => {
  const errorText = "Invalid API key provided";
  recordModelLockoutFailure(
    "codex",
    CONN,
    LUNA,
    classifyLockoutReason(403, errorText),
    403,
    BASE_COOLDOWN_MS,
    null,
    {
      exactCooldownMs: 0,
      maxCooldownMs: MAX_COOLDOWN_MS,
      exactCooldownIsUpstreamReset: false,
      scope: classifyLockoutScope(403, errorText),
    }
  );

  assert.equal(isModelLocked("codex", CONN, LUNA), true, "the failing model is locked");
  assert.equal(isModelLocked("codex", CONN, SOL), false, "the sibling model stays routable");

  const models = getAllModelLockouts().map((entry) => entry.model);
  assert.ok(models.includes(LUNA), `exact-tuple entry expected, got: ${JSON.stringify(models)}`);
  assert.ok(
    !models.includes("codex"),
    `quota-family entry must not exist, got: ${JSON.stringify(models)}`
  );
});

test("recordModelLockoutFailure combo wiring: proven 403 keeps the family scope", () => {
  const errorText = "You have exceeded your daily quota";
  recordModelLockoutFailure(
    "codex",
    CONN,
    LUNA,
    classifyLockoutReason(403, errorText),
    403,
    BASE_COOLDOWN_MS,
    null,
    {
      exactCooldownMs: 0,
      maxCooldownMs: MAX_COOLDOWN_MS,
      exactCooldownIsUpstreamReset: false,
      scope: classifyLockoutScope(403, errorText),
    }
  );

  assert.equal(isModelLocked("codex", CONN, LUNA), true, "the failing model is locked");
  assert.equal(isModelLocked("codex", CONN, SOL), true, "the quota proof parks the whole family");

  const models = getAllModelLockouts().map((entry) => entry.model);
  assert.ok(
    models.includes("codex"),
    `quota-family entry expected, got: ${JSON.stringify(models)}`
  );
});

const SETTINGS = {
  modelLockout: {
    enabled: true,
    errorCodes: [403, 429, 502],
    baseCooldownMs: BASE_COOLDOWN_MS,
    maxCooldownMs: MAX_COOLDOWN_MS,
    maxBackoffSteps: 10,
    useExponentialBackoff: true,
  },
};

function comboCall(model: string, response: Response, log: ComboLogger) {
  return handleComboChat({
    body: {},
    combo: {
      name: `scope403-${model}`,
      strategy: "priority",
      models: [`codex/${model}`],
      config: { maxRetries: 0, retryDelayMs: 0, fallbackDelayMs: 0 },
    },
    handleSingleModel: async () => response,
    isModelAvailable: async () => true,
    log,
    settings: SETTINGS,
    allCombos: null,
  });
}

function jsonResponse(body: unknown, status: number) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "content-type": "application/json" },
  });
}

const quietLog = {
  info: () => {},
  warn: () => {},
  error: () => {},
  debug: () => {},
} as unknown as ComboLogger;

test("handleComboChat: an unproven 403 parks the exact model only, the sibling still dispatches", async () => {
  const failed = await comboCall(
    LUNA,
    jsonResponse({ message: "Invalid API key provided" }, 403),
    quietLog
  );
  assert.notEqual(failed.status, 200);

  assert.equal(isModelLocked("codex", "", LUNA), true, "the failing model is locked");
  const info = getModelLockoutInfo("codex", "", LUNA);
  assert.ok(info, "a lockout entry exists for the failing model");
  assert.equal(info.reason, "auth_error", "a 403 without quota proof is an auth failure");
  assert.equal(isModelLocked("codex", "", SOL), false, "the sibling model is not parked");

  // A re-dispatch of the locked model is skipped before its upstream call,
  // while a sibling model of the same account still dispatches.
  let lunaCalls = 0;
  const skipped = await handleComboChat({
    body: {},
    combo: {
      name: `scope403-retry-${LUNA}`,
      strategy: "priority",
      models: [`codex/${LUNA}`],
      config: { maxRetries: 0, retryDelayMs: 0, fallbackDelayMs: 0 },
    },
    handleSingleModel: async () => {
      lunaCalls++;
      return jsonResponse({ ok: true }, 200);
    },
    isModelAvailable: async () => true,
    log: quietLog,
    settings: SETTINGS,
    allCombos: null,
  });
  assert.equal(lunaCalls, 0, "the locked model must not be dispatched again");
  assert.notEqual(skipped.status, 200, "a combo whose only target is locked cannot succeed");

  let solCalls = 0;
  const ok = await handleComboChat({
    body: {},
    combo: {
      name: `scope403-sibling-${SOL}`,
      strategy: "priority",
      models: [`codex/${SOL}`],
      config: { maxRetries: 0, retryDelayMs: 0, fallbackDelayMs: 0 },
    },
    handleSingleModel: async () => {
      solCalls++;
      return jsonResponse({ ok: true }, 200);
    },
    isModelAvailable: async () => true,
    log: quietLog,
    settings: SETTINGS,
    allCombos: null,
  });
  assert.equal(solCalls, 1, "the sibling model is still dispatched");
  assert.equal(ok.status, 200, "the sibling model succeeds");
});

test("handleComboChat: a 403 with quota proof parks the whole family", async () => {
  const failed = await comboCall(
    LUNA,
    jsonResponse({ message: "You have exceeded your daily quota" }, 403),
    quietLog
  );
  assert.notEqual(failed.status, 200);

  const info = getModelLockoutInfo("codex", "", LUNA);
  assert.ok(info, "a lockout entry exists for the failing model");
  assert.equal(info.reason, "quota_exhausted", "the quota proof classifies as quota exhaustion");
  assert.equal(
    isModelLocked("codex", "", SOL),
    true,
    "the quota proof parks the sibling model too"
  );

  let solCalls = 0;
  const skipped = await handleComboChat({
    body: {},
    combo: {
      name: `scope403-family-${SOL}`,
      strategy: "priority",
      models: [`codex/${SOL}`],
      config: { maxRetries: 0, retryDelayMs: 0, fallbackDelayMs: 0 },
    },
    handleSingleModel: async () => {
      solCalls++;
      return jsonResponse({ ok: true }, 200);
    },
    isModelAvailable: async () => true,
    log: quietLog,
    settings: SETTINGS,
    allCombos: null,
  });
  assert.equal(solCalls, 0, "the sibling model is parked by the family lock");
  assert.notEqual(skipped.status, 200, "a combo whose only target is parked cannot succeed");
});

test("parseModelLockKey: exact and family keys are distinct namespaces", () => {
  assert.deepEqual(parseModelLockKey(`codex:${CONN}:exact:${LUNA.toLowerCase()}`), {
    provider: "codex",
    connectionId: CONN,
    model: LUNA.toLowerCase(),
    scope: "exact",
  });
  assert.deepEqual(parseModelLockKey(`codex:${CONN}:codex`), {
    provider: "codex",
    connectionId: CONN,
    model: "codex",
    scope: "quota_family",
  });
});
