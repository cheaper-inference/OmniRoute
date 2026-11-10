"use client";

import { memo, useEffect, useId, useMemo, useRef, useState } from "react";
import type { ComponentProps, CSSProperties, FocusEvent, KeyboardEvent, MouseEvent } from "react";
import { Check, ChevronRight, Copy, Link2 } from "lucide-react";
import { Button } from "./button";
import { resolveLabels } from "./lib/labels";
import { cn } from "./lib/utils";

export type JsonTreePath = readonly (string | number)[];

export interface JsonTreeNode {
  /** Keys from the root; empty for the root itself. */
  path: JsonTreePath;
  /** Object key or array index; `null` for the root. */
  key: string | number | null;
  value: unknown;
}

export type JsonTreeCopyKind = "value" | "path";

export interface JsonTreeCopyDetail {
  kind: JsonTreeCopyKind;
  path: JsonTreePath;
  /** The text placed on the clipboard, after redaction. */
  text: string;
}

export interface JsonTreeLabels {
  /** Accessible name of the tree, unless `aria-label` or `aria-labelledby` is set. */
  tree: string;
  expandAll: string;
  collapseAll: string;
  copyValue: string;
  copyPath: string;
  /** Announced to screen readers after a copy. */
  copiedValue: string;
  copiedPath: string;
  /** Visible error after a failed copy. */
  copyError: string;
  /** The row that reveals more rows once `maxRows` is reached. */
  showMore: string;
  /** Read by screen readers in place of a mask. */
  redacted: string;
  /** Shown and copied when `redact` returns `true`. */
  mask: string;
}

export const defaultJsonTreeLabels: JsonTreeLabels = {
  tree: "JSON",
  expandAll: "Expand all",
  collapseAll: "Collapse all",
  copyValue: "Copy value",
  copyPath: "Copy path",
  copiedValue: "Value copied",
  copiedPath: "Path copied",
  copyError: "Could not copy. Try again.",
  showMore: "Show more",
  redacted: "Redacted",
  mask: "••••••••",
};

export interface JsonTreeProps extends Omit<ComponentProps<"div">, "children" | "onCopy"> {
  /** Parsed JSON. Other objects show their own enumerable keys. */
  value: unknown;
  /**
   * Nodes shallower than this start expanded: `0` shows only the root, `1` (default) the root's
   * children, `Infinity` everything. A new value re-applies it and drops manual toggles.
   */
  expandDepth?: number;
  /** Rows rendered before a "Show more" row, and how many each one adds. Defaults to 500. */
  maxRows?: number;
  /** Longer strings are shortened on screen; copying always gives the whole string. Defaults to 10000. */
  maxStringLength?: number;
  /** Shows the expand-all and collapse-all buttons. Defaults to true. */
  showControls?: boolean;
  /**
   * Called for each node that is shown or copied. Return `true` to mask it with `labels.mask`, or a
   * string to show that instead, even an empty one. A masked node keeps its key and loses its value,
   * size and children, on screen and in every copy, including copies of its ancestors. If the hook
   * throws, nothing is shown or copied.
   */
  redact?: (node: JsonTreeNode) => boolean | string | null | undefined;
  /** Text copied by "Copy path". Defaults to `formatJsonTreePath`. */
  formatPath?: (path: JsonTreePath) => string;
  labels?: Partial<JsonTreeLabels>;
  /**
   * Writes the text to the clipboard. Defaults to `navigator.clipboard.writeText`, which browsers
   * only offer on secure origins. Reject to report a failure.
   */
  copyText?: (text: string) => Promise<void>;
  onCopy?: (detail: JsonTreeCopyDetail) => void;
  onCopyError?: (error: unknown, detail: Omit<JsonTreeCopyDetail, "text">) => void;
}

/** `$.messages[0]["content-type"]`: JSONPath, with bracket notation for keys that need it. */
export function formatJsonTreePath(path: JsonTreePath): string {
  return path.reduce<string>((text, segment) => {
    if (typeof segment === "number") return `${text}[${segment}]`;
    return /^[A-Za-z_$][\w$]*$/.test(segment) ? `${text}.${segment}` : `${text}[${JSON.stringify(segment)}]`;
  }, "$");
}

