"use client";

import { useCallback, useEffect, useId, useRef, useState } from "react";
import type { ComponentProps, CSSProperties, FocusEvent, KeyboardEvent, MouseEvent, MutableRefObject, Ref } from "react";
import { ExternalLink } from "lucide-react";
import { cn } from "./lib/utils";
import { TableRowFocusContext, useClientLayoutEffect, useTableRowFocusGroup, useTableRowFocusProvider, type TableRowFocus } from "./table-row-focus";
import { TableLoadingRegion, type TableLoadingRegionProps } from "./table-loading";
import { TableScrollArea, type TableScrollAreaLabels } from "./table-scroll-area";
import { useInsideTableScrollArea, useTableScrollAreaName } from "./table-scroll-context";

export type TableDensity = "compact" | "default" | "comfortable";
export type TableVariant = "bordered" | "plain";

export interface TableProps extends ComponentProps<"table"> {
  containerClassName?: string;
  /**
   * Row height, cell padding and text size of the header and body cells. Each value sets the
   * `--ci-table-cell-height`, `--ci-table-cell-padding-block`, `--ci-table-cell-padding-inline`
   * and `--ci-table-font-size` tokens on the container. Omitted, the table follows the tokens of
   * its context, which are the `"default"` sizes when nothing sets them.
   */
  density?: TableDensity;
  /**
   * `"plain"` drops the container's border, radius and background, for a table whose host (a
   * `Card`, a panel) already draws the frame. Defaults to `"bordered"`.
   */
  variant?: TableVariant;
  /** Three-column settings rows: description, estimate, and control. Stacks below 640px. */
  mobileLayout?: "default" | "settings";
  /** Show the default axis overlay while the consumer fetches new rows. */
  loading?: boolean;
  loadingLabel?: string;
  loadingIndicator?: TableLoadingRegionProps["loadingIndicator"];
  /**
   * Accessible noun phrase used for the persistent horizontal scrollbar. It also names the scroll
   * container while the table overflows, when nothing listed under `scrollLabel` does.
   */
  scrollbarLabel?: string;
  /**
   * Localized text of the persistent scrollbar this table creates. A table inside a
   * `TableScrollArea` draws no scrollbar of its own, so this has no effect there: pass `labels`
   * to that area.
   */
  labels?: Partial<TableScrollAreaLabels>;
  /**
   * Set false to use the browser's native horizontal scrollbar only. Defaults to true, or to
   * false when `maxHeight` or `fill` is set, because a bounded table keeps its native scrollbars
   * in view.
   */
  persistentScrollbars?: boolean;
  /**
   * Caps the height of the scroll container (a number is pixels). The rows then scroll inside
   * it, under a header row that stays in view, and the container takes focus while it overflows.
   */
  maxHeight?: string | number;
  /**
   * How the rows that take `onActivate` receive keyboard focus. `"each"` (the default) makes every
   * such row a tab stop. `"roving"` gives them one tab stop between them: Tab enters on the row
   * that last had focus (or else the selected row, or else the first), Arrow Up and Down, Home,
   * End, Page Up and Page Down move focus between rows, and Tab again goes through the controls
   * of that row and leaves the table. The table keeps its table semantics.
   */
  rowFocus?: TableRowFocus;
  /**
   * Fill a height-constrained parent: the scroll container takes the block size its parent gives
   * it, and the rows scroll inside it exactly as under `maxHeight`. The parent needs a definite
   * height (a fixed one, or one it gets as a flex or grid item); without it the table keeps its
   * own height. `maxHeight` is ignored next to `fill`: to cap a filled table, cap its parent.
   */
  fill?: boolean;
  /**
   * Accessible name of the scroll container while the table overflows. When omitted, the
   * container is named by the table caption, then by the table's own `aria-labelledby` or
   * `aria-label`, then by `scrollbarLabel` (its own, or the one of an enclosing `TableScrollArea`).
   * With none of these it still becomes focusable, but stays unnamed.
   */
  scrollLabel?: string;
}

