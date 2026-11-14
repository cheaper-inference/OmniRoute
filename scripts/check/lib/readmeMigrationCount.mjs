import fs from "node:fs";
import path from "node:path";
import { parseFragment } from "parse5";
import { inDigitsOf } from "./derivedClaims.mjs";

function normalizeDigits(value) {
  return value.replace(/[٠-٩۰-۹]/g, (digit) => String(digit.charCodeAt(0) % 16));
}

function readTextContent(node) {
  if (node.nodeName === "#text") return node.value;
  return (node.childNodes ?? []).map(readTextContent).join("");
}

// Digit runs of the raw HTML that are visible text: tags (`<code>`) and character references
// (`&#160;`) are skipped, so the runs line up one-to-one with the digits parse5 reads.
const RAW_TOKEN = /<[^>]*>|&#?\w+;|[0-9٠-٩۰-۹]+/g;

function visibleDigitRuns(raw) {
  const runs = [];
  for (const m of raw.matchAll(RAW_TOKEN)) {
    if (m[0].startsWith("<") || m[0].startsWith("&")) continue;
    runs.push({ text: m[0], start: m.index, end: m.index + m[0].length });
  }
  return runs;
}

/**
 * Locates the migration count of a translated README's database row.
 *
 * All README translations retain this table's stable product names and em dash. The prose
 * after it has exactly two counts: domain modules, then migrations. Wording and numeral
 * placement within each phrase vary across languages.
 *
 * Returns `{ error, claims }`: `error` is the release-mode failure detail when the row is not
 * where it must be (the claim is required in every mirror), else `claims` holds the one
 * migration claim with the span of its digits (`start === -1` when the visible digits could not
 * be mapped back to the raw HTML, which makes the claim unrewritable but still comparable).
 */
export function locateReadmeMigrationClaim(content) {
  const rows = [...content.matchAll(/<tr\b[^>]*>[\s\S]*?<\/tr>/g)].filter(([row]) =>
    row.includes("better-sqlite3")
  );
  if (rows.length !== 1) {
    return { error: "expected one translated database table row", claims: [] };
  }
  const row = rows[0];
  const dash = row[0].match(/—([\s\S]*?)<\/td>/);
  const tail = dash?.[1] ?? "";
  const counts = normalizeDigits(readTextContent(parseFragment(tail))).match(/\d+/g) ?? [];
  if (counts.length !== 2) {
    return { error: "expected module and migration counts in database row", claims: [] };
  }
  const value = Number(counts[1]);
  let span = { start: -1, end: -1, raw: counts[1] };
  if (dash) {
    const tailStart = row.index + dash.index + 1; // "—" is one UTF-16 unit
    const runs = visibleDigitRuns(tail);
    if (runs.length === 2 && Number(normalizeDigits(runs[1].text)) === value) {
      span = { start: tailStart + runs[1].start, end: tailStart + runs[1].end, raw: runs[1].text };
    }
  }
  return {
    error: null,
    claims: [{ value, text: span.raw, start: span.start, end: span.end }],
  };
}

function validateReadmeMigrationCount(content, expected) {
  const located = locateReadmeMigrationClaim(content);
  if (located.error) return { ok: false, detail: located.error };
  const found = located.claims[0].value;
  return {
    ok: found === expected,
    detail: `translated database row: ${found} migrations; SQL files: ${expected}`,
  };
}

export function buildReadmeMigrationChecks(root, actual) {
  const config = JSON.parse(fs.readFileSync(path.join(root, "config/i18n.json"), "utf8"));
  return [
    {
      label: "DB migrations count (README mirrors)",
      actual,
      docKey: "migrations",
      strict: true,
      // Derived: the count comes from src/lib/db/migrations. PR mode diffs the row against the
      // base; the release refresh rewrites it in the mirror's own digits.
      scope: "derived",
      requireClaim: true,
      files: config.locales
        .filter(({ code }) => code !== "en")
        .map(({ code }) => `docs/i18n/${code}/README.md`),
      validate: (content) => validateReadmeMigrationCount(content, actual),
      extract: (content) => locateReadmeMigrationClaim(content).claims,
      plan: (content) => {
        const located = locateReadmeMigrationClaim(content);
        if (located.error) return { edits: [], manual: [located.error] };
        const claim = located.claims[0];
        if (claim.value === actual) return { edits: [], manual: [] };
        if (claim.start < 0) {
          return {
            edits: [],
            manual: [`migration count ${claim.value} could not be located in the raw row`],
          };
        }
        return {
          edits: [
            { start: claim.start, end: claim.end, to: inDigitsOf(claim.text, String(actual)) },
          ],
          manual: [],
        };
      },
    },
  ];
}
