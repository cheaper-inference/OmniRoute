// @vitest-environment jsdom
import React, { act } from "react";
import { createRoot } from "react-dom/client";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import enMessages from "@/i18n/messages/en.json";

const homeMessages = enMessages.home as Record<string, string>;

vi.mock("next-intl", () => ({
  useTranslations: () => (key: string, values?: Record<string, unknown>) => {
    const message = homeMessages[key];
    if (message === undefined) throw new Error(`missing home message: ${key}`);
    return message.replace(/\{(\w+)\}/g, (_, name) => String(values?.[name]));
  },
}));

import HomeSystemMetricsCards from "@/app/(dashboard)/home/HomeSystemMetricsCards";

function metricsBody(hostCpu: number, hostMemory: number) {
  return {
    host: {
      cpuPercent: hostCpu,
      memory: {
        totalBytes: 8 * 1024 ** 3,
        usedBytes: 2 * 1024 ** 3,
        freeBytes: 6 * 1024 ** 3,
        usedPercent: hostMemory,
      },
      cpuCount: 4,
      platform: "linux",
    },
    process: {
      cpuPercent: 1.5,
      memory: { rssBytes: 300 * 1024 ** 2, heapUsedBytes: 120 * 1024 ** 2, heapTotalBytes: 1 },
      uptimeSeconds: 10,
      pid: 1,
    },
  };
}

function jsonResponse(body: unknown) {
  return new Response(JSON.stringify(body), { status: 200 });
}

let visibility: DocumentVisibilityState = "visible";
const containers: Array<{ root: ReturnType<typeof createRoot>; element: HTMLDivElement }> = [];

async function flush() {
  await act(async () => {
    await vi.advanceTimersByTimeAsync(0);
  });
}

async function render() {
  const element = document.createElement("div");
  document.body.appendChild(element);
  const root = createRoot(element);
  act(() => {
    root.render(<HomeSystemMetricsCards />);
  });
  containers.push({ root, element });
  await flush();
  return element;
}

function bars(element: HTMLElement) {
  return Array.from(element.querySelectorAll<HTMLElement>('[data-testid="usage-bar"]'));
}

describe("HomeSystemMetricsCards", () => {
  beforeEach(() => {
    vi.useFakeTimers();
    visibility = "visible";
    vi.spyOn(document, "visibilityState", "get").mockImplementation(() => visibility);
  });

  afterEach(() => {
    for (const { root, element } of containers.splice(0)) {
      act(() => root.unmount());
      element.remove();
    }
    vi.useRealTimers();
    vi.restoreAllMocks();
    vi.unstubAllGlobals();
  });

  it("renders every label through the home message catalog, not hardcoded text", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue(jsonResponse(metricsBody(12.34, 25))));
    const element = await render();

    const text = element.textContent ?? "";
    expect(text).toContain("4 vCPUs • linux");
    expect(text).toContain("12.3%");
    expect(text).toContain("25.0%");
    expect(text).toContain("2.0 GB / 8.0 GB");
    expect(text).toContain("OmniRoute (process)");
    expect(text).toContain("300 MB (120 MB)");
    expect(text).toContain("Memory");
    expect(element.querySelector("section")?.getAttribute("aria-label")).toBe("System metrics");
    for (const dot of Array.from(element.querySelectorAll("span[title]"))) {
      expect(dot.getAttribute("title")).toBe("Monitoring active");
    }
    // The strings the first version of the cards hardcoded in Portuguese.
    expect(text).not.toMatch(/Carregando|Memória|Processo/);
  });

  it("shows the loading label until the first sample arrives", async () => {
    vi.stubGlobal("fetch", vi.fn().mockReturnValue(new Promise(() => {})));
    const element = await render();

    expect(element.textContent).toContain("Loading...");
    expect(element.textContent).toContain("--");
  });

  it.each([
    [64.9, "bg-emerald-500"],
    [65, "bg-amber-500"],
    [84.9, "bg-amber-500"],
    [85, "bg-rose-500"],
  ])("colors a %s%% bar %s", async (percent, expected) => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue(jsonResponse(metricsBody(percent, percent))));
    const element = await render();

    const rendered = bars(element);
    expect(rendered).toHaveLength(2);
    for (const bar of rendered) {
      expect(bar.className).toContain(expected);
      expect(bar.style.width).toBe(`${percent}%`);
    }
  });

  it("does not poll while the tab is hidden and resumes when it is visible again", async () => {
    visibility = "hidden";
    const fetchMock = vi.fn().mockImplementation(async () => jsonResponse(metricsBody(10, 10)));
    vi.stubGlobal("fetch", fetchMock);
    await render();

    await act(async () => {
      await vi.advanceTimersByTimeAsync(10_000);
    });
    expect(fetchMock).not.toHaveBeenCalled();

    visibility = "visible";
    await act(async () => {
      await vi.advanceTimersByTimeAsync(3_500);
    });
    expect(fetchMock).toHaveBeenCalledTimes(1);

    await act(async () => {
      await vi.advanceTimersByTimeAsync(3_500);
    });
    expect(fetchMock).toHaveBeenCalledTimes(2);
  });

  it("stops polling and aborts the in-flight request on unmount", async () => {
    let signal: AbortSignal | undefined;
    const fetchMock = vi.fn().mockImplementation((_url: string, init: RequestInit) => {
      signal = init.signal ?? undefined;
      return new Promise(() => {});
    });
    vi.stubGlobal("fetch", fetchMock);
    await render();

    const { root, element } = containers.pop()!;
    act(() => root.unmount());
    element.remove();

    expect(signal?.aborted).toBe(true);
    await act(async () => {
      await vi.advanceTimersByTimeAsync(10_000);
    });
    expect(fetchMock).toHaveBeenCalledTimes(1);
  });
});