/**
 * Tracks whether the table container scrolls and which caption names it. Takes the container
 * node (from a callback ref) so a replaced container is observed again, and the density, which
 * resizes the cells from an attribute of the container that no observer watches.
 */
function useScrollContainer(container: HTMLDivElement | null, fallbackCaptionId: string, density?: TableDensity) {
  const [overflowing, setOverflowing] = useState(false);
  const [captionId, setCaptionId] = useState<string>();

  useEffect(() => {
    if (!container) return;
    const measure = () => {
      setOverflowing(container.scrollWidth > container.clientWidth || container.scrollHeight > container.clientHeight);
    };
    const syncCaption = () => {
      const caption = container.querySelector<HTMLElement>(":scope > table > caption");
      if (caption && !caption.id) caption.id = fallbackCaptionId;
      setCaptionId(caption?.id || undefined);
    };
    measure();
    syncCaption();

    const hasResizeObserver = typeof ResizeObserver !== "undefined";
    const resizeObserver = hasResizeObserver ? new ResizeObserver(measure) : undefined;
    resizeObserver?.observe(container);
    const table = container.querySelector(":scope > table");
    if (table) resizeObserver?.observe(table);
    if (!hasResizeObserver) window.addEventListener("resize", measure);

    // Descendants can add, remove or rename the caption, and change rows or text, without Table
    // rendering. Text, or a child's style or class, can also overflow a fixed-layout table without
    // resizing any observed box, so every batch of mutations remeasures (one layout read per batch).
    const mutationObserver = typeof MutationObserver === "undefined"
      ? undefined
      : new MutationObserver(() => {
        syncCaption();
        measure();
      });
    if (table) {
      mutationObserver?.observe(table, { childList: true, subtree: true, characterData: true, attributes: true, attributeFilter: ["id", "style", "class"] });
    }

    return () => {
      resizeObserver?.disconnect();
      mutationObserver?.disconnect();
      if (!hasResizeObserver) window.removeEventListener("resize", measure);
    };
  }, [container, fallbackCaptionId, density]);

  return { overflowing, captionId };
}

export function Table({
  className,
  containerClassName,
  density,
  variant,
  mobileLayout = "default",
  scrollbarLabel,
  labels,
  maxHeight,
  fill,
  persistentScrollbars = maxHeight === undefined && !fill,
  scrollLabel,
  loading,
  loadingLabel,
  loadingIndicator,
  rowFocus,
  ...props
}: TableProps) {
  const insideScrollArea = useInsideTableScrollArea();
  const [container, setContainer] = useState<HTMLDivElement | null>(null);
  const { overflowing, captionId } = useScrollContainer(container, useId(), density);
  // Only a label the consumer passed counts: the built-in scrollbar default never becomes a name.
  const areaName = useTableScrollAreaName();
  const scrollbarName = scrollbarLabel || areaName;
  // Keyboard users can only scroll an overflowing container if it takes focus (WCAG 2.1.1).
  const name = scrollLabel
    ? { "aria-label": scrollLabel }
    : captionId
      ? { "aria-labelledby": captionId }
      : props["aria-labelledby"]
        ? { "aria-labelledby": props["aria-labelledby"] }
        : props["aria-label"]
          ? { "aria-label": props["aria-label"] }
          : scrollbarName
            ? { "aria-label": scrollbarName }
            : undefined;
  const scrollProps = overflowing ? { tabIndex: 0, ...(name ? { role: "region", ...name } : {}) } : {};
  // A fill container is bounded by its parent, so it is marked capped as well and gets the same
  // scrolling and pinned header. Its cap is "none", whatever maxHeight says and whatever a capped
  // table around it would let it inherit.
  const capProps = maxHeight === undefined && !fill ? {} : {
    "data-capped": "",
    "data-fill": fill || undefined,
    style: { "--ci-table-max-height": fill ? "none" : typeof maxHeight === "number" ? `${maxHeight}px` : maxHeight } as CSSProperties,
  };
  const rowFocusGroup = useTableRowFocusProvider(rowFocus, container);
  const table = (
    <div
      ref={setContainer}
      data-slot="table-container"
      data-mobile-layout={mobileLayout === "default" ? undefined : mobileLayout}
      data-overflowing={overflowing || undefined}
      data-density={density}
      data-variant={variant === "plain" ? variant : undefined}
      className={cn("ci-table-container", containerClassName)}
      {...capProps}
      {...scrollProps}
    >
      <TableRowFocusContext.Provider value={rowFocusGroup}>
        <table data-slot="table" data-row-focus={rowFocusGroup ? "roving" : undefined} className={cn("ci-table", className)} {...props} />
      </TableRowFocusContext.Provider>
    </div>
  );
  const content = !persistentScrollbars || insideScrollArea
    ? table
    : <TableScrollArea scrollbarLabel={scrollbarLabel} labels={labels}>{table}</TableScrollArea>;
  // Keep the original DOM for consumers without asynchronous data.
  if (loading === undefined) return content;
  return (
    <TableLoadingRegion loading={loading} loadingLabel={loadingLabel} loadingIndicator={loadingIndicator}>
      {content}
    </TableLoadingRegion>
  );
}

