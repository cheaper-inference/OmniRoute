// @vitest-environment jsdom
import React, { act } from "react";
import { createRoot, type Root } from "react-dom/client";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("next-intl", () => ({
  useLocale: () => "en",
  useTranslations: (namespace: string) => (key: string) => `${namespace}.${key}`,
}));

vi.mock("@/shared/utils/clipboard", () => ({ copyToClipboard: vi.fn() }));

const POLL_INTERVAL_MS = 5000;
const roots: Root[] = [];
let entries: Array<{ timestamp: string; level: string; message: string }> = [];

function pushEntry(message: string) {
  entries = [
    ...entries,
    {
      timestamp: new Date(Date.UTC(2026, 9, 16, 0, 0, entries.length)).toISOString(),
      level: "info",
      message,
    },
  ];
}

// jsdom does no layout: give the log box a fixed, scrollable geometry and a real scrollTop.
function measure(el: HTMLElement, { scrollHeight = 1000, clientHeight = 400 } = {}) {
  let top = 0;
  Object.defineProperty(el, "scrollHeight", { configurable: true, get: () => scrollHeight });
  Object.defineProperty(el, "clientHeight", { configurable: true, get: () => clientHeight });
  Object.defineProperty(el, "scrollTop", {
    configurable: true,
    get: () => top,
    set: (value: number) => {
      top = Math.max(0, Math.min(value, scrollHeight - clientHeight));
    },
  });
}

async function renderViewer() {
  const container = document.createElement("div");
  document.body.appendChild(container);
  const root = createRoot(container);
  roots.push(root);

  const { default: ConsoleLogViewer } =
    await import("../../../src/shared/components/ConsoleLogViewer");

  await act(async () => {
    root.render(<ConsoleLogViewer />);
    await Promise.resolve();
  });
  const log = container.querySelector<HTMLElement>('[role="log"]');
  if (!log) throw new Error("console log box not rendered");
  measure(log);
  await act(async () => {
    vi.advanceTimersByTime(0);
    await Promise.resolve();
  });
  return { container, log };
}

async function userScrollsTo(log: HTMLElement, top: number) {
  await act(async () => {
    log.scrollTop = top;
    log.dispatchEvent(new Event("scroll"));
  });
}

async function nextPoll() {
  await act(async () => {
    vi.advanceTimersByTime(POLL_INTERVAL_MS);
    await Promise.resolve();
  });
}

describe("ConsoleLogViewer follows the tail only while the reader is at it", () => {
  beforeEach(() => {
    (
      globalThis as typeof globalThis & { IS_REACT_ACT_ENVIRONMENT?: boolean }
    ).IS_REACT_ACT_ENVIRONMENT = true;
    vi.useFakeTimers();
    entries = [];
    pushEntry("ready");
    pushEntry("waiting");
    globalThis.fetch = vi.fn().mockImplementation(async () => ({
      ok: true,
      json: async () => entries,
    }));
  });

  afterEach(() => {
    for (const root of roots.splice(0)) {
      act(() => root.unmount());
    }
    document.body.innerHTML = "";
    vi.useRealTimers();
    vi.restoreAllMocks();
  });

  it("lands on the newest line on first paint", async () => {
    const { log } = await renderViewer();
    expect(log.scrollTop).toBe(600);
  });

  it("leaves a reader who scrolled up where they are when new lines arrive", async () => {
    const { log } = await renderViewer();
    await userScrollsTo(log, 100);

    pushEntry("new line while reading");
    await nextPoll();

    expect(log.scrollTop).toBe(100);
  });

  it("keeps following when the reader is at (or within slack of) the bottom", async () => {
    const { log } = await renderViewer();
    await userScrollsTo(log, 595);

    pushEntry("tail");
    await nextPoll();

    expect(log.scrollTop).toBe(600);
  });

  it("resumes following once the reader scrolls back to the bottom", async () => {
    const { log } = await renderViewer();
    await userScrollsTo(log, 100);
    await userScrollsTo(log, 600);
    // Move the box without a scroll event so only the viewer's own effect can bring it back.
    log.scrollTop = 0;

    pushEntry("after returning");
    await nextPoll();

    expect(log.scrollTop).toBe(600);
  });

  it("re-pins to the bottom when auto-scroll is switched back on", async () => {
    const { container, log } = await renderViewer();
    const toggle = Array.from(container.querySelectorAll("button")).find((b) =>
      b.textContent?.includes("logs.consoleViewer.autoScroll")
    );
    expect(toggle).toBeDefined();

    await userScrollsTo(log, 100);
    await act(async () => toggle?.click());
    await act(async () => toggle?.click());

    expect(log.scrollTop).toBe(600);
  });

  it("never scrolls while auto-scroll is switched off, even at the bottom", async () => {
    const { container, log } = await renderViewer();
    const toggle = Array.from(container.querySelectorAll("button")).find((b) =>
      b.textContent?.includes("logs.consoleViewer.autoScroll")
    );
    await act(async () => toggle?.click());
    await userScrollsTo(log, 600);
    log.scrollTop = 200;

    pushEntry("ignored");
    await nextPoll();

    expect(log.scrollTop).toBe(200);
  });
});
