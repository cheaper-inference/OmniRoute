/** Whether the ID uses the automatic routing namespace. */
export function isAutoComboId(id: string): boolean {
  return id === "auto" || id.startsWith("auto/");
}

/** Names reserved for built-in automatic routing, regardless of case. */
export function isReservedComboName(name: string): boolean {
  return isAutoComboId(name.toLowerCase());
}
