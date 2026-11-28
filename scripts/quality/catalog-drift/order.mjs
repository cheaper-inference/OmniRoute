// Code-unit order: the same order Array.prototype.sort() gives strings, independent of locale.
// Fingerprints and reports depend on it staying stable from one run to the next.
export function byCodeUnit(a, b) {
  return a < b ? -1 : a > b ? 1 : 0;
}
