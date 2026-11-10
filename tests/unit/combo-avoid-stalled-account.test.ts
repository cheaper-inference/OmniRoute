// A combo per-target timeout must steer the NEXT target of the same combo request away from
// the account that stalled.
//
// Observed in production: priority combo `claude-opus-5.5` (claude/claude-opus-5-5, then
// claude/claude-opus-5-5-high, same provider, several OAuth accounts, no pinned targets).
// Account A accepted the stream and sent nothing; the per-target timer
// (open-sse/services/combo/targetTimeoutRunner.ts) aborted target 1, and target 2 picked the
// same account A again, so the request failed after twice the timeout.
//
// A combo target timeout stays request-scoped (no cooldown, lockout, breaker or
// exhaustedConnections entry). Only the remaining targets of the SAME combo request prefer
// another account, and fall back to the stalled one when it is the only eligible account.

import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import test from "node:test";

const dataDir = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-combo-stalled-account-"));
process.env.DATA_DIR = dataDir;
process.env.REQUIRE_API_KEY = "false";
process.env.INITIAL_PASSWORD = "";
process.env.DASHBOARD_PASSWORD = "";
process.env.API_KEY_SECRET = "test-combo-avoid-stalled-account";

const core = await import("../../src/lib/db/core.ts");
const providersDb = await import("../../src/lib/db/providers.ts");
const settingsDb = await import("../../src/lib/db/settings.ts");
const combosDb = await import("../../src/lib/db/combos.ts");
const { handleChat } = await import("../../src/sse/handlers/chat.ts");
const { initTranslators } = await import("../../open-sse/translator/index.ts");
const { clearInflight } = await import("../../open-sse/services/requestDedup.ts");
const { resetAllCircuitBreakers } = await import("../../src/shared/utils/circuitBreaker.ts");
const callLogs = await import("../../src/lib/usage/callLogs.ts");
const { flushProxyLogsSync } = await import("../../src/lib/proxyLogger.ts");
const { buildTargetTimeoutRunner } =
  await import("../../open-sse/services/combo/targetTimeoutRunner.ts");
const { COMBO_HEDGE_CANCELLED_REASON, COMBO_PER_MODEL_TIMEOUT_REASON } =
  await import("../../open-sse/services/combo/comboAbortReasons.ts");
const stalledConnections = await import("../../src/sse/handlers/chat/comboStalledConnections.ts");

const originalFetch = globalThis.fetch;
const TARGET_TIMEOUT_MS = 1_000;

type Reply = "stall" | "silent-stream" | "ok" | "early-eof" | "server-error";

const MESSAGE_START = {
  type: "message_start",
  message: {
    id: "msg-test",
    type: "message",
    role: "assistant",
    model: "claude-opus-5-5",
    content: [],
    usage: { input_tokens: 10, output_tokens: 0 },
  },
};

function claudeStream(text: string): Response {
  const frames: Record<string, unknown>[] = [
    MESSAGE_START,
    { type: "content_block_start", index: 0, content_block: { type: "text", text: "" } },
    { type: "content_block_delta", index: 0, delta: { type: "text_delta", text } },
    { type: "content_block_stop", index: 0 },
    {
      type: "message_delta",
      delta: { stop_reason: "end_turn", stop_sequence: null },
      usage: { output_tokens: 3 },
    },
    { type: "message_stop" },
  ];
  return new Response(
    frames.map((frame) => `event: ${frame.type}\ndata: ${JSON.stringify(frame)}\n\n`).join(""),
    { headers: { "Content-Type": "text/event-stream" } }
  );
}

/** HTTP 200 whose SSE body closes before a single event: an upstream error, not a stall. */
function earlyEofStream(): Response {
  return new Response(
    new ReadableStream<Uint8Array>({
      start(controller) {
        controller.close();
      },
    }),
    { headers: { "Content-Type": "text/event-stream" } }
  );
}

/** Accepts the request and never answers, until the dispatch is aborted. */
function stalledUpstream(signal: AbortSignal | null | undefined): Promise<Response> {
  return new Promise((_resolve, reject) => {
    if (!signal) return;
    const onAbort = () => reject(signal.reason ?? new DOMException("aborted", "AbortError"));
    if (signal.aborted) onAbort();
    else signal.addEventListener("abort", onAbort, { once: true });
  });
}

