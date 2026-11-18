// @vitest-environment jsdom
import React from "react";
import { afterEach, expect, it, vi } from "vitest";
import { cleanup, render } from "@testing-library/react";
import { CapsuleWater } from "../../src/app/(dashboard)/dashboard/usage/components/ProviderLimits/HealthCapsule";
vi.unmock("next-intl");
afterEach(cleanup);

const maybeFill = (container: HTMLElement) => container.querySelector<HTMLElement>("[data-fill]");
const fillOf = (container: HTMLElement) => {
  const element = maybeFill(container);
  if (!element) throw new Error("expected a capsule fill element");
  return element;
};

it("keeps the fill inside the capsule when a producer overshoots", () => {
  expect(fillOf(render(<CapsuleWater kind="ok" fill={140} />).container).style.height).toBe("100%");
  cleanup();
  expect(fillOf(render(<CapsuleWater kind="ok" fill={-5} />).container).style.height).toBe("0%");
  cleanup();
  expect(fillOf(render(<CapsuleWater kind="ok" fill={0} />).container).style.height).toBe("0%");
  cleanup();
  expect(fillOf(render(<CapsuleWater kind="ok" fill={100} />).container).style.height).toBe("100%");
  cleanup();
  expect(fillOf(render(<CapsuleWater kind="ok" fill={42} />).container).style.height).toBe("42%");
  cleanup();
  // A cooldown capsule clamps the same way, only the anchor differs.
  const cooling = fillOf(render(<CapsuleWater kind="cdw" fill={140} />).container);
  expect(cooling.style.height).toBe("100%");
  expect(cooling.style.top).toBe("0px");
});

it("draws nothing for a fill that is not a finite number", () => {
  expect(maybeFill(render(<CapsuleWater kind="ok" fill={Number.NaN} />).container)).toBeNull();
});

it("anchors a cooldown fill at the top and a remaining-quota fill at the bottom", () => {
  for (const kind of ["cd5", "cdw"] as const) {
    const cooling = fillOf(render(<CapsuleWater kind={kind} fill={30} />).container);
    expect(cooling.style.top).toBe("0px");
    expect(cooling.style.bottom).toBe("");
    expect(cooling.style.height).toBe("30%");
    expect(cooling.getAttribute("data-fill-direction")).toBe("down");
    cleanup();
  }

  const healthy = fillOf(render(<CapsuleWater kind="ok" fill={30} />).container);
  expect(healthy.style.bottom).toBe("0px");
  expect(healthy.style.top).toBe("");
  expect(healthy.style.height).toBe("30%");
  expect(healthy.getAttribute("data-fill-direction")).not.toBe("down");
});

it("draws no fill when the projection reports none", () => {
  expect(maybeFill(render(<CapsuleWater kind="act" fill={null} />).container)).toBeNull();
});
