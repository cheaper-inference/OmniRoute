// @vitest-environment node
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { NextRequest } from "next/server";
import type { LogLine } from "@/lib/services/types";

const state = vi.hoisted(() => ({
  listeners: new Set<(line: LogLine) => void>(),
  snapshot: [] as LogLine[],
  getTopN: vi.fn(async () => [] as unknown[]),
}));
vi.mock("@/lib/api/requireManagementAuth", () => ({ requireManagementAuth: async () => null }));
vi.mock("@/lib/gamification/leaderboard", () => ({ getTopN: state.getTopN }));
vi.mock("@/lib/services/registry", () => ({
  getSupervisor: () => ({
    getRingBuffer: () => ({
      snapshot: () => state.snapshot,
      subscribe: (listener: (line: LogLine) => void) => {
        state.listeners.add(listener);
        return () => {
          state.listeners.delete(listener);
        };
      },
    }),
  }),
}));
const { GET: logs } = await import("@/app/api/services/[name]/logs/route");
const { GET: leaderboard } = await import("@/app/api/gamification/stream/route");
const aborters: AbortController[] = [];
function request(path: string) {
  const abort = new AbortController();
  aborters.push(abort);
  return { abort, req: new NextRequest(`http://localhost${path}`, { signal: abort.signal }) };
}
async function logResponse() {
  const { req, abort } = request("/api/services/demo/logs");
  return { response: await logs(req, { params: Promise.resolve({ name: "demo" }) }), abort };
}
function emit(line: string) {
  for (const callback of state.listeners) callback({ ts: 1, stream: "stdout", line });
}
beforeEach(() => {
  vi.useFakeTimers();
  state.snapshot = [];
  state.getTopN.mockReset().mockResolvedValue([]);
});
afterEach(() => {
  for (const abort of aborters.splice(0)) abort.abort();
  state.listeners.clear();
  vi.clearAllTimers();
  vi.useRealTimers();
});

