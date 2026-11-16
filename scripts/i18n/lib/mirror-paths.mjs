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
const MD_DESTINATION = /(\]\(\s*)(<[^>\n]+>|[^)\s]+)/g;
const REFERENCE_DEFINITION = /^(\s{0,3}\[[^\]\n]+\]:\s*)(<[^>\n]+>|\S+)/;
const HTML_URL_ATTRIBUTE = /(\b(?:src|href|poster)\s*=\s*)(["'])([^"'\n]*)\2/gi;
const HTML_SRCSET = /(\bsrcset\s*=\s*)(["'])([^"'\n]*)\2/gi;
// Same span shape run-translation's htmlProse strips before it compares HTML.
const INLINE_CODE = /(`+)[^\n]*?\1/g;

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

function rebaseProse(text, ctx) {
  const one = (url) => rebaseReference(url, ctx);
  return text
    .replace(MD_DESTINATION, (_m, lead, url) => `${lead}${one(url)}`)
    .replace(HTML_URL_ATTRIBUTE, (_m, lead, q, url) => `${lead}${q}${one(url)}${q}`)
    .replace(HTML_SRCSET, (_m, lead, q, list) => {
      const rebased = list.replace(
        /(^|,)(\s*)([^\s,]+)/g,
        (_c, sep, ws, url) => `${sep}${ws}${one(url)}`
      );
      return `${lead}${q}${rebased}${q}`;
    });
}

function rebaseLine(line, ctx) {
  const definition = REFERENCE_DEFINITION.exec(line);
  if (definition) {
    return `${definition[1]}${rebaseReference(definition[2], ctx)}${line.slice(definition[0].length)}`;
  }
  let out = "";
  let last = 0;
  for (const m of line.matchAll(INLINE_CODE)) {
    out += rebaseProse(line.slice(last, m.index), ctx) + m[0];
    last = m.index + m[0].length;
  }
  return out + rebaseProse(line.slice(last), ctx);
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
  const lines = markdown.split("\n");
  let fence = null;
  for (let i = 0; i < lines.length; i++) {
    const open = FENCE.exec(lines[i]);
    if (fence) {
      if (open && open[1][0] === fence[0] && open[1].length >= fence.length) fence = null;
      continue;
    }
    if (open) {
      fence = open[1];
      continue;
    }
    lines[i] = rebaseLine(lines[i], ctx);
  }
  return lines.join("\n");
}
