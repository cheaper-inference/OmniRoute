// @vitest-environment jsdom
import React, { act } from "react";
import { createRoot, type Root } from "react-dom/client";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import PayloadRulesTab from "@/app/(dashboard)/dashboard/settings/components/PayloadRulesTab";

vi.mock("next-intl", () => ({
  useTranslations: () => (key: string) => key,
}));

const roots: Array<{ root: Root; el: HTMLDivElement }> = [];

async function waitFor(predicate: () => boolean, label: string): Promise<void> {
  const startedAt = Date.now();
  while (!predicate()) {
    if (Date.now() - startedAt > 2000) throw new Error(`Timed out waiting for: ${label}`);
    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 10));
    });
  }
}

function typeInto(textarea: HTMLTextAreaElement, value: string) {
  const setter = Object.getOwnPropertyDescriptor(HTMLTextAreaElement.prototype, "value")?.set;
  act(() => {
    setter?.call(textarea, value);
    textarea.dispatchEvent(new Event("input", { bubbles: true }));
  });
}

async function mount(): Promise<HTMLDivElement> {
  const el = document.createElement("div");
  document.body.appendChild(el);
  const root = createRoot(el);
  roots.push({ root, el });
  await act(async () => {
    root.render(<PayloadRulesTab />);
  });
  await waitFor(() => {
    const textarea = el.querySelector("textarea");
    return Boolean(textarea && !textarea.disabled);
  }, "payload rules loaded");
  return el;
}

describe("PayloadRulesTab JSON editor (KEA-7886, lote 5b)", () => {
  beforeEach(() => {
    (globalThis as { IS_REACT_ACT_ENVIRONMENT?: boolean }).IS_REACT_ACT_ENVIRONMENT = true;
    vi.stubGlobal(
      "fetch",
      vi.fn(async () => Response.json({ default: [], override: [], filter: [] }))
    );
  });

  afterEach(() => {
    for (const { root, el } of roots.splice(0)) {
      act(() => root.unmount());
      el.remove();
    }
    vi.unstubAllGlobals();
  });

  it("labels the editor through its field label and describes it with the hint", async () => {
    const el = await mount();
    const textarea = el.querySelector("textarea") as HTMLTextAreaElement;

    expect(textarea.id).not.toBe("");
    const label = el.querySelector(`label[for="${textarea.id}"]`);
    expect(label?.textContent).toContain("payloadEditorTitle");

    expect(textarea.getAttribute("aria-invalid")).toBeNull();
    const describedBy = textarea.getAttribute("aria-describedby");
    expect(describedBy).toBeTruthy();
    expect(document.getElementById(describedBy as string)?.textContent).toContain(
      "payloadEditorDesc"
    );
  });

  it("ties the JSON parse error to the editor instead of a loose paragraph", async () => {
    const el = await mount();
    const textarea = el.querySelector("textarea") as HTMLTextAreaElement;

    typeInto(textarea, "{ not json");

    expect(textarea.getAttribute("aria-invalid")).toBe("true");
    const describedBy = textarea.getAttribute("aria-describedby");
    expect(describedBy).toBeTruthy();
    const message = document.getElementById(describedBy as string);
    expect(message?.textContent).toContain("payloadJsonParseError");
    expect(message?.getAttribute("role")).toBe("alert");
    // exactly one rendering of the parse error
    const alerts = Array.from(el.querySelectorAll('[role="alert"]')).filter((node) =>
      node.textContent?.includes("payloadJsonParseError")
    );
    expect(alerts).toHaveLength(1);
  });
});
