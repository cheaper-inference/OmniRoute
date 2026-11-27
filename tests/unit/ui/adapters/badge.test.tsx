// @vitest-environment jsdom
import React from "react";
import { cleanup, render } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";

const { default: Badge } = await import("@/shared/components/Badge");

afterEach(() => cleanup());

describe("Badge adapter → kit Badge + tone", () => {
  it("maps status variants to kit tones on the borderless secondary badge", () => {
    for (const [variant, tone] of [
      ["success", "success"],
      ["warning", "warning"],
      ["error", "danger"],
      ["info", "info"],
      ["primary", "accent"],
    ] as const) {
      const { getByText, unmount } = render(<Badge variant={variant}>{variant}</Badge>);
      const el = getByText(variant);
      expect(el.className).toContain("ci-badge");
      expect(el.className).toContain("ci-badge--secondary");
      expect(el.className).toContain(`ci-badge--tone-${tone}`);
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

  it("keeps the legacy pill shape, className and extra props", () => {
    const { getByText, rerender } = render(
      <Badge className="ml-2" title="t" data-testid="b">
        s
      </Badge>
    );
    const el = getByText("s");
    expect(el.className).toContain("ci-badge--pill");
    expect(el.className).toContain("ml-2");
    expect(el.getAttribute("title")).toBe("t");
    expect(el.getAttribute("data-testid")).toBe("b");
    // md is the kit default: no size class, no data-size.
    expect(el.className).not.toContain("ci-badge--sm");
    expect(el.hasAttribute("data-size")).toBe(false);
    rerender(<Badge size="lg">s</Badge>);
    expect(getByText("s").className).toContain("text-sm");
  });

  // Kit badge sizes (keak-ai/cheaper-inference-ui-kit `Badge size`): `sm` is the kit's 20px
  // badge with 12px text. The adapter used to shrink the text to 10px with utilities.
  it('size="sm" is the kit small badge, not a 10px utility override', () => {
    const { getByText } = render(<Badge size="sm">s</Badge>);
    const el = getByText("s");
    expect(el.className).toContain("ci-badge--sm");
    expect(el.getAttribute("data-size")).toBe("sm");
    expect(el.className).not.toContain("text-[10px]");
    expect(el.className).not.toMatch(/(^|\s)p[xy]-/);
  });

  it("passes the kit chart-series tones through `tone`, over the variant", () => {
    for (const tone of ["chart-1", "chart-3", "chart-8"] as const) {
      const { getByText, unmount } = render(
        <Badge variant="info" tone={tone}>
          {tone}
        </Badge>
      );
      const el = getByText(tone);
      expect(el.className).toContain("ci-badge--secondary");
      expect(el.className).toContain(`ci-badge--tone-${tone}`);
      expect(el.className).not.toContain("ci-badge--tone-info");
      expect(el.getAttribute("data-tone")).toBe(tone);
      unmount();
    }
  });
});
