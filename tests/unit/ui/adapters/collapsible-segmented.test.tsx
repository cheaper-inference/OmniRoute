// @vitest-environment jsdom
import React from "react";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

const { default: Collapsible } = await import("@/shared/components/Collapsible");
const { default: CollapsibleSection } = await import("@/shared/components/CollapsibleSection");
const { default: SegmentedControl } = await import("@/shared/components/SegmentedControl");

afterEach(() => cleanup());

describe("Collapsible / CollapsibleSection / SegmentedControl adapters", () => {
  it("Collapsible toggles with a single native button carrying aria-expanded; trailing stays outside", () => {
    render(
      <Collapsible
        title="Advanced"
        subtitle="more"
        icon="tune"
        trailing={<button type="button">Act</button>}
      >
        body
      </Collapsible>
    );
    const trigger = screen.getByRole("button", { name: /Advanced/ });
    expect(trigger.getAttribute("aria-expanded")).toBe("false");
    expect(trigger.querySelector("button")).toBeNull();
    fireEvent.click(trigger);
    expect(trigger.getAttribute("aria-expanded")).toBe("true");
    expect(screen.getByText("body")).not.toBeNull();
    expect(screen.getByRole("button", { name: "Act" }).closest("button[aria-expanded]")).toBeNull();
  });

  it("CollapsibleSection opens by default when asked and shows the count badge", () => {
    render(
      <CollapsibleSection title="Items" count={3} defaultOpen>
        inner
      </CollapsibleSection>
    );
    expect(screen.getByRole("button", { name: /Items/ }).getAttribute("aria-expanded")).toBe(
      "true"
    );
    expect(screen.getByText("3").className).toContain("ci-badge");
    expect(screen.getByText("inner")).not.toBeNull();
  });

  it("SegmentedControl is a tablist with aria-selected and reports onChange", () => {
    const onChange = vi.fn();
    render(
      <SegmentedControl
        aria-label="View"
        value="a"
        onChange={onChange}
        options={[
          { value: "a", label: "A", icon: "view_list" },
          { value: "b", label: "B" },
        ]}
      />
    );
    const tabs = screen.getAllByRole("tab");
    expect(screen.getByRole("tablist", { name: "View" })).not.toBeNull();
    expect(tabs[0].getAttribute("aria-selected")).toBe("true");
    expect(tabs[0].querySelector("svg.oi-icon")).not.toBeNull();
    // No TabsContent is rendered, so no tab may point at a (missing) panel.
    for (const tab of tabs) expect(tab.hasAttribute("aria-controls")).toBe(false);
    fireEvent.click(tabs[1]);
    expect(onChange).toHaveBeenCalledWith("b");
  });

  it("SegmentedControl maps size onto the triggers and keeps the full-width phone layout", () => {
    render(
      <SegmentedControl
        aria-label="Density"
        size="sm"
        value="a"
        options={[
          { value: "a", label: "A" },
          { value: "b", label: "B" },
        ]}
      />
    );
    const list = screen.getByRole("tablist", { name: "Density" });
    expect(list.className).toContain("w-full");
    expect(list.className).toContain("sm:w-auto");
    expect(list.className).toContain("[&>*]:flex-1");
    expect(list.className).toContain("sm:[&>*]:flex-none");
    for (const tab of screen.getAllByRole("tab")) {
      expect(tab.className).toContain("h-7");
      // The kit capsule trigger has a ~30px min-height that would beat h-7 alone.
      expect(tab.className).toContain("min-h-7");
      expect(tab.className).toContain("text-xs");
    }
  });

  it("a closed CollapsibleSection keeps its content out of the tab order", () => {
    render(
      <CollapsibleSection title="Closed" defaultOpen={false}>
        <button type="button">Hidden action</button>
      </CollapsibleSection>
    );
    const hidden = screen.getByText("Hidden action");
    expect(hidden.closest("[inert]")).not.toBeNull();
    fireEvent.click(screen.getByRole("button", { name: /Closed/ }));
    expect(screen.getByText("Hidden action").closest("[inert]")).toBeNull();
  });

  it("Collapsible lets a long title shrink so it can truncate", () => {
    render(<Collapsible title="A very long title">body</Collapsible>);
    const trigger = screen.getByRole("button", { name: /A very long title/ });
    expect(trigger.className).toContain("[&>span:first-child]:min-w-0");
  });
});
