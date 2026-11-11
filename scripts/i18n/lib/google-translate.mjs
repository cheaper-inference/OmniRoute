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
  /<(code|kbd|samp)\b(?:[^"'<>]|"[^"]*"|'[^']*')*>[\s\S]*?<\/\1\s*>/iy,
  /<!--[\s\S]*?-->|<\/?[A-Za-z](?:[^"'<>\n]|"[^"\n]*"|'[^'\n]*')*>/y, // HTML comments / tags
  /https?:\/\/[^\s)<>\]]+/y, // bare URLs
  /\{[^{}\n]{1,80}\}|\$\{[^}\n]+\}|%[sd]|\$[A-Z_][A-Z0-9_]*/y, // ICU / shell placeholders
  /(?<![\w-])[A-Z][A-Z0-9]*(?:_[A-Z0-9]+)+(?![\w-])/y, // UPPER_SNAKE env names
  // Preserve the repository qualifier too: transliterating 9router in 9router#1437
  // loses the original reference. Match before paths, and leave C#7 as prose.
  /(?<![\w/.-])(?:[\w.-]+\/[\w.-]+|[\w.-]{2,})#\d+(?!\d)/y,
  /(?<![\w/-])(?:[\w.-]+\/)+[\w.-]+(?![\w/-])/y, // paths with a slash
  /(?<![\w-])[\w-]+\.(?:md|mdx|ts|tsx|js|mjs|cjs|json|ya?ml|sh|sql|css|html|txt|toml|env)(?![\w-])/y, // file names
  /(?<![\w-])--?[a-z][\w-]*(?![\w-])/y, // CLI flags
  /&[a-z]+;|&#\d+;/y, // literal entities in the source
  // GitHub issue / PR references: the translator wrote `#15281` as `# 15281` (fa, fr, it, or,
  // pt-BR, ru on #18795). Not an entity (`&#38;`) nor glued to a word (`C#7`); a URL fragment
  // never gets here because the bare-URL pattern above takes the whole URL.
  /(?<![\w&])#\d+(?!\d)/y,
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
  // UI kit, palette and font names from the design-system source.
  "Keak CI UI Kit",
  "Switzer",
  "Inter",
  "Vazirmatn",
  "Editions",
  "Classic",
  "Lucide",
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

function normalizeEmphasisSpacing(text) {
  return text.replace(/(\*\*|__|~~)([^*_~\n]+?)\1/g, (all, marker, inner, offset, whole) => {
    const content = inner.replace(/^[ \t]+|[ \t]+$/g, "");
    if (!content) return all;
    // A translator can move the separating space inside either delimiter. Keep it
    // outside when prose touches that edge; source code spans are still opaque tokens.
    const before = /^[ \t]/.test(inner) && /[\p{L}\p{N}]/u.test(whole[offset - 1] ?? "") ? " " : "";
    const after =
      /[ \t]$/.test(inner) && /[\p{L}\p{N}]/u.test(whole[offset + all.length] ?? "") ? " " : "";
    return before + marker + content + marker + after;
  });
}

/**
 * Masks everything in one text segment that must survive verbatim and converts inline
 * emphasis / links to HTML the translator understands. Returns the HTML to send and
 * `restore(translatedHtml)`, which rebuilds markdown or returns null when the answer is
 * unusable (a token went missing, or translator markup survived).
 */
export function maskInline(text, { protectedTerms = [], pipe = "\\|" } = {}) {
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
      // Recognize markup before the generic symbol token can mask a strikethrough delimiter.
      EMPHASIS.lastIndex = pos;
      const em = EMPHASIS.exec(src);
      if (em && (em[0] !== "*" || /\S/.test(src[pos + 1] ?? ""))) {
        flushPlain();
        html += `<em data-m="${em[0]}"></em>`;
        pos += em[0].length;
        continue;
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
      plain += src[pos];
      pos++;
    }
    flushPlain();
    return html;
  }

  const html = build(text);

  function restore(translated) {
    let out = String(translated);
    // Normalize before span restoration can consume spaces next to masked UI names.
    out = out.replace(/<em data-m=\\?"([*_~]+)\\?"\s*>\s*<\/em>/g, "$1");
    out = normalizeEmphasisSpacing(out);
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
    if (/<\/?(?:span|a|em)\b/i.test(out)) return null;
    // 3. entities, whitespace and emphasis on the translated prose only, then the originals
    out = decodeEntities(out)
      .replace(/[\u200b\u200c\ufeff]/g, "") // zero-width marks the web endpoint injects
      .replace(/[ \t]{2,}/g, " ")
      .trim();
    // no space between a link / masked token and a following period or comma
    out = out.replace(/(\]\([^)\s]*\)|[\ue000-\uf8ff])[ \t]+([.,])/g, "$1$2");
    out = normalizeEmphasisSpacing(out);
    // Every source code span is masked, so a backtick in the translated prose came from the
    // translator (hy renders its comma ՝ as `) and would open a fake code span; a bare pipe
    // would split a table cell.
    out = out.replace(/`/g, (_, offset, whole) =>
      /[԰-֏]/.test(whole[offset - 1] ?? "") ? "՝" : "'"
    );
    // `pipe` is the replacement: an escaped pipe, or the script's own sentence mark for a
    // locale whose terminator the endpoint writes as `|` (see TRANSLATOR_PIPE).
    out = out.replace(/\s*(?<!\\)\|/g, (m) => (pipe === "\\|" ? m.replace("|", pipe) : pipe));
    // Two tokens the translator glued together (it may drop the comma between them, e.g.
    // ar) must not touch when either is a code span: `a``b` would parse as ONE span.
    out = out.replace(/([\ue000-\uf8ff])(?=[\ue000-\uf8ff])/g, (ch, _a, offset) => {
      const left = tokens[ch.charCodeAt(0) - PUA_BASE]?.raw ?? "";
      const right = tokens[out.charCodeAt(offset + 1) - PUA_BASE]?.raw ?? "";
      return left.endsWith("`") || right.startsWith("`") ? ch + " " : ch;
    });
    return out.replace(/[\ue000-\uf8ff]/g, (ch) => tokens[ch.charCodeAt(0) - PUA_BASE]?.raw ?? ch);
  }

  return { html, tokens, links, restore, hasProse, sourceText: text };
}

// Classify bare echoes only when every original protected span remains valid
// and exactly once. The cleaned reply is NEVER used as translated text.
function classifyBareTokenEchoes(mask, answer) {
  if (!mask.tokens.length || BARE_TOKEN_ID.test(mask.sourceText)) return null;
  let echoes = 0;
  let unknown = false;
  const known = new Set(mask.tokens.map((_token, index) => tokenId(index)));
  const cleaned = answer
    .split(/(<span translate=\\?"no\\?"\s*>\s*zq[a-z]+\s*<\/span>)/g)
    .map((piece) => {
      if (piece.startsWith("<span")) return piece;
      return piece.replace(/(?<!\p{L})zq[a-z]+(?!\p{L})/gu, (id) => {
        echoes++;
        if (!known.has(id)) unknown = true;
        return "";
      });
    })
    .join("");
  if (!echoes || mask.restore(cleaned) === null) return null;
  return unknown ? "unknown" : "known";
}

// Keep the generated tags and protected spans local. Only the source prose
// nodes are sent on this retry, preserving source punctuation and whitespace.
function proseRetryPlan(mask) {
  const pieces = mask.html.split(/(<span translate="no">zq[a-z]+<\/span>|<[^>]+>)/g);
  const nodes = [];
  pieces.forEach((piece, index) => {
    if (!piece || piece.startsWith("<") || !hasLetters(piece)) return;
    nodes.push({
      index,
      source: piece.trim(),
      lead: piece.match(/^\s*/)[0],
      trail: piece.match(/\s*$/)[0],
    });
  });
  return { pieces, nodes };
}

function safeRetriedProse(text) {
  return (
    typeof text === "string" &&
    text.trim() &&
    !/<[^>]*>/.test(text) &&
    !/<\/?[a-z]/i.test(decodeEntities(text)) &&
    !/(?<!\p{L})(?:zq[a-z]+|ZQ[A-Z]+)(?!\p{L})/u.test(text)
  );
}

// ----- block parsing ----------------------------------------------------------------

const FENCE = /^(\s*)(`{3,}|~{3,})(.*)$/;
const TABLE_ROW = /^\s*\|/;
const TABLE_SEP = /^\s*\|?\s*:?-{3,}:?\s*(\|\s*:?-{3,}:?\s*)*\|?\s*$/;
const HEADING = /^(#{1,6}\s+)(.*?)(\s+#+\s*)?$/;
const LIST_ITEM = /^(\s*(?:[-*+]|\d+[.)])\s+(?:\[[ xX]\]\s+)?)(.*)$/;
const QUOTE = /^(\s*(?:>\s?)+)(.*)$/;
const HR = /^\s*(?:-{3,}|\*{3,}|_{3,}|={3,})\s*$/;
const columns = (prefix) =>
  [...prefix].reduce((width, char) => width + (char === "\t" ? 4 - (width % 4) : 1), 0);