export function TableHeader({ className, ...props }: ComponentProps<"thead">) {
  return <thead data-slot="table-header" className={cn("ci-table__header", className)} {...props} />;
}

export function TableBody({ className, ...props }: ComponentProps<"tbody">) {
  return <tbody data-slot="table-body" className={cn("ci-table__body", className)} {...props} />;
}

export function TableFooter({ className, ...props }: ComponentProps<"tfoot">) {
  return <tfoot data-slot="table-footer" className={cn("ci-table__footer", className)} {...props} />;
}

export type { TableRowFocus };

/** The event that activated a row: its click, or the keydown of Enter or Space. */
export type TableRowActivateEvent = MouseEvent<HTMLTableRowElement> | KeyboardEvent<HTMLTableRowElement>;

export interface TableRowProps extends ComponentProps<"tr"> {
  /**
   * Makes the row interactive. It becomes a tab stop (`tabIndex` 0 unless you pass one; inside a
   * `Table rowFocus="roving"` the rows share one tab stop and the arrow keys move between them) and
   * `onActivate` runs on a click and on Enter or Space while the row itself has focus. It does not
   * run for an event that comes from a control inside the row (a button, a link, a field,
   * anything in the tab order or with a widget role), for an event that reaches the row through
   * a portal, for a click that ends a text selection in the row, or after your own `onClick` or
   * `onKeyDown` called `preventDefault()`.
   */
  onActivate?: (event: TableRowActivateEvent) => void;
  /**
   * Marks the row as selected (`aria-selected="true"` and `data-state="selected"`). Pass `false`
   * on the other rows of a table whose rows can be selected, so each one states
   * `aria-selected="false"`; leave it out where selection does not apply.
   */
  selected?: boolean;
}

/** Controls that handle their own clicks and keys inside an interactive row. */
const ROW_CONTROL_SELECTOR = [
  "a[href]",
  "area[href]",
  "button",
  "input",
  "select",
  "textarea",
  "summary",
  "label",
  "audio[controls]",
  "video[controls]",
  '[contenteditable]:not([contenteditable="false"])',
  // tabindex="-1" marks a target for programmatic focus (a cell, a region), not a control.
  '[tabindex]:not([tabindex="-1"])',
  ...["button", "link", "checkbox", "radio", "switch", "tab", "option", "menuitem", "menuitemcheckbox", "menuitemradio", "combobox", "listbox", "slider", "spinbutton", "textbox", "searchbox", "treeitem"]
    .map((role) => `[role="${role}"]`),
].join(", ");

