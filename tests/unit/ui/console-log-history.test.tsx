// @vitest-environment jsdom
import React, { act } from "react";
import { createRoot, type Root } from "react-dom/client";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

const copyToClipboard = vi.fn();
vi.mock("next-intl", () => {
  const translators = new Map<string, (key: string) => string>();
  return {
    useLocale: () => "en",
    useTranslations: (namespace: string) => {
      if (!translators.has(namespace))
        translators.set(namespace, (key: string) => `${namespace}.${key}`);
      return translators.get(namespace);
    },
  };
});
vi.mock("@/shared/utils/clipboard", () => ({ copyToClipboard }));

let root: Root;
let container: HTMLDivElement;
const entry = (msg: string) => ({ timestamp: "2026-10-29T00:00:00.000Z", level: "info", msg });
const page = (msg: string, cursor?: string, truncated = false) =>
  new Response(JSON.stringify([entry(msg)]), {
    headers: {
      ...(cursor ? { "X-Console-Next-Cursor": cursor } : {}),
      "X-Console-Truncated": String(truncated),
    },
  });
async function renderViewer() {
  const { default: ConsoleLogViewer } =
    await import("../../../src/shared/components/ConsoleLogViewer");
  await act(async () => root.render(<ConsoleLogViewer />));
  await act(async () => vi.advanceTimersByTimeAsync(0));
}
async function click(selector: string) {
  const button = container.querySelector<HTMLButtonElement>(selector);
  expect(button, selector).not.toBeNull();
  await act(async () => button!.click());
}

beforeEach(() => {
  vi.useFakeTimers();
  vi.stubGlobal("IS_REACT_ACT_ENVIRONMENT", true);
  vi.stubGlobal("fetch", vi.fn().mockResolvedValue(page("first", "older-page")));
  copyToClipboard.mockReset().mockResolvedValue(true);
  container = document.createElement("div");
  document.body.appendChild(container);
  root = createRoot(container);
});
afterEach(async () => {
  await act(async () => root.unmount());
  container.remove();
  vi.useRealTimers();
  vi.unstubAllGlobals();
});

describe("retained console history and pause", () => {
  it("gives dated messages a full row on narrow viewports without changing desktop columns", async () => {
    await renderViewer();
    const message = Array.from(container.querySelectorAll("span")).find(
      (span) => span.textContent === "first"
    );
    expect(message).toBeDefined();
    expect(message!.classList.contains("basis-full")).toBe(true);
    expect(message!.classList.contains("sm:basis-auto")).toBe(true);
    expect(message!.parentElement!.classList.contains("flex-wrap")).toBe(true);
  });

  it("starts with retained history and freezes polling while paused, then resumes", async () => {
    await renderViewer();
    expect(vi.mocked(fetch).mock.calls[0][0]).toContain("range=all");
    await click('button[aria-label="logs.consoleViewer.pauseLogs"]');
    expect(container.querySelector('[role="log"]')?.getAttribute("aria-live")).toBe("off");
    expect(
      container.querySelector('button[aria-label="common.refresh"]')?.hasAttribute("disabled")
    ).toBe(true);
    await act(async () => vi.advanceTimersByTimeAsync(15000));
    expect(fetch).toHaveBeenCalledTimes(1);
    expect(container.textContent).toContain("first");
    vi.mocked(fetch).mockResolvedValue(page("resumed"));
    await click('button[aria-label="logs.consoleViewer.resumeLogs"]');
    await act(async () => vi.advanceTimersByTimeAsync(0));
    expect(fetch).toHaveBeenCalledTimes(2);
    expect(container.textContent).toContain("resumed");
  });

  it("ignores a response which finishes after pause, including a quick resume", async () => {
    await renderViewer();
    const pending = Promise.withResolvers<Response>();
    vi.mocked(fetch).mockReturnValueOnce(pending.promise);
    await act(async () => vi.advanceTimersByTimeAsync(5000));
    const signal = vi.mocked(fetch).mock.calls[1][1]?.signal;
    await click('button[aria-label="logs.consoleViewer.pauseLogs"]');
    expect(signal?.aborted).toBe(true);
    vi.mocked(fetch).mockResolvedValue(page("new snapshot"));
    await click('button[aria-label="logs.consoleViewer.resumeLogs"]');
    await act(async () => vi.advanceTimersByTimeAsync(0));
    await act(async () => pending.resolve(page("stale response")));
    expect(container.textContent).toContain("new snapshot");
    expect(container.textContent).not.toContain("stale response");
  });

  it("keeps older pages stable without background refresh and returns to live on refresh", async () => {
    await renderViewer();
    vi.mocked(fetch).mockResolvedValue(page("older entry"));
    await click('button[data-console-history="older"]');
    expect(vi.mocked(fetch).mock.calls[1][0]).toContain("cursor=older-page");
    expect(container.textContent).toContain("older entry");
    expect(container.textContent).toContain("first");
    await act(async () => vi.advanceTimersByTimeAsync(15000));
    expect(fetch).toHaveBeenCalledTimes(2);
    vi.mocked(fetch).mockResolvedValue(page("live again"));
    await click('button[aria-label="common.refresh"]');
    expect(container.textContent).toContain("live again");
    expect(container.textContent).not.toContain("older entry");
    await act(async () => vi.advanceTimersByTimeAsync(5000));
    expect(fetch).toHaveBeenCalledTimes(4);
  });

  it("invalidates a pending page when filters change and only renders the new range", async () => {
    await renderViewer();
    const pending = Promise.withResolvers<Response>();
    vi.mocked(fetch).mockReturnValueOnce(pending.promise);
    await click('button[data-console-history="older"]');
    const range = container.querySelector<HTMLSelectElement>(
      'select[data-console-history="range"]'
    );
    expect(range).not.toBeNull();
    vi.mocked(fetch).mockResolvedValue(page("new range"));
    await act(async () => {
      range!.value = "24h";
      range!.dispatchEvent(new Event("change", { bubbles: true }));
    });
    await act(async () => vi.advanceTimersByTimeAsync(0));
    await act(async () => pending.resolve(page("stale page")));
    expect(vi.mocked(fetch).mock.calls.at(-1)?.[0]).toContain("range=24h");
    expect(container.textContent).toContain("new range");
    expect(container.textContent).not.toContain("stale page");
  });

  it("continues to copy the original structured entry while paused", async () => {
    await renderViewer();
    await click('button[aria-label="logs.consoleViewer.pauseLogs"]');
    await click('button[aria-label="logs.consoleViewer.copyLogEntry"]');
    expect(JSON.parse(copyToClipboard.mock.calls[0][0])).toEqual(entry("first"));
    expect(container.querySelector('[role="status"]')?.textContent).toBe("common.copied");
  });
});
