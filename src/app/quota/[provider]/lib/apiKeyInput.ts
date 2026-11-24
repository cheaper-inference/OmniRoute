export type ApiKeyInput = { ok: true; key: string } | { ok: false; problem: "empty" | "malformed" };

const MAX_KEY_LENGTH = 512;
// Printable ASCII without the space: what an Authorization header value can carry as a token.
const KEY_PATTERN = /^[\x21-\x7e]+$/;
const BEARER_PREFIX = /^bearer(?:\s+|$)/i;

/** Drops one pair of matching surrounding quotes. */
function unquote(value: string): string {
  const first = value[0];
  if (value.length >= 2 && (first === '"' || first === "'") && value.at(-1) === first) {
    return value.slice(1, -1).trim();
  }
  return value;
}

/** Trims; drops one pair of surrounding quotes and one leading "Bearer " (any case); then accepts 1..512 printable ASCII characters with no space. */
export function parseApiKeyInput(raw: string): ApiKeyInput {
  const key = unquote(raw.trim()).replace(BEARER_PREFIX, "").trim();
  if (key.length === 0) return { ok: false, problem: "empty" };
  if (key.length > MAX_KEY_LENGTH || !KEY_PATTERN.test(key)) {
    return { ok: false, problem: "malformed" };
  }
  return { ok: true, key };
}
