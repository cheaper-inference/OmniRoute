/**
 * OmniRoute — Google Translate engine for the docs pipeline (structure-safe fallback).
 *
 * Why this exists: the LLM backend translates a whole markdown chunk at once, and on
 * table-heavy docs (ENVIRONMENT, REPOSITORY_MAP) it truncates tables (`table rows 1/9`)
 * in most locales, so a wave burns hours and quota and still fails (2026-10-27: 55/66
 * locales of ENVIRONMENT never validated). This engine never hands the structure to the
 * translator: it parses the markdown into blocks, keeps fences / separators / blank lines
 * verbatim, and sends only the TEXT of each heading, list item, paragraph, quote and table
 * cell. Inline code, link targets, URLs, HTML tags, placeholders, env-var names, paths,
 * file names, CLI flags and the protected product terms are masked as
 * `<span translate="no">` tokens, so the reassembled chunk keeps the source's fences, rows
 * and code spans by construction. Segments are deduplicated, batched into a few POST
 * requests and sent in parallel, which turns a 66-locale run into minutes.
 *
 * Endpoints:
 *   - default: the keyless web endpoint `translate.googleapis.com/translate_a/t`
 *     (client=gtx, format=html). Unofficial and rate-limited; fine for occasional waves.
 *   - OMNIROUTE_TRANSLATION_GOOGLE_API_KEY set: the official Cloud Translation v2 API
 *     (`translation.googleapis.com/language/translate/v2`, format=html).
 *
 * Quality is below the LLM's (no glossary awareness beyond the masked terms; the caller
 * still applies normalizeLocaleText), so run-translation.mjs uses it as a FALLBACK for
 * chunks the LLM could not produce, or as the primary engine on explicit opt-in.
 */

const DEFAULT_ENDPOINT = "https://translate.googleapis.com/translate_a/t";
const OFFICIAL_ENDPOINT = "https://translation.googleapis.com/language/translate/v2";
const BATCH_CHARS = 4500;
const BATCH_ITEMS = 100;
// The keyless endpoint drops ~1% of requests with a connection reset ("fetch failed") under a
// 66-locale run (2026-10-28: 13 of 132 locales once, 1 of 198 another time); seven tries with a
// capped, jittered backoff (~1 min in total) ride that out instead of failing the locale.
const MAX_TRIES = 7;
const MAX_BACKOFF_MS = 20000;

// OmniRoute locale code → Google language code (identity when absent).
const GOOGLE_LANG = {
  "pt-BR": "pt",
  pt: "pt-PT",
  "uk-UA": "uk",
  phi: "tl",
  he: "iw",
  "zh-CN": "zh-CN",
  "zh-TW": "zh-TW",
};

export function googleLangFor(code) {
  return GOOGLE_LANG[code] ?? code;
}

// ----- inline masking ---------------------------------------------------------------

const PUA_BASE = 0xe000;
const SPAN = (id) => `<span translate="no">${id}</span>`;
// Letters only: digits inside the span could be localized (bn ৩, fa ۳) by some engines.
export const tokenId = (i) =>
  "zq" +
  i
    .toString(26)
    .split("")
    .map((d) => String.fromCharCode(97 + parseInt(d, 26)))
    .join("");
export const idIndex = (id) =>
  parseInt(
    id
      .slice(2)
      .split("")
      .map((c) => (c.charCodeAt(0) - 97).toString(26))
      .join(""),
    26
  );

function hasLetters(s) {
  return /\p{L}/u.test(s);
}

