#!/usr/bin/env node
// Idempotent: paints the root README's shields.io badges in the kit's Editions palette
// (--ci-color-accent / --ci-color-heading of the light block of packages/ui-kit/src/ci-editions.css).
// In translated READMEs, only the original eight header badges are recolored. The script changes
// URL query strings and preserves badge paths, surrounding markup, and translated alt text.
//
//   node scripts/docs/apply-readme-badge-colors.mjs --dry-run          report, write nothing
//   node scripts/docs/apply-readme-badge-colors.mjs                    README.md and the mirrors
//   node scripts/docs/apply-readme-badge-colors.mjs --only-root        README.md alone
//
// A real run over the mirrors changes their hashes: refresh .i18n-state.json afterwards. Badges
// are matched by URL path because the path is the one part no translation touches; a mirror with
// a badge missing is reported and fails the run, so a mangled translation does not pass silently.
import { readFileSync, readdirSync, statSync, writeFileSync } from "node:fs";
import { dirname, join, relative, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..", "..");

export const KIT_COLORS = { color: "e5ac82", labelColor: "20211c" };

// style=social draws fixed greys and ignores both colors, so the star counter needs a style that
// honors them. Flat does not do what social did on its own: draw the GitHub mark and capitalize
// the label, so both are spelled out to keep the badge's text and logo as they were.
const HEADER_BADGES = [
  {
    path: "github/stars/cheaper-inference/OmniRoute",
    legacyPath: "github/stars/diegosouzapw/OmniRoute",
    set: { style: "flat", logo: "github", logoColor: "white", label: "Stars" },
  },
  { path: "badge/Follow_Diego_on-LinkedIn-0A66C2" },
  { path: "github/followers/diegosouzapw" },
  { path: "badge/Discord-5865F2" },
  { path: "badge/Telegram-26A5E4" },
  { path: "badge/WhatsApp_Global-25D366" },
  { path: "badge/WhatsApp_Brasil-25D366" },
  { path: "badge/Website-omniroute.online-blue" },
];

const SHIELDS_URL = /https:\/\/img\.shields\.io\/([^?\s)"'<>]+)(\?[^\s)"'<>]*)?/g;

function headerBadge(path) {
  return HEADER_BADGES.find((badge) => badge.path === path || badge.legacyPath === path);
}

// The Open Source Friends tags carry each partner's own colors: they are never repainted.
const PARTNER_BADGE = /^badge\/(?:Founding_Friend|Open_Source_Friend)-/;

// Hand-rolled on purpose: URLSearchParams would turn the %20 in `label=Follow%20on%20GitHub` into
// a `+`, a change to the URL that has nothing to do with its color.
function mergeQuery(query, overrides) {
  const params = (query || "")
    .replace(/^\?/, "")
    .split("&")
    .filter(Boolean)
    .map((pair) => {
      const eq = pair.indexOf("=");
      return eq < 0 ? [pair, null] : [pair.slice(0, eq), pair.slice(eq + 1)];
    });
  const pending = new Map(Object.entries(overrides));
  const merged = params
    .filter(([key]) => !(key in KIT_COLORS))
    .map(([key, value]) => {
      if (!pending.has(key)) return [key, value];
      const next = pending.get(key);
      pending.delete(key);
      return [key, next];
    });
  for (const [key, value] of pending) {
    if (!(key in KIT_COLORS)) merged.push([key, value]);
  }
  merged.push(...Object.entries(KIT_COLORS));
  return merged.map(([key, value]) => (value === null ? key : `${key}=${value}`)).join("&");
}

/** Recolors a Shields.io URL in the selected badge group. */
export function recolorBadgeUrl(url, { allBadges = false } = {}) {
  const match = /^https:\/\/img\.shields\.io\/([^?]+)(\?.*)?$/.exec(url);
  if (!match) return url;
  const [, path, query] = match;
  const badge = headerBadge(path);
  if (!badge && (!allBadges || PARTNER_BADGE.test(path))) return url;
  return `https://img.shields.io/${path}?${mergeQuery(query, badge?.set ?? {})}`;
}

/** @returns {{ text: string, changedLines: number, found: string[] }} */
export function recolorMarkdown(source, { allBadges = false } = {}) {
  const found = [];
  let changedLines = 0;
  const text = source
    .split("\n")
    .map((line) => {
      const next = line.replace(SHIELDS_URL, (url, path) => {
        if (headerBadge(path)) found.push(path);
        return recolorBadgeUrl(url, { allBadges });
      });
      if (next !== line) changedLines += 1;
      return next;
    })
    .join("\n");
  return { text, changedLines, found };
}

export function readmeTargets(root = ROOT) {
  const i18n = join(root, "docs", "i18n");
  const mirrors = readdirSync(i18n)
    .map((locale) => join(i18n, locale, "README.md"))
    .filter((file) => statSync(file, { throwIfNoEntry: false })?.isFile());
  return [join(root, "README.md"), ...mirrors.sort()];
}

function main(argv) {
  const dryRun = argv.includes("--dry-run");
  const onlyRoot = argv.includes("--only-root");
  const rootReadme = join(ROOT, "README.md");
  const targets = onlyRoot ? [rootReadme] : readmeTargets();
  let totalLines = 0;
  let touched = 0;
  const incomplete = [];
  for (const file of targets) {
    const source = readFileSync(file, "utf8");
    const { text, changedLines, found } = recolorMarkdown(source, {
      allBadges: file === rootReadme,
    });
    const missing = HEADER_BADGES.filter(
      ({ path, legacyPath }) => !found.includes(path) && !found.includes(legacyPath)
    ).map(({ path }) => path);
    if (missing.length) incomplete.push(`${relative(ROOT, file)}: ${missing.join(", ")}`);
    if (text === source) continue;
    totalLines += changedLines;
    touched += 1;
    if (!dryRun) writeFileSync(file, text);
  }
  const verb = dryRun ? "would change" : "changed";
  console.log(
    `${verb} ${totalLines} line(s) in ${touched} of ${targets.length} file(s) (${targets.length - touched} already in kit colors)`
  );
  if (incomplete.length) {
    console.error(`header badges not found:\n  ${incomplete.join("\n  ")}`);
    process.exit(1);
  }
}

if (process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1]) {
  main(process.argv.slice(2));
}