/** True when the click belongs to the row: not to a control inside it, a portal or a text selection. */
function isRowClick(event: MouseEvent<HTMLTableRowElement>) {
  const row = event.currentTarget;
  const target = event.target;
  // The constructors of the row's own document: a table rendered into an iframe is another realm.
  const view = row.ownerDocument.defaultView;
  // React bubbles events from a portal (a menu, a dialog) to the row that rendered it.
  if (!view || !(target instanceof view.Node) || !row.contains(target)) return false;
  const control = (target instanceof view.Element ? target : target.parentElement)?.closest(ROW_CONTROL_SELECTOR);
  // The row itself and its focusable scroll container also match the selector.
  if (control && control !== row && row.contains(control)) return false;
  // A drag that selected text in the row ends with a click on it.
  const selection = row.ownerDocument.getSelection();
  return !selection || selection.isCollapsed || !(row.contains(selection.anchorNode) || row.contains(selection.focusNode));
}

/**
 * The row's part in the roving focus of its `Table`. Returns null for a row that keeps its own
 * tab stop: outside `rowFocus="roving"`, without `onActivate`, or with a `tabIndex` of its own.
 */
function useRovingRow(interactive: boolean, tabIndex: number | undefined, selected: boolean, props: Pick<TableRowProps, "ref">) {
  const group = useTableRowFocusGroup();
  const roving = group && interactive && tabIndex === undefined ? group : null;
  // Read only where it is used: before React 19 `ref` is not a prop of a function component.
  const consumerRef = roving ? props.ref as Ref<HTMLTableRowElement> | undefined : undefined;
  const node = useRef<HTMLTableRowElement | null>(null);
  const [isTabStop, setIsTabStop] = useState(false);
  const wasSelected = useRef(selected);

  useClientLayoutEffect(() => (roving && node.current ? roving.register(node.current, setIsTabStop) : undefined), [roving]);
  useClientLayoutEffect(() => {
    if (roving && node.current && selected !== wasSelected.current) roving.selectionChanged(node.current, selected);
    wasSelected.current = selected;
  }, [roving, selected]);

  // The row needs its own node, and a `ref` you pass (a prop since React 19) still gets it.
  const ref = useCallback((element: HTMLTableRowElement | null) => {
    node.current = element;
    if (typeof consumerRef !== "function") {
      if (consumerRef) (consumerRef as MutableRefObject<HTMLTableRowElement | null>).current = element;
      return undefined;
    }
    // Since React 19 a callback ref may return its own cleanup, which then replaces the null call.
    const cleanup: unknown = consumerRef(element);
    return typeof cleanup === "function" ? () => { node.current = null; (cleanup as () => void)(); } : undefined;
  }, [consumerRef]);

  return roving ? { group: roving, ref, tabIndex: isTabStop ? 0 : -1 } : null;
}

export function TableRow({ className, onActivate, selected, onClick, onKeyDown, onFocus, tabIndex, ...props }: TableRowProps) {
  const roving = useRovingRow(
    Boolean(onActivate),
    tabIndex,
    selected ?? (props["aria-selected"] === true || props["aria-selected"] === "true"),
    props,
  );
  return (
    <tr
      data-slot="table-row"
      data-interactive={onActivate ? "" : undefined}
      className={cn("ci-table__row", className)}
      tabIndex={tabIndex ?? roving?.tabIndex ?? (onActivate ? 0 : undefined)}
      {...props}
      {...(roving ? { ref: roving.ref } : undefined)}
      {...(selected === undefined ? undefined : { "aria-selected": selected })}
      {...(selected ? { "data-state": "selected" } : undefined)}
      onFocus={roving ? (event: FocusEvent<HTMLTableRowElement>) => {
        onFocus?.(event);
        // Focus on the row or on a control inside it, not in a portal the row rendered.
        // Your onFocus may have moved the focus to another row: only the row that still holds it is recorded.
        const row = event.currentTarget;
        if (row.contains(event.target) && row.contains(row.ownerDocument.activeElement)) roving.group.focused(row);
      } : onFocus}
      onClick={onActivate ? (event) => {
        onClick?.(event);
        if (event.defaultPrevented || !isRowClick(event)) return;
        onActivate(event);
      } : onClick}
      onKeyDown={onActivate ? (event) => {
        onKeyDown?.(event);
        // Keys pressed on a control inside the row, or in a portal, belong to that control.
        if (event.defaultPrevented || event.target !== event.currentTarget) return;
        if (roving?.group.navigate(event.currentTarget, event)) return;
        if (event.key !== "Enter" && event.key !== " ") return;
        // Space would scroll the page, also while it is held down.
        event.preventDefault();
        if (!event.repeat) onActivate(event);
      } : onKeyDown}
    />
  );
}

