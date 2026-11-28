/**
 * Read Gemini Web's answer from the rendered page instead of the network (#21116).
 *
 * Some accounts no longer fetch the answer through a `StreamGenerate` response:
 * the app talks to `geminiweb-pa.clients6.google.com/v1/processSession` over a
 * WebChannel and only renders the result. `page.on("response")` never sees
 * a body it can parse there, so the executor fell through to
 * "No response from Gemini" even though the answer was on screen.
 *
 * The DOM is the one place every transport ends up in, so this module reads
 * the last `model-response` once it has finished rendering and converts it
 * back to Markdown. Fenced code keeps its exact text, which callers that ask
 * for JSON rely on.
 *
 * Live DOM (checked 2026-11-24, consumer Pro account, pt-BR UI):
 *   model-response
 *     message-content
 *       div.markdown[aria-busy="true"|"false"]   <- the answer
 *         p, ul/ol, h1..h6, blockquote, table, …
 *         code-block > … > .code-block-decoration > span ("JSON")   <- language label
 *                     > pre > code[data-test-id="code-content"]    <- code text
 *   user-query                                   <- one per submitted prompt
 */

export interface GeminiDomReplySnapshot {
  /** Number of `user-query` elements (submitted prompts) on the page. */
  queries: number;
  /** Number of `model-response` elements on the page. */
  responses: number;
  /** `aria-busy="true"` on the last answer's Markdown panel. */
  busy: boolean;
  /** The last answer converted to Markdown ("" when there is none yet). */
  text: string;
}

/*
 * The reader runs INSIDE the page (Playwright evaluates it as a string), so every
 * helper below must stay self-contained: no imports, no module constants, only the
 * other `dom*` helpers, which `geminiDomReplyExpression()` serializes next to it.
 * Tests call the same functions directly with a jsdom document.
 */

/** Elements whose content is UI chrome, never part of the answer. */
function domSkipped(el: Element): boolean {
  return ["BUTTON", "GEM-ICON-BUTTON", "MAT-ICON", "SCRIPT", "STYLE", "SVG"].includes(el.tagName);
}

function domInline(node: Node): string {
  if (node.nodeType === 3) return (node.nodeValue || "").replace(/\s+/g, " ");
  if (node.nodeType !== 1 || domSkipped(node as Element)) return "";
  const el = node as Element;
  const tag = el.tagName;
  if (tag === "BR") return "\n";
  if (tag === "CODE") return "`" + (el.textContent || "") + "`";
  const inner = Array.from(el.childNodes).map(domInline).join("");
  const wrap = ({ STRONG: "**", B: "**", EM: "*", I: "*" } as Record<string, string>)[tag];
  if (wrap) return inner.trim() ? wrap + inner + wrap : inner;
  const href = tag === "A" ? el.getAttribute("href") : null;
  return href && /^https?:/i.test(href) ? `[${inner}](${href})` : inner;
}

