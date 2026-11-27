// @vitest-environment jsdom
import React from "react";
import { cleanup, fireEvent, render, screen, within } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

const barrel = await import("@/shared/components");
const kit = await import("@omniroute/ui-kit/item-list");

afterEach(() => cleanup());

// Kit `item-list`: the short list of rows (title, description, meta, actions) that screens draw
// by hand as bordered <div>s inside a `.map(`. It replaces the unused `Card.Row` / `Card.ListItem`.
describe("ItemList / Item re-export → kit item-list", () => {
  it("are the kit components, available from the shared components barrel", () => {
    expect(barrel.ItemList).toBe(kit.ItemList);
    expect(barrel.Item).toBe(kit.Item);
  });

  it("renders a named list of rows with the kit variant and density", () => {
    const { ItemList, Item } = barrel;
    render(
      <ItemList aria-label="Webhooks" variant="divided" density="compact">
        <Item title="Deploy hook" description="POST /hooks/deploy" meta={<span>active</span>} />
        <Item title="Audit hook" />
      </ItemList>
    );
    const list = screen.getByRole("list", { name: "Webhooks" });
    expect(list.tagName).toBe("UL");
    expect(list.getAttribute("data-slot")).toBe("item-list");
    expect(list.getAttribute("data-variant")).toBe("divided");
    expect(list.getAttribute("data-density")).toBe("compact");
    const rows = within(list).getAllByRole("listitem");
    expect(rows).toHaveLength(2);
    expect(rows[0].className).toContain("ci-item");
    expect(rows[0].querySelector(".ci-item__description")?.textContent).toBe("POST /hooks/deploy");
    expect(rows[0].querySelector(".ci-item__meta")?.textContent).toBe("active");
    // A static row has no control of its own.
    expect(within(rows[1]).queryByRole("button")).toBeNull();
  });

  it("a row with onActivate is one button; its actions stay separate controls", () => {
    const { ItemList, Item } = barrel;
    const onActivate = vi.fn();
    const onDelete = vi.fn();
    render(
      <ItemList aria-label="Keys">
        <Item
          title="Production key"
          description="Created yesterday"
          selected
          onActivate={onActivate}
          actions={
            <button type="button" onClick={onDelete}>
              Delete
            </button>
          }
        />
      </ItemList>
    );
    const row = screen.getByRole("listitem");
    expect(row.getAttribute("data-state")).toBe("selected");
    const primary = screen.getByRole("button", { name: "Production key" });
    expect(primary.getAttribute("aria-current")).toBe("true");
    expect(primary.getAttribute("aria-describedby")).toBe(
      row.querySelector(".ci-item__description")?.id
    );
    // The action is not nested in the row's button, so it never activates the row.
    expect(primary.contains(screen.getByRole("button", { name: "Delete" }))).toBe(false);
    fireEvent.click(screen.getByRole("button", { name: "Delete" }));
    expect(onDelete).toHaveBeenCalledTimes(1);
    expect(onActivate).not.toHaveBeenCalled();
    fireEvent.click(primary);
    expect(onActivate).toHaveBeenCalledTimes(1);
  });

  it("a row with asChild is a link around the title", () => {
    const { ItemList, Item } = barrel;
    render(
      <ItemList aria-label="Docs">
        <Item title="Routing guide" asChild>
          <a href="https://example.com/routing">ignored</a>
        </Item>
      </ItemList>
    );
    const link = screen.getByRole("link", { name: "Routing guide" });
    expect(link.getAttribute("href")).toBe("https://example.com/routing");
    expect(link.className).toContain("ci-item__primary");
  });
});
