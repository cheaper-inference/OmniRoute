// @vitest-environment jsdom
// Team Reports phase 3: the branch, error-code, tier and team tabs, the trends chart, the matrix,
// the activity heatmap and the member and project drill-down panels.
import React, { act } from "react";
import { createRoot, type Root } from "react-dom/client";
import { fireEvent, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { NextIntlClientProvider } from "next-intl";

import messages from "../../../src/i18n/messages/en.json";
import ReportsPageClient from "../../../src/app/(dashboard)/dashboard/analytics/team-reports/ReportsPageClient";
import { parseReportView } from "../../../src/app/(dashboard)/dashboard/analytics/team-reports/reportFilters";
import {
  heatColor,
  mondayFirst,
  trendDimensionFor,
  weekdayName,
} from "../../../src/app/(dashboard)/dashboard/analytics/team-reports/reportViews";

const nav = vi.hoisted(() => ({ search: "", replace: vi.fn() }));
vi.mock("next/navigation", () => ({
  useRouter: () => ({ replace: nav.replace }),
  usePathname: () => "/dashboard/analytics/team-reports",
  useSearchParams: () => new URLSearchParams(nav.search),
}));

// The charts are lazy chunks in the app; load them at once, and give recharts a size (jsdom has none).
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
  input: 1000,
  output: 200,
  cacheRead: 0,
  cacheCreation: 0,
  reasoning: 0,
  uncachedInput: 1000,
  total: 1200,
};

const TOTALS = {
  requests: 10,
  errors: 1,
  unpricedRequests: 0,
  costUsd: 5,
  tokens: TOKENS,
  sessions: 2,
  members: 1,
  projects: 1,
  lastSeenAt: null,
  cacheHitRate: 0.5,
  avgLatencyMs: 1_000,
  p95LatencyMs: 2_000,
  avgTtftMs: 300,
  costPerSession: 2.5,
  activeMs: 3_600_000,
  modelMs: 60_000,
};

function row(key: string, label: string | null, costUsd: number) {
  return { ...TOTALS, key, label, detail: null, costUsd };
}

const BREAKDOWNS: Record<string, ReturnType<typeof row>[]> = {
  members: [row("key-alice", "alice", 5), row("", null, 1)],
  projects: [row("web-app", null, 4)],
  clients: [],
  providers: [],
  models: [row("claude-sonnet", null, 3)],
  accounts: [],
  daily: [row("2026-09-25", null, 2)],
  branches: [row("main", null, 5), row("", null, 1)],
  errorCodes: [row("rate_limited", null, 5), row("", null, 1)],
  serviceTiers: [row("priority", null, 5), row("", null, 1)],
  teams: [row("team-1", "Platform", 5), row("", null, 1)],
};

const metrics = (requests: number, activeMs: number | null = null) => ({
  requests,
  tokens: requests * 100,
  costUsd: requests / 10,
  activeMs,
});

const header = (key: string, label: string | null, requests: number, other = false) => ({
  key,
  label,
  other,
  ...metrics(requests, 60_000),
});

function matrixBody(overrides: Record<string, unknown> = {}) {
  return {
    rowDimension: "members",
    colDimension: "projects",
    rows: [header("key-alice", "alice", 8), header("__other__", null, 3, true)],
    cols: [header("web-app", null, 9), header("__other__", null, 2, true)],
    cells: [
      [metrics(6, 5_000), metrics(2, 1_000)],
      [metrics(3, 2_000), metrics(0, 0)],
    ],
    totals: { ...metrics(11), activeMs: 120_000 },
    truncated: true,
    rowCount: 40,
    colCount: 20,
    ...overrides,
  };
}

function zeroGrid() {
  return Array.from({ length: 7 }, () => Array.from({ length: 24 }, () => 0));
}

let container: HTMLDivElement;
let root: Root;
let urls: string[];
let trendsBody: Record<string, unknown>;
let matrix: Record<string, unknown>;
let heatmap: Record<string, unknown>;

