/** Copies only the defined overrides, so an omitted or `undefined` key keeps its English default. */
export function resolveLabels<T extends object>(defaults: T, overrides: Partial<T> | undefined): T {
  const labels = { ...defaults };
  if (!overrides) return labels;
  for (const key of Object.keys(overrides) as (keyof T)[]) {
    const value = overrides[key];
    if (value !== undefined) Object.assign(labels, { [key]: value });
  }
  return labels;
}
