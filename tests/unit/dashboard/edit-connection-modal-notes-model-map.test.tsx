// @vitest-environment jsdom
import React, { act } from "react";
import { createRoot, type Root } from "react-dom/client";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";

vi.mock("next-intl", () => ({
  useTranslations: () => (key: string) => key,
}));

vi.mock("@/store/notificationStore", () => ({
  useNotificationStore: () => ({ notify: vi.fn() }),
}));

vi.mock("@/store/emailPrivacyStore", () => ({
  default: () => ({ hidden: false, toggle: vi.fn() }),
}));

vi.mock(
  "@/app/(dashboard)/dashboard/providers/[id]/components/modals/providerTierFieldApi",
  () => ({
    fetchProviderTierOverride: vi.fn().mockResolvedValue(""),
    saveProviderTierOverride: vi.fn().mockResolvedValue(undefined),
  })
);

const { default: EditConnectionModal } =
  await import("../../../src/app/(dashboard)/dashboard/providers/[id]/components/modals/EditConnectionModal.tsx");

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
  props: {
    notes?: string | null;
    modelMap?: Record<string, string> | null;
  } = {},
  onSave = vi.fn()
) {
  onSave.mockResolvedValue(undefined);
  act(() => {
    root.render(
      <EditConnectionModal
        isOpen={true}
        connection={{
          id: "conn-notes-test",
          provider: "openai",
          authType: "apikey",
          name: "OpenAI Prod",
          notes: props.notes ?? null,
          modelMap: props.modelMap ?? null,
        }}
        providerId="openai"
        onSave={onSave}
        onClose={vi.fn()}
      />
    );
  });
  return onSave;
}

function notesInput(): HTMLTextAreaElement {
  const input = document.body.querySelector(
    '[data-testid="connection-notes-input"]'
  ) as HTMLTextAreaElement | null;
  expect(input).not.toBeNull();
  return input!;
}

function modelMapInput(): HTMLTextAreaElement {
  const input = document.body.querySelector(
    '[data-testid="connection-model-map-input"]'
  ) as HTMLTextAreaElement | null;
  expect(input).not.toBeNull();
  return input!;
}

async function typeInto(input: HTMLTextAreaElement, value: string) {
  const setter = Object.getOwnPropertyDescriptor(
    window.HTMLTextAreaElement.prototype,
    "value"
  )!.set!;
  await act(async () => {
    setter.call(input, value);
    input.dispatchEvent(new Event("input", { bubbles: true }));
  });
}

async function clickSave() {
  const button = Array.from(document.body.querySelectorAll("button")).find(
    (b) => b.textContent === "save"
  );
  expect(button).toBeTruthy();
  await act(async () => button!.click());
}

describe("EditConnectionModal — notes and modelMap", () => {
  it("loads existing notes and modelMap into form fields", () => {
    renderModal({
      notes: "Account for billing tier 2",
      modelMap: { "gpt-4o": "gpt-4o-mini", "o3-mini": "o1-mini" },
    });
    expect(notesInput().value).toBe("Account for billing tier 2");
    expect(modelMapInput().value).toBe("gpt-4o: gpt-4o-mini\no3-mini: o1-mini");
  });

  it("submits updated notes and parsed modelMap on save", async () => {
    const onSave = renderModal();
    await typeInto(notesInput(), "New connection note");
    await typeInto(modelMapInput(), "gpt-4o -> gpt-4o-mini\nclaude-3-7-sonnet: claude-3-5-sonnet");
    await clickSave();

    expect(onSave).toHaveBeenCalledTimes(1);
    const saved = onSave.mock.calls[0][0];
    expect(saved.notes).toBe("New connection note");
    expect(saved.modelMap).toEqual({
      "gpt-4o": "gpt-4o-mini",
      "claude-3-7-sonnet": "claude-3-5-sonnet",
    });
  });

  it("refuses to save when modelMap has invalid syntax", async () => {
    const onSave = renderModal();
    await typeInto(modelMapInput(), "gpt-4o-without-target");
    await clickSave();

    expect(onSave).not.toHaveBeenCalled();
    expect(document.body.textContent).toContain("Invalid entry");
  });
});