/** Opens the stream (message_start) and then sends nothing, until the dispatch is aborted. */
function silentStream(signal: AbortSignal | null | undefined): Response {
  return new Response(
    new ReadableStream<Uint8Array>({
      start(controller) {
        controller.enqueue(
          new TextEncoder().encode(
            `event: message_start\ndata: ${JSON.stringify(MESSAGE_START)}\n\n`
          )
        );
        signal?.addEventListener(
          "abort",
          () => {
            try {
              controller.error(signal.reason);
            } catch {
              // Already cancelled by the reader.
            }
          },
          { once: true }
        );
      },
    }),
    { headers: { "Content-Type": "text/event-stream" } }
  );
}

function stubClaude(plan: (token: string, attempt: number) => Reply): string[] {
  const dispatches: string[] = [];
  globalThis.fetch = async (input, init) => {
    const url = input instanceof Request ? input.url : String(input);
    if (!url.includes("/v1/messages")) {
      return new Response("{}", { headers: { "Content-Type": "application/json" } });
    }
    const token = new Headers(init?.headers).get("authorization")?.replace(/^Bearer /, "") ?? "";
    dispatches.push(token);
    const reply = plan(token, dispatches.length);
    if (reply === "stall") return stalledUpstream(init?.signal);
    if (reply === "silent-stream") return silentStream(init?.signal);
    if (reply === "early-eof") return earlyEofStream();
    if (reply === "server-error") {
      return new Response(
        JSON.stringify({ type: "error", error: { type: "api_error", message: "Internal error" } }),
        { status: 500, headers: { "Content-Type": "application/json" } }
      );
    }
    return claudeStream(`OK-${token}`);
  };
  return dispatches;
}

async function seedClaudeAccount(name: string): Promise<{ id: string; token: string }> {
  const token = `test-${name}`;
  const row = await providersDb.createProviderConnection({
    provider: "claude",
    authType: "oauth",
    name,
    accessToken: token,
    expiresAt: new Date(Date.now() + 3_600_000).toISOString(),
    isActive: true,
    testStatus: "active",
  });
  return { id: String(row.id), token };
}

async function createOpusCombo(name: string, targetTimeoutMs = TARGET_TIMEOUT_MS): Promise<string> {
  await combosDb.createCombo({
    name,
    strategy: "priority",
    models: ["claude/claude-opus-5-5", "claude/claude-opus-5-5-high"],
    config: {
      maxRetries: 0,
      retryDelayMs: 0,
      fallbackDelayMs: 0,
      targetTimeoutMs,
    },
  });
  return name;
}

function comboRequest(model: string): Request {
  return new Request("http://localhost/v1/chat/completions", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      model,
      messages: [{ role: "user", content: `Reply OK. ${crypto.randomUUID()}` }],
      stream: true,
      max_tokens: 64,
    }),
  });
}

test.beforeEach(async () => {
  clearInflight();
  resetAllCircuitBreakers();
  initTranslators();
  // fill-first always hands out the first account, exactly like the production account that
  // carries most of the traffic, so only the stalled-account preference can move target 2.
  await settingsDb.updateSettings({ fallbackStrategy: "fill-first", autoDbBackup: false });
});

async function resetTestState(): Promise<void> {
  globalThis.fetch = originalFetch;
  await callLogs.waitForCallLogSaves(2000);
  await new Promise((resolve) => setTimeout(resolve, 50));
  flushProxyLogsSync();
  clearInflight();
  core.resetDbInstance();
  fs.rmSync(dataDir, { recursive: true, force: true });
  fs.mkdirSync(dataDir, { recursive: true });
}

// The per-target timer starts before the first request has loaded the cold request path. One
// warm-up combo request (generous timeout, result ignored) keeps that out of every stall test.
test.before(async () => {
  initTranslators();
  await settingsDb.updateSettings({ fallbackStrategy: "fill-first", autoDbBackup: false });
  await seedClaudeAccount("warm-up");
  stubClaude(() => "ok");
  const warmUp = await handleChat(
    comboRequest(await createOpusCombo("stall-avoid-warm-up", 30_000))
  );
  await warmUp.text();
  await resetTestState();
});

test.afterEach(resetTestState);

