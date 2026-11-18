/**
 * Issue #19278 — a `priority` combo must fail over to the next target when the
 * first target returns HTTP 200 OK whose billing failure lives inside the
 * ASSISTANT CONTENT itself, not the error envelope.
 *
 * Observed in production (Pollinations, `auto/*` channels): the upstream
 * answers "The account behind this API key doesn't have enough credits" as
 * `choices[0].message.content` of an otherwise clean completion — no `error`
 * object, no envelope phrase, `tokens_out=0`. The #6427 envelope check cannot
 * see it, `res.ok` marks the attempt successful, and the masked response is
 * relayed to the client while healthier siblings are never tried.
 *
 * The new check is deliberately narrow (billing-action phrases only) and gated
 * on absent/zero `usage.completion_tokens` — the #6427 control contract is
 * preserved: assistant prose that merely MENTIONS quota/credits always carries
 * real usage and must NOT be misclassified.
 */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-masked200-19278-"));
const ORIGINAL_DATA_DIR = process.env.DATA_DIR;
process.env.DATA_DIR = TEST_DATA_DIR;

const { handleComboChat } = await import("../../open-sse/services/combo.ts");
const core = await import("../../src/lib/db/core.ts");
const settingsDb = await import("../../src/lib/db/settings.ts");
const { resetAllComboMetrics } = await import("../../open-sse/services/comboMetrics.ts");
const { resetAllCircuitBreakers } = await import("../../src/shared/utils/circuitBreaker.ts");
const { resetAll: resetAllSemaphores } =
  await import("../../open-sse/services/rateLimitSemaphore.ts");
const { _resetAllDecks } = await import("../../src/shared/utils/shuffleDeck.ts");
const { clearSessions } = await import("../../open-sse/services/sessionManager.ts");

function createLog() {
  const entries: unknown[] = [];
  return {
    info: (tag: unknown, msg: unknown) => entries.push({ level: "info", tag, msg }),
    warn: (tag: unknown, msg: unknown) => entries.push({ level: "warn", tag, msg }),
    error: (tag: unknown, msg: unknown) => entries.push({ level: "error", tag, msg }),
    debug: (tag: unknown, msg: unknown) => entries.push({ level: "debug", tag, msg }),
    entries,
  };
}

function jsonResponse(body: unknown) {
  return new Response(JSON.stringify(body), {
    status: 200,
    headers: { "content-type": "application/json" },
  });
}

async function cleanupTestDataDir() {
  let lastError: unknown;
  for (let attempt = 0; attempt < 5; attempt += 1) {
    try {
      core.resetDbInstance();
      fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
      return;
    } catch (error: unknown) {
      lastError = error;
      await new Promise((resolve) => setTimeout(resolve, 25));
    }
  }
  if (lastError) throw lastError;
}

test.beforeEach(async () => {
  resetAllComboMetrics();
  resetAllCircuitBreakers();
  resetAllSemaphores();
  _resetAllDecks();
  clearSessions();
  await cleanupTestDataDir();
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
  await settingsDb.resetAllPricing();
  settingsDb.clearAllLKGP();
});

test.after(async () => {
  resetAllComboMetrics();
  resetAllCircuitBreakers();
  resetAllSemaphores();
  _resetAllDecks();
  settingsDb.clearAllLKGP();
  if (ORIGINAL_DATA_DIR === undefined) {
    delete process.env.DATA_DIR;
  } else {
    process.env.DATA_DIR = ORIGINAL_DATA_DIR;
  }
  await cleanupTestDataDir();
  core.resetDbInstance();
});

