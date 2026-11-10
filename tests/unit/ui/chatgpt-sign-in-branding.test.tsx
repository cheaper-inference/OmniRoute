// @vitest-environment jsdom
import React, { act, type ComponentProps } from "react";
import { createRoot } from "react-dom/client";
import { renderToStaticMarkup } from "react-dom/server";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import ChatGptSignInButton from "@/shared/components/ChatGptSignInButton";
import ProviderIcon from "@/shared/components/ProviderIcon";
import EmptyConnectionsPlaceholder from "@/app/(dashboard)/dashboard/providers/[id]/components/EmptyConnectionsPlaceholder";
import ConnectionsHeaderToolbar from "@/app/(dashboard)/dashboard/providers/[id]/components/ConnectionsHeaderToolbar";

const theme = vi.hoisted(() => ({ isDark: false }));
vi.mock("@/shared/hooks/useTheme", () => ({ useTheme: () => theme }));
vi.mock("@/shared/components", () => ({
  ActionBar: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  Button: ({ children, onClick }: { children: React.ReactNode; onClick?: () => void }) => (
    <button onClick={onClick}>{children}</button>
  ),
  // The toolbar also imports these (Select since the release's Codex service-mode picker);
  // they are not under test here.
  DistributeProxiesButton: () => null,
  Select: () => null,
  Toggle: () => null,
}));

const t = (key: string) => key;
function props(providerId: string) {
  return {
    providerId,
    providerInfo: { name: providerId },
    isOAuth: true,
    isCompatible: false,
    isCommandCode: false,
    supportsDualAuth: false,
    providerSupportsPat: false,
    connections: [],
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
    handleBatchTestAll: vi.fn(),
    openApiKeyAddFlow: vi.fn(),
    openExternalLinkFlow: vi.fn(),
    handleOpenCommandCodeConnect: vi.fn(),
    onOpenOAuthModal: vi.fn(),
    onOpenCodexCliGuide: vi.fn(),
    onOpenImportCodex: vi.fn(),
    onOpenImportClaude: vi.fn(),
    onOpenImportGemini: vi.fn(),
    onOpenImportGrokCli: vi.fn(),
    commandCodeAuthState: { phase: "idle" },
    gateConnectionFlow: (callback: () => void) => callback(),
    openPrimaryAddFlow: vi.fn(),
    t,
  };
}
beforeEach(() => {
  Object.assign(globalThis, { IS_REACT_ACT_ENVIRONMENT: true });
});
afterEach(() => {
  theme.isDark = false;
});

describe("ChatGPT sign-in branding", () => {
  it("keeps the branded authorization link and busy state accessible", () => {
    const link = renderToStaticMarkup(
      <ChatGptSignInButton href="https://auth.openai.com/fixture" />
    );
    expect(link).toContain('target="_blank"');
    expect(link).toContain('rel="noreferrer"');
    expect(link).toContain("Sign in with ChatGPT");
    expect(renderToStaticMarkup(<ChatGptSignInButton intent="continue" />)).toContain(
      "Continue with ChatGPT"
    );
    const busy = renderToStaticMarkup(<ChatGptSignInButton busy />);
    expect(busy).toContain('aria-busy="true"');
    expect(busy).toContain('disabled=""');
  });
  it.each([false, true])("uses the bundled official logo (dark=%s)", (isDark) => {
    theme.isDark = isDark;
    const html = renderToStaticMarkup(<ProviderIcon providerId="chatgpt" />);
    expect(html).toContain(`/providers/chatgpt-logo-${isDark ? "white" : "black"}.svg`);
    expect(html).not.toContain("thesvg.org");
    expect(html).not.toContain('data-provider-icon="generic"');
  });

  it("replaces both generic connection actions only for ChatGPT", () => {
    for (const providerId of ["chatgpt", "codex"]) {
      const p = props(providerId);
      for (const html of [
        renderToStaticMarkup(
          <EmptyConnectionsPlaceholder
            {...(p as ComponentProps<typeof EmptyConnectionsPlaceholder>)}
          />
        ),
        renderToStaticMarkup(
          <ConnectionsHeaderToolbar {...(p as ComponentProps<typeof ConnectionsHeaderToolbar>)} />
        ),
      ]) {
        if (providerId === "chatgpt") {
          expect(html).toContain("Sign in with ChatGPT");
          expect(html).toContain('aria-haspopup="dialog"');
          // Official mark, inlined in the kit primary button (follows the button ink).
          expect(html).toContain("data-chatgpt-logo");
          expect(html).toContain("ci-button--default");
          expect(html).not.toContain(">addConnection<");
          expect(html).not.toContain(">add<");
        } else {
          expect(html).not.toContain("Continue with ChatGPT");
        }
      }
    }
  });

  it("opens the existing gated sign-in dialog without navigating away", () => {
    const p = props("chatgpt");
    const container = document.createElement("div");
    const root = createRoot(container);
    try {
      act(() =>
        root.render(
          <EmptyConnectionsPlaceholder
            {...(p as ComponentProps<typeof EmptyConnectionsPlaceholder>)}
          />
        )
      );
      const button = [...container.querySelectorAll("button")].find(
        (node) => node.textContent === "Sign in with ChatGPT"
      );
      expect(button).toBeDefined();
      act(() => button!.click());
      expect(p.openPrimaryAddFlow).toHaveBeenCalledOnce();
    } finally {
      act(() => root.unmount());
    }
  });
});
