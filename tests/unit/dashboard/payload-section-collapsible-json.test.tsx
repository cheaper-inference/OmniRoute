// @vitest-environment jsdom
//
// Regression guard: PayloadSection rendered every payload (request/response
// bodies, pipeline stages) as a flat <pre> text dump, forcing operators to
// scroll through the entire raw JSON to find anything in a nested request.
// It now renders parseable JSON payloads as a collapsible tree
// (the kit JsonTree) instead, while still falling back to the plain
// <pre> dump for anything that isn't valid JSON (e.g. a captured error
// string), since the `json` prop is display text that isn't guaranteed
// parseable.
import React, { act } from "react";
import { createRoot, type Root } from "react-dom/client";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";

vi.mock("next-intl", () => ({
  useTranslations: () => (key: string) => key,
}));

vi.mock("@/shared/hooks/useTheme", () => ({
  useTheme: () => ({ isDark: false }),
}));

const { PayloadSection } =
  await import("../../../src/shared/components/RequestLoggerDetail.sections.tsx");
const { default: useJsonTreeExpandStore } = await import("../../../src/store/jsonTreeExpandStore");

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
  act(() => useJsonTreeExpandStore.setState({ levels: {} }));
});

function renderPayload(json: string) {
  act(() => {
    root.render(
      <PayloadSection title="Test Payload" json={json} onCopy={vi.fn().mockResolvedValue(true)} />
    );
  });
}

describe("PayloadSection collapsible JSON rendering", () => {
  it("renders a valid JSON object payload as a collapsible tree, not a flat <pre> dump", () => {
    renderPayload(JSON.stringify({ model: "gpt-5.6-luna", input: [{ role: "user" }] }, null, 2));

    expect(container.querySelector("pre")).toBeNull();
    // The tree names itself and every copy button on its rows.
    expect(container.querySelectorAll("[aria-label]").length).toBeGreaterThan(0);
    expect(container.textContent).toContain("model");
    expect(container.textContent).toContain("gpt-5.6-luna");
  });

  it("renders a valid JSON array payload as a collapsible tree", () => {
    renderPayload(JSON.stringify([{ type: "output_text", text: "answer" }], null, 2));

    expect(container.querySelector("pre")).toBeNull();
    expect(container.textContent).toContain("output_text");
  });

  it("falls back to the plain <pre> dump for non-JSON payload text", () => {
    renderPayload("Upstream request failed: Model is unavailable.");

    const pre = container.querySelector("pre");
    expect(pre).not.toBeNull();
    expect(pre?.textContent).toBe("Upstream request failed: Model is unavailable.");
  });

  it("falls back to the plain <pre> dump for a JSON primitive (not an object/array)", () => {
    renderPayload(JSON.stringify("just a string"));

    const pre = container.querySelector("pre");
    expect(pre).not.toBeNull();
  });

  it("renders the kit JsonTree, named after the section", () => {
    renderPayload(JSON.stringify({ model: "gpt-5.6-luna" }));

    const tree = container.querySelector('[role="tree"]');
    expect(tree?.getAttribute("aria-label")).toBe("Test Payload");
    // The section keeps its own level controls, so the tree's expand-all row stays hidden.
    expect(container.querySelector(".ci-json-tree__controls")).toBeNull();
  });

  it("opens the tree to the section's stored expand level and follows its changes", () => {
    renderPayload(JSON.stringify({ a: { b: { c: 1 } } }));
    const rows = () => container.querySelectorAll('[role="treeitem"]').length;
    expect(rows()).toBe(3);

    act(() => useJsonTreeExpandStore.getState().collapseAll("Test Payload"));
    expect(rows()).toBe(1);

    act(() => useJsonTreeExpandStore.getState().expandAll("Test Payload"));
    expect(rows()).toBe(4);
  });

  it("folds one node on click without touching the section's level", () => {
    renderPayload(JSON.stringify({ a: { b: 1 } }));
    const rows = () => container.querySelectorAll<HTMLElement>('[role="treeitem"]');
    expect(rows()).toHaveLength(3);

    act(() => rows()[1].querySelector<HTMLElement>('[data-action="toggle"]')?.click());
    expect(rows()).toHaveLength(2);
    expect(useJsonTreeExpandStore.getState().levels["Test Payload"]).toBeUndefined();
  });

  it("copies one node's value from the tree", async () => {
    const writeText = vi.fn().mockResolvedValue(undefined);
    Object.defineProperty(navigator, "clipboard", { configurable: true, value: { writeText } });
    renderPayload(JSON.stringify({ model: "gpt-5.6-luna" }));

    await act(async () => {
      container.querySelector<HTMLElement>('[data-action="copy-value"]')?.click();
    });

    expect(JSON.parse(writeText.mock.calls[0][0])).toEqual({ model: "gpt-5.6-luna" });
  });
});
