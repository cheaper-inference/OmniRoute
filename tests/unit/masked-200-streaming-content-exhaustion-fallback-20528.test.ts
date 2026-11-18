/**
 * Issue #20528 — the streaming twin of #19278. A `stream: true` combo request
 * must fail over to the next target when the first target answers HTTP 200
 * whose billing failure is delivered as ordinary `choices[].delta.content`
 * inside the SSE stream.
 *
 * Observed in production (Pollinations, `auto/*` channels, OmniRoute 3.8.54):
 * the upstream emits "The account behind this API key doesn't have enough
 * credits..." as assistant deltas on an otherwise clean 200 stream — no error
 * envelope, no non-zero status. The bounded peek used to declare "content" on
 * the first non-empty delta and return, relaying the masked error to the
 * client while healthier siblings were never tried. (The non-streaming twin
 * was fixed by #19281; the OmniRoute-estimated `completion_tokens` written
 * after the stream made the `usage <= 0` gate unusable here anyway.)
 *
 * The streaming detector accumulates a bounded prefix of assistant text and
 * defers the content verdict only across SSE lines already buffered in the
 * SAME parse pass — never across another network read, so a committed stream
 * is never re-evaluated (the pre-content transport-replay veto depends on
 * that). The deferral releases when the text outgrows the billing-notice
 * window or the stream reports real upstream usage — the #6427
 * anti-false-positive contract is preserved.
 */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-masked200stream-20528-"));
const ORIGINAL_DATA_DIR = process.env.DATA_DIR;
process.env.DATA_DIR = TEST_DATA_DIR;

const { handleComboChat, validateResponseQuality } =
  await import("../../open-sse/services/combo.ts");
const core = await import("../../src/lib/db/core.ts");
const settingsDb = await import("../../src/lib/db/settings.ts");
const { resetAllComboMetrics } = await import("../../open-sse/services/comboMetrics.ts");
const { resetAllCircuitBreakers } = await import("../../src/shared/utils/circuitBreaker.ts");
const { resetAll: resetAllSemaphores } =
  await import("../../open-sse/services/rateLimitSemaphore.ts");
const { _resetAllDecks } = await import("../../src/shared/utils/shuffleDeck.ts");
const { clearSessions } = await import("../../open-sse/services/sessionManager.ts");

const encoder = new TextEncoder();
const silentLog = { warn: () => {} };

// The exact billing notice observed on the wire from Pollinations.
const POLLINATIONS_BILLING_NOTICE =
  "The account behind this API key doesn't have enough credits. Please top up or complete a quest, then try again.\n\nIf this isn't your Pollinations account, contact whoever runs the app or service you're using.";

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

/** One OpenAI-shape `chat.completion.chunk` SSE frame. */
function openAiChunk(
  delta: Record<string, unknown>,
  finishReason: string | null = null,
  extra: Record<string, unknown> = {}
): string {
  return `data: ${JSON.stringify({
    id: "chatcmpl-test",
    object: "chat.completion.chunk",
    created: 1795007367,
    model: "community/test-model",
    choices: [{ index: 0, delta, finish_reason: finishReason }],
    ...extra,
  })}\n\n`;
}

function sseResponse(body: string): Response {
  return new Response(encoder.encode(body), {
    status: 200,
    headers: { "content-type": "text/event-stream" },
  });
}

/** Healthy OpenAI stream that answers "pong". */
function healthySseBody(text = "pong"): string {
  return (
    openAiChunk({ role: "assistant", content: "" }) +
    openAiChunk({ content: text }) +
    openAiChunk({}, "stop") +
    "data: [DONE]\n\n"
  );
}