test.after(() => {
  globalThis.fetch = originalFetch;
  core.resetDbInstance();
  fs.rmSync(dataDir, { recursive: true, force: true });
});

test("after a combo target timeout on account A, the next same-provider target uses account B", async () => {
  const a = await seedClaudeAccount("stall-a");
  const b = await seedClaudeAccount("stall-b");
  const combo = await createOpusCombo("stall-avoid-two-accounts");
  const dispatches = stubClaude((token) => (token === a.token ? "stall" : "ok"));

  const response = await handleChat(comboRequest(combo));
  const body = await response.text();

  assert.equal(response.status, 200, body);
  assert.deepEqual(
    dispatches,
    [a.token, b.token],
    "target 2 must not be handed the account that just stalled target 1"
  );
  assert.match(body, new RegExp(`OK-${b.token}`));
  assert.equal(response.headers.get("X-OmniRoute-Selected-Connection-Id"), b.id);
});

test("only the account in flight when the timer fires is avoided, not one that failed earlier in the target", async () => {
  const a = await seedClaudeAccount("in-flight-a");
  const b = await seedClaudeAccount("in-flight-b");
  await seedClaudeAccount("in-flight-c");
  const combo = await createOpusCombo("stall-avoid-in-flight-only");
  // Target 1: A fails fast, chat.ts moves on to B inside the same target, and B stalls.
  const dispatches = stubClaude((token, attempt) => {
    if (token === b.token) return "stall";
    return token === a.token && attempt === 1 ? "server-error" : "ok";
  });

  const response = await handleChat(comboRequest(combo));
  const body = await response.text();

  assert.equal(response.status, 200, body);
  assert.deepEqual(
    dispatches,
    [a.token, b.token, a.token],
    "target 2 avoids B (stalled) but may still use A, whose failure was not a timeout"
  );
  assert.equal(response.headers.get("X-OmniRoute-Selected-Connection-Id"), a.id);
});

test("an account that opens the stream but never produces output is also avoided by the next target", async () => {
  const a = await seedClaudeAccount("silent-a");
  const b = await seedClaudeAccount("silent-b");
  const combo = await createOpusCombo("stall-avoid-silent-stream");
  const dispatches = stubClaude((token) => (token === a.token ? "silent-stream" : "ok"));

  const response = await handleChat(comboRequest(combo));
  const body = await response.text();

  assert.equal(response.status, 200, body);
  assert.deepEqual(dispatches, [a.token, b.token]);
  assert.match(body, new RegExp(`OK-${b.token}`));
});

test("with no other eligible account, the next target still falls back to the stalled one", async () => {
  const a = await seedClaudeAccount("only-a");
  const combo = await createOpusCombo("stall-avoid-single-account");
  const dispatches = stubClaude((_token, attempt) => (attempt === 1 ? "stall" : "ok"));

  const response = await handleChat(comboRequest(combo));
  const body = await response.text();

  assert.equal(response.status, 200, body);
  assert.deepEqual(dispatches, [a.token, a.token], "a singleton pool keeps its only account");
  assert.match(body, new RegExp(`OK-${a.token}`));
});

test("an upstream error on account A (not a timeout) does not steer the next target away from A", async () => {
  const a = await seedClaudeAccount("eof-a");
  await seedClaudeAccount("eof-b");
  const combo = await createOpusCombo("stall-avoid-non-timeout-error");
  // Target 1: early EOF plus its one bounded same-account retry; target 2: healthy.
  const dispatches = stubClaude((_token, attempt) => (attempt <= 2 ? "early-eof" : "ok"));

  const response = await handleChat(comboRequest(combo));
  const body = await response.text();

  assert.equal(response.status, 200, body);
  assert.equal(dispatches.length, 3, `unexpected dispatches: ${dispatches.join(",")}`);
  assert.deepEqual(
    dispatches,
    [a.token, a.token, a.token],
    "only a combo per-target timeout may make later targets avoid an account"
  );
});

