import React, { act } from "react";
import { createRoot, type Root } from "react-dom/client";
import { afterEach, describe, expect, it, vi } from "vitest";

(globalThis as typeof globalThis & { IS_REACT_ACT_ENVIRONMENT: boolean }).IS_REACT_ACT_ENVIRONMENT =
  true;

const translate = (key: string) => key;

vi.mock("next-intl", () => ({ useTranslations: () => translate }));
vi.mock("@/shared/components/ProviderIcon", () => ({ default: () => null }));
vi.mock("@/app/(dashboard)/dashboard/cli-code/components/CliStatusBadge", () => ({
  default: () => null,
}));
vi.mock("@/shared/components", () => ({
  Card: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  Button: ({
    children,
    onClick,
    disabled,
    loading,
  }: {
    children: React.ReactNode;
    onClick?: () => void;
    disabled?: boolean;
    loading?: boolean;
  }) => (
    <button type="button" onClick={onClick} disabled={disabled || loading}>
      {children}
    </button>
  ),
  ModelSelectModal: () => null,
  ManualConfigModal: () => null,
}));

import CodexToolCard from "@/app/(dashboard)/dashboard/cli-code/components/CodexToolCard";

const mounted: Array<{ container: HTMLDivElement; root: Root }> = [];

const jsonResponse = (body: unknown) => ({
  ok: true,
  json: async () => body,
});

const waitFor = async (predicate: () => boolean, timeoutMs = 2000) => {
  const started = Date.now();
  while (!predicate()) {
    if (Date.now() - started > timeoutMs) throw new Error("waitFor timed out");
    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 0));
    });
  }
};

const catalogCheckbox = (container: HTMLElement): HTMLInputElement | null =>
  Array.from(container.querySelectorAll<HTMLInputElement>('input[type="checkbox"]')).find((input) =>
    input.closest("label")?.textContent?.includes("codexModelCatalog")
  ) ?? null;

const applyButton = (container: HTMLElement) =>
  Array.from(container.querySelectorAll("button")).find(
    (button) => button.textContent?.trim() === "saveapply"
  );

afterEach(() => {
  for (const { container, root } of mounted.splice(0)) {
    act(() => root.unmount());
    container.remove();
  }
  vi.restoreAllMocks();
});

const renderCard = async (applyResponse: Record<string, unknown>) => {
  const posts: Array<Record<string, unknown>> = [];
  vi.stubGlobal(
    "fetch",
    vi.fn(async (input: string | URL | Request, init?: RequestInit) => {
      const url = String(input);
      if (url === "/api/cli-tools/codex-settings" && init?.method === "POST") {
        posts.push(JSON.parse(String(init.body)));
        return jsonResponse(applyResponse);
      }
      if (url === "/api/cli-tools/codex-settings") {
        return jsonResponse({ installed: true, runnable: true, config: 'model = "gpt-5.6-sol"\n' });
      }
      if (url === "/api/models/alias") return jsonResponse({ aliases: {} });
      if (url === "/api/cli-tools/codex-profiles") return jsonResponse({ profiles: [] });
      if (url === "/api/cli-tools/backups?tool=codex") return jsonResponse({ backups: [] });
      throw new Error(`Unexpected fetch: ${url}`);
    })
  );

  const container = document.createElement("div");
  document.body.appendChild(container);
  const root = createRoot(container);
  mounted.push({ container, root });

  await act(async () => {
    root.render(
      <CodexToolCard
        tool={{ name: "Codex" }}
        isExpanded
        baseUrl="http://localhost:20128"
        apiKeys={[]}
        activeProviders={[]}
        cloudEnabled={false}
        batchStatus={null}
        lastConfiguredAt={null}
      />
    );
  });
  await waitFor(() => catalogCheckbox(container) !== null && !!applyButton(container));
  return { container, posts };
};

describe("CodexToolCard model catalog", () => {
  it("does not ask for the Codex model catalog by default and can opt in", async () => {
    const { container, posts } = await renderCard({ success: true });
    expect(catalogCheckbox(container)?.checked).toBe(false);

    await act(async () => {
      applyButton(container)!.click();
    });
    await waitFor(() => posts.length === 1);
    expect(posts[0].modelCatalog).toBe(false);

    await act(async () => {
      catalogCheckbox(container)!.click();
    });
    expect(catalogCheckbox(container)?.checked).toBe(true);
    await act(async () => {
      applyButton(container)!.click();
    });
    await waitFor(() => posts.length === 2);
    expect(posts[1].modelCatalog).toBe(true);
  });

  it("shows a warning, not an error, when Apply succeeds without the catalog", async () => {
    const { container } = await renderCard({
      success: true,
      catalogWarning: "Could not read Codex's bundled model catalog",
    });
    await act(async () => {
      applyButton(container)!.click();
    });
    await waitFor(() => !!container.textContent?.includes("codexCatalogWarning"));
    expect(container.textContent).toContain("settingsApplied codexCatalogWarning");
    expect(container.querySelector(".text-amber-600")).not.toBeNull();
  });
});
