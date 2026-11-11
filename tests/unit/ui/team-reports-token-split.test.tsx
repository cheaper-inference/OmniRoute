// @vitest-environment jsdom
// Team Reports token split: the summary card and the sessions list/detail show Input, Output and
// Cache instead of one total figure.
import React, { act } from "react";
import { createRoot, type Root } from "react-dom/client";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { NextIntlClientProvider } from "next-intl";

import messages from "../../../src/i18n/messages/en.json";
import ReportsPageClient from "../../../src/app/(dashboard)/dashboard/analytics/team-reports/ReportsPageClient";
import SessionsPanel from "../../../src/app/(dashboard)/dashboard/analytics/team-reports/components/SessionsPanel";
import type {
  AgentSessionRecentUsage,
  AgentSessionRecord,
} from "../../../src/lib/db/agentSessions";
import type {
  AgentSessionReport,
  AgentSessionReportRow,
} from "../../../src/lib/usage/agentSessionReports";

vi.mock("next/navigation", () => ({
  useRouter: () => ({ replace: () => {} }),
  usePathname: () => "/dashboard/analytics/team-reports",
  useSearchParams: () => new URLSearchParams(),
}));

(globalThis as { IS_REACT_ACT_ENVIRONMENT?: boolean }).IS_REACT_ACT_ENVIRONMENT = true;

const fmt = (value: number) => new Intl.NumberFormat().format(value);

// Stored input already includes the cached part, and output already includes reasoning.
const REPORT: AgentSessionReport = {
  totals: {
    requests: 12,
    errors: 1,
    unpricedRequests: 0,
    costUsd: 4.2,
    tokens: {
      input: 1_500_000,
      output: 45_000,
      cacheRead: 1_000_000,
      cacheCreation: 200_000,
      reasoning: 5_000,
      uncachedInput: 300_000,
      total: 1_545_000,
    },
    sessions: 3,
    members: 2,
    projects: 2,
    lastSeenAt: "2026-09-25T10:00:00.000Z",
  },
  breakdowns: {
    members: [],
    projects: [],
    clients: [],
    providers: [],
    models: [],
    accounts: [],
    daily: [],
  },
};

const TOKENS = {
  input: 12_000,
  output: 3_000,
  cacheRead: 9_000,
  cacheCreation: 1_000,
  reasoning: 500,
  uncachedInput: 2_000,
  total: 15_000,
};

// Stored record of the detail endpoint: its own counters are deliberately different from the
// read-time totals, which are what the modal must show.
const SESSION: AgentSessionRecord = {
  id: "as_session1",
  apiKeyId: "key-alice",
  apiKeyName: "alice",
  client: "claude-code",
  clientSessionId: null,
  projectName: "web-app",
  projectRepo: null,
  projectPath: null,
  projectSource: null,
  gitBranch: "main",
  firstSeenAt: "2026-09-25T09:00:00.000Z",
  lastSeenAt: "2026-09-25T10:00:00.000Z",
  requestCount: 99,
  errorCount: 9,
  tokens: { ...TOKENS, input: 1, output: 1, cacheRead: 0, cacheCreation: 0, uncachedInput: 1 },
  costUsd: 0.5,
  unpricedCount: 0,
  lastProvider: "anthropic",
  lastModel: "claude-sonnet",
};

const ROW: AgentSessionReportRow = {
  id: SESSION.id,
  apiKeyId: SESSION.apiKeyId,
  apiKeyName: SESSION.apiKeyName,
  client: SESSION.client,
  clientSessionId: null,
  projectName: SESSION.projectName,
  projectRepo: null,
  projectPath: null,
  projectSource: null,
  gitBranch: "main",
  firstSeenAt: SESSION.firstSeenAt,
  lastSeenAt: SESSION.lastSeenAt,
  requests: 4,
  errors: 0,
  unpricedRequests: 0,
  costUsd: 0.5,
  tokens: TOKENS,
  windowFirstSeenAt: SESSION.firstSeenAt,
  windowLastSeenAt: SESSION.lastSeenAt,
};

const TOTALS = {
  requests: 4,
  errors: 0,
  unpricedRequests: 0,
  costUsd: 0.5,
  tokens: TOKENS,
};

// The two requests of SESSION: their split adds up to the session header.
function request(
  id: number,
  tokens: Omit<AgentSessionRecentUsage["tokens"], "reasoning" | "uncachedInput">
): AgentSessionRecentUsage {
  return {
    id,
    timestamp: `2026-09-25T09:0${id}:00.000Z`,
    provider: "anthropic",
    model: "claude-sonnet",
    tokens: {
      ...tokens,
      reasoning: 0,
      uncachedInput: tokens.input - tokens.cacheRead - tokens.cacheCreation,
    },
    latencyMs: 900,
    ttftMs: 300,
    status: "200",
    success: true,
  };
}
const REQUESTS = [
  request(1, { input: 7_000, output: 1_000, cacheRead: 5_000, cacheCreation: 1_000 }),
  request(2, { input: 5_000, output: 2_000, cacheRead: 4_000, cacheCreation: 0 }),
];

const PANEL_PROPS = {
  query: "",
  refreshToken: 0,
  order: { sort: "lastSeen", desc: true } as const,
  onOrderChange: () => {},
};

let container: HTMLDivElement;
let root: Root;

