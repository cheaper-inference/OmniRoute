// @vitest-environment jsdom
//
// #20262 — the "Strict chat history repair" toggle (providerSpecificData.strictChatHistory)
// on custom OpenAI-compatible connections:
//  - it is only offered on Chat Completions nodes: sequence repair rewrites a
//    `messages` array, so on Responses-API nodes (which send `input`) it is inert;
//  - turning it off must persist an explicit `false`, because the PUT route merges
//    { ...existing, ...incoming } and a dropped key would keep a stored `true`.
import React, { act } from "react";
import { createRoot, type Root } from "react-dom/client";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";

// The shared Modal is a kit Dialog (Radix) since KEA-7886: its content is portaled to
// document.body, so queries start there (the container is a child of body).

vi.mock("next-intl", () => ({
  useTranslations: () => (key: string) => key,
}));

vi.mock("@/store/notificationStore", () => ({
  useNotificationStore: () => ({ notify: vi.fn() }),
}));

vi.mock("@/store/emailPrivacyStore", () => ({
  default: () => ({ hidden: false, toggle: vi.fn() }),
}));

const { default: EditConnectionModal } =
  await import("../../../src/app/(dashboard)/dashboard/providers/[id]/components/modals/EditConnectionModal.tsx");

// providerText() falls back to the English copy when the mocked translator has no `has`.
const TOGGLE_LABEL = "Strict chat history repair";

let container: HTMLDivElement;
let root: Root;

beforeEach(() => {
  container = document.createElement("div");
  document.body.appendChild(container);
  root = createRoot(container);
});

afterEach(() => {
  act(() => root.unmount());
  container.remove();
  vi.clearAllMocks();
});

function renderModal(
  connection: Record<string, unknown>,
  onSave = vi.fn().mockResolvedValue(undefined)
) {
  act(() => {
    root.render(
      <EditConnectionModal
        isOpen={true}
        connection={connection}
        providerId={connection.provider as string}
        onSave={onSave}
        onClose={vi.fn()}
      />
    );
  });
  return onSave;
}

function findToggleLabel(): Element | null {
  return (
    Array.from(document.body.querySelectorAll("span")).find(
      (el) => el.textContent === TOGGLE_LABEL
    ) ?? null
  );
}

function findToggleSwitch(): HTMLElement | null {
  // Toggle forwards its label as the switch's aria-label.
  return document.body.querySelector<HTMLElement>(`[role="switch"][aria-label="${TOGGLE_LABEL}"]`);
}

function clickSave() {
  const button = Array.from(document.body.querySelectorAll("button")).find(
    (b) => b.textContent === "save"
  );
  expect(button).toBeTruthy();
  button!.click();
}

describe("EditConnectionModal — strictChatHistory toggle (#20262)", () => {
  it("renders the toggle for an OpenAI-compatible Chat Completions node", () => {
    renderModal({
      id: "conn-chat-1",
      provider: "openai-compatible-chat-20262",
      authType: "apikey",
      name: "Custom node",
      providerSpecificData: { baseUrl: "https://api.example.com/v1" },
    });
    expect(findToggleLabel()).not.toBeNull();
  });

  it("hides the toggle for an OpenAI-compatible Responses-only node", () => {
    renderModal({
      id: "conn-responses-1",
      provider: "openai-compatible-responses-20262",
      authType: "apikey",
      name: "Custom responses node",
      providerSpecificData: { baseUrl: "https://api.example.com/v1" },
    });
    expect(findToggleLabel()).toBeNull();
  });

  it("does not render the toggle for a non-compatible provider", () => {
    renderModal({
      id: "conn-openai-1",
      provider: "openai",
      authType: "apikey",
      name: "OpenAI key",
      providerSpecificData: {},
    });
    expect(findToggleLabel()).toBeNull();
  });

  it("persists an explicit false when a stored true is switched off", async () => {
    const onSave = renderModal({
      id: "conn-chat-2",
      provider: "openai-compatible-chat-20262",
      authType: "apikey",
      name: "Custom node",
      providerSpecificData: {
        baseUrl: "https://api.example.com/v1",
        strictChatHistory: true,
      },
    });

    const toggleSwitch = findToggleSwitch();
    expect(toggleSwitch?.getAttribute("aria-checked")).toBe("true");

    await act(async () => {
      toggleSwitch!.click();
    });
    expect(findToggleSwitch()?.getAttribute("aria-checked")).toBe("false");

    await act(async () => {
      clickSave();
    });

    expect(onSave).toHaveBeenCalledTimes(1);
    const updates = onSave.mock.calls[0][0] as {
      providerSpecificData?: Record<string, unknown>;
    };
    expect(updates.providerSpecificData).toBeDefined();
    expect(updates.providerSpecificData).toHaveProperty("strictChatHistory", false);
  });
});
