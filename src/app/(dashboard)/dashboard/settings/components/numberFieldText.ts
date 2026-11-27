/**
 * Bridges for settings screens whose state keeps a numeric field as text (or as "number or
 * text") while the shared `NumberInput` speaks `number | null`, where `null` is an empty field.
 */

/** The number a text (or number) state stands for; `null` when it is empty or not a number. */
export function fieldNumber(value: unknown): number | null {
  if (typeof value === "number") return Number.isFinite(value) ? value : null;
  if (typeof value !== "string" || value.trim() === "") return null;
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : null;
}

/** The text a screen stores for the number the field holds; an empty field is `""`. */
export function fieldText(value: number | null): string {
  return value === null ? "" : String(value);
}
