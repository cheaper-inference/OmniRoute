// @vitest-environment jsdom
//
// createConnectionFromAgyToken always stores provider "agy", and `antigravity` (the IDE
// provider) is a separate provider with no family link to it. An import offered on the
// antigravity page would report success and add no row there, so the entry point exists
// on the agy page only.
import React, { act } from "react";
import { createRoot } from "react-dom/client";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import ConnectionsHeaderToolbar from "../ConnectionsHeaderToolbar";
import EmptyConnectionsPlaceholder from "../EmptyConnectionsPlaceholder";
import type { ProviderMessageTranslator } from "../../providerPageHelpers";

vi.mock("next-intl", () => ({ useTranslations: () => (key: string) => key }));

const LOCALIZED_LABEL = "localized import label";
const t = ((key: string) =>
  key === "importAgyAuth" ? LOCALIZED_LABEL : key) as ProviderMessageTranslator;
t.has = (key: string) => key === "importAgyAuth";

const cleanups: Array<() => void> = [];

function render(node: React.ReactElement) {
  const container = document.createElement("div");
  document.body.appendChild(container);
  const root = createRoot(container);
  act(() => root.render(node));
  cleanups.push(() => {
    act(() => root.unmount());
    container.remove();
  });
  return container;
}

function renderPlaceholder(providerId: string, onOpenImportAgy = vi.fn()) {
  const props = {
    isOAuth: true,
    isCompatible: false,
    isCommandCode: false,
    providerId,
    providerSupportsPat: false,
    commandCodeAuthState: { phase: "idle" },
    gateConnectionFlow: (callback: () => void) => callback(),
    openPrimaryAddFlow: vi.fn(),
    openApiKeyAddFlow: vi.fn(),
    handleOpenCommandCodeConnect: vi.fn(),
    onOpenOAuthModal: vi.fn(),
    onOpenImportCodex: vi.fn(),
    onOpenImportClaude: vi.fn(),
    onOpenImportAgy,
    onOpenImportGemini: vi.fn(),
    onOpenImportGrokCli: vi.fn(),
    t,
  } as unknown as React.ComponentProps<typeof EmptyConnectionsPlaceholder>;
  return render(<EmptyConnectionsPlaceholder {...props} />);
}

function renderToolbar(providerId: string, onOpenImportAgy = vi.fn()) {
  const props = {
    providerId,
    providerInfo: { id: providerId, name: providerId },
    isCompatible: false,
    isCommandCode: false,
    isOAuth: true,
    providerSupportsPat: false,
    connections: [{ id: "connection-1", authType: "oauth" }],
    batchTesting: false,
    batchRetesting: false,
    retestingId: null,
    proxyConfig: null,
    reorderingByAvailability: false,
    handleReorderByAvailability: vi.fn(),
    preferClaudeCodeForUnprefixedClaudeModels: false,
    claudeRoutingSettingsLoaded: true,
    claudeRoutingSettingsLoadError: null,
    savingClaudeRoutingPreference: false,
    handleToggleClaudeRoutingPreference: vi.fn(),
    loadClaudeRoutingSettings: vi.fn(),
    codexGlobalServiceMode: "auto",
    codexGlobalServiceModeOptions: [],
    codexSettingsLoaded: true,
    codexSettingsLoadError: null,
    savingCodexGlobalServiceMode: false,
    handleChangeCodexGlobalServiceMode: vi.fn(),
    loadCodexSettings: vi.fn(),
    onSetProxyTarget: vi.fn(),
    handleDistributeProxies: vi.fn(),
    onAccountProxiesReset: vi.fn().mockResolvedValue(undefined),
    handleBatchTestAll: vi.fn(),
    openExternalLinkFlow: vi.fn(),
    handleOpenCommandCodeConnect: vi.fn(),
    onOpenOAuthModal: vi.fn(),
    onOpenCodexCliGuide: vi.fn(),
    commandCodeAuthState: { phase: "idle" },
    gateConnectionFlow: (callback: () => void) => callback(),
    openPrimaryAddFlow: vi.fn(),
    openApiKeyAddFlow: vi.fn(),
    onOpenImportCodex: vi.fn(),
    onOpenImportClaude: vi.fn(),
    onOpenImportAgy,
    onOpenImportGemini: vi.fn(),
    onOpenImportGrokCli: vi.fn(),
    t,
  } as unknown as React.ComponentProps<typeof ConnectionsHeaderToolbar>;
  return render(<ConnectionsHeaderToolbar {...props} />);
}

function importButton(container: HTMLElement) {
  return Array.from(container.querySelectorAll("button")).find((button) =>
    button.textContent?.includes(LOCALIZED_LABEL)
  );
}

describe("Antigravity CLI import entry points", () => {
  beforeEach(() => {
    (
      globalThis as typeof globalThis & { IS_REACT_ACT_ENVIRONMENT?: boolean }
    ).IS_REACT_ACT_ENVIRONMENT = true;
  });

  afterEach(() => {
    while (cleanups.length) cleanups.pop()?.();
    document.body.innerHTML = "";
  });

  it("offers a translated import action on the agy empty state", () => {
    const onOpenImportAgy = vi.fn();
    const button = importButton(renderPlaceholder("agy", onOpenImportAgy));
    expect(button).toBeDefined();
    act(() => button?.click());
    expect(onOpenImportAgy).toHaveBeenCalledTimes(1);
  });

  it("offers the import action in the agy connections toolbar", () => {
    const onOpenImportAgy = vi.fn();
    const button = importButton(renderToolbar("agy", onOpenImportAgy));
    expect(button).toBeDefined();
    act(() => button?.click());
    expect(onOpenImportAgy).toHaveBeenCalledTimes(1);
  });

  it("does not offer it on the antigravity page, whose list would never show the row", () => {
    expect(importButton(renderPlaceholder("antigravity"))).toBeUndefined();
    expect(importButton(renderToolbar("antigravity"))).toBeUndefined();
  });
});
