import { useState } from "react";
import {
  COMBO_PAGE_SIZE,
  clampComboPage,
  getComboPageCount,
  getComboPageItems,
} from "./comboPagination";

/**
 * Client-side pagination for the (already filtered) combo inventory.
 *
 * `filterKey` identifies the active filter: switching it returns to page 1.
 */
export function useComboPagination<T>(items: readonly T[], filterKey: string) {
  const [page, setPage] = useState(1);
  const [paginationFilter, setPaginationFilter] = useState(filterKey);
  const filterChanged = paginationFilter !== filterKey;
  const visiblePage = filterChanged ? 1 : clampComboPage(page, items.length);

  // Reconcile filter/count changes during render so the page never paints an empty,
  // out-of-range slice. React explicitly supports guarded same-component state
  // adjustment during render, and it avoids a second stale-page commit from an effect.
  if (filterChanged) {
    setPaginationFilter(filterKey);
    if (page !== 1) setPage(1);
  } else if (visiblePage !== page) {
    setPage(visiblePage);
  }

  return {
    page: visiblePage,
    setPage,
    pageCount: getComboPageCount(items.length),
    pageItems: getComboPageItems(items, visiblePage),
    pageStart: items.length === 0 ? 0 : (visiblePage - 1) * COMBO_PAGE_SIZE + 1,
    pageEnd: Math.min(visiblePage * COMBO_PAGE_SIZE, items.length),
  };
}
