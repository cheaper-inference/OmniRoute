/**
 * True when `id` addresses a built-in virtual auto combo rather than a
 * persisted combo row — either the bare default `auto` or an `auto/<suffix>` id
 * (variants, `auto/<category>[:<tier>]`, `auto/<family>`).
 */
export function isAutoComboId(id: string): boolean {
  return id === "auto" || id.startsWith("auto/");
}

/** Names reserved for built-in automatic routing, regardless of case. */
export function isReservedComboName(name: string): boolean {
  return isAutoComboId(name.toLowerCase());
}
