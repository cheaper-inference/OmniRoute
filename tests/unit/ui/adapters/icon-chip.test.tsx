// @vitest-environment jsdom
import fs from "node:fs";
import path from "node:path";
import React from "react";
import { cleanup, render } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";

// Kit `IconChip` (keak-ai/cheaper-inference-ui-kit#259): an icon on a tinted square or circle.
// The adapter is a thin re-export, so screens import it from `@/shared/components` like the
// other adapters and get the kit's tones, sizes and shapes as they are.
const IconChipModule = await import("@/shared/components/IconChip");
const IconChip = IconChipModule.default;
const { IconChip: KitIconChip } = await import("@omniroute/ui-kit/icon-chip");
const { default: Icon } = await import("@/shared/components/Icon");

afterEach(() => cleanup());

describe("IconChip adapter → kit IconChip", () => {
  it("is the kit component, as default and as a named export", () => {
    expect(IconChip).toBe(KitIconChip);
    expect(IconChipModule.IconChip).toBe(KitIconChip);
  });

  it("draws the kit chip with its defaults and takes an ICON_MAP icon as child", () => {
    const { container } = render(
      <IconChip>
        <Icon name="search" />
      </IconChip>
    );
    const chip = container.querySelector("[data-slot=icon-chip]")!;
    expect(chip.className).toContain("ci-icon-chip");
    expect(chip.getAttribute("data-tone")).toBe("neutral");
    expect(chip.getAttribute("data-size")).toBe("md");
    expect(chip.getAttribute("data-shape")).toBe("rounded");
    // Decorative by default.
    expect(chip.getAttribute("aria-hidden")).toBe("true");
    expect(chip.querySelector("svg.oi-icon")).not.toBeNull();
  });

  it("passes tone, size and shape through, and a name makes it an image", () => {
    const { getByRole } = render(
      <IconChip tone="chart-3" size="sm" shape="circle" aria-label="Sync failed">
        <Icon name="error" />
      </IconChip>
    );
    const chip = getByRole("img", { name: "Sync failed" });
    expect(chip.getAttribute("data-tone")).toBe("chart-3");
    expect(chip.getAttribute("data-size")).toBe("sm");
    expect(chip.getAttribute("data-shape")).toBe("circle");
  });

  it("is exported from the shared components barrel", () => {
    const barrel = fs.readFileSync(
      path.resolve(process.cwd(), "src/shared/components/index.tsx"),
      "utf8"
    );
    expect(barrel).toContain('export { default as IconChip } from "./IconChip";');
  });
});
