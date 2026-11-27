// @vitest-environment jsdom
/**
 * QuotaBar renders the public quota page's readings without an i18n provider. Every word on it
 * comes from its props.
 */
import React from "react";
import axe from "axe-core";
import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import QuotaBar from "../../../src/shared/components/quota/QuotaBar";

afterEach(cleanup);

function fill(bar: HTMLElement): HTMLElement {
  return bar.firstElementChild as HTMLElement;
}

describe("QuotaBar", () => {
  it("renders a named meter with its value and text alternative", () => {
    render(
      <QuotaBar label="Your share" percent={24} valueLabel="24%" valueText="120 of 500 tokens" />
    );
    const bar = screen.getByRole("meter", { name: "Your share" });
    expect(bar.getAttribute("aria-valuenow")).toBe("24");
    expect(bar.getAttribute("aria-valuemin")).toBe("0");
    expect(bar.getAttribute("aria-valuemax")).toBe("100");
    expect(bar.getAttribute("aria-valuetext")).toBe("120 of 500 tokens");
    expect(screen.getByText("24%")).toBeTruthy();
  });

  it("uses the value label as the text alternative when no value text is given", () => {
    render(<QuotaBar label="Pool" percent={10} valueLabel="10%" caption="Resets soon" />);
    const bar = screen.getByRole("meter", { name: "Pool" });
    expect(bar.getAttribute("aria-valuetext")).toBe("10%");
    expect(screen.getByText("Resets soon")).toBeTruthy();
  });

  it("clamps the fill and survives NaN", () => {
    const { rerender } = render(<QuotaBar label="Bar" percent={250} valueLabel="250%" />);
    let bar = screen.getByRole("meter", { name: "Bar" });
    expect(bar.getAttribute("aria-valuenow")).toBe("100");
    expect(fill(bar).style.width).toBe("100%");

    rerender(<QuotaBar label="Bar" percent={Number.NaN} valueLabel="-" />);
    bar = screen.getByRole("meter", { name: "Bar" });
    expect(bar.getAttribute("aria-valuenow")).toBe("0");
    expect(fill(bar).style.width).toBe("0%");
  });

  it("tone follows the thresholds, and muted ignores them", () => {
    const cases: Array<[number, string | null]> = [
      [69, null],
      [70, "warning"],
      [90, "danger"],
    ];
    for (const [percent, expected] of cases) {
      const { unmount } = render(<QuotaBar label="Bar" percent={percent} valueLabel="x" />);
      const indicator = fill(screen.getByRole("meter", { name: "Bar" }));
      expect(indicator.getAttribute("data-tone")).toBe(expected);
      expect(indicator.hasAttribute("data-color")).toBe(false);
      unmount();
    }

    render(<QuotaBar label="Bar" percent={95} valueLabel="95%" tone="muted" />);
    const indicator = fill(screen.getByRole("meter", { name: "Bar" }));
    expect(indicator.hasAttribute("data-tone")).toBe(false);
    expect(indicator.hasAttribute("data-color")).toBe(true);
    expect(indicator.style.getPropertyValue("--ci-progress-color")).toBe(
      "var(--color-border-strong)"
    );
  });

  it("keeps the dashboard colouring of the value label under the auto tone only", () => {
    const { rerender } = render(<QuotaBar label="Bar" percent={95} valueLabel="95%" />);
    expect(screen.getByText("95%").className).toContain("text-error");

    rerender(<QuotaBar label="Bar" percent={75} valueLabel="75%" />);
    expect(screen.getByText("75%").className).toContain("text-warning");

    rerender(<QuotaBar label="Bar" percent={40} valueLabel="40%" />);
    expect(screen.getByText("40%").className).not.toMatch(/text-(error|warning)/);

    rerender(<QuotaBar label="Bar" percent={95} valueLabel="95% muted" tone="muted" />);
    expect(screen.getByText("95% muted").className).not.toMatch(/text-(error|warning)/);
  });

  it("lets a long label wrap at both sizes without squeezing the value", () => {
    const label = "A label long enough to need more than one line on a narrow phone screen";
    for (const size of ["sm", "md"] as const) {
      const { unmount } = render(
        <QuotaBar label={label} percent={10} valueLabel="10%" size={size} />
      );
      const classes = screen.getByText(label).className;
      expect(classes).toContain("min-w-0");
      expect(classes).toContain("break-words");
      expect(screen.getByText("10%").className).toContain("shrink-0");
      unmount();
    }
  });

  it("size md is taller than the dashboard bar and uses larger text", () => {
    const root = (name: string) => screen.getByRole("meter", { name }).parentElement as HTMLElement;
    const { rerender } = render(
      <QuotaBar label="Bar" percent={10} valueLabel="10%" caption="Note" size="md" />
    );
    expect(root("Bar").hasAttribute("data-size")).toBe(false);
    expect(screen.getByText("Bar").hasAttribute("data-size")).toBe(false);
    expect(screen.getByText("Note").className).toContain("text-xs");

    rerender(<QuotaBar label="Bar" percent={10} valueLabel="10%" caption="Note" />);
    expect(root("Bar").getAttribute("data-size")).toBe("sm");
    expect(screen.getByText("Bar").getAttribute("data-size")).toBe("3xs");
    expect(screen.getByText("Note").className).toContain("text-3xs");
  });

  it("draws the label as the kit eyebrow and the bar without animation", () => {
    render(<QuotaBar label="Bar" percent={30} valueLabel="30%" />);
    const label = screen.getByText("Bar");
    expect(label.className).toContain("ci-eyebrow");
    expect(label.getAttribute("data-weight")).toBe("medium");
    expect(screen.getByText("30%").className).toContain("tabular-nums");
    const bar = screen.getByRole("meter", { name: "Bar" });
    expect(bar.className).toContain("ci-progress__track");
    expect(fill(bar).style.width).toBe("30%");
  });

  it("passes axe's meter name and ARIA attribute value rules", async () => {
    const { container } = render(
      <QuotaBar label="Your share" percent={42} valueLabel="42%" valueText="42 of 100 requests" />
    );
    expect(screen.getByRole("meter", { name: "Your share" }).getAttribute("aria-valuenow")).toBe(
      "42"
    );
    const results = await axe.run(container, {
      runOnly: { type: "rule", values: ["aria-meter-name", "aria-valid-attr-value"] },
    });
    expect(results.violations.map((violation) => violation.id)).toEqual([]);
  });
});