// A fence longer than any backtick run in the body, so a ``` line inside the code
// (e.g. a Markdown example) cannot close the block early.
function domFenced(lang: string, body: string): string {
  const longestRun = Math.max(0, ...(body.match(/`+/g) || []).map((r) => r.length));
  const fence = "`".repeat(Math.max(3, longestRun + 1));
  return fence + lang + "\n" + body + "\n" + fence;
}

function domCodeBlock(el: Element): string {
  const code = el.querySelector("pre code") || el.querySelector("pre") || el;
  const label = el.querySelector(".code-block-decoration span");
  const lang = (label?.textContent || "")
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9+#.-]/g, "");
  return domFenced(lang, (code.textContent || "").replace(/\n$/, ""));
}

/** Elements that render as one Markdown block of their own; null for anything else. */
function domLeaf(el: Element): string[] | null {
  const tag = el.tagName;
  if (tag === "CODE-BLOCK") return [domCodeBlock(el)];
  if (tag === "PRE") return [domFenced("", (el.textContent || "").replace(/\n$/, ""))];
  if (tag === "P") {
    const t = domInline(el).trim();
    return t ? [t] : [];
  }
  const heading = /^H([1-6])$/.exec(tag);
  if (heading) return ["#".repeat(Number(heading[1])) + " " + domInline(el).trim()];
  return tag === "HR" ? ["---"] : null;
}

function domBlock(node: Node, indent: string): string[] {
  if (node.nodeType === 3) {
    const t = (node.nodeValue || "").trim();
    return t ? [t] : [];
  }
  if (node.nodeType !== 1) return [];
  const el = node as Element;
  if (domSkipped(el) || el.classList.contains("code-block-decoration")) return [];
  const leaf = domLeaf(el);
  if (leaf) return leaf;
  if (el.tagName === "UL" || el.tagName === "OL") return [domList(el, indent)];
  if (el.tagName === "BLOCKQUOTE") return [domQuote(el)];
  if (el.tagName === "TABLE") return domTable(el);
  return domContainer(el, indent);
}

function domList(el: Element, indent: string): string {
  const lines: string[] = [];
  let n = Number(el.getAttribute("start") || "1");
  for (const li of Array.from(el.children)) {
    if (li.tagName !== "LI") continue;
    lines.push(...domListItem(li, indent, el.tagName === "OL" ? `${n++}. ` : "- "));
  }
  return lines.join("\n");
}

interface DomListItem {
  lines: string[];
  /** Inline text not yet written out. */
  run: string;
  /** Prefix of the first line (indent + marker). */
  head: string;
  /** Prefix of continuation lines, aligned under the item's text. */
  cont: string;
}

// Children are rendered in DOM order: the first text run goes on the marker line,
// block content (code blocks, tables, quotes) is indented as list-item continuation,
// and text after a block becomes a continuation line of its own.
function domListItem(li: Element, indent: string, marker: string): string[] {
  const item: DomListItem = {
    lines: [],
    run: "",
    head: indent + marker,
    cont: indent + " ".repeat(marker.length),
  };
  for (const child of Array.from(li.childNodes)) domListChild(item, child, indent);
  domListFlush(item);
  domListMarker(item);
  return item.lines;
}

function domListChild(item: DomListItem, child: Node, indent: string): void {
  const el = child.nodeType === 1 ? (child as Element) : null;
  const tag = el ? el.tagName : "";
  if (tag === "UL" || tag === "OL") {
    domListFlush(item);
    domListMarker(item);
    item.lines.push(...domBlock(child, indent + "  "));
  } else if (el && domHoldsBlock(el)) {
    domListFlush(item);
    domListMarker(item);
    for (const part of domBlock(child, "")) {
      item.lines.push(
        part
          .split("\n")
          .map((l) => (l ? item.cont + l : l))
          .join("\n")
      );
    }
  } else if (tag === "P") {
    const t = domInline(child).trim();
    if (t) domListAppend(item, (item.run.trim() ? " " : "") + t);
  } else domListAppend(item, domInline(child));
}

function domHoldsBlock(el: Element): boolean {
  return (
    ["CODE-BLOCK", "PRE", "TABLE", "BLOCKQUOTE", "RESPONSE-ELEMENT"].includes(el.tagName) ||
    Boolean(el.querySelector("pre, code-block, table, blockquote"))
  );
}

// Text nodes are already whitespace-normalized by domInline(); only the seam between
// two pieces is collapsed, so spaces inside inline code survive.
function domListAppend(item: DomListItem, piece: string): void {
  item.run += /\s$/.test(item.run) && /^\s/.test(piece) ? piece.replace(/^\s+/, "") : piece;
}

function domListFlush(item: DomListItem): void {
  const t = item.run.trim();
  item.run = "";
  if (!t) return;
  const parts = t.split("\n");
  item.lines.push((item.lines.length ? item.cont : item.head) + parts[0]);
  for (const l of parts.slice(1)) item.lines.push(item.cont + l.trim());
}

function domListMarker(item: DomListItem): void {
  if (!item.lines.length) item.lines.push(item.head);
}

function domQuote(el: Element): string {
  return Array.from(el.childNodes)
    .flatMap((c) => domBlock(c, ""))
    .join("\n\n")
    .split("\n")
    .map((l) => "> " + l)
    .join("\n");
}

function domTable(el: Element): string[] {
  const rows = Array.from(el.querySelectorAll("tr")).map((tr) =>
    Array.from(tr.children).map((c) => domInline(c).trim().replace(/\|/g, "\\|"))
  );
  if (!rows.length) return [];
  const out = ["| " + rows[0].join(" | ") + " |", "|" + rows[0].map(() => " --- ").join("|") + "|"];
  for (const r of rows.slice(1)) out.push("| " + r.join(" | ") + " |");
  return [out.join("\n")];
}

/** True when `child` belongs to the paragraph being collected (inline content only). */
function domIsInlineRun(child: Node): boolean {
  if (child.nodeType === 3) return true;
  if (child.nodeType !== 1) return false;
  const el = child as Element;
  return (
    ["SPAN", "STRONG", "B", "EM", "I", "CODE", "A", "BR", "SUP", "SUB"].includes(el.tagName) &&
    !el.querySelector("p, pre, code-block, ul, ol, table, h1, h2, h3, h4, h5, h6, blockquote")
  );
}

// Containers (div, response-element, span wrappers, …): recurse, but keep runs of
// inline content together as one paragraph.
function domContainer(el: Element, indent: string): string[] {
  const out: string[] = [];
  let run = "";
  for (const child of Array.from(el.childNodes)) {
    if (domIsInlineRun(child)) {
      run += domInline(child);
      continue;
    }
    if (run.trim()) out.push(run.trim());
    run = "";
    out.push(...domBlock(child, indent));
  }
  if (run.trim()) out.push(run.trim());
  return out;
}

/**
 * Runs INSIDE the page (see `geminiDomReplyExpression()`). `doc` defaults to the
 * page's `document`; tests pass a jsdom document.
 */
export function readGeminiDomReply(doc?: Document): GeminiDomReplySnapshot {
  const d: Document = doc || document;
  const responses = d.querySelectorAll("model-response");
  const queries = d.querySelectorAll("user-query").length;
  const last = responses.length ? responses[responses.length - 1] : null;
  const panel = last
    ? last.querySelector("message-content .markdown") || last.querySelector("message-content")
    : null;
  if (!panel) return { queries, responses: responses.length, busy: false, text: "" };
  // No newline squashing here: it would also rewrite blank lines inside code blocks.
  const text = domBlock(panel, "").join("\n\n").trim();
  return {
    queries,
    responses: responses.length,
    busy: panel.getAttribute("aria-busy") === "true",
    text,
  };
}

/** Every helper `readGeminiDomReply` reaches, serialized with it into the page. */
const GEMINI_DOM_REPLY_HELPERS = [
  domSkipped,
  domInline,
  domFenced,
  domCodeBlock,
  domLeaf,
  domBlock,
  domList,
  domListItem,
  domListChild,
  domHoldsBlock,
  domListAppend,
  domListFlush,
  domListMarker,
  domQuote,
  domTable,
  domIsInlineRun,
  domContainer,
];

/** The page expression that runs `readGeminiDomReply` with its helpers. */
export function geminiDomReplyExpression(): string {
  return toInPageExpression(readGeminiDomReply, undefined, GEMINI_DOM_REPLY_HELPERS);
}

/**
 * Build a string expression that runs `fn(arg)` inside the page.
 *
 * Passing the function object to `page.evaluate` serializes it with
 * `Function.prototype.toString`, which carries whatever the transpiler put in
 * the body. esbuild/tsx (keepNames) wraps named inner functions in
 * `__name(...)` calls; that helper does not exist in the page, so the
 * evaluation threw and the DOM path silently never ran. A local no-op
 * `__name` makes the serialized source self-contained under any transpiler.
 *
 * `helpers` are top-level functions `fn` calls by name. Each is bound under its
 * runtime `name`, which is the identifier the compiled callers use even after a
 * bundler renames it.
 */
export function toInPageExpression(
  fn: (arg: never) => unknown,
  arg?: unknown,
  helpers: readonly ((...args: never[]) => unknown)[] = []
): string {
  const argSource = arg === undefined ? "undefined" : JSON.stringify(arg);
  const bound = helpers.map((h) => `const ${h.name} = ${h.toString()};`).join(" ");
  return `(() => { const __name = (f) => f; ${bound} return (${fn.toString()})(${argSource}); })()`;
}

/** Minimal Playwright-shaped page the DOM reader needs. */
export interface GeminiDomPage {
  evaluate?: (expression: string) => Promise<unknown>;
  waitForTimeout(ms: number): Promise<void>;
}

/** True when the page can run in-page code (real Playwright pages; most test fakes cannot). */
export function canReadGeminiDom(page: unknown): page is GeminiDomPage & {
  evaluate: NonNullable<GeminiDomPage["evaluate"]>;
} {
  return typeof (page as GeminiDomPage | null)?.evaluate === "function";
}

export async function snapshotGeminiDom(
  page: GeminiDomPage
): Promise<GeminiDomReplySnapshot | null> {
  if (!canReadGeminiDom(page)) return null;
  try {
    return (await page.evaluate(geminiDomReplyExpression())) as GeminiDomReplySnapshot;
  } catch {
    return null;
  }
}

/**
 * Runs in the page: true when Gemini rendered its signed-out UI. A rotated-away or
 * expired cookie lands on the public page, where the composer still works but the
 * mode menu offers a "Sign in" button (live-confirmed, #21116).
 *
 * Deliberately NOT keyed on `accounts.google.com` links: a signed-in page can carry
 * ServiceLogin / signin links (account chooser, "add account"), and a false positive
 * would answer 401 for every request made with a good cookie.
 */
export function isGeminiSignedOutInPage(doc?: Document): boolean {
  const d: Document = doc || document;
  return Boolean(d.querySelector('[data-test-id="mode-picker-sign-in-button"]'));
}

/** Null when the page cannot run in-page code (test fakes). */
export async function isGeminiSignedOut(page: GeminiDomPage): Promise<boolean | null> {
  if (!canReadGeminiDom(page)) return null;
  try {
    return Boolean(await page.evaluate(toInPageExpression(isGeminiSignedOutInPage)));
  } catch {
    return null;
  }
}

/**
 * Wait until a `user-query` beyond `baselineQueries` is on the page, i.e. the
 * prompt was actually submitted. Returns false when it never appears.
 */
export async function waitForGeminiPromptSubmitted(
  page: GeminiDomPage,
  baselineQueries: number,
  timeoutMs = 5000,
  pollMs = 250,
  /** Other proof the prompt went out (e.g. StreamGenerate already answered). */
  isSubmitted?: () => boolean
): Promise<boolean> {
  const end = Date.now() + timeoutMs;
  while (Date.now() < end) {
    if (isSubmitted?.()) return true;
    const snap = await snapshotGeminiDom(page);
    if (!snap) return false;
    if (snap.queries > baselineQueries) return true;
    await page.waitForTimeout(pollMs);
  }
  return false;
}

export interface WaitForGeminiDomReplyOptions {
  /** `model-response` count before the prompt was sent; only a newer answer counts. */
  baselineResponses: number;
  timeoutMs: number;
  pollMs?: number;
  /** How long the finished (not busy) text must stay unchanged before it is accepted. */
  stableMs?: number;
  /** Stop early (e.g. the network path already produced the answer). */
  isCancelled?: () => boolean;
}

/**
 * Poll the page until the newest answer has finished rendering: the Markdown
 * panel is no longer `aria-busy` and its text has not changed for `stableMs`.
 * Resolves with the Markdown, or "" on timeout / cancellation / no DOM access.
 */
export async function waitForGeminiDomReply(
  page: GeminiDomPage,
  {
    baselineResponses,
    timeoutMs,
    pollMs = 500,
    stableMs = 2000,
    isCancelled,
  }: WaitForGeminiDomReplyOptions
): Promise<string> {
  const end = Date.now() + timeoutMs;
  let lastText = "";
  let stableSince = 0;
  while (Date.now() < end) {
    if (isCancelled?.()) return "";
    const snap = await snapshotGeminiDom(page);
    if (!snap) return "";
    const finished = snap.responses > baselineResponses && snap.text && !snap.busy;
    if (!finished) {
      lastText = "";
      stableSince = 0;
    } else if (snap.text !== lastText) {
      lastText = snap.text;
      stableSince = Date.now();
    } else if (Date.now() - stableSince >= stableMs) return snap.text;
    await page.waitForTimeout(pollMs);
  }
  return "";
}
