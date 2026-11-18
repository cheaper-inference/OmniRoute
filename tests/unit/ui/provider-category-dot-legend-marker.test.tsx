// @vitest-environment jsdom
/**
 * #19066 block 5: the provider category dot renders the kit `LegendMarker` on the kit chart
 * tokens (colour from the categorical slot, shape dot/square/diamond), instead of a hand-rolled
 * span with Tailwind fill + shape classes.
 */
import React, { act } from "react";
import { createRoot, type Root } from "react-dom/client";
import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { CategoryDot } from "@/app/(dashboard)/dashboard/providers/components/CategoryDot";
import { providerCategorySlot } from "@/app/(dashboard)/dashboard/providers/providerCategoryPalette";

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
});

function render(node: React.ReactElement) {
  act(() => root.render(node));
  return Array.from(container.querySelectorAll<HTMLElement>(".ci-legend-marker"));
}

describe("CategoryDot → kit LegendMarker", () => {
  it("paints the category's chart token and maps the shape onto the kit marker", () => {
    const [marker] = render(<CategoryDot category="oauth" size="md" label="OAuth" />);
    const slot = providerCategorySlot("oauth")!;
    expect(marker.style.getPropertyValue("--ci-legend-marker-color")).toBe(slot.colorVar);
    expect(marker.dataset.size).toBe("md");
    expect(marker.dataset.chartToken).toBe(String(slot.token));
    expect(marker.querySelector(".ci-legend-marker__swatch")?.getAttribute("data-shape")).toBe(
      "dot"
    );
    // A second-cycle category is told apart by shape.
    const [square] = render(<CategoryDot category="webfetch" />);
    expect(square.querySelector(".ci-legend-marker__swatch")?.getAttribute("data-shape")).toBe(
      "square"
    );
    expect(square.dataset.size).toBe("sm");
  });

  it("stays decorative next to a visible category name; the label is the hover tooltip", () => {
    const [marker] = render(<CategoryDot category="ide" size="md" label="IDE Providers" />);
    expect(marker.getAttribute("aria-hidden")).toBe("true");
    expect(marker.getAttribute("role")).toBeNull();
    expect(marker.getAttribute("title")).toBe("IDE Providers");
    expect(marker.querySelector(".ci-legend-marker__label")).toBeNull();
  });

  it("is named by its label when it is the only carrier of the category (provider card)", () => {
    const markers = render(
      <CategoryDot category="oauth" hasFree label="OAuth" freeLabel="Has free tier" announce />
    );
    expect(markers).toHaveLength(2);
    expect(markers.map((m) => m.getAttribute("role"))).toEqual(["img", "img"]);
    expect(markers.map((m) => m.getAttribute("aria-label"))).toEqual(["OAuth", "Has free tier"]);
    expect(markers[1].style.getPropertyValue("--ci-legend-marker-color")).toBe(
      providerCategorySlot("free")!.colorVar
    );
  });

  it("renders nothing for an unknown category", () => {
    expect(render(<CategoryDot category="not-a-category" label="x" />)).toHaveLength(0);
    expect(container.innerHTML).toBe("");
  });
});
