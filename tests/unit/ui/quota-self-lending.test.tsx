// @vitest-environment jsdom
/**
 * The lending card of the public self-service quota page, through the real page: what it says
 * about the holder's own consent, what one save sends, and the withdrawal a pool that does not
 * lend by consent still offers.
 */
import React from "react";
import { act, cleanup, fireEvent, screen, waitFor } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import {
  selfLendingPatchSchema,
  type SelfQuotaPool,
  type SelfQuotaResponse,
} from "@/shared/schemas/selfQuota";
import {
  KEY,
  LENDING_REF,
  callsTo,
  jsonResponse,
  pool,
  quotaView,
  renderQuota,
  sharedDim,
  stubFetch,
  type FetchCall,
} from "./quotaSelfHarness";

// The shared UI setup mocks next-intl without `useFormatter`; this page runs on the real one,
// inside the provider `renderQuota` mounts.
vi.mock("next-intl", async (importOriginal) => await importOriginal());

type ClientComponent = (props: { provider: string; providerName: string }) => React.ReactElement;

const QUOTA = "/api/v1/me/quota/";
let QuotaSelfClient: ClientComponent;

// The key store is a module singleton: a fresh module per test starts with nothing held.
beforeEach(async () => {
  vi.resetModules();
  QuotaSelfClient = (await import("@/app/quota/[provider]/QuotaSelfClient")).default;
});

afterEach(() => {
  cleanup();
  window.sessionStorage.clear();
  window.localStorage.clear();
  vi.unstubAllGlobals();
  vi.restoreAllMocks();
});

function renderPage(timeZone = "UTC") {
  return renderQuota(<QuotaSelfClient provider="claude" providerName="Claude Code" />, timeZone);
}

function enterKey(value: string) {
  fireEvent.change(screen.getByLabelText("API key"), { target: { value } });
  fireEvent.click(screen.getByRole("button", { name: "Show my quota" }));
}

function storedValues(storage: Storage): string[] {
  return Object.keys(storage).map((name) => storage.getItem(name) ?? "");
}

const NOW = Date.parse("2026-05-27T15:30:00.000Z");
const UNTIL = Date.parse("2026-06-01T12:00:00.000Z");
const PERCENT = "Percentage of your idle share to lend";
const consent = (over: Partial<SelfQuotaPool> = {}) =>
  quotaView({ pools: [pool({ ref: LENDING_REF, borrowMode: "consent", ...over })] });
type Patch = (call: FetchCall) => Response | Promise<Response>;
/** GET answers the current view. PATCH answers what the test gives. */
function serve(view: () => SelfQuotaResponse, patch: Patch = () => jsonResponse(view())) {
  return stubFetch({
    [QUOTA]: (call) => (call.method === "PATCH" ? patch(call) : jsonResponse(view())),
  });
}
async function openCard(timeZone?: string) {
  renderPage(timeZone);
  enterKey(KEY);
  await screen.findByRole("heading", { name: "Lend your idle share" });
}
const percentField = () => screen.getByLabelText(PERCENT) as HTMLInputElement;
const deadlineField = () => screen.getByLabelText("Lend until") as HTMLSelectElement;
const saveButton = () => screen.getByRole("button", { name: "Save" }) as HTMLButtonElement;
const setPercent = (value: string) => fireEvent.change(percentField(), { target: { value } });
const setDeadline = (value: string) => fireEvent.change(deadlineField(), { target: { value } });
const patches = (calls: FetchCall[]) => callsTo(calls, QUOTA, "PATCH");

