/**
 * "My spend" on the self-service quota page: the key's own usage, requested with the same key once
 * the quota answer accepted it, and failing on its own without touching the quota part.
 */
import React from "react";
import { cleanup, fireEvent, screen, waitFor, within } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import SpendDailyChart from "@/app/quota/[provider]/components/SpendDailyChart";
import {
  KEY,
  callsTo,
  jsonResponse,
  quotaView,
  renderQuota,
  stubFetch,
  usageDay,
  usageSeries,
  type FetchCall,
  type FetchRoute,
} from "./quotaSelfHarness";

// The shared UI setup mocks next-intl without `useFormatter`; this page runs on the real one.
vi.mock("next-intl", async (importOriginal) => await importOriginal());

type ClientComponent = (props: { provider: string; providerName: string }) => React.ReactElement;

const QUOTA = "/api/v1/me/quota/";
const USAGE = "/api/v1/me/usage";
let QuotaSelfClient: ClientComponent;

// The key store is a module singleton: a fresh module per page starts with nothing held.
async function freshPage() {
  vi.resetModules();
  QuotaSelfClient = (await import("@/app/quota/[provider]/QuotaSelfClient")).default;
}

beforeEach(freshPage);

/** A second page in the same test: nothing left from the first one. */
async function restart() {
  cleanup();
  window.sessionStorage.clear();
  vi.unstubAllGlobals();
  await freshPage();
}

afterEach(() => {
  cleanup();
  window.sessionStorage.clear();
  window.localStorage.clear();
  vi.unstubAllGlobals();
  vi.restoreAllMocks();
});

const quotaOk: FetchRoute = () => jsonResponse(quotaView());

/** Renders the page, submits the key, and returns the recorded calls. */
function renderWithKey(routes: Record<string, FetchRoute>): FetchCall[] {
  const calls = stubFetch(routes);
  renderQuota(<QuotaSelfClient provider="claude" providerName="Claude Code" />);
  fireEvent.change(screen.getByLabelText("API key"), { target: { value: KEY } });
  fireEvent.click(screen.getByRole("button", { name: "Show my quota" }));
  return calls;
}

const spendRegion = () => screen.findByRole("region", { name: "My spend" });

