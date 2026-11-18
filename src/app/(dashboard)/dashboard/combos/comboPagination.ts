export const COMBO_PAGE_SIZE = 24;

export function getComboPageCount(totalItems: number, pageSize = COMBO_PAGE_SIZE): number {
  if (!Number.isFinite(totalItems) || totalItems <= 0) return 1;
  if (!Number.isFinite(pageSize) || pageSize <= 0) return 1;
  return Math.max(1, Math.ceil(totalItems / pageSize));
}

export function clampComboPage(
  page: number,
  totalItems: number,
  pageSize = COMBO_PAGE_SIZE
): number {
  const normalizedPage = Number.isFinite(page) ? Math.floor(page) : 1;
  return Math.min(Math.max(1, normalizedPage), getComboPageCount(totalItems, pageSize));
}

export function getComboPageItems<T>(
  items: readonly T[],
  page: number,
  pageSize = COMBO_PAGE_SIZE
): T[] {
  const currentPage = clampComboPage(page, items.length, pageSize);
  const start = (currentPage - 1) * pageSize;
  return items.slice(start, start + pageSize);
}

export function findComboPage<T extends { id: string | number }>(
  items: readonly T[],
  comboId: string,
  pageSize = COMBO_PAGE_SIZE
): number {
  const comboIndex = items.findIndex((combo) => String(combo.id) === comboId);
  return comboIndex < 0 ? 1 : Math.floor(comboIndex / pageSize) + 1;
}

export function comboListContains(
  items: unknown,
  comboId: string
): items is Array<{ id: string | number }> {
  return Array.isArray(items) && items.some((combo) => String(combo?.id) === comboId);
}

/** The combos URL with the strategy filter dropped (other query params are kept). */
export function buildUnfilteredCombosHref(search: string): string {
  const params = new URLSearchParams(search);
  params.delete("filter");
  const queryString = params.toString();
  return `/dashboard/combos${queryString ? `?${queryString}` : ""}`;
}

/** Scroll a card into view once React has rendered it (bounded retries, one per frame). */
export function scrollToComboCardWhenRendered(comboId: string, maxFrames = 12): void {
  let remainingFrames = maxFrames;
  const scrollWhenRendered = () => {
    const element = document.querySelector(`[data-testid="combo-card-${comboId}"]`);
    if (element) {
      element.scrollIntoView({ behavior: "auto", block: "center" });
      return;
    }
    remainingFrames -= 1;
    if (remainingFrames > 0) requestAnimationFrame(scrollWhenRendered);
  };
  requestAnimationFrame(scrollWhenRendered);
}
