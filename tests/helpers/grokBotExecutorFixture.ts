import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { cleanupTempDataDir } from "../_setup/tempDataDir.ts";

export let TEST_DATA_DIR = "";
let originalFetch: typeof fetch;
let guardedFetch: typeof fetch;
let originalFetchDescriptor: PropertyDescriptor | undefined;
const blockedOrigins: string[] = [];

export function createLoopbackOnlyFetch(
  fetchImpl: typeof fetch,
  recordBlocked: (origin: string) => void
): typeof fetch {
  return async (input, init) => {
    const raw = typeof input === "string" ? input : input instanceof URL ? input.href : input.url;
    const url = new URL(raw);
    if (url.protocol !== "http:" || url.hostname !== "127.0.0.1") {
      recordBlocked(url.origin);
      throw new Error("Executor test attempted a non-loopback request");
    }
    const response = await fetchImpl(input, { ...init, redirect: "manual" });
    if (response.status >= 300 && response.status < 400) {
      recordBlocked(url.origin + " (redirect refused)");
      throw new Error("Executor test attempted a redirect");
    }
    return response;
  };
}

function installLoopbackOnlyFetch() {
  originalFetch = globalThis.fetch;
  guardedFetch = createLoopbackOnlyFetch(originalFetch, (origin) => blockedOrigins.push(origin));
  originalFetchDescriptor = Object.getOwnPropertyDescriptor(globalThis, "fetch");
  // proxyFetch installs a production wrapper at import time. Keep this fixture's
  // transport pinned so that neither that wrapper nor a test can enable egress.
  Object.defineProperty(globalThis, "fetch", {
    configurable: true,
    get: () => guardedFetch,
    set: () => {},
  });
}

export let GrokBotExecutor: typeof import("../../open-sse/executors/grok-bot.ts").GrokBotExecutor;
export let setGrokBotTransportForTests: typeof import("../../open-sse/executors/grok-bot.ts").setGrokBotTransportForTests;
export let _grokBotInternals: typeof import("../../open-sse/executors/grok-bot.ts")._grokBotInternals;

export async function prepareExecutorFixture() {
  installLoopbackOnlyFetch();
  TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-grok-bot-exec-"));
  process.env.DATA_DIR = TEST_DATA_DIR;
  const mod = await import("../../open-sse/executors/grok-bot.ts");
  assert.equal(
    globalThis.fetch,
    guardedFetch,
    "production imports must preserve the local-only guard"
  );
  GrokBotExecutor = mod.GrokBotExecutor;
  setGrokBotTransportForTests = mod.setGrokBotTransportForTests;
  _grokBotInternals = mod._grokBotInternals;
}

export async function cleanupExecutorFixture() {
  try {
    if (TEST_DATA_DIR) await cleanupTempDataDir(TEST_DATA_DIR);
  } finally {
    if (originalFetchDescriptor) {
      Object.defineProperty(globalThis, "fetch", originalFetchDescriptor);
    }
  }
  assert.deepEqual(blockedOrigins, [], "executor tests must never attempt external requests");
}

export type WatchEvent = Record<string, unknown>;

export type FakeTransport = {
  calls: { method: string; payload: Record<string, unknown> }[];
  rosterRows: Record<string, unknown>[];
  rosterEcho: boolean;
  discoveredTools: string[];
  legacyTools: string[];
  /** Cursor-shaped entries: name is prefixed, toolName holds the raw name. */
  prefixedTools: { name: string; toolName: string }[];
  lastAgentId: string;
  lastMessageId: string;
  failDelete: boolean;
  createBehavior: "ok" | "missing-agent" | "id-mismatch" | "wrong-harness" | "timeout";
  watchEvents: WatchEvent[];
  /** Test hook fired after the SendGrokBotUserMessage payload validates. */
  onSend?: (payload: Record<string, unknown>) => void | Promise<void>;
  /**
   * Async watch override for escalation tests: the fake races this iterator
   * against the watch signal so cancel propagates like the live transport.
   */
  watchEventsAsync?: () => AsyncIterable<unknown>;
  stampAgentId?: boolean;
};

export function makeTransport(): FakeTransport {
  return {
    calls: [],
    rosterRows: [],
    rosterEcho: false,
    discoveredTools: ["bridge_value"],
    legacyTools: [],
    prefixedTools: [],
    lastAgentId: "",
    lastMessageId: "",
    failDelete: false,
    createBehavior: "ok",
    watchEvents: [],
    onSend: undefined,
    watchEventsAsync: undefined,
  };
}

