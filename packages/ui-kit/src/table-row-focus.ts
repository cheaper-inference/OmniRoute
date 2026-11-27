import { createContext, useContext, useEffect, useLayoutEffect, useReducer, useState } from "react";

/**
 * How the interactive rows of a table take keyboard focus. `"each"` makes every row its own tab
 * stop. `"roving"` gives the rows one tab stop between them and moves focus with the arrow keys.
 */
export type TableRowFocus = "each" | "roving";

// React 18 warns about useLayoutEffect during server rendering.
export const useClientLayoutEffect = typeof document === "undefined" ? useEffect : useLayoutEffect;

/**
 * What can be a tab stop inside a row. Deliberately wide, and not narrowed by the `tabIndex`
 * getter, which answers -1 for an editing host and for media controls that Tab does stop on.
 */
const TAB_CANDIDATE_SELECTOR = [
  "a[href]",
  "area[href]",
  "button",
  "input",
  "select",
  "textarea",
  "summary",
  "iframe",
  "object",
  "embed",
  "audio[controls]",
  "video[controls]",
  '[contenteditable]:not([contenteditable="false"])',
  "[tabindex]",
].join(", ");

/** `Node.DOCUMENT_POSITION_PRECEDING`, spelled out because `Node` belongs to one realm. */
const DOCUMENT_POSITION_PRECEDING = 2;

/** Rows moved by Page Up and Page Down when the row or its viewport cannot be measured. */
const FALLBACK_PAGE_STEP = 10;

type TabStopListener = (isTabStop: boolean) => void;

/** The part of a keydown event the row navigation reads. */
export interface TableRowFocusKey {
  key: string;
  altKey: boolean;
  ctrlKey: boolean;
  metaKey: boolean;
  shiftKey: boolean;
  preventDefault: () => void;
}

/** Whether focus can land on the row: rendered, and not hidden or inert, itself or through an ancestor. */
function takesFocus(row: HTMLTableRowElement) {
  if (row.closest("[hidden], [inert]")) return false;
  // Both spellings of the option: `visibilityProperty` is the newer name of `checkVisibilityCSS`.
  if (typeof row.checkVisibility === "function") return row.checkVisibility({ checkVisibilityCSS: true, visibilityProperty: true });
  // Browsers from before checkVisibility (Safari 17.3 and older). A row without boxes is not
  // rendered, unless the body has none either: then there is no layout to ask (a test DOM).
  const ownerDocument = row.ownerDocument;
  if (!row.getClientRects().length && ownerDocument.body.getClientRects().length) return false;
  // `visibility` is inherited, so the row's own computed value also answers for its ancestors.
  return (ownerDocument.defaultView?.getComputedStyle(row).visibility ?? "visible") === "visible";
}

/** Rows between the top of one screen and the top of the next, keeping one row of context. */
function pageStep(row: HTMLTableRowElement) {
  const rowHeight = row.getBoundingClientRect().height;
  const container = row.closest<HTMLElement>('[data-slot="table-container"]');
  // A capped table scrolls its own container, under a pinned header; any other table scrolls the page.
  const viewport = container && container.scrollHeight > container.clientHeight
    ? container.clientHeight - (row.closest("table")?.tHead?.getBoundingClientRect().height ?? 0)
    : row.ownerDocument.defaultView?.innerHeight ?? 0;
  if (!(rowHeight > 0) || !(viewport > 0)) return FALLBACK_PAGE_STEP;
  return Math.max(1, Math.floor(viewport / rowHeight) - 1);
}

/**
 * The interactive rows of one `Table rowFocus="roving"`. It decides which row is the tab stop,
 * moves focus between rows, keeps the rows' own controls out of the tab order while their row is
 * not the current one, and puts focus back on a row when the focused one is removed.
 */
export class TableRowFocusGroup {
  private readonly rows = new Map<HTMLTableRowElement, TabStopListener>();
  /** The row that last held focus, until it leaves or the selection moves while focus is elsewhere. */
  private lastFocused: HTMLTableRowElement | null = null;
  /** The row that currently renders `tabindex="0"`. */
  private tabStop: HTMLTableRowElement | null = null;
  /** Set when a row is removed with focus inside it: where it was among the rows. */
  private removedWithFocus: { row: HTMLTableRowElement; index: number } | null = null;
  private releaseHeldControls: (() => void) | null = null;

