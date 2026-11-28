// @vitest-environment jsdom
/**
 * The add and edit forms of a custom model carry an opt-in "Thinking capable" checkbox:
 *  1) add: unchecked sends no supportsThinking key; checked sends `supportsThinking: true`.
 *  2) edit: the box starts from the stored flag; saving sends true when checked, null (clear) when not.
 */
import React, { act } from "react";
import { createRoot } from "react-dom/client";
import { describe, it, expect, vi, afterEach, beforeEach } from "vitest";

vi.mock("next-intl", () => ({
  useTranslations: () => (key: string) => key,
}));

vi.mock("@/store/notificationStore", () => ({
  useNotificationStore: () => ({ error: vi.fn(), success: vi.fn() }),
}));

vi.mock("@/shared/components", () => ({
  CapabilityBadge: ({ children, title }: any) => <span title={title}>{children}</span>,
  Button: ({ children, onClick, disabled, title }: any) => (
    <button onClick={onClick} disabled={disabled} title={title}>
      {children}
    </button>
  ),
  Input: ({ label: _label, inputClassName: _cls, ...props }: any) => <input {...props} />,
  Select: ({ label: _label, selectClassName: _cls, children, ...props }: any) => (
    <select {...props}>{children}</select>
  ),
  Checkbox: ({ label, ...props }: any) => <input type="checkbox" aria-label={label} {...props} />,
}));

vi.mock(
  "../../../src/app/(dashboard)/dashboard/providers/[id]/components/ModelCompatPopover",
  () => ({ default: () => null })
);

const { default: CustomModelsSection } =
  await import("../../../src/app/(dashboard)/dashboard/providers/[id]/components/CustomModelsSection");

const setInputValue = (input: HTMLInputElement, value: string) => {
  const setter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, "value")!.set!;
  setter.call(input, value);
  input.dispatchEvent(new Event("input", { bubbles: true }));
};

const containers: Array<{ root: ReturnType<typeof createRoot>; el: HTMLDivElement }> = [];
const sent: Array<{ method: string; body: Record<string, unknown> }> = [];
const originalFetch = globalThis.fetch;

function stubFetch(storedThinking: boolean) {
  globalThis.fetch = vi.fn(async (_url: unknown, init?: RequestInit) => {
    if (init?.method === "PUT" || init?.method === "POST") {
      sent.push({ method: init.method, body: JSON.parse(String(init.body)) });
      return new Response(JSON.stringify({ ok: true }), { status: 200 });
    }
    return new Response(
      JSON.stringify({
        models: [
          {
            id: "my-model",
            name: "My Model",
            source: "manual",
            apiFormat: "chat-completions",
            supportedEndpoints: ["chat"],
            ...(storedThinking ? { supportsThinking: true } : {}),
          },
        ],
        modelCompatOverrides: [],
      }),
      { status: 200 }
    );
  }) as typeof fetch;
}

async function mount() {
  const el = document.createElement("div");
  document.body.appendChild(el);
  const root = createRoot(el);
  await act(async () => {
    root.render(
      <CustomModelsSection providerId="openai-compatible-x" providerAlias="x" onCopy={() => {}} />
    );
  });
  containers.push({ root, el });
  return el;
}

const thinkingBoxes = (el: HTMLElement) => [
  ...el.querySelectorAll<HTMLInputElement>('input[aria-label="thinkingCapableLabel"]'),
];
const click = async (button: Element | undefined) => {
  expect(button).toBeDefined();
  await act(async () => (button as HTMLElement).click());
};
const buttonByText = (el: HTMLElement, text: string) =>
  [...el.querySelectorAll("button")].find((b) => b.textContent === text);

beforeEach(() => {
  sent.length = 0;
});
afterEach(() => {
  globalThis.fetch = originalFetch;
  for (const { root, el } of containers.splice(0)) {
    act(() => root.unmount());
    el.remove();
  }
});

describe("custom model Thinking capable checkbox", () => {
  it("add form: sends supportsThinking only when checked", async () => {
    stubFetch(false);
    const el = await mount();
    const idInput = el.querySelector<HTMLInputElement>(
      'input[placeholder="customModelPlaceholder"]'
    );
    expect(idInput).not.toBeNull();

    await act(async () => setInputValue(idInput!, "plain-model"));
    await click(buttonByText(el, "add"));
    expect(sent[0].method).toBe("POST");
    expect("supportsThinking" in sent[0].body).toBe(false);

    await act(async () => setInputValue(idInput!, "marked-model"));
    expect(thinkingBoxes(el)).toHaveLength(1);
    await click(thinkingBoxes(el)[0]);
    await click(buttonByText(el, "add"));
    expect(sent[1].body.supportsThinking).toBe(true);
  });

  it("edit form: starts from the stored flag and saves true, or null to clear", async () => {
    stubFetch(true);
    const el = await mount();
    await click([...el.querySelectorAll("button")].find((b) => b.getAttribute("title") === "edit"));

    const editBox = thinkingBoxes(el)[1];
    expect(editBox.checked).toBe(true);
    await click(buttonByText(el, "save"));
    expect(sent[0].method).toBe("PUT");
    expect(sent[0].body.supportsThinking).toBe(true);

    await click([...el.querySelectorAll("button")].find((b) => b.getAttribute("title") === "edit"));
    await click(thinkingBoxes(el)[1]);
    await click(buttonByText(el, "save"));
    expect(sent[1].body.supportsThinking).toBeNull();
  });
});
