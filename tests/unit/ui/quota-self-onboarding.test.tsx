// @vitest-environment jsdom
/**
 * The tool setup card of the self-service quota page: when it is on screen, the "Include my key"
 * choice, where the key may and may not appear, the copy action and the Claude Code settings.
 */
import React from "react";
import axe from "axe-core";
import { act, cleanup, fireEvent, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import {
  KEY,
  OTHER_KEY,
  QUOTA_MODELS,
  attributesContaining,
  callsTo,
  jsonResponse,
  quotaView,
  renderQuota,
  restoreClipboard,
  stubClipboard,
  stubFetch,
} from "./quotaSelfHarness";

// The shared UI setup mocks next-intl without `useFormatter`; this page runs on the real one,
// inside the provider `renderQuota` mounts.
vi.mock("next-intl", async (importOriginal) => await importOriginal());

type ClientComponent = (props: { provider: string; providerName: string }) => React.ReactElement;

const SONNET = "qtSd/team/claude/claude-sonnet-5";
const OPUS = "qtSd/team/claude/claude-opus-4-8";
const CODEX = "qtSd/team/codex/gpt-5.5";

const SETTINGS_OFF = `{
  "env": {
    "ANTHROPIC_BASE_URL": "https://gw.example.net",
    "ANTHROPIC_AUTH_TOKEN": "<your API key>",
    "ANTHROPIC_MODEL": "qtSd/team/claude/claude-sonnet-5",
    "ANTHROPIC_DEFAULT_OPUS_MODEL": "qtSd/team/claude/claude-opus-4-8",
    "ANTHROPIC_DEFAULT_SONNET_MODEL": "qtSd/team/claude/claude-sonnet-5",
    "ANTHROPIC_DEFAULT_HAIKU_MODEL": "qtSd/team/claude/claude-haiku-4-5-20251001",
    "CLAUDE_CODE_AUTO_COMPACT_WINDOW": "190000"
  }
}`;

// With a 1M main model the builders leave the compact window out (no source for its value).
const SETTINGS_ON = `{
  "env": {
    "ANTHROPIC_BASE_URL": "https://gw.example.net",
    "ANTHROPIC_AUTH_TOKEN": "<your API key>",
    "ANTHROPIC_MODEL": "qtSd/team/claude/claude-sonnet-5[1m]",
    "ANTHROPIC_DEFAULT_OPUS_MODEL": "qtSd/team/claude/claude-opus-4-8[1m]",
    "ANTHROPIC_DEFAULT_SONNET_MODEL": "qtSd/team/claude/claude-sonnet-5[1m]",
    "ANTHROPIC_DEFAULT_HAIKU_MODEL": "qtSd/team/claude/claude-haiku-4-5-20251001"
  }
}`;

const DISCOVERY = `{
  "env": {
    "ANTHROPIC_BASE_URL": "<base>",
    "ANTHROPIC_AUTH_TOKEN": "<your API key>",
    "CLAUDE_CODE_ENABLE_GATEWAY_MODEL_DISCOVERY": "1"
  }
}`;

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
  restoreClipboard();
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

const view = (over = {}) =>
  quotaView({ availableModels: QUOTA_MODELS, apiBaseUrl: "https://gw.example.net", ...over });

async function openCard(over = {}, remember = false) {
  const calls = stubFetch({ [QUOTA]: () => jsonResponse(view(over)) });
  renderPage();
  enterKey(KEY, remember);
  await screen.findByRole("heading", { name: "Set up your tools" });
  await storageEffects();
  return calls;
}

const settings = () => screen.getByRole("region", { name: "Claude Code settings" });
const includeKey = () => screen.getByLabelText("Include my key") as HTMLInputElement;
const html = () => document.documentElement.outerHTML;

describe("self-service quota page: tool setup card", () => {
  it("there is no card before a key and for a refused key", async () => {
    stubFetch({ [QUOTA]: () => jsonResponse({}, 401) });
    renderPage();
    expect(screen.queryByRole("heading", { name: "Set up your tools" })).toBeNull();
    enterKey(KEY);
    await screen.findByText("This key was not accepted");
    expect(screen.queryByRole("heading", { name: "Set up your tools" })).toBeNull();
  });

  it("the card sends no request of its own", async () => {
    const calls = await openCard();
    const before = calls.map((call) => call.url);
    fireEvent.click(includeKey());
    fireEvent.click(screen.getByRole("button", { name: "Copy settings" }));
    await storageEffects();
    expect(calls.map((call) => call.url)).toEqual(before);
    expect(callsTo(calls, QUOTA)).toHaveLength(1);
    expect(calls.every((call) => !call.url.includes(KEY))).toBe(true);
  });

  it("by default the block is the pinned settings with a placeholder for the key", async () => {
    await openCard();
    expect(settings().textContent).toBe(SETTINGS_OFF);
    expect(includeKey().checked).toBe(false);
    expect(html()).not.toContain(KEY);
  });

  it("include my key puts the key in the text of the block and in no attribute", async () => {
    await openCard();
    fireEvent.click(includeKey());
    expect(settings().textContent).toBe(SETTINGS_OFF.replace("<your API key>", KEY));
    expect(attributesContaining(KEY)).toEqual([]);
    expect(window.location.href).not.toContain(KEY);
    fireEvent.click(includeKey());
    expect(html()).not.toContain(KEY);
  });

  it("copy sends exactly the text on screen and says so", async () => {
    const writes = stubClipboard();
    await openCard();
    fireEvent.click(screen.getByRole("button", { name: "Copy settings" }));
    expect(await screen.findByText("Copied.")).toBeTruthy();
    fireEvent.click(includeKey());
    // The status does not outlive the text it was about.
    expect(screen.queryByText("Copied.")).toBeNull();
    fireEvent.click(screen.getByRole("button", { name: "Copy settings" }));
    expect(await screen.findByText("Copied.")).toBeTruthy();
    expect(writes).toEqual([SETTINGS_OFF, SETTINGS_OFF.replace("<your API key>", KEY)]);
    expect(screen.getByText("Copied.").getAttribute("role")).toBe("status");
  });

  it("copy failure is said, not silent", async () => {
    // jsdom has neither a clipboard nor execCommand.
    await openCard();
    fireEvent.click(screen.getByRole("button", { name: "Copy settings" }));
    expect(
      await screen.findByText("Copying is not available here. Select the text and copy it by hand.")
    ).toBeTruthy();
  });

  it("forget key removes the key from the page and the choice with it", async () => {
    await openCard();
    fireEvent.click(includeKey());
    fireEvent.click(screen.getByRole("button", { name: "Forget key" }));
    expect(screen.queryByRole("heading", { name: "Set up your tools" })).toBeNull();
    expect(html()).not.toContain(KEY);
    enterKey(KEY);
    await screen.findByRole("heading", { name: "Set up your tools" });
    expect(includeKey().checked).toBe(false);
    expect(html()).not.toContain(KEY);
  });

  it("a key change from another tab drops the old key and the choice", async () => {
    const calls = await openCard({}, true);
    fireEvent.click(includeKey());
    window.localStorage.setItem("omniroute:quota-self:api-key", OTHER_KEY);
    await act(async () => {
      window.dispatchEvent(new StorageEvent("storage"));
    });
    await screen.findByRole("heading", { name: "Set up your tools" });
    expect(callsTo(calls, QUOTA).at(-1)?.headers.get("Authorization")).toBe(`Bearer ${OTHER_KEY}`);
    expect(includeKey().checked).toBe(false);
    expect(html()).not.toContain(KEY);
    expect(html()).not.toContain(OTHER_KEY);
  });

  it("a new mount starts with the choice off, even for a remembered key", async () => {
    await openCard({}, true);
    fireEvent.click(includeKey());
    cleanup();
    // A page reload: a fresh key store that reads the remembered key from storage.
    vi.resetModules();
    QuotaSelfClient = (await import("@/app/quota/[provider]/QuotaSelfClient")).default;
    renderPage();
    await screen.findByRole("heading", { name: "Set up your tools" });
    expect(includeKey().checked).toBe(false);
    expect(html()).not.toContain(KEY);
  });

  it("a refresh that changes the base URL or the models clears the copied status", async () => {
    stubClipboard();
    // The same number of models for this provider, one of them another model.
    const HAIKU_NEXT = "qtSd/team/claude/claude-haiku-4-6";
    const answers = [
      view(),
      view({ apiBaseUrl: "https://gw2.example.net" }),
      view({ apiBaseUrl: "https://gw2.example.net", availableModels: [HAIKU_NEXT, OPUS, SONNET] }),
    ];
    stubFetch({ [QUOTA]: () => jsonResponse(answers.shift() ?? view()) });
    renderPage();
    enterKey(KEY);
    await screen.findByRole("heading", { name: "Set up your tools" });
    for (const expected of ["https://gw2.example.net", HAIKU_NEXT]) {
      fireEvent.click(screen.getByRole("button", { name: "Copy settings" }));
      expect(await screen.findByText("Copied.")).toBeTruthy();
      fireEvent.click(screen.getByRole("button", { name: "Refresh" }));
      await vi.waitFor(() => expect(settings().textContent).toContain(expected));
      expect(screen.queryByText("Copied.")).toBeNull();
    }
  });

  it("the card stays through a refresh of the same key and leaves when it fails", async () => {
    let answer: (response: Response) => void = () => {};
    let first = true;
    stubFetch({
      [QUOTA]: () => {
        if (first) {
          first = false;
          return jsonResponse(view());
        }
        return new Promise<Response>((resolve) => {
          answer = resolve;
        });
      },
    });
    renderPage();
    enterKey(KEY);
    await screen.findByRole("heading", { name: "Set up your tools" });
    fireEvent.click(includeKey());
    fireEvent.click(screen.getByRole("button", { name: "Refresh" }));
    expect(includeKey().checked).toBe(true);
    expect(settings().textContent).toContain(KEY);
    await act(async () => answer(jsonResponse({}, 500)));
    expect(screen.queryByRole("heading", { name: "Set up your tools" })).toBeNull();
    expect(html()).not.toContain(KEY);
  });

  it("the main model and the 1M choice rewrite the block", async () => {
    await openCard();
    fireEvent.change(screen.getByLabelText("Main model"), { target: { value: OPUS } });
    expect(JSON.parse(settings().textContent ?? "").env.ANTHROPIC_MODEL).toBe(OPUS);
    fireEvent.change(screen.getByLabelText("Main model"), { target: { value: SONNET } });
    fireEvent.click(screen.getByLabelText("Use the 1M context window"));
    expect(settings().textContent).toBe(SETTINGS_ON);
  });

  it("a key with no model for this provider gets discovery settings and is told so", async () => {
    await openCard({ availableModels: [CODEX], pools: [] });
    expect(settings().textContent).toBe(DISCOVERY.replace("<base>", "https://gw.example.net"));
    expect(
      screen.getByText(
        "No model list came with this key for Claude Code. With these settings the tool asks the gateway which models it can use."
      )
    ).toBeTruthy();
    expect(screen.queryByLabelText("Main model")).toBeNull();
    expect(screen.queryByLabelText("Use the 1M context window")).toBeNull();
  });

  it("more than 40 models: the picker lists 40 and the page says how many", async () => {
    const many = Array.from(
      { length: 45 },
      (_, i) => `qtSd/team/claude/m-${String(i + 1).padStart(2, "0")}`
    );
    await openCard({ availableModels: many });
    expect((screen.getByLabelText("Main model") as HTMLSelectElement).options).toHaveLength(40);
    expect(screen.getByText("Showing 40 of the 45 models this key can call.")).toBeTruthy();
  });

  it("without a published address the page says whom to ask", async () => {
    await openCard({ apiBaseUrl: null });
    expect(settings().textContent).toContain('"ANTHROPIC_BASE_URL": "<gateway base URL>"');
    expect(screen.getByText(/This server has not published its address\./)).toBeTruthy();
  });

  it("the card passes axe with the key hidden and shown, and its block is a focusable region", async () => {
    // The page test's rule set, plus the rules the card's own markup could break.
    const rules = {
      runOnly: {
        type: "rule" as const,
        values: [
          "label",
          "button-name",
          "aria-valid-attr-value",
          "aria-allowed-role",
          "nested-interactive",
          "tabindex",
          "scrollable-region-focusable",
          "select-name",
          "aria-required-children",
          "aria-required-parent",
          "aria-allowed-attr",
        ],
      },
    };
    await openCard();
    expect(settings().tabIndex).toBe(0);
    expect(settings().className).toContain("overflow-auto");
    for (const toggle of [false, true]) {
      if (toggle) fireEvent.click(includeKey());
      const results = await axe.run(document.body, rules);
      expect(results.violations.map((violation) => violation.id)).toEqual([]);
    }
  });
});
