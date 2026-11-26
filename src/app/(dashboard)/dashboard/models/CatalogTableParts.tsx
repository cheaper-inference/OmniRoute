"use client";

import type { ReactNode } from "react";
import { useTranslations } from "next-intl";
import { DataTableFooter } from "@omniroute/ui-kit/data-table-shell";
import { TableCell, TableHead } from "@omniroute/ui-kit/table";
import { Checkbox, Pager } from "@/shared/components";

// Cells and footer shared by the model and combo catalog tables (kit Table cells, Checkbox
// adapter, kit DataTableFooter).

/** A column heading without sorting. */
export function PlainHeading({ children }: { children: ReactNode }) {
  return <TableHead scope="col">{children}</TableHead>;
}

/** The right-aligned heading above the per-row test buttons. */
export function ActionsHeading() {
  const t = useTranslations("modelCatalog");
  return (
    <TableHead scope="col" align="end">
      {t("actions")}
    </TableHead>
  );
}

/** Page-wide selection checkbox; `indeterminate` marks a partly selected page. */
export function SelectAllHeaderCell({
  checked,
  indeterminate,
  onToggle,
  label,
}: {
  checked: boolean;
  indeterminate: boolean;
  onToggle: () => void;
  label: string;
}) {
  return (
    <TableHead scope="col" className="w-10">
      {/* The adapter forwards `indeterminate` as the kit prop (not a ref callback: the kit
          effect would overwrite a ref-set value). */}
      <Checkbox
        checked={checked}
        indeterminate={indeterminate}
        onChange={onToggle}
        aria-label={label}
      />
    </TableHead>
  );
}

export function SelectRowCell({
  checked,
  onToggle,
  label,
}: {
  checked: boolean;
  onToggle: () => void;
  label: string;
}) {
  return (
    <TableCell className="w-10">
      <Checkbox checked={checked} onChange={onToggle} aria-label={label} />
    </TableCell>
  );
}

/** Result summary (the children) plus previous/next paging under a catalog table. */
export function CatalogTableFooter({
  page,
  pageCount,
  onPrevious,
  onNext,
  children,
}: {
  page: number;
  pageCount: number;
  onPrevious: () => void;
  onNext: () => void;
  children: ReactNode;
}) {
  const t = useTranslations("modelCatalog");
  return (
    <DataTableFooter
      className="border-t border-border px-4 py-3"
      metadata={
        <p className="text-sm text-text-muted" aria-live="polite">
          {children}
        </p>
      }
      pagination={
        <Pager
          variant="summary"
          page={page}
          pageCount={pageCount}
          onPageChange={(next) => (next < page ? onPrevious() : onNext())}
          labels={{
            previous: t("previous"),
            next: t("next"),
            summary: (current, count) => t("page", { page: current, pageCount: count }),
          }}
        />
      }
    />
  );
}
