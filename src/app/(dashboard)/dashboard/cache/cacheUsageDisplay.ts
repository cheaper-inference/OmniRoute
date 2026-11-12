/** Cache sums may cover only known rows. Missing never means measured zero. */
export function cacheMetric(
  value: number | null | undefined,
  complete: boolean | undefined,
  unknown: string,
  partial: string
): string {
  return value == null
    ? unknown
    : `${value.toLocaleString()}${complete === false ? ` (${partial})` : ""}`;
}
export function cacheRatio(
  numerator: number | null | undefined,
  denominator: number,
  complete: boolean | undefined
): number | null {
  if (numerator == null || complete === false) return null;
  return denominator > 0 ? (numerator / denominator) * 100 : 0;
}
export function cachePercent(value: number | null, unknown: string): string {
  return value == null ? unknown : `${value.toFixed(1)}%`;
}
export function cacheActivityComplete(
  read: number | null,
  write: number | null,
  readComplete?: boolean,
  writeComplete?: boolean
): boolean {
  return read !== null && write !== null && readComplete !== false && writeComplete !== false;
}
