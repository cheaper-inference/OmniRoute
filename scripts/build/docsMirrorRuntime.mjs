// The translated /docs pages (#18699) read exactly one slice of docs/i18n: the mirror of an
// English page the docs route can serve, `docs/i18n/<locale>/docs/<section>/<PAGE>.md`
// (src/lib/docsI18nRender.ts, path pinned by src/lib/docsI18nPath.ts). The route only reaches
// a mirror after the English page resolves, so the reachable sections and the excluded pages are
// the ones source.config.ts compiles. Everything else under docs/i18n (README, CHANGELOG,
// AGENTS/CLAUDE/GEMINI, llm.txt, and mirrors of pages outside these sections) is authoring
// material the runtime never opens.
//
// The npm pack policy (pack-artifact-policy.ts) allows exactly these paths, and .dockerignore
// re-includes the same set. tests/unit/docs-mirror-runtime-shipping.test.ts keeps all three in
// sync with source.config.ts.

/** Sections compiled into the docs source by source.config.ts, in its order. */
export const DOCS_RUNTIME_SECTIONS = Object.freeze([
  "getting-started",
  "guides",
  "architecture",
  "reference",
  "frameworks",
  "routing",
  "security",
  "compression",
  "ops",
  "providers",
  "comparison",
]);

/**
 * Operator-internal pages source.config.ts keeps out of /docs. Their mirrors are not served
 * (the English page 404s first) and must not be distributed either.
 */
export const DOCS_RUNTIME_EXCLUDED_PAGES = Object.freeze([
  "security/STEALTH_GUIDE.md",
  "security/SOCKET_DEV_FINDINGS.md",
  "security/MITM-TPROXY-DECRYPT.md",
  "security/PUBLIC_CREDS.md",
]);

// Same character classes as the route's guard (docsI18nPath.ts): locales are [a-z0-9-],
// slug segments may also contain `_`. Checked per segment, so no `..` or empty segment passes.
const LOCALE_RE = /^[A-Za-z0-9-]+$/;
const SEGMENT_RE = /^[A-Za-z0-9_-]+$/;

/**
 * True when `relativePath` (repo- or bundle-relative, forward slashes) is a translated mirror
 * the docs route can serve: `docs/i18n/<locale>/docs/<section>/[<dir>/]<PAGE>.md`.
 */
export function isRuntimeDocsMirrorPath(relativePath) {
  const parts = String(relativePath || "").split("/");
  if (parts.length < 6) return false;
  const [docs, i18n, locale, innerDocs, section, ...rest] = parts;
  if (docs !== "docs" || i18n !== "i18n" || innerDocs !== "docs") return false;
  if (!LOCALE_RE.test(locale) || !DOCS_RUNTIME_SECTIONS.includes(section)) return false;

  const fileName = rest[rest.length - 1];
  if (!fileName.endsWith(".md")) return false;
  const segments = [...rest.slice(0, -1), fileName.slice(0, -".md".length)];
  if (!segments.every((segment) => SEGMENT_RE.test(segment))) return false;

  return !DOCS_RUNTIME_EXCLUDED_PAGES.includes([section, ...rest].join("/"));
}
