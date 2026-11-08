// @vitest-environment jsdom
/**
 * Provider page: ProviderModalsPanel must mount the Add API key modal only
 * while it is open. Kept mounted, the modal's form state (API key, token
 * secret, bulk text, …) survived a close or a save and reappeared on the next
 * open. Each open has to get a fresh instance.
 */
import React, { act, useEffect } from "react";
import { createRoot } from "react-dom/client";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import ProviderModalsPanel from "../components/ProviderModalsPanel";

const modalLifecycle = vi.hoisted(() => ({ mounts: 0, unmounts: 0 }));

vi.mock("next/navigation", () => ({
  useParams: () => ({ id: "openai" }),
  useRouter: () => ({ push: vi.fn(), replace: vi.fn() }),
  usePathname: () => "/dashboard/providers/openai",
}));

vi.mock("next-intl", () => ({
  useTranslations: () => (key: string) => key,
}));

vi.mock("../components/modals/AddApiKeyModal", () => ({
  default: function AddApiKeyModalStub({ isOpen }: { isOpen: boolean }) {
    useEffect(() => {
      modalLifecycle.mounts += 1;
      return () => {
        modalLifecycle.unmounts += 1;
      };
    }, []);
    return <div data-testid="add-api-key-modal" data-open={String(isOpen)} />;
  },
}));

vi.stubGlobal(
  "fetch",
  vi.fn(async () => ({
    ok: true,
    status: 200,
    json: async () => ({}),
    text: async () => "{}",
    headers: { get: () => "application/json" },
  }))
);

function basePanelProps(showAddApiKeyModal: boolean) {
  return {
    providerId: "openai",
    providerInfo: { name: "OpenAI" },
    isCompatible: false,
    isAnthropicProtocolCompatible: false,
    isCcCompatible: false,
    isCommandCode: false,
    isUpstreamProxyProvider: false,
    subscriptionRisk: false,
    showRiskNoticeModal: false,
    showKimiAuthMethodModal: false,
    showOAuthModal: false,
    reauthConnection: null,
    showSiliconFlowEndpointModal: false,
    showAddApiKeyModal,
    setShowAddApiKeyModal: vi.fn(),
    handleCloseAddApiKeyModal: vi.fn(),
    handleSaveApiKey: vi.fn(),
    existingConnectionNames: [],
    siliconFlowInitialBaseUrl: undefined,
    commandCodeAuthState: { phase: "idle" },
    batchDeleteConfirmOpen: false,
    selectedIds: new Set<string>(),
    batchDeleting: false,
    deleteConfirm: { connection: null, deleting: false, cancel: vi.fn(), confirm: vi.fn() },
    applyCodexModalConnectionId: null,
    applyingCodexAuthId: null,
    importCodexModalOpen: false,
    fetchConnections: vi.fn(),
    externalLinkModalOpen: false,
    externalLinkLoading: false,
    externalLinkError: null,
    externalLinkUrl: null,
    externalLinkCopied: false,
    showEditModal: false,
    selectedConnection: null,
    showEditNodeModal: false,
    providerNode: null,
    codexCliGuideOpen: false,
    applyClaudeModalConnectionId: null,
    applyingClaudeAuthId: null,
    importClaudeModalOpen: false,
    importGrokCliModalOpen: false,
    batchTestResults: null,
    emailsVisible: false,
    proxyTarget: null,
    setProxyTarget: vi.fn(),
    fetchProxyConfig: vi.fn(),
    refreshProxyState: vi.fn(),
    importProgress: {
      current: 0,
      total: 0,
      phase: "idle",
      status: "",
      logs: [],
      error: "",
      importedCount: 0,
    },
    showImportModal: false,
    showTutorialModal: false,
    t: (key: string) => key,
  };
}

describe("ProviderModalsPanel — Add API key modal mounts only while open", () => {
  let container: HTMLElement;
  let root: ReturnType<typeof createRoot>;

  beforeEach(() => {
    (
      globalThis as typeof globalThis & { IS_REACT_ACT_ENVIRONMENT?: boolean }
    ).IS_REACT_ACT_ENVIRONMENT = true;
    modalLifecycle.mounts = 0;
    modalLifecycle.unmounts = 0;
    container = document.createElement("div");
    document.body.appendChild(container);
    root = createRoot(container);
  });

  afterEach(() => {
    act(() => {
      root.unmount();
    });
    container.remove();
  });

  it("gives every open a fresh modal instance", () => {
    type PanelProps = React.ComponentProps<typeof ProviderModalsPanel>;
    const renderPanel = (open: boolean) =>
      act(() => {
        root.render(<ProviderModalsPanel {...(basePanelProps(open) as unknown as PanelProps)} />);
      });
    const modal = () => container.querySelector('[data-testid="add-api-key-modal"]');

    renderPanel(false);
    expect(modal()).toBeNull();
    expect(modalLifecycle.mounts).toBe(0);

    renderPanel(true);
    expect(modal()?.getAttribute("data-open")).toBe("true");
    expect(modalLifecycle.mounts).toBe(1);

    renderPanel(false);
    expect(modal()).toBeNull();
    expect(modalLifecycle.unmounts).toBe(1);

    renderPanel(true);
    expect(modalLifecycle.mounts).toBe(2);
  });
});