async function* abortable<T>(
  iterable: AsyncIterable<T>,
  signal: AbortSignal | null
): AsyncIterable<T> {
  const iterator = iterable[Symbol.asyncIterator]();
  try {
    while (true) {
      if (signal?.aborted) throw new Error("aborted");
      const raceSignal = signal
        ? new Promise<never>((_, reject) =>
            signal.addEventListener("abort", () => reject(new Error("aborted")), { once: true })
          )
        : null;
      const next = await (raceSignal
        ? Promise.race([iterator.next(), raceSignal])
        : iterator.next());
      if (next.done) return;
      yield next.value;
    }
  } finally {
    // Do not await: a generator suspended on a never-settling await blocks
    // return() forever, which would hang the abort propagation itself.
    void iterator.return?.();
  }
}

export function b64Row(clientNonce: string, answer: string) {
  return {
    rows: {
      entries: [
        {
          entryId: `entry-echo-${Math.random().toString(36).slice(2)}`,
          body: Buffer.from(
            JSON.stringify({
              requestId: "req-1",
              clientNonce,
              kind: "send-message",
              message: { type: "text", content: "user prompt echo" },
            })
          ).toString("base64"),
        },
        {
          entryId: `entry-${Math.random().toString(36).slice(2)}`,
          body: Buffer.from(
            JSON.stringify({
              requestId: "req-1",
              clientNonce: null,
              kind: "send-message",
              message: { type: "text", content: answer },
            })
          ).toString("base64"),
        },
      ],
    },
  };
}

export function installTransport(t: FakeTransport) {
  setGrokBotTransportForTests({
    async rpc(method: string, payload: Record<string, unknown>) {
      t.calls.push({ method, payload });
      if (method === "CreateGrokBotTemporalAgent") {
        t.lastAgentId = String(payload.agentId);
        if (t.createBehavior === "timeout") {
          const e = new Error("The operation timed out.");
          e.name = "TimeoutError";
          throw e;
        }
        // Stub-side shape guards mirroring the live server contract (measured
        // 2026-09-23): harness must be the proto3 enum numeric form, and the
        // roster-display fields are required. Injecting the old shapes back
        // into the product code must turn these tests red.
        if (
          payload.harness !== 2 ||
          typeof payload.name !== "string" ||
          typeof payload.description !== "string" ||
          typeof payload.title !== "string" ||
          typeof payload.avatarShape !== "string" ||
          typeof payload.avatarColor !== "string" ||
          typeof payload.kickstartRequested !== "boolean" ||
          typeof payload.introductionSuppressed !== "boolean"
        ) {
          return {};
        }
        const agentId = payload.agentId;
        if (t.createBehavior === "missing-agent") return {};
        if (t.createBehavior === "id-mismatch")
          return { agent: { id: "row-x", legacyAgentId: "other", harness: "temporal" } };
        if (t.createBehavior === "wrong-harness")
          return { agent: { id: "row-x", legacyAgentId: agentId, harness: "persistent" } };
        // Live shape (measured 2026-09-23): client nonce echoes as legacyAgentId,
        // roster primary key lives in agent.id, harness echoes lowercase.
        return { agent: { id: "row-1", legacyAgentId: agentId, harness: "temporal" } };
      }
      if (method === "SendGrokBotUserMessage") {
        // Live contract: flat text + machineId + messageId + sentAtMs; the
        // nested message{} shape is rejected upstream.
        if (
          typeof payload.text !== "string" ||
          typeof payload.machineId !== "string" ||
          typeof payload.messageId !== "string" ||
          typeof payload.sentAtMs !== "string" ||
          payload.sessionId !== ""
        ) {
          throw new Error("SendGrokBotUserMessage invalid payload");
        }
        t.lastMessageId = String(payload.messageId);
        await t.onSend?.(payload);
        return { dispatched: true };
      }
      if (method === "DeleteGrokBotAgent") {
        if (t.failDelete) {
          return Promise.reject(new Error("upstream 500"));
        }
        return {};
      }
      if (method === "ListGrokBotAgents") {
        if (t.rosterEcho) {
          return { agents: [{ id: "row-9", agentId: t.lastAgentId }] };
        }
        return { agents: t.rosterRows };
      }
      if (method === "aiserver.v1.DashboardService/ListSandMcpTools") {
        const tools = [...t.discoveredTools.map((name) => ({ name })), ...t.prefixedTools];
        const response: Record<string, unknown> = {
          servers: [{ status: "connected", tools }],
        };
        if (t.legacyTools.length > 0) {
          response.tools = t.legacyTools.map((name) => ({ name }));
        }
        return response;
      }
      return {};
    },
    async *watch(
      method: string,
      payload: Record<string, unknown>,
      opts?: { signal?: AbortSignal | null }
    ) {
      t.calls.push({ method, payload });
      // Default: live-shaped frames (measured 2026-09-23). Overrides come from
      // t.watchEvents (compatibility paths) — a single `false` sentinel yields
      // nothing extra so tests can inject raw sequences.
      const cursor = (payload.cursors as Array<Record<string, unknown>> | undefined)?.[0];
      const agentId = cursor?.agentId;
      // The current call is already recorded, so a count of one means this is
      // the first watch of the turn. Later watches may carry the generation a
      // cursorTooOld or cleared frame named.
      const earlierWatches = t.calls.filter(
        (call) => call.method === "WatchGrokBotTranscripts"
      ).length;
      if (
        (earlierWatches === 1 && (cursor?.generation !== 0 || cursor?.afterUpdatedSeq !== "0")) ||
        payload.includeUnlistedAgents !== false ||
        payload.inlineBodyMaxBytes !== 65536
      ) {
        throw new Error("WatchGrokBotTranscripts invalid payload");
      }
      const stamp = (ev: unknown): unknown => {
        if (t.stampAgentId === false || typeof agentId !== "string") return ev;
        const frame = ev as {
          agent?: { agentId?: string };
          agentState?: { live?: Array<{ agentId?: string }> };
        };
        if (frame.agent && frame.agent.agentId === undefined) frame.agent.agentId = agentId;
        for (const live of frame.agentState?.live ?? []) {
          if (live.agentId === undefined) live.agentId = agentId;
        }
        return ev;
      };
      if (t.watchEventsAsync) {
        yield* abortable(
          (async function* () {
            for await (const ev of t.watchEventsAsync!()) yield stamp(ev);
          })(),
          opts?.signal ?? null
        );
        return;
      }
      if (t.watchEvents.length > 0) {
        for (const ev of t.watchEvents) yield stamp(ev);
        return;
      }
      if (typeof agentId !== "string") return;
      yield { agentState: { live: [{ agentId, isRunningTurn: true }] } };
      if (t.lastMessageId) {
        yield b64Row(t.lastMessageId, "answer");
        yield terminal("submit_answer", "answer");
      }
      yield { agentState: { live: [{ agentId, isRunningTurn: false }] } };
    },
  });
}

