// @vitest-environment jsdom
//
// Opt-in CLAUDE_CODE_AUTO_COMPACT_WINDOW on the Claude onboarding snippet. An empty window
// field (the default) keeps the copied settings.json free of the variable; a positive number
// adds it. The builder itself is real, so the test checks the exact snippet the user copies.
import React from "react";
import { act } from "react";
import { createRoot, type Root } from "react-dom/client";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("next-intl", () => ({
  useTranslations: () => (key: string) => key,
  useLocale: () => "en",
}));

const { default: ClaudeGatewayOnboardingBlock } =
  await import("@/app/(dashboard)/dashboard/cli-code/components/ClaudeGatewayOnboardingBlock");

const containers: HTMLElement[] = [];
const roots: Root[] = [];

beforeEach(() => {
  (
    globalThis as typeof globalThis & { IS_REACT_ACT_ENVIRONMENT?: boolean }
  ).IS_REACT_ACT_ENVIRONMENT = true;
});

afterEach(() => {
  while (roots.length > 0) {
    const root = roots.pop();
    act(() => root?.unmount());
  }
  while (containers.length > 0) {
    containers.pop()?.remove();
  }
});

async function renderBlock() {
  const container = document.createElement("div");
  document.body.appendChild(container);
  containers.push(container);
  const root = createRoot(container);
  roots.push(root);
  await act(async () => {
    root.render(<ClaudeGatewayOnboardingBlock baseUrl="http://localhost:20128" />);
  });
  return container;
}

function enterWindow(container: HTMLElement, value: string) {
  const input = container.querySelector<HTMLInputElement>('input[type="number"]');
  expect(input, "the auto-compact window field must exist").not.toBeNull();
  // React tracks the value through its own setter; set the native one and fire `input`.
  const setValue = Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, "value")?.set;
  act(() => {
    setValue?.call(input, value);
    input?.dispatchEvent(new Event("input", { bubbles: true }));
  });
}

function snippetText(container: HTMLElement): string {
  return container.querySelector("pre")?.textContent ?? "";
}

describe("ClaudeGatewayOnboardingBlock — opt-in CLAUDE_CODE_AUTO_COMPACT_WINDOW", () => {
  it("adds CLAUDE_CODE_AUTO_COMPACT_WINDOW to the snippet when a window is entered", async () => {
    const container = await renderBlock();

    enterWindow(container, "230000");

    expect(snippetText(container)).toContain('"CLAUDE_CODE_AUTO_COMPACT_WINDOW": "230000"');
  });

  it("leaves CLAUDE_CODE_AUTO_COMPACT_WINDOW out of the snippet while the field is empty", async () => {
    const container = await renderBlock();

    expect(snippetText(container)).not.toContain("CLAUDE_CODE_AUTO_COMPACT_WINDOW");
  });
});