describe("dashboard SSE lifecycle", () => {
  it("releases the log subscription and timer when the consumer cancels without abort", async () => {
    const { response, abort } = await logResponse();
    await response.body!.cancel();
    expect(abort.signal.aborted).toBe(false);
    expect(state.listeners.size).toBe(0);
    expect(vi.getTimerCount()).toBe(0);
  });

  it("bounds a stalled log consumer by bytes and releases its resources", async () => {
    const { response } = await logResponse();
    for (let i = 0; i < 300; i++) emit("x".repeat(4096));
    expect(state.listeners.size).toBe(0);
    expect(vi.getTimerCount()).toBe(0);
    await expect(response.body!.getReader().read()).rejects.toThrow("buffer limit");
  });

  it("keeps snapshot and live events intact for an actively reading consumer", async () => {
    const { response } = await logResponse();
    const reader = response.body!.getReader();
    expect(new TextDecoder().decode((await reader.read()).value)).toContain("event: snapshot");
    for (let i = 0; i < 300; i++) {
      emit("x".repeat(4096));
      expect(new TextDecoder().decode((await reader.read()).value)).toContain("event: log");
    }
    expect(state.listeners.size).toBe(1);
    await reader.cancel();
  });

  it("cancels leaderboard polling and heartbeat without requiring a signal abort", async () => {
    const { req } = request("/api/gamification/stream");
    const response = await leaderboard(req);
    await response.body!.cancel();
    expect(vi.getTimerCount()).toBe(0);
    await vi.advanceTimersByTimeAsync(30000);
    expect(state.getTopN).toHaveBeenCalledTimes(1);
  });

  it("does no database work or timer allocation for an already aborted leaderboard request", async () => {
    const { req, abort } = request("/api/gamification/stream");
    abort.abort();
    const response = await leaderboard(req);
    expect(state.getTopN).not.toHaveBeenCalled();
    expect(vi.getTimerCount()).toBe(0);
    expect((await response.body!.getReader().read()).done).toBe(true);
  });

  it("ignores an in-flight leaderboard result after consumer cancellation", async () => {
    let resolve!: (value: unknown[]) => void;
    state.getTopN.mockImplementation(
      () =>
        new Promise((done) => {
          resolve = done;
        })
    );
    const { req } = request("/api/gamification/stream");
    const response = await leaderboard(req);
    await response.body!.cancel();
    resolve([]);
    await Promise.resolve();
    expect(vi.getTimerCount()).toBe(0);
  });

  it("sanitizes leaderboard failures before sending their event", async () => {
    state.getTopN.mockRejectedValue(
      new Error("read failed /srv/private/account.sqlite\n    at run (/srv/app/db.ts:3:9)")
    );
    const { req } = request("/api/gamification/stream");
    const response = await leaderboard(req);
    const reader = response.body!.getReader();
    const wire = new TextDecoder().decode((await reader.read()).value);
    expect(wire).toContain("event: error");
    expect(wire).not.toContain("/srv/");
    expect(wire).not.toContain("at run");
    await reader.cancel();
  });
  it("cleans both routes on abort and tolerates a later consumer cancellation", async () => {
    const log = await logResponse();
    log.abort.abort();
    await log.response.body!.cancel();
    expect(state.listeners.size).toBe(0);
    const { req, abort } = request("/api/gamification/stream");
    const response = await leaderboard(req);
    abort.abort();
    await response.body!.cancel();
    expect(vi.getTimerCount()).toBe(0);
  });

  it("does not overlap slow leaderboard reads and bounds the eventual oversized result", async () => {
    let resolve!: (value: unknown[]) => void;
    state.getTopN.mockImplementation(
      () =>
        new Promise((done) => {
          resolve = done;
        })
    );
    const { req } = request("/api/gamification/stream");
    const response = await leaderboard(req);
    await vi.advanceTimersByTimeAsync(20000);
    expect(state.getTopN).toHaveBeenCalledTimes(1);
    resolve([{ name: "x".repeat(300000) }]);
    await Promise.resolve();
    expect(vi.getTimerCount()).toBe(0);
    await expect(response.body!.getReader().read()).rejects.toThrow("buffer limit");
  });

  it("terminates a log stream if heartbeat bytes exhaust its remaining queue budget", async () => {
    const { response } = await logResponse();
    emit("x".repeat(261900));
    expect(state.listeners.size).toBe(1);
    await vi.advanceTimersByTimeAsync(120000);
    expect(state.listeners.size).toBe(0);
    expect(vi.getTimerCount()).toBe(0);
    await expect(response.body!.getReader().read()).rejects.toThrow("buffer limit");
  });
  it("preserves a large Unicode snapshot and a live event arriving before the first read", async () => {
    state.snapshot = Array.from({ length: 200 }, (_, i) => ({
      ts: i,
      stream: "stdout" as const,
      line: `line${i}:` + "😀".repeat(1024),
    }));
    const { response } = await logResponse();
    emit("after snapshot");
    const reader = response.body!.getReader();
    const decoder = new TextDecoder();
    let wire = "";
    while (!wire.includes("event: log\n")) {
      const next = await reader.read();
      expect(next.done).toBe(false);
      wire += decoder.decode(next.value, { stream: true });
    }
    const frames = wire.split("\n\n");
    expect(JSON.parse(frames[0].split("data: ")[1])).toEqual(state.snapshot);
    expect(wire).toContain("after snapshot");
    expect(state.listeners.size).toBe(1);
    await reader.cancel();
    expect(state.listeners.size).toBe(0);
  });
  it("cancels during a partially consumed snapshot and releases its live subscription", async () => {
    state.snapshot = [{ ts: 1, stream: "stdout", line: "😀".repeat(100000) }];
    const { response, abort } = await logResponse();
    const reader = response.body!.getReader();
    const first = await reader.read();
    expect(first.value!.byteLength).toBeLessThanOrEqual(32 * 1024);
    expect(first.done).toBe(false);
    await reader.cancel();
    expect(abort.signal.aborted).toBe(false);
    expect(state.listeners.size).toBe(0);
    expect(vi.getTimerCount()).toBe(0);
  });
});
