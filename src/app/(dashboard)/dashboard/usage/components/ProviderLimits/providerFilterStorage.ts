/** Empty selection means all providers. Accept the previous single-value storage format. */
export function parseProviderFilter(saved: string): string[] {
  if (!saved || saved === "all") return [];
  try {
    const value: unknown = JSON.parse(saved);
    return Array.isArray(value) &&
      value.every((id) => typeof id === "string" && id.length > 0 && id !== "all")
      ? [...new Set(value)]
      : [];
  } catch {
    return /^[\w-]+$/.test(saved) ? [saved] : [];
  }
}
