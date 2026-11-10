// @vitest-environment jsdom
import React from "react";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

const { default: Collapsible } = await import("@/shared/components/Collapsible");
const { default: CollapsibleSection } = await import("@/shared/components/CollapsibleSection");
const {
  default: SegmentedControl,
  SegmentedPanel,
  SegmentedTabs,
} = await import("@/shared/components/SegmentedControl");

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

  it('SegmentedControl semantics="radio" is a radiogroup with aria-checked and reports onChange', () => {
    const onChange = vi.fn();
    render(
      <SegmentedControl
        semantics="radio"
        aria-label="Period"
        value="a"
        onChange={onChange}
        options={[
          { value: "a", label: "A", icon: "view_list" },
          { value: "b", label: "B" },
        ]}
      />
    );
    const group = screen.getByRole("radiogroup", { name: "Period" });
    const radios = screen.getAllByRole("radio");
    expect(screen.queryByRole("tablist")).toBeNull();
    expect(screen.queryByRole("tab")).toBeNull();
    expect(group.contains(radios[0])).toBe(true);
    expect(radios[0].getAttribute("aria-checked")).toBe("true");
    expect(radios[1].getAttribute("aria-checked")).toBe("false");
    expect(radios[0].querySelector("svg.oi-icon")).not.toBeNull();
    for (const radio of radios) {
      expect(radio.hasAttribute("aria-selected")).toBe(false);
      expect(radio.hasAttribute("aria-controls")).toBe(false);
    }
    fireEvent.click(radios[1]);
    expect(onChange).toHaveBeenCalledWith("b");
  });

  it("the radio arrows move the selection, wrap around, and keep one tab stop", () => {
    function Harness() {
      const [value, setValue] = React.useState("a");
      return (
        <SegmentedControl
          semantics="radio"
          aria-label="Density"
          value={value}
          onChange={setValue}
          options={[
            { value: "a", label: "A" },
            { value: "b", label: "B" },
            { value: "c", label: "C" },
          ]}
        />
      );
    }
    render(<Harness />);
    const radio = (name: string) => screen.getByRole("radio", { name });
    const stops = () => screen.getAllByRole("radio").filter((item) => item.tabIndex === 0);

    expect(stops()).toEqual([radio("A")]);
    radio("A").focus();
    fireEvent.keyDown(radio("A"), { key: "ArrowRight" });
    expect(radio("B").getAttribute("aria-checked")).toBe("true");
    expect(document.activeElement).toBe(radio("B"));
    expect(stops()).toEqual([radio("B")]);
    fireEvent.keyDown(radio("B"), { key: "ArrowDown" });
    expect(radio("C").getAttribute("aria-checked")).toBe("true");
    fireEvent.keyDown(radio("C"), { key: "ArrowRight" });
    expect(radio("A").getAttribute("aria-checked")).toBe("true");
    fireEvent.keyDown(radio("A"), { key: "ArrowLeft" });
    expect(radio("C").getAttribute("aria-checked")).toBe("true");
    fireEvent.keyDown(radio("C"), { key: "ArrowUp" });
    expect(radio("B").getAttribute("aria-checked")).toBe("true");
    fireEvent.keyDown(radio("B"), { key: "Home" });
    expect(radio("A").getAttribute("aria-checked")).toBe("true");
    fireEvent.keyDown(radio("A"), { key: "End" });
    expect(radio("C").getAttribute("aria-checked")).toBe("true");
  });

  it("a radio group with no matching value stays reachable from the keyboard", () => {
    render(
      <SegmentedControl
        semantics="radio"
        aria-label="Scope"
        value="missing"
        options={[
          { value: "a", label: "A" },
          { value: "b", label: "B" },
        ]}
      />
    );
    const radios = screen.getAllByRole("radio");
    expect(radios.map((item) => item.tabIndex)).toEqual([0, -1]);
  });

  it("the selected radio keeps the semibold weight the kit keys on aria-selected", () => {
    render(
      <SegmentedControl
        semantics="radio"
        aria-label="Weight"
        value="a"
        options={[
          { value: "a", label: "A" },
          { value: "b", label: "B" },
        ]}
      />
    );
    const [checked, unchecked] = screen.getAllByRole("radio");
    expect(checked.className).toContain("font-semibold");
    expect(unchecked.className).not.toContain("font-semibold");
  });

  it('SegmentedControl semantics="tabs" drives real panels through SegmentedTabs', () => {
    function Harness() {
      const [value, setValue] = React.useState("a");
      return (
        <SegmentedTabs value={value} onChange={setValue}>
          <div data-testid="elsewhere">
            <SegmentedControl
              semantics="tabs"
              aria-label="Sections"
              options={[
                { value: "a", label: "A" },
                { value: "b", label: "B" },
              ]}
            />
          </div>
          <SegmentedPanel value="a">first panel</SegmentedPanel>
          <SegmentedPanel value="b">second panel</SegmentedPanel>
        </SegmentedTabs>
      );
    }
    render(<Harness />);
    expect(screen.getByRole("tablist", { name: "Sections" })).not.toBeNull();
    expect(screen.queryByRole("radiogroup")).toBeNull();
    const [first, second] = screen.getAllByRole("tab");
    expect(first.getAttribute("aria-selected")).toBe("true");

    const panel = screen.getByRole("tabpanel");
    expect(panel.textContent).toBe("first panel");
    expect(first.getAttribute("aria-controls")).toBe(panel.id);
    expect(panel.getAttribute("aria-labelledby")).toBe(first.id);

    fireEvent.click(second);
    expect(screen.getByRole("tabpanel").textContent).toBe("second panel");
    expect(screen.queryByText("first panel")).toBeNull();
    expect(second.getAttribute("aria-controls")).toBe(screen.getByRole("tabpanel").id);
  });

  it("a shared panel follows the selected tab", () => {
    render(
      <SegmentedTabs value="b">
        <SegmentedControl
          semantics="tabs"
          aria-label="Modality"
          options={[
            { value: "a", label: "A" },
            { value: "b", label: "B" },
          ]}
        />
        <SegmentedPanel value="b">shared form</SegmentedPanel>
      </SegmentedTabs>
    );
    expect(screen.getByRole("tabpanel").getAttribute("aria-labelledby")).toBe(
      screen.getByRole("tab", { name: "B" }).id
    );
  });

  it.each(["radio", "tabs"] as const)(
    "%s semantics map size onto the triggers and keep the full-width phone layout",
    (semantics) => {
      const control =
        semantics === "radio" ? (
          <SegmentedControl
            semantics="radio"
            aria-label="Density"
            size="sm"
            value="a"
            options={[
              { value: "a", label: "A" },
              { value: "b", label: "B" },
            ]}
          />
        ) : (
          <SegmentedTabs value="a">
            <SegmentedControl
              semantics="tabs"
              aria-label="Density"
              size="sm"
              options={[
                { value: "a", label: "A" },
                { value: "b", label: "B" },
              ]}
            />
          </SegmentedTabs>
        );
      render(control);
      const role = semantics === "radio" ? "radiogroup" : "tablist";
      const list = screen.getByRole(role, { name: "Density" });
      expect(list.className).toContain("w-full");
      expect(list.className).toContain("sm:w-auto");
      expect(list.className).toContain("[&>*]:flex-1");
      expect(list.className).toContain("sm:[&>*]:flex-none");
      // #18068: at 390 px a long set (Endpoint: APIs/MCP/A2A/Context Sources) wrapped the capsule
      // onto two lines. It stays one line and scrolls sideways instead.
      expect(list.className).not.toMatch(/(^|\s)flex-wrap(\s|$)/);
      expect(list.className).toContain("flex-nowrap");
      expect(list.className).toContain("overflow-x-auto");
      for (const item of screen.getAllByRole(semantics === "radio" ? "radio" : "tab")) {
        expect(item.className).toContain("h-7");
        // The kit capsule trigger has a ~30px min-height that would beat h-7 alone.
        expect(item.className).toContain("min-h-7");
        expect(item.className).toContain("text-xs");
      }
    }
  );

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
