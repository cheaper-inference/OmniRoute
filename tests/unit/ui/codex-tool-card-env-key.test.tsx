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
  Button: ({ children, onClick }: { children: React.ReactNode; onClick?: () => void }) => (
    <button type="button" onClick={onClick}>
      {children}
    </button>
  ),
  ModelSelectModal: () => null,
  // Render the manual-config files the card builds, so the test can read them.
  ManualConfigModal: ({ configs }: { configs: Array<{ filename: string; content: string }> }) => (
    <div data-testid="manual-configs">
      {configs.map((c) => (
        <pre key={c.filename} data-file={c.filename}>
          {c.content}
        </pre>
      ))}
    </div>
  ),
}));

import CodexToolCard from "@/app/(dashboard)/dashboard/cli-code/components/CodexToolCard";

const mounted: Array<{ container: HTMLDivElement; root: Root }> = [];

afterEach(() => {
  for (const { container, root } of mounted.splice(0)) {
    act(() => root.unmount());
    container.remove();
  }
  vi.restoreAllMocks();
});

describe("CodexToolCard key delivery text", () => {
  it("shows env_key OMNIROUTE_API_KEY and a ~/.codex/.env file, not an auth.json key", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn(async () => ({ ok: true, json: async () => ({ installed: false, runnable: false }) }))
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

    // Status reports "not installed", which is the branch that holds the install guide and the note.
    const guideButton = Array.from(container.querySelectorAll("button")).find(
      (button) => button.textContent?.trim() === "howToInstall"
    );
    expect(guideButton).toBeDefined();
    await act(async () => {
      guideButton!.click();
    });

    const file = (name: string) => container.querySelector(`[data-file="${name}"]`)?.textContent;
    expect(file("~/.codex/config.toml")).toContain('env_key = "OMNIROUTE_API_KEY"');
    expect(file("~/.codex/config.toml")).not.toContain("OPENAI_API_KEY");
    expect(file("~/.codex/.env")).toBe("OMNIROUTE_API_KEY=sk_omniroute\n");
    expect(file("~/.codex/auth.json")).toBeUndefined();
    // The note under the card names the file and variable Apply really uses.
    expect(container.textContent).toContain("~/.codex/.env");
    expect(container.textContent).toContain("OMNIROUTE_API_KEY");
    expect(container.textContent).not.toContain("OPENAI_API_KEY");
  });
});
