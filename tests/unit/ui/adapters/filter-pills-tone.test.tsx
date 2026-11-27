// @vitest-environment jsdom
import React from "react";
import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";

const { default: FilterPills } = await import("@/shared/components/FilterPills");

afterEach(() => cleanup());

// Kit `ToggleChip tone`: a status filter colours its pressed state with a Badge tone. The
// adapter passes it per option, so a status filter needs no hand-made chip.
describe("FilterPills → kit ToggleChip tone", () => {
  it("passes an option's tone to its chip and leaves the others untouched", () => {
    render(
      <FilterPills
        aria-label="Status"
        value="error"
        onChange={() => {}}
        options={[
          { value: "all", label: "All" },
          { value: "error", label: "Errors", tone: "danger" },
          { value: "series", label: "Series", tone: "chart-3" },
        ]}
      />
    );
    const errors = screen.getByRole("button", { name: "Errors" });
    expect(errors.getAttribute("data-tone")).toBe("danger");
    expect(errors.getAttribute("aria-pressed")).toBe("true");
    expect(screen.getByRole("button", { name: "Series" }).getAttribute("data-tone")).toBe(
      "chart-3"
    );
    expect(screen.getByRole("button", { name: "All" }).hasAttribute("data-tone")).toBe(false);
  });
});
