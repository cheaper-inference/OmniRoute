// @vitest-environment jsdom
//
// Optional "Provider ID suffix" field of the compatible-provider Add modal: a filled
// suffix is sent as `providerIdSuffix` (trimmed), a blank one is omitted so the server
// keeps the random UUID, and a 409 duplicate-id response surfaces the localized
// conflict message.
import React, { act } from "react";
import { createRoot } from "react-dom/client";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";

vi.mock("next-intl", () => ({
  useTranslations: () => (key: string) => key,
}));

const { default: AddCompatibleProviderModal } =
  await import("../../../src/app/(dashboard)/dashboard/providers/components/AddCompatibleProviderModal");

const containers: Array<{ root: ReturnType<typeof createRoot>; el: HTMLDivElement }> = [];

type ModalProps = React.ComponentProps<typeof AddCompatibleProviderModal>;

function render(props: Partial<ModalProps>) {
  const el = document.createElement("div");
  document.body.appendChild(el);
  const root = createRoot(el);
  const renderProps = (nextProps: Partial<ModalProps>) => {
    act(() => {
      root.render(
        <AddCompatibleProviderModal
          isOpen
          mode="openai"
          onClose={() => {}}
          onCreated={() => {}}
          {...nextProps}
        />
      );
    });
  };
  renderProps(props);
  containers.push({ root, el });
  return { el, rerender: renderProps };
}

function inputByLabel(el: Element, label: string): HTMLInputElement {
  const inputs = Array.from(el.querySelectorAll<HTMLInputElement>("input"));
  const found = inputs.find((i) => {
    const labelEl = i.previousElementSibling || i.parentElement?.previousElementSibling;
    return labelEl?.textContent === label;
  });
  if (!found) throw new Error(`No input for label: ${label}`);
  return found;
}

function setInputValue(input: HTMLInputElement, value: string) {
  const setter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, "value")!.set!;
  act(() => {
    setter.call(input, value);
    input.dispatchEvent(new Event("input", { bubbles: true }));
  });
}

async function waitFor(fn: () => boolean, timeoutMs = 2000) {
  const start = Date.now();
  while (!fn()) {
    if (Date.now() - start > timeoutMs) throw new Error("waitFor timed out");
    await new Promise((r) => setTimeout(r, 20));
  }
}

beforeEach(() => {
  vi.clearAllMocks();
  vi.stubGlobal(
    "fetch",
    vi.fn(() =>
      Promise.resolve({ ok: true, json: () => Promise.resolve({ node: {} }) } as Response)
    )
  );
});

afterEach(() => {
  for (const { root, el } of containers.splice(0)) {
    act(() => root.unmount());
    el.remove();
  }
  vi.unstubAllGlobals();
});

describe("AddCompatibleProviderModal — provider ID suffix", () => {
  function fillRequired(modal: Element) {
    setInputValue(inputByLabel(modal, "nameLabel"), "My Node");
    setInputValue(inputByLabel(modal, "prefixLabel"), "mynode");
  }

  function clickAdd(modal: Element) {
    const buttons = Array.from(modal.querySelectorAll<HTMLButtonElement>("button"));
    const addBtn = buttons.find((b) => b.textContent === "add");
    act(() => addBtn!.click());
  }

  it("sends the trimmed suffix as providerIdSuffix", async () => {
    const { el } = render({});
    const modal = el.querySelector('[role="dialog"]')!;
    fillRequired(modal);
    setInputValue(inputByLabel(modal, "providerIdSuffixLabel"), "  team-gw  ");

    clickAdd(modal);
    await waitFor(() => (fetch as ReturnType<typeof vi.fn>).mock.calls.length > 0);

    const call = (fetch as ReturnType<typeof vi.fn>).mock.calls[0];
    expect(String(call[0])).toBe("/api/provider-nodes");
    const body = JSON.parse(String(call[1].body));
    expect(body.providerIdSuffix).toBe("team-gw");
  });

  it("omits providerIdSuffix when left blank (server keeps the UUID)", async () => {
    const { el } = render({ mode: "anthropic" });
    const modal = el.querySelector('[role="dialog"]')!;
    fillRequired(modal);
    setInputValue(inputByLabel(modal, "providerIdSuffixLabel"), "   ");

    clickAdd(modal);
    await waitFor(() => (fetch as ReturnType<typeof vi.fn>).mock.calls.length > 0);

    const body = JSON.parse(String((fetch as ReturnType<typeof vi.fn>).mock.calls[0][1].body));
    expect("providerIdSuffix" in body).toBe(false);
  });

  it("shows the localized conflict message on 409", async () => {
    const onCreated = vi.fn();
    vi.stubGlobal(
      "fetch",
      vi.fn(() =>
        Promise.resolve({
          ok: false,
          status: 409,
          json: () => Promise.resolve({ error: { message: "Provider node ID already exists" } }),
        } as Response)
      )
    );
    const { el } = render({ onCreated });
    const modal = el.querySelector('[role="dialog"]')!;
    fillRequired(modal);
    setInputValue(inputByLabel(modal, "providerIdSuffixLabel"), "shared");

    clickAdd(modal);
    await waitFor(() => modal.textContent?.includes("providerIdConflict") ?? false);

    expect(modal.querySelector('[role="alert"]')?.textContent).toBe("providerIdConflict");
    expect(onCreated).not.toHaveBeenCalled();
  });
});
