"use client";

import type { useTranslations } from "next-intl";
import Button from "@/shared/components/Button";
import Pager from "@/shared/components/Pager";
import { getI18nOrFallback } from "./comboPageHelpers";

type Translator = ReturnType<typeof useTranslations>;

type ComboListToolbarProps = {
  t: Translator;
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
  comboCount,
  filteredCount,
  pageStart,
  pageEnd,
  reordering,
  savingOrder,
  onToggleReorder,
}: ComboListToolbarProps) {
  const summary = reordering
    ? getI18nOrFallback(
        t,
        "reorderAllDescription",
        `Reordering all ${comboCount} combos. Drag handles are enabled.`,
        { count: comboCount }
      )
    : getI18nOrFallback(
        t,
        "paginationSummary",
        `Showing ${pageStart}-${pageEnd} of ${filteredCount} combos`,
        { start: pageStart, end: pageEnd, total: filteredCount }
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
            ? getI18nOrFallback(t, "finishReorder", "Done reordering")
            : getI18nOrFallback(t, "reorderAll", "Reorder all")}
        </Button>
      )}
    </div>
  );
}

type ComboPaginationNavProps = {
  t: Translator;
  tc: Translator;
  page: number;
  pageCount: number;
  onPageChange: (page: number) => void;
};

/** Previous / next controls shown below the combo cards when there is more than one page. */
export function ComboPaginationNav({
  t,
  tc,
  page,
  pageCount,
  onPageChange,
}: ComboPaginationNavProps) {
  return (
    <Pager
      variant="summary"
      className="pt-2"
      data-testid="combo-pagination"
      page={page}
      pageCount={pageCount}
      onPageChange={onPageChange}
      labels={{
        navigation: getI18nOrFallback(t, "paginationLabel", "Combo pages"),
        previous: getI18nOrFallback(tc, "previous", "Previous"),
        next: getI18nOrFallback(tc, "next", "Next"),
        previousPage: getI18nOrFallback(t, "previousPage", "Previous combo page"),
        nextPage: getI18nOrFallback(t, "nextPage", "Next combo page"),
        summary: (current, count) =>
          getI18nOrFallback(t, "paginationPage", `Page ${current} of ${count}`, {
            page: current,
            totalPages: count,
          }),
      }}
    />
  );
}
