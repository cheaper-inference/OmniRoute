"use client";

import { useMemo } from "react";
import { useTranslations } from "next-intl";
import {
  PaginationControls,
  type PaginationControlsLabels,
  type PaginationControlsProps,
} from "@omniroute/ui-kit/pagination-controls";

/**
 * The kit pager texts, translated (`common`). Exported for the one shape the kit
 * `PaginationControls` does not cover, a pager without a page count (offset paging): compose the
 * kit `PaginationPrevious` / `PaginationNext` with `asChild` and take the names from here.
 */
export function usePagerLabels(): PaginationControlsLabels {
  const t = useTranslations("common");
  return useMemo(
    () => ({
      navigation: t("pagination"),
      previous: t("previous"),
      next: t("next"),
      previousPage: t("previousPage"),
      nextPage: t("nextPage"),
      goToPage: (page) => t("goToPage", { page }),
      morePages: t("morePages"),
      summary: (page, pageCount) => t("pageSummary", { page, pageCount }),
    }),
    [t]
  );
}

export type PagerProps = PaginationControlsProps;

/**
 * Pager — adapter over the kit `PaginationControls`, with its texts translated.
 *
 * Paging kept in state: `page` starts at 1, `onPageChange` gets the page to show. The default
 * variant lists page numbers (first, current, last, with ellipses); `variant="summary"` shows
 * "Page X of Y" between Previous and Next. `disabled` turns every button off while a page
 * loads. Other props go to the `<nav>`; `labels` replaces single texts (the landmark name of a
 * second pager on the same screen, for example).
 *
 * In a table, pass it as the footer's pagination:
 *   <DataTableFooter pagination={<Pager page={page} pageCount={pages} onPageChange={setPage} />} />
 */
export default function Pager({ labels, ...props }: PagerProps) {
  const translated = usePagerLabels();
  const resolved = useMemo(
    () => (labels ? { ...translated, ...labels } : translated),
    [translated, labels]
  );
  return <PaginationControls {...props} labels={resolved} />;
}
