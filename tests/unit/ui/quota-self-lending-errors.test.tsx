// @vitest-environment jsdom
/**
 * Every refusal of a lending change on the public self-service quota page, through the real page:
 * the text each one shows, what happens to the key, where focus goes, and that no answer from the
 * server reaches the screen.
 */
import React from "react";
import axe from "axe-core";
import { act, cleanup, fireEvent, screen, waitFor } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import type { SelfQuotaPool, SelfQuotaResponse } from "@/shared/schemas/selfQuota";
import {
  KEY,
  LENDING_REF,
  callsTo,
  jsonResponse,
  pool,
  quotaView,
  renderQuota,
  stubFetch,
  type FetchCall,
} from "./quotaSelfHarness";

// The shared UI setup mocks next-intl without `useFormatter`; this page runs on the real one,
// inside the provider `renderQuota` mounts.
vi.mock("next-intl", async (importOriginal) => await importOriginal());

type ClientComponent = (props: { provider: string; providerName: string }) => React.ReactElement;

const QUOTA = "/api/v1/me/quota/";
const STORAGE_ENTRY = "omniroute:quota-self:api-key";
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

/** The page moves the key in an effect after the screen shows the verdict: let it run. */
async function storageEffects() {
  await act(async () => {});
}

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
const saveButton = () => screen.getByRole("button", { name: "Save" }) as HTMLButtonElement;
const setPercent = (value: string) => fireEvent.change(percentField(), { target: { value } });
/** A refusal whose body carries a server text the page must never show. */
const refuse =
  (status: number, headers?: Record<string, string>): Patch =>
  () =>
    new Response(JSON.stringify({ error: { message: "server detail MARK-7" } }), {
      status,
      headers,
    });
function changeAndSave() {
  setPercent("25");
  fireEvent.click(saveButton());
}

// The page test's rule set, plus the rules about the card's form fields, lists and live regions.
const AXE_RULES = {
  runOnly: {
    type: "rule" as const,
    values: [
      "label",
      "button-name",
      "aria-valid-attr-value",
      "select-name",
      "aria-allowed-attr",
      "aria-valid-attr",
      "list",
      "listitem",
      "nested-interactive",
    ],
  },
};

