import { describe, it, beforeEach } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-grok-bot-sweeper-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const {
  sweepGrokBotCleanupsOnce,
  resetCleanupSweeperTrackingForTests,
  CLEANUP_ABSENT_MISS_THRESHOLD,
  CLEANUP_ABSENT_SPAN_MS,
  CLEANUP_ITEM_TTL_MS,
} = await import("../../open-sse/executors/grok-bot-cleanup-sweeper.ts");
const {
  queueFile,
  readQueue,
  enqueueCleanup,
} = await import("../../open-sse/executors/grok-bot-cleanup-queue.ts");
import type { PendingCleanup } from "../../open-sse/executors/grok-bot-cleanup-queue.ts";

type SweeperTransport = {
  rpc(method: string, payload: Record<string, unknown>, opts?: { signal?: AbortSignal }): Promise<unknown>;
};

function makeTransport(behavior: {
  roster?: { id: string; agentId: string }[] | Error;
  deleteResult?: Error;
  onDelete?: (id: string) => void;
  deferredDelete?: { promise: Promise<unknown>; resolve: () => void };
}): { transport: SweeperTransport; calls: { method: string; payload: Record<string, unknown> }[] } {
  const calls: { method: string; payload: Record<string, unknown> }[] = [];
  return {
    calls,
    transport: {
      async rpc(method: string, payload: Record<string, unknown>) {
        calls.push({ method, payload });
        if (method === "ListGrokBotAgents") {
          if (behavior.roster instanceof Error) throw behavior.roster;
          return { agents: behavior.roster ?? [] };
        }
        if (method === "DeleteGrokBotAgent") {
          behavior.onDelete?.(String(payload.id));
          if (behavior.deferredDelete) return behavior.deferredDelete.promise;
          if (behavior.deleteResult) throw behavior.deleteResult;
          return {};
        }
        return {};
      },
    },
  };
}

let now: number;
let warnings: string[];

function item(overrides: Partial<PendingCleanup> = {}): PendingCleanup {
  return {
    connectionId: "conn-1",
    agentId: "agent-1",
    createdAt: new Date(now).toISOString(),
    ...overrides,
  };
}