interface NodeRow extends JsonTreeNode {
  id: string;
  name: string | number | null;
  depth: number;
  position: number;
  setSize: number;
  /** Null unless the node is masked. */
  mask: string | null;
  /** Null for a leaf or a masked node. */
  size: number | null;
  /** Undefined for anything that cannot expand. */
  expanded: boolean | undefined;
}

interface MoreRow {
  id: "more";
  depth: 0;
  expanded: undefined;
}

type Row = NodeRow | MoreRow;

interface Expansion {
  depth: number;
  toggles: ReadonlyMap<string, boolean>;
}

const TYPE_AHEAD_PAUSE_MS = 500;
const COPIED_MS = 1600;

function isContainer(value: unknown): value is object {
  return typeof value === "object" && value !== null;
}

function maskFor(node: JsonTreeNode, redact: JsonTreeProps["redact"], defaultMask: string): string | null {
  const result = redact?.(node);
  if (typeof result === "string") return result;
  return result === true ? defaultMask : null;
}

function buildRows(value: unknown, expansion: Expansion, limit: number, redact: JsonTreeProps["redact"], defaultMask: string): Row[] {
  const rows: Row[] = [];
  let truncated = false;

  // Only expanded nodes are descended into, and the walk stops at `limit`, so a large or cyclic
  // value costs as much as the rows on screen.
  function visit(node: JsonTreeNode, id: string, depth: number, position: number, setSize: number) {
    if (rows.length >= limit) { truncated = true; return; }
    const mask = maskFor(node, redact, defaultMask);
    const keys = mask === null && isContainer(node.value) && !Array.isArray(node.value) ? Object.keys(node.value) : null;
    const size = mask === null && Array.isArray(node.value) ? node.value.length : keys?.length ?? null;
    const expanded = size ? expansion.toggles.get(id) ?? depth < expansion.depth : undefined;
    rows.push({ ...node, id, name: node.key, depth, position, setSize, mask, size, expanded });
    if (!expanded) return;
    for (let index = 0; index < size! && !truncated; index += 1) {
      const key = keys ? keys[index]! : index;
      const child = (node.value as Record<string | number, unknown>)[key];
      visit({ path: [...node.path, key], key, value: child }, `${id}/${String(key).length}:${key}`, depth + 1, index + 1, size!);
    }
  }

  visit({ path: [], key: null, value }, "$", 0, 1, 1);
  if (truncated) rows.push({ id: "more", depth: 0, expanded: undefined });
  return rows;
}

/** A copy of `node.value` with every masked descendant replaced, whether or not it is on screen. */
function redactedValue(node: JsonTreeNode, redact: NonNullable<JsonTreeProps["redact"]>, defaultMask: string): unknown {
  const mask = maskFor(node, redact, defaultMask);
  if (mask !== null) return mask;
  const child = (key: string | number, value: unknown) => redactedValue({ path: [...node.path, key], key, value }, redact, defaultMask);
  if (Array.isArray(node.value)) return node.value.map((value, index) => child(index, value));
  if (!isContainer(node.value)) return node.value;
  // fromEntries defines keys, so an own "__proto__" stays data instead of setting the prototype.
  return Object.fromEntries(Object.entries(node.value).map(([key, value]) => [key, child(key, value)]));
}

function clipboardText(value: unknown): string {
  return typeof value === "string" ? value : JSON.stringify(value, null, 2) ?? String(value);
}

function preview(row: NodeRow, maxStringLength: number) {
  const { value, size } = row;
  if (size) return { tone: "summary", text: Array.isArray(value) ? `[${size}]` : `{${size}}` };
  if (typeof value === "string") {
    return { tone: "string", text: `"${value.length > maxStringLength ? `${value.slice(0, maxStringLength)}…` : value}"` };
  }
  if (typeof value === "number") return { tone: "number", text: String(value) };
  if (typeof value === "boolean") return { tone: "boolean", text: String(value) };
  if (value === null) return { tone: "null", text: "null" };
  return { tone: "summary", text: isContainer(value) ? (Array.isArray(value) ? "[]" : "{}") : String(value) };
}

