/**
 * Readable names for the settings a combo stores in `config`, as the control center lists
 * them. Pure and client-safe. The English names live in `comboControl.runtimeConfigLabel.*`;
 * a key without a message (a setting added later, a hand-written config) is spelled out in
 * words, so a raw key such as `explorationRate` is never what the user reads.
 */

/** The part of a next-intl translator this needs (`has` is absent on some test doubles). */
type LabelTranslator = ((key: string) => string) & { has?: (key: string) => boolean };

const LABEL_NAMESPACE = "runtimeConfigLabel";

/** `retryDelayMs` → "Retry delay (ms)", `service_tier` → "Service tier". */
export function humanizeRuntimeConfigKey(key: string): string {
  const words = key
    .replace(/[_-]+/g, " ")
    .replace(/([a-z0-9])([A-Z])/g, "$1 $2")
    .replace(/([A-Z]+)([A-Z][a-z])/g, "$1 $2")
    .trim()
    .split(/\s+/)
    .filter(Boolean);
  if (words.length === 0) return key;
  const unit = words.length > 1 && words[words.length - 1].toLowerCase() === "ms";
  if (unit) words.pop();
  const text = words
    .map((word, index) => {
      // An acronym keeps its capitals ("TTL"); everything else reads as a sentence.
      if (word.length > 1 && word === word.toUpperCase()) return word;
      const lower = word.toLowerCase();
      return index === 0 ? lower.charAt(0).toUpperCase() + lower.slice(1) : lower;
    })
    .join(" ");
  return unit ? `${text} (ms)` : text;
}

/** The label of one stored setting: its message when there is one, else the key in words. */
export function runtimeConfigLabel(key: string, t: LabelTranslator): string {
  const messageKey = `${LABEL_NAMESPACE}.${key}`;
  try {
    if (typeof t.has === "function" && t.has(messageKey)) return t(messageKey);
  } catch {
    // A key next-intl cannot look up (for example one with a dot) falls through to its words.
  }
  return humanizeRuntimeConfigKey(key);
}
