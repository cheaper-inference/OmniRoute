// @vitest-environment jsdom
/**
 * The public self-service quota page as a whole: the key form, where the key goes (header only,
 * never the URL, the DOM or the console), where it is kept, and every state of the screen.
 */
import React from "react";
import axe from "axe-core";
import { act, cleanup, fireEvent, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { selfQuotaResponseSchema } from "@/shared/schemas/selfQuota";
import {
  KEY,
  account,
  accountDim,
  callsTo,
  jsonResponse,
  pool,
  quotaView,
  renderQuota,
  sharedDim,
  stubFetch,
  usageSeries,
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

function renderPage() {
  return renderQuota(<QuotaSelfClient provider="claude" providerName="Claude Code" />);
}

function enterKey(value: string, remember = false) {
  fireEvent.change(screen.getByLabelText("API key"), { target: { value } });
  if (remember) fireEvent.click(screen.getByLabelText("Remember on this device"));
  fireEvent.click(screen.getByRole("button", { name: "Show my quota" }));
}

/** The page moves the key in an effect after the screen shows the verdict: let it run. */
async function storageEffects() {
  await act(async () => {});
}

function storedValues(storage: Storage): string[] {
  return Object.keys(storage).map((name) => storage.getItem(name) ?? "");
}

function blockStorage(): () => void {
  const saved = (["sessionStorage", "localStorage"] as const).map(
    (name) => [name, Object.getOwnPropertyDescriptor(window, name)] as const
  );
  const denied = {
    configurable: true,
    get() {
      throw new DOMException("denied", "SecurityError");
    },
  };
  Object.defineProperty(window, "sessionStorage", denied);
  Object.defineProperty(window, "localStorage", denied);
  return () => {
    for (const [name, descriptor] of saved) {
      if (descriptor) Object.defineProperty(window, name, descriptor);
      else Reflect.deleteProperty(window, name);
    }
  };
}

describe("self-service quota page", () => {
  it("builds fixtures that parse in the real response schema", () => {
    const view = quotaView({
      pools: [
        pool({
          dimensions: [sharedDim()],
          accounts: [account({ dimensions: [accountDim()] })],
        }),
      ],
    });
    expect(selfQuotaResponseSchema.safeParse(view).success).toBe(true);
  });

  it("asks for the key and sends nothing before it is typed", () => {
    const calls = stubFetch({});
    renderPage();
    expect(screen.getByText("Enter your API key to see your quota")).toBeTruthy();
    expect(callsTo(calls, QUOTA)).toHaveLength(0);
    const field = screen.getByLabelText("API key");
    expect(field.hasAttribute("name")).toBe(false);
    expect(field.getAttribute("type")).toBe("password");
  });

  it("a pasted key is cleaned, sent as a header and never shown back", async () => {
    let answer: (response: Response) => void = () => {};
    const calls = stubFetch({
      [QUOTA]: () =>
        new Promise<Response>((resolve) => {
          answer = resolve;
        }),
    });
    const href = window.location.href;
    renderPage();
    enterKey("  Bearer sk-live-1234567890 \n");

    expect(await screen.findByText("Loading your quota…")).toBeTruthy();
    const sent = callsTo(calls, QUOTA);
    expect(sent).toHaveLength(1);
    expect(sent[0].url).toBe("/api/v1/me/quota/claude");
    expect(sent[0].headers.get("Authorization")).toBe(`Bearer ${KEY}`);

    await act(async () => answer(jsonResponse(quotaView())));
    expect(await screen.findByRole("heading", { name: "Pool A" })).toBeTruthy();
    expect(document.body.textContent).not.toContain(KEY);
    expect(document.body.textContent).toContain("7890");
    expect(document.body.innerHTML).not.toContain(KEY);
    expect(window.location.href).toBe(href);
    expect(calls.every((call) => !call.url.includes(KEY))).toBe(true);
  });

  it("an empty or impossible key is refused on the page", () => {
    const calls = stubFetch({});
    renderPage();
    enterKey("");
    expect(screen.getByText("Enter your API key.")).toBeTruthy();
    enterKey("sk live");
    expect(
      screen.getByText("That does not look like an API key. Paste it exactly as you received it.")
    ).toBeTruthy();
    expect(callsTo(calls, QUOTA)).toHaveLength(0);
  });

  it("401 explains the key was not accepted and stores nothing", async () => {
    stubFetch({ [QUOTA]: () => jsonResponse({ error: "nope" }, 401) });
    renderPage();
    enterKey(KEY, true);
    expect(await screen.findByText("This key was not accepted")).toBeTruthy();
    await storageEffects();
    expect(screen.getByLabelText("API key")).toBeTruthy();
    expect(window.sessionStorage.length).toBe(0);
    expect(window.localStorage.length).toBe(0);
  });

  it("a key refused on refresh and sent again shows no old pools and asks for no usage", async () => {
    const answers: Array<() => Response | Promise<Response>> = [
      () => jsonResponse(quotaView()),
      () => jsonResponse({ error: "revoked" }, 401),
      () => new Promise<Response>(() => {}),
    ];
    let answered = 0;
    const calls = stubFetch({
      [QUOTA]: () => answers[Math.min(answered++, answers.length - 1)](),
      "/api/v1/me/usage": () => jsonResponse(usageSeries()),
    });
    renderPage();
    enterKey(KEY);
    expect(await screen.findByText("Pool A")).toBeTruthy();
    await waitFor(() => expect(callsTo(calls, "/api/v1/me/usage")).toHaveLength(1));

    fireEvent.click(screen.getByRole("button", { name: "Refresh" }));
    expect(await screen.findByText("This key was not accepted")).toBeTruthy();
    enterKey(KEY);
    await waitFor(() => expect(callsTo(calls, QUOTA)).toHaveLength(3));
    expect(screen.queryByText("Pool A")).toBeNull();
    expect(callsTo(calls, "/api/v1/me/usage")).toHaveLength(1);
  });

  it("403 tells the holder whom to ask", async () => {
    stubFetch({ [QUOTA]: () => jsonResponse({ error: "scope" }, 403) });
    renderPage();
    enterKey(KEY);
    expect(await screen.findByText("This key cannot view its quota")).toBeTruthy();
    expect(
      screen.getByText(
        "The key works, but it is not allowed to read its own usage. Ask whoever administers the key to turn on usage access for it.",
        { exact: false }
      )
    ).toBeTruthy();
  });

  it("a server error or a network failure offers a retry", async () => {
    let served = 0;
    const calls = stubFetch({
      [QUOTA]: () => {
        served += 1;
        if (served === 1) return jsonResponse({ error: "boom" }, 500);
        throw new TypeError("Failed to fetch");
      },
    });
    renderPage();
    enterKey(KEY);
    expect(await screen.findByText("Your quota could not be loaded")).toBeTruthy();
    expect(
      screen.getByText("The server answered with an error. Try again in a moment.")
    ).toBeTruthy();

    fireEvent.click(screen.getByRole("button", { name: "Try again" }));
    expect(
      await screen.findByText(
        "The server could not be reached. Check your connection and try again."
      )
    ).toBeTruthy();
    expect(callsTo(calls, QUOTA)).toHaveLength(2);
  });

  it("an answer outside the contract is reported, not drawn", async () => {
    stubFetch({ [QUOTA]: () => jsonResponse({ pools: [{ name: "LEAK" }] }) });
    renderPage();
    enterKey(KEY);
    expect(
      await screen.findByText(
        "The server sent an answer this page could not read. Try again; if it keeps happening, tell whoever administers your key."
      )
    ).toBeTruthy();
    expect(document.body.textContent).not.toContain("LEAK");
  });

  it("a valid key without a pool for this provider gets its own message", async () => {
    stubFetch({ [QUOTA]: () => jsonResponse(quotaView({ pools: [] })) });
    renderPage();
    enterKey(KEY);
    expect(await screen.findByText("No shared quota for Claude Code")).toBeTruthy();
  });

  it("the header says when the key expires, counted from the answer's own time", async () => {
    stubFetch({
      [QUOTA]: () => jsonResponse(quotaView({ expiresAt: "2026-05-29T15:30:00.000Z" })),
    });
    renderPage();
    enterKey(KEY);
    const badge = await screen.findByText("Key expires in 2 days");
    expect(badge.closest("[title]")?.getAttribute("title")).toMatch(/^Expires on /);
    const describedBy = badge.closest("[aria-describedby]")?.getAttribute("aria-describedby");
    expect(document.getElementById(describedBy ?? "")?.textContent).toMatch(/^Expires on /);
    cleanup();

    stubFetch({ [QUOTA]: () => jsonResponse(quotaView({ expiresAt: null })) });
    renderPage();
    expect(await screen.findByText("Key does not expire")).toBeTruthy();
  });

  it("an expiry that is not a date shows no expiry badge", async () => {
    stubFetch({ [QUOTA]: () => jsonResponse(quotaView({ expiresAt: "not a date" })) });
    renderPage();
    enterKey(KEY);
    expect(await screen.findByRole("heading", { name: "Pool A" })).toBeTruthy();
    expect(screen.queryByText(/^Key (does not expire|expires)/)).toBeNull();
  });

  it("an accepted key stays for the tab; remember moves it to the device", async () => {
    stubFetch({ [QUOTA]: () => jsonResponse(quotaView()) });
    renderPage();
    enterKey(KEY);
    expect(await screen.findByText("Kept until you close this tab.")).toBeTruthy();
    expect(screen.getByRole("heading", { name: "Pool A" })).toBeTruthy();
    expect(storedValues(window.sessionStorage)).toEqual([KEY]);
    expect(window.localStorage.length).toBe(0);

    fireEvent.click(screen.getByRole("button", { name: "Forget key" }));
    enterKey(KEY, true);
    expect(await screen.findByText("Remembered on this device.")).toBeTruthy();
    expect(screen.getByRole("heading", { name: "Pool A" })).toBeTruthy();
    expect(storedValues(window.localStorage)).toEqual([KEY]);
    expect(window.sessionStorage.length).toBe(0);
  });

  it("forget key clears both storages and the data", async () => {
    stubFetch({ [QUOTA]: () => jsonResponse(quotaView()) });
    renderPage();
    enterKey(KEY);
    expect(await screen.findByRole("heading", { name: "Pool A" })).toBeTruthy();

    fireEvent.click(screen.getByRole("button", { name: "Forget key" }));
    expect(window.sessionStorage.length).toBe(0);
    expect(window.localStorage.length).toBe(0);
    expect(screen.queryByRole("heading", { name: "Pool A" })).toBeNull();
    expect(screen.getByText("Enter your API key to see your quota")).toBeTruthy();
  });

  it("a remembered key loads on its own and stays only on the device once accepted", async () => {
    window.localStorage.setItem(STORAGE_ENTRY, KEY);
    const calls = stubFetch({ [QUOTA]: () => jsonResponse(quotaView()) });
    renderPage();
    expect(screen.getByText("Loading your quota…")).toBeTruthy();
    expect(await screen.findByRole("heading", { name: "Pool A" })).toBeTruthy();
    expect(screen.getByText("Remembered on this device.")).toBeTruthy();
    expect(callsTo(calls, QUOTA)).toHaveLength(1);
    expect(storedValues(window.localStorage)).toEqual([KEY]);
    expect(window.sessionStorage.length).toBe(0);
  });

  it("a remembered key loads on its own, and leaves the device once rejected", async () => {
    window.localStorage.setItem(STORAGE_ENTRY, KEY);
    const calls = stubFetch({ [QUOTA]: () => jsonResponse({ error: "revoked" }, 401) });
    renderPage();
    expect(await screen.findByText("This key was not accepted")).toBeTruthy();
    await storageEffects();
    const sent = callsTo(calls, QUOTA);
    expect(sent).toHaveLength(1);
    expect(sent[0].headers.get("Authorization")).toBe(`Bearer ${KEY}`);
    expect(window.localStorage.length).toBe(0);
  });

  it("blocked storage does not break the page", async () => {
    stubFetch({ [QUOTA]: () => jsonResponse(quotaView()) });
    const restore = blockStorage();
    try {
      renderPage();
      enterKey(KEY, true);
      expect(await screen.findByRole("heading", { name: "Pool A" })).toBeTruthy();
      expect(
        await screen.findByText(
          "This browser blocked saving the key. It will work until you leave this page."
        )
      ).toBeTruthy();
      expect(() =>
        fireEvent.click(screen.getByRole("button", { name: "Forget key" }))
      ).not.toThrow();
      expect(screen.getByText("Enter your API key to see your quota")).toBeTruthy();
    } finally {
      restore();
    }
  });

  it("the key is never logged", async () => {
    const methods = ["log", "info", "warn", "error", "debug"] as const;
    const spies = methods.map((method) => vi.spyOn(console, method).mockImplementation(() => {}));
    let served = 0;
    stubFetch({
      [QUOTA]: () => {
        served += 1;
        return served === 1 ? jsonResponse(quotaView()) : jsonResponse({}, 401);
      },
    });
    renderPage();
    enterKey(KEY, true);
    expect(await screen.findByRole("heading", { name: "Pool A" })).toBeTruthy();
    fireEvent.click(screen.getByRole("button", { name: "Forget key" }));
    enterKey(KEY);
    expect(await screen.findByText("This key was not accepted")).toBeTruthy();

    const logged = spies.flatMap((spy) => spy.mock.calls.map((args) => String(args.join(" "))));
    expect(logged.filter((line) => line.includes(KEY))).toEqual([]);
  });

  it("the empty and the loaded page pass axe", async () => {
    const rules = {
      runOnly: { type: "rule" as const, values: ["label", "button-name", "aria-valid-attr-value"] },
    };
    stubFetch({ [QUOTA]: () => jsonResponse(quotaView()) });
    const { container } = renderPage();
    const empty = await axe.run(container, rules);
    expect(empty.violations.map((violation) => violation.id)).toEqual([]);

    enterKey(KEY);
    expect(await screen.findByRole("heading", { name: "Pool A" })).toBeTruthy();
    const loaded = await axe.run(container, rules);
    expect(loaded.violations.map((violation) => violation.id)).toEqual([]);
  });

  it("the typed key never reaches a DOM attribute", async () => {
    const calls = stubFetch({});
    const user = userEvent.setup();
    renderPage();
    const field = screen.getByLabelText("API key") as HTMLInputElement;
    await user.type(field, KEY);
    expect(field.value).toBe(KEY);
    expect(field.getAttribute("value")).toBeNull();
    expect(document.body.innerHTML).not.toContain(KEY);
    expect(callsTo(calls, QUOTA)).toHaveLength(0);
  });

  it("a key refused on the page stays editable, out of the DOM, and editing clears the error", async () => {
    const calls = stubFetch({});
    const user = userEvent.setup();
    renderPage();
    const field = screen.getByLabelText("API key") as HTMLInputElement;
    await user.type(field, "sk live");
    await user.click(screen.getByRole("button", { name: "Show my quota" }));
    const malformed = "That does not look like an API key. Paste it exactly as you received it.";
    expect(screen.getByText(malformed)).toBeTruthy();
    expect(field.value).toBe("sk live");
    expect(field.getAttribute("value")).toBeNull();
    expect(document.body.innerHTML).not.toContain("sk live");

    await user.type(field, "x");
    expect(screen.queryByText(malformed)).toBeNull();
    expect(callsTo(calls, QUOTA)).toHaveLength(0);
  });

  it("a remembered key that answers 403 leaves the device and the form comes back", async () => {
    window.localStorage.setItem(STORAGE_ENTRY, KEY);
    stubFetch({ [QUOTA]: () => jsonResponse({ error: "scope" }, 403) });
    renderPage();
    expect(await screen.findByText("This key cannot view its quota")).toBeTruthy();
    await storageEffects();
    expect(screen.getByLabelText("API key")).toBeTruthy();
    expect(window.localStorage.length).toBe(0);
    expect(window.sessionStorage.length).toBe(0);
  });

  it("refusing a key typed here leaves another tab's remembered key in place", async () => {
    const other = "sk-other-0987654321";
    stubFetch({ [QUOTA]: () => jsonResponse({ error: "nope" }, 401) });
    renderPage();
    // Another tab remembers a different key after this page has read storage.
    window.localStorage.setItem(STORAGE_ENTRY, other);
    enterKey(KEY);
    expect(await screen.findByText("This key was not accepted")).toBeTruthy();
    await storageEffects();
    expect(storedValues(window.localStorage)).toEqual([other]);
  });

  it("an answer that arrives after Forget key does not repaint the pools", async () => {
    let answer: (response: Response) => void = () => {};
    stubFetch({
      [QUOTA]: () =>
        new Promise<Response>((resolve) => {
          answer = resolve;
        }),
    });
    renderPage();
    enterKey(KEY);
    expect(await screen.findByText("Loading your quota…")).toBeTruthy();
    fireEvent.click(screen.getByRole("button", { name: "Forget key" }));
    await act(async () => answer(jsonResponse(quotaView())));
    expect(screen.queryByRole("heading", { name: "Pool A" })).toBeNull();
    expect(screen.getByText("Enter your API key to see your quota")).toBeTruthy();
    expect(screen.getByLabelText("API key")).toBeTruthy();
    expect(window.sessionStorage.length).toBe(0);
    expect(window.localStorage.length).toBe(0);
  });
});