describe("self-service quota page lending card", () => {
  it("a saturation pool shows no lending card", async () => {
    serve(() => quotaView());
    renderPage();
    enterKey(KEY);
    await screen.findByRole("heading", { name: "Pool A" });
    expect(screen.queryByRole("heading", { name: "Lend your idle share" })).toBeNull();
  });

  it("a consent pool shows the holder's own consent and nothing to save", async () => {
    serve(() => consent({ lendingPercent: 30, lendingActive: true }));
    await openCard();
    expect(
      screen.getByText("You are lending 30% of your idle share until you turn it off.")
    ).toBeTruthy();
    expect(percentField().value).toBe("30");
    expect(Array.from(deadlineField().options).map((o) => o.value)).toEqual([
      "none",
      "1h",
      "8h",
      "24h",
      "7d",
      "30d",
    ]);
    expect(deadlineField().value).toBe("none");
    expect(saveButton().disabled).toBe(true);
  });

  it("a stored deadline is shown with its time zone named", async () => {
    serve(() => consent({ lendingPercent: 30, lendingUntil: UNTIL, lendingActive: true }));
    await openCard();
    expect(
      screen.getByText(/^You are lending 30% of your idle share until Jun 1, 2026.*12:00.*UTC\.$/)
    ).toBeTruthy();
    expect(deadlineField().value).toBe("keep");
    expect(deadlineField().selectedOptions[0].textContent).toMatch(
      /^Keep the current deadline \(Jun 1, 2026.*UTC\)$/
    );
  });

  it("the deadline follows the page's time zone, and names it", async () => {
    serve(() => consent({ lendingPercent: 30, lendingUntil: UNTIL, lendingActive: true }));
    await openCard("America/Sao_Paulo");
    expect(screen.getByText(/until Jun 1, 2026.*9:00.*GMT-3\.$/)).toBeTruthy();
  });

  it("an ended consent is never shown as lending", async () => {
    serve(() => consent({ lendingPercent: 40, lendingUntil: UNTIL, lendingActive: false }));
    await openCard();
    expect(
      screen.getByText(
        /^Your consent to lend 40% ended on Jun 1, 2026.*UTC\. You are not lending right now\.$/
      )
    ).toBeTruthy();
    expect(document.body.textContent).not.toContain("You are lending");
    expect(percentField().value).toBe("0");
    expect(Array.from(deadlineField().options).map((o) => o.value)).not.toContain("keep");
    expect(saveButton().disabled).toBe(true);
  });

  const share = (borrowAvailable: number | null) => ({
    fairShare: 500,
    consumed: 120,
    remaining: 380,
    status: "ok" as const,
    borrowAvailable,
  });
  const lentDimensions = () => [
    sharedDim({ yourShare: share(40) }),
    sharedDim({ window: "weekly", yourShare: share(null) }),
  ];

  it("for a hard key, what others lend is a figure or not available, never a zero for null", async () => {
    serve(() => consent({ policy: "hard", dimensions: lentDimensions() }));
    await openCard();
    expect(screen.getByText("Lent to you by other keys right now")).toBeTruthy();
    expect(screen.getByText("Daily window: up to 40 requests above your share")).toBeTruthy();
    expect(screen.getByText("Weekly window: not available right now")).toBeTruthy();
    expect(document.body.textContent).not.toContain("up to 0 requests");
    expect(document.body.textContent).not.toMatch(/anonym/i);
  });

  it("for a key that is not hard, the figure does not apply and the form is still there", async () => {
    serve(() => consent({ policy: "soft", dimensions: lentDimensions() }));
    await openCard();
    expect(
      screen.getByText(
        "Your key is not limited by what other keys lend, so no figure applies to it."
      )
    ).toBeTruthy();
    expect(screen.queryByText(/not available right now/)).toBeNull();
    expect(percentField()).toBeTruthy(); // a key that is not hard can still lend
  });

  it("saving sends one PATCH with the pool reference, the key only in the header, and no second GET", async () => {
    vi.spyOn(Date, "now").mockReturnValue(NOW);
    let view = consent();
    const calls = serve(
      () => view,
      () => {
        view = consent({ lendingPercent: 25, lendingUntil: NOW + 86_400_000, lendingActive: true });
        return jsonResponse(view);
      }
    );
    await openCard();
    setPercent("25");
    setDeadline("24h");
    expect(saveButton().disabled).toBe(false);
    fireEvent.click(saveButton());
    expect(await screen.findByText("Your lending choice was saved.")).toBeTruthy();

    const [sent] = patches(calls);
    expect(patches(calls)).toHaveLength(1);
    expect(sent.url).toBe("/api/v1/me/quota/claude");
    expect(sent.headers.get("Authorization")).toBe(`Bearer ${KEY}`);
    expect(sent.headers.get("Content-Type")).toBe("application/json");
    const body = JSON.parse(sent.body ?? "");
    expect(body).toEqual({ pool: LENDING_REF, lendingPercent: 25, lendingUntil: NOW + 86_400_000 });
    expect(selfLendingPatchSchema.safeParse(body).success).toBe(true);
    expect(sent.url.includes(KEY) || (sent.body ?? "").includes(KEY)).toBe(false);
    expect(callsTo(calls, QUOTA, "GET")).toHaveLength(1);

    expect(
      screen.getByText(/^You are lending 25% of your idle share until May 28, 2026/)
    ).toBeTruthy();
    expect(saveButton().disabled).toBe(true);
    expect(
      screen.getByText("Your lending choice was saved.").closest('[role="status"]')
    ).not.toBeNull();
    expect(document.activeElement?.textContent).toContain("Your lending choice was saved.");
    expect(document.body.innerHTML).not.toContain(KEY);
    const stored = [
      ...storedValues(window.sessionStorage),
      ...storedValues(window.localStorage),
    ].join("");
    expect(stored).not.toMatch(/lending|qpr_/);
  });

  it("0% stops lending and sends no deadline", async () => {
    const calls = serve(() =>
      consent({ lendingPercent: 30, lendingUntil: UNTIL, lendingActive: true })
    );
    await openCard();
    setPercent("0");
    expect(deadlineField().disabled).toBe(true);
    expect(screen.getByText("A deadline applies only while you lend.")).toBeTruthy();
    fireEvent.click(saveButton());
    await waitFor(() => expect(patches(calls)).toHaveLength(1));
    expect(JSON.parse(patches(calls)[0].body ?? "")).toEqual({
      pool: LENDING_REF,
      lendingPercent: 0,
      lendingUntil: null,
    });
  });

  it("keeping the current deadline sends the stored instant unchanged", async () => {
    vi.spyOn(Date, "now").mockReturnValue(NOW);
    const calls = serve(() =>
      consent({ lendingPercent: 30, lendingUntil: UNTIL, lendingActive: true })
    );
    await openCard();
    setPercent("50");
    fireEvent.click(saveButton());
    await waitFor(() => expect(patches(calls)).toHaveLength(1));
    expect(JSON.parse(patches(calls)[0].body ?? "").lendingUntil).toBe(UNTIL);
  });

  it("the form refuses what the schema would refuse, and sends nothing", async () => {
    const calls = serve(() =>
      consent({ lendingPercent: 30, lendingUntil: UNTIL, lendingActive: true })
    );
    await openCard();
    for (const value of ["150", "12.5", "", "-1", "abc"]) {
      setPercent(value);
      fireEvent.click(saveButton());
      expect(screen.getByRole("alert").textContent).toBe("Enter a whole number from 0 to 100.");
      expect(percentField().getAttribute("aria-invalid")).toBe("true");
      expect(document.activeElement).toBe(percentField());
    }
    vi.spyOn(Date, "now").mockReturnValue(UNTIL + 1);
    setPercent("50");
    fireEvent.click(saveButton());
    expect(screen.getByText("That deadline has passed. Choose another one.")).toBeTruthy();
    expect(document.activeElement).toBe(deadlineField());
    expect(patches(calls)).toHaveLength(0);
  });

  it("two presses send one request, and the fields wait for the answer", async () => {
    let answer: (response: Response) => void = () => {};
    const calls = serve(
      () => consent(),
      () =>
        new Promise<Response>((resolve) => {
          answer = resolve;
        })
    );
    await openCard();
    setPercent("25");
    const form = saveButton().closest("form") as HTMLFormElement;
    fireEvent.submit(form);
    fireEvent.submit(form);
    await waitFor(() => expect(percentField().disabled).toBe(true));
    expect(patches(calls)).toHaveLength(1);
    expect(deadlineField().disabled && saveButton().disabled).toBe(true);
    expect(form.getAttribute("aria-busy")).toBe("true");
    await act(async () =>
      answer(jsonResponse(consent({ lendingPercent: 25, lendingActive: true })))
    );
    expect(await screen.findByText("Your lending choice was saved.")).toBeTruthy();
    expect(patches(calls)).toHaveLength(1);
  });

  const stored = (over: Partial<SelfQuotaPool> = {}) =>
    quotaView({ pools: [pool({ ref: LENDING_REF, lendingPercent: 40, ...over })] });

  it("a saturation pool with a stored percentage offers only a withdrawal", async () => {
    serve(() => stored({ lendingUntil: UNTIL }));
    await openCard();
    expect(
      screen.getByText(
        "You stored a lending percentage of 40%. It has no effect while this pool does not lend."
      )
    ).toBeTruthy();
    expect(screen.queryByLabelText(PERCENT)).toBeNull();
    expect(screen.queryByRole("button", { name: "Save" })).toBeNull();
    expect(screen.getByRole("button", { name: "Withdraw" })).toBeTruthy();
  });

  it("the withdrawal sends 0 with no deadline, and its saved message stays until the data changes again", async () => {
    let view = stored();
    const calls = serve(
      () => view,
      () => {
        view = stored({ lendingPercent: 0 });
        return jsonResponse(view);
      }
    );
    await openCard();
    fireEvent.click(screen.getByRole("button", { name: "Withdraw" }));
    expect(await screen.findByText("Your lending choice was saved.")).toBeTruthy();
    expect(patches(calls)).toHaveLength(1);
    expect(JSON.parse(patches(calls)[0].body ?? "")).toEqual({
      pool: LENDING_REF,
      lendingPercent: 0,
      lendingUntil: null,
    });
    expect(callsTo(calls, QUOTA, "GET")).toHaveLength(1);
    expect(screen.queryByRole("button", { name: "Withdraw" })).toBeNull();
    expect(document.body.textContent).not.toContain("You stored a lending percentage");
    expect(document.activeElement?.textContent).toContain("Your lending choice was saved.");

    fireEvent.click(screen.getByRole("button", { name: "Refresh" }));
    await waitFor(() =>
      expect(screen.queryByRole("heading", { name: "Lend your idle share" })).toBeNull()
    );
    expect(callsTo(calls, QUOTA, "GET")).toHaveLength(2);
    expect(screen.getByRole("heading", { name: "Pool A" })).toBeTruthy();
  });

  it("a 0% save that leaves the pool out of consent mode keeps the saved message on screen", async () => {
    let view = consent({ lendingPercent: 30, lendingActive: true });
    const calls = serve(
      () => view,
      () => {
        view = quotaView({ pools: [pool({ ref: LENDING_REF })] });
        return jsonResponse(view);
      }
    );
    await openCard();
    setPercent("0");
    fireEvent.click(saveButton());
    expect(await screen.findByText("Your lending choice was saved.")).toBeTruthy();
    expect(screen.getByRole("heading", { name: "Lend your idle share" })).toBeTruthy();
    expect(screen.getByText("You are not lending right now.")).toBeTruthy();
    expect(callsTo(calls, QUOTA, "GET")).toHaveLength(1);
  });
});