describe("my spend", () => {
  it("usage is requested with the same header once the key is accepted", async () => {
    let answerQuota: (response: Response) => void = () => {};
    const calls = renderWithKey({
      [QUOTA]: () => new Promise<Response>((resolve) => (answerQuota = resolve)),
      [USAGE]: () => jsonResponse(usageSeries()),
    });
    await waitFor(() => expect(callsTo(calls, QUOTA)).toHaveLength(1));
    expect(callsTo(calls, USAGE)).toHaveLength(0);

    answerQuota(jsonResponse(quotaView()));
    await screen.findByText("Pool A");
    await waitFor(() => expect(callsTo(calls, USAGE)).toHaveLength(1));
    const [usage] = callsTo(calls, USAGE);
    expect(usage.url).toBe("/api/v1/me/usage?range=30d");
    expect(usage.headers.get("Authorization")).toBe(`Bearer ${KEY}`);
  });

  for (const status of [401, 403]) {
    it(`no usage is requested when the quota answers ${status}`, async () => {
      const calls = renderWithKey({
        [QUOTA]: () => jsonResponse({ error: "refused" }, status),
        [USAGE]: () => jsonResponse(usageSeries()),
      });
      await screen.findByText(
        status === 401 ? "This key was not accepted" : "This key cannot view its quota"
      );
      expect(callsTo(calls, USAGE)).toHaveLength(0);
      expect(screen.queryByText("My spend")).toBeNull();
    });
  }

  it("totals are shown with billed cost next to list price", async () => {
    renderWithKey({ [QUOTA]: quotaOk, [USAGE]: () => jsonResponse(usageSeries()) });
    const region = await spendRegion();
    await within(region).findByText("Billed cost");
    for (const label of ["Requests", "Tokens", "List price"]) {
      expect(within(region).getAllByText(label).length).toBeGreaterThan(0);
    }
    for (const value of ["4", "$3.00", "$6.00"]) {
      expect(within(region).getAllByText(value).length).toBeGreaterThan(0);
    }
    // The series age, from the usage answer's own generatedAt.
    expect(within(region).getByText(/^Updated at /)).toBeTruthy();
  });

  it("the period is a radio group that refetches", async () => {
    const calls = renderWithKey({ [QUOTA]: quotaOk, [USAGE]: () => jsonResponse(usageSeries()) });
    const group = await screen.findByRole("radiogroup", { name: "Period" });
    const options = within(group)
      .getAllByRole("radio")
      .map((radio) => radio.textContent);
    expect(options).toEqual(["24 hours", "7 days", "30 days", "90 days"]);

    fireEvent.click(within(group).getByRole("radio", { name: "7 days" }));
    await waitFor(() => expect(callsTo(calls, `${USAGE}?range=7d`)).toHaveLength(1));
  });

  it("models are listed in a named table", async () => {
    renderWithKey({ [QUOTA]: quotaOk, [USAGE]: () => jsonResponse(usageSeries()) });
    const table = await screen.findByRole("table", { name: "Usage by model" });
    // A table cell ignores `break-words`: on a phone the id must break anywhere to fit.
    expect(within(table).getByText("claude-sonnet-5").className).toContain("wrap-anywhere");
    // Numbers stay on one line, right-aligned, under right-aligned headers.
    const [requestsHead] = within(table).getAllByRole("columnheader").slice(1);
    expect(requestsHead.className).toContain("text-right");
    expect(within(table).getByText("$6.00").className).toContain("tabular-nums");
  });

  it("a cut per-model list says its totals may be partial", async () => {
    const notice =
      "This list holds the 50 most used provider and model pairs, so a model's totals may be partial.";
    renderWithKey({ [QUOTA]: quotaOk, [USAGE]: () => jsonResponse(usageSeries()) });
    await screen.findByRole("table", { name: "Usage by model" });
    expect(screen.queryByText(notice)).toBeNull();
    await restart();

    renderWithKey({
      [QUOTA]: quotaOk,
      [USAGE]: () => jsonResponse(usageSeries({ byModelTruncated: true })),
    });
    await screen.findByRole("table", { name: "Usage by model" });
    expect(screen.getByText(notice)).toBeTruthy();
  });

  it("the daily chart has a text alternative", async () => {
    renderWithKey({ [QUOTA]: quotaOk, [USAGE]: () => jsonResponse(usageSeries()) });
    expect(
      await screen.findByLabelText("Tokens used per day over the selected period")
    ).toBeTruthy();
    await restart();

    renderWithKey({
      [QUOTA]: quotaOk,
      [USAGE]: () => jsonResponse(usageSeries({ daily: [usageDay()] })),
    });
    await within(await spendRegion()).findByText("Billed cost");
    expect(screen.queryByLabelText("Tokens used per day over the selected period")).toBeNull();
  });

  it("a usage day keeps its calendar date in a time zone west of UTC", () => {
    renderQuota(
      <SpendDailyChart
        daily={[usageDay({ date: "2026-11-19" }), usageDay({ date: "2026-11-20" })]}
      />,
      "America/Los_Angeles"
    );
    expect(screen.getAllByText("Nov 20").length).toBeGreaterThan(0);
    expect(screen.queryByText("Nov 18")).toBeNull();
  });

  it("no usage, truncated history and failure each say so", async () => {
    const empty = usageSeries();
    renderWithKey({
      [QUOTA]: quotaOk,
      [USAGE]: () =>
        jsonResponse({ ...empty, summary: { ...empty.summary, requests: 0 }, byModel: [] }),
    });
    expect((await screen.findByText("No usage in this period.")).getAttribute("role")).toBe(
      "status"
    );
    await restart();

    const truncated = usageSeries();
    renderWithKey({
      [QUOTA]: quotaOk,
      [USAGE]: () =>
        jsonResponse({
          ...truncated,
          coverage: { ...truncated.coverage, retentionDays: 30, truncatedByRetention: true },
        }),
    });
    expect(
      await screen.findByText(
        "Only the last 30 days of detailed usage are kept, so this period is incomplete."
      )
    ).toBeTruthy();
    await restart();

    const calls = renderWithKey({
      [QUOTA]: quotaOk,
      [USAGE]: () => jsonResponse({ error: "boom" }, 500),
    });
    const failed = await screen.findByText("Your usage could not be loaded.");
    // A live region: a period change that fails is announced.
    expect(failed.getAttribute("role")).toBe("status");
    expect(screen.getByText("Pool A")).toBeTruthy();
    fireEvent.click(screen.getByRole("button", { name: "Try again" }));
    await waitFor(() => expect(callsTo(calls, USAGE)).toHaveLength(2));
    expect(callsTo(calls, QUOTA)).toHaveLength(1);
  });

  it("an answer outside the usage contract is a failure", async () => {
    renderWithKey({ [QUOTA]: quotaOk, [USAGE]: () => jsonResponse({ summary: null }) });
    expect(await screen.findByText("Your usage could not be loaded.")).toBeTruthy();
    expect(screen.getByText("Pool A")).toBeTruthy();
  });
});
