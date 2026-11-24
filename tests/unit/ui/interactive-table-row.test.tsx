// @vitest-environment jsdom
// Review of 2026-11-15, defect 5 (finding A5-03): a table row that answers a click must answer
// the keyboard too. The kit row knows how since its #238: the DataTable adapter and every
// hand-assembled kit Table with a clickable row render `<TableRow onActivate selected>`. This
// file pinned the local `InteractiveTableRow` adapter until the kit took the behaviour over; it
// now pins the same contract on the vendored kit row, plus what the kit row adds (a click that
// ends a text selection and an event from a portal do not activate; the other rows of a table
// with a selection state `aria-selected="false"`).
import React, { act } from "react";
import { createRoot } from "react-dom/client";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { createPortal } from "react-dom";
import { TableBody, TableCell, TableRow } from "@omniroute/ui-kit/table";

const cleanups: Array<() => void> = [];

function renderRow(props: { onActivate?: () => void; selected?: boolean }) {
  const container = document.createElement("div");
  document.body.appendChild(container);
  const root = createRoot(container);
  act(() => {
    root.render(
      <table>
        <TableBody>
          <TableRow {...props} className="transition-colors" data-cid="row-1">
            <TableCell>Alpha</TableCell>
            <TableCell>
              <button type="button">Delete</button>
              <a href="/somewhere">Open</a>
              {createPortal(<div data-testid="row-panel">panel</div>, document.body)}
            </TableCell>
          </TableRow>
        </TableBody>
      </table>
    );
  });
  cleanups.push(() => {
    act(() => root.unmount());
    container.remove();
  });
  return container.querySelector<HTMLTableRowElement>("tbody tr")!;
}

function press(target: Element, key: string) {
  const event = new KeyboardEvent("keydown", { key, bubbles: true, cancelable: true });
  act(() => {
    target.dispatchEvent(event);
  });
  return event;
}

beforeEach(() => {
  (
    globalThis as typeof globalThis & { IS_REACT_ACT_ENVIRONMENT?: boolean }
  ).IS_REACT_ACT_ENVIRONMENT = true;
});

afterEach(() => {
  while (cleanups.length) cleanups.pop()!();
});

describe("kit TableRow with onActivate (the dashboard's interactive row)", () => {
  it.each(["Enter", " "])("puts the row in the tab order and activates it with %j", (key) => {
    const onActivate = vi.fn();
    const row = renderRow({ onActivate });

    expect(row.tabIndex).toBe(0);
    const event = press(row, key);

    expect(event.defaultPrevented).toBe(true);
    expect(onActivate).toHaveBeenCalledOnce();
  });

  it("ignores keys that do not activate", () => {
    const onActivate = vi.fn();
    const row = renderRow({ onActivate });

    const event = press(row, "ArrowDown");

    expect(event.defaultPrevented).toBe(false);
    expect(onActivate).not.toHaveBeenCalled();
  });

  it("activates on a click in a cell", () => {
    const onActivate = vi.fn();
    const row = renderRow({ onActivate });

    act(() => row.querySelector("td")!.click());

    expect(onActivate).toHaveBeenCalledOnce();
  });

  it("leaves clicks and keys on a control inside the row to that control", () => {
    const onActivate = vi.fn();
    const row = renderRow({ onActivate });
    const button = row.querySelector("button")!;
    const link = row.querySelector("a")!;
    link.addEventListener("click", (event) => event.preventDefault());

    act(() => button.click());
    act(() => link.click());
    const enter = press(button, "Enter");
    const space = press(button, " ");

    expect(onActivate).not.toHaveBeenCalled();
    // The row must not swallow the key: the button still needs its default action.
    expect(enter.defaultPrevented).toBe(false);
    expect(space.defaultPrevented).toBe(false);
  });

  it("keeps a row without a handler passive", () => {
    const row = renderRow({});

    expect(row.getAttribute("tabindex")).toBeNull();
    expect(press(row, "Enter").defaultPrevented).toBe(false);
  });

  it("is the kit row and forwards the other props to it", () => {
    const row = renderRow({ onActivate: () => {} });

    expect(row.getAttribute("data-slot")).toBe("table-row");
    expect(row.classList.contains("ci-table__row")).toBe(true);
    expect(row.classList.contains("transition-colors")).toBe(true);
    expect(row.getAttribute("data-cid")).toBe("row-1");
    // The kit marker that carries the pointer cursor and the focus ring: no host class needed.
    expect(row.hasAttribute("data-interactive")).toBe(true);
    expect(renderRow({}).hasAttribute("data-interactive")).toBe(false);
  });

  it("does not activate on a click that ends a text selection in the row", () => {
    const onActivate = vi.fn();
    const row = renderRow({ onActivate });
    const cell = row.querySelector("td")!;
    const selection = document.getSelection()!;
    const range = document.createRange();
    range.selectNodeContents(cell);
    selection.removeAllRanges();
    selection.addRange(range);

    act(() => cell.click());
    expect(onActivate).not.toHaveBeenCalled();

    selection.removeAllRanges();
    act(() => cell.click());
    expect(onActivate).toHaveBeenCalledOnce();
  });

  it("does not activate on an event that reaches the row through a portal", () => {
    const onActivate = vi.fn();
    renderRow({ onActivate });
    const panel = document.querySelector<HTMLElement>("[data-testid=row-panel]")!;

    act(() => panel.click());
    press(panel, "Enter");

    expect(onActivate).not.toHaveBeenCalled();
  });

  it("marks the selected row for assistive tech and for the kit style", () => {
    const selected = renderRow({ onActivate: () => {}, selected: true });
    expect(selected.getAttribute("aria-selected")).toBe("true");
    expect(selected.getAttribute("data-state")).toBe("selected");

    // `selected={false}`: a row of a table with a selection that is not the selected one.
    const unselected = renderRow({ onActivate: () => {}, selected: false });
    expect(unselected.getAttribute("aria-selected")).toBe("false");
    expect(unselected.hasAttribute("data-state")).toBe(false);

    const noSelection = renderRow({ onActivate: () => {} });
    expect(noSelection.hasAttribute("aria-selected")).toBe(false);
    expect(noSelection.hasAttribute("data-state")).toBe(false);
  });
});
