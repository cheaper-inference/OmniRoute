// @vitest-environment jsdom
import React from "react";
import { act } from "react";
import { createRoot } from "react-dom/client";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

// The shared Modal is a kit Dialog (Radix) since KEA-7886: its content is portaled to
// document.body, so each render hands back the dialog it just opened (the newest one)
// as the query root.

vi.mock("next-intl", () => ({
  useTranslations: () => (key: string) => key,
}));

const { default: ModelSelectModal } = await import("@/shared/components/ModelSelectModal");

const containers: HTMLElement[] = [];

async function renderModal(props: Partial<React.ComponentProps<typeof ModelSelectModal>> = {}) {
  const container = document.createElement("div");
  document.body.appendChild(container);
  containers.push(container);

  const root = createRoot(container);
  await act(async () => {
    root.render(
      <ModelSelectModal
        isOpen={true}
        onClose={() => {}}
        onSelect={() => {}}
        showCombos={false}
        activeProviders={[]}
        {...props}
      />
    );
  });

  await act(async () => {});
  const dialogs = document.body.querySelectorAll<HTMLElement>('[role="dialog"]');
  return dialogs[dialogs.length - 1];
}

beforeEach(() => {
  (
    globalThis as typeof globalThis & { IS_REACT_ACT_ENVIRONMENT?: boolean }
  ).IS_REACT_ACT_ENVIRONMENT = true;
  vi.stubGlobal(
    "fetch",
    vi.fn(async (url: string) => {
      if (url === "/api/provider-nodes") {
        return { ok: true, json: async () => ({ nodes: [] }) };
      }
      if (url === "/api/provider-models") {
        return { ok: true, json: async () => ({ models: {} }) };
      }
      if (url === "/api/combos") {
        return { ok: true, json: async () => ({ combos: [] }) };
      }
      return { ok: true, json: async () => ({}) };
    })
  );
});

afterEach(() => {
  while (containers.length > 0) {
    containers.pop()?.remove();
  }
  document.body.innerHTML = "";
  vi.unstubAllGlobals();
});

describe("ModelSelectModal zero-config providers", () => {
  it("shows a no-auth provider's models when explicitly included without an active connection", async () => {
    const container = await renderModal({ alwaysIncludeProviders: ["duckduckgo-web"] });

    expect(container.textContent).toContain("DuckDuckGo AI Chat");
    expect(container.textContent).toContain("GPT-5.4 Mini");
  });

  it("does not show a no-auth provider by default without an active connection", async () => {
    const container = await renderModal();

    expect(container.textContent).not.toContain("DuckDuckGo AI Chat");
    expect(container.textContent).not.toContain("GPT-5.4 Mini");
  });

  it("treats null explicit provider lists as empty", async () => {
    const container = await renderModal({ alwaysIncludeProviders: null });

    expect(container.textContent).not.toContain("DuckDuckGo AI Chat");
    expect(container.textContent).not.toContain("GPT-5.4 Mini");
  });
});