  /** `requestSettle` asks the owning `Table` to call `settle()` once the current commit is done. */
  constructor(private readonly requestSettle: () => void) {}

  /**
   * The rows focus can land on, in document order. Read from the DOM each time: rows can be
   * moved, hidden and shown without remounting.
   */
  private ordered() {
    return [...this.rows.keys()].filter(takesFocus).sort((a, b) => (a.compareDocumentPosition(b) & DOCUMENT_POSITION_PRECEDING ? 1 : -1));
  }

  private setTabStop(next: HTMLTableRowElement | null) {
    if (next === this.tabStop) return;
    if (this.tabStop) this.rows.get(this.tabStop)?.(false);
    if (next) this.rows.get(next)?.(true);
    this.tabStop = next;
  }

  register(row: HTMLTableRowElement, listener: TabStopListener) {
    this.rows.set(row, listener);
    this.requestSettle();
    return () => {
      const active = row.ownerDocument.activeElement;
      if (active && row.contains(active)) this.removedWithFocus = { row, index: this.ordered().indexOf(row) };
      this.rows.delete(row);
      if (this.lastFocused === row) this.lastFocused = null;
      if (this.tabStop === row) this.tabStop = null;
      // The row may stay mounted (it lost `onActivate`, or the table left roving focus).
      listener(false);
      this.requestSettle();
    };
  }

  /** Focus entered the row or a control inside it: the row is the tab stop from now on. */
  focused(row: HTMLTableRowElement) {
    if (!this.rows.has(row)) return;
    this.lastFocused = row;
    this.setTabStop(row);
  }

  /** A row became selected or stopped being selected. */
  selectionChanged(row: HTMLTableRowElement, selected: boolean) {
    // A selection made while focus is elsewhere (a detail panel stepping to the next row) is where
    // Tab should come back to; one made from inside the table leaves focus where the user has it.
    if (selected && this.lastFocused && !this.lastFocused.contains(row.ownerDocument.activeElement)) this.lastFocused = null;
    this.requestSettle();
  }

  /**
   * Runs after every commit of the table, after rows were added, removed or reselected, and
   * before each Tab. Restores focus when the focused row was removed, then points the tab stop at
   * the row that last had focus, or else at the selected row, or else at the first one. A row
   * that cannot take focus (hidden, not rendered) is passed over.
   */
  settle() {
    const rows = this.ordered();
    const removed = this.removedWithFocus;
    this.removedWithFocus = null;
    if (removed && rows.length && !removed.row.isConnected) {
      const ownerDocument = removed.row.ownerDocument;
      const active = ownerDocument.activeElement;
      // Only when focus really fell to the document: never take it from whatever claimed it.
      if (!active || active === ownerDocument.body) rows[Math.min(Math.max(removed.index, 0), rows.length - 1)].focus();
    }
    const kept = this.lastFocused && rows.includes(this.lastFocused) ? this.lastFocused : null;
    this.setTabStop(kept ?? rows.find((row) => row.getAttribute("aria-selected") === "true") ?? rows[0] ?? null);
  }

  /**
   * Arrow Up and Down, Home, End, Page Up and Page Down pressed on `row`. Returns true when focus
   * moved. At either end the key is left alone, so it scrolls as it would anywhere else (and can
   * bring the trigger of an infinite list into view).
   */
  navigate(row: HTMLTableRowElement, event: TableRowFocusKey) {
    if (event.altKey || event.metaKey || event.shiftKey) return false;
    const toEdge = event.key === "Home" || event.key === "End";
    if (event.ctrlKey && !toEdge) return false;
    if (!toEdge && !["ArrowDown", "ArrowUp", "PageDown", "PageUp"].includes(event.key)) return false;
    const rows = this.ordered();
    const index = rows.indexOf(row);
    if (index < 0) return false;
    const last = rows.length - 1;
    const target = event.key === "ArrowDown" ? index + 1
      : event.key === "ArrowUp" ? index - 1
        : event.key === "Home" ? 0
          : event.key === "End" ? last
            : event.key === "PageDown" ? Math.min(last, index + pageStep(row))
              : Math.max(0, index - pageStep(row));
    const next = rows[target];
    if (!next || next === row) return false;
    event.preventDefault();
    next.focus();
    return true;
  }