interface JsonTreeRowProps {
  row: Row;
  index: number;
  baseId: string;
  active: boolean;
  /** Only the active and hovered rows carry copy buttons: most of a row's DOM otherwise. */
  actions: boolean;
  copied: JsonTreeCopyKind | undefined;
  labels: JsonTreeLabels;
  maxStringLength: number;
}

const JsonTreeRow = memo(function JsonTreeRow({ row, index, baseId, active, actions, copied, labels, maxStringLength }: JsonTreeRowProps) {
  if (!("path" in row)) {
    return (
      <div role="treeitem" aria-level={1} tabIndex={active ? 0 : -1} data-index={index} data-action="more" className="ci-json-tree__row ci-json-tree__more" style={{ "--ci-json-tree-depth": 0 } as CSSProperties}>
        {labels.showMore}
      </div>
    );
  }

  const labelId = `${baseId}-${index}`;
  const expandable = row.expanded !== undefined;
  const { tone, text } = preview(row, maxStringLength);
  return (
    <div
      role="treeitem"
      aria-level={row.depth + 1}
      aria-posinset={row.position}
      aria-setsize={row.setSize}
      aria-expanded={row.expanded}
      aria-labelledby={labelId}
      tabIndex={active ? 0 : -1}
      data-index={index}
      className="ci-json-tree__row"
      style={{ "--ci-json-tree-depth": row.depth } as CSSProperties}
    >
      <span className="ci-json-tree__toggle" data-action={expandable ? "toggle" : undefined} aria-hidden="true">
        {expandable ? <ChevronRight aria-hidden="true" /> : null}
      </span>
      <span id={labelId} className="ci-json-tree__content" data-action={expandable ? "toggle" : undefined}>
        {row.name !== null ? (
          <>
            <span data-tone={typeof row.name === "number" ? "index" : "key"}>{typeof row.name === "number" ? row.name : `"${row.name}"`}</span>
            <span data-tone="punctuation">: </span>
          </>
        ) : null}
        {row.mask !== null ? (
          <>
            <span data-tone="redacted" aria-hidden="true">{row.mask}</span>
            <span className="ci-sr-only">{labels.redacted}</span>
          </>
        ) : (
          <span data-tone={tone}>{text}</span>
        )}
      </span>
      {actions ? (
        <span className="ci-json-tree__actions">
          <button type="button" className="ci-json-tree__action" data-action="copy-value" data-copied={copied === "value" || undefined} tabIndex={active ? 0 : -1} aria-label={labels.copyValue} title={labels.copyValue}>
            {copied === "value" ? <Check aria-hidden="true" /> : <Copy aria-hidden="true" />}
          </button>
          <button type="button" className="ci-json-tree__action" data-action="copy-path" data-copied={copied === "path" || undefined} tabIndex={active ? 0 : -1} aria-label={labels.copyPath} title={labels.copyPath}>
            {copied === "path" ? <Check aria-hidden="true" /> : <Link2 aria-hidden="true" />}
          </button>
        </span>
      ) : null}
    </div>
  );
});

/**
 * An inspector for parsed JSON on the `--ci-code-*` tokens: a keyboard-navigable ARIA tree with
 * expand and collapse, per-node copy of the value or path, and a redaction hook. Collapsed nodes
 * render nothing below them and `maxRows` bounds what an expanded node can render.
 */