test("#19278 priority combo falls back when the first target's 200 body carries the exhaustion phrase inside assistant content", async () => {
  const calls: string[] = [];
  const result = await handleComboChat({
    body: {},
    combo: {
      name: "priority-masked-200-content",
      strategy: "priority",
      models: ["deadprovider/exhausted-model", "healthyprovider/backup-model"],
      config: { maxRetries: 0, retryDelayMs: 0, fallbackDelayMs: 0 },
    },
    handleSingleModel: async (_body: unknown, modelStr: string) => {
      calls.push(modelStr);
      if (modelStr === "deadprovider/exhausted-model") {
        // The exact shape observed from Pollinations: a structurally valid
        // completion whose message content IS the billing error, and no usage.
        return jsonResponse({
          id: "chatcmpl-masked",
          object: "chat.completion",
          choices: [
            {
              index: 0,
              message: {
                role: "assistant",
                content:
                  "The account behind this API key doesn't have enough credits. Top up or complete quests to continue.",
              },
              finish_reason: "stop",
            },
          ],
        });
      }
      return jsonResponse({
        choices: [{ message: { role: "assistant", content: "real answer" } }],
        usage: { prompt_tokens: 8, completion_tokens: 2, total_tokens: 10 },
      });
    },
    isModelAvailable: async () => true,
    log: createLog(),
    settings: null,
    allCombos: null,
  });

  assert.equal(result.ok, true, "combo must ultimately succeed via the fallback target");
  assert.deepEqual(
    calls,
    ["deadprovider/exhausted-model", "healthyprovider/backup-model"],
    "combo must fail over past the content-masked 200 instead of returning it"
  );
  const bodyText = await result.clone().text();
  assert.match(bodyText, /real answer/, "the returned body must be the fallback's real answer");
});

test("#19278 control: prose mentioning billing phrases WITH real usage is returned, not misclassified", async () => {
  const calls: string[] = [];
  const result = await handleComboChat({
    body: {},
    combo: {
      name: "priority-content-usage-control",
      strategy: "priority",
      models: ["healthyprovider/primary-model", "healthyprovider/backup-model"],
      config: { maxRetries: 0, retryDelayMs: 0, fallbackDelayMs: 0 },
    },
    handleSingleModel: async (_body: unknown, modelStr: string) => {
      calls.push(modelStr);
      // An agent narrating a billing error it saw — legitimate content. The
      // completion_tokens gate is what keeps this valid: real prose always
      // carries real usage.
      return jsonResponse({
        choices: [
          {
            message: {
              role: "assistant",
              content:
                "The upstream call failed: the account doesn't have enough credits, so please top up to continue.",
            },
          },
        ],
        usage: { prompt_tokens: 30, completion_tokens: 21, total_tokens: 51 },
      });
    },
    isModelAvailable: async () => true,
    log: createLog(),
    settings: null,
    allCombos: null,
  });

  assert.equal(result.ok, true, "combo must succeed on the first target");
  assert.deepEqual(
    calls,
    ["healthyprovider/primary-model"],
    "real prose carrying usage must NOT trigger a false-positive fallback"
  );
});

test("#19278 control: a normal completion without usage and without billing phrasing stays valid", async () => {
  const calls: string[] = [];
  const result = await handleComboChat({
    body: {},
    combo: {
      name: "priority-content-nonusage-control",
      strategy: "priority",
      models: ["healthyprovider/primary-model", "healthyprovider/backup-model"],
      config: { maxRetries: 0, retryDelayMs: 0, fallbackDelayMs: 0 },
    },
    handleSingleModel: async (_body: unknown, modelStr: string) => {
      calls.push(modelStr);
      // Some providers omit `usage` entirely on real answers — the narrow
      // phrase set is the only barrier here, and generic prose must pass.
      return jsonResponse({
        choices: [
          {
            message: {
              role: "assistant",
              content:
                "Sure — here is an explanation of API quota exceeded errors and insufficient credits handling in general.",
            },
          },
        ],
      });
    },
    isModelAvailable: async () => true,
    log: createLog(),
    settings: null,
    allCombos: null,
  });

  assert.equal(result.ok, true, "combo must succeed on the first target");
  assert.deepEqual(calls, ["healthyprovider/primary-model"]);
  const bodyText = await result.clone().text();
  assert.match(bodyText, /quota exceeded/i, "generic quota prose must be returned unchanged");
});
