// @vitest-environment jsdom
// Review of 2026-11-15, defect 5 (finding A5-03): the rows of the two main loggers opened the
// detail on a mouse click only. They now render the kit `<TableRow onActivate>`, so the row is a
// tab stop and Enter / Space open the same detail, while the controls inside the row keep their
// own keys.
import React, { act } from "react";
import { createRoot, type Root } from "react-dom/client";
import { afterEach, beforeAll, beforeEach, describe, expect, it, vi } from "vitest";

// The kit Table mounts a persistent horizontal scrollbar that measures the table with
// ResizeObserver, which jsdom does not implement.
beforeAll(() => {
  globalThis.ResizeObserver ??= class {
    observe() {}
    unobserve() {}
    disconnect() {}
  } as unknown as typeof ResizeObserver;
});

vi.mock("next-intl", () => ({
  useLocale: () => "en",
  useTranslations: () => (key: string) => key,
}));

vi.mock("next/navigation", () => ({
  useRouter: () => ({ push: vi.fn(), replace: vi.fn(), refresh: vi.fn() }),
}));

vi.mock("@/store/emailPrivacyStore", () => ({
  default: () => ({ emailsVisible: true }),
}));

// Imported once, outside the tests: the first import of a logger is slow on a loaded runner and
// must not count against a test's timeout.
const { default: RequestLoggerV2 } = await import("@/shared/components/RequestLoggerV2");
const { default: ProxyLogger } = await import("@/shared/components/ProxyLogger");

const REQUEST_LOG = {
  id: "log-keyboard",
  status: 200,
  method: "POST",
  path: "/v1/chat/completions",
  model: "gpt-keyboard",
  provider: "openai",
  timestamp: "2026-08-10T12:00:00.000Z",
  duration: 1_000,
  tokens: { in: 10, out: 5 },
};

const PROXY_LOG = {
  id: "proxy-keyboard",
  timestamp: new Date().toISOString(),
  status: "success",
  proxy: { type: "http", host: "127.0.0.1", port: 8080, name: "reg-test" },
  tlsFingerprint: false,
  level: "provider",
  provider: "openai",
  targetUrl: "openai/gpt-5",
  latencyMs: 42,
  clientIp: "10.9.9.9",
  upstreamStatus: 200,
  correlationId: "corr-abcdef-123456",
  account: "conn-traff",
  error: null,
};

// Each test mounts a whole logger; on a loaded runner one mount can take longer than the
// default 20 s.
const MOUNT_TIMEOUT_MS = 60_000;

let container: HTMLElement;
let root: Root;
let fetchMock: ReturnType<typeof vi.fn>;
let requestLogs: Array<Record<string, unknown>>;
let proxyLogs: Array<Record<string, unknown>>;

async function press(target: Element, key: string) {
  const event = new KeyboardEvent("keydown", { key, bubbles: true, cancelable: true });
  await act(async () => {
    target.dispatchEvent(event);
    await Promise.resolve();
  });
  return event;
}

/** Renders and waits for the first fetched rows to reach the table body. */
async function render(node: React.ReactNode) {
  await act(async () => {
    root.render(node);
    await new Promise((resolve) => setTimeout(resolve, 0));
  });
  for (let attempt = 0; attempt < 50 && !container.querySelector("tbody tr"); attempt += 1) {
    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 10));
    });
  }
}

const detailRequests = () =>
  fetchMock.mock.calls
    .map(([input]) => String(input))
    .filter((url) => url.startsWith("/api/logs/log-"));

beforeEach(() => {
  (
    globalThis as typeof globalThis & { IS_REACT_ACT_ENVIRONMENT?: boolean }
  ).IS_REACT_ACT_ENVIRONMENT = true;
  window.localStorage.clear();
  requestLogs = [REQUEST_LOG];
  proxyLogs = [PROXY_LOG];
  container = document.createElement("div");
  document.body.appendChild(container);
  root = createRoot(container);
  fetchMock = vi.fn(async (input: RequestInfo | URL) => {
    const url = String(input);
    if (url.startsWith("/api/usage/call-logs")) return Response.json(requestLogs);
    if (url.startsWith("/api/usage/proxy-logs")) return Response.json(proxyLogs);
    if (url.startsWith("/api/provider-nodes")) return Response.json({ nodes: [] });
    if (url.startsWith("/api/logs/detail")) return Response.json({ enabled: false });
    return Response.json({});
  });
  vi.stubGlobal("fetch", fetchMock);
});

afterEach(async () => {
  await act(async () => {
    root.unmount();
  });
  document.body.innerHTML = "";
  vi.unstubAllGlobals();
});