test("the stalled-account preference does not leak into a later combo request", async () => {
  const a = await seedClaudeAccount("leak-a");
  const b = await seedClaudeAccount("leak-b");
  const combo = await createOpusCombo("stall-avoid-no-leak");
  let stallA = true;
  const dispatches = stubClaude((token) => (token === a.token && stallA ? "stall" : "ok"));

  const first = await handleChat(comboRequest(combo));
  const firstBody = await first.text();
  assert.equal(first.status, 200, firstBody);
  assert.deepEqual(dispatches, [a.token, b.token]);

  stallA = false;
  dispatches.length = 0;
  const second = await handleChat(comboRequest(combo));
  const secondBody = await second.text();

  assert.equal(second.status, 200, secondBody);
  assert.deepEqual(dispatches, [a.token], "a fresh combo request starts from the usual account");
  assert.equal(second.headers.get("X-OmniRoute-Selected-Connection-Id"), a.id);
});

// ── The watch itself: which aborts count as a stall ─────────────────────────

const quietLog = { info() {}, warn() {}, debug() {}, error() {} };

/**
 * Run one target through the real per-target timeout runner, with the combo request signal
 * merged in the way safetyStopLatch.ts does before chat.ts sees `modelAbortSignal`.
 */
async function runWatchedTarget(
  stalled: Map<string, string>,
  dispatch: (signal: AbortSignal) => Promise<Response>
): Promise<Response> {
  const requestSignal = new AbortController().signal;
  const run = buildTargetTimeoutRunner({
    comboTargetTimeoutMs: 40,
    log: quietLog,
    handleSingleModel: async (_body, _model, target) => {
      const signal = AbortSignal.any([requestSignal, target!.modelAbortSignal!]);
      stalledConnections.watchComboTargetStall(stalled, signal, "claude", "conn-a");
      return dispatch(signal);
    },
  });
  return run({ messages: [{ role: "user", content: "ping" }] }, "claude/claude-opus-5-5");
}

test("the runner's dispatch timer and first-output gate both record the stalled account", async () => {
  const timedOut = new Map<string, string>();
  const viaTimer = await runWatchedTarget(timedOut, (signal) => stalledUpstream(signal));
  assert.equal(viaTimer.status, 504);
  assert.deepEqual([...timedOut], [["conn-a", "claude"]]);

  const silent = new Map<string, string>();
  const viaGate = await runWatchedTarget(silent, async (signal) => silentStream(signal));
  assert.equal(viaGate.status, 504);
  assert.deepEqual([...silent], [["conn-a", "claude"]]);
});

test("hedge cancellation, client disconnect and success never record the account", async () => {
  const stalled = new Map<string, string>();
  const client = new AbortController();
  const hedged = new AbortController();
  stalledConnections.watchComboTargetStall(
    stalled,
    AbortSignal.any([client.signal, hedged.signal]),
    "claude",
    "conn-hedged"
  );
  hedged.abort(new Error(COMBO_HEDGE_CANCELLED_REASON));

  const disconnected = new AbortController();
  stalledConnections.watchComboTargetStall(stalled, disconnected.signal, "claude", "conn-client");
  disconnected.abort();

  const succeeded = await runWatchedTarget(stalled, async () => claudeStream("fast"));
  assert.equal(succeeded.status, 200);
  await succeeded.text();

  assert.equal(stalled.size, 0);
});

test("a dispatch that failed for another reason is not blamed for a later timeout", () => {
  const stalled = new Map<string, string>();
  const target = new AbortController();
  const stop = stalledConnections.watchComboTargetStall(stalled, target.signal, "claude", "conn-a");
  stop(); // upstream error on conn-a; chat.ts moves on to another account
  target.abort(new Error(COMBO_PER_MODEL_TIMEOUT_REASON));
  assert.equal(stalled.size, 0);

  const alreadyAborted = new AbortController();
  alreadyAborted.abort(new Error(COMBO_PER_MODEL_TIMEOUT_REASON));
  stalledConnections.watchComboTargetStall(stalled, alreadyAborted.signal, "claude", "conn-b");
  assert.equal(stalled.size, 0, "an abort before this dispatch started is not this account's");
});

test("stalled accounts only steer selection for their own provider", () => {
  const stalled = new Map([
    ["conn-claude", "claude"],
    ["conn-codex", "codex"],
  ]);
  assert.deepEqual(stalledConnections.comboStalledConnectionIds(stalled, "claude"), [
    "conn-claude",
  ]);
  assert.deepEqual(stalledConnections.comboStalledConnectionIds(stalled, "openai"), []);
  assert.deepEqual(stalledConnections.comboStalledConnectionIds(null, "claude"), []);
});
