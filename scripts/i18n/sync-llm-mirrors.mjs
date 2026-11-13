#!/usr/bin/env node
/**
 * sync-llm-mirrors.mjs — keep docs/i18n/<locale>/llm.txt in lock-step with
 * the root `llm.txt`. The mirrors are strict copies (no translation): they
 * preserve the per-locale heading + language bar block they already have at
 * the top of the file, then replace everything after the `---` separator with
 * the root body (heading stripped).
 *
 * Usage:
 *   node scripts/i18n/sync-llm-mirrors.mjs [--dry-run]
 *
 * Idempotent. Safe to run repeatedly. The mirrors are derived files: feature
 * PRs edit only the root `llm.txt`; the translation wave and the release
 * refresh run this script (or call `syncLlmMirrors()`), which keeps the
 * release-mode `npm run check:docs-sync` green. `--dry-run` lists the mirrors
 * that would change without writing them.
 */

import { promises as fs } from "node:fs";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.resolve(__dirname, "..", "..");
const FILE_NAME = "llm.txt";

function stripTopHeading(content) {
  return content.replace(/^# .+\r?\n+/, "");
}

const silent = () => {};

/**
 * Rewrites every stale docs/i18n/<locale>/llm.txt from the root llm.txt.
 *
 * @param {{ root?: string, dryRun?: boolean, log?: (line: string) => void,
 *           warn?: (line: string) => void }} [options]
 *   root    checkout to sync (default: the one that holds this script);
 *   dryRun  compute the changes, write nothing;
 *   log / warn  line sinks (default: silent; the CLI passes console.log / console.warn).
 * @returns {Promise<{ changedFiles: string[], updated: number, unchanged: number,
 *   missing: number, locales: number, skipped: { locale: string, reason: string }[] }>}
 *   changedFiles are repo-relative POSIX paths, sorted (written, or would be with dryRun).
 */
export async function syncLlmMirrors({
  root = ROOT,
  dryRun = false,
  log = silent,
  warn = silent,
} = {}) {
  const i18nDir = path.join(root, "docs", "i18n");
  const rootText = await fs.readFile(path.join(root, FILE_NAME), "utf8");
  const rootBody = stripTopHeading(rootText).replace(/\r\n/g, "\n");

  const entries = await fs.readdir(i18nDir, { withFileTypes: true });
  const locales = entries
    .filter((e) => e.isDirectory())
    .map((e) => e.name)
    .sort();

  const changedFiles = [];
  const skipped = [];
  let unchanged = 0;

  for (const locale of locales) {
    const relative = `docs/i18n/${locale}/${FILE_NAME}`;
    const target = path.join(i18nDir, locale, FILE_NAME);
    let existing;
    try {
      existing = await fs.readFile(target, "utf8");
    } catch {
      warn(`[sync-llm-mirrors] skip ${locale}: ${FILE_NAME} missing`);
      skipped.push({ locale, reason: `${FILE_NAME} missing` });
      continue;
    }

    // The locale header is everything up to and including the first `---`
    // separator on its own line. We keep that prefix verbatim and replace
    // the rest with the root body.
    const sepMatch = existing.match(/^---\s*$/m);
    if (!sepMatch || sepMatch.index === undefined) {
      warn(`[sync-llm-mirrors] skip ${locale}: missing --- separator`);
      skipped.push({ locale, reason: "missing --- separator" });
      continue;
    }

    const headerEnd = sepMatch.index + sepMatch[0].length;
    const header = existing.slice(0, headerEnd).replace(/\r\n/g, "\n");
    const trimmedHeader = header.replace(/\n+$/, "");
    const next = `${trimmedHeader}\n\n${rootBody.trimStart()}`.replace(/\r\n/g, "\n");

    const normalizedExisting = existing.replace(/\r\n/g, "\n");
    if (normalizedExisting === next) {
      unchanged += 1;
      continue;
    }
    if (dryRun) {
      log(`[sync-llm-mirrors] would update ${relative}`);
    } else {
      await fs.writeFile(target, next, "utf8");
      log(`[sync-llm-mirrors] updated ${relative}`);
    }
    changedFiles.push(relative);
  }

  const result = {
    changedFiles: changedFiles.sort(),
    updated: changedFiles.length,
    unchanged,
    missing: skipped.length,
    locales: locales.length,
    skipped,
  };
  log(
    `[sync-llm-mirrors] done${dryRun ? " (dry-run)" : ""} — updated=${result.updated} unchanged=${result.unchanged} missing=${result.missing} (${result.locales} locales)`
  );
  return result;
}

if (import.meta.url === pathToFileURL(process.argv[1] || "").href) {
  syncLlmMirrors({
    dryRun: process.argv.includes("--dry-run"),
    log: (line) => console.log(line),
    warn: (line) => console.warn(line),
  }).catch((err) => {
    console.error(err);
    process.exit(1);
  });
}