function escapeHtml(text) {
  return text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

function decodeEntities(text) {
  return text
    .replace(/&#x([0-9a-f]+);/gi, (_, h) => String.fromCodePoint(parseInt(h, 16)))
    .replace(/&#(\d+);/g, (_, d) => String.fromCodePoint(Number(d)))
    .replace(/&quot;/g, '"')
    .replace(/&apos;/g, "'")
    .replace(/&nbsp;/g, " ")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&amp;/g, "&");
}

function escapeRegExp(s) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

const INLINE_PATTERNS = [
  /\u0001\d+\u0001/y, // ICU structure sentinels (translateStringsWithGoogle)
  /(`+)[\s\S]*?\1/y, // inline code (any backtick run)
  /!\[[^\]\n]*\]\([^)\n]*\)/y, // images: keep whole
  /\[[^\]\n]*\]\[[^\]\n]*\]/y, // reference links: keep whole
  /<https?:\/\/[^>\s]+>/y, // autolinks
  // An HTML code span is a literal like a backtick span: the WHOLE element (tags and content)
  // is one token, so the translator never sees `<code>any</code>`'s "any" (am translated it).
  /<(code|kbd|samp)\b[^>]*>[\s\S]*?<\/\1\s*>/iy,
  /<!--[\s\S]*?-->|<\/?[A-Za-z][^>\n]*>/y, // HTML comments / tags
  /https?:\/\/[^\s)<>\]]+/y, // bare URLs
  /\{[^{}\n]{1,80}\}|\$\{[^}\n]+\}|%[sd]|\$[A-Z_][A-Z0-9_]*/y, // ICU / shell placeholders
  /(?<![\w-])[A-Z][A-Z0-9]*(?:_[A-Z0-9]+)+(?![\w-])/y, // UPPER_SNAKE env names
  /(?<![\w/-])(?:[\w.-]+\/)+[\w.-]+(?![\w/-])/y, // paths with a slash
  /(?<![\w-])[\w-]+\.(?:md|mdx|ts|tsx|js|mjs|cjs|json|ya?ml|sh|sql|css|html|txt|toml|env)(?![\w-])/y, // file names
  /(?<![\w-])--?[a-z][\w-]*(?![\w-])/y, // CLI flags
  /&[a-z]+;|&#\d+;/y, // literal entities in the source
  /[\p{Sm}\p{So}\uFE0F]+/uy, // math symbols / emoji (ko turned ∞ into a word; tests pin ∅ (∞))
  // the em dash anchors README's database-row counts (check-docs reads the text after "—");
  // de rewrote it to an en dash and the row failed the check
  /\u2014/y,
  // hyphenated identifiers carrying a digit: better-sqlite3 (am wrote የተሻለ-sqlite3), gpt-4o
  /(?<![\w-])(?=[\w-]*\d)[A-Za-z][A-Za-z0-9]*(?:-[A-Za-z0-9]+)+(?![\w-])/y,
  /(?<![\w-])[A-Z]{2,}[a-z][A-Za-z0-9]*(?![\w-])/y, // capitals then lower case: SQLite, JSONata
  /(?<![\w-])[a-z]+[A-Z][A-Za-z0-9]*(?![\w-])/y, // lower-camel identifiers: macOS, iPhone, npmScripts
  /(?<![\w-])[A-Z][a-z0-9]+(?:[A-Z][a-z0-9]*)+(?![\w-])/y, // CamelCase brands: CodeBuddy, OpenAI, DeepSeek
  /(?<![\w-])[A-Z]{2,}[0-9]*s?(?![\w-])/y, // acronyms: TTL, PII, APIs
];

// Company / product names a translator transliterates (am rendered "Tencent" in Ge'ez, which a
// mirror test pins verbatim). Merged with the caller's protected terms.
export const BRAND_TERMS = [
  "Tencent",
  "Google",
  "Microsoft",
  "Amazon",
  "Alibaba",
  "Baidu",
  "ByteDance",
  "Moonshot",
  "Mistral",
  "Cohere",
  "Groq",
  "Cerebras",
  "Together",
  "Fireworks",
  "Ollama",
  "Cloudflare",
  "Vercel",
  "Netlify",
  "Supabase",
  "Redis",
  "Qdrant",
  "Postgres",
  "Kiro",
  "Qoder",
  "Cursor",
  "Cline",
  "Codex",
  "Copilot",
  "Kimi",
  "Qwen",
  "Grok",
  "Llama",
  "Zed",
  "Windsurf",
  "Warp",
  "Linux",
  "macOS",
  "Windows",
  "Node.js",
  "Bun",
  "Next.js",
  "React",
  "Zod",
  "Prettier",
  "Telegram",
  "Discord",
  "Slack",
  "WhatsApp",
  "Notion",
  "Obsidian",
  "Jules",
  "Devin",
  "SQLite",
  "LowDB",
  "better-sqlite3",
  "TypeScript",
  "JavaScript",
  "Tailwind",
  "Turbopack",
  "Electron",
  "Docker",
  "Playwright",
  "Vitest",
];

// A masked token that is a real HTML tag (not an autolink, not a whole code element). The
// translator may move a code span or a product name, but never an HTML tag relative to another:
// ja moved `</b>` past `</code>` and the row came back mis-nested.
const isHtmlTagToken = (raw) =>
  /^<\/?[A-Za-z][\w-]*(?=[\s/>])/.test(raw) && !/^<(?:code|kbd|samp)\b/i.test(raw);
// A token id that escaped its span (ja echoed `zqi` / `zqo` as plain words).
const BARE_TOKEN_ID = /(?<!\p{L})zq[a-z]+(?!\p{L})/u;
const LINK = /\[([^\]\n]+)\]\(([^)\n]+)\)/y;
const EMPHASIS = /\*\*|__|~~|\*/y;

/**
 * Masks everything in one text segment that must survive verbatim and converts inline
 * emphasis / links to HTML the translator understands. Returns the HTML to send and
 * `restore(translatedHtml)`, which rebuilds markdown or returns null when the answer is
 * unusable (a token went missing, or translator markup survived).
 */
export function maskInline(text, { protectedTerms = [] } = {}) {
  protectedTerms = [...new Set([...protectedTerms, ...BRAND_TERMS])];
  const tokens = []; // { raw, spaceBefore, spaceAfter }
  let hasProse = false; // any letter left outside the masked tokens and markup
  const links = [];
  const terms = protectedTerms.length
    ? new RegExp(
        `(?<![\\w-])(?:${[...protectedTerms]
          .sort((a, b) => b.length - a.length)
          .map(escapeRegExp)
          .join("|")})(?![\\w-])`,
        "y"
      )
    : null;

  const tokenSpan = (raw, spaceBefore, spaceAfter) => {
    tokens.push({ raw, spaceBefore, spaceAfter });
    return SPAN(tokenId(tokens.length - 1));
  };

  function build(src) {
    let html = "";
    let plain = "";
    const flushPlain = () => {
      if (!hasProse && hasLetters(plain)) hasProse = true;
      html += escapeHtml(plain);
      plain = "";
    };
    const pushToken = (raw, start, end) => {
      flushPlain();
      html += tokenSpan(
        raw,
        start > 0 && /\s/.test(src[start - 1]),
        end < src.length && /\s/.test(src[end])
      );
    };
    let pos = 0;
    outer: while (pos < src.length) {
      if (src[pos] === "[" && src[pos - 1] !== "!") {
        LINK.lastIndex = pos;
        const hit = LINK.exec(src);
        if (hit) {
          flushPlain();
          const k = links.length;
          links.push(hit[2]);
          html += `<a href="#L${k}">${build(hit[1])}</a>`;
          pos += hit[0].length;
          continue;
        }
      }
      for (const re of INLINE_PATTERNS) {
        re.lastIndex = pos;
        const hit = re.exec(src);
        if (hit && hit[0]) {
          pushToken(hit[0], pos, pos + hit[0].length);
          pos += hit[0].length;
          continue outer;
        }
      }
      if (terms) {
        terms.lastIndex = pos;
        const hit = terms.exec(src);
        if (hit) {
          pushToken(hit[0], pos, pos + hit[0].length);
          pos += hit[0].length;
          continue;
        }
      }
      EMPHASIS.lastIndex = pos;
      const em = EMPHASIS.exec(src);
      if (em && (em[0] !== "*" || /\S/.test(src[pos + 1] ?? ""))) {
        flushPlain();
        html += `<em data-m="${em[0]}"></em>`;
        pos += em[0].length;
        continue;
      }
      plain += src[pos];
      pos++;
    }
    flushPlain();
    return html;
  }

  const html = build(text);

  function restore(translated) {
    let out = String(translated);
    // 1. tokens → private-use placeholders, keeping only source-side whitespace
    const seen = new Set();
    const order = []; // token indices in the order the translator returned them
    out = out.replace(
      /(\s*)<span translate=\\?"no\\?"\s*>\s*(zq[a-z]+)\s*<\/span>(\s*)/g,
      (all, pre, id, post, offset, whole) => {
        const i = idIndex(id);
        const t = tokens[i];
        if (!t) return all;
        seen.add(i);
        order.push(i);
        const ph = String.fromCharCode(PUA_BASE + i);
        // Keep the translator's whitespace only where the source had some, or where it now
        // separates the token from a word (the translator dropped the punctuation between).
        const prevCh = whole[offset - 1] ?? "";
        const nextCh = whole[offset + all.length] ?? "";
        const before = pre && (t.spaceBefore || /[\p{L}\p{N}]/u.test(prevCh)) ? " " : "";
        const after = post && (t.spaceAfter || /[\p{L}\p{N}]/u.test(nextCh)) ? " " : "";
        return before + ph + after;
      }
    );
    // every token exactly once: a missing one loses source text, a duplicate invents some
    if (seen.size !== tokens.length || order.length !== tokens.length) return null;
    // HTML tags keep their source order, so the rebuilt markup nests like the source
    const tagOrder = order.filter((i) => isHtmlTagToken(tokens[i].raw));
    if (tagOrder.some((i, k) => k > 0 && i < tagOrder[k - 1])) return null;
    // the translator echoed a token id outside its span: the answer is corrupt, not prose
    if (BARE_TOKEN_ID.test(out) && !BARE_TOKEN_ID.test(text)) return null;
    // 2. links and emphasis back to markdown
    out = out.replace(/<a href=\\?"#L(\d+)\\?"\s*>([\s\S]*?)<\/a>/g, (all, k, inner) => {
      const url = links[Number(k)];
      return url === undefined ? all : `[${inner.trim()}](${url})`;
    });
    out = out.replace(/<em data-m=\\?"([*_~]+)\\?"\s*>\s*<\/em>/g, "$1");
    if (/<\/?(?:span|a|em)\b/i.test(out)) return null;
    // 3. entities, whitespace and emphasis on the translated prose only, then the originals
    out = decodeEntities(out)
      .replace(/[\u200b\u200c\ufeff]/g, "") // zero-width marks the web endpoint injects
      .replace(/[ \t]{2,}/g, " ")
      .trim();
    // no space between a link / masked token and a following period or comma
    out = out.replace(/(\]\([^)\s]*\)|[\ue000-\uf8ff])[ \t]+([.,])/g, "$1$2");
    out = out.replace(/(\*\*|__|~~)\s+([^*_~\n]+?)\s+\1/g, "$1$2$1");
    // Every source code span is masked, so a backtick in the translated prose came from the
    // translator (hy renders its comma ՝ as `) and would open a fake code span; a bare pipe
    // would split a table cell.
    out = out.replace(/`/g, (_, offset, whole) =>
      /[԰-֏]/.test(whole[offset - 1] ?? "") ? "՝" : "'"
    );
    out = out.replace(/(?<!\\)\|/g, "\\|");
    // Two tokens the translator glued together (it may drop the comma between them, e.g.
    // ar) must not touch when either is a code span: `a``b` would parse as ONE span.
    out = out.replace(/([\ue000-\uf8ff])(?=[\ue000-\uf8ff])/g, (ch, _a, offset) => {
      const left = tokens[ch.charCodeAt(0) - PUA_BASE]?.raw ?? "";
      const right = tokens[out.charCodeAt(offset + 1) - PUA_BASE]?.raw ?? "";
      return left.endsWith("`") || right.startsWith("`") ? ch + " " : ch;
    });
    return out.replace(/[\ue000-\uf8ff]/g, (ch) => tokens[ch.charCodeAt(0) - PUA_BASE]?.raw ?? ch);
  }

  return { html, tokens, links, restore, hasProse };
}

// ----- block parsing ----------------------------------------------------------------

const FENCE = /^(\s*)(`{3,}|~{3,})/;
const TABLE_ROW = /^\s*\|/;
const TABLE_SEP = /^\s*\|?\s*:?-{3,}:?\s*(\|\s*:?-{3,}:?\s*)*\|?\s*$/;
const HEADING = /^(#{1,6}\s+)(.*?)(\s+#+\s*)?$/;
const LIST_ITEM = /^(\s*(?:[-*+]|\d+[.)])\s+(?:\[[ xX]\]\s+)?)(.*)$/;
const QUOTE = /^(\s*(?:>\s?)+)(.*)$/;
const HR = /^\s*(?:-{3,}|\*{3,}|_{3,}|={3,})\s*$/;

export function splitCells(row) {
  // split on `|` outside inline code; escaped pipes stay inside the cell
  const cells = [];
  let cur = "";
  let tick = false;
  for (let i = 0; i < row.length; i++) {
    const ch = row[i];
    if (ch === "\\" && row[i + 1] === "|") {
      cur += "\\|";
      i++;
      continue;
    }
    if (ch === "`") tick = !tick;
    if (ch === "|" && !tick) {
      cells.push(cur);
      cur = "";
      continue;
    }
    cur += ch;
  }
  cells.push(cur);
  return cells;
}

// Splits one HTML line into its tags (kept verbatim) and the text runs between them, which are
// the only thing translated. A whole `<code>` / `<kbd>` / `<samp>` element stays INSIDE its run
// and is masked there as one token. Before this the line was sent whole and every tag was a
// movable token: the translator could swap them (ja) and rewrite code-span content (am).
const HTML_PIECE =
  /<!--[\s\S]*?-->|<(code|kbd|samp)\b[^>]*>[\s\S]*?<\/\1\s*>|<\/?[A-Za-z][\w-]*(?=[\s/>])[^>]*>/gi;
export function splitHtmlLine(line) {
  const pieces = [];
  let text = "";
  let last = 0;
  for (const m of line.matchAll(HTML_PIECE)) {
    text += line.slice(last, m.index);
    last = m.index + m[0].length;
    if (m[1]) {
      text += m[0];
      continue;
    }
    if (text) pieces.push({ text });
    text = "";
    pieces.push(m[0]);
  }
  text += line.slice(last);
  if (text) pieces.push({ text });
  return pieces;
}

/**
 * Turns a markdown chunk into ordered parts: verbatim strings, `{ pre, text, post }`
 * templates whose `text` is translated, `{ cells }` table rows, or `{ html }` lines whose
 * text runs are translated between verbatim tags. Joining the rebuilt
 * parts with "\n" reproduces the chunk's structure. Soft-wrapped paragraph lines are
 * joined into one line (a sentence split across lines would otherwise be translated in
 * two halves).
 */
export function segmentMarkdown(markdown) {
  const lines = markdown.split("\n");
  const parts = [];
  let fence = null;
  let para = null; // { pre, lines }
  let comment = false;
  const flush = () => {
    if (para) parts.push({ pre: para.pre, text: para.lines.join(" "), post: "" });
    para = null;
  };
  for (const line of lines) {
    if (fence) {
      parts.push(line);
      const t = line.trim();
      if (
        t.startsWith(fence) &&
        t
          .slice(fence.length)
          .replace(new RegExp(`^\\${fence[0]}+`), "")
          .trim() === ""
      ) {
        fence = null;
      }
      continue;
    }
    if (comment) {
      parts.push(line);
      if (line.includes("-->")) comment = false;
      continue;
    }
    const f = FENCE.exec(line);
    if (f) {
      flush();
      fence = f[2];
      parts.push(line);
      continue;
    }
    if (/^\s*<!--/.test(line)) {
      flush();
      parts.push(line);
      if (!line.includes("-->")) comment = true;
      continue;
    }
    if (!line.trim()) {
      flush();
      parts.push(line);
      continue;
    }
    if (TABLE_ROW.test(line)) {
      flush();
      parts.push(TABLE_SEP.test(line) ? line : { cells: splitCells(line) });
      continue;
    }
    if (HR.test(line)) {
      flush();
      parts.push(line);
      continue;
    }
    const h = HEADING.exec(line);
    if (h) {
      flush();
      parts.push({ pre: h[1], text: h[2], post: h[3] ?? "" });
      continue;
    }
    const li = LIST_ITEM.exec(line);
    if (li) {
      flush();
      para = { pre: li[1], lines: [li[2]] };
      continue;
    }
    const q = QUOTE.exec(line);
    if (q && /^\[![A-Z]+\]\s*$/.test(q[2])) {
      // GitHub alert marker (`> [!NOTE]`): its own line, never merged with the body
      flush();
      parts.push(line);
      continue;
    }
    if (q) {
      if (para && para.quote === q[1]) {
        para.lines.push(q[2]);
        continue;
      }
      flush();
      const inner = LIST_ITEM.exec(q[2]) ?? HEADING.exec(q[2]);
      para = inner ? { pre: q[1] + inner[1], lines: [inner[2]] } : { pre: q[1], lines: [q[2]] };
      para.quote = q[1];
      continue;
    }
    if (/^\s*</.test(line)) {
      flush();
      parts.push({ html: splitHtmlLine(line) });
      continue;
    }
    if (para && !para.quote && (/^\s+\S/.test(line) || para.pre.trim() === "")) {
      para.lines.push(line.trim());
      continue;
    }
    flush();
    para = { pre: line.match(/^\s*/)[0], lines: [line.trim()] };
  }
  flush();
  return parts;
}

// ----- transport --------------------------------------------------------------------

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

function createLimiter(max) {
  let active = 0;
  const queue = [];
  const next = () => {
    if (!queue.length || active >= max) return;
    active++;
    const { fn, resolve, reject } = queue.shift();
    fn()
      .then(resolve, reject)
      .finally(() => {
        active--;
        next();
      });
  };
  return (fn) =>
    new Promise((resolve, reject) => {
      queue.push({ fn, resolve, reject });
      next();
    });
}

// One limiter per process: every locale of a run shares the request budget.
let sharedLimiter = null;
function limiterFor(concurrency) {
  if (!sharedLimiter || sharedLimiter.max !== concurrency) {
    sharedLimiter = { max: concurrency, run: createLimiter(concurrency) };
  }
  return sharedLimiter.run;
}

async function requestBatch(htmlList, target, { fetchImpl, apiKey, timeoutMs, backoffMs }) {
  let lastErr;
  for (let attempt = 1; attempt <= MAX_TRIES; attempt++) {
    const ctrl = new AbortController();
    const timer = setTimeout(() => ctrl.abort(), timeoutMs);
    try {
      let res;
      if (apiKey) {
        res = await fetchImpl(`${OFFICIAL_ENDPOINT}?key=${encodeURIComponent(apiKey)}`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ q: htmlList, source: "en", target, format: "html" }),
          signal: ctrl.signal,
        });
      } else {
        const body = new URLSearchParams();
        for (const q of htmlList) body.append("q", q);
        const qs = new URLSearchParams({ client: "gtx", sl: "en", tl: target, format: "html" });
        res = await fetchImpl(`${DEFAULT_ENDPOINT}?${qs}`, {
          method: "POST",
          headers: { "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8" },
          body: body.toString(),
          signal: ctrl.signal,
        });
      }
      if (!res.ok) {
        const err = new Error(`google translate HTTP ${res.status}`);
        err.status = res.status;
        throw err;
      }
      const json = await res.json();
      const list = apiKey
        ? (json?.data?.translations ?? []).map((t) => t?.translatedText)
        : Array.isArray(json)
          ? json.map((x) => (Array.isArray(x) ? x[0] : x))
          : [json];
      if (list.length !== htmlList.length || list.some((x) => typeof x !== "string")) {
        const err = new Error(`google translate returned ${list.length}/${htmlList.length} items`);
        err.retryable = true;
        throw err;
      }
      return list;
    } catch (err) {
      lastErr = err;
      const retryable =
        err?.retryable ||
        err?.name === "AbortError" ||
        err?.status === 429 ||
        (err?.status ?? 0) >= 500 ||
        /fetch failed|ECONN|ENOTFOUND|network/i.test(String(err?.cause ?? err?.message));
      if (!retryable || attempt === MAX_TRIES) break;
      const wait = Math.min(MAX_BACKOFF_MS, backoffMs * 2 ** (attempt - 1));
      await sleep(wait + Math.floor(Math.random() * Math.min(wait, 1000) * 0.25));
    } finally {
      clearTimeout(timer);
    }
  }
  throw lastErr;
}

