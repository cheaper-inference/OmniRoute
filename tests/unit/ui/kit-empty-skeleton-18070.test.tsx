// @vitest-environment jsdom
// #18070 §4 — /providers/[id]: the empty connections placeholder is the kit `EmptyState`
// and the param-filter section shows kit `Skeleton`s while it loads.
import React, { act } from "react";
import { createRoot } from "react-dom/client";
import { afterEach, describe, expect, it, vi } from "vitest";
import EmptyConnectionsPlaceholder from "@/app/(dashboard)/dashboard/providers/[id]/components/EmptyConnectionsPlaceholder";
import ProviderParamFilterSection from "@/app/(dashboard)/dashboard/providers/[id]/components/ProviderParamFilterSection";
import type { ProviderMessageTranslator } from "@/app/(dashboard)/dashboard/providers/[id]/providerPageHelpers";

const stableTranslate = (key: string) => key;
vi.mock("next-intl", () => ({
  useTranslations: () => stableTranslate,
}));

const notify = { notify: vi.fn(), success: vi.fn(), error: vi.fn() };
vi.mock("@/store/notificationStore", () => ({
  useNotificationStore: () => notify,
}));

const cleanups: Array<() => void> = [];

function renderComponent(node: React.ReactElement) {
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

afterEach(() => {
  while (cleanups.length) cleanups.pop()?.();
  vi.unstubAllGlobals();
});

const translations: Record<string, string> = {
  noConnectionsYet: "No connections yet",
  addFirstConnectionHint: "Add your first connection",
  addConnection: "Add connection",
};
const t = ((key: string) => translations[key] ?? key) as ProviderMessageTranslator;
t.has = () => false;

describe("EmptyConnectionsPlaceholder (#18070)", () => {
  it("renders the kit EmptyState with title, hint and the add action", () => {
    const openPrimaryAddFlow = vi.fn();
    const container = renderComponent(
      <EmptyConnectionsPlaceholder
        isOAuth={false}
        isCompatible={false}
        isCommandCode={false}
        providerId="openai"
        supportsDualAuth={false}
        providerSupportsPat={false}
        commandCodeAuthState={{ phase: "idle" }}
        gateConnectionFlow={(callback) => callback()}
        openApiKeyAddFlow={vi.fn()}
        openPrimaryAddFlow={openPrimaryAddFlow}
        handleOpenCommandCodeConnect={vi.fn()}
        onOpenOAuthModal={vi.fn()}
        onOpenImportCodex={vi.fn()}
        onOpenImportClaude={vi.fn()}
        onOpenImportGemini={vi.fn()}
        onOpenImportGrokCli={vi.fn()}
        t={t}
      />
    );
    const empty = container.querySelector('[data-slot="empty-state"]');
    expect(empty).toBeTruthy();
    expect(empty?.querySelector(".ci-empty-state__icon svg")).toBeTruthy();
    expect(empty?.querySelector(".ci-empty-state__title")?.textContent).toBe("No connections yet");
    expect(empty?.querySelector(".ci-empty-state__description")?.textContent).toBe(
      "Add your first connection"
    );
    const add = empty?.querySelector(".ci-empty-state__actions button") as HTMLButtonElement;
    expect(add?.textContent).toContain("Add connection");
    act(() => add.click());
    expect(openPrimaryAddFlow).toHaveBeenCalledTimes(1);
  });

  it("keeps the actions out for compatible providers", () => {
    const container = renderComponent(
      <EmptyConnectionsPlaceholder
        isOAuth={false}
        isCompatible
        isCommandCode={false}
        providerId="openai-compatible-x"
        supportsDualAuth={false}
        providerSupportsPat={false}
        commandCodeAuthState={{ phase: "idle" }}
        gateConnectionFlow={(callback) => callback()}
        openApiKeyAddFlow={vi.fn()}
        openPrimaryAddFlow={vi.fn()}
        handleOpenCommandCodeConnect={vi.fn()}
        onOpenOAuthModal={vi.fn()}
        onOpenImportCodex={vi.fn()}
        onOpenImportClaude={vi.fn()}
        onOpenImportGemini={vi.fn()}
        onOpenImportGrokCli={vi.fn()}
        t={t}
      />
    );
    expect(container.querySelector('[data-slot="empty-state"]')).toBeTruthy();
    expect(container.querySelector("button")).toBeNull();
  });
});

describe("ProviderParamFilterSection loading (#18070)", () => {
  it("shows kit skeletons while the config loads", () => {
    vi.stubGlobal(
      "fetch",
      vi.fn(() => new Promise<Response>(() => {}))
    );
    const container = renderComponent(<ProviderParamFilterSection providerId="openai" />);
    const skeletons = container.querySelectorAll('[data-slot="skeleton"]');
    expect(skeletons.length).toBe(2);
    expect(container.querySelector(".animate-pulse")).toBeNull();
  });
});
