// @vitest-environment jsdom
/**
 * KEA-7886 lote 6 (fix round 1): screens that re-implemented an adapter now use it.
 * - activity EventTypeFilter → FilterPills (named group of aria-pressed pills).
 * - models SelectAllHeaderCell → Checkbox adapter, which forwards `indeterminate`.
 */
import React from "react";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { NextIntlClientProvider } from "next-intl";
import { afterEach, beforeAll, describe, expect, it, vi } from "vitest";
import EventTypeFilter from "@/app/(dashboard)/dashboard/activity/components/EventTypeFilter";
import { SelectAllHeaderCell } from "@/app/(dashboard)/dashboard/models/CatalogTableParts";
import messages from "../../../src/i18n/messages/en.json";

const wrap = (ui: React.ReactElement) =>
  render(
    <NextIntlClientProvider locale="en" timeZone="UTC" messages={messages}>
      {ui}
    </NextIntlClientProvider>
  );

// Warm the kit render path once, outside the 5 s per-test budget (cold transform on a loaded
// runner). Assertions are unchanged.
beforeAll(() => {
  wrap(<EventTypeFilter value="all" onChange={() => {}} />);
  cleanup();
}, 60_000);

afterEach(() => cleanup());

describe("EventTypeFilter on FilterPills", () => {
  it("renders a named group of pressed/unpressed pills and reports the picked category", () => {
    const onChange = vi.fn();
    const a = messages.activity;
    wrap(<EventTypeFilter value="combos" onChange={onChange} />);
    const group = screen.getByRole("group", { name: a.filterAria });
    expect(group).toBeTruthy();
    const combos = screen.getByRole("button", { name: a.filterCombos });
    const all = screen.getByRole("button", { name: a.filterAll });
    expect(combos.getAttribute("aria-pressed")).toBe("true");
    expect(all.getAttribute("aria-pressed")).toBe("false");
    // FilterPills' active/inactive variants (kit Button).
    expect(combos.className).toContain("ci-button--secondary");
    expect(all.className).toContain("ci-button--ghost");
    fireEvent.click(screen.getByRole("button", { name: a.filterQuota }));
    expect(onChange).toHaveBeenCalledWith("quota");
  });
});

describe("SelectAllHeaderCell on the Checkbox adapter", () => {
  function renderCell(props: { checked: boolean; indeterminate: boolean }) {
    return render(
      <table>
        <thead>
          <tr>
            <SelectAllHeaderCell {...props} onToggle={() => {}} label="Select page" />
          </tr>
        </thead>
      </table>
    );
  }

  it("marks a partly selected page as indeterminate", () => {
    renderCell({ checked: false, indeterminate: true });
    const box = screen.getByRole("checkbox", { name: "Select page" }) as HTMLInputElement;
    expect(box.indeterminate).toBe(true);
  });

  it("clears the mixed state when the page is fully selected", () => {
    renderCell({ checked: true, indeterminate: false });
    const box = screen.getByRole("checkbox", { name: "Select page" }) as HTMLInputElement;
    expect(box.indeterminate).toBe(false);
    expect(box.checked).toBe(true);
  });
});
