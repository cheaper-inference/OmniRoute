// @vitest-environment jsdom
// Team Reports phase 2: the time, latency and cache cards ("—" without data, human durations), the
// sessions-list column picker and its saved choice, the paged session detail and its timeline.
import React, { act } from "react";
import { createRoot, type Root } from "react-dom/client";
import { fireEvent, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { NextIntlClientProvider } from "next-intl";

import messages from "../../../src/i18n/messages/en.json";
import ReportsPageClient from "../../../src/app/(dashboard)/dashboard/analytics/team-reports/ReportsPageClient";
import SessionsPanel from "../../../src/app/(dashboard)/dashboard/analytics/team-reports/components/SessionsPanel";
import {
  NO_VALUE,
  formatLatency,
  formatRatio,
  formatSpan,
} from "../../../src/app/(dashboard)/dashboard/analytics/team-reports/components/format";
import {
  SESSION_COLUMNS_STORAGE_KEY,
  defaultSessionColumns,
  readSessionColumns,
} from "../../../src/app/(dashboard)/dashboard/analytics/team-reports/sessionColumns";
import { SESSION_SORT_FIELDS } from "../../../src/app/(dashboard)/dashboard/analytics/team-reports/reportFilters";

vi.mock("next/navigation", () => ({
  useRouter: () => ({ replace: () => {} }),
  usePathname: () => "/dashboard/analytics/team-reports",
  useSearchParams: () => new URLSearchParams(),
}));

// The chart is a lazy chunk in the app; load it at once, and give recharts a size (jsdom has none).
vi.mock("next/dynamic", () => ({
  default: (load: () => Promise<{ default: React.ComponentType<Record<string, unknown>> }>) => {
    return function Dynamic(props: Record<string, unknown>) {
      const [Component, setComponent] = React.useState<React.ComponentType<
        Record<string, unknown>
      > | null>(null);
      React.useEffect(() => {
        void load().then((m) => setComponent(() => m.default));
      }, []);
      return Component ? React.createElement(Component, props) : null;
    };
  },
}));
vi.mock("recharts", async (importOriginal) => {
  const actual = await importOriginal<typeof import("recharts")>();
  return {
    ...actual,
    ResponsiveContainer: ({ children }: { children: React.ReactElement }) =>
      React.cloneElement(children, { width: 640, height: 240 } as Record<string, unknown>),
  };
});

(globalThis as { IS_REACT_ACT_ENVIRONMENT?: boolean }).IS_REACT_ACT_ENVIRONMENT = true;

const TOKENS = {
  input: 12_000,
  output: 3_000,
  cacheRead: 9_000,
  cacheCreation: 1_000,
  reasoning: 2_500,
  uncachedInput: 2_000,
  total: 15_000,
};

const SUMMARY_TOTALS = {
  requests: 10,
  errors: 1,
  unpricedRequests: 0,
  costUsd: 5,
  tokens: TOKENS,
  sessions: 2,
  members: 1,
  projects: 1,
  lastSeenAt: null,
  cacheHitRate: 0.75,
  avgLatencyMs: 1_200,
  p95LatencyMs: 4_800,
  avgTtftMs: 350,
  costPerSession: 2.5,
  activeMs: 8_040_000,
  modelMs: 48_000,
};

const EMPTY_BREAKDOWNS = {
  members: [],
  projects: [],
  clients: [],
  providers: [],
  models: [],
  accounts: [],
  daily: [],
};

const ROW = {
  id: "as_1",
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
  requests: 7,
  errors: 2,
  unpricedRequests: 0,
  costUsd: 0.5,
  tokens: TOKENS,
  windowFirstSeenAt: "2026-09-25T09:00:00.000Z",
  windowLastSeenAt: "2026-09-25T10:00:00.000Z",
  activeMs: 3_725_000,
  modelMs: 90_000,
  mainModel: "claude-sonnet",
};

const SESSION = {
  ...ROW,
  requestCount: 120,
  errorCount: 2,
  costUsd: 0.5,
  unpricedCount: 0,
  lastProvider: "anthropic",
  lastModel: "claude-sonnet",
};

const REQUESTS_TOTAL = 120;
function request(id: number, overrides: Record<string, unknown> = {}) {
  return {
    id,
    timestamp: "2026-09-25T09:30:00.000Z",
    provider: "anthropic",
    model: "claude-sonnet",
    connectionId: "conn-1",
    serviceTier: "priority",
    status: "200",
    success: true,
    errorCode: null,
    latencyMs: 900,
    ttftMs: 0,
    tokens: {
      ...TOKENS,
      input: 100,
      output: 10,
      cacheRead: 0,
      cacheCreation: 0,
      uncachedInput: 100,
    },
    costUsd: 0.01,
    priced: true,
    ...overrides,
  };
}

const DETAIL_TOTALS = {
  requests: REQUESTS_TOTAL,
  errors: 2,
  unpricedRequests: 0,
  costUsd: 0.5,
  tokens: TOKENS,
  cacheHitRate: null,
  avgLatencyMs: 2_000,
  p95LatencyMs: 9_000,
  avgTtftMs: null,
  costPerSession: 0.5,
  activeMs: 3_725_000,
  modelMs: 90_000,
  wallMs: 7_200_000,
};

const POINTS = [
  { timestamp: "2026-09-25T09:00:00.000Z", model: "claude-sonnet", latencyMs: 800, ok: true },
  { timestamp: "2026-09-25T09:10:00.000Z", model: "gpt-5", latencyMs: 3_000, ok: true },
  { timestamp: "2026-09-25T09:20:00.000Z", model: "claude-sonnet", latencyMs: 9_000, ok: false },
];

let container: HTMLDivElement;
let root: Root;
let urls: string[];
let summaryTotals: Record<string, unknown>;
let timeline: { points: typeof POINTS; capped: boolean };

beforeEach(() => {
  container = document.createElement("div");
  document.body.appendChild(container);
  root = createRoot(container);
  urls = [];
  summaryTotals = SUMMARY_TOTALS;
  timeline = { points: POINTS, capped: false };
  window.localStorage.clear();
  vi.stubGlobal(
    "fetch",
    vi.fn(async (url: string) => {
      urls.push(url);
      const params = new URL(url, "http://localhost").searchParams;
      const offset = Number(params.get("offset") ?? 0);
      const body = url.startsWith("/api/reports/facets")
        ? {}
        : url.startsWith("/api/reports/summary")
          ? { totals: summaryTotals, breakdowns: EMPTY_BREAKDOWNS }
          : url.startsWith(`/api/reports/sessions/${ROW.id}`)
            ? {
                session: SESSION,
                recentRequests: [
                  request(offset + 1, { errorCode: "rate_limited", success: false, status: "429" }),
                  request(offset + 2, { priced: false }),
                ],
                requestsTotal: REQUESTS_TOTAL,
                totals: DETAIL_TOTALS,
                timeline,
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

async function flush() {
  for (let i = 0; i < 3; i += 1) {
    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 0));
    });
  }
}

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

async function click(el: HTMLElement) {
  await act(async () => el.click());
  await flush();
}

const PANEL_PROPS = {
  query: "",
  refreshToken: 0,
  order: { sort: "lastSeen", desc: true } as const,
  onOrderChange: () => {},
};

const headers = () => [...container.querySelectorAll("thead th")].map((th) => th.textContent);

/** term -> value of every definition in `scope`. */
function definitions(scope: Element): Map<string, string> {
  const map = new Map<string, string>();
  for (const dt of scope.querySelectorAll("dt")) {
    map.set(dt.textContent ?? "", dt.nextElementSibling?.textContent ?? "");
  }
  return map;
}

function card(label: string): HTMLElement {
  const title = [...container.querySelectorAll("p")].find((p) => p.textContent === label);
  if (!title?.parentElement) throw new Error(`no card "${label}"`);
  return title.parentElement;
}

describe("duration and ratio formatting", () => {
  it("writes spans as hours and minutes, minutes and seconds, or seconds", () => {
    expect(formatSpan(8_040_000)).toBe("2h 14m");
    expect(formatSpan(48_000)).toBe("48s");
    expect(formatSpan(725_000)).toBe("12m 5s");
    expect(formatSpan(0)).toBe("0s");
    expect(formatSpan(400)).toBe("0s");
    expect(formatSpan(null)).toBe(NO_VALUE);
  });

  it("writes latency in ms or s, and no value as a dash", () => {
    expect(formatLatency(420)).toBe("420ms");
    expect(formatLatency(1_200)).toBe("1.2s");
    expect(formatLatency(0)).toBe(NO_VALUE);
    expect(formatLatency(null)).toBe(NO_VALUE);
    expect(formatRatio(0.875)).toBe("87.5%");
    expect(formatRatio(0)).toBe("0.0%");
    expect(formatRatio(null)).toBe(NO_VALUE);
  });
});

describe("Team Reports time, latency and cache cards", () => {
  it("shows the figures with human durations and the two definitions", async () => {
    await render(<ReportsPageClient />);

    const time = card("Time");
    expect([...definitions(time)]).toEqual([
      ["Active time", "2h 14m"],
      ["Model time", "48s"],
    ]);
    expect(time.textContent).toContain(messages.reports.helpActiveTime);
    expect(time.textContent).toContain(messages.reports.helpModelTime);
    expect([...definitions(card("Latency"))]).toEqual([
      ["Avg latency", "1.2s"],
      ["p95 latency", "4.8s"],
      ["Avg TTFT", "350ms"],
    ]);
    expect(card("Cache hit rate").textContent).toBe("Cache hit rate75.0%");
    expect(card("Cost per session").textContent).toBe("Cost per session$2.50");
    expect(card("Reasoning tokens").textContent).toBe("Reasoning tokens2.5K");
  });

  it("shows a dash for every figure that has no value", async () => {
    summaryTotals = {
      ...SUMMARY_TOTALS,
      cacheHitRate: null,
      avgLatencyMs: null,
      p95LatencyMs: null,
      avgTtftMs: null,
      costPerSession: null,
    };
    await render(<ReportsPageClient />);

    expect([...definitions(card("Latency")).values()]).toEqual([NO_VALUE, NO_VALUE, NO_VALUE]);
    expect(card("Cache hit rate").textContent).toBe(`Cache hit rate${NO_VALUE}`);
    expect(card("Cost per session").textContent).toBe(`Cost per session${NO_VALUE}`);
  });
});

describe("Team Reports sessions list columns", () => {
  it("adds errors, active time and main model by default and sorts by active time", async () => {
    await render(<SessionsPanel {...PANEL_PROPS} />);

    expect(headers()).toEqual([
      "Member",
      "Project",
      "Client",
      "Branch",
      "Requests",
      "Errors",
      "Active time",
      "Main model",
      "Input",
      "Output",
      "Cache",
      "Cost",
      "Last active",
      "",
    ]);
    const cells = [...container.querySelectorAll("tbody tr td")].map((td) => td.textContent);
    expect(cells[headers().indexOf("Errors")]).toBe("2");
    expect(cells[headers().indexOf("Active time")]).toBe("1h 2m");
    expect(cells[headers().indexOf("Main model")]).toBe("claude-sonnet");
    expect(SESSION_SORT_FIELDS).toContain("activeTime");
    expect(messages.reports.sort_activeTime).toBe("Active time");
  });

  async function pickColumn(name: string) {
    const trigger = screen.getByRole("button", { name: "Toggle columns" });
    if (!screen.queryByRole("menu")) {
      fireEvent.pointerDown(trigger, { button: 0, ctrlKey: false });
      fireEvent.click(trigger);
      await screen.findByRole("menu");
    }
    await act(async () => {
      fireEvent.click(screen.getByRole("menuitemcheckbox", { name }));
    });
    await flush();
  }

  it("hides and shows columns, and remembers the choice", async () => {
    await render(<SessionsPanel {...PANEL_PROPS} />);
    expect(headers()).not.toContain("Reasoning");
    expect(headers()).not.toContain("First seen (window)");

    await pickColumn("Reasoning");
    await pickColumn("First seen (window)");
    await pickColumn("Main model");
    expect(headers()).toContain("Reasoning");
    expect(headers()).toContain("First seen (window)");
    expect(headers()).not.toContain("Main model");
    const cells = [...container.querySelectorAll("tbody tr td")].map((td) => td.textContent);
    expect(cells[headers().indexOf("Reasoning")]).toBe("2.5K");

    const saved = JSON.parse(window.localStorage.getItem(SESSION_COLUMNS_STORAGE_KEY) ?? "{}");
    expect(saved).toMatchObject({
      reasoning: true,
      firstSeen: true,
      mainModel: false,
      member: true,
    });

    // A fresh mount reads the saved choice back.
    act(() => root.unmount());
    root = createRoot(container);
    await render(<SessionsPanel {...PANEL_PROPS} />);
    expect(headers()).toContain("Reasoning");
    expect(headers()).not.toContain("Main model");
  });

  it("ignores a corrupt saved choice and unknown keys", () => {
    expect(readSessionColumns("not json")).toEqual(defaultSessionColumns());
    expect(readSessionColumns(JSON.stringify({ member: false, bogus: false, cost: "no" }))).toEqual(
      {
        ...defaultSessionColumns(),
        member: false,
      }
    );
  });
});

describe("Team Reports session detail", () => {
  async function openDetail() {
    await render(<SessionsPanel {...PANEL_PROPS} />);
    const details = [...container.querySelectorAll("tbody button")].find(
      (button) => button.textContent === "Details"
    );
    await click(details as HTMLElement);
  }
  const detailUrls = () => urls.filter((url) => url.startsWith(`/api/reports/sessions/${ROW.id}`));
  const detailParams = () => new URL(detailUrls().at(-1) ?? "", "http://localhost").searchParams;

  it("shows the time, latency and cache figures from the detail totals", async () => {
    await openDetail();

    const facts = definitions(document.body);
    expect(facts.get("Wall time")).toBe("2h 0m");
    expect(facts.get("Active time")).toBe("1h 2m");
    expect(facts.get("Model time")).toBe("1m 30s");
    expect(facts.get("Avg latency")).toBe("2.0s");
    expect(facts.get("p95 latency")).toBe("9.0s");
    expect(facts.get("Avg TTFT")).toBe(NO_VALUE);
    expect(facts.get("Cache hit rate")).toBe(NO_VALUE);
    expect(document.body.textContent).toContain(messages.reports.helpWallTime);
  });

  it("pages the requests 50 at a time", async () => {
    await openDetail();
    expect(detailParams().get("limit")).toBe("50");
    expect(detailParams().get("offset")).toBe("0");
    expect(document.body.textContent).toContain("1–2 of 120 requests");
    expect(screen.getByRole("button", { name: "Previous" }).hasAttribute("disabled")).toBe(true);

    await click(screen.getByRole("button", { name: "Next" }));
    expect(detailParams().get("offset")).toBe("50");
    expect(document.body.textContent).toContain("51–52 of 120 requests");

    await click(screen.getByRole("button", { name: "Previous" }));
    expect(detailParams().get("offset")).toBe("0");
  });

  it("lists TTFT, reasoning, error code, tier, latency and cost per request", async () => {
    await openDetail();

    const table = [...document.body.querySelectorAll("table")].at(-1) as HTMLTableElement;
    const head = [...table.querySelectorAll("thead th")].map((th) => th.textContent);
    expect(head).toEqual(
      expect.arrayContaining(["TTFT", "Reasoning", "Error code", "Service tier", "Latency", "Cost"])
    );
    const row = (index: number, header: string) =>
      table.querySelectorAll("tbody tr")[index].querySelectorAll("td")[head.indexOf(header)];
    expect(row(0, "Error code").textContent).toBe("rate_limited");
    expect(row(0, "Service tier").textContent).toBe("priority");
    expect(row(0, "Latency").textContent).toBe("900ms");
    // ttftMs 0 means nothing was recorded.
    expect(row(0, "TTFT").textContent).toBe(NO_VALUE);
    expect(row(0, "Reasoning").textContent).toBe("2.5K");
    expect(row(0, "Cost").textContent).toBe("$0.0100");
    // An unpriced request has no cost to show.
    expect(row(1, "Cost").textContent).toContain(NO_VALUE);
  });

  it("draws the timeline by model with failed requests marked, and notes a capped one", async () => {
    timeline = { points: POINTS, capped: true };
    await openDetail();

    const chart = screen.getByRole("img", { name: /Timeline of 3 requests/ });
    expect(chart.getAttribute("aria-label")).toBe(
      "Timeline of 3 requests across 2 models; 1 failed; slowest 9.0s."
    );
    expect(screen.getByRole("note").textContent).toBe(
      "Only the newest 3 requests are charted; older requests are left out."
    );
    expect(chart.querySelectorAll("[data-ok]")).toHaveLength(2);
    expect(chart.querySelectorAll("[data-failed]")).toHaveLength(1);
    // The legend names each model with its count, and the failed requests.
    expect(document.body.textContent).toContain("claude-sonnet(2)");
    expect(document.body.textContent).toContain("gpt-5(1)");
    expect(document.body.textContent).toContain("1 failed request");
  });

  it("has no capped note for a complete timeline", async () => {
    await openDetail();
    expect(screen.queryByRole("note")).toBeNull();
  });
});
