// @vitest-environment jsdom
/**
 * QuotaBar is the text-free progress bar shared by the dashboard quota card and the public quota
 * page. It renders without an i18n provider on purpose: every word on it comes from its props.
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
  it("renders a named progressbar with its value and text alternative", () => {
    render(
      <QuotaBar label="Your share" percent={24} valueLabel="24%" valueText="120 of 500 tokens" />
    );
    const bar = screen.getByRole("progressbar", { name: "Your share" });
    expect(bar.getAttribute("aria-valuenow")).toBe("24");
    expect(bar.getAttribute("aria-valuemin")).toBe("0");
    expect(bar.getAttribute("aria-valuemax")).toBe("100");
    expect(bar.getAttribute("aria-valuetext")).toBe("120 of 500 tokens");
    expect(screen.getByText("24%")).toBeTruthy();
  });

  it("uses the value label as the text alternative when no value text is given", () => {
    render(<QuotaBar label="Pool" percent={10} valueLabel="10%" caption="Resets soon" />);
    const bar = screen.getByRole("progressbar", { name: "Pool" });
    expect(bar.getAttribute("aria-valuetext")).toBe("10%");
    expect(screen.getByText("Resets soon")).toBeTruthy();
  });

  it("clamps the fill and survives NaN", () => {
    const { rerender } = render(<QuotaBar label="Bar" percent={250} valueLabel="250%" />);
    let bar = screen.getByRole("progressbar", { name: "Bar" });
    expect(bar.getAttribute("aria-valuenow")).toBe("100");
    expect(fill(bar).style.width).toBe("100%");

    rerender(<QuotaBar label="Bar" percent={Number.NaN} valueLabel="-" />);
    bar = screen.getByRole("progressbar", { name: "Bar" });
    expect(bar.getAttribute("aria-valuenow")).toBe("0");
    expect(fill(bar).style.width).toBe("0%");
  });

  it("tone follows the thresholds, and muted ignores them", () => {
    const cases: Array<[number, string]> = [
      [69, "bg-primary"],
      [70, "bg-warning"],
      [90, "bg-error"],
    ];
    for (const [percent, expected] of cases) {
      const { unmount } = render(<QuotaBar label="Bar" percent={percent} valueLabel="x" />);
      const classes = fill(screen.getByRole("progressbar", { name: "Bar" })).className;
      expect(classes).toContain(expected);
      unmount();
    }

    render(<QuotaBar label="Bar" percent={95} valueLabel="95%" tone="muted" />);
    const classes = fill(screen.getByRole("progressbar", { name: "Bar" })).className;
    expect(classes).toContain("bg-border-strong");
    for (const tone of ["bg-primary", "bg-warning", "bg-error"]) {
      expect(classes).not.toContain(tone);
    }
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

  it("size md is taller than the dashboard bar", () => {
    const { rerender } = render(<QuotaBar label="Bar" percent={10} valueLabel="10%" size="md" />);
    expect(screen.getByRole("progressbar", { name: "Bar" }).className).toContain("h-2.5");

    rerender(<QuotaBar label="Bar" percent={10} valueLabel="10%" />);
    expect(screen.getByRole("progressbar", { name: "Bar" }).className).toContain("h-1.5");
  });

  it("passes axe's progressbar rules", async () => {
    const { container } = render(
      <QuotaBar label="Your share" percent={42} valueLabel="42%" valueText="42 of 100 requests" />
    );
    const results = await axe.run(container, {
      runOnly: { type: "rule", values: ["aria-progressbar-name", "aria-valid-attr-value"] },
    });
    expect(results.violations.map((violation) => violation.id)).toEqual([]);
  });
});
