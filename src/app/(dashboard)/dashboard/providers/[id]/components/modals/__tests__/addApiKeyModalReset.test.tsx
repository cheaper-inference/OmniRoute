// @vitest-environment jsdom
//
// The Add API key modal stays mounted by callers that only toggle `isOpen`.
// Closing it (X, Cancel, or the parent closing after a successful save) used to
// keep the whole form: reopening showed the previous API key, the bulk-add text
// and the bulk tab. Every open must start from a fresh form, while a failed save
// keeps the typed input so the user can fix it.
import React, { act } from "react";
import { createRoot } from "react-dom/client";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import AddApiKeyModal from "../AddApiKeyModal";

vi.mock("next/navigation", () => ({
  useParams: () => ({ id: "openai" }),
  useRouter: () => ({ push: vi.fn(), replace: vi.fn() }),
}));
vi.mock("next-intl", () => ({
  useTranslations: (ns?: string) => (k: string) => (ns ? `${ns}.${k}` : k),
}));

type ModalProps = React.ComponentProps<typeof AddApiKeyModal>;

const cleanups: Array<() => void> = [];

function mountModal(initial: Partial<ModalProps>) {
  const container = document.createElement("div");
  document.body.appendChild(container);
  const root = createRoot(container);
  let current: ModalProps = {
    isOpen: true,
    provider: "openai",
    providerName: "OpenAI",
    isCompatible: false,
    existingConnectionNames: [],
    onSave: vi.fn().mockResolvedValue(undefined),
    onClose: vi.fn(),
    ...initial,
  };
  const render = (patch: Partial<ModalProps> = {}) => {
    current = { ...current, ...patch };
    act(() => root.render(<AddApiKeyModal {...current} />));
  };
  render();
  cleanups.push(() => {
    act(() => root.unmount());
    container.remove();
  });
  return { container, render };
}

function setFieldValue(field: HTMLInputElement | HTMLTextAreaElement, value: string) {
  const proto =
    field instanceof HTMLTextAreaElement
      ? window.HTMLTextAreaElement.prototype
      : window.HTMLInputElement.prototype;
  const setter = Object.getOwnPropertyDescriptor(proto, "value")?.set;
  act(() => {
    setter?.call(field, value);
    field.dispatchEvent(new Event("input", { bubbles: true }));
  });
}

function apiKeyInput(container: HTMLElement): HTMLInputElement | null {
  return container.querySelector('input[type="password"]');
}

function nameInput(container: HTMLElement): HTMLInputElement | null {
  return container.querySelector('input[placeholder="providers.productionKey"]');
}

function buttonByText(text: string): HTMLButtonElement | undefined {
  return Array.from(document.body.querySelectorAll("button")).find(
    (b) => b.textContent?.trim() === text
  );
}

function closeAndReopen(render: (patch?: Partial<ModalProps>) => void, reopen = {}) {
  render({ isOpen: false });
  render({ isOpen: true, ...reopen });
}

describe("AddApiKeyModal resets its form between opens", () => {
  beforeEach(() => {
    (
      globalThis as typeof globalThis & { IS_REACT_ACT_ENVIRONMENT?: boolean }
    ).IS_REACT_ACT_ENVIRONMENT = true;
    vi.stubGlobal(
      "fetch",
      vi.fn(() =>
        Promise.resolve({
          ok: true,
          json: async () => ({ valid: true }),
          text: async () => "",
        } as Response)
      )
    );
    vi.stubGlobal("localStorage", {
      getItem: () => null,
      setItem: () => undefined,
      removeItem: () => undefined,
      clear: () => undefined,
    });
  });

  afterEach(() => {
    while (cleanups.length) cleanups.pop()?.();
    document.body.innerHTML = "";
    vi.unstubAllGlobals();
  });

  it("clears the typed API key after close and reopen", () => {
    const { container, render } = mountModal({});
    const input = apiKeyInput(container);
    expect(input).not.toBeNull();
    setFieldValue(input as HTMLInputElement, "sk-previous-secret");
    expect(apiKeyInput(container)?.value).toBe("sk-previous-secret");

    closeAndReopen(render);

    expect(apiKeyInput(container)?.value).toBe("");
  });

  it("returns to single mode with an empty bulk textarea after close and reopen", () => {
    const { container, render } = mountModal({});
    act(() => buttonByText("providers.bulkTabBulkAdd")?.click());
    const textarea = container.querySelector("textarea");
    expect(textarea).not.toBeNull();
    setFieldValue(textarea as HTMLTextAreaElement, "first|sk-one\nsecond|sk-two");

    closeAndReopen(render);

    // Back on the single-key form, not the bulk tab.
    expect(container.querySelector("textarea")).toBeNull();
    expect(apiKeyInput(container)).not.toBeNull();
    act(() => buttonByText("providers.bulkTabBulkAdd")?.click());
    expect(container.querySelector("textarea")?.value).toBe("");
  });

  it("starts empty after a successful save closes the modal", async () => {
    const onSave = vi.fn().mockResolvedValue(undefined);
    const { container, render } = mountModal({ onSave });
    setFieldValue(apiKeyInput(container) as HTMLInputElement, "sk-saved-key");

    await act(async () => {
      buttonByText("providers.save")?.click();
    });
    expect(onSave).toHaveBeenCalledTimes(1);
    expect(onSave.mock.calls[0][0]).toMatchObject({ apiKey: "sk-saved-key", name: "main" });

    // The parent closes the modal after a successful save, then the user adds another key.
    closeAndReopen(render, { existingConnectionNames: ["main"] });

    expect(apiKeyInput(container)?.value).toBe("");
    expect(nameInput(container)?.value).toBe("main-2");
  });

  it("replaces an edited name with a fresh unique default on reopen", () => {
    const { container, render } = mountModal({ existingConnectionNames: ["main"] });
    expect(nameInput(container)?.value).toBe("main-2");
    setFieldValue(nameInput(container) as HTMLInputElement, "my-custom-name");

    closeAndReopen(render, { existingConnectionNames: ["main", "my-custom-name"] });

    expect(nameInput(container)?.value).toBe("main-2");
  });

  it("keeps the typed input and shows the error when the save fails", async () => {
    const onSave = vi.fn().mockResolvedValue("upstream rejected the key");
    const { container } = mountModal({ onSave });
    setFieldValue(apiKeyInput(container) as HTMLInputElement, "sk-rejected-key");

    await act(async () => {
      buttonByText("providers.save")?.click();
    });

    expect(onSave).toHaveBeenCalledTimes(1);
    expect(apiKeyInput(container)?.value).toBe("sk-rejected-key");
    expect(container.textContent).toContain("upstream rejected the key");
  });
});
