// Relative links and images in a translated mirror were copied verbatim from the English source,
// so they still point where the source lives: `./docs/screenshots/x.png` in README.md resolves to
// `docs/i18n/<locale>/docs/screenshots/x.png` once it sits in `docs/i18n/<locale>/README.md`, and
// GitHub shows a broken image. rebaseMirrorPaths rewrites each such reference so it reaches the
// same file from the mirror's directory.
//
// A reference is rewritten only when it is broken from the mirror and resolves from the source.
// That keeps the pass idempotent (a rebased path already resolves from the mirror), leaves the
// language bar and any reference a translator already fixed alone, and never invents a path
// for a reference that is broken in the source too.
//
// Fenced code blocks and inline code spans are literals and are never touched.
import path from "node:path";

const FENCE = /^\s{0,3}(`{3,}|~{3,})/;
const REFERENCE_DEFINITION = /^(\s{0,3}\[[^\]\n]+\]:\s*)(<[^>\n]+>|\S+)/;
const HTML_URL_ATTRIBUTE = /(\b(?:src|href|poster)\s*=\s*)(["'])([^"'\n]*)\2/gi;
const HTML_SRCSET = /(\bsrcset\s*=\s*)(["'])([^"'\n]*)\2/gi;
// Same span shape run-translation's htmlProse strips before it compares HTML, except that a span
// may wrap onto the next line: it only ends at a blank line, like the paragraph that holds it.
const INLINE_CODE = /(`+)(?:(?!\n[ \t]*\n)[\s\S])*?\1/g;

/**
 * Mirrors of root-level sources (`README.md`, `CLAUDE.md`, `CHANGELOG.md`, …) are read on GitHub,
 * so their references have to resolve from `docs/i18n/<locale>/`. Mirrors of `docs/**` pages are
 * what the /docs route serves, and it resolves their links from the English page
 * (normalizeDocsMarkdownLinks), so those keep the source form.
 */
export function rebasesMirrorOf(sourceRel) {
  return !sourceRel.includes("/");
}

