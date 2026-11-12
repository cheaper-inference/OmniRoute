// @vitest-environment jsdom
// Team Reports phase 4: the export menus (every tab, the matrix, a session's requests) and the
// session detail opened from the drill-down panel.
import React, { act } from "react";
import { createRoot, type Root } from "react-dom/client";
import { fireEvent, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { NextIntlClientProvider } from "next-intl";

import messages from "../../../src/i18n/messages/en.json";
import ReportsPageClient from "../../../src/app/(dashboard)/dashboard/analytics/team-reports/ReportsPageClient";
import SessionDetailModal from "../../../src/app/(dashboard)/dashboard/analytics/team-reports/components/SessionDetailModal";
import {
  sessionRequestsExportParams,
  tabExportParams,
  DEFAULT_MATRIX_SELECTION,
} from "../../../src/app/(dashboard)/dashboard/analytics/team-reports/reportExport";

const nav = vi.hoisted(() => ({ search: "", replace: vi.fn() }));
vi.mock("next/navigation", () => ({
  useRouter: () => ({ replace: nav.replace }),
  usePathname: () => "/dashboard/analytics/team-reports",
  useSearchParams: () => new URLSearchParams(nav.search),
}));
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
const row = (key: string, label: string | null) => ({ ...TOTALS, key, label, detail: null });
const BREAKDOWNS = {
  members: [row("key-alice", "alice")],
  projects: [row("web-app", null)],
  clients: [],
  providers: [],
  models: [],
  accounts: [],
  daily: [],
  branches: [],
  errorCodes: [],
  serviceTiers: [],
  teams: [],
};
const SESSION = {
  id: "as_1",
  apiKeyName: "alice",
  projectName: "web-app",
  gitBranch: "main",
  lastSeenAt: "2026-09-25T10:00:00.000Z",
  requests: 7,
  costUsd: 0.5,
  activeMs: 3_725_000,
  tokens: TOKENS,
};
const DETAIL = {
  session: {
    id: "as_1",
    apiKeyId: "key-alice",
    apiKeyName: "alice",
    projectName: "web-app",
    projectPath: null,
    gitBranch: "main",
    firstSeenAt: "2026-09-25T09:00:00.000Z",
    lastSeenAt: "2026-09-25T10:00:00.000Z",
  },
  recentRequests: [],
  requestsTotal: 0,
  totals: { ...TOTALS, wallMs: 1000 },
  timeline: { points: [], capped: false },
};
const MATRIX = {
  rowDimension: "members",
  colDimension: "projects",
  rows: [
    {
      key: "key-alice",
      label: "alice",
      other: false,
      requests: 1,
      tokens: 1,
      costUsd: 1,
      activeMs: null,
    },
  ],
  cols: [
    {
      key: "web-app",
      label: null,
      other: false,
      requests: 1,
      tokens: 1,
      costUsd: 1,
      activeMs: null,
    },
  ],
  cells: [[{ requests: 1, tokens: 1, costUsd: 1, activeMs: null }]],
  totals: { requests: 1, tokens: 1, costUsd: 1, activeMs: null },
  truncated: false,
  rowCount: 1,
  colCount: 1,
};
const zeroGrid = () => Array.from({ length: 7 }, () => Array.from({ length: 24 }, () => 0));

let container: HTMLDivElement;
let root: Root;
let urls: string[];
let exportResponse: { status: number; headers: Record<string, string> };
let anchors: string[];

beforeEach(() => {
  container = document.createElement("div");
  document.body.appendChild(container);
  root = createRoot(container);
  urls = [];
  anchors = [];
  nav.search = "";
  exportResponse = { status: 200, headers: {} };
  vi.stubGlobal(
    "fetch",
    vi.fn(async (url: string) => {
      urls.push(url);
      const path = new URL(url, "http://localhost").pathname;
      if (path === "/api/reports/export") {
        return {
          ok: exportResponse.status === 200,
          status: exportResponse.status,
          headers: new Headers(exportResponse.headers),
          blob: async () => new Blob(["x"]),
        };
      }
      const body =
        path === "/api/reports/facets"
          ? {}
          : path === "/api/reports/summary"
            ? { totals: TOTALS, breakdowns: BREAKDOWNS }
            : path === "/api/reports/trends"
              ? { dimension: "members", metric: "costUsd", bucket: "day", days: [], series: [] }
              : path === "/api/reports/matrix"
                ? MATRIX
                : path === "/api/reports/heatmap"
                  ? { requests: zeroGrid(), costUsd: zeroGrid(), maxRequests: 0, maxCostUsd: 0 }
                  : path.startsWith("/api/reports/sessions/")
                    ? DETAIL
                    : { sessions: [SESSION], total: 1 };
      return { ok: true, status: 200, json: async () => body };
    })
  );
  Object.assign(URL, { createObjectURL: vi.fn(() => "blob:report"), revokeObjectURL: vi.fn() });
  vi.spyOn(HTMLAnchorElement.prototype, "click").mockImplementation(function (
    this: HTMLAnchorElement
  ) {
    anchors.push(this.download);
  });
});

afterEach(() => {
  act(() => root.unmount());
  container.remove();
  vi.unstubAllGlobals();
  vi.restoreAllMocks();
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

const renderPage = (search = "") => {
  nav.search = search;
  return render(<ReportsPageClient />);
};

async function click(el: HTMLElement) {
  await act(async () => el.click());
  await flush();
}

async function exportAs(format: "CSV" | "JSON", trigger = "Export") {
  fireEvent.pointerDown(screen.getByRole("button", { name: trigger }), {
    button: 0,
    ctrlKey: false,
  });
  const item = await screen.findByRole("menuitem", { name: `Export as ${format}` });
  await act(async () => {
    fireEvent.click(item);
  });
  await flush();
}

const lastUrl = (path: string) =>
  urls.filter((url) => new URL(url, "http://localhost").pathname === path).at(-1) ?? "";
const paramsOf = (url: string) => new URL(url, "http://localhost").searchParams;
const lastExport = () => paramsOf(lastUrl("/api/reports/export"));
const openTab = (name: string) => click(screen.getByRole("tab", { name }));

describe("export menu on the page", () => {
  it("offers CSV and JSON", async () => {
    await renderPage();
    fireEvent.pointerDown(screen.getByRole("button", { name: "Export" }), {
      button: 0,
      ctrlKey: false,
    });
    const items = await screen.findAllByRole("menuitem");
    expect(items.map((item) => item.textContent)).toEqual(["Export as CSV", "Export as JSON"]);
  });

  it("exports the active breakdown with the filters and no matrix or session params", async () => {
    await renderPage("model=claude-sonnet");
    await openTab("Branches");
    await exportAs("CSV");

    const params = lastExport();
    expect(params.get("type")).toBe("branches");
    expect(params.get("format")).toBe("csv");
    expect(params.getAll("model")).toEqual(["claude-sonnet"]);
    for (const name of ["metric", "rows", "cols", "sessionId", "sort", "order"]) {
      expect(params.has(name), name).toBe(false);
    }
  });

  it("sends format=json for JSON", async () => {
    await renderPage();
    await exportAs("JSON");
    expect(lastExport().get("type")).toBe("members");
    expect(lastExport().get("format")).toBe("json");
  });

  it("exports the sessions tab with the current sort and order", async () => {
    await renderPage("tab=sessions&sort=cost&order=asc");
    await exportAs("CSV");

    const params = lastExport();
    expect(params.get("type")).toBe("sessions");
    expect(params.get("sort")).toBe("cost");
    expect(params.get("order")).toBe("asc");
    for (const name of ["metric", "rows", "cols", "sessionId"])
      expect(params.has(name)).toBe(false);
  });

  it("exports the matrix with its current rows, columns and metric", async () => {
    await renderPage("tab=matrix");
    await act(async () => {
      fireEvent.change(screen.getByLabelText("Rows"), { target: { value: "models" } });
    });
    await flush();
    await click(screen.getAllByRole("radio", { name: "Requests" }).at(-1) as HTMLElement);
    await exportAs("JSON");

    const params = lastExport();
    expect(params.get("type")).toBe("matrix");
    expect(params.get("rows")).toBe("models");
    expect(params.get("cols")).toBe("projects");
    expect(params.get("metric")).toBe("requests");
    expect(params.get("format")).toBe("json");
    expect(params.has("sort")).toBe(false);
  });

  it("keeps the matrix choice after visiting another tab", async () => {
    await renderPage("tab=matrix");
    await click(screen.getAllByRole("radio", { name: "Tokens" }).at(-1) as HTMLElement);
    await openTab("Members");
    await openTab("Matrix");
    await exportAs("CSV");
    expect(lastExport().get("metric")).toBe("tokens");
  });

  it("disables the menu on the heatmap and says why", async () => {
    await renderPage("tab=heatmap");
    const trigger = screen.getByRole("button", { name: "Export" }) as HTMLButtonElement;
    expect(trigger.disabled).toBe(true);
    expect(trigger.closest("span")?.getAttribute("title")).toBe(messages.reports.exportNoHeatmap);
    expect(trigger.getAttribute("aria-describedby")).toBeTruthy();
    expect(urls.some((url) => url.startsWith("/api/reports/export"))).toBe(false);

    await openTab("Members");
    expect((screen.getByRole("button", { name: "Export" }) as HTMLButtonElement).disabled).toBe(
      false
    );
  });
});

describe("export params", () => {
  const order = { sort: "lastSeen", desc: true } as const;

  it("builds each tab's type and only its own params", () => {
    const build = (tab: Parameters<typeof tabExportParams>[0]) =>
      tabExportParams(tab, "csv", "from=a", order, DEFAULT_MATRIX_SELECTION);
    expect(build("heatmap")).toBeNull();
    expect(build("teams")?.toString()).toBe("from=a&format=csv&type=teams");
    expect(build("sessions")?.toString()).toBe(
      "from=a&format=csv&type=sessions&sort=lastSeen&order=desc"
    );
    expect(build("matrix")?.toString()).toBe(
      "from=a&format=csv&type=matrix&rows=members&cols=projects&metric=costUsd"
    );
  });

  it("asks for a session's requests without filters", () => {
    expect(sessionRequestsExportParams("as 1", "json").toString()).toBe(
      "type=sessionRequests&sessionId=as+1&format=json"
    );
  });
});

describe("download outcome", () => {
  it("uses the server's file name", async () => {
    exportResponse = {
      status: 200,
      headers: {
        "Content-Disposition": 'attachment; filename="omniroute-report-members-2026-09-25.csv"',
      },
    };
    await renderPage();
    await exportAs("CSV");
    expect(anchors).toEqual(["omniroute-report-members-2026-09-25.csv"]);
  });

  it("falls back to the chosen format's extension", async () => {
    await renderPage("tab=matrix");
    await exportAs("JSON");
    expect(anchors).toEqual(["omniroute-report-matrix.json"]);
    await exportAs("CSV");
    expect(anchors.at(-1)).toBe("omniroute-report-matrix.csv");
  });

  it("notes a truncated export with the total, for any type", async () => {
    exportResponse = {
      status: 200,
      headers: { "X-Report-Total": "12345", "X-Report-Truncated": "true" },
    };
    await renderPage("tab=matrix");
    await exportAs("CSV");
    const note = container.querySelector("[role=status]");
    expect(note?.textContent).toContain("Exported only the first rows");
    expect(note?.textContent).toContain("12,345");
  });

  it("shows a failure note", async () => {
    exportResponse = { status: 500, headers: {} };
    await renderPage();
    await exportAs("CSV");
    expect(container.querySelector("[role=alert]")?.textContent).toBe(
      messages.reports.exportFailed
    );
    expect(anchors).toEqual([]);
  });
});

describe("session detail export", () => {
  async function renderDetail() {
    await render(<SessionDetailModal sessionId="as_1" onClose={() => {}} />);
  }

  it("exports the session's requests as CSV and JSON", async () => {
    await renderDetail();
    await exportAs("CSV", "Export requests");
    let params = lastExport();
    expect(params.get("type")).toBe("sessionRequests");
    expect(params.get("sessionId")).toBe("as_1");
    expect(params.get("format")).toBe("csv");
    expect([...params.keys()].sort()).toEqual(["format", "sessionId", "type"]);
    expect(anchors).toEqual(["omniroute-report-sessionRequests.csv"]);

    await exportAs("JSON", "Export requests");
    params = lastExport();
    expect(params.get("format")).toBe("json");
    expect(anchors.at(-1)).toBe("omniroute-report-sessionRequests.json");
  });

  it("notes a truncated request export", async () => {
    exportResponse = {
      status: 200,
      headers: { "X-Report-Total": "60000", "X-Report-Truncated": "true" },
    };
    await renderDetail();
    await exportAs("CSV", "Export requests");
    expect(container.ownerDocument.querySelector("[role=status]")?.textContent).toContain("60,000");
  });

  it("says the session is gone on a 404", async () => {
    exportResponse = { status: 404, headers: {} };
    await renderDetail();
    await exportAs("CSV", "Export requests");
    expect(screen.getByRole("alert").textContent).toBe(messages.reports.exportSessionGone);
  });
});

describe("drill panel sessions", () => {
  it("opens the session detail from a recent session", async () => {
    await renderPage();
    await click(screen.getByRole("button", { name: "Open details for alice" }));
    expect(screen.queryByText("Session details")).toBeNull();

    const dialog = screen.getByRole("dialog");
    const details = [...dialog.querySelectorAll("button")].find((b) => b.textContent === "Details");
    expect(details).toBeTruthy();
    await click(details as HTMLElement);

    expect(lastUrl("/api/reports/sessions/as_1")).not.toBe("");
    expect(screen.getByText("Session details")).toBeTruthy();
    expect(screen.getByRole("button", { name: "Export requests" })).toBeTruthy();
  });
});
