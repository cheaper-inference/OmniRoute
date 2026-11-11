// @vitest-environment jsdom
// Team Reports phase 1: repeated filter params, the page URL round trip, removable filter chips
// labelled from the facets endpoint, the debounced search and the facets request.
import React, { act } from "react";
import { createRoot, type Root } from "react-dom/client";
import { fireEvent, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { NextIntlClientProvider } from "next-intl";

import messages from "../../../src/i18n/messages/en.json";
import ReportsPageClient from "../../../src/app/(dashboard)/dashboard/analytics/team-reports/ReportsPageClient";
import { SEARCH_DEBOUNCE_MS } from "../../../src/app/(dashboard)/dashboard/analytics/team-reports/components/ReportFilters";
import {
  emptyFilters,
  parseReportView,
  serializeReportView,
  toReportQuery,
} from "../../../src/app/(dashboard)/dashboard/analytics/team-reports/reportFilters";

const nav = vi.hoisted(() => ({ search: "", replace: vi.fn() }));
vi.mock("next/navigation", () => ({
  useRouter: () => ({ replace: nav.replace }),
  usePathname: () => "/dashboard/analytics/team-reports",
  useSearchParams: () => new URLSearchParams(nav.search),
}));

(globalThis as { IS_REACT_ACT_ENVIRONMENT?: boolean }).IS_REACT_ACT_ENVIRONMENT = true;

const paramsOf = (url: string) => new URL(url, "http://localhost").searchParams;

describe("toReportQuery", () => {
  it("repeats multi-value params, keeping commas and __none__ intact", () => {
    const filters = emptyFilters("all");
    filters.projectName = ["web, app", "__none__"];
    filters.model = ["a", "b"];
    filters.outcome = "error";
    filters.search = "  needle ";
    const query = toReportQuery(filters);

    expect(query.getAll("projectName")).toEqual(["web, app", "__none__"]);
    expect(query.getAll("model")).toEqual(["a", "b"]);
    expect(query.get("outcome")).toBe("error");
    expect(query.get("search")).toBe("needle");
    expect(query.get("tzOffset")).toBe(String(-new Date().getTimezoneOffset()));
    // Two repeated params, never one comma-joined value.
    expect(query.toString()).toContain("projectName=web%2C+app&projectName=__none__");
    expect(query.get("model")).not.toContain(",");
  });

  it("sends no param for empty filters", () => {
    const query = toReportQuery(emptyFilters("all"));
    expect([...query.keys()]).toEqual(["tzOffset"]);
  });

  it("caps one filter at 50 values", () => {
    const filters = emptyFilters("all");
    filters.client = Array.from({ length: 80 }, (_, i) => `c${i}`);
    expect(toReportQuery(filters).getAll("client")).toHaveLength(50);
  });
});

describe("report URL state", () => {
  const CANONICAL =
    "from=2026-09-01T08%3A00%3A00.000Z&to=2026-09-30T08%3A00%3A00.000Z" +
    "&apiKeyId=key-alice&apiKeyId=__none__&projectName=web%2C+app&model=a&model=b" +
    "&outcome=success&search=needle&tab=sessions&sort=cost&order=asc";

  it("round-trips a full view: parse, state, serialize", () => {
    const view = parseReportView(new URLSearchParams(CANONICAL));

    expect(view.preset).toBe("custom");
    expect(view.filters.apiKeyId).toEqual(["key-alice", "__none__"]);
    expect(view.filters.projectName).toEqual(["web, app"]);
    expect(view.filters.model).toEqual(["a", "b"]);
    expect(view.filters.outcome).toBe("success");
    expect(view.filters.search).toBe("needle");
    expect(view.tab).toBe("sessions");
    expect(view.sessionOrder).toEqual({ sort: "cost", desc: false });

    expect(serializeReportView(view).toString()).toBe(CANONICAL);
  });

  it("keeps a preset relative and leaves defaults out of the URL", () => {
    const view = parseReportView(new URLSearchParams("range=30d&gitBranch=main"));
    expect(view.preset).toBe("30d");
    expect(serializeReportView(view).toString()).toBe("range=30d&gitBranch=main");
    expect(serializeReportView(parseReportView(new URLSearchParams())).toString()).toBe("");
  });

  it("ignores invalid values and drops duplicates", () => {
    const view = parseReportView(
      new URLSearchParams("range=bogus&outcome=maybe&tab=nope&sort=x&model=a&model=a&model=")
    );
    expect(view.preset).toBe("7d");
    expect(view.filters.outcome).toBe("");
    expect(view.filters.model).toEqual(["a"]);
    expect(view.tab).toBe("members");
    expect(view.sessionOrder).toEqual({ sort: "lastSeen", desc: true });
  });
});

const REPORT = {
  totals: {
    requests: 1,
    errors: 0,
    unpricedRequests: 0,
    costUsd: 0,
    tokens: {
      input: 0,
      output: 0,
      cacheRead: 0,
      cacheCreation: 0,
      reasoning: 0,
      uncachedInput: 0,
      total: 0,
    },
    sessions: 1,
    members: 1,
    projects: 1,
    lastSeenAt: null,
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

const facet = (value: string, label: string | null = null) => ({ value, label, requests: 3 });
const FACETS = {
  members: [facet("key-alice", "alice"), facet("key-bob", "bob")],
  projects: [facet("web-app")],
  clients: [],
  providers: [],
  models: [facet("a"), facet("b")],
  accounts: [facet("conn-1", "Work account")],
  branches: [],
  serviceTiers: [],
  errorCodes: [],
  teams: [facet("team-1", "Platform")],
};

let container: HTMLDivElement;
let root: Root;
let urls: string[];

beforeEach(() => {
  container = document.createElement("div");
  document.body.appendChild(container);
  root = createRoot(container);
  urls = [];
  nav.search = "";
  nav.replace.mockClear();
  vi.stubGlobal(
    "fetch",
    vi.fn(async (url: string) => {
      urls.push(url);
      if (url.startsWith("/api/reports/export")) {
        return {
          ok: true,
          status: 200,
          headers: new Headers(),
          blob: async () => new Blob(["a,b"]),
        };
      }
      const body = url.startsWith("/api/reports/facets")
        ? FACETS
        : url.startsWith("/api/reports/summary")
          ? REPORT
          : { sessions: [], total: 0 };
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

const urlsFor = (prefix: string) => urls.filter((url) => url.startsWith(prefix));
async function exportAs(format: "CSV" | "JSON" = "CSV", trigger = "Export") {
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

const lastUrl = (prefix: string) => urlsFor(prefix).at(-1) ?? "";
const chipTexts = () =>
  [...container.querySelectorAll("[data-slot=scope-chip]")].map((chip) => chip.textContent);
const removeButton = (name: string) =>
  screen.getByRole("button", { name: `Remove filter ${name}` });

describe("Team Reports filters from the URL", () => {
  it("restores filters from the query, sends them as repeated params and labels the chips", async () => {
    await renderPage(
      "apiKeyId=key-alice&apiKeyId=__none__&model=a&model=b&connectionId=conn-1&outcome=error&search=needle"
    );

    const summary = paramsOf(lastUrl("/api/reports/summary"));
    expect(summary.getAll("apiKeyId")).toEqual(["key-alice", "__none__"]);
    expect(summary.getAll("model")).toEqual(["a", "b"]);
    expect(summary.get("outcome")).toBe("error");
    expect(summary.get("search")).toBe("needle");

    // Facet labels, not raw ids; "__none__" reads as the none entry.
    expect(chipTexts()).toEqual([
      "Member: alice",
      "Member: No member",
      "Model: a",
      "Model: b",
      "Account: Work account",
      "Outcome: Error",
      "Search: needle",
    ]);
  });

  it("loads dropdown values from the facets endpoint with the same filters", async () => {
    await renderPage("model=a&model=b");

    const facets = paramsOf(lastUrl("/api/reports/facets"));
    expect(facets.getAll("model")).toEqual(["a", "b"]);
    // No second, window-only summary request any more.
    for (const url of urlsFor("/api/reports/summary")) {
      expect(paramsOf(url).getAll("model")).toEqual(["a", "b"]);
    }
  });

  it("falls back to the raw value when the facets do not list it", async () => {
    await renderPage("gitBranch=feature%2Fx");
    expect(chipTexts()).toEqual(["Branch: feature/x"]);
  });

  it("removes one value at a time from its chip, and everything with Clear all", async () => {
    await renderPage("model=a&model=b&outcome=error");

    await click(removeButton("Model: a"));
    expect(chipTexts()).toEqual(["Model: b", "Outcome: Error"]);
    expect(paramsOf(lastUrl("/api/reports/summary")).getAll("model")).toEqual(["b"]);

    await click(screen.getByRole("button", { name: "Clear all" }));
    expect(chipTexts()).toEqual([]);
    expect(paramsOf(lastUrl("/api/reports/summary")).has("model")).toBe(false);
    expect(paramsOf(lastUrl("/api/reports/summary")).has("outcome")).toBe(false);
  });

  it("keeps the export on the same repeated params", async () => {
    await renderPage("projectName=web%2C+app&projectName=__none__");
    await exportAs();

    expect(paramsOf(lastUrl("/api/reports/export")).getAll("projectName")).toEqual([
      "web, app",
      "__none__",
    ]);
  });
});

describe("Team Reports URL updates", () => {
  it("does not touch the URL on load when it is already canonical", async () => {
    await renderPage("model=a&tab=sessions");
    expect(nav.replace).not.toHaveBeenCalled();
  });

  it("replaces the URL (no history entry) when the view changes", async () => {
    await renderPage("model=a");
    const tab = [...container.querySelectorAll("button")].find(
      (el) => el.textContent === "Sessions"
    );
    await click(tab as HTMLButtonElement);

    expect(nav.replace).toHaveBeenLastCalledWith(
      "/dashboard/analytics/team-reports?model=a&tab=sessions",
      { scroll: false }
    );
    await click(removeButton("Model: a"));
    expect(nav.replace).toHaveBeenLastCalledWith("/dashboard/analytics/team-reports?tab=sessions", {
      scroll: false,
    });
  });
});

describe("Team Reports search", () => {
  it("sends the search text only after typing pauses", async () => {
    await renderPage();
    const input = screen.getByRole("searchbox", { name: "Search" });

    fireEvent.change(input, { target: { value: "needle" } });
    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, SEARCH_DEBOUNCE_MS / 3));
    });
    expect(paramsOf(lastUrl("/api/reports/summary")).has("search")).toBe(false);

    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, SEARCH_DEBOUNCE_MS + 100));
    });
    await flush();
    expect(paramsOf(lastUrl("/api/reports/summary")).get("search")).toBe("needle");
    expect(nav.replace).toHaveBeenLastCalledWith(
      "/dashboard/analytics/team-reports?search=needle",
      { scroll: false }
    );
  });
});
