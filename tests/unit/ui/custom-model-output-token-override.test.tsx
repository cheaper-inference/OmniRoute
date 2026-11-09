// @vitest-environment jsdom
/**
 * Custom-model rows can carry a manual max-output-tokens override.
 *
 * The backend already persists `maxOutputTokenOverride` through PUT /api/provider-models and
 * the GET row already returns it, but CustomModelsSection never read or sent it. These cover
 * the editor's half of that contract (mirrors the #4125 context-window semantics):
 *  1) the row loads the stored override into the edit field.
 *  2) a value is sent as a number.
 *  3) a blank value is sent as null (clears the override).
 *  4) invalid text reports an error and never issues the PUT.
 */
import React, { act } from "react";
import { createRoot } from "react-dom/client";
import { describe, it, expect, vi, afterEach, beforeEach } from "vitest";

const notify = vi.hoisted(() => ({ error: vi.fn(), success: vi.fn() }));

vi.mock("next-intl", () => ({
  useTranslations: () => (key: string) => key,
}));

vi.mock("@/store/notificationStore", () => ({
  useNotificationStore: () => notify,
}));

vi.mock("@/shared/components", () => ({
  CapabilityBadge: ({ children, title }: any) => <span title={title}>{children}</span>,
  // The row's edit control is the shared icon Button since KEA-7886, so the stand-in keeps the
  // title the test finds it by; the editor fields render through the kit adapters, and plain
  // native stand-ins keep the DOM contract the assertions read (input[placeholder="4096"]).
  Button: ({ children, onClick, disabled, title }: any) => (
    <button onClick={onClick} disabled={disabled} title={title}>
      {children}
    </button>
  ),
  Input: ({ label: _label, inputClassName: _cls, ...props }: any) => <input {...props} />,
  Select: ({ label: _label, selectClassName: _cls, children, ...props }: any) => (
    <select {...props}>{children}</select>
  ),
  Checkbox: ({ label: _label, ...props }: any) => <input type="checkbox" {...props} />,
}));

vi.mock(
  "../../../src/app/(dashboard)/dashboard/providers/[id]/components/ModelCompatPopover",
  () => ({ default: () => null })
);

const { default: CustomModelsSection } =
  await import("../../../src/app/(dashboard)/dashboard/providers/[id]/components/CustomModelsSection");

// React tracks input values itself, so a plain `input.value =` never reaches onChange.
const setInputValue = (input: HTMLInputElement, value: string) => {
  const setter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, "value")!.set!;
  setter.call(input, value);
  input.dispatchEvent(new Event("input", { bubbles: true }));
};

const containers: Array<{ root: ReturnType<typeof createRoot>; el: HTMLDivElement }> = [];
const puts: Array<Record<string, unknown>> = [];
const originalFetch = globalThis.fetch;

function stubFetch(maxOutputTokenOverride: number | null) {
  globalThis.fetch = vi.fn(async (_url: unknown, init?: RequestInit) => {
    if (init?.method === "PUT") {
      puts.push(JSON.parse(String(init.body)));
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
            ...(maxOutputTokenOverride === null ? {} : { maxOutputTokenOverride }),
          },
        ],
        modelCompatOverrides: [],
      }),
      { status: 200 }
    );
  }) as typeof fetch;
}

async function mountAndEdit() {
  const el = document.createElement("div");
  document.body.appendChild(el);
  const root = createRoot(el);
  await act(async () => {
    root.render(
      <CustomModelsSection providerId="openai-compatible-x" providerAlias="x" onCopy={() => {}} />
    );
  });
  containers.push({ root, el });
  const editButton = [...el.querySelectorAll("button")].find(
    (b) => b.getAttribute("title") === "edit"
  )!;
  await act(async () => editButton.click());
  return el;
}

const maxOutputInput = (el: HTMLElement) =>
  el.querySelector('input[placeholder="4096"]') as HTMLInputElement;

const clickSave = async (el: HTMLElement) => {
  const save = [...el.querySelectorAll("button")].find((b) => b.textContent === "save")!;
  await act(async () => save.click());
};

beforeEach(() => {
  puts.length = 0;
  notify.error.mockClear();
  notify.success.mockClear();
});

afterEach(() => {
  globalThis.fetch = originalFetch;
  for (const { root, el } of containers.splice(0)) {
    act(() => root.unmount());
    el.remove();
  }
});

describe("custom models can carry a max-output-tokens override", () => {
  it("seeds the edit field with the stored override", async () => {
    stubFetch(8192);
    const el = await mountAndEdit();
    expect(maxOutputInput(el).value).toBe("8192");
  });

  it("sends a typed value as a number", async () => {
    stubFetch(null);
    const el = await mountAndEdit();
    expect(maxOutputInput(el).value).toBe("");
    await act(async () => setInputValue(maxOutputInput(el), "16384"));
    await clickSave(el);
    expect(puts).toHaveLength(1);
    expect(puts[0].maxOutputTokenOverride).toBe(16384);
  });

  it("sends null when the field is blank so the override is cleared", async () => {
    stubFetch(8192);
    const el = await mountAndEdit();
    await act(async () => setInputValue(maxOutputInput(el), ""));
    await clickSave(el);
    expect(puts).toHaveLength(1);
    expect(puts[0].maxOutputTokenOverride).toBeNull();
  });

  it("reports invalid text and does not issue the PUT", async () => {
    stubFetch(null);
    const el = await mountAndEdit();
    await act(async () => setInputValue(maxOutputInput(el), "lots"));
    await clickSave(el);
    expect(puts).toHaveLength(0);
    expect(notify.error).toHaveBeenCalledWith("maxOutputTokenOverrideInvalid");
  });
});
