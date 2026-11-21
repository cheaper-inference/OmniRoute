/** Keep exact discovered models when the same provider has no unsuffixed sibling. */
export function visibleCodexModels<T extends { id?: unknown; owned_by?: unknown }>(
  rows: T[],
  providerPage = false
): T[] {
  const isCodex = (row: T) => providerPage || row.owned_by === "codex";
  const ids = new Set(rows.filter(isCodex).map((row) => row.id));
  return rows.filter((row) => {
    if (!isCodex(row) || typeof row.id !== "string") return true;
    const match =
      /^(.+?)(?:-(?:none|minimal|low|medium|high|xhigh|max|ultra)|\((?:max|ultra)\))$/.exec(row.id);
    return !match || !ids.has(match[1]);
  });
}
