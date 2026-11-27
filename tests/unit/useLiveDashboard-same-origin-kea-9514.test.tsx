// @vitest-environment jsdom
// @vitest-environment-options {"url":"https://example.com/dashboard/combos/live"}
// KEA-9514: a managed instance behind an HTTPS reverse proxy that exposes only 443 logged
// "WebSocket connection to 'wss://<host>:20132/live-ws' failed" every few seconds on
// Overview and Routes > Live. Off loopback, every live hook (useLiveRequests,
// useLiveComboStatus, useLiveCompression, the orchestration snapshot) goes through
// useLiveDashboard, which now dials the page's own origin (the production server relays
// `/live-ws` on its main port) and never dials a live server the handshake reports as off.
import React, { act } from "react";
import { createRoot, type Root } from "react-dom/client";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import {
  LIVE_WS_UNAVAILABLE_ERROR,
  useLiveConnectionStatus,
  useLiveComboStatus,
  useLiveRequests,
} from "../../src/hooks/useLiveDashboard";
import { useLiveCompression } from "../../src/hooks/useLiveCompression";

const dialled: string[] = [];

class RecordingSocket {
  static CONNECTING = 0;
  static OPEN = 1;
  static CLOSING = 2;
  static CLOSED = 3;
  readyState = RecordingSocket.CONNECTING;
  onopen: (() => void) | null = null;
  onmessage: (() => void) | null = null;
  onclose: (() => void) | null = null;
  onerror: (() => void) | null = null;
  constructor(readonly url: string) {
    dialled.push(url);
  }
  send() {}
  close() {
    this.readyState = RecordingSocket.CLOSED;
  }
}

let latest: ReturnType<typeof useLiveConnectionStatus> | null = null;

function StatusHarness() {
  const state = useLiveConnectionStatus();
  React.useEffect(() => {
    latest = state;
  });
  return null;
}

function AllClientsHarness() {
  useLiveRequests();
  useLiveComboStatus();
  useLiveCompression();
  return null;
}

function mockHandshake(live: Record<string, unknown> | null) {
  vi.stubGlobal(
    "fetch",
    vi.fn(async () =>
      live === null
        ? new Response("unavailable", { status: 503 })
        : Response.json({ ok: true, live: { port: 20132, path: "/live-ws", ...live } })
    )
  );
}

describe("useLiveDashboard on a page served off loopback (KEA-9514)", () => {
  let root: Root | null = null;
  let container: HTMLDivElement | null = null;

  beforeEach(() => {
    (
      globalThis as typeof globalThis & { IS_REACT_ACT_ENVIRONMENT?: boolean }
    ).IS_REACT_ACT_ENVIRONMENT = true;
    vi.stubGlobal("WebSocket", RecordingSocket);
    dialled.length = 0;
    latest = null;
    container = document.createElement("div");
    document.body.appendChild(container);
    root = createRoot(container);
  });

  afterEach(() => {
    act(() => {
      root?.unmount();
    });
    container?.remove();
    root = null;
    container = null;
    vi.unstubAllGlobals();
    vi.restoreAllMocks();
  });

  async function render(node: React.ReactNode) {
    await act(async () => {
      root!.render(node);
    });
    // Let the handshake fetch settle and the connect effect run.
    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 0));
    });
  }

  it("the page really is https://example.com", () => {
    expect(window.location.origin).toBe("https://example.com");
  });

  it("dials wss://<page host>/live-ws when the server relays on its main port", async () => {
    mockHandshake({ enabled: true, sameOrigin: true });
    await render(<StatusHarness />);
    expect(dialled).toEqual(["wss://example.com/live-ws"]);
  });

  it("dials the page's own origin when the handshake is unavailable", async () => {
    mockHandshake(null);
    await render(<StatusHarness />);
    expect(dialled).toEqual(["wss://example.com/live-ws"]);
  });

  it("routes every live hook through the same resolution", async () => {
    mockHandshake({ enabled: true, sameOrigin: true });
    await render(<AllClientsHarness />);
    expect(dialled).toHaveLength(3);
    expect(new Set(dialled)).toEqual(new Set(["wss://example.com/live-ws"]));
  });

  it("dials the live port when the server says its HTTP port cannot relay", async () => {
    mockHandshake({ enabled: true, sameOrigin: false });
    await render(<StatusHarness />);
    expect(dialled).toEqual(["wss://example.com:20132/live-ws"]);
  });

  it("lets a configured public URL win", async () => {
    mockHandshake({ enabled: true, sameOrigin: true, publicUrl: "wss://ws.example.com/socket" });
    await render(<StatusHarness />);
    expect(dialled).toEqual(["wss://ws.example.com/socket"]);
  });

  it("opens no socket when the live server is disabled", async () => {
    mockHandshake({ enabled: false, sameOrigin: true });
    await render(<StatusHarness />);
    expect(dialled).toEqual([]);
    expect(latest?.isConnected).toBe(false);
    expect(latest?.error).toBe(LIVE_WS_UNAVAILABLE_ERROR);
  });
});
