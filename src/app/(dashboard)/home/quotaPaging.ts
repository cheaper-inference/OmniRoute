export interface QuotaPaging {
  /** True for the first section of each page: the scroll container snaps to these. */
  pageStarts: boolean[];
  /** Empty space to leave after each section so the next page starts at the viewport top. */
  spacers: number[];
}

/**
 * Packs sections of the given heights into pages that fit the viewport without cutting any of them.
 * A section taller than the viewport gets a page of its own (it cannot avoid scrolling).
 * The last page is padded to a full viewport so the container can scroll to its start.
 */
export function packPages(heights: number[], viewport: number, slack = 2): QuotaPaging {
  const pageStarts = heights.map(() => false);
  const spacers = heights.map(() => 0);
  if (!heights.length || !Number.isFinite(viewport) || viewport <= 0) {
    if (heights.length) pageStarts[0] = true;
    return { pageStarts, spacers };
  }

  const limit = viewport - slack;
  let used = 0;
  let pageSize = 0;

  heights.forEach((rawHeight, index) => {
    const height = Math.max(0, rawHeight);
    if (pageSize > 0 && used + height > limit) {
      spacers[index - 1] = Math.max(0, viewport - used);
      used = 0;
      pageSize = 0;
    }
    if (pageSize === 0) pageStarts[index] = true;
    used += height;
    pageSize += 1;
  });

  const last = heights.length - 1;
  if (last >= 0 && used < viewport) spacers[last] = viewport - used;

  return { pageStarts, spacers };
}

export function samePaging(a: QuotaPaging, b: QuotaPaging): boolean {
  return (
    a.pageStarts.length === b.pageStarts.length &&
    a.pageStarts.every((value, i) => value === b.pageStarts[i]) &&
    a.spacers.every((value, i) => Math.abs(value - b.spacers[i]) < 1)
  );
}