/** Pollinations-style masked billing stream (no upstream usage at all). */
function maskedBillingSseBody(notice: string = POLLINATIONS_BILLING_NOTICE): string {
  return (
    openAiChunk({ role: "assistant", content: "" }) +
    openAiChunk({ content: notice }) +
    openAiChunk({}, "stop") +
    "data: [DONE]\n\n"
  );
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

test("#20528 peek marks a 200 SSE stream whose only content is the billing notice invalid (single delta)", async () => {
  const out = await validateResponseQuality(sseResponse(maskedBillingSseBody()), true, silentLog);
  assert.equal(out.valid, false, `masked billing stream must be invalid, got valid=true`);
  assert.match(out.reason ?? "", /exhaustion/i, `reason should identify the marker: ${out.reason}`);
  assert.equal(
    out.upstreamFailure?.status,
    402,
    "masked billing should surface as a 402-class failure"
  );
  assert.equal(out.upstreamFailure?.code, "credits_exhausted");
  assert.equal(
    out.upstreamFailure?.retryable,
    false,
    "billing failures must not retry the same target"
  );
  assert.equal(
    out.upstreamFailure?.requestScoped,
    false,
    "billing failures are connection-scoped, not request-scoped"
  );
});

test("#20528 peek accumulates the billing notice across multiple deltas before deciding", async () => {
  const parts = [
    "The account behind this API key doesn't have ",
    "enough credits. Please top up or complete a quest, then try again.\n\n",
    "If this isn't your Pollinations account, contact whoever runs the app or service you're using.",
  ];
  const body =
    openAiChunk({ role: "assistant", content: "" }) +
    parts.map((p) => openAiChunk({ content: p })).join("") +
    openAiChunk({}, "stop") +
    "data: [DONE]\n\n";
  const out = await validateResponseQuality(sseResponse(body), true, silentLog);
  assert.equal(out.valid, false, "chunked billing notice must still be caught");
  assert.equal(out.upstreamFailure?.code, "credits_exhausted");
});

test("#20528 priority combo fails over to a healthy streaming sibling", async () => {
  const calls: string[] = [];
  const result = await handleComboChat({
    body: { stream: true },
    combo: {
      name: "priority-masked-200-stream",
      strategy: "priority",
      models: ["deadprovider/exhausted-model", "healthyprovider/backup-model"],
      config: { maxRetries: 0, retryDelayMs: 0, fallbackDelayMs: 0 },
    },
    handleSingleModel: async (_body: unknown, modelStr: string) => {
      calls.push(modelStr);
      if (modelStr === "deadprovider/exhausted-model") {
        return sseResponse(maskedBillingSseBody());
      }
      return sseResponse(healthySseBody("real answer"));
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
    "combo must fail over past the streaming masked 200 instead of returning it"
  );
  const bodyText = await result.clone().text();
  assert.match(bodyText, /real answer/, "the returned body must be the fallback's real answer");
});

test("#20528 control: billing phrasing WITH upstream-reported usage is returned, not misclassified", async () => {
  // An agent narrating a billing error it saw — legitimate content. The
  // upstream usage tail is what keeps this valid: real prose carries real
  // usage; a billing-masked refusal never does.
  const body =
    openAiChunk({ role: "assistant", content: "" }) +
    openAiChunk({
      content:
        "The upstream call failed: the account doesn't have enough credits, so please top up to continue.",
    }) +
    openAiChunk({}, "stop") +
    `data: ${JSON.stringify({ choices: [], usage: { prompt_tokens: 30, completion_tokens: 21, total_tokens: 51 } })}\n\n` +
    "data: [DONE]\n\n";
  const out = await validateResponseQuality(sseResponse(body), true, silentLog);
  assert.equal(
    out.valid,
    true,
    `prose mentioning billing WITH usage must stay valid, got: ${out.reason}`
  );
  const replayed = out.clonedResponse ? await out.clonedResponse.text() : "";
  assert.match(replayed, /enough credits/, "replay must preserve the original bytes");
});

test("#20528 control: long prose opening with a billing phrase outgrows the hold and stays valid", async () => {
  // The suspect window is bounded (MASKED_STREAM_NOTICE_MAX = 512): a real
  // answer that mentions "enough credits" and keeps going must release the
  // deferral once the assembled prefix outgrows the billing-notice window.
  const longProse =
    "You have enough credits for this request. " + "Here is more detail. ".repeat(110);
  assert.ok(longProse.length > 512, "control prose must exceed the suspect window");
  const out = await validateResponseQuality(
    sseResponse(maskedBillingSseBody(longProse)),
    true,
    silentLog
  );
  assert.equal(
    out.valid,
    true,
    `prose outgrowing the billing-notice window must stay valid, got: ${out.reason}`
  );
});

test("#20528 control: a normal streamed answer stays valid and replays byte-identical", async () => {
  const body = healthySseBody("Hello, world!");
  const out = await validateResponseQuality(sseResponse(body), true, silentLog);
  assert.equal(out.valid, true, `healthy stream must stay valid, got: ${out.reason}`);
  assert.ok(out.clonedResponse, "clonedResponse must replay the buffered prefix");
  assert.equal(await out.clonedResponse!.text(), body, "replay must be byte-identical");
});
