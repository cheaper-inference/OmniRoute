import React from "react";
import "@testing-library/jest-dom/vitest";
import { afterEach, expect, it, vi } from "vitest";
import { act, cleanup, fireEvent, render, screen, waitFor } from "@testing-library/react";
import { NextIntlClientProvider } from "next-intl";
import en from "../../src/i18n/messages/en.json";
import zh from "../../src/i18n/messages/zh-CN.json";
import ProviderLimits from "@/app/(dashboard)/dashboard/usage/components/ProviderLimits";

vi.unmock("next-intl");
// Only the detail renderer is replaced. The real container, projection, filters,
// layout switcher and read-only summary hook all execute together.
vi.mock("@/app/(dashboard)/dashboard/usage/components/ProviderLimits/QuotaCard", () => ({
  default: ({ connection }: { connection: { email: string } }) => (
    <div data-testid="detail-card">{connection.email}</div>
  ),
}));
afterEach(() => {
  cleanup();
  vi.useRealTimers();
  localStorage.clear();
  vi.unstubAllGlobals();
  vi.restoreAllMocks();
});

function fixture(failCooldowns = false, malformed = false) {
  const fetchedAt = new Date().toISOString();
  const connections = ["available", "blocked", "restricted", "paused", "unknown"].map((id) => ({
    id,
    provider: "claude",
    email: `${id}@example.test`,
    authType: "oauth",
    isActive: id !== "paused",
  }));
  const caches = Object.fromEntries(
    connections.map((c) => [
      c.id,
      {
        fetchedAt,
        quotas: {
          "session (5h)":
            c.id === "unknown"
              ? { used: 0, total: 0 }
              : { remainingPercentage: 10, total: 100, used: 90 },
          "weekly (7d)":
            c.id === "unknown"
              ? { used: 0, total: 0 }
              : {
                  remainingPercentage: c.id === "blocked" ? 0 : 80,
                  total: 100,
                  used: c.id === "blocked" ? 100 : 20,
                },
        },
      },
    ])
  );
  const rows = connections.map((c) => ({
    id: c.id,
    status: "healthy",
    testStatus: "active",
    rateLimitedUntil: null,
    cooldownRemainingMs: 0,
    lockouts:
      c.id === "restricted"
        ? [{ model: "synthetic-model", reason: "rate_limit", remainingMs: 60_000 }]
        : [],
  }));
  const requests: string[] = [];
  const fetchMock = vi.fn(async (input: string | URL | Request, init?: RequestInit) => {
    const url = String(input);
    requests.push(url);
    // All data is handwritten. Any unexpected request fails rather than falling
    // through to a real network, paid probe, login session or local server.
    expect(init?.method || "GET").toBe("GET");
    if (url === "/api/providers/client") return Response.json({ connections });
    if (url === "/api/usage/provider-limits") return Response.json({ caches });
    if (url === "/api/settings")
      return Response.json({ quotaVisibility: { claude: { hidden: ["weekly (7d)"] } } });
    if (url.startsWith("/api/provider-models?")) return Response.json({ models: [] });
    if (url === "/api/usage/availability")
      return Response.json({
        generatedAt: fetchedAt,
        connections: connections.map((c) => ({
          id: c.id,
          scopes: [],
          account: {
            usable: c.id === "unknown" ? null : c.id !== "blocked",
            blockers:
              c.id === "blocked"
                ? [
                    {
                      name: "weekly (7d)",
                      kind: "overall",
                      remainingPercent: 0,
                      cutoffPercent: 0,
                      resetAt: null,
                    },
                  ]
                : [],
            allowanceReasons: [],
            fetchedAt,
          },
        })),
      });
    if (url === "/api/resilience/cooldowns") {
      if (failCooldowns) throw new Error("synthetic read failure");
      return Response.json({
        connections: malformed ? [{ id: "available", status: "healthy" }] : rows,
        generatedAt: new Date().toISOString(),
      });
    }
    throw new Error(`Unexpected request: ${url}`);
  });
  vi.stubGlobal("fetch", fetchMock);
  return requests;
}
function mount(locale: string) {
  const m = locale === "en" ? en : zh;
  render(
    <NextIntlClientProvider
      locale={locale}
      messages={{ usage: m.usage, common: m.common }}
      timeZone="UTC"
      onError={(error) => {
        throw error;
      }}
    >
      <ProviderLimits />
    </NextIntlClientProvider>
  );
  return m;
}

