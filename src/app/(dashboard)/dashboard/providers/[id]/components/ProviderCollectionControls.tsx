"use client";

import type { ReactNode } from "react";
import { useTranslations } from "next-intl";
import { Table } from "@omniroute/ui-kit/table";
import { Button, Select } from "@/shared/components";
import { providerText } from "../providerPageHelpers";

export type CollectionView = "list" | "cards" | "table";
export type CollectionPageSize = number | "all";
export const COLLECTION_PAGE_SIZES = [10, 15, 20, 25, 50, 100, "all"] as const;

export function CollectionViewControls({
  view,
  onChange,
  columns,
  onColumnsChange,
}: {
  view: CollectionView;
  onChange: (view: CollectionView) => void;
  columns: number;
  onColumnsChange: (columns: number) => void;
}) {
  const t = useTranslations("providers");
  return (
    <div className="flex shrink-0 flex-wrap items-center gap-2 lg:flex-nowrap">
      <div
        role="group"
        aria-label={providerText(t, "collectionView", "View")}
        className="inline-flex gap-1 rounded-lg border border-border bg-surface p-1"
      >
        {(
          [
            ["list", "view_list", "viewList", "List"],
            ["cards", "grid_view", "viewCards", "Cards"],
            ["table", "table_chart", "viewTable", "Table"],
          ] as const
        ).map(([value, icon, key, fallback]) => (
          <Button
            key={value}
            variant={view === value ? "secondary" : "ghost"}
            size="icon-sm"
            icon={icon}
            aria-label={providerText(t, key, fallback)}
            title={providerText(t, key, fallback)}
            aria-pressed={view === value}
            onClick={() => onChange(value)}
          />
        ))}
      </div>
      {view === "cards" && (
        <Select
          compact
          className="!flex !w-auto !flex-nowrap !justify-start whitespace-nowrap"
          label={providerText(t, "cardsPerRow", "Cards per row")}
          value={String(columns)}
          onChange={(e) => onColumnsChange(Number(e.target.value))}
          options={[3, 4].map((n) => ({ value: String(n), label: String(n) }))}
        />
      )}
    </div>
  );
}

export function CollectionPagination({
  total,
  page,
  pageSize,
  onPage,
  onPageSize,
}: {
  total: number;
  page: number;
  pageSize: CollectionPageSize;
  onPage: (page: number) => void;
  onPageSize: (size: CollectionPageSize) => void;
}) {
  const t = useTranslations("providers");
  const size = pageSize === "all" ? Math.max(1, total) : pageSize;
  const pages = Math.max(1, Math.ceil(total / size));
  const current = Math.min(page, pages - 1);
  const pageNumbers = Array.from(new Set([0, current - 1, current, current + 1, pages - 1]))
    .filter((n) => n >= 0 && n < pages)
    .sort((a, b) => a - b);
  return (
    <div className="grid grid-cols-1 items-center gap-3 py-3 text-xs text-text-muted md:grid-cols-[1fr_auto_1fr]">
      <span className="tabular-nums">
        {total ? current * size + 1 : 0}–{Math.min((current + 1) * size, total)} / {total}
      </span>
      <nav
        aria-label={providerText(t, "collectionPagination", "Pagination")}
        className="flex items-center justify-center gap-1"
      >
        <Button
          variant="ghost"
          size="icon-sm"
          icon="chevron_left"
          aria-label={providerText(t, "catalogPreviousPage", "Previous page")}
          disabled={current === 0}
          onClick={() => onPage(current - 1)}
        />
        {pageNumbers.map((n, i) => (
          <span key={n} className="contents">
            {i > 0 && n > pageNumbers[i - 1] + 1 && (
              <span aria-hidden="true" className="px-1">
                …
              </span>
            )}
            <Button
              size="icon-sm"
              variant={n === current ? "primary" : "ghost"}
              aria-label={providerText(t, "collectionPageNumber", "Page {page}", { page: n + 1 })}
              aria-current={n === current ? "page" : undefined}
              onClick={() => onPage(n)}
            >
              {n + 1}
            </Button>
          </span>
        ))}
        <Button
          variant="ghost"
          size="icon-sm"
          icon="chevron_right"
          aria-label={providerText(t, "catalogNextPage", "Next page")}
          disabled={current >= pages - 1}
          onClick={() => onPage(current + 1)}
        />
      </nav>
      <div className="justify-self-end">
        <Select
          compact
          label={providerText(t, "itemsPerPage", "Per page")}
          value={String(pageSize)}
          onChange={(e) => onPageSize(e.target.value === "all" ? "all" : Number(e.target.value))}
          options={COLLECTION_PAGE_SIZES.map((n) => ({
            value: String(n),
            label: n === "all" ? providerText(t, "collectionAllItems", "All") : String(n),
          }))}
        />
      </div>
    </div>
  );
}

export function CollectionLayout({
  view,
  columns,
  headers,
  children,
  empty = false,
}: {
  view: CollectionView;
  columns: number;
  headers: string[];
  children: ReactNode;
  empty?: boolean;
  className?: string;
}) {
  if (empty) return <div className="rounded-lg border border-border">{children}</div>;
  if (view === "table")
    return (
      <div className="max-w-full overflow-x-auto rounded-lg border border-border">
        <Table className="w-full min-w-[800px] text-left text-sm">
          <thead className="bg-bg-subtle">
            <tr>
              {headers.map((h) => (
                <th key={h} scope="col" className="px-4 py-3 font-medium text-text-muted">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-border">{children}</tbody>
        </Table>
      </div>
    );
  return (
    <div
      className={
        view === "cards"
          ? `grid grid-cols-1 gap-4 md:grid-cols-2 ${columns === 3 ? "xl:grid-cols-3" : "xl:grid-cols-3 2xl:grid-cols-4"} [&>div]:rounded-xl [&>div]:border [&>div]:border-border`
          : "flex flex-col divide-y divide-border overflow-hidden rounded-lg border border-border"
      }
    >
      {children}
    </div>
  );
}
