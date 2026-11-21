// @vitest-environment jsdom
/**
 * The Shell and Claude Desktop tabs of the tool setup card: the tab list, the export lines per
 * network profile, the gateway values of the desktop app, and where the key may appear.
 */
import React from "react";
import axe from "axe-core";
import { act, cleanup, fireEvent, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { buildShellExports } from "@/shared/services/claudeAppsOnboarding";

import {
  KEY,
  QUOTA_MODELS,
  attributesContaining,
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

const EXPORTS_OFF = `export ANTHROPIC_BASE_URL='https://gw.example.net'
export ANTHROPIC_AUTH_TOKEN='<your API key>'
export ANTHROPIC_MODEL='qtSd/team/claude/claude-sonnet-5'
export ANTHROPIC_DEFAULT_OPUS_MODEL='qtSd/team/claude/claude-opus-4-8'
export ANTHROPIC_DEFAULT_SONNET_MODEL='qtSd/team/claude/claude-sonnet-5'
export ANTHROPIC_DEFAULT_HAIKU_MODEL='qtSd/team/claude/claude-haiku-4-5-20251001'
export CLAUDE_CODE_AUTO_COMPACT_WINDOW='190000'`;

const DESKTOP_MODELS_ON = `{
  "inferenceModels": [
    {
      "name": "qtSd/team/claude/claude-sonnet-5",
      "supports1m": true
    },
    {
      "name": "qtSd/team/claude/claude-opus-4-8",
      "supports1m": true
    },
    {
      "name": "qtSd/team/claude/claude-haiku-4-5-20251001"
    }
  ]
}`;

const QUOTA = "/api/v1/me/quota/";
const TAB_NAMES = ["Claude Code", "Shell", "Claude Desktop"];
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

function enterKey(value: string) {
  fireEvent.change(screen.getByLabelText("API key"), { target: { value } });
  fireEvent.click(screen.getByRole("button", { name: "Show my quota" }));
}

/** The page moves the key in an effect after the screen shows the verdict: let it run. */
async function storageEffects() {
  await act(async () => {});
}

const view = (over = {}) =>
  quotaView({ availableModels: QUOTA_MODELS, apiBaseUrl: "https://gw.example.net", ...over });

async function openCard(over = {}) {
  const calls = stubFetch({ [QUOTA]: () => jsonResponse(view(over)) });
  renderPage();
  enterKey(KEY);
  await screen.findByRole("heading", { name: "Set up your tools" });
  await storageEffects();
  return calls;
}

const includeKey = () => screen.getByLabelText("Include my key") as HTMLInputElement;
const html = () => document.documentElement.outerHTML;
const tab = (name: string) => screen.getByRole("tab", { name });
const value = (label: string) =>
  screen.getByText(label).closest("div")?.querySelector("dd")?.textContent;

describe("self-service quota page: Shell and Claude Desktop tabs", () => {
  it("three tabs in order, moved with the arrow keys, with only the active panel in the page", async () => {
    await openCard();
    expect(screen.getAllByRole("tab").map((node) => node.textContent)).toEqual(TAB_NAMES);
    expect(screen.getByRole("tablist").getAttribute("aria-label")).toBe("Choose a tool");
    tab("Claude Code").focus();
    fireEvent.keyDown(tab("Claude Code"), { key: "ArrowRight" });
    expect(document.activeElement).toBe(tab("Shell"));
    fireEvent.click(tab("Shell"));
    expect(tab("Shell").getAttribute("aria-selected")).toBe("true");
    expect(screen.queryByRole("region", { name: "Claude Code settings" })).toBeNull();
    expect(screen.getAllByRole("tabpanel")).toHaveLength(1);
  });

  it("each selected tab controls the one panel on the page, and the others are not selected", async () => {
    await openCard();
    for (const name of TAB_NAMES) {
      fireEvent.click(tab(name));
      const panels = screen.getAllByRole("tabpanel");
      expect(panels).toHaveLength(1);
      expect(tab(name).getAttribute("aria-controls")).toBe(panels[0].id);
      const others = TAB_NAMES.filter((other) => other !== name);
      expect(others.map((other) => tab(other).getAttribute("aria-selected"))).toEqual([
        "false",
        "false",
      ]);
    }
  });

  it("shell: one block for the public address, quoted line by line", async () => {
    await openCard();
    fireEvent.click(tab("Shell"));
    expect(
      screen.getByRole("region", { name: "Shell variables for the public address" }).textContent
    ).toBe(EXPORTS_OFF);
    expect(
      screen.queryByRole("region", { name: "Shell variables for the local network" })
    ).toBeNull();
  });

  it.each([
    { withKey: false, longContext: false },
    { withKey: true, longContext: false },
    { withKey: false, longContext: true },
    { withKey: true, longContext: true },
  ])(
    "shell: the lines are the Claude Code settings (key $withKey, 1M $longContext)",
    async ({ withKey, longContext }) => {
      await openCard();
      if (withKey) fireEvent.click(includeKey());
      if (longContext) fireEvent.click(screen.getByLabelText("Use the 1M context window"));
      const settings = screen.getByRole("region", { name: "Claude Code settings" }).textContent;
      fireEvent.click(tab("Shell"));
      const shell = screen.getByRole("region", { name: "Shell variables for the public address" });
      expect(shell.textContent).toBe(buildShellExports(JSON.parse(settings ?? "").env));
      expect((shell.textContent ?? "").includes(`export ANTHROPIC_AUTH_TOKEN='${KEY}'`)).toBe(
        withKey
      );
    }
  );

  it("shell: a plain http address with a port adds the local network block for this page's host", async () => {
    await openCard({ apiBaseUrl: "http://gw.example.net:20128" });
    fireEvent.click(tab("Shell"));
    expect(
      screen.getByRole("region", { name: "Shell variables for the local network" }).textContent
    ).toBe(
      EXPORTS_OFF.replace("https://gw.example.net", `http://${window.location.hostname}:20128`)
    );
    expect(screen.getByRole("heading", { name: "Local network" })).toBeTruthy();
    expect(
      screen.getByText("Use this one when your device is on the same network as the gateway.")
    ).toBeTruthy();
  });

  it("shell: without a published address there is no local network block", async () => {
    await openCard({ apiBaseUrl: null });
    fireEvent.click(tab("Shell"));
    expect(
      screen.getByRole("region", { name: "Shell variables for the public address" }).textContent
    ).toContain("export ANTHROPIC_BASE_URL='<gateway base URL>'");
    expect(screen.queryByText("Local network")).toBeNull();
  });

  it("shell: each block copies its own text", async () => {
    const writes = stubClipboard();
    await openCard({ apiBaseUrl: "http://gw.example.net:20128" });
    fireEvent.click(tab("Shell"));
    fireEvent.click(includeKey());
    fireEvent.click(screen.getByRole("button", { name: "Copy local network variables" }));
    await storageEffects();
    expect(writes).toEqual([
      screen.getByRole("region", { name: "Shell variables for the local network" }).textContent,
    ]);
    expect(writes[0]).toContain(`export ANTHROPIC_AUTH_TOKEN='${KEY}'`);
  });

  it("desktop: the four gateway values, the key as a placeholder until asked", async () => {
    const writes = stubClipboard();
    await openCard();
    fireEvent.click(tab("Claude Desktop"));
    expect(value("Gateway base URL")).toBe("https://gw.example.net");
    expect(value("Gateway API key")).toBe("<your API key>");
    expect(value("Credential kind")).toBe("Static API key");
    expect(value("Gateway auth scheme")).toBe("Bearer");
    expect(html()).not.toContain(KEY);
    expect(screen.queryByRole("button", { name: "Copy API key" })).toBeNull();
    fireEvent.click(includeKey());
    expect(value("Gateway API key")).toBe(KEY);
    expect(attributesContaining(KEY)).toEqual([]);
    fireEvent.click(screen.getByRole("button", { name: "Copy API key" }));
    await storageEffects();
    expect(writes).toEqual([KEY]);
  });

  it("desktop: the copy buttons sit below the list and copy the values", async () => {
    const writes = stubClipboard();
    await openCard();
    fireEvent.click(tab("Claude Desktop"));
    fireEvent.click(includeKey());
    const list = document.querySelector("dl");
    expect(list?.querySelector("button")).toBeNull();
    expect(list?.querySelector('[role="status"]')).toBeNull();
    fireEvent.click(screen.getByRole("button", { name: "Copy base URL" }));
    await storageEffects();
    expect(writes).toEqual(["https://gw.example.net"]);
  });

  it("desktop: an unknown base URL is the placeholder with the notice, and nothing copies it", async () => {
    await openCard({ apiBaseUrl: null });
    fireEvent.click(tab("Claude Desktop"));
    expect(value("Gateway base URL")).toBe("<gateway base URL>");
    expect(screen.getByText(/This server has not published its address\./)).toBeTruthy();
    expect(screen.queryByRole("button", { name: "Copy base URL" })).toBeNull();
  });

  it("desktop: the model list follows the main model and the 1M choice, and never carries the key", async () => {
    await openCard();
    fireEvent.click(includeKey());
    fireEvent.click(screen.getByLabelText("Use the 1M context window"));
    fireEvent.click(tab("Claude Desktop"));
    const list = screen.getByRole("region", { name: "Claude Desktop model list" });
    expect(list.textContent).toBe(DESKTOP_MODELS_ON);
    expect(list.textContent).not.toContain(KEY);
  });

  it("desktop: no model list for a key without models of this provider", async () => {
    await openCard({ availableModels: [] });
    fireEvent.click(tab("Claude Desktop"));
    expect(screen.queryByRole("region", { name: "Claude Desktop model list" })).toBeNull();
  });

  it("with the choice off the key is on no tab, and switching tabs keeps the choice", async () => {
    await openCard({ apiBaseUrl: "http://gw.example.net:20128" });
    for (const name of TAB_NAMES) {
      fireEvent.click(tab(name));
      expect(html()).not.toContain(KEY);
      expect(includeKey().checked).toBe(false);
    }
    fireEvent.click(includeKey());
    for (const name of TAB_NAMES) {
      fireEvent.click(tab(name));
      expect(includeKey().checked).toBe(true);
      expect(html()).toContain(KEY);
      expect(attributesContaining(KEY)).toEqual([]);
    }
  });

  it("switching the choice off removes the key from every tab, the hidden ones too", async () => {
    await openCard({ apiBaseUrl: "http://gw.example.net:20128" });
    fireEvent.click(includeKey());
    fireEvent.click(tab("Shell"));
    expect(html()).toContain(KEY);
    fireEvent.click(includeKey());
    expect(html()).not.toContain(KEY);
    for (const name of TAB_NAMES) {
      fireEvent.click(tab(name));
      expect(html()).not.toContain(KEY);
    }
    expect(screen.queryByRole("button", { name: "Copy API key" })).toBeNull();
  });

  it("both tabs pass axe with the key shown", async () => {
    // The card test's rule set, plus the rules a definition list could break.
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
          "definition-list",
          "dlitem",
          "select-name",
          "aria-required-children",
          "aria-required-parent",
          "aria-allowed-attr",
        ],
      },
    };
    await openCard({ apiBaseUrl: "http://gw.example.net:20128" });
    fireEvent.click(includeKey());
    for (const name of ["Shell", "Claude Desktop"]) {
      fireEvent.click(tab(name));
      const results = await axe.run(document.body, rules);
      expect(results.violations.map((violation) => violation.id)).toEqual([]);
    }
  });
});
