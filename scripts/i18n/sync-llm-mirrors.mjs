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
 * Idempotent. Run this in the PR that edits the root `llm.txt`. The translation
 * wave and release refresh also use it. `--dry-run` lists the mirrors that
 * would change without writing them.
 */

import { promises as fs, realpathSync } from "node:fs";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.resolve(__dirname, "..", "..");
const FILE_NAME = "llm.txt";
export const LLM_MIRROR_PATH = /^docs\/i18n\/[^/]+\/llm\.txt$/;

function stripTopHeading(content) {
  return content.replace(/^# .+\r?\n+/, "");
}

/** Exact text left by the copier, or null when the locale header has no separator. */
export function renderLlmMirror(existing, rootText) {
  const separator = existing.match(/^---\s*$/m);
  if (!separator) return null;
  const end = separator.index + separator[0].length;
  const header = existing.slice(0, end).replace(/\r\n/g, "\n").replace(/\n+$/, "");
  const body = stripTopHeading(rootText).replace(/\r\n/g, "\n").trimStart();
  const next = `${header}\n\n${body}`.replace(/\r\n/g, "\n");
  return existing.replace(/\r\n/g, "\n") === next ? existing : next;
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

    const next = renderLlmMirror(existing, rootText);
    if (next === null) {
      warn(`[sync-llm-mirrors] skip ${locale}: missing --- separator`);
      skipped.push({ locale, reason: "missing --- separator" });
      continue;
    }

    if (existing === next) {
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

/** Was this file run directly (`node …/sync-llm-mirrors.mjs`), even through a symlinked path? */
function isDirectRun() {
  const invoked = process.argv[1];
  if (!invoked) return false;
  let real = invoked;
  try {
    real = realpathSync(invoked);
  } catch {
    // keep the path as invoked
  }
  return import.meta.url === pathToFileURL(real).href;
}

if (isDirectRun()) {
  syncLlmMirrors({
    dryRun: process.argv.includes("--dry-run"),
    log: (line) => console.log(line),
    warn: (line) => console.warn(line),
  }).catch((err) => {
    console.error(err);
    process.exit(1);
  });
}