export function planBatches(items, { maxChars = BATCH_CHARS, maxItems = BATCH_ITEMS } = {}) {
  const out = [];
  let cur = [];
  let size = 0;
  for (const item of items) {
    if (cur.length && (size + item.length > maxChars || cur.length >= maxItems)) {
      out.push(cur);
      cur = [];
      size = 0;
    }
    cur.push(item);
    size += item.length;
  }
  if (cur.length) out.push(cur);
  return out;
}

/**
 * Translates one markdown chunk into `localeCode`. Structure (fences, table rows and
 * separators, blank lines, list/heading/quote prefixes, inline code, links, HTML) is
 * rebuilt from the source; only text is translated. A segment whose answer cannot be
 * restored safely keeps its English text, and the call throws when more than
 * `maxUntranslatedRatio` of the segments ended up that way.
 */
export async function translateMarkdownWithGoogle(markdown, localeCode, options = {}) {
  const {
    fetchImpl = globalThis.fetch,
    apiKey = process.env.OMNIROUTE_TRANSLATION_GOOGLE_API_KEY || "",
    concurrency = Number(process.env.OMNIROUTE_TRANSLATION_GOOGLE_CONCURRENCY || 6),
    timeoutMs = Number(process.env.OMNIROUTE_TRANSLATION_GOOGLE_TIMEOUT_MS || 30000),
    backoffMs = 1000,
    protectedTerms = [],
    maxUntranslatedRatio = 0.1,
    stats = null,
  } = options;
  const target = googleLangFor(localeCode);
  const parts = segmentMarkdown(markdown);

  const masks = new Map(); // text → mask (deduplicated)
  const want = (text) => {
    if (hasLetters(text) && !masks.has(text)) masks.set(text, maskInline(text, { protectedTerms }));
  };
  for (const p of parts) {
    if (typeof p === "string") continue;
    if (p.cells) p.cells.forEach((c) => want(c.trim()));
    else if (p.html) p.html.forEach((x) => typeof x !== "string" && want(x.text.trim()));
    else want(p.text);
  }
  // a segment made only of masked tokens / markup needs no request
  const results = new Map();
  const toSend = [];
  for (const [text, m] of masks) {
    if (m.hasProse) toSend.push([text, m]);
    else results.set(text, text);
  }

  const run = limiterFor(Math.max(1, concurrency));
  const groups = planBatches(toSend.map(([, m]) => m.html));
  let cursor = 0;
  await Promise.all(
    groups.map((group) => {
      const slice = toSend.slice(cursor, cursor + group.length);
      cursor += group.length;
      return run(() =>
        requestBatch(group, target, { fetchImpl, apiKey, timeoutMs, backoffMs })
      ).then((answers) => {
        answers.forEach((ans, i) => results.set(slice[i][0], slice[i][1].restore(ans)));
      });
    })
  );

  let untranslated = 0;
  const pick = (text) => {
    if (!masks.has(text)) return text;
    const r = results.get(text);
    if (r == null || r === "") {
      untranslated++;
      return text;
    }
    return r;
  };
  // a cell or HTML text run: translated core, source whitespace around it
  const pickPadded = (c) => {
    if (!c.trim()) return c;
    const lead = c.match(/^\s*/)[0];
    const trail = c.match(/\s*$/)[0];
    return lead + pick(c.trim()) + trail;
  };
  const out = parts.map((p) => {
    if (typeof p === "string") return p;
    if (p.cells) return p.cells.map(pickPadded).join("|");
    if (p.html) return p.html.map((x) => (typeof x === "string" ? x : pickPadded(x.text))).join("");
    return p.pre + pick(p.text) + p.post;
  });
  const total = masks.size;
  if (stats) {
    stats.segments = (stats.segments ?? 0) + total;
    stats.untranslated = (stats.untranslated ?? 0) + untranslated;
    stats.requests = (stats.requests ?? 0) + groups.length;
  }
  if (total > 0 && untranslated / total > maxUntranslatedRatio) {
    throw new Error(`google translate: ${untranslated}/${total} segments could not be restored`);
  }
  return out.join("\n");
}

