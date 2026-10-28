// @vitest-environment jsdom
//
// Phase 1b regression test for Issue #3501. EditCompatibleNodeModal was extracted
// out of the god-component into a standalone file (its node/props types co-moved,
// the shared CC_COMPATIBLE_DEFAULT_CHAT_PATH constant pulled into a leaf module to
// keep the import graph acyclic). Proves it mounts in isolation (Hard Rule #8).
import React, { act } from "react";
import { createRoot } from "react-dom/client";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import EditCompatibleNodeModal from "../EditCompatibleNodeModal";

vi.mock("next-intl", () => ({
  useTranslations: (ns?: string) => (k: string) => (ns ? `${ns}.${k}` : k),
}));

const cleanups: Array<() => void> = [];

function renderModal(node: React.ReactElement) {
  const container = document.createElement("div");
  document.body.appendChild(container);
  const root = createRoot(container);
  act(() => root.render(node));
  cleanups.push(() => {
    act(() => root.unmount());
    container.remove();
  });
  // The shared Modal is a kit Dialog (Radix) since KEA-7886: its content is portaled to
  // document.body, so queries start there (the container is a child of body).
  return document.body;
}

describe("EditCompatibleNodeModal (Phase 1b extraction)", () => {
  beforeEach(() => {
    (
      globalThis as typeof globalThis & { IS_REACT_ACT_ENVIRONMENT?: boolean }
    ).IS_REACT_ACT_ENVIRONMENT = true;
  });

  afterEach(() => {
    while (cleanups.length) cleanups.pop()?.();
    document.body.innerHTML = "";
  });

  it("mounts standalone when open", () => {
    const c = renderModal(
      <EditCompatibleNodeModal
        isOpen
        node={{ id: "n1", name: "Node", baseUrl: "https://x" }}
        onSave={async () => {}}
        onClose={() => {}}
        isCcCompatible
      />
    );
    expect(c.querySelector('[role="dialog"]')).not.toBeNull();
  });

  function quotaSwitch(root: HTMLElement) {
    return root.querySelector<HTMLInputElement>(
      'input[role="switch"][aria-label="providers.quotaCheck"]'
    );
  }

  function quotaPathInput(root: HTMLElement) {
    return root.querySelector<HTMLInputElement>('input[placeholder="/credits"]');
  }

  function clickSave(root: HTMLElement) {
    const save = Array.from(root.querySelectorAll("button")).find(
      (button) => button.textContent === "providers.save"
    );
    expect(save).toBeDefined();
    act(() => save?.click());
  }

  function typeInto(input: HTMLInputElement, value: string) {
    const setter = Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, "value")?.set;
    act(() => {
      setter?.call(input, value);
      input.dispatchEvent(new Event("input", { bubbles: true }));
    });
  }

  it("Quota check toggle submits the standard /credits path when switched on", async () => {
    const onSave = vi.fn(async () => {});
    const c = renderModal(
      <EditCompatibleNodeModal
        isOpen
        node={{ id: "anthropic-compatible-x", name: "Node", prefix: "nd", baseUrl: "https://x" }}
        onSave={onSave}
        onClose={() => {}}
        isAnthropic
      />
    );
    const toggle = quotaSwitch(c);
    expect(toggle).not.toBeNull();
    expect(toggle?.checked).toBe(false);
    expect(quotaPathInput(c)).toBeNull();

    act(() => toggle?.click());
    expect(quotaPathInput(c)?.value).toBe("/credits");

    clickSave(c);
    await act(async () => {});
    expect(onSave).toHaveBeenCalledTimes(1);
    expect(onSave.mock.calls[0][0]).toMatchObject({
      quotaCheck: { enabled: true, path: "/credits" },
    });
  });

  it("Quota check reflects the connections' state and can be switched off", async () => {
    const onSave = vi.fn(async () => {});
    const c = renderModal(
      <EditCompatibleNodeModal
        isOpen
        node={{
          id: "openai-compatible-chat-x",
          name: "Node",
          prefix: "nd",
          baseUrl: "https://x/v1",
          quotaCheck: { enabled: true, path: "/balance" },
        }}
        onSave={onSave}
        onClose={() => {}}
      />
    );
    expect(quotaSwitch(c)?.checked).toBe(true);
    const pathInput = quotaPathInput(c);
    expect(pathInput?.value).toBe("/balance");
    typeInto(pathInput as HTMLInputElement, "/v2/balance");
    clickSave(c);
    await act(async () => {});
    expect(onSave.mock.calls[0][0]).toMatchObject({
      quotaCheck: { enabled: true, path: "/v2/balance" },
    });

    act(() => quotaSwitch(c)?.click());
    expect(quotaPathInput(c)).toBeNull();
    clickSave(c);
    await act(async () => {});
    expect(onSave.mock.calls[1][0]).toMatchObject({ quotaCheck: { enabled: false } });
  });

  it("renders nothing harmful when closed", () => {
    expect(() =>
      renderModal(
        <EditCompatibleNodeModal
          isOpen={false}
          node={null}
          onSave={async () => {}}
          onClose={() => {}}
        />
      )
    ).not.toThrow();
  });
});
