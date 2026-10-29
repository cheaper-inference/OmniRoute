// @vitest-environment jsdom
import React from "react";
import { cleanup, render } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";

const { default: Badge } = await import("@/shared/components/Badge");

afterEach(() => cleanup());

describe("Badge adapter → kit Badge + tone", () => {
  it("maps status variants to data-tone on an outline kit badge", () => {
    for (const [variant, tone] of [
      ["success", "success"],
      ["warning", "warning"],
      ["error", "danger"],
      ["info", "info"],
      ["primary", "primary"],
    ] as const) {
      const { getByText, unmount } = render(<Badge variant={variant}>{variant}</Badge>);
      const el = getByText(variant);
      expect(el.className).toContain("ci-badge");
      expect(el.className).toContain("ci-badge--outline");
      expect(el.getAttribute("data-tone")).toBe(tone);
      unmount();
    }
  });

  it("default variant is the kit secondary badge; dot and icon render", () => {
    const { getByText } = render(
      <Badge dot icon={<i data-testid="i" />}>
        n
      </Badge>
    );
    const el = getByText("n");
    expect(el.className).toContain("ci-badge--secondary");
    expect(el.hasAttribute("data-tone")).toBe(false);
    expect(el.querySelector(".oi-badge-dot")).not.toBeNull();
    expect(el.querySelector("[data-testid=i]")).not.toBeNull();
  });

  it("a string icon is a Material Symbols name rendered through <Icon> (not as text)", () => {
    const { getByText } = render(
      <Badge variant="warning" icon="warning">
        Expiring
      </Badge>
    );
    const el = getByText("Expiring");
    expect(el.querySelector("svg.oi-icon")).not.toBeNull();
    expect(el.textContent).toBe("Expiring");
  });

  it("keeps the legacy pill shape, size classes, className and extra props", () => {
    const { getByText, rerender } = render(
      <Badge size="sm" className="ml-2" title="t" data-testid="b">
        s
      </Badge>
    );
    const el = getByText("s");
    expect(el.className).toContain("ci-badge--pill");
    expect(el.className).toContain("text-[10px]");
    expect(el.className).toContain("ml-2");
    expect(el.getAttribute("title")).toBe("t");
    expect(el.getAttribute("data-testid")).toBe("b");
    rerender(<Badge size="lg">s</Badge>);
    expect(getByText("s").className).toContain("text-sm");
  });
});
