// @vitest-environment jsdom
// Team Reports phase 0: the sessions list in its window-totals shape, the model filter, the
// "none" filter value, the tzOffset on every request and the truncated-export note.
import React, { act } from "react";
import { createRoot, type Root } from "react-dom/client";
import { fireEvent, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { NextIntlClientProvider } from "next-intl";

import messages from "../../../src/i18n/messages/en.json";
import ReportsPageClient from "../../../src/app/(dashboard)/dashboard/analytics/team-reports/ReportsPageClient";
import SessionsPanel from "../../../src/app/(dashboard)/dashboard/analytics/team-reports/components/SessionsPanel";
import { formatCost } from "../../../src/shared/utils/formatting";
import { formatDateTime } from "../../../src/app/(dashboard)/dashboard/analytics/team-reports/components/format";
import type { AgentSessionRecord } from "../../../src/lib/db/agentSessions";
import type {
  AgentSessionReport,
  AgentSessionReportRow,
  ReportBreakdownRow,
  SessionReportTotals,
} from "../../../src/lib/usage/agentSessionReports";
import { chooseKitSelectValue, kitSelectByLabel } from "../../helpers/kitSelect";

vi.mock("next/navigation", () => ({
  useRouter: () => ({ replace: () => {} }),
  usePathname: () => "/dashboard/analytics/team-reports",
  useSearchParams: () => new URLSearchParams(),
}));

(globalThis as { IS_REACT_ACT_ENVIRONMENT?: boolean }).IS_REACT_ACT_ENVIRONMENT = true;

const TOKENS = {
  input: 12_000,
  output: 3_000,
  cacheRead: 9_000,
  cacheCreation: 1_000,
  reasoning: 500,
  uncachedInput: 2_000,
  total: 15_000,
};

function breakdown(key: string, label: string | null = null): ReportBreakdownRow {
  return {
    key,
    label,
    detail: null,
    requests: 5,
    errors: 0,
    unpricedRequests: 0,
    costUsd: 1,
    tokens: TOKENS,
    sessions: 1,
    members: 1,
    projects: 1,
    lastSeenAt: "2026-09-25T10:00:00.000Z",
  };
}

const REPORT: AgentSessionReport = {
  totals: {
    requests: 5,
    errors: 0,
    unpricedRequests: 0,
    costUsd: 1,
    tokens: TOKENS,
    sessions: 1,
    members: 1,
    projects: 1,
    lastSeenAt: "2026-09-25T10:00:00.000Z",
  },
  breakdowns: {
    members: [breakdown("key-alice", "alice"), breakdown("")],
    projects: [breakdown("web-app"), breakdown("")],
    clients: [breakdown("claude-code"), breakdown("")],
    providers: [breakdown("anthropic"), breakdown("")],
    models: [breakdown("claude-sonnet"), breakdown("gpt-5")],
    accounts: [],
    daily: [],
  },
};

// Window totals differ from the all-time figures on purpose.
const ROW: AgentSessionReportRow = {
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
  firstSeenAt: "2026-09-01T09:00:00.000Z",
  lastSeenAt: "2026-09-30T10:00:00.000Z",
  requests: 7,
  errors: 2,
  unpricedRequests: 0,
  costUsd: 0.5,
  tokens: TOKENS,
  windowFirstSeenAt: "2026-09-25T09:00:00.000Z",
  windowLastSeenAt: "2026-09-25T10:00:00.000Z",
};

const ALL_TIME_TOTALS: SessionReportTotals = {
  requests: 40,
  errors: 3,
  unpricedRequests: 0,
  costUsd: 2.5,
  tokens: TOKENS,
};

const STORED_SESSION = {
  ...ROW,
  requestCount: 99,
  errorCount: 9,
  costUsd: 77,
  tokens: { ...TOKENS, input: 1, cacheRead: 0, cacheCreation: 0, uncachedInput: 1 },
  unpricedCount: 0,
  lastProvider: null,
  lastModel: null,
} as unknown as AgentSessionRecord;

const facet = (value: string, label: string | null = null) => ({ value, label, requests: 5 });
const FACETS = {
  members: [facet("key-alice", "alice"), facet("")],
  projects: [facet("web-app"), facet("")],
  clients: [facet("claude-code"), facet("")],
  providers: [facet("anthropic"), facet("")],
  models: [facet("claude-sonnet"), facet("gpt-5")],
  accounts: [],
  branches: [facet("main")],
  serviceTiers: [],
  errorCodes: [],
  teams: [],
};

const TZ_OFFSET = String(-new Date().getTimezoneOffset());

let container: HTMLDivElement;
let root: Root;
let urls: string[];
let exportHeaders: Record<string, string>;

beforeEach(() => {
  container = document.createElement("div");
  document.body.appendChild(container);
  root = createRoot(container);
  urls = [];
  exportHeaders = {};
  vi.stubGlobal(
    "fetch",
    vi.fn(async (url: string) => {
      urls.push(url);
      if (url.startsWith("/api/reports/export")) {
        return {
          ok: true,
          status: 200,
          headers: new Headers(exportHeaders),
          blob: async () => new Blob(["a,b"]),
        };
      }
      const body = url.startsWith("/api/reports/facets")
        ? FACETS
        : url.startsWith("/api/reports/summary")
          ? REPORT
          : url.startsWith(`/api/reports/sessions/${ROW.id}`)
            ? { session: STORED_SESSION, recentRequests: [], totals: ALL_TIME_TOTALS }
            : { sessions: [ROW], total: 1 };
      return { ok: true, status: 200, json: async () => body };
    })
  );
  Object.assign(URL, { createObjectURL: vi.fn(() => "blob:report"), revokeObjectURL: vi.fn() });
  vi.spyOn(HTMLAnchorElement.prototype, "click").mockImplementation(() => {});
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

function button(text: string, scope: ParentNode = document): HTMLButtonElement {
  const found = [...scope.querySelectorAll("button")].find((el) => el.textContent === text);
  if (!found) throw new Error(`no button "${text}"`);
  return found as HTMLButtonElement;
}

async function click(el: HTMLElement) {
  await act(async () => el.click());
  await flush();
}

const lastUrl = (prefix: string) => urls.filter((url) => url.startsWith(prefix)).at(-1) ?? "";
const paramsOf = (url: string) => new URL(url, "http://localhost").searchParams;

function rowByName(name: string): HTMLTableRowElement {
  const found = [...container.querySelectorAll("tbody tr")].find(
    (tr) => tr.querySelector("td")?.textContent === name
  );
  if (!found) throw new Error(`no row "${name}"`);
  return found as HTMLTableRowElement;
}

/** Opens a multi-select filter and ticks one option. */
async function pickOption(dimension: string, option: string) {
  await click(screen.getByRole("button", { name: `${dimension} filter` }));
  await act(async () => {
    fireEvent.click(screen.getByRole("checkbox", { name: option }));
  });
  await act(async () => {
    fireEvent.keyDown(document.activeElement ?? document.body, { key: "Escape" });
  });
  await flush();
}

async function optionNames(dimension: string): Promise<string[]> {
  await click(screen.getByRole("button", { name: `${dimension} filter` }));
  const names = screen
    .getAllByRole("checkbox")
    .map((box) => box.closest("label, div")?.textContent ?? "");
  await act(async () => {
    fireEvent.keyDown(document.activeElement ?? document.body, { key: "Escape" });
  });
  await flush();
  return names;
}

const panelProps = {
  query: "",
  refreshToken: 0,
  order: { sort: "lastSeen", desc: true } as const,
  onOrderChange: () => {},
};

describe("Team Reports sessions list (window totals)", () => {
  it("renders requests, errors, cost and the window's last activity", async () => {
    await render(<SessionsPanel {...panelProps} />);

    expect(container.textContent).toContain(messages.reports.sessionsWindowHintV2);
    const headers = [...container.querySelectorAll("thead th")].map((th) => th.textContent);
    const cells = [...container.querySelectorAll("tbody tr td")];
    const at = (header: string) => cells[headers.indexOf(header)] as HTMLElement;
    expect(at("Requests").textContent).toBe("7(2 Errors)");
    expect(at("Cost").textContent).toBe(formatCost(0.5));
    expect(at("Last active").textContent).toBe(formatDateTime(ROW.windowLastSeenAt));
    expect(at("Last active").textContent).not.toBe(formatDateTime(ROW.lastSeenAt));
  });

  it("detail modal shows the all-time totals and labels the dates all-time", async () => {
    await render(<SessionsPanel {...panelProps} />);
    await click(button("Details"));

    const terms = new Map<string, string>();
    for (const dt of document.body.querySelectorAll("dt")) {
      terms.set(dt.textContent ?? "", dt.nextElementSibling?.textContent ?? "");
    }
    expect(terms.get("Requests")).toBe("40 (3 Errors)");
    expect(terms.get("Cost")).toBe(formatCost(2.5));
    expect(terms.get("First seen (all time)")).toBe(formatDateTime(ROW.firstSeenAt));
    expect(terms.get("Last seen (all time)")).toBe(formatDateTime(ROW.lastSeenAt));
  });
});

describe("Team Reports filters", () => {
  it("filters by model from the dropdown and from a models row", async () => {
    await render(<ReportsPageClient />);

    expect(await optionNames("Model")).toEqual(["All", "claude-sonnet", "gpt-5"]);

    await pickOption("Model", "claude-sonnet");
    expect(paramsOf(lastUrl("/api/reports/summary")).getAll("model")).toEqual(["claude-sonnet"]);

    await click(button("Clear all"));
    expect(paramsOf(lastUrl("/api/reports/summary")).has("model")).toBe(false);

    await click(button("Models"));
    await click(button("Filter", rowByName("gpt-5")));
    expect(paramsOf(lastUrl("/api/reports/summary")).getAll("model")).toEqual(["gpt-5"]);
  });

  it('offers a "none" entry for member, project and client only', async () => {
    await render(<ReportsPageClient />);

    expect(await optionNames("Member")).toContain("No member");
    expect(await optionNames("Project")).toContain("No project");
    expect(await optionNames("Client")).toContain("No client");
    expect(await optionNames("Provider")).not.toContain("No provider");

    await pickOption("Project", "No project");
    expect(paramsOf(lastUrl("/api/reports/summary")).getAll("projectName")).toEqual(["__none__"]);
  });

  it('filters by "__none__" when the empty-key row is clicked', async () => {
    await render(<ReportsPageClient />);

    await click(button("Filter", rowByName("Unknown key")));
    expect(paramsOf(lastUrl("/api/reports/summary")).getAll("apiKeyId")).toEqual(["__none__"]);

    await click(button("Clear all"));
    await click(button("Providers"));
    // Providers have no "none" filter, so the empty-key row has no filter action.
    expect(rowByName("unknown").querySelector("button")).toBeNull();
  });
});

describe("Team Reports requests", () => {
  it("send tzOffset on summary, sessions and export requests", async () => {
    await render(<ReportsPageClient />);
    await click(button("Sessions"));
    await click(button("Export CSV"));

    for (const prefix of ["/api/reports/summary", "/api/reports/sessions", "/api/reports/export"]) {
      const matching = urls.filter((url) => url.startsWith(prefix));
      expect(matching.length).toBeGreaterThan(0);
      for (const url of matching) expect(paramsOf(url).get("tzOffset")).toBe(TZ_OFFSET);
    }
  });
});

describe("Team Reports sessions export", () => {
  it("passes the list order and shows a note when the CSV was truncated", async () => {
    exportHeaders = { "X-Report-Total": "12345", "X-Report-Truncated": "true" };
    await render(<ReportsPageClient />);
    await click(button("Sessions"));
    chooseKitSelectValue(kitSelectByLabel("Sort by"), "cost");
    await flush();
    await click(button("Descending"));
    await click(button("Export CSV"));

    const params = paramsOf(lastUrl("/api/reports/export"));
    expect(params.get("type")).toBe("sessions");
    expect(params.get("sort")).toBe("cost");
    expect(params.get("order")).toBe("asc");
    const note = container.querySelector("[role=status]");
    expect(note?.textContent).toContain(new Intl.NumberFormat("en").format(12_345));
    expect(note?.textContent).toContain("Exported only the first rows");
  });

  it("shows no note when the export is complete", async () => {
    exportHeaders = { "X-Report-Total": "3", "X-Report-Truncated": "false" };
    await render(<ReportsPageClient />);
    await click(button("Sessions"));
    await click(button("Export CSV"));

    expect(lastUrl("/api/reports/export")).not.toBe("");
    expect(container.querySelector("[role=status]")).toBeNull();
  });
});
