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
  const [pendingPage, setPendingPage] = useState<{ filterKey: string; page: number } | null>(null);
  const filterChanged = paginationFilter !== filterKey;
  const requestedPage = pendingPage?.filterKey === filterKey ? pendingPage.page : null;
  const visiblePage =
    requestedPage !== null
      ? clampComboPage(requestedPage, items.length)
      : filterChanged
        ? 1
        : clampComboPage(page, items.length);

  // A reveal can request a page for a filter that the router has not committed yet.
  // Keep that request across intermediate renders, then consume it with that filter.
  if (pendingPage && (requestedPage !== null || filterChanged)) setPendingPage(null);

  // Reconcile filter/count changes during render so the page never paints an empty,
  // out-of-range slice. React explicitly supports guarded same-component state
  // adjustment during render, and it avoids a second stale-page commit from an effect.
  if (filterChanged) {
    setPaginationFilter(filterKey);
    if (page !== visiblePage) setPage(visiblePage);
  } else if (visiblePage !== page) {
    setPage(visiblePage);
  }

  return {
    page: visiblePage,
    setPage: (nextPage: number, targetFilterKey = filterKey) => {
      if (targetFilterKey === filterKey) {
        setPendingPage(null);
        setPage(nextPage);
      } else {
        setPendingPage({ filterKey: targetFilterKey, page: nextPage });
      }
    },
    pageCount: getComboPageCount(items.length),
    pageItems: getComboPageItems(items, visiblePage),
    pageStart: items.length === 0 ? 0 : (visiblePage - 1) * COMBO_PAGE_SIZE + 1,
    pageEnd: Math.min(visiblePage * COMBO_PAGE_SIZE, items.length),
  };
}