describe("self-service quota page lending refusals", () => {
  it("a 403 on save keeps the key and offers a reload", async () => {
    let view = consent();
    const calls = serve(() => view, refuse(403));
    await openCard();
    changeAndSave();
    const alert = await screen.findByRole("alert");
    expect(alert.textContent).toContain(
      "This pool is not taking lending changes right now. Reload to see what you can still do."
    );
    expect(document.body.textContent).not.toContain("MARK-7");
    expect(window.sessionStorage.getItem(STORAGE_ENTRY)).toContain(KEY);
    expect(screen.queryByLabelText("API key")).toBeNull();
    expect(callsTo(calls, QUOTA, "GET")).toHaveLength(1);
    expect(percentField().value).toBe("25");

    view = quotaView({ pools: [pool({ ref: LENDING_REF })] }); // the pool left consent mode
    fireEvent.click(screen.getByRole("button", { name: "Reload my quota" }));
    await waitFor(() =>
      expect(screen.queryByRole("heading", { name: "Lend your idle share" })).toBeNull()
    );
    expect(screen.getByRole("heading", { name: "Pool A" })).toBeTruthy();
    expect(callsTo(calls, QUOTA, "GET")).toHaveLength(2);
    expect(window.sessionStorage.getItem(STORAGE_ENTRY)).toContain(KEY);
  });

  it("a 403 on save followed by a refused reload runs the page's own refusal", async () => {
    let gets = 0;
    stubFetch({
      [QUOTA]: (call) =>
        call.method === "PATCH"
          ? refuse(403)(call)
          : (gets += 1) === 1
            ? jsonResponse(consent())
            : jsonResponse({}, 403),
    });
    await openCard();
    changeAndSave();
    fireEvent.click(await screen.findByRole("button", { name: "Reload my quota" }));
    expect(await screen.findByText("This key cannot view its quota")).toBeTruthy();
    await storageEffects();
    expect(window.sessionStorage.getItem(STORAGE_ENTRY)).toBeNull();
  });

  it("a 401 on save reloads at once and the page forgets the key", async () => {
    let gets = 0;
    const calls = stubFetch({
      [QUOTA]: (call) =>
        call.method === "PATCH"
          ? refuse(401)(call)
          : (gets += 1) === 1
            ? jsonResponse(consent())
            : jsonResponse({}, 401),
    });
    await openCard();
    changeAndSave();
    expect(await screen.findByText("This key was not accepted")).toBeTruthy();
    await storageEffects();
    expect(callsTo(calls, QUOTA, "GET")).toHaveLength(2);
    expect(window.sessionStorage.getItem(STORAGE_ENTRY)).toBeNull();
    expect(screen.queryByRole("heading", { name: "Lend your idle share" })).toBeNull();
  });

  it("a 404 on save says the pool is gone and offers a reload", async () => {
    let view = consent();
    const calls = serve(() => view, refuse(404));
    await openCard();
    changeAndSave();
    expect((await screen.findByRole("alert")).textContent).toContain(
      "This pool is no longer available to this key."
    );
    expect(callsTo(calls, QUOTA, "GET")).toHaveLength(1);
    view = quotaView({ pools: [] });
    fireEvent.click(screen.getByRole("button", { name: "Reload my quota" }));
    expect(await screen.findByText("No shared quota for Claude Code")).toBeTruthy();
  });

  it.each<[string, Patch, string]>([
    [
      "400",
      refuse(400),
      "The server did not accept this change. Check the percentage and the deadline, then try again.",
    ],
    [
      "429 with 7 seconds",
      refuse(429, { "Retry-After": "7" }),
      "Too many changes in a short time. Try again in 7 seconds.",
    ],
    [
      "429 with 1 second",
      refuse(429, { "Retry-After": "1" }),
      "Too many changes in a short time. Try again in 1 second.",
    ],
    [
      "429 without the header",
      refuse(429),
      "Too many changes in a short time. Wait a moment and try again.",
    ],
    [
      "500",
      refuse(500),
      "The server answered with an error, so the change may not have been saved. Try again in a moment.",
    ],
    [
      "a network failure",
      () => Promise.reject(new TypeError("offline")),
      "The server could not be reached, so the change may not have been saved. Check your connection and try again.",
    ],
  ])(
    "%s has its own text, keeps the typed values and offers no reload",
    async (_name, patch, text) => {
      const calls = serve(() => consent(), patch);
      await openCard();
      changeAndSave();
      expect((await screen.findByRole("alert")).textContent).toContain(text);
      expect(document.body.textContent).not.toContain("MARK-7");
      expect(screen.queryByRole("button", { name: "Reload my quota" })).toBeNull();
      expect(percentField().value).toBe("25");
      expect(saveButton().disabled).toBe(false);
      expect(callsTo(calls, QUOTA, "GET")).toHaveLength(1);
      expect(window.sessionStorage.getItem(STORAGE_ENTRY)).toContain(KEY);
    }
  );

  it("an answer outside the contract says so and reloads the quota", async () => {
    const calls = serve(
      () => consent(),
      () => jsonResponse({ nope: true })
    );
    await openCard();
    changeAndSave();
    expect((await screen.findByRole("alert")).textContent).toContain(
      "The server sent an answer this page could not read."
    );
    await waitFor(() => expect(callsTo(calls, QUOTA, "GET")).toHaveLength(2));
  });

  it("an error moves focus to the message, and editing clears it", async () => {
    serve(() => consent(), refuse(500));
    await openCard();
    changeAndSave();
    const alert = await screen.findByRole("alert");
    expect(document.activeElement?.contains(alert)).toBe(true);
    setPercent("26");
    expect(screen.queryByRole("alert")).toBeNull();
  });

  it("forgetting the key during a save drops the answer", async () => {
    let answer: (response: Response) => void = () => {};
    serve(
      () => consent(),
      () =>
        new Promise<Response>((resolve) => {
          answer = resolve;
        })
    );
    await openCard();
    changeAndSave();
    fireEvent.click(screen.getByRole("button", { name: "Forget key" }));
    await act(async () =>
      answer(jsonResponse(consent({ name: "Late pool", lendingPercent: 25, lendingActive: true })))
    );
    expect(screen.queryByRole("heading", { name: "Late pool" })).toBeNull();
    expect(screen.getByLabelText("API key")).toBeTruthy();
  });

  it("the key is never logged during a save, and the card passes axe in each state", async () => {
    const spies = (["log", "info", "warn", "error", "debug"] as const).map((m) =>
      vi.spyOn(console, m).mockImplementation(() => {})
    );
    serve(() => consent(), refuse(500));
    await openCard();
    expect((await axe.run(document.body, AXE_RULES)).violations).toEqual([]);
    setPercent("abc");
    fireEvent.click(saveButton());
    expect((await axe.run(document.body, AXE_RULES)).violations).toEqual([]);
    changeAndSave();
    await screen.findByText(/may not have been saved/);
    expect((await axe.run(document.body, AXE_RULES)).violations).toEqual([]);
    const logged = spies.flatMap((spy) => spy.mock.calls.map((args) => String(args.join(" "))));
    expect(logged.filter((line) => line.includes(KEY))).toEqual([]);
  });
});