it("renders the real page when browser storage is disabled", async () => {
  fixture();
  vi.spyOn(Storage.prototype, "getItem").mockImplementation(() => {
    throw Error("blocked");
  });
  vi.spyOn(Storage.prototype, "setItem").mockImplementation(() => {
    throw Error("blocked");
  });
  mount("en");
  await waitFor(() => expect(document.querySelectorAll("[data-availability]")).toHaveLength(5));
  expect(document.querySelector("[data-drag-handle]")).toBeTruthy();
});
it.each(["en", "zh-CN"])(
  "top counters, filter, blocks and full/compact layouts share one availability projection (%s)",
  async (locale) => {
    const requests = fixture();
    const m = mount(locale);
    const stat = (kind: string) =>
      document.querySelector<HTMLButtonElement>(`[data-stat="${kind}"]`)!;
    await waitFor(() => expect(document.querySelectorAll("[data-availability]")).toHaveLength(5));
    const tiles = document.querySelectorAll("[data-stat]");
    expect(tiles).toHaveLength(7);
    for (const tile of tiles) expect(tile).toHaveClass("ci-button", "rounded-lg");
    const counters = () =>
      ["all", "ok", "cd5", "cdw", "act", "paused", "empty"].map((kind) => stat(kind).textContent);
    await waitFor(() => expect(stat("ok").querySelector(".text-2xl")).toHaveTextContent("2"));
    await waitFor(() =>
      expect(stat("ok")).toHaveTextContent(locale === "en" ? "Includes 1" : "含 1")
    );
    expect(stat("cdw").querySelector(".text-2xl")).toHaveTextContent("1");
    const before = counters();
    for (const status of ["ok", "critical", "alert", "paused", "empty"])
      expect(document.querySelectorAll(`[data-availability="${status}"]`)).toHaveLength(1);
    // A hidden exhausted weekly window still blocks the account.
    expect(
      document.querySelector('[data-availability="critical"]')?.getAttribute("aria-label")
    ).toContain(m.usage.healthQuotaExhausted);
    fireEvent.click(screen.getByRole("button", { name: m.usage.layoutFull }));
    expect(screen.getAllByTestId("detail-card")).toHaveLength(5);
    expect(counters()).toEqual(before);
    fireEvent.click(screen.getByRole("button", { name: m.usage.layoutCompact }));
    expect(screen.getAllByTestId("detail-card")).toHaveLength(5);
    expect(counters()).toEqual(before);
    fireEvent.click(screen.getByRole("button", { name: m.usage.healthOverview }));
    expect(counters()).toEqual(before);
    fireEvent.click(stat("ok"));
    expect(document.querySelectorAll("[data-availability]")).toHaveLength(2);
    expect(document.querySelector("[data-availability]")).toHaveAttribute(
      "data-availability",
      "ok"
    );
    expect(counters()).toEqual(before);
    expect(
      requests.every(
        (url) => !url.startsWith("/api/usage/available") && !url.startsWith("/api/usage/unknown")
      )
    ).toBe(true);
    expect(requests.filter((url) => url === "/api/resilience/cooldowns")).toHaveLength(1);
  }
);

it("five-minute cache rereads use exactly the two cache GETs; hidden pages do not read", async () => {
  vi.useFakeTimers();
  vi.spyOn(document, "visibilityState", "get").mockReturnValue("visible");
  const requests = fixture();
  mount("en");
  await act(async () => {
    await vi.advanceTimersByTimeAsync(0);
  });
  expect(document.querySelectorAll("[data-availability]")).toHaveLength(5);
  requests.length = 0;
  await act(async () => {
    await vi.advanceTimersByTimeAsync(299_000);
  });
  expect(
    requests.filter(
      (url) => !["/api/resilience/cooldowns", "/api/usage/availability"].includes(url)
    )
  ).toEqual([]);
  requests.length = 0;
  await act(async () => {
    await vi.advanceTimersByTimeAsync(1000);
  });
  expect(
    requests.filter(
      (url) => !["/api/resilience/cooldowns", "/api/usage/availability"].includes(url)
    )
  ).toEqual(["/api/providers/client", "/api/usage/provider-limits"]);
  vi.spyOn(document, "visibilityState", "get").mockReturnValue("hidden");
  requests.length = 0;
  await act(async () => {
    await vi.advanceTimersByTimeAsync(300_000);
  });
  expect(requests).toEqual([]);
});

it.each([false, true])(
  "failed or malformed cooldown summary visibly degrades instead of defaulting green (malformed=%s)",
  async (malformed) => {
    fixture(!malformed, malformed);
    const m = mount("en");
    await waitFor(() => expect(document.querySelectorAll("[data-availability]")).toHaveLength(5));
    await waitFor(() => expect(document.querySelector('[data-availability="ok"]')).toBeTruthy());
    expect(screen.getByRole("note")).toHaveTextContent(m.usage.healthSummaryFailed);
    expect(document.querySelector('[data-stat="ok"] .text-2xl')).toHaveTextContent("2");
  }
);