  /**
   * Listens for Tab on the document of the table. While the browser works out where that Tab
   * goes, the controls inside every row but the current one carry `tabindex="-1"`, so sequential
   * focus skips them: Tab from the row walks that row's own controls and then leaves the table,
   * and Tab from outside lands on the current row. Their own `tabindex` is back before the
   * keydown task ends, when focus moves or, if it does not, on the next timer. The browser still
   * picks the target, so the order outside the rows is exactly its own.
   */
  watchTab(container: HTMLElement) {
    const ownerDocument = container.ownerDocument;
    const view = ownerDocument.defaultView;
    const rowOf = (start: Element | null) => {
      for (let node = start; node && node !== container; node = node.parentElement) {
        if (this.rows.has(node as HTMLTableRowElement)) return node as HTMLTableRowElement;
      }
      return null;
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Tab") return;
      this.releaseHeldControls?.();
      // A row hidden or moved without a render (a class, a media query) may hold the tab stop.
      // React applies the new one before the browser acts on this key.
      this.settle();
      const current = rowOf(ownerDocument.activeElement) ?? this.tabStop;
      // Each control with the `tabindex` attribute it had, to put back.
      const held: Array<[HTMLElement, string | null]> = [];
      for (const control of container.querySelectorAll<HTMLElement>(TAB_CANDIDATE_SELECTOR)) {
        const tabIndex = control.getAttribute("tabindex");
        // Already out of the tab order by its own attribute.
        if (tabIndex !== null && Number.parseInt(tabIndex, 10) < 0) continue;
        // From the parent: a row matches the selector too, and is no control of its own.
        const row = rowOf(control.parentElement);
        if (!row || row === current) continue;
        held.push([control, tabIndex]);
      }
      if (!held.length) return;
      for (const [control] of held) control.setAttribute("tabindex", "-1");
      // Whatever writes `tabindex` on a held control from here on is the app, and its value stands.
      const written = new Set<Node>();
      const note = (records: MutationRecord[]) => { for (const record of records) written.add(record.target); };
      const appWrites = view && typeof view.MutationObserver === "function" ? new view.MutationObserver(note) : null;
      appWrites?.observe(container, { attributes: true, attributeFilter: ["tabindex"], subtree: true });
      let timer: number | undefined;
      const release = () => {
        if (this.releaseHeldControls !== release) return;
        this.releaseHeldControls = null;
        if (appWrites) note(appWrites.takeRecords());
        appWrites?.disconnect();
        for (const [control, tabIndex] of held) {
          if (written.has(control)) continue;
          if (tabIndex === null) control.removeAttribute("tabindex");
          else control.setAttribute("tabindex", tabIndex);
        }
        ownerDocument.removeEventListener("focusin", release, true);
        ownerDocument.removeEventListener("focusout", release, true);
        view?.clearTimeout(timer);
      };
      this.releaseHeldControls = release;
      // The browser has chosen the target by the time either event fires.
      ownerDocument.addEventListener("focusin", release, true);
      ownerDocument.addEventListener("focusout", release, true);
      // Tab that moves nothing (cancelled, or focus leaves for the browser's own UI).
      timer = view?.setTimeout(release, 0);
    };
    ownerDocument.addEventListener("keydown", onKeyDown, true);
    return () => {
      ownerDocument.removeEventListener("keydown", onKeyDown, true);
      this.releaseHeldControls?.();
    };
  }
}

export const TableRowFocusContext = createContext<TableRowFocusGroup | null>(null);

/** The roving group of the nearest `Table`, or null when its rows are each their own tab stop. */
export function useTableRowFocusGroup() {
  return useContext(TableRowFocusContext);
}

/** Creates the group of a `Table` and keeps it settled. Returns null unless `rowFocus` is `"roving"`. */
export function useTableRowFocusProvider(rowFocus: TableRowFocus | undefined, container: HTMLElement | null) {
  const roving = rowFocus === "roving";
  // Rows report changes from their own effects, which can commit without Table rendering: the
  // request renders it. Rows that only changed place (a sort) report nothing, so every commit of
  // a roving Table settles.
  const [, requestSettle] = useReducer((count: number) => count + 1, 0);
  const [group] = useState(() => new TableRowFocusGroup(requestSettle));
  useClientLayoutEffect(() => {
    if (roving) group.settle();
  });
  useEffect(() => (roving && container ? group.watchTab(container) : undefined), [group, roving, container]);
  return roving ? group : null;
}
