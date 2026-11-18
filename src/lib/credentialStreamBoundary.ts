import { CREDENTIAL_PATTERNS } from "@omniroute/open-sse/utils/credentialPatterns.ts";

const TOKEN_BOUNDARY = /[\s"'\\{}\[\],]/;
const IMAGE_DATA = /data:image\/[a-zA-Z0-9.+-]+;base64,[a-zA-Z0-9+/=]*/g;
const AUTH_TAIL =
  /(?:authorization|x-api-key|api-key|apikey)["']?\s*[:=]\s*["']?(?:(?:Bearer|Basic|Token)\s+)?[A-Za-z0-9._~+/=-]*$/i;

function beforeCrossingMatch(text: string, pattern: RegExp, cut: number, forward = false): number {
  for (const match of text.matchAll(
    new RegExp(pattern.source, pattern.flags.includes("g") ? pattern.flags : pattern.flags + "g")
  )) {
    const start = match.index!;
    if (start < cut && start + match[0].length > cut)
      return forward ? start + match[0].length : start;
  }
  return cut;
}

/** Cut raw text before an unfinished lexical token or any complete sensitive span. */
export function credentialSafeCut(text: string, desired: number): number {
  let cut = desired;
  let tailStart = text.length;
  while (tailStart > 0 && !TOKEN_BOUNDARY.test(text[tailStart - 1])) tailStart--;
  cut = Math.min(cut, tailStart);
  const auth = AUTH_TAIL.exec(text);
  if (auth) cut = Math.min(cut, auth.index);
  cut = beforeCrossingMatch(text, IMAGE_DATA, cut);
  for (const { regex } of CREDENTIAL_PATTERNS) cut = beforeCrossingMatch(text, regex, cut);
  return cut;
}

/** A complete catalog match may be emitted atomically when it exceeds the window. */
export function credentialCompleteCut(text: string, desired: number): number {
  let cut = beforeCrossingMatch(text, IMAGE_DATA, desired, true);
  for (const { regex } of CREDENTIAL_PATTERNS) cut = beforeCrossingMatch(text, regex, cut, true);
  return cut;
}
