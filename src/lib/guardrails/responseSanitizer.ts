import { redactCredentials } from "./credentialMasker";
import { BaseGuardrail, type GuardrailContext, type GuardrailResult } from "./base";
import { parseEnvBoolean } from "@/shared/utils/envBoolean";

/**
 * ResponseSanitizerGuardrail: opt-in (RESPONSE_SANITIZER_ENABLED, default off) post-call
 * scrub of assistant text against prompt-injection exfiltration and script links.
 *
 * - removes a markdown image whose URL query carries a template placeholder or a
 *   credential-shaped value (the data-exfil channel: the client fetches the URL);
 * - neutralises javascript: and data:text/html link targets, removes script/iframe tags;
 * - blocks a response that holds a bidirectional override/isolate control.
 * Detection runs on a normalised copy (NFKC, no zero-width or tab/newline characters).
 * The rewrite is surgical on the original; text that is dangerous only after
 * normalisation was hidden on purpose, so the whole text is replaced.
 * Non-streaming responses only: a streamed reply is not scanned (a safe stream scan needs its
 * own frame hold-back). Tool-call arguments and tool inputs are never touched.
 */

const BIDI_CONTROL = /[\u202A-\u202E\u2066-\u2069]/;
const HIDDEN_CHARS = /[\u00AD\u200B-\u200F\u2060-\u2064\uFEFF\t\n\r]/g;
const PLACEHOLDER =
  /\{\{[^}]{0,100}\}\}|\$\{[^}]{0,100}\}|%7B%7B|\[\[[^\]]{0,100}\]\]|<[A-Za-z_][^<>]{0,100}>/i;