export type TableStickyEdge = "start" | "end";
export type TableCellAlign = "start" | "center" | "end";

/** Layout props shared by `TableHead` and `TableCell`. */
interface TableCellLayoutProps {
  /** Pins the cell to the inline start or end edge of the scroll container. */
  sticky?: TableStickyEdge;
  /**
   * Inline alignment of the content, following the writing direction. Wins over the alignment
   * that `numeric` or `action` imply. Replaces the deprecated HTML `align` attribute.
   */
  align?: TableCellAlign;
  /** A column of numbers: end-aligned, with tabular digits. */
  numeric?: boolean;
  /** The narrow, centered column for one row action (an icon button or a `TableActionLink`). */
  action?: boolean;
}

function cellLayoutClasses(block: "ci-table__head" | "ci-table__cell", { sticky, align, numeric, action }: TableCellLayoutProps) {
  return [
    numeric && `${block}--numeric`,
    action && `${block}--action`,
    align && `${block}--${align}`,
    sticky && `${block}--sticky-${sticky}`,
  ];
}

export interface TableHeadProps extends Omit<ComponentProps<"th">, "align">, TableCellLayoutProps {}

export function TableHead({ className, sticky, align, numeric, action, ...props }: TableHeadProps) {
  return (
    <th
      data-slot="table-head"
      data-sticky={sticky}
      className={cn("ci-table__head", ...cellLayoutClasses("ci-table__head", { sticky, align, numeric, action }), className)}
      {...props}
    />
  );
}

export interface TableCellProps extends Omit<ComponentProps<"td">, "align">, TableCellLayoutProps {}

export function TableCell({ className, sticky, align, numeric, action, ...props }: TableCellProps) {
  return (
    <td
      data-slot="table-cell"
      data-sticky={sticky}
      className={cn("ci-table__cell", ...cellLayoutClasses("ci-table__cell", { sticky, align, numeric, action }), className)}
      {...props}
    />
  );
}

export function TableCaption({ className, id, ...props }: ComponentProps<"caption">) {
  // A stable id lets an overflowing Table name its scroll container after the caption.
  const generatedId = useId();
  return <caption id={id ?? generatedId} data-slot="table-caption" className={cn("ci-table__caption", className)} {...props} />;
}

export function TableNote({ className, ...props }: ComponentProps<"p">) {
  return <p data-slot="table-note" className={cn("ci-table-note", className)} {...props} />;
}

export interface TableActionLinkProps extends ComponentProps<"a"> {
  label: string;
}

export function TableActionLink({ className, label, target = "_blank", rel, ...props }: TableActionLinkProps) {
  return (
    <a
      data-slot="table-action-link"
      className={cn("ci-table-action-link", className)}
      target={target}
      rel={rel ?? (target === "_blank" ? "noreferrer" : undefined)}
      {...props}
    >
      <ExternalLink aria-hidden="true" />
      <span className="ci-sr-only">{label}</span>
    </a>
  );
}
