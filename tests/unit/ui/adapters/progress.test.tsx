// @vitest-environment jsdom
import React from "react";
import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";

const barrel = await import("@/shared/components");
const kit = await import("@omniroute/ui-kit/progress");

afterEach(() => cleanup());

// Kit `progress-size-colour-meter`: the thin quota / share / coverage bars that screens still
// draw by hand become the kit `Progress`. There is no bar adapter in `src/shared/components`, so
// the kit component is re-exported as it is.
describe("Progress re-export → kit Progress", () => {
  it("is the kit component, available from the shared components barrel", () => {
    expect(barrel.Progress).toBe(kit.Progress);
  });

  it("draws a thin quota bar as a meter with a series colour", () => {
    const { Progress } = barrel;
    const { container } = render(
      <Progress
        aria-label="Weekly quota"
        aria-valuetext="42% used"
        value={42}
        size="xs"
        color="var(--color-chart-2)"
        semantics="meter"
        animate={false}
      />
    );
    const meter = screen.getByRole("meter", { name: "Weekly quota" });
    expect(screen.queryByRole("progressbar")).toBeNull();
    expect(meter.getAttribute("aria-valuenow")).toBe("42");
    expect(meter.getAttribute("aria-valuetext")).toBe("42% used");
    expect(container.querySelector(".ci-progress")?.getAttribute("data-size")).toBe("xs");
    const indicator = meter.querySelector<HTMLElement>(".ci-progress__indicator")!;
    expect(indicator.hasAttribute("data-color")).toBe(true);
    expect(indicator.style.getPropertyValue("--ci-progress-color")).toBe("var(--color-chart-2)");
    expect(indicator.style.width).toBe("42%");
  });

  it("draws categorical segments, each with its own colour, as one total", () => {
    const { Progress } = barrel;
    render(
      <Progress
        aria-label="Weights"
        size="sm"
        animate={false}
        segments={[
          { value: 50, color: "var(--color-chart-1)" },
          { value: 30, tone: "warning" },
          { value: 0 },
        ]}
      />
    );
    const bar = screen.getByRole("progressbar", { name: "Weights" });
    expect(bar.getAttribute("aria-valuenow")).toBe("80");
    const parts = bar.querySelectorAll<HTMLElement>(".ci-progress__segment");
    // An empty segment draws no seam.
    expect(parts).toHaveLength(2);
    expect(parts[0].style.getPropertyValue("--ci-progress-color")).toBe("var(--color-chart-1)");
    expect(parts[1].getAttribute("data-tone")).toBe("warning");
  });
});