beforeEach(() => {
  container = document.createElement("div");
  document.body.appendChild(container);
  root = createRoot(container);
  vi.stubGlobal(
    "fetch",
    vi.fn(async (url: string) => {
      const body = url.startsWith("/api/reports/facets")
        ? {}
        : url.startsWith("/api/reports/summary")
          ? REPORT
          : url.startsWith(`/api/reports/sessions/${SESSION.id}`)
            ? {
                session: SESSION,
                recentRequests: REQUESTS,
                requestsTotal: REQUESTS.length,
                totals: TOTALS,
                timeline: { points: [], capped: false },
              }
            : { sessions: [ROW], total: 1 };
      return { ok: true, status: 200, json: async () => body };
    })
  );
});

afterEach(() => {
  act(() => root.unmount());
  container.remove();
  vi.unstubAllGlobals();
});

async function render(ui: React.ReactElement) {
  await act(async () => {
    root.render(
      <NextIntlClientProvider locale="en" messages={messages}>
        {ui}
      </NextIntlClientProvider>
    );
  });
  await flush();
}

async function flush() {
  for (let i = 0; i < 3; i += 1) {
    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 0));
    });
  }
}

/** term -> <dd> of every definition list inside `scope`. */
function definitions(scope: Element): Map<string, HTMLElement> {
  const map = new Map<string, HTMLElement>();
  for (const dt of scope.querySelectorAll("dt")) {
    const dd = dt.nextElementSibling as HTMLElement | null;
    if (dd) map.set(dt.textContent ?? "", dd);
  }
  return map;
}

function expectCacheDetail(el: HTMLElement | undefined, read: number, write: number) {
  const title = el?.querySelector("[title]")?.getAttribute("title") ?? "";
  expect(title).toContain(`Cache Read: ${fmt(read)}`);
  expect(title).toContain(`Cache Write: ${fmt(write)}`);
  expect(el?.textContent).toContain(title);
}

describe("Team Reports token split", () => {
  it("summary card shows Input, Output and Cache instead of a total", async () => {
    await render(<ReportsPageClient />);

    const label = [...container.querySelectorAll("p")].find((p) => p.textContent === "Tokens");
    const card = label?.parentElement as HTMLElement;
    expect(card).toBeTruthy();
    const figures = definitions(card);
    expect([...figures.keys()]).toEqual(["Input", "Output", "Cache"]);
    expect(figures.get("Input")?.textContent).toBe("300.0K");
    expect(figures.get("Output")?.textContent).toBe("45.0K");
    expect(figures.get("Cache")?.textContent?.startsWith("1.2M")).toBe(true);
    expectCacheDetail(figures.get("Cache"), 1_000_000, 200_000);
    // The card renders exactly the three figures, and no total.
    const detail = `Cache Read: ${fmt(1_000_000)} · Cache Write: ${fmt(200_000)}`;
    expect(card.textContent).toBe(`TokensInput300.0KOutput45.0KCache1.2M (${detail})`);
  });

  it("sessions list shows Input, Output and Cache columns", async () => {
    await render(<SessionsPanel {...PANEL_PROPS} />);

    const headers = [...container.querySelectorAll("thead th")].map((th) => th.textContent);
    expect(headers).not.toContain("Tokens");
    const cells = [...container.querySelectorAll("tbody tr td")];
    const at = (header: string) => cells[headers.indexOf(header)] as HTMLElement;
    expect(at("Input").textContent).toBe("2.0K");
    expect(at("Output").textContent).toBe("3.0K");
    expect(at("Cache").textContent?.startsWith("10.0K")).toBe(true);
    expectCacheDetail(at("Cache"), 9_000, 1_000);
  });

  it("session detail shows Input, Output and Cache", async () => {
    await render(<SessionsPanel {...PANEL_PROPS} />);

    const details = [...container.querySelectorAll("tbody button")].find(
      (button) => button.textContent === "Details"
    );
    await act(async () => (details as HTMLButtonElement).click());
    await flush();

    const figures = definitions(document.body);
    expect(figures.has("Tokens")).toBe(false);
    expect(figures.get("Input")?.textContent).toBe("2.0K");
    expect(figures.get("Output")?.textContent).toBe("3.0K");
    expect(figures.get("Cache")?.textContent?.startsWith("10.0K")).toBe(true);
    expectCacheDetail(figures.get("Cache"), 9_000, 1_000);

    // Each request row shows the same split, and the rows add up to the header above.
    const table = [...document.body.querySelectorAll("table")].at(-1) as HTMLTableElement;
    const headers = [...table.querySelectorAll("thead th")].map((th) => th.textContent);
    expect(headers).not.toContain("Tokens in / out");
    const cell = (row: number, header: string) =>
      table.querySelectorAll("tbody tr")[row].querySelectorAll("td")[headers.indexOf(header)];
    expect([0, 1].map((row) => cell(row, "Input").textContent)).toEqual(["1.0K", "1.0K"]);
    expect([0, 1].map((row) => cell(row, "Output").textContent)).toEqual(["1.0K", "2.0K"]);
    expect(cell(0, "Cache").textContent?.startsWith("6.0K")).toBe(true);
    expect(cell(1, "Cache").textContent?.startsWith("4.0K")).toBe(true);
    expectCacheDetail(cell(0, "Cache") as HTMLElement, 5_000, 1_000);
  });
});
