/**
 * Lenient boolean parsing shared by the settings readers.
 *
 * The dashboard (`getUserDatabaseSettings`) and the request path
 * (`resolveCallLogPipelineEnabled`) must agree on what a stored value means,
 * otherwise the panel can show a toggle as on while requests ignore it.
 * Returns null when the value is not a recognizable boolean.
 */
export function toBooleanSetting(value: unknown): boolean | null {
  if (typeof value === "boolean") return value;
  if (typeof value === "number") return !Number.isNaN(value) && value !== 0;
  if (typeof value !== "string") return null;

  const normalized = value.trim().toLowerCase();
  if (["1", "true", "yes", "on"].includes(normalized)) return true;
  if (["0", "false", "no", "off"].includes(normalized)) return false;
  return null;
}