describe("RequestLoggerV2 row keyboard activation", () => {
  async function renderRow() {
    await render(<RequestLoggerV2 />);
    const row = Array.from(container.querySelectorAll<HTMLTableRowElement>("tbody tr")).find(
      (candidate) => candidate.textContent?.includes("gpt-keyboard")
    );
    expect(row, "the log row").toBeDefined();
    return row!;
  }

  it.each(["Enter", " "])(
    "opens the log detail from the focused row with %j",
    async (key) => {
      const row = await renderRow();
      expect(row.getAttribute("tabindex")).toBe("0");
      expect(detailRequests()).toEqual([]);

      const event = await press(row, key);

      expect(event.defaultPrevented).toBe(true);
      expect(detailRequests()).toContain("/api/logs/log-keyboard");
    },
    MOUNT_TIMEOUT_MS
  );

  it(
    "still opens the detail on a click and ignores other keys",
    async () => {
      const row = await renderRow();

      await press(row, "ArrowDown");
      expect(detailRequests()).toEqual([]);

      await act(async () => {
        row.querySelector("td")!.click();
        await Promise.resolve();
      });
      expect(detailRequests()).toContain("/api/logs/log-keyboard");
    },
    MOUNT_TIMEOUT_MS
  );
});

describe("ProxyLogger row keyboard activation", () => {
  async function renderRow() {
    await render(<ProxyLogger />);
    const row = container.querySelector<HTMLTableRowElement>("tbody tr");
    expect(row, "the proxy log row").not.toBeNull();
    return row!;
  }

  // The detail is a kit Dialog (Modal adapter): its content is portaled to document.body.
  const detailOpen = () => document.body.querySelector('[role="dialog"]') !== null;

  it.each(["Enter", " "])(
    "opens the proxy log detail from the focused row with %j",
    async (key) => {
      const row = await renderRow();
      expect(row.getAttribute("tabindex")).toBe("0");
      expect(detailOpen()).toBe(false);

      const event = await press(row, key);

      expect(event.defaultPrevented).toBe(true);
      expect(detailOpen()).toBe(true);
    },
    MOUNT_TIMEOUT_MS
  );

  it(
    "leaves Enter on the correlation link inside the row to the link",
    async () => {
      const row = await renderRow();
      const link = row.querySelector<HTMLAnchorElement>('a[href*="correlationId="]');
      expect(link, "the correlation link").not.toBeNull();

      const event = await press(link!, "Enter");

      expect(event.defaultPrevented).toBe(false);
      expect(detailOpen()).toBe(false);
    },
    MOUNT_TIMEOUT_MS
  );
});

// Kit #305 (table-roving-focus): a logger shows hundreds of rows, so its rows share one tab stop
// and the arrow keys move between them. Nothing in the table role says so, hence the translated
// hint that describes the table.
describe.each([
  {
    name: "RequestLoggerV2",
    mount: () => <RequestLoggerV2 />,
    seed: () => {
      requestLogs = [
        REQUEST_LOG,
        {
          ...REQUEST_LOG,
          id: "log-second",
          model: "gpt-second",
          timestamp: "2026-08-10T11:59:00.000Z",
        },
      ];
    },
  },
  {
    name: "ProxyLogger",
    mount: () => <ProxyLogger />,
    seed: () => {
      proxyLogs = [
        PROXY_LOG,
        {
          ...PROXY_LOG,
          id: "proxy-second",
          timestamp: new Date(Date.now() - 60_000).toISOString(),
          correlationId: "corr-second-654321",
        },
      ];
    },
  },
])("$name roving row focus", ({ mount, seed }) => {
  async function renderRows() {
    seed();
    await render(mount());
    const rows = Array.from(
      container.querySelectorAll<HTMLTableRowElement>("tbody tr[data-interactive]")
    );
    expect(rows.length, "two log rows").toBe(2);
    return rows;
  }

  it(
    "gives the rows one tab stop between them and moves it with the arrow keys",
    async () => {
      const rows = await renderRows();
      expect(container.querySelector("table")!.getAttribute("data-row-focus")).toBe("roving");
      expect(rows.map((row) => row.getAttribute("tabindex"))).toEqual(["0", "-1"]);

      await act(async () => {
        rows[0].focus();
      });
      const event = await press(rows[0], "ArrowDown");

      expect(event.defaultPrevented).toBe(true);
      expect(document.activeElement).toBe(rows[1]);
      expect(rows.map((row) => row.getAttribute("tabindex"))).toEqual(["-1", "0"]);
    },
    MOUNT_TIMEOUT_MS
  );

  it(
    "describes the table with the translated hint about the arrow keys",
    async () => {
      await renderRows();
      const hintId = container.querySelector("table")!.getAttribute("aria-describedby");
      expect(hintId, "aria-describedby on the table").toBeTruthy();
      const hint = document.getElementById(hintId!);
      expect(hint?.textContent).toBe("tableRowKeysHint");
    },
    MOUNT_TIMEOUT_MS
  );
});
