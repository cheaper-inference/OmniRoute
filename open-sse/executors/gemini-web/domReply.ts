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

/**
 * Runs INSIDE the page (Playwright serializes it with `page.evaluate`), so it
 * must stay self-contained: no imports, no references to outer helpers.
 * `doc` defaults to the page's `document`; tests pass a jsdom document.
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

  const SKIP = new Set(["BUTTON", "GEM-ICON-BUTTON", "MAT-ICON", "SCRIPT", "STYLE", "SVG"]);

  const inline = (node: Node): string => {
    if (node.nodeType === 3) return (node.nodeValue || "").replace(/\s+/g, " ");
    if (node.nodeType !== 1) return "";
    const el = node as Element;
    if (SKIP.has(el.tagName)) return "";
    const inner = () => Array.from(el.childNodes).map(inline).join("");
    switch (el.tagName) {
      case "BR":
        return "\n";
      case "STRONG":
      case "B": {
        const t = inner();
        return t.trim() ? `**${t}**` : t;
      }
      case "EM":
      case "I": {
        const t = inner();
        return t.trim() ? `*${t}*` : t;
      }
      case "CODE":
        return "`" + (el.textContent || "") + "`";
      case "A": {
        const href = el.getAttribute("href");
        const t = inner();
        return href && /^https?:/i.test(href) ? `[${t}](${href})` : t;
      }
      default:
        return inner();
    }
  };

  // A fence longer than any backtick run in the body, so a ``` line inside the code
  // (e.g. a Markdown example) cannot close the block early.
  const fenced = (lang: string, body: string): string => {
    const longestRun = Math.max(0, ...(body.match(/`+/g) || []).map((r) => r.length));
    const fence = "`".repeat(Math.max(3, longestRun + 1));
    return fence + lang + "\n" + body + "\n" + fence;
  };

  const codeBlock = (el: Element): string => {
    const code = el.querySelector("pre code") || el.querySelector("pre") || el;
    const label = el.querySelector(".code-block-decoration span");
    const lang = (label?.textContent || "")
      .trim()
      .toLowerCase()
      .replace(/[^a-z0-9+#.-]/g, "");
    const body = (code.textContent || "").replace(/\n$/, "");
    return fenced(lang, body);
  };

  const block = (node: Node, indent: string): string[] => {
    if (node.nodeType === 3) {
      const t = (node.nodeValue || "").trim();
      return t ? [t] : [];
    }
    if (node.nodeType !== 1) return [];
    const el = node as Element;
    if (SKIP.has(el.tagName) || el.classList.contains("code-block-decoration")) return [];
    const tag = el.tagName;
    if (tag === "CODE-BLOCK") return [codeBlock(el)];
    if (tag === "PRE") return [fenced("", (el.textContent || "").replace(/\n$/, ""))];
    if (tag === "P") {
      const t = inline(el).trim();
      return t ? [t] : [];
    }
    const heading = /^H([1-6])$/.exec(tag);
    if (heading) return ["#".repeat(Number(heading[1])) + " " + inline(el).trim()];
    if (tag === "HR") return ["---"];
    if (tag === "UL" || tag === "OL") {
      const lines: string[] = [];
      let n = Number(el.getAttribute("start") || "1");
      for (const li of Array.from(el.children)) {
        if (li.tagName !== "LI") continue;
        const marker = tag === "OL" ? `${n++}. ` : "- ";
        const contIndent = indent + " ".repeat(marker.length);
        // Children are rendered in DOM order: the first text run goes on the marker
        // line, block content (code blocks, tables, quotes) is indented as list-item
        // continuation, and text after a block becomes a continuation line of its own.
        const item: string[] = [];
        let run = "";
        const append = (piece: string) => {
          // Text nodes are already whitespace-normalized by inline(); only the seam
          // between two pieces is collapsed, so spaces inside inline code survive.
          if (/\s$/.test(run) && /^\s/.test(piece)) piece = piece.replace(/^\s+/, "");
          run += piece;
        };
        const flush = () => {
          const t = run.trim();
          run = "";
          if (!t) return;
          const lines = t.split("\n");
          if (!item.length) item.push(indent + marker + lines[0]);
          else item.push(contIndent + lines[0]);
          for (const l of lines.slice(1)) item.push(contIndent + l.trim());
        };
        const ensureMarker = () => {
          if (!item.length) item.push(indent + marker);
        };
        for (const child of Array.from(li.childNodes)) {
          const childEl = child.nodeType === 1 ? (child as Element) : null;
          const childTag = childEl ? childEl.tagName : "";
          if (childTag === "UL" || childTag === "OL") {
            flush();
            ensureMarker();
            item.push(...block(child, indent + "  "));
          } else if (
            childEl &&
            (["CODE-BLOCK", "PRE", "TABLE", "BLOCKQUOTE", "RESPONSE-ELEMENT"].includes(childTag) ||
              childEl.querySelector("pre, code-block, table, blockquote"))
          ) {
            flush();
            ensureMarker();
            for (const part of block(child, "")) {
              item.push(
                part
                  .split("\n")
                  .map((l) => (l ? contIndent + l : l))
                  .join("\n")
              );
            }
          } else if (childTag === "P") {
            const t = inline(child).trim();
            if (t) append((run.trim() ? " " : "") + t);
          } else append(inline(child));
        }
        flush();
        ensureMarker();
        lines.push(...item);
      }
      return [lines.join("\n")];
    }
    if (tag === "BLOCKQUOTE") {
      const inner = Array.from(el.childNodes).flatMap((c) => block(c, ""));
      return [
        inner
          .join("\n\n")
          .split("\n")
          .map((l) => "> " + l)
          .join("\n"),
      ];
    }
    if (tag === "TABLE") {
      const rows = Array.from(el.querySelectorAll("tr")).map((tr) =>
        Array.from(tr.children).map((c) => inline(c).trim().replace(/\|/g, "\\|"))
      );
      if (!rows.length) return [];
      const out = [
        "| " + rows[0].join(" | ") + " |",
        "|" + rows[0].map(() => " --- ").join("|") + "|",
      ];
      for (const r of rows.slice(1)) out.push("| " + r.join(" | ") + " |");
      return [out.join("\n")];
    }
    // Containers (div, response-element, span wrappers, …): recurse, but keep
    // runs of inline content together as one paragraph.
    const out: string[] = [];
    let run = "";
    const flush = () => {
      if (run.trim()) out.push(run.trim());
      run = "";
    };
    for (const child of Array.from(el.childNodes)) {
      const childTag = child.nodeType === 1 ? (child as Element).tagName : "";
      const isInline =
        child.nodeType === 3 ||
        ["SPAN", "STRONG", "B", "EM", "I", "CODE", "A", "BR", "SUP", "SUB"].includes(childTag);
      if (
        isInline &&
        !(
          child.nodeType === 1 &&
          (child as Element).querySelector(
            "p, pre, code-block, ul, ol, table, h1, h2, h3, h4, h5, h6, blockquote"
          )
        )
      ) {
        run += inline(child);
      } else {
        flush();
        out.push(...block(child, indent));
      }
    }
    flush();
    return out;
  };

  // No newline squashing here: it would also rewrite blank lines inside code blocks.
  const text = block(panel, "").join("\n\n").trim();
  return {
    queries,
    responses: responses.length,
    busy: panel.getAttribute("aria-busy") === "true",
    text,
  };
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
 */
export function toInPageExpression(fn: (arg: never) => unknown, arg?: unknown): string {
  const argSource = arg === undefined ? "undefined" : JSON.stringify(arg);
  return `(() => { const __name = (f) => f; return (${fn.toString()})(${argSource}); })()`;
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
    return (await page.evaluate(toInPageExpression(readGeminiDomReply))) as GeminiDomReplySnapshot;
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
    if (snap.responses > baselineResponses && snap.text && !snap.busy) {
      if (snap.text === lastText) {
        if (Date.now() - stableSince >= stableMs) return snap.text;
      } else {
        lastText = snap.text;
        stableSince = Date.now();
      }
    } else {
      lastText = "";
      stableSince = 0;
    }
    await page.waitForTimeout(pollMs);
  }
  return "";
}