beforeEach(() => {
  container = document.createElement("div");
  document.body.appendChild(container);
  root = createRoot(container);
  urls = [];
  nav.search = "";
  nav.replace.mockClear();
  trendsBody = {
    dimension: "members",
    metric: "costUsd",
    bucket: "day",
    days: ["2026-09-24", "2026-09-25"],
    series: [
      { key: "key-alice", label: "alice", other: false, values: [1, 2] },
      { key: "__other__", label: null, other: true, values: [0.5, 0.5] },
    ],
  };
  matrix = matrixBody();
  const requests = zeroGrid();
  requests[0][5] = 9; // Sunday 05:00
  requests[1][9] = 4; // Monday 09:00
  heatmap = { requests, costUsd: zeroGrid(), maxRequests: 9, maxCostUsd: 0 };
  vi.stubGlobal(
    "fetch",
    vi.fn(async (url: string) => {
      urls.push(url);
      const path = new URL(url, "http://localhost").pathname;
      const body =
        path === "/api/reports/facets"
          ? {}
          : path === "/api/reports/summary"
            ? { totals: TOTALS, breakdowns: BREAKDOWNS }
            : path === "/api/reports/trends"
              ? trendsBody
              : path === "/api/reports/matrix"
                ? matrix
                : path === "/api/reports/heatmap"
                  ? heatmap
                  : {
                      sessions: [
                        {
                          id: "as_1",
                          apiKeyName: "alice",
                          projectName: "web-app",
                          gitBranch: "main",
                          lastSeenAt: "2026-09-25T10:00:00.000Z",
                          requests: 7,
                          costUsd: 0.5,
                          activeMs: 3_725_000,
                        },
                      ],
                      total: 1,
                    };
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

async function renderPage(search = "") {
  nav.search = search;
  await act(async () => {
    root.render(
      <NextIntlClientProvider locale="en" messages={messages}>
        <ReportsPageClient />
      </NextIntlClientProvider>
    );
  });
  await flush();
}

async function click(el: HTMLElement) {
  await act(async () => el.click());
  await flush();
}

async function openTab(name: string) {
  await click(screen.getByRole("tab", { name }));
}

const urlsFor = (path: string) => urls.filter((url) => url.startsWith(path));
const lastUrl = (path: string) => urlsFor(path).at(-1) ?? "";
const paramsOf = (url: string) => new URL(url, "http://localhost").searchParams;
const filterButtons = () => screen.getAllByRole("button", { name: "Filter" });

describe("page URL tab state", () => {
  it("accepts the new breakdown tabs, the matrix and the heatmap", () => {
    for (const tab of ["branches", "errorCodes", "serviceTiers", "teams", "matrix", "heatmap"]) {
      expect(parseReportView(new URLSearchParams(`tab=${tab}`)).tab).toBe(tab);
    }
    expect(parseReportView(new URLSearchParams("tab=bogus")).tab).toBe("members");
  });
});

describe("new breakdown tabs", () => {
  it.each([
    ["Branches", "gitBranch", "main"],
    ["Error codes", "errorCode", "rate_limited"],
    ["Service tiers", "serviceTier", "priority"],
    ["Billing teams", "billingTeamId", "team-1"],
  ])("%s lists its rows and its Filter buttons set %s", async (tabName, param, value) => {
    await renderPage();
    await openTab(tabName);

    // The first row has a key; the second is the empty value.
    expect(screen.getAllByRole("button", { name: "Filter" })).toHaveLength(2);
    await click(filterButtons()[0]);
    expect(paramsOf(lastUrl("/api/reports/summary")).getAll(param)).toEqual([value]);

    await click(filterButtons()[1]);
    expect(paramsOf(lastUrl("/api/reports/summary")).getAll(param)).toEqual([value, "__none__"]);
  });

  it("shows a team's name and the empty value's own label", async () => {
    await renderPage("tab=teams");
    expect(container.textContent).toContain("Platform");
    expect(container.textContent).toContain(messages.reports.noBillingTeam);
  });
});

describe("trends chart", () => {
  it("stacks by the active tab's dimension and by members for the daily tab", async () => {
    await renderPage();
    expect(paramsOf(lastUrl("/api/reports/trends")).get("dimension")).toBe("members");

    await openTab("Branches");
    expect(paramsOf(lastUrl("/api/reports/trends")).get("dimension")).toBe("branches");
    await openTab("Error codes");
    expect(paramsOf(lastUrl("/api/reports/trends")).get("dimension")).toBe("errorCodes");

    await openTab("Daily");
    expect(paramsOf(lastUrl("/api/reports/trends")).get("dimension")).toBe("members");
    await openTab("Accounts");
    expect(paramsOf(lastUrl("/api/reports/trends")).get("dimension")).toBe("members");
    expect(trendDimensionFor("daily")).toBe("members");
    expect(trendDimensionFor("accounts")).toBe("members");
    expect(trendDimensionFor("serviceTiers")).toBe("serviceTiers");
  });

  it("sends the metric, forwards the filters and describes the chart", async () => {
    await renderPage("model=claude-sonnet");
    const trendsUrl = lastUrl("/api/reports/trends");
    expect(paramsOf(trendsUrl).get("metric")).toBe("costUsd");
    expect(paramsOf(trendsUrl).getAll("model")).toEqual(["claude-sonnet"]);
    expect(paramsOf(trendsUrl).get("tzOffset")).not.toBeNull();

    const chart = screen.getByRole("img", { name: /Cost by Member per day/ });
    expect(chart.getAttribute("aria-label")).toContain("Largest: alice");
    // One legend entry per series, the "other" bucket last.
    const legend = [...container.querySelectorAll("ul li")].map((li) => li.textContent);
    expect(legend.slice(-2)).toEqual(["alice($3.00)", "Other($1.00)"]);

    await click(screen.getByRole("tab", { name: "Tokens" }));
    expect(paramsOf(lastUrl("/api/reports/trends")).get("metric")).toBe("tokens");
  });

  it("notes that a long window is shown per week", async () => {
    await renderPage();
    expect(screen.queryByText(messages.reports.trendsWeekly)).toBeNull();

    trendsBody = { ...trendsBody, bucket: "week" };
    await click(screen.getByRole("tab", { name: "Requests" }));
    expect(screen.getByText(messages.reports.trendsWeekly)).toBeTruthy();
  });
});

describe("matrix", () => {
  const cell = (label: RegExp) => screen.getByRole("button", { name: label });

  it("is only fetched while its tab is shown, with the default dimensions", async () => {
    await renderPage();
    expect(urlsFor("/api/reports/matrix")).toHaveLength(0);
    expect(urlsFor("/api/reports/heatmap")).toHaveLength(0);

    await openTab("Matrix");
    const params = paramsOf(lastUrl("/api/reports/matrix"));
    expect(params.get("rows")).toBe("members");
    expect(params.get("cols")).toBe("projects");
    expect(params.get("tzOffset")).not.toBeNull();
  });

  it("shows totals, marks the other bucket and notes the truncation", async () => {
    await renderPage("tab=matrix");
    const text = container.textContent ?? "";
    expect(text).toContain("Top 1 × 1 shown of 40 × 20");
    expect(text).toContain("Total");
    // Cost metric: the grand total sits in the last cell.
    const cells = [...container.querySelectorAll("tbody tr:last-child td")].map(
      (td) => td.textContent
    );
    expect(cells.at(-1)).toBe("$1.10");
    // "Other" names, in italics, are not buttons.
    const other = screen.getAllByText("Other")[0];
    expect(other.closest("button")).toBeNull();
    expect(other.className).toContain("italic");
  });

  it("applies both filters from a cell, and none from an other cell", async () => {
    await renderPage("tab=matrix");
    await click(cell(/alice × .*: \$0\.60/));
    const params = paramsOf(lastUrl("/api/reports/summary"));
    expect(params.getAll("apiKeyId")).toEqual(["key-alice"]);
    expect(params.getAll("projectName")).toEqual(["web-app"]);

    // Cells of the other row or column are plain figures.
    const before = urls.length;
    expect(screen.queryByRole("button", { name: /Other × / })).toBeNull();
    expect(screen.queryByRole("button", { name: /× Other/ })).toBeNull();
    expect(urls.length).toBe(before);
  });

  it("applies one filter from a header, and filters on none for an empty value", async () => {
    matrix = matrixBody({
      rows: [header("key-alice", "alice", 8), header("", null, 3)],
      cols: [header("web-app", null, 9)],
      cells: [[metrics(6)], [metrics(3)]],
    });
    await renderPage("tab=matrix");
    await click(screen.getByRole("button", { name: "Filter by web-app" }));
    expect(paramsOf(lastUrl("/api/reports/summary")).getAll("projectName")).toEqual(["web-app"]);
    expect(paramsOf(lastUrl("/api/reports/summary")).getAll("apiKeyId")).toEqual([]);

    await click(
      screen.getByRole("button", { name: `Filter by ${messages.reports.unknownMember}` })
    );
    expect(paramsOf(lastUrl("/api/reports/summary")).getAll("apiKeyId")).toEqual(["__none__"]);
  });

  it("keeps the dimensions different and asks for the new pair", async () => {
    await renderPage("tab=matrix");
    const rows = screen.getByLabelText("Rows") as HTMLSelectElement;
    const cols = screen.getByLabelText("Columns") as HTMLSelectElement;

    await act(async () => {
      fireEvent.change(rows, { target: { value: "models" } });
    });
    await flush();
    let params = paramsOf(lastUrl("/api/reports/matrix"));
    expect([params.get("rows"), params.get("cols")]).toEqual(["models", "projects"]);

    // Picking the column dimension as the row swaps the two.
    await act(async () => {
      fireEvent.change(rows, { target: { value: "projects" } });
    });
    await flush();
    params = paramsOf(lastUrl("/api/reports/matrix"));
    expect([params.get("rows"), params.get("cols")]).toEqual(["projects", "models"]);
    expect(cols.value).toBe("models");
  });

  it("offers active time only when the cells have it, and sends no metric param", async () => {
    await renderPage("tab=matrix");
    expect(screen.queryByRole("tab", { name: "Active time" })).not.toBeNull();

    matrix = matrixBody({
      cells: [
        [metrics(6), metrics(2)],
        [metrics(3), metrics(0)],
      ],
    });
    await click(screen.getByRole("button", { name: /Refresh/ }));
    expect(screen.queryAllByRole("tab", { name: "Active time" })).toHaveLength(0);
  });
});

describe("activity heatmap", () => {
  it("reorders Sunday-first data to Monday-first", () => {
    const grid = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];
    expect(mondayFirst(grid)).toEqual(["mon", "tue", "wed", "thu", "fri", "sat", "sun"]);
  });

  it("draws Monday first, titles each cell and keeps a text fallback", async () => {
    await renderPage("tab=heatmap");
    const days = [...container.querySelectorAll("tbody th")].map((th) => th.textContent);
    expect(days).toEqual([1, 2, 3, 4, 5, 6, 0].map((day) => weekdayName(day)));

    const bodyRows = container.querySelectorAll("tbody tr");
    // Monday 09:00 is the second request peak; Sunday 05:00 (data row 0) is shown last.
    expect(bodyRows[0].querySelectorAll("td")[9].getAttribute("title")).toContain("4 Requests");
    const sunday = bodyRows[6].querySelectorAll("td")[5];
    expect(sunday.getAttribute("title")).toContain(`${weekdayName(0)} 05:00`);
    expect(sunday.getAttribute("title")).toContain("9 Requests");
    expect(sunday.textContent).toBe("9");
    expect(sunday.getAttribute("style")).toContain("color-mix");
    expect(heatColor(0, 9)).toBeUndefined();
  });

  it("switches to cost", async () => {
    const costUsd = zeroGrid();
    costUsd[3][14] = 1.5;
    heatmap = { ...heatmap, costUsd, maxCostUsd: 1.5 };
    await renderPage("tab=heatmap");
    // The trends chart has a Cost selector too; the heatmap's is the last.
    await click(screen.getAllByRole("tab", { name: "Cost" }).at(-1) as HTMLElement);
    const wednesday = container.querySelectorAll("tbody tr")[2].querySelectorAll("td")[14];
    expect(wednesday.getAttribute("title")).toContain("$1.50");
  });
});

describe("drill-down panels", () => {
  it("opens a member panel that fetches with the member filter and the current filters", async () => {
    await renderPage("model=claude-sonnet");
    await click(screen.getByRole("button", { name: "Open details for alice" }));

    const dialog = screen.getByRole("dialog");
    expect(dialog.textContent).toContain("alice");
    for (const path of ["/api/reports/summary", "/api/reports/trends", "/api/reports/sessions"]) {
      const params = paramsOf(lastUrl(path));
      expect(params.getAll("apiKeyId"), path).toEqual(["key-alice"]);
      expect(params.getAll("model"), path).toEqual(["claude-sonnet"]);
    }
    expect(paramsOf(lastUrl("/api/reports/sessions")).get("limit")).toBe("5");
    // KPIs, time spent, top projects and models, and recent sessions.
    expect(dialog.textContent).toContain(messages.reports.drillTopProjects);
    expect(dialog.textContent).toContain(messages.reports.drillTopModels);
    expect(dialog.textContent).toContain("1h 0m");
    expect(dialog.textContent).toContain("web-app");
    expect(dialog.querySelector('[role="img"]')).not.toBeNull();
  });

  it("replaces an existing member filter with the panel's member", async () => {
    await renderPage("apiKeyId=key-bob");
    await click(screen.getByRole("button", { name: "Open details for alice" }));
    expect(paramsOf(lastUrl("/api/reports/summary")).getAll("apiKeyId")).toEqual(["key-alice"]);
  });

  it("applies the member as a filter and closes", async () => {
    await renderPage();
    await click(screen.getByRole("button", { name: "Open details for alice" }));
    await click(screen.getByRole("button", { name: "Apply as filter" }));

    expect(screen.queryByRole("dialog")).toBeNull();
    expect(paramsOf(lastUrl("/api/reports/summary")).getAll("apiKeyId")).toEqual(["key-alice"]);
  });

  it("opens a project panel by member from the projects tab", async () => {
    await renderPage();
    await openTab("Projects");
    await click(screen.getByRole("button", { name: "Open details for web-app" }));

    expect(paramsOf(lastUrl("/api/reports/summary")).getAll("projectName")).toEqual(["web-app"]);
    expect(screen.getByRole("dialog").textContent).toContain(messages.reports.drillByMember);
  });

  it("opens from a matrix header", async () => {
    await renderPage("tab=matrix");
    await click(screen.getByRole("button", { name: "Open details for alice" }));
    expect(paramsOf(lastUrl("/api/reports/summary")).getAll("apiKeyId")).toEqual(["key-alice"]);
  });
});