// The text is untrusted model output: images and tags are found by linear scans, not by
// backtracking regexes (a repeated "![a](" cost seconds on a few KB with the regex form).
const ALT_MAX = 500;
const TITLE_MAX = 500;
const DANGEROUS_LINK =
  /(\]\(\s{0,10}|\b(?:href|src|action|formaction)\s{0,5}=\s{0,5}["']?\s{0,5})(?:javascript:|data:\s{0,5}text\/html)[^\s)"']{0,4000}/gi;
const REMOVED_NOTICE = "[response text removed by the response sanitizer]";
const SKIP_KEYS = new Set([
  "tool_calls",
  "function_call",
  "input",
  "arguments",
  "args",
  "functionCall",
]);
const TEXT_KEYS = new Set([
  "content",
  "text",
  "refusal",
  "reasoning_content",
  "reasoning",
  "thinking",
]);

export const RESPONSE_BIDI_REASON = "response_unicode_bidi";

export function isResponseSanitizerEnabled(env: Record<string, string | undefined> = process.env) {
  return parseEnvBoolean(env.RESPONSE_SANITIZER_ENABLED, false);
}

const normalise = (text: string) => text.normalize("NFKC").replace(HIDDEN_CHARS, "");

function decoded(value: string): string {
  try {
    return decodeURIComponent(value);
  } catch {
    return value;
  }
}

function isExfilUrl(url: string): boolean {
  const query = url.includes("?") ? url.slice(url.indexOf("?") + 1) : "";
  if (!query) return false;
  const text = `${query} ${decoded(query)}`;
  return PLACEHOLDER.test(text) || redactCredentials(text).modified;
}

const isSpace = (ch: string | undefined) => ch !== undefined && /\s/.test(ch);

/** indexOf that only moves forward: the last hit is reused until the scan passes it. */
function forwardFinder(text: string, needle: string): (from: number) => number {
  let at = -2;
  return (from) => {
    if (at !== -1 && at < from) at = text.indexOf(needle, from);
    return at;
  };
}

/** The URL token of `](url ...)` that follows the closing bracket at `bracket`, if any. */
function readImageTarget(text: string, bracket: number): { start: number; end: number } | null {
  if (text[bracket + 1] !== "(") return null;
  let start = bracket + 2;
  while (start < bracket + 12 && isSpace(text[start])) start++;
  let end = start;
  while (end < text.length && text[end] !== ")" && !isSpace(text[end])) end++;
  return end > start ? { start, end } : null;
}

/**
 * Markdown images whose URL query is an exfil channel, removed in one linear pass: every
 * search moves forward only, and each URL token is read once.
 */
function stripExfilImages(text: string): { text: string; hit: boolean } {
  const nextBracket = forwardFinder(text, "]");
  const nextParen = forwardFinder(text, ")");
  let out = "";
  let kept = 0;
  let from = 0;
  let hit = false;
  for (let start = text.indexOf("![", from); start !== -1; start = text.indexOf("![", from)) {
    from = start + 2;
    const bracket = nextBracket(from);
    if (bracket === -1) break;
    const target = bracket - from > ALT_MAX ? null : readImageTarget(text, bracket);
    if (!target) continue;
    from = target.end;
    const paren = nextParen(target.end);
    if (paren === -1) break;
    if (paren - target.end > TITLE_MAX || !isExfilUrl(text.slice(target.start, target.end)))
      continue;
    out += text.slice(kept, start);
    kept = from = paren + 1;
    hit = true;
  }
  return { text: hit ? out + text.slice(kept) : text, hit };
}

const ACTIVE_TAG = /<\/?(script|iframe)\b/gi;
const CLOSERS: Record<string, RegExp> = {
  script: /<\/script\b/gi,
  iframe: /<\/iframe\b/gi,
};

/** End index (after the `>`) of the closing tag of `name` at or after `from`, or -1. */
function closingTagEnd(text: string, name: string, from: number): number {
  const closer = CLOSERS[name];
  closer.lastIndex = from;
  const found = closer.exec(text);
  const gt = found ? text.indexOf(">", found.index) : -1;
  return gt === -1 ? -1 : gt + 1;
}

/**
 * Remove script and iframe tags (an opening tag with its element). Linear: every search
 * starts where the last one ended, and a name with no closing tag is searched for once.
 */
function stripActiveTags(text: string): string {
  const nextGt = forwardFinder(text, ">");
  const parts: string[] = [];
  const noCloser = new Set<string>();
  let kept = 0;
  ACTIVE_TAG.lastIndex = 0;
  for (let tag = ACTIVE_TAG.exec(text); tag; tag = ACTIVE_TAG.exec(text)) {
    const gt = nextGt(tag.index);
    if (gt === -1) break;
    let end = gt + 1;
    const name = tag[1].toLowerCase();
    if (tag[0][1] !== "/" && !noCloser.has(name)) {
      const closed = closingTagEnd(text, name, end);
      if (closed === -1) noCloser.add(name);
      else end = closed;
    }
    parts.push(text.slice(kept, tag.index));
    kept = end;
    ACTIVE_TAG.lastIndex = Math.max(ACTIVE_TAG.lastIndex, end);
  }
  parts.push(text.slice(kept));
  return parts.join("");
}

function rewrite(text: string, found: Set<string>): string {
  const images = stripExfilImages(text);
  if (images.hit) found.add("exfil_image");
  let out = images.text;
  out = out.replace(DANGEROUS_LINK, (_whole, lead: string) => {
    found.add("script_uri");
    return `${lead}#blocked`;
  });
  const stripped = stripActiveTags(out);
  if (stripped !== out) found.add("active_tag");
  return stripped;
}

function stillDangerous(text: string): boolean {
  const hay = normalise(text);
  DANGEROUS_LINK.lastIndex = 0;
  if (DANGEROUS_LINK.test(hay)) return true;
  if (stripExfilImages(hay).hit) return true;
  return stripActiveTags(hay) !== hay;
}

export function sanitizeResponseText(text: string): { text: string; found: string[] } {
  const found = new Set<string>();
  const out = rewrite(text, found);
  if (!stillDangerous(out)) return { text: out, found: [...found] };
  found.add("hidden_obfuscation");
  return { text: REMOVED_NOTICE, found: [...found] };
}

type Walk = { value: unknown; changed: boolean; bidi: boolean };

const unchanged = (value: unknown): Walk => ({ value, changed: false, bidi: false });

function walkText(text: string, found: Set<string>): Walk {
  if (BIDI_CONTROL.test(text)) return { value: text, changed: false, bidi: true };
  const result = sanitizeResponseText(text);
  result.found.forEach((entry) => found.add(entry));
  return { value: result.text, changed: result.text !== text, bidi: false };
}

function walkChildren(node: object, key: string, found: Set<string>, depth: number): Walk {
  const isArray = Array.isArray(node);
  const next = (isArray ? [...node] : { ...node }) as Record<string, unknown>;
  let changed = false;
  for (const slot of Object.keys(next)) {
    const result = walk(next[slot], isArray ? key : slot, found, depth + 1);
    if (result.bidi) return { value: node, changed: false, bidi: true };
    if (!result.changed) continue;
    next[slot] = result.value;
    changed = true;
  }
  return { value: changed ? next : node, changed, bidi: false };
}

function walk(node: unknown, key: string, found: Set<string>, depth: number): Walk {
  if (typeof node === "string") return TEXT_KEYS.has(key) ? walkText(node, found) : unchanged(node);
  if (!node || typeof node !== "object" || depth > 12 || SKIP_KEYS.has(key)) return unchanged(node);
  return walkChildren(node, key, found, depth);
}

export class ResponseSanitizerGuardrail extends BaseGuardrail {
  constructor(options: { enabled?: boolean; priority?: number } = {}) {
    // After the maskers (9-10) and the prompt-injection guard (20).
    super("response-sanitizer", { enabled: options.enabled, priority: options.priority ?? 30 });
  }

  async postCall(response: unknown, _context: GuardrailContext): Promise<GuardrailResult<unknown>> {
    if (!isResponseSanitizerEnabled()) return { block: false };
    const found = new Set<string>();
    const result = walk(response, "", found, 0);
    if (result.bidi) {
      return {
        block: true,
        message: "Response blocked: it contains bidirectional text control characters",
        meta: { reason: RESPONSE_BIDI_REASON },
      };
    }
    if (!result.changed) return { block: false };
    return { block: false, modifiedResponse: result.value, meta: { sanitized: [...found] } };
  }
}
