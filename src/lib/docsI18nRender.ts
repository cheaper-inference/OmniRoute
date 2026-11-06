import fs from "node:fs";
import path from "node:path";
import type { Tokens } from "marked";
import { resolveSafeI18nSectionDir } from "@/lib/docsI18nPath";
import { normalizeDocsMarkdownLinks } from "@/lib/docsLinkResolver";
import { withBasePath } from "@/shared/utils/basePath";
import { createLogger } from "@/shared/utils/logger";

const log = createLogger("docs/i18n");

export type DocsTocItem = { title: string; url: string; depth: number };

export type TranslatedDoc = {
  /** Sanitized article HTML. */
  html: string;
  /** Table of contents built from the translated headings. */
  toc: DocsTocItem[];
  /** False when the mirror's own heading was stripped, so the page must render the title. */
  hasOwnTitle: boolean;
};

// `scripts/i18n/run-translation.mjs` opens every mirror with
// `# Title (Native)`, a `🌐 Languages:` bar and a `---` rule, then the translated body.
const MIRROR_HEADER_RE = /^#[^\n]*\n\s*🌐[^\n]*\n\s*---[ \t]*(?:\r?\n|$)/;
// A few hand-translated mirrors keep the English layout instead: front matter, then `# Title`.
const FRONT_MATTER_RE = /^---\r?\n[\s\S]*?\r?\n---[ \t]*(?:\r?\n|$)/;

// Sources that carry their own language bar pass a translated copy into the mirror body. Its links
// point at sibling mirrors on disk, and the locale selector already covers switching language.
const LANGUAGE_BAR_RE = /^🌐[^\n]*\]\([^\n]*(?:\r?\n|$)/gm;

function stripMirrorPreamble(raw: string): string {
  const body = MIRROR_HEADER_RE.test(raw)
    ? raw.replace(MIRROR_HEADER_RE, "")
    : raw.replace(FRONT_MATTER_RE, "");
  return body.replace(LANGUAGE_BAR_RE, "").trim();
}

function slugifyHeading(text: string): string {
  return text
    .trim()
    .toLowerCase()
    .replace(/[^\p{L}\p{M}\p{N}\s_-]/gu, "")
    .replace(/\s/g, "-");
}

function createSlugger(): (text: string) => string {
  const seen = new Map<string, number>();
  return (text) => {
    const base = slugifyHeading(text);
    const count = seen.get(base) ?? 0;
    seen.set(base, count + 1);
    return count === 0 ? base : `${base}-${count}`;
  };
}

/**
 * Translated headings keep the English page's anchors while the structure still lines up, so
 * `#anchor` links that the mirrors carried over verbatim (and links from other docs) keep
 * landing on the right section. A mirror that drifted gets slugs of its own text instead.
 */
function assignHeadingIds(
  sections: Tokens.Heading[],
  titles: string[],
  englishToc: ReadonlyArray<{ url: string; depth: number }>
): string[] {
  const english = englishToc.filter((item) => item.depth > 1);
  const aligned =
    english.length === sections.length &&
    english.every((item, index) => item.depth === sections[index].depth);
  if (aligned) return english.map((item) => item.url.replace(/^#/, ""));

  const slug = createSlugger();
  return titles.map(slug);
}

async function renderMirrorMarkdown(
  body: string,
  docRelPath: string,
  englishToc: ReadonlyArray<{ url: string; depth: number }>
): Promise<Pick<TranslatedDoc, "html" | "toc">> {
  const [{ Marked, Parser, TextRenderer }, { sanitizeDocsHtml }] = await Promise.all([
    import("marked"),
    import("@/lib/docsSanitizer"),
  ]);

  const marked = new Marked();
  const tokens = marked.lexer(normalizeDocsMarkdownLinks(body, docRelPath));

  const sections: Tokens.Heading[] = [];
  marked.walkTokens(tokens, (token) => {
    if (token.type === "heading" && (token as Tokens.Heading).depth > 1) {
      sections.push(token as Tokens.Heading);
    }
  });

  const plainText = new Parser();
  const titles = sections.map((heading) =>
    plainText.parseInline(heading.tokens, new TextRenderer())
  );
  const ids = assignHeadingIds(sections, titles, englishToc);
  const idByHeading = new Map(sections.map((heading, index) => [heading, ids[index]]));

  marked.use({
    renderer: {
      heading(heading) {
        const id = idByHeading.get(heading);
        const inner = this.parser.parseInline(heading.tokens);
        return `<h${heading.depth}${id ? ` id="${id}"` : ""}>${inner}</h${heading.depth}>\n`;
      },
    },
  });

  // 🛡️ Sentinel: XSS protection via server-side sanitization of rendered markdown
  const sanitized = sanitizeDocsHtml(marked.parser(tokens));

  return {
    // English pages get the deploy basePath from next/link; this raw HTML has to add it.
    html: sanitized.replace(
      /(<a\s[^>]*?href=")(\/docs\/[^"]*)"/g,
      (_match, lead: string, href: string) => `${lead}${withBasePath(href)}"`
    ),
    toc: sections.map((heading, index) => ({
      title: titles[index],
      url: `#${ids[index]}`,
      depth: heading.depth,
    })),
  };
}

/**
 * Loads `docs/i18n/<locale>/docs/<section>/<FILE>.md`, the layout that
 * `scripts/i18n/run-translation.mjs` produces, and renders it to sanitized HTML.
 *
 * Returns `null` whenever the English page should be served instead: default locale, no mirror
 * for this page or locale, or a mirror that cannot be read or rendered. A bad translation must
 * never take the docs page down. npm, Docker and Electron builds ship the mirrors this reads
 * (scripts/build/docsMirrorRuntime.mjs decides which).
 */
export async function loadTranslatedDoc(
  slug: string[],
  locale: string,
  englishToc: ReadonlyArray<{ url: string; depth: number }>,
  docsRoot: string = path.resolve(process.cwd(), "docs")
): Promise<TranslatedDoc | null> {
  if (!locale || locale === "en") return null;

  // 🛡️ Path traversal prevention — `locale` is a user-controllable cookie, so
  // validate segments + confine the resolved dir to docs/i18n before any fs read.
  // Centralized in resolveSafeI18nSectionDir (pure, unit-tested).
  const sectionDir = resolveSafeI18nSectionDir(docsRoot, locale, slug);
  if (!sectionDir || !fs.existsSync(sectionDir)) return null;

  try {
    // Fumadocs lowercases slugs — match case-insensitively against i18n dir
    const target = `${slug[slug.length - 1]}.md`.toLowerCase();
    const match = fs.readdirSync(sectionDir).find((file) => file.toLowerCase() === target);
    if (!match) return null;

    const body = stripMirrorPreamble(fs.readFileSync(path.join(sectionDir, match), "utf8"));
    const rendered = await renderMirrorMarkdown(body, `${slug.join("/")}.md`, englishToc);
    return { ...rendered, hasOwnTitle: /^#\s/.test(body) };
  } catch (err) {
    log.warn({ err, locale, slug: slug.join("/") }, "Could not render translated doc");
    return null;
  }
}
