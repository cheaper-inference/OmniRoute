/**
 * The provider forms keep an optional number as text: "" means "not set" and is sent as
 * "inherit". These two convert that text to and from the `number | null` value of the
 * NumberInput adapter, so a form can use the field without changing the shape of its state.
 */

/** Form text (or a stored number) as the field value; `null` for an empty or unreadable text. */
export function textToNumber(text: string | number | null | undefined): number | null {
  if (typeof text === "number") return Number.isFinite(text) ? text : null;
  const trimmed = (text ?? "").trim();
  if (trimmed === "") return null;
  const parsed = Number(trimmed);
  return Number.isFinite(parsed) ? parsed : null;
}

/** Field value as form text; an empty field is the empty string. */
export function numberToText(value: number | null): string {
  return value === null ? "" : String(value);
}
