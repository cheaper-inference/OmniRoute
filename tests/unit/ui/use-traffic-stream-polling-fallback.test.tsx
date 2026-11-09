// @vitest-environment jsdom
/**
 * The Traffic Inspector stream used a WebSocket only. When the server cannot upgrade (the ws route
 * answers 500, or a proxy drops the upgrade) the hook only retried the socket, so the page stayed
 * empty and "offline" for good. It must fall back to polling the REST list endpoint.
 */
import React, { act } from "react";
import { createRoot } from "react-dom/client";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import {
  useTrafficStream,
  type TrafficStreamState,
} from "../../../src/app/(dashboard)/dashboard/tools/traffic-inspector/hooks/useTrafficStream";

const roots: Array<{ root: ReturnType<typeof createRoot>; el: HTMLDivElement }> = [];
const sockets: FakeWebSocket[] = [];

// A WebSocket whose upgrade is refused: it closes without ever opening.
class FakeWebSocket {
  static CONNECTING = 0;
  static OPEN = 1;
  static CLOSING = 2;
  static CLOSED = 3;
  readyState = FakeWebSocket.CONNECTING;
  onopen: (() => void) | null = null;
  onmessage: ((ev: { data: string }) => void) | null = null;
  onclose: (() => void) | null = null;
  onerror: (() => void) | null = null;
  constructor(public url: string) {
    sockets.push(this);
    queueMicrotask(() => this.refuse());
  }
  refuse() {
    // A refused upgrade: the browser fires `error`, then `close` once.
    this.onerror?.();
    this.close();
  }
  open() {
    this.readyState = FakeWebSocket.OPEN;
    this.onopen?.();
  }
  close() {
    if (this.readyState === FakeWebSocket.CLOSED) return; // a real socket closes once
    this.readyState = FakeWebSocket.CLOSED;
    this.onclose?.();
  }
}

const REQ = (id: string) => ({
  id,
  source: "http-proxy",
  timestamp: "2026-11-09T10:00:00.000Z",
  method: "POST",
  host: "api.example.test",
  path: "/v1/chat/completions",
  requestHeaders: {},
  requestBody: null,
  requestSize: 0,
  responseHeaders: {},
  responseBody: null,
  responseSize: 0,
  status: 200,
  detectedKind: "llm",
});

function mountHook() {
  let latest: TrafficStreamState | null = null;
  function Wrapper() {
    const [state] = useTrafficStream({ profile: "all" });
    React.useEffect(() => {
      latest = state;
    });
    return null;
  }
  const el = document.createElement("div");
  document.body.appendChild(el);
  const root = createRoot(el);
  act(() => root.render(<Wrapper />));
  roots.push({ root, el });
  return () => latest as TrafficStreamState;
}

async function advance(ms: number) {
  await act(async () => {
    await vi.advanceTimersByTimeAsync(ms);
  });
}

beforeEach(() => {
  (
    globalThis as typeof globalThis & { IS_REACT_ACT_ENVIRONMENT?: boolean }
  ).IS_REACT_ACT_ENVIRONMENT = true;
  sockets.length = 0;
  vi.useFakeTimers();
  vi.stubGlobal("WebSocket", FakeWebSocket);
});

afterEach(() => {
  for (const { root, el } of roots.splice(0)) {
    act(() => root.unmount());
    el.remove();
  }
  vi.useRealTimers();
  vi.unstubAllGlobals();
});

describe("useTrafficStream polling fallback", () => {
  it("polls the REST list when the WebSocket never opens, and shows the rows as connected", async () => {
    const fetchMock = vi.fn(async () =>
      Response.json({ requests: [REQ("a"), REQ("b")], total: 2 })
    );
    vi.stubGlobal("fetch", fetchMock);

    const state = mountHook();
    await advance(5000);

    expect(fetchMock).toHaveBeenCalled();
    expect(String(fetchMock.mock.calls[0][0])).toContain("/api/tools/traffic-inspector/requests");
    expect(state().requests.map((r) => r.id)).toEqual(["b", "a"]); // newest first
    expect(state().connected).toBe(true);
  });

  it("stops polling once a WebSocket opens", async () => {
    const fetchMock = vi.fn(async () => Response.json({ requests: [REQ("a")], total: 1 }));
    vi.stubGlobal("fetch", fetchMock);

    mountHook();
    await advance(5000);
    const callsWhilePolling = fetchMock.mock.calls.length;
    expect(callsWhilePolling).toBeGreaterThan(0);

    // The next reconnect attempt succeeds.
    FakeWebSocket.prototype.refuse = function () {};
    await advance(35_000);
    const live = sockets[sockets.length - 1];
    await act(async () => live.open());
    const callsAtOpen = fetchMock.mock.calls.length;
    await advance(10_000);

    expect(fetchMock.mock.calls.length).toBe(callsAtOpen);
  });

  it("does not poll while the WebSocket works", async () => {
    FakeWebSocket.prototype.refuse = function () {};
    const fetchMock = vi.fn();
    vi.stubGlobal("fetch", fetchMock);

    mountHook();
    await act(async () => sockets[0].open());
    await advance(10_000);

    expect(fetchMock).not.toHaveBeenCalled();
  });
});
