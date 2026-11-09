"use client";

import { useTranslations } from "next-intl";
import Button from "@/shared/components/Button";
import { getI18nOrFallback } from "./comboPageHelpers";

type Translator = ReturnType<typeof useTranslations>;

type ComboListToolbarProps = {
  t: Translator;
  tc: Translator;
  comboCount: number;
  filteredCount: number;
  pageStart: number;
  pageEnd: number;
  reordering: boolean;
  savingOrder: boolean;
  onToggleReorder: () => void;
};

/** Page summary + the "Reorder all" switch above the combo inventory. */
export function ComboListToolbar({
  t,
  tc,
  comboCount,
  filteredCount,
  pageStart,
  pageEnd,
  reordering,
  savingOrder,
  onToggleReorder,
}: ComboListToolbarProps) {
  const tm = useTranslations("modelCatalog");
  const summary = reordering
    ? getI18nOrFallback(
        t,
        "reorderAllDescription",
        `Reordering all ${comboCount} combos. Drag handles are enabled.`,
        { count: comboCount }
      )
    : getI18nOrFallback(
        tm,
        "showingCombos",
        `Showing ${pageStart}–${pageEnd} of ${filteredCount} combos`,
        { first: pageStart, last: pageEnd, total: filteredCount }
      );

  return (
    <div
      className="flex flex-col gap-2 rounded-xl border border-border bg-bg-subtle p-3 sm:flex-row sm:items-center sm:justify-between"
      data-testid="combo-list-toolbar"
    >
      <p className="text-xs text-text-muted" aria-live="polite">
        {summary}
      </p>
      {comboCount > 1 && (
        <Button
          size="sm"
          variant={reordering ? "primary" : "secondary"}
          icon={reordering ? "check" : "swap_vert"}
          onClick={onToggleReorder}
          disabled={savingOrder}
          aria-pressed={reordering}
          data-testid="combo-reorder-all-toggle"
        >
          {reordering
            ? getI18nOrFallback(tc, "done", "Done")
            : getI18nOrFallback(t, "reorderAll", "Reorder all")}
        </Button>
      )}
    </div>
  );
}

type ComboPaginationNavProps = {
  tc: Translator;
  page: number;
  pageCount: number;
  onPageChange: (page: number) => void;
};

/** Previous / next controls shown below the combo cards when there is more than one page. */
export function ComboPaginationNav({ tc, page, pageCount, onPageChange }: ComboPaginationNavProps) {
  const tm = useTranslations("modelCatalog");
  return (
    <nav
      className="flex flex-wrap items-center justify-center gap-3 pt-2"
      aria-label={getI18nOrFallback(tc, "pagination", "Pagination")}
      data-testid="combo-pagination"
    >
      <Button
        size="sm"
        variant="secondary"
        icon="chevron_left"
        onClick={() => onPageChange(Math.max(1, page - 1))}
        disabled={page <= 1}
        aria-label={getI18nOrFallback(tc, "previousPage", "Previous page")}
        data-testid="combo-pagination-previous"
      >
        {getI18nOrFallback(tc, "previousPage", "Previous page")}
      </Button>
      <span className="text-sm tabular-nums text-text-muted" aria-current="page">
        {getI18nOrFallback(tm, "page", `Page ${page} of ${pageCount}`, {
          page,
          pageCount,
        })}
      </span>
      <Button
        size="sm"
        variant="secondary"
        iconRight="chevron_right"
        onClick={() => onPageChange(Math.min(pageCount, page + 1))}
        disabled={page >= pageCount}
        aria-label={getI18nOrFallback(tc, "nextPage", "Next page")}
        data-testid="combo-pagination-next"
      >
        {getI18nOrFallback(tc, "next", "Next")}
      </Button>
    </nav>
  );
}
