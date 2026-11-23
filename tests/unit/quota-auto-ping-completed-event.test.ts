/**
 * Codex quota auto-ping: a ping only counts as sent once the Responses SSE stream
 * carries a `response.completed` event. Codex reports many failures inside an HTTP 200
 * stream (`response.failed`, `response.incomplete`, `error`), and a stream that ends
 * without completing never starts the 5h window — both must enter the failure cooldown
 * instead of recording `lastPingAt`.
 */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

// Transitively imports src/lib/db/core.ts; keep any accidental open off the real DB.
process.env.DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-quota-autoping-done-"));

const { runQuotaAutoPingTick, createQuotaAutoPingState } =
  await import("../../src/lib/services/quotaAutoPing.ts");
const { resetDbInstance } = await import("../../src/lib/db/core.ts");

test.after(() => {
  resetDbInstance();
});

const NOW_MS = new Date("2026-01-01T12:00:00.000Z").getTime();
const KEY = "codex:codex-1";

const COMPLETED_FRAME =
  'event: response.completed\ndata: {"type":"response.completed","response":{"status":"completed"}}\n\n';
const CREATED_FRAME =
  'event: response.created\ndata: {"type":"response.created","response":{"status":"in_progress"}}\n\n';

type PingResponse = {
  ok: boolean;
  text?: () => Promise<string>;
  body?: ReadableStream<Uint8Array>;
};

function streamResponse(chunks: string[], onCancel?: () => void): PingResponse {
  const encoder = new TextEncoder();
  let index = 0;
  const body = new ReadableStream<Uint8Array>({
    pull(controller) {
      if (index < chunks.length) controller.enqueue(encoder.encode(chunks[index++]));
      else controller.close();
    },
    cancel() {
      onCancel?.();
    },
  });
  return { ok: true, body };
}

async function runPing(response: PingResponse) {
  const updates: Array<[string, Record<string, unknown>]> = [];
  const deps = {
    getSettings: async () => ({ codexAutoPing: { connections: { "codex-1": true } } }),
    getProviderConnections: async ({ provider }: { provider: string }) =>
      provider === "codex"
        ? [{ id: "codex-1", provider: "codex", authType: "oauth", accessToken: "token" }]
        : [],
    updateProviderConnection: async (id: string, data: Record<string, unknown>) => {
      updates.push([id, data]);
      return null;
    },
    refreshAndUpdateCredentials: async (connection: unknown) => ({ connection }),
    getCodexUsage: async () => ({
      quotas: {
        session: { used: 1, total: 100, remaining: 99, resetAt: "2026-01-01T17:01:00.000Z" },
      },
    }),
    throttleQuotaFetch: async () => {},
    resolveProxyForConnection: async () => ({ proxy: null, level: "direct", levelId: null }),
    runWithProxyContext: async (_proxy: unknown, callback: () => Promise<unknown>) => callback(),
    getExecutor: () => ({ execute: async () => ({ response }) }),
    canExecuteProvider: () => true,
    isConnectionUnavailableToAuxiliaryActivity: async () => false,
    resolvePingModel: async () => "gpt-5.4-mini",
  };
  const state = createQuotaAutoPingState();
  state.resetCache[KEY] = "2026-01-01T17:00:00.000Z";
  await runQuotaAutoPingTick(deps as never, state, () => NOW_MS);
  return { updates, state };
}

test("200 stream carrying response.failed is a failed ping (failure cooldown, no lastPingAt)", async () => {
  const { updates, state } = await runPing({
    ok: true,
    text: async () =>
      CREATED_FRAME +
      'event: response.failed\ndata: {"type":"response.failed","response":{"status":"failed","error":{"code":"server_error","message":"boom"}}}\n\n',
  });

  assert.equal(updates.length, 0);
  assert.equal(state.failureCache[KEY], NOW_MS);
});

test("200 stream carrying a data-only error event is a failed ping", async () => {
  const { updates, state } = await runPing({
    ok: true,
    text: async () => 'data: {"type":"error","error":{"message":"usage limit reached"}}\n\n',
  });

  assert.equal(updates.length, 0);
  assert.equal(state.failureCache[KEY], NOW_MS);
});

test("200 stream carrying response.incomplete is a failed ping", async () => {
  const { updates, state } = await runPing(
    streamResponse([
      CREATED_FRAME,
      'event: response.incomplete\ndata: {"type":"response.incomplete","response":{"status":"incomplete","incomplete_details":{"reason":"max_output_tokens"}}}\n\n',
    ])
  );

  assert.equal(updates.length, 0);
  assert.equal(state.failureCache[KEY], NOW_MS);
});

test("200 stream that ends without response.completed is a failed ping", async () => {
  const { updates, state } = await runPing(streamResponse([CREATED_FRAME]));

  assert.equal(updates.length, 0);
  assert.equal(state.failureCache[KEY], NOW_MS);
});

test("empty 200 body is a failed ping", async () => {
  const { updates, state } = await runPing({ ok: true, text: async () => "" });

  assert.equal(updates.length, 0);
  assert.equal(state.failureCache[KEY], NOW_MS);
});

test("CRLF-framed response.completed split across chunks counts as sent", async () => {
  const crlf = (CREATED_FRAME + COMPLETED_FRAME).replace(/\n/g, "\r\n");
  const { updates, state } = await runPing(
    streamResponse([crlf.slice(0, 37), crlf.slice(37, 120), crlf.slice(120)])
  );

  assert.equal(updates.length, 1);
  assert.equal(updates[0][0], "codex-1");
  assert.equal(updates[0][1].lastPingedResetKey, "2026-01-01T17:01:00.000Z");
  assert.equal(state.failureCache[KEY], undefined);
});

test("data-only response.completed flushed at EOF without a trailing blank line counts as sent", async () => {
  const { updates } = await runPing({
    ok: true,
    text: async () =>
      'data: {"type":"response.created"}\n\ndata: {"type":"response.completed","response":{"status":"completed"}}',
  });

  assert.equal(updates.length, 1);
});

test("a failure event cancels the upstream stream instead of draining it", async () => {
  let cancelled = false;
  const failed =
    'event: response.failed\ndata: {"type":"response.failed","response":{"status":"failed"}}\n\n';
  const { updates } = await runPing(
    streamResponse([failed, CREATED_FRAME, COMPLETED_FRAME], () => {
      cancelled = true;
    })
  );

  assert.equal(updates.length, 0);
  assert.equal(cancelled, true);
});