export function JsonTree({
  value,
  expandDepth = 1,
  maxRows = 500,
  maxStringLength = 10_000,
  showControls = true,
  redact,
  formatPath = formatJsonTreePath,
  labels: labelOverrides,
  copyText = (text) => navigator.clipboard.writeText(text),
  onCopy,
  onCopyError,
  className,
  "aria-label": ariaLabel,
  "aria-labelledby": ariaLabelledBy,
  ...props
}: JsonTreeProps) {
  const labels = useMemo(() => resolveLabels(defaultJsonTreeLabels, labelOverrides), [labelOverrides]);
  const baseId = useId();
  const treeRef = useRef<HTMLDivElement>(null);
  const [expansion, setExpansion] = useState<Expansion>({ depth: expandDepth, toggles: new Map() });
  const [appliedDepth, setAppliedDepth] = useState(expandDepth);
  const [rowPages, setRowPages] = useState(1);
  const [activeId, setActiveId] = useState("$");
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [copied, setCopied] = useState<{ id: string; kind: JsonTreeCopyKind } | null>(null);
  const [copyFailed, setCopyFailed] = useState(false);
  const pendingFocus = useRef<number | null>(null);
  const typeAhead = useRef({ text: "", at: 0 });
  const copyVersion = useRef(0);
  const copiedTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  if (appliedDepth !== expandDepth) {
    setAppliedDepth(expandDepth);
    setExpansion({ depth: expandDepth, toggles: new Map() });
  }

  const rowLimit = maxRows * rowPages;
  const rows = useMemo(() => buildRows(value, expansion, rowLimit, redact, labels.mask), [value, expansion, rowLimit, redact, labels.mask]);

  // The active row can vanish under a collapsed ancestor; its nearest visible ancestor takes over
  // the tab stop. Row ids nest, and ancestors come first, so the last prefix match is the nearest.
  const activeIndex = useMemo(() => {
    const exact = rows.findIndex((row) => row.id === activeId);
    if (exact !== -1) return exact;
    return rows.reduce((nearest, row, index) => (activeId.startsWith(`${row.id}/`) ? index : nearest), 0);
  }, [activeId, rows]);

  useEffect(() => {
    if (pendingFocus.current === null) return;
    focusRow(pendingFocus.current);
    pendingFocus.current = null;
  }, [rows]);

  useEffect(() => () => {
    copyVersion.current += 1;
    if (copiedTimer.current) clearTimeout(copiedTimer.current);
  }, []);

  function focusRow(index: number) {
    (treeRef.current?.children[index] as HTMLElement | undefined)?.focus();
  }

  function toggle(row: Row) {
    if (row.expanded === undefined) return;
    setExpansion((current) => ({ ...current, toggles: new Map(current.toggles).set(row.id, !row.expanded) }));
  }

  function showMore(index: number) {
    pendingFocus.current = index;
    setRowPages((pages) => pages + 1);
  }

  function expandAll(depth: number) {
    setExpansion({ depth, toggles: new Map() });
    setRowPages(1);
  }

  async function copy(row: NodeRow, kind: JsonTreeCopyKind) {
    const version = ++copyVersion.current;
    const detail = { kind, path: row.path };
    let text: string;
    try {
      text = kind === "path" ? formatPath(row.path) : clipboardText(redact ? redactedValue(row, redact, labels.mask) : row.value);
      await copyText(text);
    } catch (error) {
      if (copyVersion.current !== version) return;
      setCopied(null);
      setCopyFailed(true);
      onCopyError?.(error, detail);
      return;
    }
    if (copyVersion.current !== version) return;
    setCopyFailed(false);
    setCopied({ id: row.id, kind });
    if (copiedTimer.current) clearTimeout(copiedTimer.current);
    copiedTimer.current = setTimeout(() => setCopied(null), COPIED_MS);
    onCopy?.({ ...detail, text });
  }

  function handleClick(event: MouseEvent<HTMLDivElement>) {
    const target = event.target as Element;
    const action = target.closest<HTMLElement>("[data-action]")?.dataset.action;
    const row = rowOf(target);
    if (!action || !row) return;
    if (action === "more") showMore(rows.indexOf(row));
    // Dragging across a row to select its text also ends in a click.
    else if (action === "toggle") { if (!window.getSelection()?.toString()) toggle(row); }
    else if ("path" in row) void copy(row, action === "copy-path" ? "path" : "value");
  }

  function rowOf(target: EventTarget) {
    return rows[Number((target as Element).closest<HTMLElement>("[data-index]")?.dataset.index)];
  }

  function handleFocus(event: FocusEvent<HTMLDivElement>) {
    const row = rowOf(event.target);
    if (row) setActiveId(row.id);
  }

  function findByTyping(key: string, index: number) {
    const now = Date.now();
    const continuing = now - typeAhead.current.at < TYPE_AHEAD_PAUSE_MS;
    const text = (continuing ? typeAhead.current.text + key : key).toLowerCase();
    typeAhead.current = { text, at: now };
    for (let offset = continuing ? 0 : 1; offset < rows.length + (continuing ? 0 : 1); offset += 1) {
      const candidate = (index + offset) % rows.length;
      const row = rows[candidate]!;
      if ("name" in row && row.name !== null && String(row.name).toLowerCase().startsWith(text)) {
        focusRow(candidate);
        return;
      }
    }
  }

  function handleKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    const target = event.target as HTMLElement;
    if (target.getAttribute("role") !== "treeitem" || event.altKey || event.ctrlKey || event.metaKey) return;
    const index = Number(target.dataset.index);
    const row = rows[index]!;
    let handled = true;
    switch (event.key) {
      case "ArrowDown": focusRow(Math.min(index + 1, rows.length - 1)); break;
      case "ArrowUp": focusRow(Math.max(index - 1, 0)); break;
      case "Home": focusRow(0); break;
      case "End": focusRow(rows.length - 1); break;
      case "ArrowRight":
        if (row.expanded === false) toggle(row);
        else if (row.expanded && rows[index + 1]!.depth > row.depth) focusRow(index + 1);
        break;
      case "ArrowLeft":
        if (row.expanded) toggle(row);
        else if ("path" in row && row.depth > 0) {
          let parent = index - 1;
          while (rows[parent]!.depth >= row.depth) parent -= 1;
          focusRow(parent);
        }
        break;
      case "Enter":
      case " ":
        if ("path" in row) toggle(row);
        else showMore(index);
        break;
      default:
        if (event.key.length === 1) findByTyping(event.key, index);
        else handled = false;
    }
    if (handled) event.preventDefault();
  }

  const root = rows[0] as NodeRow;
  const copiedMessage = copied?.kind === "value" ? labels.copiedValue : copied?.kind === "path" ? labels.copiedPath : "";
  return (
    <div {...props} data-slot="json-tree" className={cn("ci-json-tree", className)}>
      {showControls && root.size ? (
        <div className="ci-json-tree__controls">
          <Button type="button" variant="ghost" size="sm" onClick={() => expandAll(Infinity)}>{labels.expandAll}</Button>
          <Button type="button" variant="ghost" size="sm" onClick={() => expandAll(0)}>{labels.collapseAll}</Button>
        </div>
      ) : null}
      <div
        ref={treeRef}
        role="tree"
        aria-label={ariaLabelledBy ? undefined : ariaLabel ?? labels.tree}
        aria-labelledby={ariaLabelledBy}
        className="ci-json-tree__tree"
        onClick={handleClick}
        onFocus={handleFocus}
        onKeyDown={handleKeyDown}
        onMouseOver={(event) => setHoveredId(rowOf(event.target)?.id ?? null)}
        onMouseLeave={() => setHoveredId(null)}
      >
        {rows.map((row, index) => (
          <JsonTreeRow
            key={row.id}
            row={row}
            index={index}
            baseId={baseId}
            active={index === activeIndex}
            actions={index === activeIndex || row.id === hoveredId}
            copied={copied?.id === row.id ? copied.kind : undefined}
            labels={labels}
            maxStringLength={maxStringLength}
          />
        ))}
      </div>
      <span role="status" className="ci-sr-only">{copiedMessage}</span>
      {copyFailed ? <p role="alert" className="ci-json-tree__error">{labels.copyError}</p> : null}
    </div>
  );
}