export function splitCells(row) {
  // split on `|` outside inline code; escaped pipes stay inside the cell
  const cells = [];
  let cur = "";
  let ticks = 0;
  for (let i = 0; i < row.length; i++) {
    const ch = row[i];
    if (ch === "\\" && row[i + 1] === "|") {
      cur += "\\|";
      i++;
      continue;
    }
    if (ch === "`") {
      let end = i + 1;
      while (row[end] === "`") end++;
      const length = end - i;
      if (ticks === 0) ticks = length;
      else if (ticks === length) ticks = 0;
      cur += row.slice(i, end);
      i = end - 1;
      continue;
    }
    if (ch === "|" && ticks === 0) {
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
  /<!--[\s\S]*?-->|<(code|kbd|samp)\b(?:[^"'<>]|"[^"]*"|'[^']*')*>[\s\S]*?<\/\1\s*>|<\/?[A-Za-z][\w-]*(?=[\s/>])(?:[^"'<>]|"[^"]*"|'[^']*')*>/gi;
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
  const parts = [];
  let code = null;
  let para = null;
  let comment = false;
  let containers = [];
  const flush = () => {
    if (para) parts.push({ pre: para.pre, text: para.lines.join(" "), post: "" });
    para = null;
  };
  const indentation = (text) => columns(text.match(/^ */)?.[0] ?? "");
  const quoteLength = (text) => {
    const quote = QUOTE.exec(text);
    if (!quote) return 0;
    const marker = quote[1].indexOf(">");
    if (marker > 3) return 0;
    return marker + 1 + (text[marker + 1] === " " ? 1 : 0);
  };
  // Normalize only container prefixes. Keep raw offsets so prose prefixes and
  // every code line can be emitted from the original bytes, including tabs.
  const normalize = (line, previous, allowNew) => {
    let expanded = "";
    const offsets = [0];
    for (let i = 0; i < line.length; i++) {
      const chars = line[i] === "\t" ? " ".repeat(4 - (expanded.length % 4)) : line[i];
      expanded += chars;
      for (let j = 0; j < chars.length; j++) offsets.push(i + 1);
    }
    let offset = 0;
    const current = [];
    for (const container of previous) {
      const rest = expanded.slice(offset);
      if (container.kind === "quote") {
        const length = quoteLength(rest);
        if (!length) break;
        offset += length;
      } else if (!rest.trim()) {
        offset = expanded.length;
      } else {
        if (indentation(rest) < container.width) break;
        offset += container.width;
      }
      current.push(container);
    }
    const complete = current.length === previous.length;
    if (allowNew) {
      while (offset < expanded.length) {
        const rest = expanded.slice(offset);
        if (indentation(rest) >= 4) break; // a marker here is literal code content
        const quote = quoteLength(rest);
        if (quote) {
          offset += quote;
          current.push({ kind: "quote" });
          continue;
        }
        const marker = /^( {0,3})([-*+]|\d+[.)])( +)/.exec(rest);
        if (!marker || !LIST_ITEM.test(rest)) break;
        // Five or more spaces after a marker start indented code: only the
        // first space belongs to the list prefix; the remaining spaces stay.
        const padding = marker[3].length > 4 ? 1 : marker[3].length;
        const width = marker[1].length + marker[2].length + padding;
        offset += width;
        current.push({ kind: "list", width });
      }
    }
    return { text: expanded.slice(offset), offset, offsets, containers: current, complete };
  };
  for (const line of markdown.split("\n")) {
    if (comment) {
      parts.push(line);
      if (line.includes("-->")) comment = false;
      continue;
    }
    if (code) {
      // Existing code only consumes its original containers. A new `>` or
      // list marker in the body is never interpreted as another container.
      const view = normalize(line, code.containers, false);
      if (view.complete && (code.delimiter || !view.text.trim() || indentation(view.text) >= 4)) {
        parts.push(line);
        containers = view.containers;
        const closer = indentation(view.text) < 4 ? FENCE.exec(view.text) : null;
        if (
          code.delimiter &&
          closer &&
          closer[2][0] === code.delimiter[0] &&
          closer[2].length >= code.delimiter.length &&
          closer[3].trim() === ""
        )
          code = null;
        continue;
      }
      code = null;
    }
    const view = normalize(line, containers, true);
    if (
      view.containers.length !== containers.length ||
      view.containers.some((container, i) => container !== containers[i])
    )
      flush();
    containers = view.containers;
    if (!view.text.trim()) {
      flush();
      parts.push(line);
      continue;
    }
    const indent = indentation(view.text);
    // Indented code cannot interrupt an existing paragraph.
    if (!para && indent >= 4) {
      code = { containers: [...containers] };
      parts.push(line);
      continue;
    }
    const fence = indent < 4 ? FENCE.exec(view.text) : null;
    if (fence && (fence[2][0] === "~" || !fence[3].includes("`"))) {
      flush();
      code = { delimiter: fence[2], containers: [...containers] };
      parts.push(line);
      continue;
    }
    if (/^\s*<!--/.test(view.text)) {
      flush();
      parts.push(line);
      if (!line.includes("-->")) comment = true;
      continue;
    }
    if (TABLE_ROW.test(line)) {
      flush();
      parts.push(TABLE_SEP.test(line) ? line : { cells: splitCells(line) });
      continue;
    }
    const rawStart = view.offsets[view.offset + indent];
    let pre = line.slice(0, rawStart);
    let text = line.slice(rawStart);
    // A task checkbox belongs to the visible list prefix, not its indentation.
    const task = containers.at(-1)?.kind === "list" ? /^\[[ xX]\] +/.exec(text) : null;
    if (task) {
      pre += task[0];
      text = text.slice(task[0].length);
    }
    if (HR.test(text) || /^\[![A-Z]+\]\s*$/.test(text)) {
      flush();
      parts.push(line);
      continue;
    }
    const heading = HEADING.exec(text);
    if (heading) {
      flush();
      parts.push({ pre: pre + heading[1], text: heading[2], post: heading[3] ?? "" });
      continue;
    }
    if (/^\s*</.test(text)) {
      flush();
      parts.push({ html: [pre, ...splitHtmlLine(text)] });
      continue;
    }
    if (para) para.lines.push(text.trim());
    else para = { pre, lines: [text.trim()] };
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

async function requestBatch(
  htmlList,
  target,
  { fetchImpl, apiKey, timeoutMs, backoffMs, wireCase = "upper" }
) {
  // The keyless endpoint sometimes echoes a lowercase marker outside its protected
  // span. Uppercase wire markers avoid that observed corruption without growing
  // the batch. Decode them before the existing strict token/structure validation;
  // duplicated or invented wire markers must still fail that validation.
  // Preserve legacy handling if source prose already uses the wire-marker prefix.
  const useWireMarkers = !apiKey && !htmlList.some((html) => /ZQ[A-Z]+/.test(html));
  const wireHtml =
    useWireMarkers && wireCase === "upper"
      ? htmlList.map((html) =>
          html.replace(
            /(<span translate="no">)(zq[a-z]+)(<\/span>)/g,
            (_match, before, id, after) => before + id.toUpperCase() + after
          )
        )
      : htmlList;
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
        for (const q of wireHtml) body.append("q", q);
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
      return useWireMarkers
        ? list.map((text) =>
            text.replace(/(?<!\p{L})ZQ[A-Z]+(?!\p{L})/gu, (id) => id.toLowerCase())
          )
        : list;
    } catch (err) {
      lastErr = err;
      const retryable =
        err?.retryable ||
        err?.name === "AbortError" ||
        err?.status === 429 ||
        (err?.status ?? 0) >= 500 ||
        // undici reports a dropped connection as TypeError("fetch failed") whose `cause` is
        // e.g. `SocketError: other side closed` (UND_ERR_SOCKET), so the cause alone does not
        // say "network"; test the message as well or a reset fails the locale on try 1.
        /fetch failed|ECONN|ENOTFOUND|network/i.test(`${err?.message} ${err?.cause ?? ""}`);
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

// Locales whose sentence mark the endpoint answers as an ASCII pipe: `or` came back with `|` for
// the danda (।) at every sentence end of a table cell, which then shipped as `\|` (#18795).
const TRANSLATOR_PIPE = { or: "।" };

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
  if (!Number.isSafeInteger(concurrency) || concurrency < 1) {
    throw new Error("google translate concurrency must be a positive integer");
  }
  if (!Number.isSafeInteger(timeoutMs) || timeoutMs < 1 || timeoutMs > 2147483647) {
    throw new Error("google translate timeout must be a positive 32-bit integer in milliseconds");
  }
  const target = googleLangFor(localeCode);
  const parts = segmentMarkdown(markdown);
  const pipe = TRANSLATOR_PIPE[target] ?? "\\|";

  const masks = new Map(); // text → mask (deduplicated)
  const want = (text) => {
    if (hasLetters(text) && !masks.has(text)) {
      masks.set(text, maskInline(text, { protectedTerms, pipe }));
    }
  };
  for (const p of parts) {
    if (typeof p === "string") continue;
    if (p.cells) p.cells.forEach((c) => want(c.trim()));
    else if (p.html) p.html.forEach((x) => typeof x !== "string" && want(x.text.trim()));
    else want(p.text);
  }
  // a segment made only of masked tokens / markup needs no request
  const results = new Map();
  const answersByText = new Map();
  const toSend = [];
  for (const [text, m] of masks) {
    if (m.hasProse) toSend.push([text, m]);
    else results.set(text, text);
  }

  const run = limiterFor(concurrency);
  const groups = planBatches(toSend.map(([, m]) => m.html));
  let cursor = 0;
  await Promise.all(
    groups.map((group) => {
      const slice = toSend.slice(cursor, cursor + group.length);
      cursor += group.length;
      return run(() =>
        requestBatch(group, target, { fetchImpl, apiKey, timeoutMs, backoffMs })
      ).then((answers) => {
        answers.forEach((ans, i) => {
          answersByText.set(slice[i][0], ans);
          results.set(slice[i][0], slice[i][1].restore(ans));
        });
      });
    })
  );

  let retryRequests = 0;
  if (!apiKey) {
    // Some keyless batches return empty items; uppercase markers can also invent
    // bare ids while retaining every protected span. Retry those source segments
    // once, independently. Only a fresh, strictly restored answer can recover.
    await Promise.all(
      toSend.map(([text, mask]) => {
        const answer = answersByText.get(text);
        if (typeof answer !== "string") return;
        const empty = answer.trim() === "";
        const unknownEcho =
          results.get(text) === null && classifyBareTokenEchoes(mask, answer) === "unknown";
        if (!empty && !unknownEcho) return;
        return run(async () => {
          retryRequests++;
          try {
            const [reply] = await requestBatch([mask.html], target, {
              fetchImpl,
              apiKey,
              timeoutMs,
              backoffMs,
              wireCase: unknownEcho ? "lower" : "upper",
            });
            const restored = mask.restore(reply);
            if (restored && restored !== text) {
              results.set(text, restored);
              answersByText.set(text, reply);
            }
          } catch {
            // Preserve the original rejection; neither a failed retry nor its
            // corrupt primary response may satisfy the untranslated budget.
          }
        });
      })
    );
    const retryPlans = new Map();
    for (const [text, mask] of toSend) {
      const answer = answersByText.get(text);
      if (
        results.get(text) === null &&
        typeof answer === "string" &&
        classifyBareTokenEchoes(mask, answer) === "known"
      ) {
        retryPlans.set(text, { mask, ...proseRetryPlan(mask) });
      }
    }
    const sources = [
      ...new Set([...retryPlans.values()].flatMap((plan) => plan.nodes.map((node) => node.source))),
    ];
    const retried = new Map();
    await Promise.all(
      planBatches(sources).map((group) =>
        run(async () => {
          retryRequests++;
          try {
            const replies = await requestBatch(group, target, {
              fetchImpl,
              apiKey,
              timeoutMs,
              backoffMs,
            });
            replies.forEach((reply, i) => {
              if (safeRetriedProse(reply)) retried.set(group[i], reply.trim());
            });
          } catch {
            // The original segment remains rejected. A failed recovery must never
            // authorize its corrupt response or bypass the untranslated threshold.
          }
        })
      )
    );
    for (const [text, plan] of retryPlans) {
      if (!plan.nodes.length || plan.nodes.some((node) => !retried.has(node.source))) continue;
      if (!plan.nodes.some((node) => retried.get(node.source) !== node.source)) continue;
      for (const node of plan.nodes)
        plan.pieces[node.index] = node.lead + retried.get(node.source) + node.trail;
      results.set(text, plan.mask.restore(plan.pieces.join("")));
    }
  }

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
    stats.requests = (stats.requests ?? 0) + groups.length + retryRequests;
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
export function parseIcuMessage(source, inPlural = false) {
  let i = 0;
  function quotedEnd(from) {
    if (source[from + 1] === "'") return from + 2;
    for (let k = from + 1; k < source.length; k++) {
      if (source[k] !== "'") continue;
      if (source[k + 1] === "'") k++;
      else return k + 1;
    }
    return source.length;
  }
  function matchBrace(from) {
    let depth = 0;
    for (let k = from; k < source.length; k++) {
      if (source[k] === "'" && /[{}#|'<]/.test(source[k + 1] ?? "")) {
        k = quotedEnd(k) - 1;
        continue;
      }
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
        const end = quotedEnd(i);
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
                options: [{ head: "", message: parseIcuMessage(inner, inPlural) }],
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
  return message(0, inPlural);
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
  if (!Number.isSafeInteger(concurrency) || concurrency < 1) {
    throw new Error("google translate concurrency must be a positive integer");
  }
  if (!Number.isSafeInteger(timeoutMs) || timeoutMs < 1 || timeoutMs > 2147483647) {
    throw new Error("google translate timeout must be a positive 32-bit integer in milliseconds");
  }
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
  const run = limiterFor(concurrency);
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