export function registeredNonceFromSend(t: FakeTransport): string {
  // The discovery config recorded on SendGrokBotUserMessage carries the
  // registry-backed path URL; extract the nonce the turn registered.
  const send = t.calls.find((call) => call.method === "SendGrokBotUserMessage");
  assert.ok(send, "expected a SendGrokBotUserMessage call");
  const config = JSON.parse(String((send!.payload as Record<string, unknown>).mcpConfigJson));
  const url = String(config.mcpServers.bridge.url);
  const match = /\/grok-bridge\/([A-Za-z0-9_-]{22})\/mcp$/.exec(url);
  assert.ok(match, `expected a registered path URL, got ${url}`);
  return match![1]!;
}

export function fakeBridgeUrl(tag: string): string {
  // 22-char nonce from the allowed class, deterministic per tag so
  // per-test URL dedupe (usedBridgeNonces) still distinguishes turns.
  const nonce = (tag + "abcdefghijklmnopqrstuv") // 22 chars total
    .replace(/[^A-Za-z0-9_-]/g, "x")
    .slice(0, 22)
    .padEnd(22, "x");
  return `https://bridge.example.test/grok-bridge/${nonce}/mcp`;
}

export function makeInput(
  messages: unknown[],
  stream = false,
  signal?: AbortSignal,
  bridge?: { url: string; challenge?: string }
) {
  return {
    model: "grok-bot",
    stream,
    body: {
      model: "grok-bot",
      messages,
      stream,
      grokBotBridge: bridge,
    },
    credentials: {
      accessToken: "at",
      refreshToken: "rt",
      connectionId: "conn-1",
    },
    signal: signal ?? null,
    log: null,
  };
}

export function terminal(name: "submit_answer", content: string): WatchEvent {
  return { entry: { kind: "tool-call", tool: { name, callId: "submit-1", content } } };
}

export function settledWatchEvents(answer: string): WatchEvent[] {
  // `agent` frames without agentId exercise the compatibility parsing path;
  // live-shaped agentState.live frames are covered by the default watch
  // generator in installTransport.
  return [
    { agent: { isRunningTurn: true } },
    { entry: { kind: "send-message", message: { type: "text", content: answer } } },
    terminal("submit_answer", answer),
    { agent: { isRunningTurn: false } },
  ];
}