// ----- ICU MessageFormat strings ------------------------------------------------------

/**
 * Parses an ICU message into nodes: { text } | { raw } (simple argument, `#`, quoted literal
 * — kept verbatim) | { complex: { head, options: [{ head, message }], close } } for plural /
 * select / selectordinal. Malformed input degrades to text.
 */
export function parseIcuMessage(source) {
  let i = 0;
  function matchBrace(from) {
    let depth = 0;
    for (let k = from; k < source.length; k++) {
      if (source[k] === "{") depth++;
      else if (source[k] === "}" && --depth === 0) return k;
    }
    return -1;
  }
  function message(depth, inPlural) {
    const nodes = [];
    const text = (ch) => {
      const last = nodes[nodes.length - 1];
      if (last && last.text !== undefined) last.text += ch;
      else nodes.push({ text: ch });
    };
    while (i < source.length) {
      const c = source[i];
      // ICU quoting, incl. the '<literal>' escape intl-messageformat needs for angle spans
      if (c === "'" && /[{}#|'<]/.test(source[i + 1] ?? "")) {
        const close = source[i + 1] === "'" ? i + 1 : source.indexOf("'", i + 1);
        const end = close < 0 ? source.length : close + 1;
        nodes.push({ raw: source.slice(i, end) });
        i = end;
        continue;
      }
      if (c === "#" && inPlural) {
        nodes.push({ raw: "#" });
        i++;
        continue;
      }
      if (c === "}" && depth > 0) return nodes;
      // rich-text tag pair (<code>…</code>, <link>…</link>): its text is its own segment, so
      // the translator can move the pair but never split or swap the two tags
      if (c === "<") {
        const open = /^<([A-Za-z][\w-]*)>/.exec(source.slice(i));
        if (open) {
          const closeTag = `</${open[1]}>`;
          const end = source.indexOf(closeTag, i + open[0].length);
          if (end >= 0) {
            const inner = source.slice(i + open[0].length, end);
            nodes.push({
              complex: {
                head: open[0],
                options: [{ head: "", message: parseIcuMessage(inner) }],
                close: closeTag,
                tag: true,
              },
            });
            i = end + closeTag.length;
            continue;
          }
        }
      }
      if (c === "{") {
        const head = /^\{\s*([^\s,{}]+)\s*(?:,\s*(\w+)\s*)?(,|\})/.exec(source.slice(i));
        const end = matchBrace(i);
        if (head && end >= 0) {
          const type = head[2];
          if (!type || !/^(plural|select|selectordinal)$/.test(type)) {
            nodes.push({ raw: source.slice(i, end + 1) });
            i = end + 1;
            continue;
          }
          const complex = { head: head[0], options: [], close: "" };
          i += head[0].length;
          for (;;) {
            const opt = /^\s*(?:offset:\d+\s*)?(=?[\w-]+)\s*\{/.exec(source.slice(i));
            if (!opt) break;
            i += opt[0].length;
            const child = message(depth + 1, type !== "select");
            complex.options.push({ head: opt[0], message: child });
            if (source[i] === "}") i++;
          }
          const close = /^\s*\}/.exec(source.slice(i));
          complex.close = close ? close[0] : "}";
          if (close) i += close[0].length;
          nodes.push({ complex });
          continue;
        }
      }
      text(c);
      i++;
    }
    return nodes;
  }
  return message(0, false);
}

/**
 * Translates UI strings (ICU MessageFormat) into `localeCode`. A plural / select is never sent
 * as structure: the outer sentence travels with the whole argument as ONE opaque token (the
 * translator may move it, which is a valid reorder), and every branch text is its own segment,
 * so the `{count, plural, one {…} other {…}}` scaffolding is rebuilt from the source. Leading
 * and trailing whitespace is kept. Returns one entry per input: the translation, or null when
 * an answer could not be restored safely (the caller keeps its marker).
 */
export async function translateStringsWithGoogle(texts, localeCode, options = {}) {
  const segments = []; // { text } — every translatable message of every string
  const plans = texts.map((raw) => {
    const lead = raw.match(/^\s*/)[0];
    const trail = raw.slice(lead.length).match(/\s*$/)[0];
    const core = raw.slice(lead.length, raw.length - trail.length);
    // A message → { id, sentinels: Map(sentinel → node) }
    const plan = (nodes) => {
      let flat = "";
      const sentinels = new Map();
      for (const node of nodes) {
        if (node.text !== undefined) flat += node.text;
        else {
          const key = `\u0001${sentinels.size}\u0001`;
          sentinels.set(
            key,
            node.complex
              ? { complex: node.complex, options: node.complex.options.map((o) => plan(o.message)) }
              : node
          );
          flat += key;
        }
      }
      segments.push(flat);
      return { id: segments.length - 1, sentinels };
    };
    return { lead, trail, root: plan(parseIcuMessage(core)) };
  });

  const markdown = await translateSegmentsWithGoogle(segments, localeCode, options);

  const render = (msgPlan) => {
    let out = markdown[msgPlan.id];
    if (out == null) return null;
    // An ASCII apostrophe right before an argument / brace / tag starts an ICU quoted span and
    // would swallow the argument (ko turned “{source}” into '{source}'): use the typographic one.
    out = out.replace(/'(?=[{}#|<\u0001])/g, "\u2019");
    // "# -Charge": the translator glued a hyphen onto the word after a masked `#` / argument
    out = out.replace(/(\u0001\d+\u0001) -(?=\p{L})/gu, "$1 ");
    for (const [key, node] of msgPlan.sentinels) {
      let value;
      if (node.complex) {
        const parts = [];
        for (let k = 0; k < node.complex.options.length; k++) {
          const child = render(node.options[k]);
          if (child == null) return null;
          parts.push(node.complex.options[k].head + child + (node.complex.tag ? "" : "}"));
        }
        value = node.complex.head + parts.join("") + node.complex.close;
      } else value = node.raw;
      if (!out.includes(key)) return null;
      out = out.replace(key, () => value);
    }
    return out;
  };
  return plans.map((p) => {
    const body = render(p.root);
    return body == null ? null : p.lead + body + p.trail;
  });
}

/**
 * Translates plain text segments (no markdown blocks): each one is masked, batched and
 * restored like a table cell. Returns the translations, null where restore failed; segments
 * without prose come back unchanged.
 */
export async function translateSegmentsWithGoogle(segments, localeCode, options = {}) {
  const {
    fetchImpl = globalThis.fetch,
    apiKey = process.env.OMNIROUTE_TRANSLATION_GOOGLE_API_KEY || "",
    concurrency = Number(process.env.OMNIROUTE_TRANSLATION_GOOGLE_CONCURRENCY || 6),
    timeoutMs = Number(process.env.OMNIROUTE_TRANSLATION_GOOGLE_TIMEOUT_MS || 30000),
    backoffMs = 1000,
    protectedTerms = [],
  } = options;
  const target = googleLangFor(localeCode);
  const results = segments.map(() => null);
  const pending = [];
  segments.forEach((text, idx) => {
    const lead = text.match(/^\s*/)[0];
    const trail = text.slice(lead.length).match(/\s*$/)[0];
    const core = text.slice(lead.length, text.length - trail.length);
    const mask = maskInline(core, { protectedTerms });
    if (!mask.hasProse) results[idx] = text;
    else pending.push({ idx, lead, trail, mask });
  });
  const run = limiterFor(Math.max(1, concurrency));
  const groups = planBatches(pending.map((p) => p.mask.html));
  let cursor = 0;
  await Promise.all(
    groups.map((group) => {
      const slice = pending.slice(cursor, cursor + group.length);
      cursor += group.length;
      return run(() =>
        requestBatch(group, target, { fetchImpl, apiKey, timeoutMs, backoffMs })
      ).then((answers) => {
        answers.forEach((ans, i) => {
          const p = slice[i];
          const restored = p.mask.restore(ans);
          results[p.idx] = restored == null ? null : p.lead + restored + p.trail;
        });
      });
    })
  );
  return results;
}
