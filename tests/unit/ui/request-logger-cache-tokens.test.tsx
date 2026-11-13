// @vitest-environment jsdom
import React, { act } from "react";
import { createRoot, type Root } from "react-dom/client";
import { afterEach, beforeEach, describe, expect, it, vi, beforeAll } from "vitest";

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
  const cacheLabels: Record<string, string> = {
    cachedTokensCol: "Cache Read",
    cacheCreation: "Cache Write",
  };
  const detailLabels: Record<string, string> = {
    totalIn: "Total In: {value}",
    cacheRead: "Cache Read: {value}",
    cacheWrite: "Cache Write: {value}",
    compressed: "Compressed: {percent}%",
    totalOut: "Total Out: {value}",
    reasoning: "Reasoning: {value}",
    notAvailable: "N/A",
  };
  const interpolate = (template: string, params: Record<string, string> = {}) =>
    template.replace(/\{(\w+)\}/g, (_, k) => (k in params ? String(params[k]) : `{${k}}`));
  return {
    useLocale: () => "en",
    useTranslations: (namespace?: string) => (key: string, params?: Record<string, string>) =>
      namespace === "common.usageEvidence"
        ? interpolate(
            {
              reported: "reported",
              estimated: "estimated",
              unknown: "N/A",
              unknownSource: "source unknown",
            }[key] ?? key,
            params
          )
        : namespace === "cache"
          ? interpolate(cacheLabels[key] ?? key, params)
          : namespace === "requestLogger.detail"
            ? interpolate(detailLabels[key] ?? key, params)
            : interpolate(key, params),
  };
});

vi.mock("next/navigation", () => ({
  useRouter: () => ({ push: vi.fn(), replace: vi.fn(), refresh: vi.fn() }),
}));

vi.mock("@/store/emailPrivacyStore", () => ({
  default: () => ({ emailsVisible: true }),
}));

const RequestLoggerV2 = (await import("@/shared/components/RequestLoggerV2")).default;
const RequestLoggerDetail = (await import("@/shared/components/RequestLoggerDetail"))
  .RequestLoggerDetailPanel;

let container: HTMLElement;
let root: Root;

const populatedLog = {
  id: "log-cache",
  status: 200,
  method: "POST",
  path: "/v1/chat/completions",
  model: "gpt-cache",
  provider: "openai",
  timestamp: "2026-08-10T12:00:00.000Z",
  duration: 1_000,
  usageEvidence: {
    input: { source: "reported" },
    output: { source: "estimated", method: "chars/4" },
    cacheRead: { source: "unknown" },
    cacheCreation: { source: "reported" },
  },
  tokens: {
    in: 1_000,
    out: 250,
    cacheRead: 800,
    cacheWrite: 120,
    reasoning: 50,
    compressed: 20,
  },
};

const noop = () => {};

async function render(component: React.ReactNode) {
  await act(async () => {
    root.render(component);
  });
}

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

describe("request log cache token metrics (#9620)", () => {
  it("renders cache read/write beside the existing row token metrics", async () => {
    const emptyCacheLog = {
      ...populatedLog,
      id: "log-no-cache",
      model: "gpt-no-cache",
      timestamp: "2026-08-10T11:59:00.000Z",
      tokens: { ...populatedLog.tokens, cacheRead: null, cacheWrite: 0 },
    };
    vi.stubGlobal(
      "fetch",
      vi.fn(async (input: RequestInfo | URL) => {
        const url = String(input);
        if (url.startsWith("/api/usage/call-logs")) {
          return Response.json([populatedLog, emptyCacheLog]);
        }
        if (url.startsWith("/api/provider-nodes")) return Response.json({ nodes: [] });
        if (url.startsWith("/api/logs/detail")) return Response.json({ enabled: false });
        return Response.json({});
      })
    );

    await render(<RequestLoggerV2 />);
    await act(async () => {
      await Promise.resolve();
    });

    const row = Array.from(container.querySelectorAll("tbody tr")).find((candidate) =>
      candidate.textContent?.includes("gpt-cache")
    );
    expect(row?.textContent).toContain("TI: 1,000 (reported)");
    expect(row?.textContent).toContain("TO: 250 (estimated: chars/4)");
    expect(row?.textContent).toContain("TO: 250");
    expect(row?.textContent).toContain("CR: N/A");
    expect(row?.textContent).toContain("CW: 120");
    expect(row?.textContent).toContain("↓20");

    const emptyRow = Array.from(container.querySelectorAll("tbody tr")).find((candidate) =>
      candidate.textContent?.includes("gpt-no-cache")
    );
    expect(emptyRow?.textContent).toContain("TI: 1,000");
    expect(emptyRow?.textContent).toContain("TO: 250");
    expect(emptyRow?.textContent).toContain("CR: N/A");
    expect(emptyRow?.textContent).toContain("CW: 0");
  });

  it("distinguishes cache read from cache write in the detail view", async () => {
    await render(
      <RequestLoggerDetail
        log={populatedLog}
        detail={populatedLog}
        loading={false}
        debugEnabled={false}
        onClose={noop}
        onCopy={async () => true}
      />
    );

    const inputGroup = container.querySelector('[data-testid="token-group-input"]');
    const outputGroup = container.querySelector('[data-testid="token-group-output"]');
    expect(inputGroup?.textContent).toContain("Total In: 1,000");
    expect(inputGroup?.textContent).toContain("Cache Read: N/A");
    expect(inputGroup?.textContent).toContain("Cache Write: 120");
    expect(inputGroup?.textContent).toContain("Compressed:");
    expect(outputGroup?.textContent).toContain("Total Out: 250");
    expect(outputGroup?.textContent).toContain("Reasoning: 50");
  });

  it("handles historical null and zero cache values without inventing usage", async () => {
    const emptyCacheLog = {
      ...populatedLog,
      id: "log-no-cache",
      tokens: { ...populatedLog.tokens, cacheRead: null, cacheWrite: 0 },
    };

    await render(
      <RequestLoggerDetail
        log={emptyCacheLog}
        detail={emptyCacheLog}
        loading={false}
        debugEnabled={false}
        onClose={noop}
        onCopy={async () => true}
      />
    );

    const inputGroup = container.querySelector('[data-testid="token-group-input"]');
    expect(inputGroup?.textContent).toContain("Cache Read: N/A");
    expect(inputGroup?.textContent).toContain("Cache Write: 0");
    expect(inputGroup?.textContent).toContain("Total In: 1,000");
  });
});

describe("truthful log reader states", () => {
  it("shows loading while the real log fetch is pending", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn((input: RequestInfo | URL) =>
        String(input).startsWith("/api/usage/call-logs")
          ? new Promise(() => {})
          : Promise.resolve(Response.json({}))
      )
    );
    await render(<RequestLoggerV2 />);
    expect(container.textContent).toContain("loadingLogs");
    expect(container.textContent).not.toContain("CR: 0");
  });
  it("shows an empty state instead of invented counters", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn(async () => Response.json([]))
    );
    await render(<RequestLoggerV2 />);
    expect(container.textContent).toContain("noLogs");
    expect(container.querySelector("tbody tr")).toBeNull();
  });
  it("announces load failure instead of silently presenting it as zero usage", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn(async () => new Response("unavailable", { status: 503 }))
    );
    await render(<RequestLoggerV2 />);
    expect(container.querySelector('[role="alert"]')?.textContent).toContain("loadError");
  });
});