/** True for a path-only reference: no scheme, not protocol- or root-relative, not a bare anchor. */
export function isRelativeReference(url) {
  if (!url) return false;
  return !/^(?:[a-z][a-z0-9+.-]*:|\/|#|\?|\{|\$)/i.test(url);
}

/**
 * Rewrites one reference written for `sourceRel` so it resolves from `mirrorRel`.
 * Both paths are repo-relative with forward slashes; `exists(repoRelPath)` answers for files
 * and directories.
 */
export function rebaseReference(url, { sourceRel, mirrorRel, exists }) {
  const wrapped = url.startsWith("<") && url.endsWith(">");
  const raw = wrapped ? url.slice(1, -1) : url;
  if (!isRelativeReference(raw)) return url;
  const cut = raw.search(/[?#]/);
  const target = cut === -1 ? raw : raw.slice(0, cut);
  const suffix = cut === -1 ? "" : raw.slice(cut);
  if (!target) return url;
  const mirrorDir = path.posix.dirname(mirrorRel);
  const sourceDir = path.posix.dirname(sourceRel);
  const fromMirror = path.posix.normalize(path.posix.join(mirrorDir, target));
  if (fromMirror.startsWith("..") || exists(stripSlash(fromMirror))) return url;
  const fromSource = path.posix.normalize(path.posix.join(sourceDir, target));
  if (fromSource.startsWith("..") || !exists(stripSlash(fromSource))) return url;
  let rebased = path.posix.relative(mirrorDir, stripSlash(fromSource)) || ".";
  if (target.endsWith("/")) rebased += "/";
  const next = `${rebased}${suffix}`;
  return wrapped ? `<${next}>` : next;
}

function stripSlash(p) {
  return p.length > 1 ? p.replace(/\/+$/, "") : p;
}

/**
 * End index of the markdown link destination that starts at `from`, or `from` when there is none.
 * A `<…>` destination runs to its `>`; a bare one runs to whitespace or to the first `)` that does
 * not close a `(` it opened, so `docs/main(1).png` is read whole. Backslash escapes are skipped.
 */
function destinationEnd(text, from) {
  if (text[from] === "<") {
    const close = text.indexOf(">", from + 1);
    const newline = text.indexOf("\n", from + 1);
    return close === -1 || (newline !== -1 && newline < close) ? from : close + 1;
  }
  let depth = 0;
  let i = from;
  for (; i < text.length; i++) {
    const ch = text[i];
    if (ch === "\\" && i + 1 < text.length) {
      i++;
    } else if (/\s/.test(ch)) {
      break;
    } else if (ch === "(") {
      depth++;
    } else if (ch === ")") {
      if (depth === 0) break;
      depth--;
    }
  }
  return i;
}

/** Rewrites the destination of every inline markdown link or image (`](…)`) in `text`. */
function rebaseMarkdownDestinations(text, one) {
  let out = "";
  let last = 0;
  let open = text.indexOf("](");
  while (open !== -1) {
    let start = open + 2;
    while (start < text.length && /\s/.test(text[start])) start++;
    const end = destinationEnd(text, start);
    if (end > start) {
      out += text.slice(last, start) + one(text.slice(start, end));
      last = end;
    }
    open = text.indexOf("](", Math.max(end, open + 2));
  }
  return out + text.slice(last);
}

function rebaseProse(text, ctx) {
  const one = (url) => rebaseReference(url, ctx);
  return rebaseMarkdownDestinations(text, one)
    .replace(HTML_URL_ATTRIBUTE, (_m, lead, q, url) => `${lead}${q}${one(url)}${q}`)
    .replace(HTML_SRCSET, (_m, lead, q, list) => {
      const rebased = list.replace(
        /(^|,)(\s*)([^\s,]+)/g,
        (_c, sep, ws, url) => `${sep}${ws}${one(url)}`
      );
      return `${lead}${q}${rebased}${q}`;
    });
}

/**
 * Rebases a run of lines outside fenced code. Code spans are found over the whole run, so a span
 * that wraps onto the next line stays literal on both lines.
 */
function rebaseLines(lines, ctx) {
  const text = lines.join("\n");
  const spans = [...text.matchAll(INLINE_CODE)].map((m) => [m.index, m.index + m[0].length]);
  let offset = 0;
  return lines.map((line) => {
    const start = offset;
    const end = start + line.length;
    offset = end + 1;
    const insideAtStart = spans.some(([s, e]) => s < start && e > start);
    const definition = insideAtStart ? null : REFERENCE_DEFINITION.exec(line);
    if (definition) {
      return `${definition[1]}${rebaseReference(definition[2], ctx)}${line.slice(definition[0].length)}`;
    }
    let out = "";
    let last = 0;
    for (const [s, e] of spans) {
      if (e <= start || s >= end) continue;
      const from = Math.max(s, start) - start;
      const to = Math.min(e, end) - start;
      out += rebaseProse(line.slice(last, from), ctx) + line.slice(from, to);
      last = to;
    }
    return out + rebaseProse(line.slice(last), ctx);
  });
}

/**
 * Rebases every relative link, image and HTML `src`/`href`/`poster`/`srcset` reference in a
 * mirror's markdown from the source's directory to the mirror's directory.
 *
 * @param {string} markdown mirror content
 * @param {{ sourceRel: string, mirrorRel: string, exists: (repoRelPath: string) => boolean }} ctx
 */
export function rebaseMirrorPaths(markdown, ctx) {
  if (path.posix.dirname(ctx.sourceRel) === path.posix.dirname(ctx.mirrorRel)) return markdown;
  const out = [];
  let prose = [];
  let fence = null;
  const flush = () => {
    if (prose.length > 0) out.push(...rebaseLines(prose, ctx));
    prose = [];
  };
  for (const line of markdown.split("\n")) {
    const open = FENCE.exec(line);
    if (fence) {
      if (open && open[1][0] === fence[0] && open[1].length >= fence.length) fence = null;
      out.push(line);
      continue;
    }
    if (open) {
      flush();
      fence = open[1];
      out.push(line);
      continue;
    }
    prose.push(line);
  }
  flush();
  return out.join("\n");
}
