import { describe, it } from "vitest";
import assert from "node:assert/strict";
import { render, screen } from "@testing-library/react";
import { ComboSortSelect } from "@/app/(dashboard)/dashboard/combos/ComboSortSelect";
import { chooseKitSelectValue, kitSelectOptions } from "../../helpers/kitSelect";

const t = (_k: string, f: string) => f;

describe("ComboSortSelect", () => {
  it("renders four options and emits the chosen method", () => {
    let chosen = "";
    render(<ComboSortSelect value="manual" onChange={(mm) => (chosen = mm)} t={t} />);
    const select = screen.getByRole("combobox");
    // KEA-7886: the kit (Radix) Select has no DOM <option>s — read the open menu's items.
    assert.equal(kitSelectOptions(select).length, 4);
    chooseKitSelectValue(select, "provider");
    assert.equal(chosen, "provider");
  });
});
