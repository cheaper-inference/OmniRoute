// @vitest-environment jsdom
// KEA-9522: the Time column of Usage > Requests showed only HH:MM:SS, so rows from different
// days were indistinguishable. A row from another day must show its date, and the full
// timestamp must be available on hover.
import React, { act } from "react";
import { createRoot, type Root } from "react-dom/client";
import { afterEach, beforeAll, beforeEach, describe, expect, it, vi } from "vitest";

// The kit Table (KEA-7886) mounts a persistent horizontal scrollbar that measures the table
// with ResizeObserver, which jsdom does not implement.
beforeAll(() => {
  globalThis.ResizeObserver ??= class {
    observe() {}
    unobserve() {}
    disconnect() {}
  } as unknown as typeof ResizeObserver;
});

vi.mock("next-intl", () => {
  const interpolate = (template: string, params: Record<string, string> = {}) =>
    template.replace(/\{(\w+)\}/g, (_, k) => (k in params ? String(params[k]) : `{${k}}`));
  return {
    useLocale: () => "en",
    useTranslations: () => (key: string, params?: Record<string, string>) =>
      interpolate(key, params),
  };
});

vi.mock("next/navigation", () => ({
  useRouter: () => ({ push: vi.fn(), replace: vi.fn(), refresh: vi.fn() }),
}));

vi.mock("@/store/emailPrivacyStore", () => ({
  default: () => ({ emailsVisible: true }),
}));

const RequestLoggerV2 = (await import("@/shared/components/RequestLoggerV2")).default;

let container: HTMLElement;
let root: Root;

const now = new Date();
const todayTs = now.toISOString();
const olderDate = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 3, 7, 43, 42);
const olderTs = olderDate.toISOString();

const baseLog = {
  status: 200,
  method: "POST",
  path: "/v1/chat/completions",
  provider: "openai",
  duration: 1_000,
  tokens: { in: 10, out: 5 },
};

beforeEach(() => {
  container = document.createElement("div");
  document.body.appendChild(container);
  root = createRoot(container);
});

afterEach(async () => {
  await act(async () => {
    root.unmount();
  });
  container.remove();
  vi.unstubAllGlobals();
});

function timeCell(row: Element | undefined) {
  return Array.from(row?.querySelectorAll("td") ?? []).find((cell) =>
    /\d{2}:\d{2}:\d{2}/.test(cell.textContent ?? "")
  );
}

describe("request log Time column (KEA-9522)", () => {
  it("shows the date for a row from another day and the full timestamp on hover", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn(async (input: RequestInfo | URL) => {
        const url = String(input);
        if (url.startsWith("/api/usage/call-logs")) {
          return Response.json([
            { ...baseLog, id: "log-today", model: "model-today", timestamp: todayTs },
            { ...baseLog, id: "log-older", model: "model-older", timestamp: olderTs },
          ]);
        }
        if (url.startsWith("/api/provider-nodes")) return Response.json({ nodes: [] });
        if (url.startsWith("/api/logs/detail")) return Response.json({ enabled: false });
        return Response.json({});
      })
    );

    await act(async () => {
      root.render(<RequestLoggerV2 />);
    });
    await act(async () => {
      await Promise.resolve();
    });

    const rows = Array.from(container.querySelectorAll("tbody tr"));
    const olderRow = rows.find((row) => row.textContent?.includes("model-older"));
    const todayRow = rows.find((row) => row.textContent?.includes("model-today"));

    const month = olderDate.toLocaleString("en", { month: "short" });
    const olderCell = timeCell(olderRow);
    expect(olderCell?.textContent).toContain(`${month} ${olderDate.getDate()}`);
    expect(olderCell?.textContent).toContain("07:43:42");
    expect(olderCell?.getAttribute("title")).toContain(String(olderDate.getFullYear()));

    // Today's row keeps the bare time.
    const todayCell = timeCell(todayRow);
    expect(todayCell?.textContent).toMatch(/^\d{2}:\d{2}:\d{2}$/);
    expect(todayCell?.getAttribute("title")).toContain(String(now.getFullYear()));
  });
});