describe("grok bot cleanup sweeper", () => {
  beforeEach(() => {
    now = Date.parse("2026-09-30T12:00:00Z");
    warnings = [];
    resetCleanupSweeperTrackingForTests();
    try {
      fs.unlinkSync(queueFile());
    } catch {
      /* fresh queue */
    }
  });

  function optionsFor(behavior: Parameters<typeof makeTransport>[0], connection: { refreshToken?: string | null } | null = { refreshToken: "rt" }) {
    const made = makeTransport(behavior);
    return {
      made,
      options: {
        resolveConnection: async () => connection,
        transportFor: () => made.transport,
        // Never touch the network in unit tests.
        refresh: async () => ({ accessToken: "at" }),
        now: () => now,
        log: { warn: (...args: unknown[]) => warnings.push(args.map(String).join(" ")) },
      },
    };
  }

  it("deletes a row-id item and removes it from the queue", async () => {
    enqueueCleanup(item({ rowId: "row-9" }));
    const { made, options } = optionsFor({});
    await sweepGrokBotCleanupsOnce(options);
    assert.equal(readQueue().length, 0);
    assert.deepEqual(
      made.calls.filter((c) => c.method === "DeleteGrokBotAgent"),
      [{ method: "DeleteGrokBotAgent", payload: { id: "row-9" } }]
    );
  });

  it("resolves the row id through the roster when only the agent id is known", async () => {
    enqueueCleanup(item());
    const { made, options } = optionsFor({ roster: [{ id: "row-7", agentId: "agent-1" }] });
    await sweepGrokBotCleanupsOnce(options);
    assert.equal(readQueue().length, 0);
    assert.equal(made.calls[0].method, "ListGrokBotAgents");
    assert.deepEqual(made.calls[1], { method: "DeleteGrokBotAgent", payload: { id: "row-7" } });
  });

  it("keeps the item when the roster RPC fails (transient)", async () => {
    enqueueCleanup(item());
    const { options } = optionsFor({ roster: new Error("network down") });
    await sweepGrokBotCleanupsOnce(options);
    assert.equal(readQueue().length, 1);
  });

  it("keeps the item on single roster misses, drops it terminally after the miss threshold spanning the window", async () => {
    enqueueCleanup(item());
    const { options } = optionsFor({ roster: [] });
    // One miss below the threshold: kept, no terminal log.
    for (let i = 0; i < CLEANUP_ABSENT_MISS_THRESHOLD - 1; i += 1) {
      await sweepGrokBotCleanupsOnce(options);
      assert.equal(readQueue().length, 1);
      assert.equal(warnings.some((w) => w.includes("unresolved")), false);
    }
    // One more miss still inside the 10-minute window: count alone is not enough.
    await sweepGrokBotCleanupsOnce(options);
    assert.equal(readQueue().length, 1);
    assert.equal(warnings.some((w) => w.includes("unresolved")), false);
    // Advance past the observation window: the next miss terminates.
    now += CLEANUP_ABSENT_SPAN_MS + 1;
    await sweepGrokBotCleanupsOnce(options);
    assert.equal(readQueue().length, 0);
    assert.equal(warnings.some((w) => w.includes("unresolved")), true);
  });

  it("drops an item older than the 24h TTL without any RPC", async () => {
    enqueueCleanup(item({ createdAt: new Date(now - CLEANUP_ITEM_TTL_MS - 1000).toISOString() }));
    const { made, options } = optionsFor({});
    await sweepGrokBotCleanupsOnce(options);
    assert.equal(readQueue().length, 0);
    assert.equal(made.calls.length, 0);
    assert.equal(warnings.some((w) => w.includes("dead-letter")), true);
  });

  it("drops the item when the persisted connection is gone", async () => {
    enqueueCleanup(item());
    const { made, options } = optionsFor({}, null);
    await sweepGrokBotCleanupsOnce(options);
    assert.equal(readQueue().length, 0);
    assert.equal(made.calls.length, 0);
  });

  it("drops the item when the connection has no refresh token (unrecoverable)", async () => {
    enqueueCleanup(item());
    const { made, options } = optionsFor({}, { refreshToken: null });
    await sweepGrokBotCleanupsOnce(options);
    assert.equal(readQueue().length, 0);
    assert.equal(made.calls.length, 0);
  });

  it("keeps the item when the roster row id and agent id are both absent", async () => {
    enqueueCleanup(item({ agentId: undefined, rowId: undefined }));
    const { options } = optionsFor({});
    await sweepGrokBotCleanupsOnce(options);
    assert.equal(readQueue().length, 0);
    assert.equal(warnings.some((w) => w.includes("neither roster row id")), true);
  });

  it("keeps the item when the delete RPC fails", async () => {
    enqueueCleanup(item({ rowId: "row-9" }));
    const { options } = optionsFor({ deleteResult: new Error("delete boom") });
    await sweepGrokBotCleanupsOnce(options);
    assert.equal(readQueue().length, 1);
  });

  it("never double-deletes an item when two sweeps overlap (per-item lock)", async () => {
    enqueueCleanup(item({ rowId: "row-9" }));
    let deleteCount = 0;
    let releaseDelete!: () => void;
    const deferred = new Promise<unknown>((resolve) => {
      releaseDelete = () => resolve({});
    });
    // Only the FIRST delete blocks on the deferred; a lock violation shows up
    // as a second, immediately-completing delete call (clean FAIL, no hang).
    const made = {
      calls: [] as { method: string; payload: Record<string, unknown> }[],
      transport: {
        async rpc(method: string, payload: Record<string, unknown>) {
          made.calls.push({ method, payload });
          if (method === "ListGrokBotAgents") return { agents: [] };
          if (method === "DeleteGrokBotAgent") {
            deleteCount += 1;
            return deleteCount === 1 ? deferred : {};
          }
          return {};
        },
      } as SweeperTransport,
    };
    const options = {
      resolveConnection: async () => ({ refreshToken: "rt" }),
      transportFor: () => made.transport,
      refresh: async () => ({ accessToken: "at" }),
      now: () => now,
      log: { warn: (...args: unknown[]) => warnings.push(args.map(String).join(" ")) },
    };
    void deleteCount;
    const sweep1 = sweepGrokBotCleanupsOnce(options);
    // Give sweep1 a tick to claim the in-flight lock.
    await new Promise((resolve) => setImmediate(resolve));
    const sweep2 = sweepGrokBotCleanupsOnce(options);
    await sweep2;
    releaseDelete();
    await sweep1;
    assert.equal(deleteCount, 1, "overlapping sweeps must not double-delete");
    assert.equal(
      made.calls.filter((c) => c.method === "DeleteGrokBotAgent").length,
      1
    );
    assert.equal(readQueue().length, 0);
  });

  it("keeps the item when token refresh fails (transient)", async () => {
    enqueueCleanup(item({ rowId: "row-9" }));
    const { options } = optionsFor({});
    await sweepGrokBotCleanupsOnce({
      ...options,
      refresh: async () => ({ error: "temporarily unavailable" }),
    });
    assert.equal(readQueue().length, 1);
  });

  it("keeps the item when the injected refresh resolves null", async () => {
    enqueueCleanup(item({ rowId: "row-9" }));
    const { options } = optionsFor({});
    await sweepGrokBotCleanupsOnce({ ...options, refresh: async () => null });
    assert.equal(readQueue().length, 1);
  });
});
